import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

// ─── API KEYS ────────────────────────────────────────────────────────────────
const GEMINI_KEY_1 = process.env.GEMINI_API_KEY;
const GEMINI_KEY_2 = process.env.GEMINI_API_KEY_2;
const GROQ_KEY = process.env.GROQ_API_KEY;

if (!GEMINI_KEY_1) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

// ─── PROVIDER CONFIGS ────────────────────────────────────────────────────────

const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

const GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "gemma2-9b-it",
  "mixtral-8x7b-32768",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function classifyError(error) {
  const msg = (error?.message || "").toLowerCase();
  if (msg.includes("429") || msg.includes("quota") || msg.includes("resource_exhausted")) return "QUOTA";
  if (msg.includes("rate") || msg.includes("high demand")) return "RATE";
  if (msg.includes("503") || msg.includes("overloaded") || msg.includes("unavailable")) return "OVERLOADED";
  if (msg.includes("401") || msg.includes("403") || msg.includes("permission") || msg.includes("api key")) return "AUTH";
  return "OTHER";
}

// ─── GEMINI PROVIDER ─────────────────────────────────────────────────────────

async function tryGemini({ apiKey, model, prompt, jsonMode }) {
  const ai = new GoogleGenAI({ apiKey });
  const keyLabel = apiKey === GEMINI_KEY_1 ? "PRIMARY" : "SECONDARY";
  console.log(`[AI] Trying Gemini model=${model} key=${keyLabel}`);

  const config = {
    maxOutputTokens: 8192,
    temperature: 0.2,
  };
  if (jsonMode) {
    config.responseMimeType = "application/json";
  }

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config,
  });

  let text = null;
  if (typeof response?.text === "function") {
    text = response.text();
  } else if (typeof response?.text === "string") {
    text = response.text;
  } else {
    text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      response?.candidates?.[0]?.output ??
      null;
  }

  if (!text) throw new Error("Empty response from Gemini");
  return typeof text === "string" ? text : String(text);
}

// ─── GROQ PROVIDER ──────────────────────────────────────────────────────────

async function tryGroq({ model, prompt, jsonMode }) {
  if (!GROQ_KEY) throw new Error("No Groq API key");

  const groq = new Groq({ apiKey: GROQ_KEY });
  console.log(`[AI] Trying Groq model=${model}`);

  // Convert Gemini prompt format to Groq/OpenAI format
  let userMessage = "";
  if (typeof prompt === "string") {
    userMessage = prompt;
  } else if (Array.isArray(prompt)) {
    userMessage = prompt.map((p) => {
      if (typeof p === "string") return p;
      if (p?.parts) return p.parts.map((part) => part?.text || "").join("\n");
      if (p?.text) return p.text;
      return JSON.stringify(p);
    }).join("\n\n");
  } else if (prompt?.parts) {
    userMessage = prompt.parts.map((p) => p?.text || "").join("\n");
  } else {
    userMessage = JSON.stringify(prompt);
  }

  const messages = [
    {
      role: "system",
      content: jsonMode
        ? "You are a helpful assistant. You MUST respond with valid JSON only. No markdown, no explanation, just raw JSON."
        : "You are a helpful assistant.",
    },
    { role: "user", content: userMessage },
  ];

  const completion = await groq.chat.completions.create({
    model,
    messages,
    temperature: 0.2,
    max_tokens: 8192,
    response_format: jsonMode ? { type: "json_object" } : undefined,
  });

  const text = completion?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from Groq");
  return text;
}

// ─── MAIN ENGINE ─────────────────────────────────────────────────────────────

