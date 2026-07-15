import { NextResponse } from "next/server";
import { openrouter } from "@/lib/ai/openrouter";
import { checkAndIncrementUsage } from "@/lib/usage";
import { createClient } from "@/lib/supabase/server";
import { getLimits } from "@/lib/pricing";
import { generateThumbnailBackground } from "@/lib/video-ai/openrouter-media";

export const runtime = "nodejs";
export const maxDuration = 180;
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const usage = await checkAndIncrementUsage("youtube-titles");
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

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    const plan = profile?.plan || "FREE";
    const limits = getLimits(plan);
    const canGenerateThumbnails = !!limits.youtubeCompetitorCompare;

    const {
      topic,
      niche,
      style,
      channelName,
      generateThumbnails = false,
    } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing topic" },
        { status: 400 }
      );
    }

    // ===== 1. Generate titles + structured thumbnail specs =====
    const prompt = `You are a YouTube CTR expert. You've studied 100,000+ high-performing thumbnails.

Generate 10 CTR-optimized titles AND 3 YouTube-style thumbnail specs for this video.

TOPIC: ${topic}
NICHE: ${niche || "general"}
CHANNEL: ${channelName || "creator"}
STYLE: ${style || "professional"}

Return ONLY valid JSON, no markdown:

{
  "titles": [
    {
      "title": "Under 60 chars, punchy, curiosity-driven",
      "format": "Number list | Question | How-to | Comparison | Warning | Curiosity gap | Personal story",
      "predictedCtrTier": "high | medium | low",
      "hook": "What makes this click"
    }
  ],
  "thumbnails": [
    {
      "concept": "One-line visual concept",
      "personDescription": "Detailed description of the person in the shot. Include: gender, approximate age, ethnicity (be diverse — vary across the 3 thumbnails), expression (shocked, laughing, pointing, confident smile), pose (mid-shot facing camera, looking at camera, hand gesture). Position them on the LEFT or RIGHT side (leave opposite side empty for text). Example: 'Confident 30-year-old Asian woman with black hair, laughing with mouth open showing surprise, wearing a bright red hoodie, positioned on RIGHT side of frame, looking directly at camera, hand raised in a pointing gesture'",
      "personPosition": "left | right",
      "backgroundDescription": "Environment/setting behind the person. Should support the topic. Example: 'Modern minimalist office with soft bokeh lights, subtle geometric shapes floating in background'",
      "primaryColor": "Hex color for background/lighting accent (bright, saturated — like #FF0033, #FFD700, #00E5FF, #7C3AED, #FF6B00)",
      "secondaryColor": "Complementary hex color for lighting/glow accents",
      "mood": "high-energy | shocked | confident | mysterious | urgent | inspiring",
      "textOverlay": {
        "mainText": "2-4 words MAX. Big, bold, punchy. Example: 'I QUIT MY JOB' or 'THIS CHANGED EVERYTHING'",
        "highlightWord": "ONE word from mainText to highlight in accent color. Example: 'CHANGED'",
        "subText": "Optional smaller line above/below (5-8 words). Can be empty string.",
        "textPosition": "left | right (opposite of personPosition)",
        "textColor": "white | yellow | black (pick for max contrast against background)",
        "accentColor": "Hex for the highlight word — bright + vibrant. Must pop against background."
      }
    }
  ],
  "descriptionTemplate": "Ready-to-paste SEO-optimized description with timestamps, links, hashtags",
  "tags": ["tag1", "tag2", "..."]
}

CRITICAL RULES FOR THUMBNAILS:
- Vary the person across all 3 thumbnails (gender, age, ethnicity)
- Every thumbnail MUST have a person as focal point (that's what gets clicks)
- Person must be positioned on ONE side, text on OPPOSITE side
- Colors must be BRIGHT and SATURATED (never muted)
- Text is MAX 4 words (people don't read long text on thumbnails)
- Expressions must be EMOTIONAL: shocked, laughing, angry, confident, worried — never neutral
- Match the emotion to the video topic

Generate exactly 10 titles and 3 thumbnails.`;

    const response = await openrouter.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      temperature: 0.85,
      max_tokens: 5000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a YouTube CTR expert. Return ONLY valid JSON. Never wrap in markdown.",
        },
        { role: "user", content: prompt },
      ],
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from AI");

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      const cleaned = content
        .replace(/^```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();
      parsed = JSON.parse(cleaned);
    }

    // ===== 2. Generate real thumbnail backgrounds (Pro only) =====
    let generatedThumbnails = null;
    if (generateThumbnails && canGenerateThumbnails && parsed.thumbnails?.length) {
      console.log(`[titles] Generating ${parsed.thumbnails.length} thumbnail backgrounds (Pro)...`);
      try {
        generatedThumbnails = await Promise.all(
          parsed.thumbnails.slice(0, 3).map(async (spec, idx) => {
            try {
              const bgUrl = await generateThumbnailBackground({ spec });
              return {
                index: idx,
                backgroundUrl: bgUrl,
                spec, // send full spec so frontend renders the text overlay
              };
            } catch (err) {
              console.warn(`[titles] Thumbnail ${idx} bg failed:`, err.message);
              return { index: idx, backgroundUrl: null, spec, error: err.message };
            }
          })
        );
        console.log(
          `[titles] ✅ ${generatedThumbnails.filter((t) => t.backgroundUrl).length}/${generatedThumbnails.length} backgrounds`
        );
      } catch (err) {
        console.error("[titles] Thumbnail batch failed:", err);
      }
    }

    return NextResponse.json({
      success: true,
      titles: parsed.titles,
      thumbnails: parsed.thumbnails,
      generatedThumbnails,
      descriptionTemplate: parsed.descriptionTemplate,
      tags: parsed.tags,
      thumbnailsAvailable: canGenerateThumbnails,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[YT-Titles]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}