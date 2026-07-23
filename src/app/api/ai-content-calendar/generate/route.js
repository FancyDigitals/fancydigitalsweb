import { NextResponse } from "next/server";
import {
  runStrategicPlanner,
  runPlanningGenerator,
  runRepurposingGenerator,
  runCampaignGenerator,
  PLATFORMS,
} from "@/lib/content-calendar/agents";
import { checkAndIncrementUsage } from "@/lib/usage";
import { getLimits } from "@/lib/pricing";

export const maxDuration = 300;

export async function POST(request) {
  try {
    const usageResult = await checkAndIncrementUsage("ai-content-calendar");

    if (!usageResult.allowed) {
      return NextResponse.json(
        {
          error: usageResult.error || "Daily limit reached",
          requiresUpgrade: true,
          limit: usageResult.limit,
          used: usageResult.used,
        },
        { status: usageResult.error === "Not authenticated" ? 401 : 429 }
      );
    }

    const body = await request.json();
    const {
      mode = "planning", // planning | repurposing | campaign
      brand_name,
      industry,
      audience,
      tone,
      goal,
      platforms = [],
      duration_days = 7,
      start_date,
      include_hashtags = true,
      include_image_prompts = true,
      // Repurposing mode
      source_content,
      source_type,
      // Campaign mode
      campaign_type,
      campaign_details,
      launch_date,
    } = body;

    // ─── Validation ───
    if (!platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: "At least one platform is required" },
        { status: 400 }
      );
    }

    const validPlatforms = platforms.filter((p) => PLATFORMS[p]);
    if (validPlatforms.length === 0) {
      return NextResponse.json(
        { error: "No valid platforms selected" },
        { status: 400 }
      );
    }

    // ─── Enforce plan duration limits ───
    const limits = getLimits(usageResult.plan);
    const maxDays = limits.contentCalendarMaxDays || 7;
    const cappedDays = Math.min(duration_days, maxDays);

    const startDate = start_date || new Date().toISOString().split("T")[0];

    console.log(
      `[ContentCalendar] mode=${mode} platforms=${validPlatforms.length} days=${cappedDays} plan=${usageResult.plan}`
    );

    // ═════════════════════════════════════════════
    // MODE-SPECIFIC GENERATION
    // ═════════════════════════════════════════════
    let result;
    let strategy = null;

    if (mode === "repurposing") {
      if (!source_content?.trim()) {
        return NextResponse.json(
          { error: "Source content is required for repurposing mode" },
          { status: 400 }
        );
      }

      console.log(`[ContentCalendar] Running repurposing agent...`);
      result = await runRepurposingGenerator({
        source_content,
        source_type,
        brand_name,
        audience,
        tone,
        platforms: validPlatforms,
        duration_days: cappedDays,
        start_date: startDate,
      });
    } else if (mode === "campaign") {
      if (!campaign_type?.trim() || !campaign_details?.trim()) {
        return NextResponse.json(
          { error: "Campaign type and details are required" },
          { status: 400 }
        );
      }

      console.log(`[ContentCalendar] Running campaign agent...`);
      result = await runCampaignGenerator({
        campaign_type,
        campaign_details,
        brand_name,
        industry,
        audience,
        tone,
        platforms: validPlatforms,
        duration_days: cappedDays,
        start_date: startDate,
        launch_date,
      });
    } else {
      // Planning mode (default)
      if (!brand_name?.trim()) {
        return NextResponse.json(
          { error: "Brand name is required for planning mode" },
          { status: 400 }
        );
      }

      console.log(`[ContentCalendar] Phase 1: Strategic planner...`);
      strategy = await runStrategicPlanner({
        brand_name,
        industry,
        audience,
        tone,
        goal,
        platforms: validPlatforms,
        duration_days: cappedDays,
      });

      console.log(`[ContentCalendar] Phase 2: Generating ${cappedDays * validPlatforms.length} posts...`);
      result = await runPlanningGenerator({
        brand_name,
        industry,
        audience,
        tone,
        goal,
        platforms: validPlatforms,
        duration_days: cappedDays,
        start_date: startDate,
        strategy,
        include_hashtags,
        include_image_prompts,
      });
    }

    if (!result?.posts?.length) {
      return NextResponse.json(
        { error: "Generation failed. Please try again." },
        { status: 500 }
      );
    }

    // Ensure each post has an id
    result.posts = result.posts.map((post, i) => ({
      ...post,
      id: post.id || `post-${Date.now()}-${i}`,
      status: post.status || "draft",
    }));

    return NextResponse.json({
      success: true,
      data: {
        mode,
        brand_name,
        industry,
        audience,
        tone,
        goal,
        platforms: validPlatforms,
        duration_days: cappedDays,
        start_date: startDate,
        strategy,
        ...result,
      },
      usage: {
        used: usageResult.used,
        limit: usageResult.limit,
        isPro: usageResult.isPro,
        plan: usageResult.plan,
      },
    });
  } catch (error) {
    console.error("Content calendar generation error:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}