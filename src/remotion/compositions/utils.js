export function secondsToFrames(
  seconds,
  fps
) {
  return Math.round(seconds * fps);
}