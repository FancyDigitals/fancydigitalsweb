import { GoogleGenAI } from "@google/genai";

const PRIMARY_KEY = process.env.GEMINI_API_KEY;
const SECONDARY_KEY = process.env.GEMINI_API_KEY_2;

if (!PRIMARY_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

// ✅ Models ordered by: most capable → fastest fallback
// gemini-2.5-flash first because it's the one that actually worked
const MODEL_FALLBACKS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error) {
  const msg = (error?.message || "").toLowerCase();
  return (
    msg.includes("429") ||
    msg.includes("quota") ||
    msg.includes("rate") ||
    msg.includes("resource_exhausted") ||
    msg.includes("overloaded") ||
    msg.includes("503") ||
    msg.includes("high demand")
  );
}

async function tryWithKey({ apiKey, model, prompt }) {
  const ai = new GoogleGenAI({ apiKey });
  const keyLabel = apiKey === PRIMARY_KEY ? "PRIMARY" : "SECONDARY";
  console.log(`[Gemini] Trying model=${model} key=${keyLabel}`);

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      maxOutputTokens: 8192,
      temperature: 0.7,
    },
  });

  const text =
    response?.text ||
    response?.candidates?.[0]?.content?.parts?.[0]?.text;

  return text;
}

export async function generateWithGemini(prompt) {
  // Backoff: 10s → 30s → 60s for rate limit errors
  const rateLimitBackoffs = [10000, 30000, 60000];

  const keysToTry = SECONDARY_KEY
    ? [PRIMARY_KEY, SECONDARY_KEY]
    : [PRIMARY_KEY];

  let lastError = null;

  for (const model of MODEL_FALLBACKS) {
    for (const key of keysToTry) {
      for (let attempt = 0; attempt < rateLimitBackoffs.length; attempt++) {
        try {
          const result = await tryWithKey({ apiKey: key, model, prompt });

          if (!result) {
            throw new Error("Empty response from Gemini");
          }

          const keyLabel = key === PRIMARY_KEY ? "PRIMARY" : "SECONDARY";
          console.log(`[Gemini] ✅ Success model=${model} key=${keyLabel}`);
          return result;

        } catch (error) {
          lastError = error;
          const keyLabel = key === PRIMARY_KEY ? "PRIMARY" : "SECONDARY";

          if (isRateLimitError(error)) {
            console.warn(
              `[Gemini] ⚠️ Rate limit model=${model} key=${keyLabel} attempt=${attempt + 1}`
            );

            if (attempt < rateLimitBackoffs.length - 1) {
              const wait = rateLimitBackoffs[attempt];
              console.log(`[Gemini] Waiting ${wait / 1000}s before retry...`);
              await sleep(wait);
              // retry same model + key
            } else {
              console.warn(
                `[Gemini] Max retries hit for model=${model} key=${keyLabel}. Moving on.`
              );
              break; // move to next key
            }
          } else {
            // Non-rate error — don't retry this key, move on immediately
            console.error(
              `[Gemini] ❌ Non-rate error model=${model} key=${keyLabel}:`,
              error.message?.slice(0, 120)
            );
            break;
          }
        }
      }
    }

    console.warn(`[Gemini] Both keys failed for model=${model}. Trying next model.`);
  }

  console.error("[Gemini] All models and keys exhausted.");
  throw new Error("AI service is busy. Please try again in a minute.");
}

export async function generateJSON(prompt) {
  const text = await generateWithGemini(prompt);

  // Strip markdown code fences if Gemini wraps in ```json ... ```
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```[a-z]*\n?/i, "")
      .replace(/```\s*$/i, "")
      .trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("=== JSON PARSE FAILED ===");
    console.error("Raw text length:", text.length);
    console.error("Raw text (last 500 chars):", text.slice(-500));
    console.error("Cleaned text (last 500 chars):", cleaned.slice(-500));
    throw new Error("AI returned invalid format. Please try again.");
  }
}