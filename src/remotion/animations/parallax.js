import { interpolate } from "remotion";

export function parallax(frame) {
  return {
    x: interpolate(
      frame,
      [0, 180],
      [0, 30]
    ),

    y: interpolate(
      frame,
      [0, 180],
      [0, 18]
    ),

    scale: 1.05,

    rotate: 0,

    opacity: 1,
  };
}