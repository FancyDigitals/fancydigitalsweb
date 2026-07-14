export function buildCaptions(project) {
  return project.scenes.map((scene) => ({
    start: scene.start,

    end: scene.end,

    text:
      scene.caption ||
      scene.subtitle ||
      scene.headline,
  }));
}