export function buildRendererData(project) {
  return {
    fps: 30,

    width: 1080,

    height: 1920,

    durationInFrames:
      project.scenes.reduce(
        (t, s) => t + s.duration,
        0
      ) * 30,

    scenes: project.scenes,

    creative: project.creative,

    storyboard: project.storyboard,

    metadata: project.metadata,
  };
}