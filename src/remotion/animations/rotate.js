import { interpolate } from "remotion";

export function rotate(frame) {
  return {
    x: 0,

    y: 0,

    scale: 1,

    rotate: interpolate(
      frame,
      [0, 180],
      [-1, 1]
    ),

    opacity: 1,
  };
}