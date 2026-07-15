import { openrouter } from "@/lib/ai/openrouter";
import { buildAuditPrompt } from "./prompts/audit";

const MODELS = [
  "anthropic/claude-sonnet-4.5",
  "openai/gpt-4.1",
  "google/gemini-2.5-flash",
];

const MAX_ATTEMPTS_PER_MODEL = 2;
const TIMEOUT_MS = 60000;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isTransient(err) {
  const msg = String(err?.message || "").toLowerCase();
  return /econnreset|terminated|timeout|socket|network|fetch failed|rate|429|502|503|504/.test(msg);
}

function repairJson(content) {
  let s = String(content || "").trim();
  s = s
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first !== -1 && last > first) s = s.slice(first, last + 1);

  s = s.replace(/,(\s*[}\]])/g, "$1");

  try {
    JSON.parse(s);
    return s;
  } catch {
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
  console.log(`[YT-Audit] → ${model} (attempt ${attempt})`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await openrouter.chat.completions.create(
      {
        model,
        temperature: 0.6,
        max_tokens: 8000,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a senior YouTube growth strategist. Return ONLY valid JSON. Never wrap in markdown. Every insight must reference the specific data provided.",
          },
          { role: "user", content: prompt },
        ],
      },
      { signal: controller.signal }
    );

    const choice = response?.choices?.[0];
    const content = choice?.message?.content;

    if (choice?.finish_reason === "error") {
      throw new Error(`Provider error: ${choice?.error?.message || "unknown"}`);
    }
    if (!content || content.length < 100) {
      throw new Error(`Empty content (finish_reason: ${choice?.finish_reason})`);
    }

    try {
      const parsed = JSON.parse(content);
      console.log(`[YT-Audit] ✅ ${model} (clean)`);
      return parsed;
    } catch {
      const repaired = repairJson(content);
      const parsed = JSON.parse(repaired);
      console.log(`[YT-Audit] ✅ ${model} (repaired)`);
      return parsed;
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateAuditInsights({ channel, videos }) {
  if (!channel || !channel.metrics) {
    throw new Error("Missing channel metrics");
  }

  const prompt = buildAuditPrompt({ channel, videos });

  const errors = [];
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await tryModel({ model, prompt, attempt });
      } catch (err) {
        const msg = err.message || "unknown";
        errors.push(`${model} attempt ${attempt}: ${msg}`);
        console.warn(`[YT-Audit] ✗ ${model}: ${msg}`);

        if (isTransient(err) && attempt < MAX_ATTEMPTS_PER_MODEL) {
          await sleep(2000 * attempt);
        }
      }
    }
  }

  console.error("[YT-Audit] ❌ All models failed");
  throw new Error(
    `Audit insight generation failed across all models.\n${errors.join("\n")}`
  );
}