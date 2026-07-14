import { openrouter } from "@/lib/ai/openrouter";
import { CHAT_MODELS } from "./models";
import { buildScenesPrompt } from "./prompts/scenes";

/**
 * Ordered fallback chain. Claude is primary because it's the most reliable
 * for large structured JSON. Gemini is a cheaper fallback. GPT-4.1 is last resort.
 */
const SCENE_MODELS = [
  "anthropic/claude-sonnet-4.5",
  "openai/gpt-4.1",
  "google/gemini-2.5-flash",
];

const MAX_ATTEMPTS_PER_MODEL = 2;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Detects a rate-limited or truncated OpenRouter response.
 * OpenRouter injects errors mid-SSE stream, returning partial content
 * with finish_reason='error' or 'length'.
 */
function isBadResponse(choice, content) {
  if (!choice) return "no choice returned";
  if (choice.finish_reason === "error") {
    const errMsg = choice.error?.message || "unknown provider error";
    return `provider error: ${errMsg}`;
  }
  if (choice.finish_reason === "length") return "response truncated by token limit";
  if (!content || content.length < 100) return "empty or too short content";
  return null;
}

/**
 * Try to repair common JSON breakage before giving up:
 *  - Trailing commas
 *  - Unclosed strings (append ")
 *  - Unclosed arrays/objects (append ], })
 */
function attemptRepair(content) {
  let s = content.trim();

  // Strip markdown fences
  s = s.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

  // Trim to outermost braces
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first !== -1 && last > first) s = s.slice(first, last + 1);

  // Remove trailing commas
  s = s.replace(/,(\s*[}\]])/g, "$1");

  // Try to close unterminated string + structures
  try {
    JSON.parse(s);
    return s;
  } catch {
    // Balance brackets/braces
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

    // If still in string, close it
    if (inString) s += '"';
    // Close arrays first, then objects
    while (openBrackets-- > 0) s += "]";
    while (openBraces-- > 0) s += "}";

    // Remove any dangling comma before appended closers
    s = s.replace(/,(\s*[}\]])/g, "$1");

    return s;
  }
}

/**
 * Truncate the scenes array to only complete scenes.
 * If the last scene is malformed, drop it — better fewer good scenes than a broken video.
 */
function pruneIncompleteScenes(parsed) {
  if (!parsed?.scenes || !Array.isArray(parsed.scenes)) return parsed;

  const required = ["sceneNumber", "title", "duration"];
  const clean = parsed.scenes.filter((s) => {
    if (!s || typeof s !== "object") return false;
    return required.every((k) => s[k] !== undefined && s[k] !== null);
  });

  return { ...parsed, scenes: clean };
}

async function tryModel({ model, prompt, attempt }) {
  console.log(`[SCENES] → Trying ${model} (attempt ${attempt}/${MAX_ATTEMPTS_PER_MODEL})`);

  const response = await openrouter.chat.completions.create({
    model,
    temperature: 0.75,
    max_tokens: 16000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a Hollywood commercial director. Return ONLY valid JSON with a top-level 'scenes' array. Do not wrap in markdown. Do not use ```json fences. Ensure every string is properly closed and every scene object is complete.",
      },
      { role: "user", content: prompt },
    ],
  });

  const choice = response?.choices?.[0];
  const content = choice?.message?.content || "";
  const badness = isBadResponse(choice, content);

  if (badness) {
    console.warn(`[SCENES] ✗ ${model} bad response: ${badness}`);
    throw new Error(badness);
  }

  // First, try strict parse
  try {
    const parsed = JSON.parse(content);
    if (!parsed.scenes || !Array.isArray(parsed.scenes) || parsed.scenes.length === 0) {
      throw new Error("no scenes array");
    }
    console.log(`[SCENES] ✅ ${model} → ${parsed.scenes.length} scenes (clean parse)`);
    return parsed;
  } catch (parseErr) {
    console.warn(`[SCENES] ⚠ ${model} strict parse failed, attempting repair…`);
    const repaired = attemptRepair(content);
    try {
      const parsed = JSON.parse(repaired);
      const pruned = pruneIncompleteScenes(parsed);
      if (!pruned.scenes || pruned.scenes.length === 0) {
        throw new Error("repair produced no valid scenes");
      }
      console.log(`[SCENES] ✅ ${model} → ${pruned.scenes.length} scenes (repaired)`);
      return pruned;
    } catch (repairErr) {
      console.error(`[SCENES] ✗ ${model} repair failed: ${repairErr.message}`);
      throw new Error(`unparseable JSON from ${model}: ${repairErr.message}`);
    }
  }
}

export async function generateScenes({
  storyboard,
  business,
  brand,
  uploads = [],
  creativeBrief = "",
}) {
  const prompt = buildScenesPrompt({
    storyboard,
    business,
    brand,
    uploads,
    creativeBrief,
  });

  console.log("[SCENES] Prompt length:", prompt.length);
  console.log("[SCENES] Uploads:", uploads.length);

  // Preferred model from CHAT_MODELS goes first, then fallbacks
  const preferred = CHAT_MODELS?.scenes;
  const chain = preferred
    ? [preferred, ...SCENE_MODELS.filter((m) => m !== preferred)]
    : SCENE_MODELS;

  const errors = [];

  for (const model of chain) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_MODEL; attempt++) {
      try {
        const result = await tryModel({ model, prompt, attempt });
        return result;
      } catch (err) {
        errors.push(`${model} attempt ${attempt}: ${err.message}`);

        // Rate limit → wait longer before retry
        const isRateLimit = /rate.?limit|429/i.test(err.message);
        if (isRateLimit && attempt < MAX_ATTEMPTS_PER_MODEL) {
          const backoff = 2000 * attempt;
          console.warn(`[SCENES] Rate limited, waiting ${backoff}ms…`);
          await sleep(backoff);
        } else if (attempt < MAX_ATTEMPTS_PER_MODEL) {
          await sleep(500);
        }
      }
    }
  }

  console.error("[SCENES] ❌ All models failed:");
  errors.forEach((e) => console.error("  •", e));
  throw new Error(
    `Scene generation failed across all models.\nAttempts:\n${errors.join("\n")}`
  );
}