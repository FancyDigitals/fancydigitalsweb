import { NextResponse } from "next/server";
import { auditWebsite, analyzeScreenshots } from "@/lib/ai/website-auditor";
import { checkAndIncrementUsage } from "@/lib/usage";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { fetchAndParseURL } from "@/lib/audit/html-parser";

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

    // Run all fetches in parallel
    const competitorUrls = competitors
      .filter((c) => c.trim())
      .map((c) => c.trim().startsWith("http") ? c.trim() : "https://" + c.trim());

    const [
      pageSpeedResult,
      parsedHTML,
      ...competitorResults
    ] = await Promise.all([
      // PageSpeed
      fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&strategy=mobile&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`,
        { next: { revalidate: 0 } }
      ).then(r => r.ok ? r.json() : null).catch(() => null),

      // Main site HTML parse
      fetchAndParseURL(normalizedUrl),

      // Competitor pages in parallel
      ...competitorUrls.map((cu) => fetchAndParseURL(cu)),
    ]);

    // Process PageSpeed
    let pageSpeedData = null;
    if (pageSpeedResult) {
      pageSpeedData = {
        performanceScore: Math.round((pageSpeedResult.lighthouseResult?.categories?.performance?.score || 0) * 100),
        fcp: pageSpeedResult.lighthouseResult?.audits?.["first-contentful-paint"]?.displayValue,
        lcp: pageSpeedResult.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue,
        tbt: pageSpeedResult.lighthouseResult?.audits?.["total-blocking-time"]?.displayValue,
        cls: pageSpeedResult.lighthouseResult?.audits?.["cumulative-layout-shift"]?.displayValue,
        speedIndex: pageSpeedResult.lighthouseResult?.audits?.["speed-index"]?.displayValue,
        opportunities: Object.values(pageSpeedResult.lighthouseResult?.audits || {})
          .filter((a) => a.details?.type === "opportunity" && a.score !== null && a.score < 0.9)
          .slice(0, 8)
          .map((a) => ({ title: a.title, description: a.description, score: a.score })),
        seo: {
          score: Math.round((pageSpeedResult.lighthouseResult?.categories?.seo?.score || 0) * 100),
        },
        accessibility: {
          score: Math.round((pageSpeedResult.lighthouseResult?.categories?.accessibility?.score || 0) * 100),
        },
        bestPractices: {
          score: Math.round((pageSpeedResult.lighthouseResult?.categories?.["best-practices"]?.score || 0) * 100),
        },
      };
    }

    // Build competitor data
    const competitorData = competitorUrls.map((cu, i) => ({
      url: cu,
      data: competitorResults[i],
    }));

    // Run audit + screenshot analysis in parallel
    const [audit, uxAudit] = await Promise.all([
      auditWebsite(normalizedUrl, pageSpeedData, parsedHTML, {
        competitors: competitorUrls,
        messagingApps,
        competitorData,
      }),
      screenshots.length > 0
        ? analyzeScreenshots(normalizedUrl, screenshots).catch((e) => {
            console.error("Screenshot analysis failed:", e);
            return null;
          })
        : Promise.resolve(null),
    ]);

    const meta = {
      url: normalizedUrl,
      scannedAt: new Date().toISOString(),
      screenshotsAnalyzed: screenshots.length,
      pageSpeed: pageSpeedData ? {
        performance: pageSpeedData.performanceScore,
        seo: pageSpeedData.seo?.score,
        accessibility: pageSpeedData.accessibility?.score,
        bestPractices: pageSpeedData.bestPractices?.score,
      } : null,
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
        console.error("Failed to save audit:", e);
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
    console.error("Website audit error:", error);
    return NextResponse.json(
      { error: error.message || "Audit failed. Please try again." },
      { status: 500 }
    );
  }
}