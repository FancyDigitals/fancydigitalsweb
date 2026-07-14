import { openrouter } from "@/lib/ai/openrouter";

export const IMAGE_MODELS = [
  "google/gemini-2.5-flash-image-preview",
  "black-forest-labs/flux-1.1-pro",
  "recraft-ai/recraft-v3",
];

export const VIDEO_MODELS = [
  "google/veo-3",
  "google/veo-3-fast",
  "bytedance/seedance-1-pro",
  "kling/kling-v2.1",
];

async function tryImage(model, scene) {
  const response = await openrouter.images.generate({
    model,
    prompt: scene.imagePrompt,
    size: "1024x1792",
  });

  return response?.data?.[0]?.url || null;
}

async function tryVideo(model, scene) {
  const job = await fetch("https://openrouter.ai/api/v1/videos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt: scene.videoPrompt,
      aspect_ratio: "9:16",
      duration: scene.duration || 5,
    }),
  });

  if (!job.ok) {
    throw new Error("Video job failed");
  }

  return job.json();
}

async function waitForVideo(jobId) {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch(
      `https://openrouter.ai/api/v1/videos/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to check video status");
    }

    const job = await response.json();

    if (job.status === "completed") {
      return job.video_url;
    }

    if (job.status === "failed") {
      throw new Error("Video generation failed");
    }
  }
}
export async function generateImage(scene) {
  let lastError;

  for (const model of IMAGE_MODELS) {
    try {
      const image = await tryImage(model, scene);

      if (image) {
        return {
          imageUrl: image,
          imageSource: "ai-image",
        };
      }
    } catch (err) {
      lastError = err;
      console.warn(model, err.message);
    }
  }

  throw lastError;
}

export async function generateVideo(scene) {
  let lastError;

  for (const model of VIDEO_MODELS) {
    try {
      const job = await tryVideo(model, scene);

      const videoUrl = await waitForVideo(job.id);

      return {
        videoUrl,
        imageUrl: null,
        imageSource: "ai-video",
      };
    } catch (err) {
      lastError = err;
      console.warn(model, err.message);
    }
  }

  throw lastError;
}