import { interpolate } from "remotion";

export function slideLeft(frame) {
  return {
    x: interpolate(
      frame,
      [0, 45],
      [100, 0]
    ),

    y: 0,

    scale: 1,

    rotate: 0,

    opacity: interpolate(
      frame,
      [0, 30],
      [0, 1]
    ),
  };
}