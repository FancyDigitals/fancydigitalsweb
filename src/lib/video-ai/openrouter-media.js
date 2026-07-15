import { IMAGE_MODELS, VIDEO_MODELS } from "./models";

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Generate an image via fallback chain of working providers.
 *  1. Gemini 2.5 Flash Image (native, requires GEMINI_API_KEY)
 *  2. OpenRouter → Gemini 2.5 Flash Image (proxy)
 *  3. Pollinations (no key needed, always works, free)
 */
export async function generateImage({ prompt, aspectRatio = "9:16" }) {
  // 1. Gemini native (multimodal chat with image output)
  if (GEMINI_KEY) {
    try {
      const url = await generateWithGeminiFlash({ prompt, aspectRatio });
      if (url) {
        console.log("[image] ✅ Gemini Flash");
        return url;
      }
    } catch (err) {
      console.warn("[image] Gemini Flash failed:", err.message);
    }
  }

  // 2. OpenRouter proxy
  if (OPENROUTER_KEY) {
    try {
      const url = await generateWithOpenRouter({ prompt, aspectRatio });
      if (url) {
        console.log("[image] ✅ OpenRouter");
        return url;
      }
    } catch (err) {
      console.warn("[image] OpenRouter failed:", err.message);
    }
  }

  // 3. Pollinations — free, no key, always works
  try {
    const url = await generateWithPollinations({ prompt, aspectRatio });
    if (url) {
      console.log("[image] ✅ Pollinations (fallback)");
      return url;
    }
  } catch (err) {
    console.warn("[image] Pollinations failed:", err.message);
  }

  throw new Error("All image generators failed");
}

// ============================================
// GEMINI 2.5 Flash Image — native
// Uses generateContent with responseModalities: ["IMAGE", "TEXT"]
// ============================================
async function generateWithGeminiFlash({ prompt, aspectRatio = "9:16" }) {
  const model = "gemini-2.5-flash-image";
  const enhancedPrompt = enhancePromptWithAspect(prompt, aspectRatio);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: enhancedPrompt }],
          },
        ],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
        },
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gemini ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = await res.json();
  const parts = json.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart) {
    throw new Error("Gemini returned no image (only text)");
  }

  const mime = imagePart.inlineData.mimeType || "image/png";
  return `data:${mime};base64,${imagePart.inlineData.data}`;
}

// ============================================
// OPENROUTER — Gemini 2.5 Flash Image via proxy
// ============================================
async function generateWithOpenRouter({ prompt, aspectRatio = "9:16" }) {
  const enhancedPrompt = enhancePromptWithAspect(prompt, aspectRatio);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://fancydigitals.com.ng",
      "X-Title": "Fancy Digitals",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: enhancedPrompt }],
      modalities: ["image", "text"],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenRouter ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = await res.json();
  const message = json.choices?.[0]?.message;

  // OpenRouter returns images in message.images[]
  const image =
    message?.images?.[0]?.image_url?.url ||
    message?.images?.[0]?.url ||
    null;

  if (!image) throw new Error("OpenRouter returned no image");
  return image;
}

// ============================================
// POLLINATIONS — free, no key, unlimited
// Returns direct image URL that Pollinations generates on demand
// ============================================
async function generateWithPollinations({ prompt, aspectRatio = "9:16" }) {
  const sizes = {
    "9:16": { w: 720, h: 1280 },
    "16:9": { w: 1280, h: 720 },
    "1:1": { w: 1024, h: 1024 },
    "4:3": { w: 1024, h: 768 },
    "3:4": { w: 768, h: 1024 },
  };
  const { w, h } = sizes[aspectRatio] || sizes["1:1"];

  const cleanPrompt = encodeURIComponent(prompt.slice(0, 800));
  const seed = Math.floor(Math.random() * 1_000_000);

  // Pollinations generates the image on-demand. This URL IS the image.
  const url = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${w}&height=${h}&seed=${seed}&model=flux&nologo=true&enhance=true`;

  // Verify it loads
  const check = await fetch(url, { method: "HEAD" });
  if (!check.ok) throw new Error(`Pollinations ${check.status}`);

  return url;
}

// ============================================
// Helper — inject aspect ratio hint into prompt
// (Gemini image doesn't have a size param — it infers from prompt)
// ============================================
function enhancePromptWithAspect(prompt, aspectRatio) {
  const hints = {
    "9:16": "Vertical 9:16 portrait aspect ratio (tall).",
    "16:9": "Horizontal 16:9 landscape aspect ratio (wide, cinematic).",
    "1:1": "Square 1:1 aspect ratio.",
    "4:3": "4:3 aspect ratio.",
    "3:4": "3:4 aspect ratio.",
  };
  const hint = hints[aspectRatio] || "";
  return `${prompt}\n\n${hint}`;
}

// ============================================
// VIDEO — unchanged
// ============================================
export async function generateVideo({
  prompt,
  aspectRatio = "9:16",
  duration = 5,
}) {
  if (!OPENROUTER_KEY) throw new Error("No OPENROUTER_API_KEY");

  const create = await fetch("https://openrouter.ai/api/v1/videos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: VIDEO_MODELS?.premium || "google/veo-3",
      prompt,
      duration,
      aspect_ratio: aspectRatio,
    }),
  });

  if (!create.ok) throw new Error(await create.text());

  const job = await create.json();

  while (true) {
    await new Promise((r) => setTimeout(r, 5000));

    const poll = await fetch(
      `https://openrouter.ai/api/v1/videos/${job.id}`,
      {
        headers: { Authorization: `Bearer ${OPENROUTER_KEY}` },
      }
    );

    if (!poll.ok) throw new Error(await poll.text());

    const result = await poll.json();
    if (result.status === "completed") return result.video_url;
    if (result.status === "failed") throw new Error("Video generation failed.");
  }
}

