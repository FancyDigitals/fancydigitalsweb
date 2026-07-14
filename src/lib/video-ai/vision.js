import { analyzeImage as analyzeGemini } from "@/lib/ai/gemini";
import { analyzeImageOpenRouter } from "@/lib/ai/openrouter-vision";

async function analyzeWithFallback(data) {
  // Try OpenRouter first (more reliable, no strict quota)
  let result = await analyzeImageOpenRouter(data);
  if (result.label || result.categories.length) return result;

  // Fallback to Gemini
  try {
    result = await analyzeGemini(data);
    if (result.label || result.categories.length) return result;
  } catch {}

  return result;
}

export async function understandUploads(uploadedImages = []) {
  const uploads = [];

  for (let i = 0; i < uploadedImages.length; i++) {
    const image = uploadedImages[i];
    const data = typeof image === "string" ? image : image?.data;
    if (!data) continue;

    const userRole =
      typeof image === "object" && image?.role
        ? String(image.role).toLowerCase()
        : "auto";
    const userNote =
      typeof image === "object" && image?.note ? String(image.note) : "";
    const userName =
      typeof image === "object" && image?.name
        ? String(image.name)
        : `Image ${i + 1}`;

    let analysis = await analyzeWithFallback(data);

    // Final filename fallback
    if (!analysis.label && !analysis.categories.length) {
      analysis.label = userName
        .replace(/\.(png|jpg|jpeg|webp)$/i, "")
        .replace(/[-_]+/g, " ")
        .toLowerCase();
      analysis.categories = ["other"];
      analysis.bestUse = ["b-roll"];
    }

    uploads.push({
      id: `upload-${i}`,
      index: i,
      name: userName,
      image: data,
      userRole,
      userNote,
      analysis,
      label: analysis.label,
    });
  }

  return uploads;
}