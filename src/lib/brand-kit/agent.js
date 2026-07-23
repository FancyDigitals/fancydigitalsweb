import { generateJSON } from "@/lib/ai/gemini";

// ─────────────────────────────────────────────
// AGENT 1: BRAND STRATEGIST
// Analyzes the business and builds a deep brand profile
// ─────────────────────────────────────────────
export async function runBrandStrategist({
  business_name,
  tagline,
  industry,
  description,
  audience,
  style,
  personality,
  preferred_color,
}) {
  const personalityText = personality
    ? Object.entries(personality)
        .map(([k, v]) => `${k}: ${v}/10`)
        .join(", ")
    : "Balanced";

  const prompt = `You are a world-class Brand Strategist with 20 years of experience at Pentagram, Landor, and Wolff Olins.

Your job: Deeply analyze this business and build a strategic brand profile.

BUSINESS INPUT:
Name: ${business_name}
Tagline: ${tagline || "(not provided)"}
Industry: ${industry || "General"}
Description: ${description || "(not provided)"}
Target Audience: ${audience || "General"}
Preferred Style: ${style || "Modern"}
Personality Sliders: ${personalityText}
Color Preference: ${preferred_color || "(open)"}

CRITICAL: Return PLAIN TEXT ONLY inside JSON. No markdown. No asterisks. No hashes.

Analyze deeply and return this exact JSON structure:

{
  "industry_analysis": "2-3 sentence analysis of the industry landscape and where this business sits",
  "audience_persona": "2-3 sentence description of the ideal customer",
  "personality_traits": ["5-7 single-word traits like Premium, Trustworthy, Innovative, Warm, Confident"],
  "keywords": ["6-8 core brand keywords like Growth, Security, Precision, Community"],
  "emotion": "The single primary emotion this brand should evoke (one word: Confidence, Joy, Trust, Ambition, Calm, Excitement, Serenity, Power)",
  "competitor_context": "1-2 sentences on what competitors in this space typically do visually",
  "differentiation": "1-2 sentences on how this brand should stand out visually",
  "recommended_direction": "One sentence recommending the overall visual direction",
  "reasoning": "3-4 sentences explaining your strategic thinking, referencing the inputs"
}

Be genuinely strategic. Reference specific industry insights. Do not give generic answers.`;

  return await generateJSON(prompt);
}

// ─────────────────────────────────────────────
// AGENT 2: CREATIVE DIRECTOR
// Decides the best logo strategy based on brand profile
// ─────────────────────────────────────────────
export async function runCreativeDirector({ brandProfile, business_name, industry, user_preference }) {
  const prompt = `You are a Creative Director at a top-tier branding agency. You decide the visual strategy for logos.

BRAND PROFILE (from strategist):
${JSON.stringify(brandProfile, null, 2)}

BUSINESS NAME: ${business_name}
INDUSTRY: ${industry}
USER'S PREFERRED LOGO TYPE: ${user_preference || "(no preference — you decide)"}

Your job: Decide the best logo type strategy and explain why.

LOGO TYPE OPTIONS:
- Wordmark (Google, Coca-Cola style) — Best for: memorable short names, when the name IS the brand
- Lettermark (IBM, CNN style) — Best for: long or complex names, when initials work better
- Symbol/Pictorial (Apple, Twitter style) — Best for: brands that need iconic non-text recognition
- Abstract Mark (Nike swoosh, BP style) — Best for: unique conceptual brands
- Combination Mark (Adidas, Slack style) — Best for: new brands that need name + icon recognition
- Emblem (Starbucks, Harley Davidson style) — Best for: heritage brands, contained badge feel
- Monogram (LV, YSL style) — Best for: luxury or personal brands

CRITICAL: If the user specified a preference, RESPECT IT and explain how you'll execute it brilliantly. Only override with strong reasoning.

Return PLAIN TEXT inside JSON. No markdown.

{
  "chosen_logo_type": "Combination Mark",
  "reasoning": "3-4 sentence explanation of why this type is best for this specific business, referencing the brand profile",
  "alternatives_considered": [
    { "type": "Wordmark", "why_not": "Brief reason" },
    { "type": "Symbol", "why_not": "Brief reason" }
  ],
  "visual_direction": "2-3 sentence description of the overall aesthetic (colors, style, feel)",
  "style_keywords": ["4-5 visual keywords like Geometric, Minimal, Organic, Bold, Refined"],
  "inspiration_brands": ["3-4 real brand names whose logos share this DNA"]
}

Be decisive and confident. This is your professional recommendation.`;

  return await generateJSON(prompt);
}

