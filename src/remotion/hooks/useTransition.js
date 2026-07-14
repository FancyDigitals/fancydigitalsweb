import {
  interpolate,
  useCurrentFrame,
} from "remotion";

export function useTransition(type = "fade") {
  const frame = useCurrentFrame();

  switch ((type || "").toLowerCase()) {
    case "zoom":
      return {
        opacity: interpolate(frame, [0, 12], [0, 1]),
        scale: interpolate(frame, [0, 20], [0.94, 1]),
        blur: interpolate(frame, [0, 18], [12, 0]),
      };

    case "blur":
      return {
        opacity: interpolate(frame, [0, 12], [0, 1]),
        scale: 1,
        blur: interpolate(frame, [0, 20], [30, 0]),
      };

    case "slide":
      return {
        opacity: 1,
        scale: 1,
        blur: 0,
        x: interpolate(frame, [0, 18], [140, 0]),
      };

    case "flash":
      return {
        opacity: interpolate(
          frame,
          [0, 5, 10],
          [1, 0.25, 1]
        ),
        scale: 1,
        blur: 0,
      };

    default:
      return {
        opacity: interpolate(frame, [0, 12], [0, 1]),
        scale: 1,
        blur: 0,
      };
  }
}