import {
  interpolate,
  useCurrentFrame,
} from "remotion";

export function useSceneTransition() {
  const frame =
    useCurrentFrame();

  return {
    opacity: interpolate(
      frame,
      [0, 15],
      [0, 1],
      {
        extrapolateRight:
          "clamp",
      }
    ),

    scale: interpolate(
      frame,
      [0, 20],
      [.96, 1],
      {
        extrapolateRight:
          "clamp",
      }
    ),
  };
}