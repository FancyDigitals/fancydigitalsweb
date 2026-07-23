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
============================================================ *

/**
 * Generate a logo image using Pollinations.ai (free Flux image generation).
 * No API key required. Returns base64 data URL.
 * @param {string} prompt - The image generation prompt
 * @returns {Promise<string|null>} - data:image/png;base64,... or null on failure
 */
export async function generateLogoImage(prompt) {
  if (!prompt || typeof prompt !== "string") return null;

  try {
    const seed = Math.floor(Math.random() * 999999);
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;

    console.log(`[Image] Fetching from Pollinations.ai (seed=${seed})`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 40000);

    const response = await fetch(imageUrl, {
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength < 5000) {
      throw new Error(`Image too small (${buffer.byteLength} bytes) — likely an error page`);
    }

    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = response.headers.get("content-type") || "image/png";
    const mimeType = contentType.split(";")[0].trim();

    console.log(`[Image] ✅ Pollinations.ai success (${Math.round(buffer.byteLength / 1024)}KB)`);
    return `data:${mimeType};base64,${base64}`;
  } catch (err) {
    if (err.name === "AbortError") {
      console.warn("[Image] ❌ Pollinations.ai timed out (40s)");
    } else {
      console.warn(`[Image] ❌ Pollinations.ai error: ${err.message?.slice(0, 200)}`);
    }
    return null;
  }
}

/**
 * Generate multiple logo images SEQUENTIALLY to avoid Pollinations rate limiting.
 * @param {string[]} prompts - Array of image generation prompts
 * @returns {Promise<Array<string|null>>}
 */
export async function generateLogoImages(prompts) {
  if (!Array.isArray(prompts) || prompts.length === 0) return [];

  console.log(`[Image] Generating ${prompts.length} logos sequentially`);
  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    try {
      const result = await generateLogoImage(prompts[i]);
      if (result) {
        console.log(`[Image] ✅ Logo ${i + 1}/${prompts.length} done`);
        results.push(result);
      } else {
        console.warn(`[Image] ❌ Logo ${i + 1}/${prompts.length} failed`);
        results.push(null);
      }
    } catch (err) {
      console.warn(`[Image] ❌ Logo ${i + 1} error: ${err.message?.slice(0, 120)}`);
      results.push(null);
    }

    // Small delay between requests to avoid Pollinations rate limiting
    if (i < prompts.length - 1) {
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

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

// ============================================================
// LOGO GENERATION — Tiered: OpenRouter for Pro, Pollinations for Free
// ============================================================

/**
 * Generate a logo icon PNG image using Flux Schnell via OpenRouter.
 * Falls back to Pollinations.ai (free) if OpenRouter fails.
 * @param {string} prompt - Image generation prompt (icon only, no text)
 * @param {boolean} usePremium - If true, use paid OpenRouter Flux. If false, use free Pollinations.
 * @returns {Promise<string|null>} - data:image/png;base64,... or null
 */
export async function generateLogoIcon(prompt, usePremium = false) {
  if (!prompt || typeof prompt !== "string") return null;

  // ── Pro users: Try OpenRouter Flux Schnell first ($0.003/image) ──
  if (usePremium && OPENROUTER_KEY) {
    try {
      console.log(`[Logo] Trying OpenRouter Flux Schnell (premium)`);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://fancydigitals.com.ng",
          "X-Title": "Fancy Digitals",
        },
        body: JSON.stringify({
          model: "black-forest-labs/flux-schnell",
          messages: [{ role: "user", content: prompt }],
          modalities: ["image", "text"],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const message = data?.choices?.[0]?.message;
        if (message?.images?.[0]) {
          const img = message.images[0];
          const url = img?.image_url?.url || img?.url;
          if (url && url.startsWith("data:")) {
            console.log(`[Logo] ✅ OpenRouter Flux success (premium)`);
            return url;
          }
        }
      } else {
        const errText = await response.text();
        console.warn(`[Logo] ❌ OpenRouter HTTP ${response.status}: ${errText.slice(0, 150)}`);
      }
    } catch (err) {
      console.warn(`[Logo] ❌ OpenRouter error: ${err.message?.slice(0, 150)}`);
    }
  }

  // ── Fallback: Pollinations.ai (free, unlimited) ──
  try {
    const seed = Math.floor(Math.random() * 999999);
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;

    console.log(`[Logo] Fetching from Pollinations (seed=${seed})`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    const response = await fetch(imageUrl, {
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 5000) {
      throw new Error(`Image too small (${buffer.byteLength} bytes)`);
    }

    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = response.headers.get("content-type") || "image/png";
    const mimeType = contentType.split(";")[0].trim();

    console.log(`[Logo] ✅ Pollinations success (${Math.round(buffer.byteLength / 1024)}KB)`);
    return `data:${mimeType};base64,${base64}`;
  } catch (err) {
    console.warn(`[Logo] ❌ Pollinations error: ${err.message?.slice(0, 150)}`);
    return null;
  }
}

/**
 * Generate multiple logo icons sequentially (avoids rate limits).
 * @param {string[]} prompts - Array of icon prompts
 * @param {boolean} usePremium - Use paid OpenRouter for Pro users
 * @returns {Promise<Array<string|null>>}
 */
export async function generateLogoIcons(prompts, usePremium = false) {
  if (!Array.isArray(prompts) || prompts.length === 0) return [];

  console.log(`[Logo] Generating ${prompts.length} icons (premium=${usePremium})`);
  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    try {
      const result = await generateLogoIcon(prompts[i], usePremium);
      results.push(result);
      if (result) {
        console.log(`[Logo] ✅ Icon ${i + 1}/${prompts.length} done`);
      } else {
        console.warn(`[Logo] ❌ Icon ${i + 1}/${prompts.length} failed`);
      }
    } catch (err) {
      console.warn(`[Logo] ❌ Icon ${i + 1} error: ${err.message?.slice(0, 120)}`);
      results.push(null);
    }

    // Small delay between requests
    if (i < prompts.length - 1) {
      await new Promise((r) => setTimeout(r, 1200));
    }
  }

  return results;
}