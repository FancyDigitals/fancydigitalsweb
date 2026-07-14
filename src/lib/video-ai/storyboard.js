import { openrouter } from "@/lib/ai/openrouter";
import { CHAT_MODELS } from "./models";
import { buildStoryboardPrompt } from "./prompts/storyboard";

const STORYBOARD_MODELS = [
  "anthropic/claude-sonnet-4.5",
  "openai/gpt-4.1",
  "google/gemini-2.5-flash",
];

const MAX_ATTEMPTS_PER_MODEL = 2;
const REQUEST_TIMEOUT_MS = 45000; // 45s hard cap per attempt

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isTransientError(err) {
  const msg = String(err?.message || "").toLowerCase();
  return (
    msg.includes("econnreset") ||
    msg.includes("terminated") ||
    msg.includes("timeout") ||
    msg.includes("socket") ||
    msg.includes("network") ||
    msg.includes("fetch failed") ||
    msg.includes("rate") ||
    msg.includes("429") ||
    msg.includes("502") ||
    msg.includes("503") ||
    msg.includes("504")
  );
}

function attemptRepair(content) {
  let s = String(content || "").trim();
  s = s.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first !== -1 && last > first) s = s.slice(first, last + 1);

  s = s.replace(/,(\s*[}\]])/g, "$1");

  try {
    JSON.parse(s);
    return s;
  } catch {
    // Balance strings and brackets
    let openBraces = 0;
    let openBrackets = 0;
    let inString = false;
    let escape = false;
    for (const ch of s) {
      if (escape) { escape = false; continue; }
      if (ch === "\\") { escape = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === "{") openBraces++;
      else if (ch === "}") openBraces--;
      else if (ch === "[") openBrackets++;
      else if (ch === "]") openBrackets--;
    }
    if (inString) s += '"';
    while (openBrackets-- > 0) s += "]";
    while (openBraces-- > 0) s += "}";
    s = s.replace(/,(\s*[}\]])/g, "$1");
    return s;
  }
}

async function tryModel({ model, prompt, attempt }) {
  console.log(`[Storyboard] → Trying ${model} (attempt ${attempt}/${MAX_ATTEMPTS_PER_MODEL})`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await openrouter.chat.completions.create(
      {
        model,
        temperature: 0.8,
        max_tokens: 8000,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are an award-winning commercial storyboard artist. Return ONLY valid JSON. No markdown fences. No commentary.",
          },
          { role: "user", content: prompt },
        ],
      },
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    const choice = response?.choices?.[0];
    const finishReason = choice?.finish_reason;
    const content = choice?.message?.content;

    if (finishReason === "error") {
      const err = choice?.error?.message || "provider error";
      throw new Error(`provider error: ${err}`);
    }

    if (!content || content.length < 50) {
      throw new Error(`empty content (finish_reason: ${finishReason || "unknown"})`);
    }

    // Try strict parse first
    try {
      const cleaned = content
        .replace(/^```json/i, "")
        .replace(/^```/i, "")
        .replace(/```$/i, "")
        .trim();
      const parsed = JSON.parse(cleaned);
      console.log(`[Storyboard] ✅ ${model} (clean parse)`);
      return parsed;
    } catch {
      const repaired = attemptRepair(content);
      const parsed = JSON.parse(repaired);
      console.log(`[Storyboard] ✅ ${model} (repaired)`);
      return parsed;
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateStoryboard({ creativeDirection, duration }) {
  const prompt = buildStoryboardPrompt({ creativeDirection, duration });

  const preferred = CHAT_MODELS?.storyboard;
  const chain = preferred
    ? [preferred, ...STORYBOARD_MODELS.filter((m) => m !== preferred)]
    : STORYBOARD_MODELS;

  const errors = [];

  for (const model of chain) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await tryModel({ model, prompt, attempt });
      } catch (err) {
        const msg = err.message || "unknown";
        errors.push(`${model} attempt ${attempt}: ${msg}`);
        console.warn(`[Storyboard] ✗ ${model} attempt ${attempt}: ${msg}`);

        const transient = isTransientError(err);
        if (transient && attempt < MAX_ATTEMPTS_PER_MODEL) {
          const backoff = 2000 * attempt;
          console.warn(`[Storyboard] Transient error, waiting ${backoff}ms…`);
          await sleep(backoff);
        } else if (attempt < MAX_ATTEMPTS_PER_MODEL) {
          await sleep(500);
        }
      }
    }
  }

  console.error("[Storyboard] ❌ All models failed:");
  errors.forEach((e) => console.error("  •", e));
  throw new Error(
    `Storyboard generation failed across all models.\nAttempts:\n${errors.join("\n")}`
  );
}