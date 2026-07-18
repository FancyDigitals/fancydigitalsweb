import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import OpenAI from "openai";

// ─── API KEYS ────────────────────────────────────────────────────────────────
// Support multiple key naming conventions and rotate through all available
const RAW_GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean);

if (RAW_GEMINI_KEYS.length === 0) {
  throw new Error(
    "No Gemini API keys found. Set at least one of: GEMINI_API_KEY, GEMINI_API_KEY_2, GEMINI_API_KEY_3"
  );
}

const GEMINI_KEY_1 = RAW_GEMINI_KEYS[0];
const GEMINI_KEY_2 = RAW_GEMINI_KEYS[1] || null;
const GEMINI_KEY_3 = RAW_GEMINI_KEYS[2] || null;
const GROQ_KEY = process.env.GROQ_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

// ─── PROVIDER CONFIGS ────────────────────────────────────────────────────────

const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-2.5-flash-image-preview",
  "gemini-2.0-flash-preview-image-generation",
];

const GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "gemma2-9b-it",
  "mixtral-8x7b-32768",
];

const OPENROUTER_MODELS = [
  "anthropic/claude-sonnet-4.5",
  "anthropic/claude-sonnet-4",
  "google/gemini-2.5-flash",
  "openai/gpt-4.1-mini",
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
    maxOutputTokens: 65535,
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

async function tryOpenRouter({ model, prompt, jsonMode }) {
  if (!OPENROUTER_KEY) throw new Error("No OpenRouter API key");

  const client = new OpenAI({
    apiKey: OPENROUTER_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://fancydigitals.com.ng",
      "X-Title": "Fancy Digitals",
    },
  });

  let userMessage = "";

  if (typeof prompt === "string") {
    userMessage = prompt;
  } else if (Array.isArray(prompt)) {
    userMessage = prompt
      .map((p) => {
        if (typeof p === "string") return p;
        if (p?.parts) return p.parts.map((x) => x.text || "").join("\n");
        if (p?.text) return p.text;
        return JSON.stringify(p);
      })
      .join("\n\n");
  } else {
    userMessage = JSON.stringify(prompt);
  }

  const response = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: jsonMode
          ? "Return ONLY valid JSON."
          : "You are a helpful assistant.",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    temperature: 0.2,
    max_tokens: 12000,
  });

  return response.choices[0].message.content;
}

// ─── MAIN ENGINE ─────────────────────────────────────────────────────────────

export async function generateWithGemini(prompt, { jsonMode = true } = {}) {
  const geminiKeys = [GEMINI_KEY_1, GEMINI_KEY_2, GEMINI_KEY_3].filter(Boolean);

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
        if (jsonMode) {
  try {
    JSON.parse(result);
  } catch {
    console.warn("[AI] Invalid JSON from Gemini. Trying next model...");
    continue;
  }
}

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

  // ── PHASE 2: Try OpenRouter ──
if (OPENROUTER_KEY) {
  console.warn("[AI] Trying OpenRouter...");

  for (const model of OPENROUTER_MODELS) {
    try {
      const result = await tryOpenRouter({
        model,
        prompt,
        jsonMode,
      });

      console.log(`[AI] ✅ OpenRouter success model=${model}`);

      if (jsonMode) {
        try {
          JSON.parse(result);
        } catch {
          console.warn("[AI] Invalid JSON from OpenRouter.");
          continue;
        }
      }

      return result;
    } catch (error) {
      lastError = error;

      console.warn(
        `[AI] ❌ OpenRouter ${model}: ${error.message?.slice(0, 120)}`
      );

      continue;
    }
  }
}
  // ── PHASE 3: Try all Groq models ──
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
   IMAGE GENERATION — Logo & brand mark creation
============================================================ */

/**
 * Generate a logo image using Gemini 2.5 Flash Image.
 * Returns base64 data URL.
 * @param {string} prompt - The image generation prompt
 * @returns {Promise<string|null>} - data:image/png;base64,... or null on failure
 */
export async function generateLogoImage(prompt) {
  if (!prompt || typeof prompt !== "string") return null;

  const geminiKeys = [GEMINI_KEY_1, GEMINI_KEY_2, GEMINI_KEY_3].filter(Boolean);

  // ── PHASE 1: Try Gemini image models ──
  for (const model of GEMINI_IMAGE_MODELS) {
    for (const key of geminiKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey: key });
        const keyLabel = key === GEMINI_KEY_1 ? "PRIMARY" : "SECONDARY";
        console.log(`[Image] Trying ${model} key=${keyLabel}`);

        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseModalities: ["Image"],
          },
        });

        // Extract image data from response
        const parts = response?.candidates?.[0]?.content?.parts || [];
        for (const part of parts) {
          if (part?.inlineData?.data) {
            const mimeType = part.inlineData.mimeType || "image/png";
            const base64 = part.inlineData.data;
            console.log(`[Image] ✅ Success model=${model}`);
            return `data:${mimeType};base64,${base64}`;
          }
        }

        console.warn(`[Image] No image data in response from ${model}`);
      } catch (error) {
        const errType = classifyError(error);
        console.warn(
          `[Image] ❌ ${errType} model=${model}: ${error.message?.slice(0, 120)}`
        );
        continue;
      }
    }
  }

  // ── PHASE 2: OpenRouter fallback (FLUX Schnell — free/cheap) ──
  if (OPENROUTER_KEY) {
    try {
      console.log("[Image] Trying OpenRouter FLUX fallback");
      const client = new OpenAI({
        apiKey: OPENROUTER_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": "https://fancydigitals.com.ng",
          "X-Title": "Fancy Digitals",
        },
      });

      const response = await client.chat.completions.create({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      });

      const content = response?.choices?.[0]?.message;
      // OpenRouter returns images differently — check for images array
      if (content?.images && content.images.length > 0) {
        const img = content.images[0];
        if (img?.image_url?.url) {
          console.log("[Image] ✅ OpenRouter success");
          return img.image_url.url; // Already a data URL
        }
      }
    } catch (err) {
      console.warn(`[Image] ❌ OpenRouter fallback failed: ${err.message?.slice(0, 120)}`);
    }
  }

  console.warn("[Image] All image providers failed");
  return null;
}

