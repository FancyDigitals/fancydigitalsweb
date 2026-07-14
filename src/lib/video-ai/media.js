import { generateImage, generateVideo } from "./openrouter-media";
import { searchStockMedia } from "./stock";

/**
 * Last-resort branded gradient — used only if EVERYTHING fails.
 * Returns a data URL so it always works in preview and export.
 */
function buildFallbackGradient(scene) {
  const brand = scene.__brand || {};
  const primary = brand.color || "#0E7A43";

  // SVG gradient as data URL — always renders, no network needed
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.6"/>
        <stop offset="50%" stop-color="#0a0a0a"/>
        <stop offset="100%" stop-color="#000000"/>
      </linearGradient>
      <radialGradient id="r" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#g)"/>
    <rect width="1080" height="1920" fill="url(#r)"/>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function generateSceneMedia(scene) {
  const sceneLabel = scene.id || scene.title || "scene";

  // 1. Already resolved (matcher assigned an upload, or explicit URL)
  if (scene.mediaUrl) {
    scene.assetType = scene.assetType || scene.mediaSource || "unknown";
    console.log(`[Media] ✅ ${sceneLabel}: pre-assigned (${scene.assetType})`);
    return scene;
  }

  // 2. Explicit user upload (legacy shape)
  if (scene.upload?.image) {
    scene.mediaUrl = scene.upload.image;
    scene.mediaType = "image";
    scene.mediaSource = "upload";
    scene.assetType = "upload";
    scene.reasonForSelection =
      scene.reasonForSelection || "explicit upload attached to scene";
    console.log(`[Media] ✅ ${sceneLabel}: upload`);
    return scene;
  }

  // 3. AI Video
  if (
    (scene.visualType === "video" || scene.visualType === "ai_video") &&
    scene.videoPrompt
  ) {
    try {
      const url = await generateVideo({
        prompt: scene.videoPrompt,
        duration: scene.duration || 5,
        aspectRatio: scene.aspectRatio || "9:16",
      });

      if (url) {
        scene.mediaUrl = url;
        scene.mediaType = "video";
        scene.mediaSource = "veo";
        scene.assetType = "ai";
        console.log(`[Media] ✅ ${sceneLabel}: AI video`);
        return scene;
      }
    } catch (err) {
      console.warn(`[Media] ⚠️ ${sceneLabel}: AI video failed —`, err.message);
    }
  }

  // 4. AI Image
  if (scene.imagePrompt) {
    try {
      const url = await generateImage({
        prompt: scene.imagePrompt,
        aspectRatio: scene.aspectRatio || "9:16",
      });

      if (url) {
        scene.mediaUrl = url;
        scene.mediaType = "image";
        scene.mediaSource = "gemini-image";
        scene.assetType = "ai";
        console.log(`[Media] ✅ ${sceneLabel}: AI image`);
        return scene;
      }
    } catch (err) {
      console.warn(`[Media] ⚠️ ${sceneLabel}: AI image failed —`, err.message);
    }
  }

  // 5. Stock fallback (with broadened queries)
  const stockQueries = [
    ...(scene.searchQueries || []),
    scene.imageIntent,
    scene.title,
    scene.subtitle,
  ].filter(Boolean);

  try {
    const stock = await searchStockMedia(
      stockQueries.length ? stockQueries : ["business"]
    );

    if (stock) {
      scene.mediaUrl = stock;
      scene.mediaType = "image";
      scene.mediaSource = "stock";
      scene.assetType = "stock";
      scene.reasonForSelection =
        scene.reasonForSelection || "stock fallback matching scene keywords";
      console.log(`[Media] ✅ ${sceneLabel}: stock`);
      return scene;
    }
  } catch (err) {
    console.warn(`[Media] ⚠️ ${sceneLabel}: stock failed —`, err.message);
  }

  // 6. LAST RESORT — branded gradient (never fails)
  scene.mediaUrl = buildFallbackGradient(scene);
  scene.mediaType = "image";
  scene.mediaSource = "gradient";
  scene.assetType = "fallback";
  scene.reasonForSelection = "no media found — using branded gradient fallback";
  console.warn(`[Media] 🎨 ${sceneLabel}: gradient fallback (all sources failed)`);
  return scene;
}

export async function generateProjectMedia(project) {
  // Pass brand into each scene so gradient fallback can use brand color
  project.scenes = await Promise.all(
    project.scenes.map((scene) =>
      generateSceneMedia({
        ...scene,
        __brand: project.brand,
      })
    )
  );

  // Clean up injected __brand from final output
  project.scenes = project.scenes.map((s) => {
    const { __brand, ...clean } = s;
    return clean;
  });

  return project;
}