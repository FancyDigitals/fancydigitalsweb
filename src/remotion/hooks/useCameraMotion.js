import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export function useCameraMotion(scene = {}) {
  const frame = useCurrentFrame();

  const { fps } = useVideoConfig();

  const duration =
    (scene.duration || 5) * fps;

  const progress = interpolate(
    frame,
    [0, duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  switch (scene.cameraMotion) {
    case "push":
      return {
        scale: interpolate(progress, [0, 1], [1, 1.12]),
        x: 0,
        y: 0,
        rotate: 0,
      };

    case "pull":
      return {
        scale: interpolate(progress, [0, 1], [1.12, 1]),
        x: 0,
        y: 0,
        rotate: 0,
      };

    case "pan-left":
      return {
        scale: 1.08,
        x: interpolate(progress, [0, 1], [120, -120]),
        y: 0,
        rotate: 0,
      };

    case "pan-right":
      return {
        scale: 1.08,
        x: interpolate(progress, [0, 1], [-120, 120]),
        y: 0,
        rotate: 0,
      };

    case "rise":
      return {
        scale: 1.06,
        x: 0,
        y: interpolate(progress, [0, 1], [80, -80]),
        rotate: 0,
      };

    case "fall":
      return {
        scale: 1.06,
        x: 0,
        y: interpolate(progress, [0, 1], [-80, 80]),
        rotate: 0,
      };

    case "orbit":
      return {
        scale: interpolate(progress, [0, 1], [1.02, 1.12]),
        x: interpolate(progress, [0, 1], [-60, 60]),
        y: interpolate(progress, [0, 1], [40, -40]),
        rotate: interpolate(progress, [0, 1], [-2, 2]),
      };

    case "parallax":
      return {
        scale: 1.14,
        x: interpolate(progress, [0, 1], [-80, 80]),
        y: interpolate(progress, [0, 1], [35, -35]),
        rotate: 0,
      };

    case "handheld":
      return {
        scale: 1.08,
        x: Math.sin(frame / 8) * 6,
        y: Math.cos(frame / 11) * 5,
        rotate: Math.sin(frame / 15) * .8,
      };

    default:
      return {
        scale: interpolate(progress, [0, 1], [1, 1.08]),
        x: 0,
        y: 0,
        rotate: 0,
      };
  }
}