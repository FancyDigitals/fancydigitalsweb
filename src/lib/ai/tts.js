const DEEPGRAM_KEY = process.env.DEEPGRAM_API_KEY;

const DEEPGRAM_VOICES = {
  asteria: "aura-asteria-en",
  luna: "aura-luna-en",
  stella: "aura-stella-en",
  hera: "aura-hera-en",
  athena: "aura-athena-en",
  orion: "aura-orion-en",
  arcas: "aura-arcas-en",
  perseus: "aura-perseus-en",
  angus: "aura-angus-en",
  orpheus: "aura-orpheus-en",
  helios: "aura-helios-en",
  zeus: "aura-zeus-en",
};

const DEFAULT_VOICE = "aura-asteria-en";
const DEEPGRAM_MAX_CHARS = 1990; // Deepgram hard limit is 2000; leave a buffer

function humanize(text) {
  let t = String(text).trim();
  if (!/[.!?]$/.test(t)) t += ".";
  t = t.replace(/;\s*/g, ", ");
  t = t.replace(/\s+/g, " ").replace(/\.{2,}/g, ".");
  return t;
}

/**
 * Split text into chunks that fit within Deepgram's limit,
 * breaking on sentence boundaries.
 */
function chunkForDeepgram(text, maxChars = DEEPGRAM_MAX_CHARS) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let current = "";

  for (const s of sentences) {
    if ((current + " " + s).trim().length <= maxChars) {
      current = (current + " " + s).trim();
    } else {
      if (current) chunks.push(current);
      current = s.trim();
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function requestDeepgram({ text, model }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const res = await fetch(
      `https://api.deepgram.com/v1/speak?model=${model}&encoding=mp3`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${DEEPGRAM_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[TTS] ❌ Deepgram ${res.status} — ${errText.slice(0, 300)}`
      );
      throw new Error(`Deepgram ${res.status}: ${errText.slice(0, 200)}`);
    }

    return await res.arrayBuffer();
  } finally {
    clearTimeout(timeout);
  }
}

export async function generateSpeech({ text, voice = "asteria" }) {
  if (!DEEPGRAM_KEY) {
    console.error("[TTS] ❌ No DEEPGRAM_API_KEY set");
    return null;
  }
  if (!text || typeof text !== "string" || !text.trim()) {
    console.warn("[TTS] ⚠️ Empty text");
    return null;
  }

  const model = DEEPGRAM_VOICES[voice] || DEFAULT_VOICE;
  const clean = humanize(text);
  const chunks = chunkForDeepgram(clean);

  console.log(
    `[TTS] Requesting ${chunks.length} chunk(s), ${clean.length} chars total, voice=${model}`
  );

  try {
    const buffers = [];
    for (let i = 0; i < chunks.length; i++) {
      console.log(
        `[TTS] Chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`
      );
      const buf = await requestDeepgram({ text: chunks[i], model });
      buffers.push(Buffer.from(buf));
    }

    const merged = Buffer.concat(buffers);
    const base64 = merged.toString("base64");
    console.log(`[TTS] ✅ Generated ${(merged.length / 1024).toFixed(1)}KB`);
    return `data:audio/mpeg;base64,${base64}`;
  } catch (err) {
    console.error("[TTS] ❌ Failed:", err.message);
    return null;
  }
}

export function pickVoice({ theme, gender } = {}) {
  if (gender === "male") {
    if (theme === "luxury" || theme === "cinematic") return "orpheus";
    if (theme === "tesla" || theme === "corporate") return "arcas";
    return "orion";
  }
  if (theme === "luxury" || theme === "cinematic") return "athena";
  if (theme === "corporate") return "hera";
  if (theme === "startup" || theme === "social") return "luna";
  return "asteria";
}

export { DEEPGRAM_VOICES };

export function estimateMp3Duration(base64DataUrl) {
  if (!base64DataUrl) return 0;
  try {
    const base64 = base64DataUrl.split(",")[1] || "";
    const byteLength = Math.floor((base64.length * 3) / 4);
    const bitsPerSecond = 48000;
    const bytesPerSecond = bitsPerSecond / 8;
    return byteLength / bytesPerSecond;
  } catch {
    return 0;
  }
}