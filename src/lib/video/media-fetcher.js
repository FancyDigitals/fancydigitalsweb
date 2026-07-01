const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

/**
 * Fetches a stock image/video for a scene
 * @param {string} query - Search query (e.g. "happy person laptop")
 * @param {"image" | "video"} type - Media type preference
 * @returns {Promise<string>} - URL of the media
 */
export async function fetchStockMedia(query, type = "image") {
  // Try Pexels first (better quality)
  try {
    const pexelsUrl = await fetchFromPexels(query, type);
    if (pexelsUrl) return pexelsUrl;
  } catch (err) {
    console.warn("Pexels failed:", err.message);
  }

  // Fallback to Pixabay
  try {
    const pixabayUrl = await fetchFromPixabay(query, type);
    if (pixabayUrl) return pixabayUrl;
  } catch (err) {
    console.warn("Pixabay failed:", err.message);
  }

  // Ultimate fallback — gradient placeholder
  return "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg";
}

async function fetchFromPexels(query, type = "image") {
  if (!PEXELS_API_KEY) throw new Error("PEXELS_API_KEY not set");

  const endpoint =
    type === "video"
      ? `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=15&orientation=portrait`
      : `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=portrait`;

  const res = await fetch(endpoint, {
    headers: { Authorization: PEXELS_API_KEY },
  });

  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);

  const data = await res.json();

  if (type === "video") {
    const video = data.videos?.[0];
    // Get highest quality vertical video
    const videoFile = video?.video_files?.find(
      (f) => f.quality === "hd" || f.quality === "sd"
    );
    return videoFile?.link || null;
  } else {
    const photo = data.photos?.[0];
    return photo?.src?.large2x || photo?.src?.original || null;
  }
}

async function fetchFromPixabay(query, type = "image") {
  if (!PIXABAY_API_KEY) throw new Error("PIXABAY_API_KEY not set");

  const endpoint =
    type === "video"
      ? `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=15`
      : `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=vertical&per_page=15`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Pixabay API error: ${res.status}`);

  const data = await res.json();

  if (type === "video") {
    const video = data.hits?.[0];
    return video?.videos?.large?.url || video?.videos?.medium?.url || null;
  } else {
    const photo = data.hits?.[0];
    return photo?.largeImageURL || null;
  }
}

/**
 * Fetches media for multiple scenes in parallel
 */
export async function fetchMediaForScenes(scenes) {
  const promises = scenes.map((scene) =>
    fetchStockMedia(scene.searchQuery, "image")
  );

  const urls = await Promise.all(promises);

  return scenes.map((scene, idx) => ({
    ...scene,
    background: urls[idx],
  }));
}