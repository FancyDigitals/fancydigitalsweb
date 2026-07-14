export async function generateVideoProject(
  body
) {
  const res = await fetch(
    "/api/video-ai/generate",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(body),
    }
  );

  return res.json();
}