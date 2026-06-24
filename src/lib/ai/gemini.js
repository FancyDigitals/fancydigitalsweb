import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Order: fastest/best first, fallback to lighter models
const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
];

// Sleep helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Check if error is retryable (rate limit / overloaded / temporary)
function isRetryableError(error) {
  const msg = (error?.message || "").toLowerCase();
  return (
    msg.includes("429") ||
    msg.includes("503") ||
    msg.includes("502") ||
    msg.includes("500") ||
    msg.includes("unavailable") ||
    msg.includes("quota") ||
    msg.includes("rate") ||
    msg.includes("overload") ||
    msg.includes("high demand") ||
    msg.includes("busy") ||
    msg.includes("resource_exhausted") ||
    msg.includes("timeout") ||
    msg.includes("fetch failed") ||
    msg.includes("network")
  );
}

// Check if error means model doesn't exist (should skip to next model)
function isModelNotFound(error) {
  const msg = (error?.message || "").toLowerCase();
  return msg.includes("404") || msg.includes("not found");
}

export async function generateWithGemini(prompt, options = {}) {
  const modelsToTry = options.model ? [options.model] : MODELS;
  let lastError = null;
  const maxRetriesPerModel = 2;

  // Try each model with retries
  for (const model of modelsToTry) {
    for (let attempt = 0; attempt < maxRetriesPerModel; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens || 8192,
          },
        });

        console.log(`✅ Generated with ${model} (attempt ${attempt + 1})`);
        return response.text;
      } catch (error) {
        lastError = error;
        const msg = error?.message || "";
        console.warn(`❌ ${model} attempt ${attempt + 1} failed:`, msg.substring(0, 150));

        // If model doesn't exist, skip remaining attempts for this model
        if (isModelNotFound(error)) {
          break;
        }

        // If it's a retryable error and we have retries left, wait and retry
        if (isRetryableError(error) && attempt < maxRetriesPerModel - 1) {
          // Exponential backoff: 2s, 4s
          const waitTime = Math.pow(2, attempt + 1) * 1000;
          console.log(`⏳ Waiting ${waitTime}ms before retry...`);
          await sleep(waitTime);
          continue;
        }

        // If retryable but no retries left, try next model
        if (isRetryableError(error)) {
          break;
        }

        // Non-retryable error — throw immediately
        throw error;
      }
    }
  }

  console.error("All Gemini models failed:", lastError);
  throw new Error(
    "AI service is busy right now. Please try again in 30 seconds."
  );
}

export async function generateJSON(prompt) {
  const text = await generateWithGemini(
    prompt + "\n\nCRITICAL: Respond with ONLY raw JSON. No markdown. No code blocks. No backticks. No explanation. Start directly with { and end with }.",
    { maxTokens: 8192 }
  );

  let cleaned = text.trim();

  // Remove markdown code blocks
  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/i, "");

  // Find JSON object in text
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("=== JSON PARSE FAILED ===");
    console.error("Raw text length:", text.length);
    console.error("Raw text (last 500 chars):", text.slice(-500));
    console.error("Cleaned text (last 500 chars):", cleaned.slice(-500));
    throw new Error("AI returned invalid format. Please try again.");
  }
}