import { NextResponse } from "next/server";
import { fetchFullChannelData } from "@/lib/youtube/fetcher";
import { calculateMetrics } from "@/lib/youtube/metrics";
import { openrouter } from "@/lib/ai/openrouter";
import { checkAndIncrementUsage } from "@/lib/usage";
import { getLimits } from "@/lib/pricing";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 180;
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // ===== AUTH + PRO GATE =====
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

    if (!limits.youtubeCompetitorCompare) {
      return NextResponse.json(
        {
          success: false,
          error: "Competitor comparison is a Pro feature. Upgrade to unlock.",
          requiresUpgrade: true,
        },
        { status: 403 }
      );
    }

    // Still count against daily audit quota (comparing = auditing multiple)
    const usage = await checkAndIncrementUsage("youtube-auditor");
    if (!usage.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: usage.error,
          limit: usage.limit,
          used: usage.used,
          requiresUpgrade: true,
        },
        { status: 429 }
      );
    }

    const { myChannel, competitors } = await req.json();
    if (!myChannel || !competitors || !Array.isArray(competitors)) {
      return NextResponse.json(
        { success: false, error: "Missing myChannel or competitors" },
        { status: 400 }
      );
    }
    if (competitors.length > 3) {
      return NextResponse.json(
        { success: false, error: "Max 3 competitors" },
        { status: 400 }
      );
    }

    console.log(`[YT-Compare] Comparing ${myChannel} vs ${competitors.length} competitors`);

    // Fetch all channels in parallel
    const [mine, ...comps] = await Promise.all([
      fetchFullChannelData(myChannel).then((d) => ({
        ...calculateMetrics(d),
        videos: d.videos,
      })),
      ...competitors.map((url) =>
        fetchFullChannelData(url).then((d) => ({
          ...calculateMetrics(d),
          videos: d.videos,
        }))
      ),
    ]);

    const summarize = (ch) => ({
      title: ch.title,
      subscribers: ch.subscribers,
      totalViews: ch.totalViews,
      videoCount: ch.videoCount,
      avgViews: ch.metrics.avgViews,
      avgLikes: ch.metrics.avgLikes,
      viewToSubRatio: ch.metrics.viewToSubRatio,
      likeRatio: ch.metrics.likeRatio,
      uploadsPerMonth: ch.metrics.uploadsPerMonth,
      avgDuration: ch.metrics.avgDurationFormatted,
      topVideos: ch.metrics.topVideos.slice(0, 3).map((v) => ({
        title: v.title,
        views: v.views,
      })),
      recentTitles: ch.videos.slice(0, 10).map((v) => v.title),
    });

    const comparisonData = {
      mine: summarize(mine),
      competitors: comps.map(summarize),
    };

    // AI comparative analysis
    const prompt = `You are a YouTube strategist. Compare these channels and generate an "overtake plan".

MY CHANNEL:
${JSON.stringify(comparisonData.mine, null, 2)}

COMPETITORS:
${JSON.stringify(comparisonData.competitors, null, 2)}

Return ONLY valid JSON. No markdown.

{
  "verdict": "One-sentence honest verdict on how MY CHANNEL stacks up",
  "positioning": "Where I sit vs competitors — behind/parallel/ahead in each area",
  "biggestGaps": [
    { "area": "e.g. Upload cadence", "gap": "Specific number gap", "impact": "Why it matters" }
  ],
  "biggestAdvantages": [
    { "area": "...", "edge": "...", "howToLeverage": "..." }
  ],
  "contentGaps": [
    "Specific topic competitors cover that I don't (reference their actual titles)"
  ],
  "titleFormulaTheyUse": "The title pattern that seems to work for competitors",
  "titleFormulaIShouldSteal": "The exact pattern I should adapt",
  "overtakePlan": {
    "phase1_30days": ["Do X specifically", "Do Y", "Do Z"],
    "phase2_60days": ["...", "...", "..."],
    "phase3_90days": ["...", "...", "..."]
  },
  "predictedTimelineToMatch": "Realistic estimate based on subscriber velocity",
  "topCompetitorToBeatFirst": "Which competitor is most beatable and why"
}`;

    const aiRes = await openrouter.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      temperature: 0.6,
      max_tokens: 4000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a YouTube growth strategist. Return ONLY valid JSON." },
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

    // Save
    try {
      await supabase.from("projects").insert({
        user_id: user.id,
        tool_slug: "youtube-auditor",
        title: `${mine.title} vs ${comps.map(c => c.title).join(", ")}`,
        prompt: `Competitor comparison`,
        input_data: { myChannel, competitors },
        output_data: { comparisonData, insights },
      });
    } catch (err) {
      console.warn("[YT-Compare] Save failed:", err.message);
    }

    return NextResponse.json({
      success: true,
      mine: comparisonData.mine,
      competitors: comparisonData.competitors,
      insights,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[YT-Compare]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}