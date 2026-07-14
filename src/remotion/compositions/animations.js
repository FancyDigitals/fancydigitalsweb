import { interpolate } from "remotion";

export function zoom(frame) {
  return interpolate(
    frame,
    [0, 150],
    [1, 1.08],
    {
      extrapolateRight: "clamp",
    }
  );
}

export function fade(frame) {
  return interpolate(
    frame,
    [0, 20],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );
}