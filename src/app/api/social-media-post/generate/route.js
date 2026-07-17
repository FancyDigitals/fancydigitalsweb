import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/ai/gemini";
import { checkAndIncrementUsage } from "@/lib/usage";

const PLATFORM_CONFIGS = {
  instagram: {
    name: "Instagram",
    charLimit: 2200,
    hashtagLimit: 30,
    format: "Feed post caption with strong hook, storytelling body, CTA, and hashtags. Emojis welcome.",
  },
  linkedin: {
    name: "LinkedIn",
    charLimit: 3000,
    hashtagLimit: 5,
    format: "Professional long-form post. Start with a bold hook. Use short paragraphs. End with a question or CTA. Minimal hashtags.",
  },
  twitter: {
    name: "Twitter/X",
    charLimit: 280,
    hashtagLimit: 2,
    format: "Single punchy tweet under 280 characters. Also provide a 5-tweet thread version.",
  },
  facebook: {
    name: "Facebook",
    charLimit: 63206,
    hashtagLimit: 10,
    format: "Conversational post with engagement hooks. Ask a question. Use line breaks for readability.",
  },
  tiktok: {
    name: "TikTok",
    charLimit: 2200,
    hashtagLimit: 20,
    format: "Video caption with a strong scroll-stopping hook on line one. Short punchy body. Strong CTA.",
  },
  youtube: {
    name: "YouTube",
    charLimit: 1000,
    hashtagLimit: 15,
    format: "Community post or Shorts caption. Engaging and conversational. Drive comments and likes.",
  },
  threads: {
    name: "Threads",
    charLimit: 500,
    hashtagLimit: 0,
    format: "Casual, conversational, authentic. No hashtags. Short paragraphs. Like Twitter but warmer.",
  },
  pinterest: {
    name: "Pinterest",
    charLimit: 500,
    hashtagLimit: 20,
    format: "Pin title (max 100 chars) + description. Keyword-rich, descriptive, inspiring. Drive saves and clicks.",
  },
};

export async function POST(request) {
  try {
    const usageResult = await checkAndIncrementUsage("ai-social-media-post");

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
      topic,
      tone,
      audience,
      industry,
      goal,
      platforms,
      mode,
      repurposeContent,
      bulkDays,
      includeEmojis,
      language,
    } = body;

    if (!topic && !repurposeContent) {
      return NextResponse.json(
        { error: "Topic or content to repurpose is required" },
        { status: 400 }
      );
    }

    if (!platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: "At least one platform must be selected" },
        { status: 400 }
      );
    }

    const selectedPlatforms = platforms.filter((p) => PLATFORM_CONFIGS[p]);
    const platformDetails = selectedPlatforms
      .map((p) => {
        const cfg = PLATFORM_CONFIGS[p];
        return `- ${cfg.name}: ${cfg.format} (max ${cfg.charLimit} chars, max ${cfg.hashtagLimit} hashtags)`;
      })
      .join("\n");

    const isBulk = mode === "bulk";
    const isRepurpose = mode === "repurpose";
    const days = isBulk ? (bulkDays || 7) : 1;
    const emojiInstruction = includeEmojis
      ? "Include relevant emojis where appropriate for each platform's culture."
      : "Do not include emojis.";

    let prompt;

    if (isBulk) {
      prompt = `You are a world-class social media copywriter. Generate ${days} days of social media content.

Topic/Theme: ${topic}
Tone: ${tone || "Professional"}
Target Audience: ${audience || "General"}
Industry: ${industry || "General"}
Goal: ${goal || "Engagement"}
Language: ${language || "English"}
${emojiInstruction}

Platforms to generate for:
${platformDetails}

CRITICAL: Return PLAIN TEXT ONLY. Never use markdown syntax. No asterisks (**), no underscores (_), no hashes (#), no backticks.

Return a JSON object with this exact structure:
{
  "mode": "bulk",
  "days": [
    {
      "day": 1,
      "date_label": "Day 1",
      "posts": {
        "platform_slug": {
          "platform": "Platform Name",
          "main_caption": "Full caption text",
          "hook": "Opening line only",
          "cta": "Call to action text",
          "hashtags": ["hashtag1", "hashtag2"],
          "char_count": 280,
          "char_limit": 2200,
          "best_time": "Best time to post e.g. Tuesday 7pm",
          "variants": {
            "a": "Variant A caption",
            "b": "Variant B caption",
            "c": "Variant C caption"
          }
        }
      }
    }
  ]
}

Generate content for all ${days} days. Each day should have a different angle or focus on the theme. Only include the platforms listed above as keys in each posts object.`;

    } else if (isRepurpose) {
      prompt = `You are a world-class social media copywriter specializing in content repurposing. 

Original content to repurpose:
"${repurposeContent}"

Tone: ${tone || "Match the original"}
Target Audience: ${audience || "General"}
Language: ${language || "English"}
${emojiInstruction}

Platforms to adapt for:
${platformDetails}

CRITICAL: Return PLAIN TEXT ONLY. Never use markdown syntax. No asterisks (**), no underscores (_), no hashes (#), no backticks.

Rewrite and adapt the original content perfectly for each platform's format, culture, length, and audience expectations. Return a JSON object with this exact structure:
{
  "mode": "repurpose",
  "original_content": "${repurposeContent.substring(0, 100)}...",
  "posts": {
    "platform_slug": {
      "platform": "Platform Name",
      "main_caption": "Full adapted caption text",
      "hook": "Opening line only",
      "cta": "Call to action text",
      "hashtags": ["hashtag1", "hashtag2"],
      "char_count": 280,
      "char_limit": 2200,
      "best_time": "Best time to post e.g. Tuesday 7pm",
      "variants": {
        "a": "Variant A caption",
        "b": "Variant B caption",
        "c": "Variant C caption"
      }
    }
  }
}

Only include the platforms listed above as keys in the posts object.`;

    } else {
      prompt = `You are a world-class social media copywriter. Generate high-performing social media posts.

Topic: ${topic}
Tone: ${tone || "Professional"}
Target Audience: ${audience || "General"}
Industry: ${industry || "General"}
Goal: ${goal || "Engagement"}
Language: ${language || "English"}
${emojiInstruction}

Platforms to generate for:
${platformDetails}

CRITICAL: Return PLAIN TEXT ONLY. Never use markdown syntax. No asterisks (**), no underscores (_), no hashes (#), no backticks.

Return a JSON object with this exact structure:
{
  "mode": "standard",
  "topic": "${topic}",
  "posts": {
    "platform_slug": {
      "platform": "Platform Name",
      "main_caption": "Full caption text for this platform",
      "hook": "Opening line only — the first sentence that stops the scroll",
      "cta": "Call to action text only",
      "hashtags": ["hashtag1", "hashtag2", "hashtag3"],
      "char_count": 280,
      "char_limit": 2200,
      "best_time": "Best time to post e.g. Tuesday 7pm",
      "variants": {
        "a": "Variant A — different angle same topic",
        "b": "Variant B — different angle same topic",
        "c": "Variant C — different angle same topic"
      }
    }
  }
}

For Twitter/X also include:
"thread": ["Tweet 1 text", "Tweet 2 text", "Tweet 3 text", "Tweet 4 text", "Tweet 5 text"]

For Pinterest also include:
"pin_title": "Pinterest pin title under 100 characters"

Only include the platforms listed above as keys in the posts object. Make every post genuinely high quality, platform-native, and ready to publish.`;
    }

    const result = await generateJSON(prompt);

    if (!result || (!result.posts && !result.days)) {
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

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
    console.error("Social media post generation error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}