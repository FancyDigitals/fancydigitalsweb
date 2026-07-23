import { NextResponse } from "next/server";
import {
  runBrandStrategist,
  runCreativeDirector,
  runConceptBrainstorm,
  runCritique,
  runBrandSystem,
} from "@/lib/brand-kit/agents";
import { generateLogoIcons } from "@/lib/ai/gemini";
import { checkAndIncrementUsage } from "@/lib/usage";
import { getLimits } from "@/lib/pricing";

export const maxDuration = 300; // 5 minutes for the full pipeline

export async function POST(request) {
  try {
    const usageResult = await checkAndIncrementUsage("ai-brand-kit");

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
      business_name,
      tagline,
      industry,
      style,
      personality,
      audience,
      preferred_color,
      logo_preference,
      description,
    } = body;

    if (!business_name?.trim()) {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    // Determine premium tier
    const limits = getLimits(usageResult.plan);
    const usePremiumIcons = !!limits.brandKitPremiumIcons;

    console.log(`[BrandKit] Starting pipeline (premium=${usePremiumIcons})`);

    // ═════════════════════════════════════════════
    // PHASE 1: BRAND STRATEGIST — understand the business
    // ═════════════════════════════════════════════
    console.log(`[BrandKit] Phase 1: Brand Strategist analyzing...`);
    const brandProfile = await runBrandStrategist({
      business_name,
      tagline,
      industry,
      description,
      audience,
      style,
      personality,
      preferred_color,
    });

    if (!brandProfile || !brandProfile.personality_traits) {
      return NextResponse.json(
        { error: "Brand analysis failed. Please try again." },
        { status: 500 }
      );
    }

    // ═════════════════════════════════════════════
    // PHASE 2: CREATIVE DIRECTOR — decide logo strategy
    // ═════════════════════════════════════════════
    console.log(`[BrandKit] Phase 2: Creative Director deciding strategy...`);
    const strategy = await runCreativeDirector({
      brandProfile,
      business_name,
      industry,
      user_preference: logo_preference,
    });

    if (!strategy || !strategy.chosen_logo_type) {
      return NextResponse.json(
        { error: "Strategy generation failed. Please try again." },
        { status: 500 }
      );
    }

    // ═════════════════════════════════════════════
    // PHASE 3 & 5 (parallel): CONCEPTS + BRAND SYSTEM
    // ═════════════════════════════════════════════
    console.log(`[BrandKit] Phase 3+5: Brainstorming concepts + building brand system in parallel...`);

    const [conceptsResult, brandSystem] = await Promise.all([
      runConceptBrainstorm({
        brandProfile,
        strategy,
        business_name,
        industry,
        description,
      }),
      runBrandSystem({
        business_name,
        tagline,
        brandProfile,
        strategy,
        winning_concept: null, // will refine after critique
        preferred_color,
      }),
    ]);

    if (!conceptsResult?.concepts?.length) {
      return NextResponse.json(
        { error: "Concept brainstorm failed. Please try again." },
        { status: 500 }
      );
    }

    // Limit to 4 concepts, or 2 for free users to save costs
    const conceptsToGenerate = usePremiumIcons
      ? conceptsResult.concepts.slice(0, 4)
      : conceptsResult.concepts.slice(0, 2);

    // ═════════════════════════════════════════════
    // PHASE 4: CRITIQUE (in parallel with image gen)
    // ═════════════════════════════════════════════
    const critiquePromise = runCritique({
      concepts: conceptsResult.concepts,
      business_name,
      brandProfile,
    }).catch((err) => {
      console.warn("[BrandKit] Critique failed:", err.message);
      return null;
    });

    // ═════════════════════════════════════════════
    // PHASE 6: IMAGE GENERATION — icons only, no text
    // ═════════════════════════════════════════════
    console.log(`[BrandKit] Phase 6: Generating ${conceptsToGenerate.length} icons...`);

    const iconPrompts = conceptsToGenerate.map(
      (c) =>
        `${c.flux_prompt}. Professional logo icon design, no text, no letters, no words, no typography. Pure symbol only. White background. Flat vector style. Centered. High quality brand identity design.`
    );

    let logoIcons = [];
    try {
      const imagePromise = generateLogoIcons(iconPrompts, usePremiumIcons);
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve([]), 180000) // 3 minute cap
      );
      const results = await Promise.race([imagePromise, timeoutPromise]);
      logoIcons = results || [];
    } catch (err) {
      console.warn("[BrandKit] Icon generation failed:", err.message);
      logoIcons = [];
    }

    const validIcons = logoIcons.filter(Boolean).length;
    console.log(`[BrandKit] Generated ${validIcons}/${conceptsToGenerate.length} icons`);

    // Wait for critique
    const critique = await critiquePromise;

    // ═════════════════════════════════════════════
    // FINAL ASSEMBLY
    // ═════════════════════════════════════════════
    const primaryHex = brandSystem?.colors?.[0]?.hex || "#075a01";
    const secondaryHex = brandSystem?.colors?.[1]?.hex || "#0a8f01";
    const accentHex = brandSystem?.colors?.[2]?.hex || "#ff914d";

    // Enrich concepts with generated icons and critique scores
    const enrichedConcepts = conceptsToGenerate.map((concept, i) => {
      const evaluation = critique?.evaluations?.find(
        (e) => e.concept_name?.toLowerCase() === concept.name?.toLowerCase()
      );
      return {
        ...concept,
        icon_image: logoIcons[i] || null,
        evaluation: evaluation || null,
        is_winner: critique?.winner?.toLowerCase() === concept.name?.toLowerCase(),
      };
    });

    // Merge everything into final response
    const result = {
      ...brandSystem,
      business_name,
      industry,
      style,

      // Multi-agent reasoning trace (this is the "show your thinking" feature)
      reasoning: {
        brand_profile: brandProfile,
        strategy: strategy,
        critique: critique,
        pipeline_version: "v2-multi-agent",
      },

      // Logo concepts with images and critiques
      logo_concepts: enrichedConcepts,
      logo_preference: strategy.chosen_logo_type || logo_preference,
      logo_type_reasoning: strategy.reasoning,

      // For client-side canvas rendering
      brand_colors: {
        primary: primaryHex,
        secondary: secondaryHex,
        accent: accentHex,
      },

      // Prompt collection (for users who want to try other AI tools)
      logo_prompts: enrichedConcepts.map(
        (c) => `${c.flux_prompt} colors ${primaryHex} and ${secondaryHex}`
      ),
    };

    return NextResponse.json({
      success: true,
      data: result,
      usage: {
        used: usageResult.used,
        limit: usageResult.limit,
        isPro: usageResult.isPro,
        plan: usageResult.plan,
      },
    });
  } catch (error) {
    console.error("Brand kit generation error:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}