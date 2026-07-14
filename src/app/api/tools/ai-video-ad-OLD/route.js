import { NextResponse } from "next/server";
import {
  generateAdScript,
  generateExplainerScript,
} from "@/lib/video/script-generator";
import {
  fetchMediaForScenes,
  resolveSceneMedia,
} from "@/lib/video/media-fetcher";
import { analyzeImage } from "@/lib/ai/gemini";

/**
 * Strip markdown from any string
 */
function stripMd(text) {
  if (!text || typeof text !== "string") return text;
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .trim();
}

/**
 * Clean all text fields in a scene
 */
function cleanScene(scene) {
  return {
    ...scene,
    title: stripMd(scene.title),
    subtitle: stripMd(scene.subtitle),
    ctaText: stripMd(scene.ctaText),
    ctaUrl: stripMd(scene.ctaUrl),
    text: stripMd(scene.text),
    imageIntent: stripMd(scene.imageIntent),
    highlightWords: Array.isArray(scene.highlightWords)
      ? scene.highlightWords.map((w) => stripMd(w))
      : scene.highlightWords,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      mode = "ad",
      businessName,
      description,
      topic,
      audience,
      goal,
      contentBrief = "",
      vibe = "",
      tone = "bold",
      duration = 30,
      brandColor = "#075a01",
      contentStyle = "image-text",
      backgroundStyle = "gradient",
      aspectRatio = "9:16",
      logoUrl = null,
      isPro = false,
      uploadedImages = [],
    } = body;

    console.log("UPLOADED IMAGES:");
console.log(JSON.stringify(uploadedImages, null, 2));

    /* ============================================================
       STEP 1: GENERATE SCRIPT
    ============================================================ */
    let script;

    if (mode === "explainer") {
      if (!topic?.trim()) {
        return NextResponse.json(
          { error: "Topic is required for explainer videos" },
          { status: 400 }
        );
      }

      console.log("Generating explainer script...");
      script = await generateExplainerScript({
        topic,
        audience: audience || "beginners",
        goal: goal || "educate and guide",
        duration,
        contentBrief,
        vibe,
      });
    } else {
      if (!businessName?.trim() || !description?.trim()) {
        return NextResponse.json(
          { error: "Business name and description are required" },
          { status: 400 }
        );
      }

      console.log("Generating ad script...");
      script = await generateAdScript({
        businessName,
        description,
        audience: audience || "small business owners",
        goal: goal || "get more customers",
        tone,
        duration,
        contentBrief,
        vibe,
      });
    }

    /* ============================================================
       STEP 2: ASSIGN IMAGES TO SCENES
    ============================================================ */
    const needsImages = contentStyle === "images-only" || contentStyle === "image-text";
    let scenes = script.scenes;

    

    if (needsImages) {
      // ─── SMART IMAGE MATCHING ───────────────────────────────
      // Filter to only scenes that NEED an image (per AI decision)
      const scenesNeedingImages = scenes
        .map((s, i) => ({ scene: s, index: i }))
        .filter(({ scene }) => scene.needsImage === true);


      console.log(`${scenesNeedingImages.length} of ${scenes.length} scenes need images`);

      // Track which uploads have been used
      const usedUploads = new Set();

      // Helper: score how well a label matches an intent
      function scoreMatch(label, intent) {
        if (!label || !intent) return 0;
        const labelWords = label.toLowerCase().split(/\s+/).filter(Boolean);
        const intentWords = intent.toLowerCase().split(/\s+/).filter(Boolean);
        let matches = 0;
        for (const iw of intentWords) {
          for (const lw of labelWords) {
            if (iw === lw) matches += 2;
            else if (iw.includes(lw) || lw.includes(iw)) matches += 1;
          }
        }
        return matches;
      }

      // First pass: match uploads to scenes by label ↔ imageIntent
      const imageAssignments = new Map(); // sceneIndex → imageUrl

      if (uploadedImages.length > 0) {
        for (const { scene, index } of scenesNeedingImages) {
          const intent = scene.imageIntent || "";
          let bestMatch = -1;
          let bestScore = 0;

          uploadedImages.forEach((upload, uploadIdx) => {
            if (usedUploads.has(uploadIdx)) return;
            const label = typeof upload === "string" ? "" : upload.label || "";
            const score = scoreMatch(label, intent);
            if (score > bestScore) {
              bestScore = score;
              bestMatch = uploadIdx;
            }
          });

          if (bestMatch >= 0 && bestScore > 0) {
            const upload = uploadedImages[bestMatch];
            const imgData = typeof upload === "string" ? upload : upload.data;
            imageAssignments.set(index, imgData);
            usedUploads.add(bestMatch);
          }
        }

        // Second pass: assign remaining uploads to remaining scenes in order
        for (const { index } of scenesNeedingImages) {
          if (imageAssignments.has(index)) continue;

          // Find next unused upload
          let nextUpload = null;
          for (let i = 0; i < uploadedImages.length; i++) {
            if (!usedUploads.has(i)) {
              nextUpload = uploadedImages[i];
              usedUploads.add(i);
              break;
            }
          }

          // If all uploads used, allow reuse (cycle)
          if (!nextUpload && uploadedImages.length > 0) {
            const cycleIdx = index % uploadedImages.length;
            nextUpload = uploadedImages[cycleIdx];
          }

          if (nextUpload) {
            const imgData = typeof nextUpload === "string" ? nextUpload : nextUpload.data;
            imageAssignments.set(index, imgData);
          }
        }
      }

      // Apply assignments (plus stock fallback for unmatched)
      const unmatchedScenes = scenesNeedingImages.filter(
        ({ index }) => !imageAssignments.has(index)
      );

      let stockScenes = [];
      if (unmatchedScenes.length > 0 && uploadedImages.length === 0) {
        // No uploads at all — fetch stock
        console.log("No uploads — fetching stock images...");
        try {
          const toFetch = unmatchedScenes.map(({ scene }) => ({
            ...scene,
            searchQuery: scene.imageIntent || scene.title || "business",
          }));
          stockScenes = await fetchMediaForScenes(toFetch);
        } catch (mediaErr) {
          console.warn("Stock fetch failed:", mediaErr.message);
        }
      }

      // Build final scenes array
      const updatedScenes = [];

for (let idx = 0; idx < scenes.length; idx++) {
  const scene = scenes[idx];

  const media = await resolveSceneMedia({
    scene,
    uploadedImages,
    isPro,
  });

  updatedScenes.push({
    ...scene,
    ...media,
  });
}

scenes = updatedScenes;
    }

    /* ============================================================
       STEP 3: RETURN PROJECT
    ============================================================ */
    // Clean all markdown from scenes and text fields
    const cleanedScenes = scenes.map(cleanScene);
    const cleanedHook = stripMd(script.hook);
    const cleanedCta = stripMd(script.cta);

    return NextResponse.json({
      success: true,
      project: {
        template: mode === "explainer" ? "ExplainerTemplate" : "BoldTemplate",
        mode,
        scenes: cleanedScenes,
        hook: cleanedHook || null,
        cta: cleanedCta || null,
        brandColor,
        contentStyle,
        backgroundStyle,
        aspectRatio,
        logoUrl,
        duration,
        metadata: {
          type: mode,
          businessName: businessName || null,
          topic: topic || null,
          tone,
          createdAt: new Date().toISOString(),
        },
      },
    });
  } catch (err) {
    console.error("Video generation error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate video" },
      { status: 500 }
    );
  }
}