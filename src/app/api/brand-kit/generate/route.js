import { NextResponse } from "next/server";
import { generateJSON, generateLogoImages } from "@/lib/ai/gemini";
import { checkAndIncrementUsage } from "@/lib/usage";
import { isPro } from "@/lib/pricing";

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

    const personalityText = personality
      ? Object.entries(personality)
          .map(([k, v]) => `${k}: ${v}/10`)
          .join(", ")
      : "Balanced";

    // ─────────────────────────────────────────────
    // STEP 1: Generate brand kit JSON
    // ─────────────────────────────────────────────
    const prompt = `You are a world-class brand strategist and designer. Create a complete, professional brand identity.

Business Name: ${business_name}
Tagline: ${tagline || "(generate one)"}
Industry: ${industry || "General"}
Style: ${style || "Modern"}
Brand Personality: ${personalityText}
Target Audience: ${audience || "General"}
Preferred Color Direction: ${preferred_color || "AI decides based on industry and style"}
Logo Preference: ${logo_preference || "Combination Mark"}
Additional Description: ${description || ""}

CRITICAL: Return PLAIN TEXT ONLY. Never use markdown syntax. No asterisks, no underscores, no hashes, no backticks.

Return a JSON object with this EXACT structure:

{
  "business_name": "${business_name}",
  "tagline": "Best tagline for this brand",
  "brand_story": "A compelling 200-300 word brand story that captures the mission, vision, and unique value.",
  "mission": "One sentence mission statement",
  "vision": "One sentence vision statement",
  "values": [
    { "title": "Value 1", "description": "Why it matters" },
    { "title": "Value 2", "description": "Why it matters" },
    { "title": "Value 3", "description": "Why it matters" }
  ],
  "brand_voice": {
    "description": "150-word description of the brand voice — tone, personality, how to speak",
    "adjectives": ["Confident", "Warm", "Clear", "Bold", "Human"],
    "dos": [
      "Do use short, punchy sentences",
      "Do speak directly to the reader",
      "Do use concrete examples",
      "Do celebrate customer wins",
      "Do sound human and approachable"
    ],
    "donts": [
      "Don't use corporate jargon",
      "Don't over-promise",
      "Don't sound generic",
      "Don't be preachy",
      "Don't use passive voice"
    ],
    "sample_sentence": "A sample sentence demonstrating the voice."
  },
  "colors": [
    { "name": "Primary", "hex": "#075a01", "rgb": "rgb(7, 90, 1)", "hsl": "hsl(114, 98%, 18%)", "usage": "Main brand color for logos, primary buttons, and hero sections" },
    { "name": "Secondary", "hex": "#0a8f01", "rgb": "rgb(10, 143, 1)", "hsl": "hsl(116, 99%, 28%)", "usage": "Supporting brand color for accents and secondary elements" },
    { "name": "Accent", "hex": "#ff914d", "rgb": "rgb(255, 145, 77)", "hsl": "hsl(21, 100%, 65%)", "usage": "Highlight color for CTAs, badges, and emphasis" },
    { "name": "Neutral Dark", "hex": "#111827", "rgb": "rgb(17, 24, 39)", "hsl": "hsl(220, 39%, 11%)", "usage": "Primary text color and dark backgrounds" },
    { "name": "Neutral Light", "hex": "#f9fafb", "rgb": "rgb(249, 250, 251)", "hsl": "hsl(210, 20%, 98%)", "usage": "Background surfaces and light text on dark" },
    { "name": "Success", "hex": "#10b981", "rgb": "rgb(16, 185, 129)", "hsl": "hsl(160, 84%, 39%)", "usage": "Success states and positive feedback" },
    { "name": "Warning", "hex": "#f59e0b", "rgb": "rgb(245, 158, 11)", "hsl": "hsl(38, 92%, 50%)", "usage": "Warning states and cautions" },
    { "name": "Error", "hex": "#ef4444", "rgb": "rgb(239, 68, 68)", "hsl": "hsl(0, 84%, 60%)", "usage": "Error states and destructive actions" }
  ],
  "typography": {
    "heading": {
      "family": "Google Font name for headings",
      "weights": [400, 600, 800, 900],
      "usage": "Used for all headings, hero text, and display type",
      "sample": "Bold headlines that command attention"
    },
    "body": {
      "family": "Google Font name for body",
      "weights": [400, 500, 600, 700],
      "usage": "Used for paragraphs, UI text, and general reading",
      "sample": "Clean readable body text for content"
    },
    "mono": {
      "family": "Google Font name for mono",
      "weights": [400, 500],
      "usage": "Used for code, data, and technical specs",
      "sample": "const brand = { primary: 'green' };"
    },
    "scale": {
      "h1": "72px",
      "h2": "48px",
      "h3": "32px",
      "h4": "24px",
      "body_large": "20px",
      "body": "16px",
      "small": "14px",
      "caption": "12px"
    }
  },
  "taglines": [
    "Main tagline",
    "Alternative tagline 1",
    "Alternative tagline 2",
    "Alternative tagline 3",
    "Alternative tagline 4"
  ],
  "social_bios": {
    "Instagram": "Short punchy bio under 150 chars with emojis appropriate",
    "LinkedIn": "Professional bio focused on mission and impact — 200 chars",
    "Twitter": "Punchy bio under 160 chars",
    "TikTok": "Casual playful bio under 80 chars"
  },
  "logo_concepts": [
    { "type": "Wordmark", "description": "Clean typography-based logo using the heading font" },
    { "type": "Combination", "description": "Icon + text combination with initials in a rounded shape" },
    { "type": "Icon", "description": "Standalone icon/monogram using brand initials" }
  ]
}

Make everything genuinely strategic and on-brand. Colors should reflect the industry and personality. Fonts should match the style.`;

    const result = await generateJSON(prompt);

    if (!result || !result.colors || !result.typography) {
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

    // ─────────────────────────────────────────────
    // STEP 1B: Generate SVG logo marks + palette-locked prompts
    // ─────────────────────────────────────────────
    const primaryHex = result.colors?.[0]?.hex || "#075a01";
    const secondaryHex = result.colors?.[1]?.hex || "#0a8f01";
    const accentHex = result.colors?.[2]?.hex || "#ff914d";
    const darkHex = result.colors?.find((c) => c.name?.toLowerCase().includes("dark"))?.hex || "#111827";

    const logoSystemPrompt = `You are a world-class logo designer with expertise in vector art and SVG.

Business: ${result.business_name}
Industry: ${industry || "General"}
Style: ${style || "Modern"}
Brand feel: ${personalityText}

Use ONLY these EXACT brand colors:
Primary: ${primaryHex}
Secondary: ${secondaryHex}
Accent: ${accentHex}
Dark: ${darkHex}
(You may also use pure white #ffffff for negative space)

CRITICAL: Return PLAIN TEXT ONLY. No markdown, no code fences, no backticks.

Return valid JSON with this EXACT structure:

{
  "logo_svg_marks": [
    {
      "name": "Concept 1 — Abstract",
      "type": "Abstract Mark",
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'>...actual paths and shapes...</svg>"
    },
    {
      "name": "Concept 2 — Geometric",
      "type": "Geometric Mark",
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'>...actual paths and shapes...</svg>"
    },
    {
      "name": "Concept 3 — Modern",
      "type": "Modern Mark",
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'>...actual paths and shapes...</svg>"
    }
  ],
  "logo_image_prompts": [
    "Icon-only image prompt WITHOUT any text/letters. Abstract symbol representing the business essence. Use exact colors primary ${primaryHex} and secondary ${secondaryHex}. Minimalist vector logo, centered, white background, high contrast, professional brand mark, geometric shapes, clean lines.",
    "Icon-only image prompt WITHOUT any text/letters. Different geometric concept. Use exact colors primary ${primaryHex} and accent ${accentHex}. Modern vector logo, centered, white background, bold shapes, professional design.",
    "Icon-only image prompt WITHOUT any text/letters. Third unique abstract concept. Use exact colors primary ${primaryHex} and secondary ${secondaryHex}. Sleek minimalist mark, centered, white background, distinctive silhouette, memorable design."
  ],
  "logo_prompts": [
    "Full lockup logo prompt for Midjourney/DALL-E. ${result.business_name} wordmark using modern sans-serif typography. Use exact colors primary ${primaryHex} and secondary ${secondaryHex}. Clean, minimalist, professional, --ar 16:9",
    "Icon logo prompt for Midjourney/DALL-E. Abstract mark representing ${industry || 'the business'}. Use exact colors primary ${primaryHex} and accent ${accentHex}. Vector style, minimalist, professional, --ar 1:1",
    "Combination mark prompt for Midjourney/DALL-E. ${result.business_name} with abstract icon. Use exact colors primary ${primaryHex} and secondary ${secondaryHex}. Modern, geometric, professional brand identity, --ar 3:2"
  ]
}

SVG DESIGN RULES (CRITICAL — follow exactly):
- viewBox MUST be "0 0 512 512"
- width="512" height="512"
- xmlns="http://www.w3.org/2000/svg" REQUIRED
- Use ONLY these SVG elements: <circle>, <rect>, <path>, <polygon>, <ellipse>, <g>, <line>, <linearGradient>, <radialGradient>, <defs>, <stop>
- NO <text> elements — icon marks only (no letters)
- NO external images, NO <image>, NO base64
- NO fonts required
- Centered composition — most content between coords 80-432
- Use fill attribute with the exact brand hex colors above
- Can use gradients (linearGradient/radialGradient) with brand colors
- Design should be modern, geometric, minimal, brandable
- Think: Stripe, Linear, Vercel, Notion, Framer logo aesthetics
- Each concept must be VISUALLY DIFFERENT from the others
- Escape all quotes properly if inline (use single quotes for attributes inside svg strings)

EXAMPLES of great SVG mark structures:
- Layered geometric shapes with brand colors
- Overlapping circles with gradient fills
- Abstract letterforms (not real text — pure shapes)
- Interlocking geometric patterns
- Minimalist single-color marks with clever negative space
- Bold shapes with accent color highlights`;

    let logoSystem = null;
    try {
      logoSystem = await generateJSON(logoSystemPrompt);
      console.log(`[BrandKit] Logo system generated: ${logoSystem?.logo_svg_marks?.length || 0} SVG marks`);
    } catch (e) {
      console.warn("[BrandKit] Logo system generation failed:", e?.message);
    }

    // Attach SVG marks + palette-locked prompts to the result
    if (logoSystem?.logo_svg_marks?.length) {
      // Validate each SVG has proper structure
      const validSvgs = logoSystem.logo_svg_marks.filter(
        (m) => m?.svg && typeof m.svg === "string" && m.svg.includes("<svg") && m.svg.includes("</svg>")
      );
      result.logo_svg_marks = validSvgs;
    } else {
      result.logo_svg_marks = [];
    }

    result.logo_image_prompts = logoSystem?.logo_image_prompts || [];
    result.logo_prompts = logoSystem?.logo_prompts || [];

    // ─────────────────────────────────────────────
    // STEP 2: Generate real AI image logos (PNG)
    // ─────────────────────────────────────────────
    const userIsPro = usageResult.isPro;
    const numImagesToGenerate = userIsPro ? 3 : 1;

    const enhancedImagePrompts = (result.logo_image_prompts || [])
      .slice(0, numImagesToGenerate)
      .map(
        (p) =>
          `${p} ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO NUMBERS in the image. Pure icon/mark only. White background. Minimalist vector logo style. Centered composition. High resolution. Professional brand mark. Sharp clean edges.`
      );

    let logoImages = [];
    if (enhancedImagePrompts.length > 0) {
      try {
        logoImages = await generateLogoImages(enhancedImagePrompts);
        logoImages = logoImages.filter(Boolean); // Remove nulls
        console.log(`[BrandKit] Generated ${logoImages.length}/${numImagesToGenerate} PNG logo images`);
      } catch (err) {
        console.warn("[BrandKit] Image generation failed, continuing without", err.message);
        logoImages = [];
      }
    }

    result.logo_images = logoImages;
    result.logo_images_pro_only = !userIsPro && logoImages.length < 3;

    return NextResponse.json({
      success: true,
      data: result,
      usage: {
        used: usageResult.used,
        limit: usageResult.limit,
        isPro: userIsPro,
        plan: usageResult.plan,
      },
    });
  } catch (error) {
    console.error("Brand kit generation error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}