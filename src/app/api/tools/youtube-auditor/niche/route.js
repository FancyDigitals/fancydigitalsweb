import { NextResponse } from "next/server";
import { searchTopChannelsInNiche, fetchFullChannelData } from "@/lib/youtube/fetcher";
import { calculateMetrics } from "@/lib/youtube/metrics";
import { openrouter } from "@/lib/ai/openrouter";
import { createClient } from "@/lib/supabase/server";
import { getLimits } from "@/lib/pricing";
import { checkAndIncrementUsage } from "@/lib/usage";

export const runtime = "nodejs";
export const maxDuration = 180;
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    const plan = profile?.plan || "FREE";
    const limits = getLimits(plan);

    if (!limits.youtubeNicheReport) {
      return NextResponse.json(
        {
          success: false,
          error: "Niche Domination Report is a Pro feature.",
          requiresUpgrade: true,
        },
        { status: 403 }
      );
    }

    // Charge 1 audit credit
    const usage = await checkAndIncrementUsage("youtube-auditor");
    if (!usage.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: usage.error,
          requiresUpgrade: true,
        },
        { status: 429 }
      );
    }

    const { niche } = await req.json();
    if (!niche?.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing niche" },
        { status: 400 }
      );
    }

    // Find top 5 channels in the niche
    const topChannels = await searchTopChannelsInNiche(niche, 5);
    if (topChannels.length === 0) {
      return NextResponse.json(
        { success: false, error: "No channels found in that niche" },
        { status: 404 }
      );
    }

    // Fetch full data for each
    const enriched = await Promise.all(
      topChannels.map((c) =>
        fetchFullChannelData(c.id)
          .then((d) => calculateMetrics(d))
          .catch(() => null)
      )
    );

    const channels = enriched.filter(Boolean);

    const summary = channels.map((c) => ({
      title: c.title,
      subscribers: c.subscribers,
      avgViews: c.metrics.avgViews,
      uploadsPerMonth: c.metrics.uploadsPerMonth,
      avgDuration: c.metrics.avgDurationFormatted,
      topTitles: c.metrics.topVideos.slice(0, 3).map((v) => v.title),
    }));

    const prompt = `You are a YouTube niche researcher.

NICHE: "${niche}"

TOP CHANNELS IN THIS NICHE:
${JSON.stringify(summary, null, 2)}

Return a Niche Domination Report as JSON:

{
  "nicheOverview": "One paragraph on the state of this niche",
  "winningPatterns": {
    "titleFormats": ["Pattern 1 with example", "Pattern 2 with example"],
    "videoLengths": "What length wins",
    "uploadCadence": "How often winners publish",
    "commonHooks": ["Hook 1", "Hook 2", "Hook 3"]
  },
  "whiteSpaceTopics": [
    "Topic nobody covers 1 (with why)",
    "Topic 2",
    "Topic 3",
    "Topic 4",
    "Topic 5"
  ],
  "commonMistakes": [
    "What most channels in this niche do wrong"
  ],
  "entryStrategy": {
    "asBeginner": "How a new channel breaks in",
    "asGrowingChannel": "How a mid-tier channel scales",
    "asEstablished": "How an established channel dominates"
  },
  "keywordOpportunities": ["keyword 1", "keyword 2", "..."],
  "predictedGrowthDifficulty": "easy | moderate | competitive | brutal (with reasoning)"
}`;

    const aiRes = await openrouter.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a YouTube niche researcher. Return ONLY valid JSON." },
        { role: "user", content: prompt },
      ],
    });

    const content = aiRes.choices?.[0]?.message?.content;
    let insights;
    try {
      insights = JSON.parse(content);
    } catch {
      insights = { error: "AI response was not valid JSON" };
    }

    return NextResponse.json({
      success: true,
      niche,
      channels: summary,
      insights,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[YT-Niche]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}