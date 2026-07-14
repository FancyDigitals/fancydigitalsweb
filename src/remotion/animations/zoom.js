import { interpolate } from "remotion";

export function zoom(frame) {
  return {
    x: 0,

    y: 0,

    scale: interpolate(
      frame,
      [0, 180],
      [1, 1.12],
      {
        extrapolateRight: "clamp",
      }
    ),

    rotate: 0,

    opacity: 1,
  };
}