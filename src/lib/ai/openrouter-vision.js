import OpenAI from "openai";

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

const VISION_MODELS = [
  "google/gemini-2.5-flash",
  "google/gemini-2.0-flash-001",
  "anthropic/claude-sonnet-4.5",
  "openai/gpt-4o-mini",
];

const client = new OpenAI({
  apiKey: OPENROUTER_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://fancydigitals.com.ng",
    "X-Title": "Fancy Digitals",
  },
});

/**
 * Analyze a base64 image via OpenRouter vision models.
 * @param {string} base64Image - data URL (data:image/png;base64,...)
 * @returns {Promise<object>}
 */
export async function analyzeImageOpenRouter(base64Image) {
  const empty = {
    label: "",
    subject: "",
    categories: [],
    mood: "",
    composition: "",
    bestUse: [],
    description: "",
  };

  if (!base64Image || typeof base64Image !== "string") return empty;
  if (!OPENROUTER_KEY) {
    console.warn("[Vision-OR] No OpenRouter key");
    return empty;
  }

  const prompt = `Analyze this image for use in an AI-generated commercial video.

Return ONLY valid JSON in this exact shape:

{
  "label": "3-6 word summary",
  "subject": "primary subject in one phrase",
  "categories": ["choose from: people, product, logo, office, building, food, clothing, technology, vehicle, document, environment, close-up, wide-shot, portrait, screenshot, illustration, texture, hands, team, workspace"],
  "mood": "one word: energetic | calm | professional | luxurious | playful | serious | inspiring | intimate | dramatic",
  "composition": "one phrase: centered subject | rule of thirds | negative space left | negative space right | full frame | symmetrical | busy",
  "bestUse": ["1-3 from: opening, product-showcase, testimonial, demonstration, team-reveal, environment-establishing, closing-cta, logo-reveal, transition, b-roll"],
  "description": "one sentence"
}`;

  for (const model of VISION_MODELS) {
    try {
      console.log(`[Vision-OR] Trying ${model}`);
      const response = await client.chat.completions.create({
        model,
        max_tokens: 600,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: { url: base64Image },
              },
            ],
          },
        ],
      });

      const content = response?.choices?.[0]?.message?.content;
      if (!content) {
        console.warn(`[Vision-OR] ${model} returned empty content`);
        continue;
      }

      const cleaned = String(content)
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      const result = {
        label: (parsed.label || "").toString().trim(),
        subject: (parsed.subject || "").toString().trim(),
        categories: Array.isArray(parsed.categories)
          ? parsed.categories.map((c) => String(c).toLowerCase().trim())
          : [],
        mood: (parsed.mood || "").toString().toLowerCase().trim(),
        composition: (parsed.composition || "").toString().toLowerCase().trim(),
        bestUse: Array.isArray(parsed.bestUse)
          ? parsed.bestUse.map((u) => String(u).toLowerCase().trim())
          : [],
        description: (parsed.description || "").toString().trim(),
      };

      console.log(
        `[Vision-OR] ✅ ${model} → ${result.label} · ${result.categories.join(", ")}`
      );
      return result;
    } catch (err) {
      console.warn(
        `[Vision-OR] ❌ ${model}: ${err.message?.slice(0, 120)}`
      );
      continue;
    }
  }

  console.warn("[Vision-OR] All models failed");
  return empty;
}