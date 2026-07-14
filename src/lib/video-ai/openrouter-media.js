import { IMAGE_MODELS, VIDEO_MODELS } from "./models";

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
        model: IMAGE_MODELS.premium,
        prompt,
        size: aspectRatio,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  return json.data?.[0]?.url || null;
}

export async function generateVideo({
  prompt,
  aspectRatio = "9:16",
  duration = 5,
}) {
  const create = await fetch(
    "https://openrouter.ai/api/v1/videos",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: VIDEO_MODELS.premium,
        prompt,
        duration,
        aspect_ratio: aspectRatio,
      }),
    }
  );

  if (!create.ok) {
    throw new Error(await create.text());
  }

  const job = await create.json();

  while (true) {
    await new Promise((r) => setTimeout(r, 5000));

    const poll = await fetch(
      `https://openrouter.ai/api/v1/videos/${job.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    if (!poll.ok) {
      throw new Error(await poll.text());
    }

    const result = await poll.json();

    if (result.status === "completed") {
      return result.video_url;
    }

    if (result.status === "failed") {
      throw new Error("Video generation failed.");
    }
  }
}