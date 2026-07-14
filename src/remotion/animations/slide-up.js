import { interpolate } from "remotion";

export function slideUp(frame) {
  return {
    x: 0,

    y: interpolate(
      frame,
      [0, 45],
      [120, 0]
    ),

    scale: 1,

    rotate: 0,

    opacity: interpolate(
      frame,
      [0, 30],
      [0, 1]
    ),
  };
}