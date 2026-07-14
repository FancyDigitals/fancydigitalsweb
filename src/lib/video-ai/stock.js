const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

/**
 * Bulletproof stock search.
 * Tries each query across Pexels + Pixabay in portrait, then landscape.
 * Also broadens queries (e.g. "boutique coffee shop interior" → "coffee shop" → "cafe").
 */
export async function searchStockMedia(queries = []) {
  if (!Array.isArray(queries)) queries = [queries];

  const expanded = expandQueries(queries);

  for (const query of expanded) {
    for (const orientation of ["portrait", "landscape"]) {
      const pexels = await fetchPexels(query, orientation);
      if (pexels) {
        console.log(`[Stock] ✅ Pexels (${orientation}) "${query}"`);
        return pexels;
      }

      const pixabay = await fetchPixabay(query, orientation);
      if (pixabay) {
        console.log(`[Stock] ✅ Pixabay (${orientation}) "${query}"`);
        return pixabay;
      }
    }
  }

  console.warn(
    `[Stock] ❌ No results after ${expanded.length} queries × 2 orientations`
  );
  return null;
}

/**
 * Expand queries by adding broader fallback terms.
 * Example: ["luxury spa massage room"] → 
 *   ["luxury spa massage room", "luxury spa", "spa", "wellness", "business"]
 */
function expandQueries(queries) {
  const seen = new Set();
  const result = [];

  const push = (q) => {
    const clean = String(q || "").trim().toLowerCase();
    if (!clean || seen.has(clean)) return;
    seen.add(clean);
    result.push(clean);
  };

  for (const q of queries) {
    const clean = String(q || "").trim();
    if (!clean) continue;

    push(clean);

    // Progressive broadening: drop last word each time
    const words = clean.split(/\s+/);
    for (let i = words.length - 1; i > 0; i--) {
      push(words.slice(0, i).join(" "));
    }
  }

  // Universal fallbacks that always return something
  push("professional");
  push("business");
  push("abstract");

  return result;
}

async function fetchPexels(query, orientation = "portrait") {
  if (!PEXELS_API_KEY) return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=3&orientation=${orientation}`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );

    if (!res.ok) return null;
    const json = await res.json();

    const photo = json.photos?.[0];
    if (!photo) return null;

    return photo.src?.large2x || photo.src?.original || photo.src?.large || null;
  } catch (err) {
    console.warn("[Stock][Pexels]", err.message);
    return null;
  }
}

async function fetchPixabay(query, orientation = "vertical") {
  if (!PIXABAY_API_KEY) return null;

  // Pixabay orientation values: horizontal | vertical | all
  const pixabayOrientation =
    orientation === "landscape" ? "horizontal" : "vertical";

  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&orientation=${pixabayOrientation}&per_page=3&safesearch=true`
    );

    if (!res.ok) return null;
    const json = await res.json();

    const hit = json.hits?.[0];
    if (!hit) return null;

    return hit.largeImageURL || hit.webformatURL || null;
  } catch (err) {
    console.warn("[Stock][Pixabay]", err.message);
    return null;
  }
}