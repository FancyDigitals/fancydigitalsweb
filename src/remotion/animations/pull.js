import { interpolate } from "remotion";

export function pull(frame) {
  return {
    x: 0,
    y: 0,
    scale: interpolate(
      frame,
      [0, 180],
      [1, 1.15]
    ),
    rotate: 0,
    opacity: 1,
  };
}