import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.5-flash-lite",
];

export async function generateWithGemini(prompt, options = {}) {
  const modelsToTry = options.model ? [options.model] : MODELS;
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 8192,  // ⬅️ bumped to 8192
        },
      });

      console.log(`✅ Generated with model: ${model}`);
      return response.text;
    } catch (error) {
      lastError = error;
      const msg = error.message || "";
      console.warn(`❌ Model ${model} failed:`, msg.substring(0, 200));

      // Try next model on rate limit, not found, OR overloaded
      if (
        msg.includes("429") ||
        msg.includes("404") ||
        msg.includes("503") ||      // ⬅️ handle overloaded
        msg.includes("UNAVAILABLE") ||
        msg.includes("quota") ||
        msg.includes("not found") ||
        msg.includes("high demand") ||
        msg.includes("RESOURCE_EXHAUSTED")
      ) {
        continue;
      }

      throw error;
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