import { NextResponse } from "next/server";
import { fetchFullChannelData } from "@/lib/youtube/fetcher";
import { calculateMetrics } from "@/lib/youtube/metrics";
import { generateAuditInsights } from "@/lib/youtube/audit-engine";
import { checkAndIncrementUsage } from "@/lib/usage";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 120;
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // ===== AUTH + QUOTA =====
    const usage = await checkAndIncrementUsage("youtube-auditor");
    if (!usage.allowed) {
      const status = usage.error === "Not authenticated" ? 401 : 429;
      return NextResponse.json(
        {
          success: false,
          error: usage.error,
          limit: usage.limit,
          used: usage.used,
          requiresUpgrade: status === 429,
        },
        { status }
      );
    }

    const { channelUrl, generateInsights = true } = await req.json();
    if (!channelUrl) {
      return NextResponse.json(
        { success: false, error: "Missing channelUrl" },
        { status: 400 }
      );
    }

    console.log(`[YT-Auditor] Auditing: ${channelUrl} · plan=${usage.plan}`);

    // ===== 1. FETCH DATA =====
    const { channel, videos } = await fetchFullChannelData(channelUrl);
    const enrichedChannel = calculateMetrics({ channel, videos });

    // ===== 2. AI INSIGHTS =====
    let insights = null;
    if (generateInsights) {
      try {
        insights = await generateAuditInsights({
          channel: enrichedChannel,
          videos,
        });
      } catch (err) {
        console.error("[YT-Auditor] Insight generation failed:", err.message);
        insights = { error: err.message };
      }
    }

    // ===== 3. SAVE TO PROJECTS =====
    try {
      const supabase = await createClient();
      await supabase.from("projects").insert({
        user_id: usage.userId,
        tool_slug: "youtube-auditor",
        title: `${enrichedChannel.title} — YouTube Audit`,
        prompt: channelUrl,
        input_data: { channelUrl },
        output_data: {
          channel: enrichedChannel,
          videos: videos?.slice(0, 20), // trim to save space
          insights,
        },
      });
    } catch (saveErr) {
      console.warn("[YT-Auditor] Save failed (non-fatal):", saveErr.message);
    }

    return NextResponse.json({
      success: true,
      channel: enrichedChannel,
      videos,
      insights,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[YT-Auditor]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}