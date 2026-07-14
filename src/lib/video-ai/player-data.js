export function preparePlayerData(project) {
  const fps = project.fps || 30;

  const scenesDuration = (project.scenes || []).reduce(
    (total, scene) => total + (scene.duration || 5),
    0
  );

  // Voiceover total (with padding) is the source of truth if it exists
  const voiceoverTotal = project.voiceover?.totalDuration || 0;
  const totalSeconds = Math.max(scenesDuration, voiceoverTotal, 1);

  const durationInFrames = Math.max(1, Math.round(totalSeconds * fps));

  return {
    ...project,

    fps,
    width: project.width || 1080,
    height: project.height || 1920,
    durationInFrames,
    totalSeconds,

    brand: project.brand || null,
    metadata: project.metadata || {},
    creative: project.creative || {},
    storyboard: project.storyboard || {},
    scenes: project.scenes || [],
  };
}