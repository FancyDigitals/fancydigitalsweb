export function buildProjectMetadata(input) {
  return {
    createdAt: new Date().toISOString(),

    duration: input.duration,

    aspectRatio:
      input.aspectRatio || "9:16",

    quality: "4K",

    renderer: "Remotion",

    version: 1,
  };
}