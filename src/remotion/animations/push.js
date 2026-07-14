import { interpolate } from "remotion";

export function push(frame) {
  return {
    x: 0,
    y: 0,
    scale: interpolate(
      frame,
      [0, 180],
      [1.15, 1]
    ),
    rotate: 0,
    opacity: 1,
  };
}