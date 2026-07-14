export function normalizeScene(scene) {
  return {
    ...scene,

    title: scene.title || scene.headline || "",
    subtitle: scene.subtitle || "",

    mediaType:
      scene.mediaType ||
      (scene.visualType === "video" || scene.visualType === "ai_video"
        ? "video"
        : "image"),

    mediaUrl: scene.mediaUrl || null,
    mediaSource: scene.mediaSource || "unknown",

    // Asset intelligence metadata
    assetType: scene.assetType || null,
    uploadedImageId: scene.uploadedImageId || null,
    uploadedImageIndex:
      typeof scene.uploadedImageIndex === "number"
        ? scene.uploadedImageIndex
        : null,
    reasonForSelection: scene.reasonForSelection || "",
    assignedUploadId: scene.assignedUploadId || null,
    assignedUploadIndex:
      typeof scene.assignedUploadIndex === "number"
        ? scene.assignedUploadIndex
        : null,

    duration: scene.duration || 5,
    transition: scene.transition || "zoom",
    animation: scene.animation || "kenburns",
    cameraMotion: scene.cameraMotion || "push",
    backgroundStyle: scene.backgroundStyle || "gradient",
    textStyle: scene.textStyle || "hero",
    glass: scene.glass || "none",
    overlayStyle: scene.overlayStyle || "soft",
    colorGrade: scene.colorGrade || "cinematic",

    layout:
      scene.layout ||
      (scene.type === "cta"
        ? "cta"
        : scene.type === "quote"
        ? "quote"
        : "hero"),
  };
}