export async function generateWithGemini(prompt, { jsonMode = true } = {}) {
  const geminiKeys = GEMINI_KEY_2 ? [GEMINI_KEY_1, GEMINI_KEY_2] : [GEMINI_KEY_1];

  let lastError = null;
  let quotaHits = 0;
  let totalAttempts = 0;

  // ── PHASE 1: Try all Gemini models with both keys ──
  for (const model of GEMINI_MODELS) {
    for (const key of geminiKeys) {
      totalAttempts++;
      try {
        const result = await tryGemini({ apiKey: key, model, prompt, jsonMode });
        console.log(`[AI] ✅ Gemini success model=${model}`);
        return result;
      } catch (error) {
        lastError = error;
        const errType = classifyError(error);
        const keyLabel = key === GEMINI_KEY_1 ? "PRIMARY" : "SECONDARY";
        console.warn(`[AI] ❌ Gemini ${errType} model=${model} key=${keyLabel}: ${error.message?.slice(0, 120)}`);

        if (errType === "QUOTA") {
          quotaHits++;
          continue;
        }
        if (errType === "OVERLOADED") {
          await sleep(3000);
          try {
            const result = await tryGemini({ apiKey: key, model, prompt, jsonMode });
            console.log(`[AI] ✅ Gemini success after overload retry`);
            return result;
          } catch {
            continue;
          }
        }
        continue;
      }
    }
  }

  console.warn(`[AI] ⚠️ All Gemini attempts failed (${totalAttempts} tries, ${quotaHits} quota hits). Falling back to Groq.`);

  // ── PHASE 2: Try all Groq models ──
  if (GROQ_KEY) {
    for (const model of GROQ_MODELS) {
      try {
        const result = await tryGroq({ model, prompt, jsonMode });
        console.log(`[AI] ✅ Groq success model=${model}`);
        return result;
      } catch (error) {
        lastError = error;
        const errType = classifyError(error);
        console.warn(`[AI] ❌ Groq ${errType} model=${model}: ${error.message?.slice(0, 120)}`);

        if (errType === "OVERLOADED") {
          await sleep(2000);
          try {
            const result = await tryGroq({ model, prompt, jsonMode });
            return result;
          } catch {
            continue;
          }
        }
        continue;
      }
    }
  }

  // ── ALL FAILED ──
  console.error("[AI] All providers exhausted.", {
    totalAttempts,
    quotaHits,
    groqAvailable: !!GROQ_KEY,
    lastError: lastError?.message?.slice(0, 200),
  });

  if (quotaHits >= geminiKeys.length * 2) {
    throw new Error(
      "AI service has reached today's quota limit. Please try again tomorrow, or upgrade to Pro for priority access."
    );
  }

  throw new Error("AI service is temporarily unavailable. Please try again in a few minutes.");
}

export async function generateJSON(prompt) {
  const text = await generateWithGemini(prompt, { jsonMode: true });

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
    console.error("[AI] JSON parse failed. First 500:", cleaned.slice(0, 500));
    console.error("[AI] Last 500:", cleaned.slice(-500));
    throw new Error("AI returned an invalid response format. Please try again.");
  }
}

/* ============================================================
   VISION — Analyze an image with Gemini
============================================================ */

/**
 * Analyze a base64 image and return a description
 * @param {string} base64Image - Full data URL (data:image/png;base64,...)
 * @returns {Promise<string>} - Description of what's in the image
 */
export async function analyzeImage(base64Image) {
  if (!base64Image || typeof base64Image !== "string") {
    return "";
  }

  // Extract mimeType and pure base64 from data URL
  const match = base64Image.match(/^data:(image\/[a-z]+);base64,(.+)$/i);
  if (!match) {
    console.warn("[Vision] Invalid image format");
    return "";
  }

  const mimeType = match[1];
  const data = match[2];

  const prompt = `Describe this image in 3-6 words maximum. Focus on WHAT is shown (subject, object, screen, scene).

Examples of good descriptions:
- "dashboard analytics chart"
- "signup form"
- "mobile app home screen"
- "team meeting laptop"
- "product landing page"

Return ONLY the description. No punctuation, no explanation.`;

  const contents = [
    {
      role: "user",
      parts: [
        { text: prompt },
        {
          inlineData: {
            mimeType,
            data,
          },
        },
      ],
    },
  ];

  // Use Gemini directly (vision requires structured contents, not our text engine)
  const geminiKeys = GEMINI_KEY_2 ? [GEMINI_KEY_1, GEMINI_KEY_2] : [GEMINI_KEY_1];
  const visionModels = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
  ];

  for (const model of visionModels) {
    for (const key of geminiKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey: key });
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            maxOutputTokens: 100,
            temperature: 0.3,
          },
        });

        let text = null;
        if (typeof response?.text === "function") text = response.text();
        else if (typeof response?.text === "string") text = response.text;
        else text = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

        if (text) {
          const cleaned = String(text).trim().toLowerCase().replace(/[."]/g, "");
          console.log(`[Vision] ✅ Analyzed: "${cleaned}"`);
          return cleaned;
        }
      } catch (err) {
        console.warn(`[Vision] ❌ ${model} failed: ${err.message?.slice(0, 100)}`);
        continue;
      }
    }
  }

  console.warn("[Vision] All models failed for this image");
  return "";
}