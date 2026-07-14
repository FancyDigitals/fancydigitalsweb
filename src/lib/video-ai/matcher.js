const ROLE_PRIORITY = {
  hero: 10,
  opening: 9,
  ending: 9,
  logo: 8,
  product: 7,
  team: 6,
  office: 5,
  auto: 0,
};

// Scene "purposes" the AI outputs -> desired bestUse tags
const SCENE_PURPOSE_MAP = {
  opening: ["opening", "environment-establishing"],
  hook: ["opening", "environment-establishing"],
  problem: ["environment-establishing", "b-roll"],
  intro: ["opening"],
  product: ["product-showcase", "demonstration"],
  demo: ["demonstration", "product-showcase"],
  feature: ["demonstration", "product-showcase"],
  team: ["team-reveal"],
  people: ["team-reveal", "testimonial"],
  testimonial: ["testimonial"],
  benefit: ["b-roll", "demonstration"],
  cta: ["closing-cta", "logo-reveal"],
  closing: ["closing-cta", "logo-reveal"],
  end: ["closing-cta", "logo-reveal"],
};

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function textOverlap(a, b) {
  const aa = tokenize(a);
  const bb = new Set(tokenize(b));
  let s = 0;
  for (const t of aa) {
    if (bb.has(t)) s += 2;
    else {
      for (const y of bb) {
        if (y.length > 3 && (y.includes(t) || t.includes(y))) {
          s += 1;
          break;
        }
      }
    }
  }
  return s;
}

/**
 * Score how well an upload matches a scene.
 */
function scoreMatch(upload, scene, sceneIndex, totalScenes) {
  const a = upload.analysis || {};
  let score = 0;

  // 1. Explicit user role → position match
  const isOpening = sceneIndex === 0;
  const isClosing = sceneIndex === totalScenes - 1;

  if (upload.userRole === "opening" && isOpening) score += 30;
  if (upload.userRole === "ending" && isClosing) score += 30;
  if (upload.userRole === "logo" && isClosing) score += 20;
  if (upload.userRole === "hero") score += 8;

  // 2. Scene purpose ↔ bestUse tags
  const purpose = String(
    scene.purpose || scene.type || scene.sceneType || ""
  ).toLowerCase();

  const desiredUses = new Set();
  for (const key of Object.keys(SCENE_PURPOSE_MAP)) {
    if (purpose.includes(key)) {
      SCENE_PURPOSE_MAP[key].forEach((u) => desiredUses.add(u));
    }
  }

  if (isOpening) desiredUses.add("opening");
  if (isClosing) {
    desiredUses.add("closing-cta");
    desiredUses.add("logo-reveal");
  }

  const uploadUses = new Set(a.bestUse || []);
  for (const u of desiredUses) {
    if (uploadUses.has(u)) score += 12;
  }

  // 3. Category overlap with scene intent
  const sceneText = [
    scene.title,
    scene.subtitle,
    scene.imagePrompt,
    scene.searchQueries?.join(" "),
    purpose,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const cat of a.categories || []) {
    if (sceneText.includes(cat)) score += 4;
  }

  // 4. Text overlap between label/subject/description and scene intent
  score += textOverlap(a.label, sceneText);
  score += textOverlap(a.subject, sceneText);
  score += textOverlap(a.description, sceneText) * 0.5;

  // 5. Mood alignment
  if (a.mood && scene.mood && a.mood === String(scene.mood).toLowerCase()) {
    score += 4;
  }

  // 6. User role base weight
  score += ROLE_PRIORITY[upload.userRole] || 0;

  // 7. Explicit reference by AI (scene may have chosen an upload directly)
  if (
    scene.assignedUploadId &&
    scene.assignedUploadId === upload.id
  ) {
    score += 100;
  }
  if (
    typeof scene.assignedUploadIndex === "number" &&
    scene.assignedUploadIndex === upload.index
  ) {
    score += 100;
  }

  return score;
}

export function matchUploadsToScenes(uploads, scenes) {
  if (!uploads?.length) return scenes;

  const used = new Set();
  const total = scenes.length;

  return scenes.map((scene, sceneIndex) => {
    // Skip scenes that explicitly want AI or stock media
    const wantsUpload =
      scene.visualType === "upload" ||
      scene.visualType === "user_upload" ||
      scene.mediaSource === "upload" ||
      !!scene.assignedUploadId ||
      typeof scene.assignedUploadIndex === "number";

    // Also allow uploads for ai_image scenes as a preferred substitution
    const allowSubstitution =
      scene.visualType === "ai_image" ||
      scene.visualType === "stock";

    if (!wantsUpload && !allowSubstitution) return scene;

    let best = null;
    let bestScore = wantsUpload ? -Infinity : 8; // require some quality to substitute

    uploads.forEach((upload) => {
      if (used.has(upload.index)) return;
      const s = scoreMatch(upload, scene, sceneIndex, total);
      if (s > bestScore) {
        best = upload;
        bestScore = s;
      }
    });

    if (!best) return scene;

    used.add(best.index);

    return {
      ...scene,
      mediaUrl: best.image,
      mediaType: "image",
      mediaSource: "upload",
      visualType: "upload",
      uploadedImageId: best.id,
      uploadedImageIndex: best.index,
      matchedLabel: best.analysis.label,
      reasonForSelection: buildReason(best, scene, sceneIndex, total, bestScore),
      assetType: "upload",
    };
  });
}

function buildReason(upload, scene, sceneIndex, total, score) {
  const bits = [];
  if (upload.userRole && upload.userRole !== "auto") {
    bits.push(`user marked as ${upload.userRole}`);
  }
  if (sceneIndex === 0) bits.push("opening scene");
  else if (sceneIndex === total - 1) bits.push("closing scene");
  if (upload.analysis.categories?.length) {
    bits.push(`matches ${upload.analysis.categories.slice(0, 2).join(", ")}`);
  }
  bits.push(`score ${score}`);
  return bits.join(" · ");
}