import { interpolate } from "remotion";

export function kenBurns(frame) {
  return {
    x: interpolate(
      frame,
      [0, 180],
      [0, -40]
    ),

    y: interpolate(
      frame,
      [0, 180],
      [0, -25]
    ),

    scale: interpolate(
      frame,
      [0, 180],
      [1, 1.18]
    ),

    rotate: interpolate(
      frame,
      [0, 180],
      [0, -0.8]
    ),

    opacity: 1,
  };
}