import { NextResponse } from "next/server";
import { auditWebsite, analyzeScreenshots, fetchDualPageSpeed } from "@/lib/ai/website-auditor";
import { checkAndIncrementUsage } from "@/lib/usage";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { fetchAndParseURL } from "@/lib/audit/html-parser";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, competitors = [], messagingApps = [], screenshots = [] } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    // Validate URL
    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Usage check
    const usage = await checkAndIncrementUsage("website-audit");
    if (!usage.allowed) {
      return NextResponse.json(
        { error: usage.error, limit: usage.limit, used: usage.used, requiresLogin: true },
        { status: 403 }
      );
    }

    // Get user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Prepare competitor URLs
    const competitorUrls = competitors
      .filter((c) => c && c.trim())
      .map((c) => {
        const trimmed = c.trim();
        return trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
      })
      .slice(0, 3);

    console.log(`[Audit] Starting audit for ${normalizedUrl}`);
    console.log(`[Audit] Competitors: ${competitorUrls.length}, Screenshots: ${screenshots.length}`);

    // Run all data fetches in parallel
    const [
      pageSpeedData,
      parsedHTML,
      ...competitorResults
    ] = await Promise.all([
      fetchDualPageSpeed(normalizedUrl),
      fetchAndParseURL(normalizedUrl),
      ...competitorUrls.map((cu) => fetchAndParseURL(cu)),
    ]);

    console.log(`[Audit] HTML fetched: ${!!parsedHTML}, PageSpeed mobile: ${!!pageSpeedData.mobile}, desktop: ${!!pageSpeedData.desktop}`);

    // Build competitor data with parsed results
    const competitorData = competitorUrls.map((cu, i) => ({
      url: cu,
      data: competitorResults[i],
    }));

    // Run AI audit + screenshot analysis in parallel
    const [audit, uxAudit] = await Promise.all([
      auditWebsite(normalizedUrl, pageSpeedData, parsedHTML, {
        competitors: competitorUrls,
        messagingApps,
        competitorData,
      }),
      screenshots.length > 0
        ? analyzeScreenshots(normalizedUrl, screenshots).catch((e) => {
            console.error("[Audit] Screenshot analysis failed:", e.message);
            return null;
          })
        : Promise.resolve(null),
    ]);

    // Build meta with both mobile + desktop scores
    const meta = {
      url: normalizedUrl,
      scannedAt: new Date().toISOString(),
      screenshotsAnalyzed: screenshots.length,
      competitorsAnalyzed: competitorUrls.length,
      pageSpeed: {
        mobile: pageSpeedData.mobile
          ? {
              performance: pageSpeedData.mobile.performanceScore,
              seo: pageSpeedData.mobile.seoScore,
              accessibility: pageSpeedData.mobile.accessibilityScore,
              bestPractices: pageSpeedData.mobile.bestPracticesScore,
              fcp: pageSpeedData.mobile.fcp,
              lcp: pageSpeedData.mobile.lcp,
              cls: pageSpeedData.mobile.cls,
              tbt: pageSpeedData.mobile.tbt,
            }
          : null,
        desktop: pageSpeedData.desktop
          ? {
              performance: pageSpeedData.desktop.performanceScore,
              seo: pageSpeedData.desktop.seoScore,
              accessibility: pageSpeedData.desktop.accessibilityScore,
              bestPractices: pageSpeedData.desktop.bestPracticesScore,
              fcp: pageSpeedData.desktop.fcp,
              lcp: pageSpeedData.desktop.lcp,
            }
          : null,
      },
      // Backward-compat: keep flat pageSpeed for old UI
      pageSpeedLegacy: pageSpeedData.mobile
        ? {
            performance: pageSpeedData.mobile.performanceScore,
            seo: pageSpeedData.mobile.seoScore,
            accessibility: pageSpeedData.mobile.accessibilityScore,
            bestPractices: pageSpeedData.mobile.bestPracticesScore,
          }
        : null,
      platform: parsedHTML?.platform || "Unknown",
      isSPA: parsedHTML?.spa?.isLikelySPA || false,
      dataQuality: audit.dataQuality,
    };

    // Save to DB if user is logged in
    let shareId = null;
    if (user) {
      try {
        const admin = createAdminClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY,
          { auth: { autoRefreshToken: false, persistSession: false } }
        );

        const { data: saved } = await admin
          .from("website_audits")
          .insert({
            user_id: user.id,
            url: normalizedUrl,
            audit,
            ux_audit: uxAudit,
            meta,
            is_public: true,
          })
          .select("share_id")
          .single();

        shareId = saved?.share_id || null;
      } catch (e) {
        console.error("[Audit] Failed to save audit:", e.message);
      }
    }

    return NextResponse.json({
      success: true,
      audit,
      uxAudit,
      shareId,
      meta,
    });
  } catch (error) {
    console.error("[Audit] Error:", error);
    return NextResponse.json(
      { error: error.message || "Audit failed. Please try again." },
      { status: 500 }
    );
  }
}