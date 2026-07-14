import { openrouter } from "./openrouter";

/* ============================================================
   DEFAULT MODELS
============================================================ */

const IMAGE_MODEL =
  process.env.OPENROUTER_IMAGE_MODEL ||
  "google/gemini-2.5-flash-image-preview";

const VIDEO_MODEL =
  process.env.OPENROUTER_VIDEO_MODEL ||
  "google/veo-3";

/* ============================================================
   IMAGE GENERATION
============================================================ */

export async function generateImage({
  prompt,
  aspectRatio = "9:16",
}) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/images/generations",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt,
        size: aspectRatio,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Image generation failed");
  }

  const json = await response.json();

  return json.data?.[0]?.url || null;
}

/* ============================================================
   VIDEO GENERATION
============================================================ */

export async function generateVideo({
  prompt,
  aspectRatio = "9:16",
  duration = 5,
}) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/videos",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: VIDEO_MODEL,
        prompt,
        duration,
        aspect_ratio: aspectRatio,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Video generation failed");
  }

  return response.json();
}

/* ============================================================
   VIDEO STATUS
============================================================ */

export async function pollVideo(jobId) {
  while (true) {
    const response = await fetch(
      `https://openrouter.ai/api/v1/videos/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const json = await response.json();

    if (json.status === "completed") {
      return json.video_url;
    }

    if (json.status === "failed") {
      throw new Error("Video generation failed");
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

/* ============================================================
   UNIVERSAL MEDIA ROUTER
============================================================ */

export async function generateMedia({
  type,
  prompt,
  aspectRatio,
  duration,
}) {
  if (type === "image") {
    return generateImage({
      prompt,
      aspectRatio,
    });
  }

  if (type === "video") {
    const job = await generateVideo({
      prompt,
      aspectRatio,
      duration,
    });

    return pollVideo(job.id);
  }

  throw new Error("Unknown media type");
}