/**
 * Generate a YouTube-style thumbnail background from a structured spec.
 * Person on one side, empty space on the other for text overlay.
 */
export async function generateThumbnailBackground({ spec }) {
  const position = spec.personPosition || "right";
  const emptySide = position === "right" ? "LEFT" : "RIGHT";

  const enhancedPrompt = `HYPER-VIBRANT professional YouTube thumbnail background. 1280x720 landscape 16:9.

REFERENCE STYLE: MrBeast, Iman Gadzhi, Ali Abdaal, Alex Hormozi thumbnails.
Think: explosive colors, dramatic lighting, viral clickbait energy.

═══ PERSON ═══
${spec.personDescription}
- Positioned on ${position.toUpperCase()} half of frame (takes 40-50% width)
- EXAGGERATED emotional expression (shocked, laughing, pointing, wide-eyed)
- Shot from slightly below eye-level (authority angle)
- Sharp focus on face — face is the hero
- STRONG rim lighting in ${spec.secondaryColor} on one side of the person
- BOUNCE lighting in ${spec.primaryColor} on the other side
- Skin looks glossy, alive, high-definition
- Slightly tilted or dynamic pose (never flat / static)

═══ BACKGROUND ═══
${spec.backgroundDescription}
- BLURRED with heavy bokeh (person is the focus)
- Filled with glowing particles, light rays, energy streaks
- Radial light burst directly BEHIND the person's head (halo effect)
- Neon glow, chromatic aberration, subtle lens flare
- ${spec.primaryColor} dominates one half, ${spec.secondaryColor} the other
- Vertical light streak / lightning down the center dividing the two color zones (like a comic book vs panel)

═══ COLORS (CRITICAL — GO EXTREME) ═══
- Primary: ${spec.primaryColor} — MAXIMUM saturation
- Secondary: ${spec.secondaryColor} — MAXIMUM saturation
- Both colors bleed into everything: skin, hair, clothes, environment
- Contrast turned up to 200%
- Colors so bright they almost hurt to look at (this is what wins clicks)
- Add subtle magenta/cyan chromatic aberration on edges

═══ MOOD: ${spec.mood} ═══
Dramatic, explosive, cinematic, high-energy, viral

═══ COMPOSITION ═══
- Person firmly on ${position.toUpperCase()} half
- ${emptySide} half: MOSTLY EMPTY — just glowing background, gradient, particles
- The ${emptySide} half will have massive text overlaid on top later
- Do NOT put objects or details on the ${emptySide} side that would fight the text

═══ TECHNICAL ═══
- Photorealistic, DSLR-quality
- 8K ultra-detailed
- Cinematic depth of field
- Face tack-sharp, background dreamy blur
- Vivid HDR colors
- Slight film grain for cinematic feel

═══ STRICT NEGATIVE ═══
NO text, NO letters, NO numbers, NO words, NO watermarks, NO logos, NO signs, NO writing anywhere in the image.
NO borders. NO frames. NO multiple people. NO cartoon/illustration style — must be photorealistic.
NO muted, dull, pastel, washed-out colors — ONLY vibrant saturated bright colors.
NO neutral/gray backgrounds.
NO flat lighting — must have dramatic directional light.
NO cluttered ${emptySide} side.`;

  return await generateImage({ prompt: enhancedPrompt, aspectRatio: "16:9" });
}