// ─────────────────────────────────────────────
// AGENT 3: CONCEPT BRAINSTORM
// Generates 4 distinct creative concepts with rationale
// ─────────────────────────────────────────────
export async function runConceptBrainstorm({
  brandProfile,
  strategy,
  business_name,
  industry,
  description,
}) {
  const initials = business_name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

  const prompt = `You are a Senior Logo Designer generating a creative brief with 4 distinct logo concepts.

BRAND PROFILE:
${JSON.stringify(brandProfile, null, 2)}

STRATEGY:
${JSON.stringify(strategy, null, 2)}

BUSINESS: ${business_name} (initials: "${initials}")
INDUSTRY: ${industry}
DESCRIPTION: ${description}

Your job: Brainstorm 4 GENUINELY DIFFERENT logo concepts. Each must be visually and metaphorically distinct — not variations of the same idea.

For each concept, describe what the ICON portion should be (never describe adding text — text will be added separately by our system).

Think like a real designer:
- What metaphor represents this business?
- What visual form can carry that metaphor?
- Why would this concept be memorable?

Return PLAIN TEXT inside JSON. No markdown.

{
  "concepts": [
    {
      "name": "Concept name (2-3 words like 'Rising Peak' or 'Connected Nodes')",
      "metaphor": "The core metaphor/idea in one sentence",
      "visual_description": "2-3 sentences describing the icon visually — shapes, composition, feel",
      "why_it_works": "Why this concept fits the brand strategically (2 sentences)",
      "keywords": ["3-4 visual/conceptual keywords"],
      "flux_prompt": "Detailed image generation prompt for Flux (60-80 words). MUST include: 'professional logo icon', 'no text', 'no letters', 'white background', 'flat vector', 'centered', specific visual description, color hints"
    }
  ]
}

Generate EXACTLY 4 concepts. Each must be genuinely different — different metaphors, different visual forms, different emotional angles.`;

  return await generateJSON(prompt);
}

// ─────────────────────────────────────────────
// AGENT 4: CRITIQUE (runs AFTER images are generated)
// Scores each concept on design principles
// ─────────────────────────────────────────────
export async function runCritique({ concepts, business_name, brandProfile }) {
  // NOTE: We critique the CONCEPT DESCRIPTIONS, not the actual images
  // (Since Gemini can't reliably see the image we just made, we critique the design intent)

  const prompt = `You are a Design Critic at a top branding firm. Evaluate these 4 logo concepts for ${business_name}.

BRAND PROFILE:
${JSON.stringify(brandProfile, null, 2)}

CONCEPTS TO EVALUATE:
${JSON.stringify(concepts, null, 2)}

Score each concept on these principles (1-10):
- Memorability: Will people remember it?
- Simplicity: Is it clean and uncluttered?
- Uniqueness: Does it stand out from competitors?
- Scalability: Will it work at any size (favicon to billboard)?
- Timelessness: Will it look good in 10 years?
- Relevance: Does it fit this specific business?

Return PLAIN TEXT inside JSON. No markdown.

{
  "evaluations": [
    {
      "concept_name": "Name of the concept",
      "scores": {
        "memorability": 8,
        "simplicity": 9,
        "uniqueness": 7,
        "scalability": 9,
        "timelessness": 8,
        "relevance": 9
      },
      "total_score": 50,
      "strengths": ["2-3 strengths"],
      "weaknesses": ["1-2 weaknesses"],
      "verdict": "One sentence verdict"
    }
  ],
  "winner": "Name of the winning concept",
  "winner_reasoning": "2-3 sentences on why this concept is the strongest overall"
}

Be honest and critical. Not every concept is great.`;

  return await generateJSON(prompt);
}

