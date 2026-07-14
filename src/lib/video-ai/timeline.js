export function buildTimeline(scenes) {
  let current = 0;

  return scenes.map((scene) => {
    const start = current;

    current += scene.duration;

    return {
      ...scene,
      start,
      end: current,
    };
  });
}