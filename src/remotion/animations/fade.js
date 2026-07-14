import { interpolate } from "remotion";

export function fade(frame) {
  return {
    x: 0,
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