// ─────────────────────────────────────────────
// AGENT 5: BRAND SYSTEM
// Builds colors, typography, voice, and everything else around the winning direction
// ─────────────────────────────────────────────
export async function runBrandSystem({
  business_name,
  tagline,
  brandProfile,
  strategy,
  winning_concept,
  preferred_color,
}) {
  const prompt = `You are a Brand System Designer building the complete visual language around a chosen logo direction.

BUSINESS: ${business_name}
TAGLINE: ${tagline || "(generate one)"}
BRAND PROFILE: ${JSON.stringify(brandProfile, null, 2)}
STRATEGY: ${JSON.stringify(strategy, null, 2)}
WINNING LOGO CONCEPT: ${JSON.stringify(winning_concept, null, 2)}
COLOR PREFERENCE: ${preferred_color || "(you decide based on brand)"}

Build the complete brand system. Everything must feel cohesive with the logo direction.

CRITICAL: Return PLAIN TEXT inside JSON. No markdown, no asterisks, no hashes.

{
  "business_name": "${business_name}",
  "tagline": "Best tagline (5-8 words)",
  "brand_story": "Compelling 200-word brand story",
  "mission": "One sentence mission",
  "vision": "One sentence vision",
  "values": [
    { "title": "Value 1", "description": "Why it matters" },
    { "title": "Value 2", "description": "Why it matters" },
    { "title": "Value 3", "description": "Why it matters" }
  ],
  "brand_voice": {
    "description": "150-word voice description",
    "adjectives": ["5-6 voice adjectives"],
    "dos": ["5 do statements"],
    "donts": ["5 don't statements"],
    "sample_sentence": "Example sentence in this voice"
  },
  "colors": [
    { "name": "Primary", "hex": "#RRGGBB", "rgb": "rgb(r,g,b)", "hsl": "hsl(h,s%,l%)", "usage": "When to use" },
    { "name": "Secondary", "hex": "#RRGGBB", "rgb": "rgb(r,g,b)", "hsl": "hsl(h,s%,l%)", "usage": "When to use" },
    { "name": "Accent", "hex": "#RRGGBB", "rgb": "rgb(r,g,b)", "hsl": "hsl(h,s%,l%)", "usage": "When to use" },
    { "name": "Neutral Dark", "hex": "#111827", "rgb": "rgb(17,24,39)", "hsl": "hsl(220,39%,11%)", "usage": "Text and dark backgrounds" },
    { "name": "Neutral Light", "hex": "#f9fafb", "rgb": "rgb(249,250,251)", "hsl": "hsl(210,20%,98%)", "usage": "Backgrounds" },
    { "name": "Success", "hex": "#10b981", "rgb": "rgb(16,185,129)", "hsl": "hsl(160,84%,39%)", "usage": "Success states" },
    { "name": "Warning", "hex": "#f59e0b", "rgb": "rgb(245,158,11)", "hsl": "hsl(38,92%,50%)", "usage": "Warnings" },
    { "name": "Error", "hex": "#ef4444", "rgb": "rgb(239,68,68)", "hsl": "hsl(0,84%,60%)", "usage": "Errors" }
  ],
  "typography": {
    "heading": { "family": "Google Font name", "weights": [400,600,800,900], "usage": "Description", "sample": "Sample heading" },
    "body": { "family": "Google Font name", "weights": [400,500,600,700], "usage": "Description", "sample": "Sample body text" },
    "mono": { "family": "Google Font name", "weights": [400,500], "usage": "Description", "sample": "Sample mono" },
    "scale": { "h1": "72px", "h2": "48px", "h3": "32px", "h4": "24px", "body_large": "20px", "body": "16px", "small": "14px", "caption": "12px" }
  },
  "taglines": ["Main tagline", "Alt 1", "Alt 2", "Alt 3", "Alt 4"],
  "social_bios": {
    "Instagram": "Bio under 150 chars",
    "LinkedIn": "Professional bio 200 chars",
    "Twitter": "Bio under 160 chars",
    "TikTok": "Casual bio under 80 chars"
  }
}

Colors must reflect the brand personality. Fonts must match the visual direction of the winning logo concept.`;

  return await generateJSON(prompt);
}