/**
 * Generate multiple logo images in parallel.
 * @param {Array<string>} prompts - Array of prompts
 * @returns {Promise<Array<string|null>>} - Array of base64 data URLs
 */
export async function generateLogoImages(prompts) {
  if (!Array.isArray(prompts) || prompts.length === 0) return [];
  const results = await Promise.all(prompts.map((p) => generateLogoImage(p)));
  return results;
}

/* ============================================================
   VISION — Structured image analysis with Gemini
============================================================ */

/**
 * Analyze a base64 image and return structured metadata.
 * @param {string} base64Image - Full data URL (data:image/png;base64,...)
 * @returns {Promise<object>} - { label, subject, categories, mood, composition, bestUse, description }
 */
export async function analyzeImage(base64Image) {
  const empty = {
    label: "",
    subject: "",
    categories: [],
    mood: "",
    composition: "",
    bestUse: [],
    description: "",
  };

  if (!base64Image || typeof base64Image !== "string") {
    return empty;
  }

  const match = base64Image.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
  if (!match) {
    console.warn("[Vision] Invalid image format");
    return empty;
  }

  const mimeType = match[1];
  const data = match[2];

  const prompt = `Analyze this image for use in an AI-generated commercial video.

Return ONLY valid JSON in this exact shape (no markdown, no fences):

{
  "label": "short 3-6 word summary",
  "subject": "primary subject in one phrase",
  "categories": ["choose from: people, product, logo, office, building, food, clothing, technology, vehicle, document, environment, close-up, wide-shot, portrait, screenshot, illustration, texture, hands, team, workspace"],
  "mood": "one word: energetic | calm | professional | luxurious | playful | serious | inspiring | intimate | dramatic",
  "composition": "one phrase describing layout: centered subject | rule of thirds | negative space left | negative space right | full frame | symmetrical | busy",
  "bestUse": ["choose 1-3 from: opening, product-showcase, testimonial, demonstration, team-reveal, environment-establishing, closing-cta, logo-reveal, transition, b-roll"],
  "description": "one sentence describing what's in the image and why it would work in a commercial"
}

Be precise. Categories and bestUse must be from the allowed lists.`;

  const contents = [
    {
      role: "user",
      parts: [
        { text: prompt },
        { inlineData: { mimeType, data } },
      ],
    },
  ];

  const geminiKeys = [GEMINI_KEY_1, GEMINI_KEY_2, GEMINI_KEY_3].filter(Boolean);
  const visionModels = [
    "gemini-2.0-flash",
    "gemini-2.5-flash",
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
            maxOutputTokens: 500,
            temperature: 0.3,
            responseMimeType: "application/json",
          },
        });

        let text = null;
        if (typeof response?.text === "function") text = response.text();
        else if (typeof response?.text === "string") text = response.text;
        else text = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

        if (!text) continue;

        const cleaned = String(text)
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

        console.log(`[Vision] ✅ ${result.label} · ${result.categories.join(", ")}`);
        return result;
      } catch (err) {
        console.warn(`[Vision] ❌ ${model} failed: ${err.message?.slice(0, 100)}`);
        continue;
      }
    }
  }



  console.warn("[Vision] All vision models failed");
  return empty;
}