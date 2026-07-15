import { interpolate, spring } from "remotion";
import { launchTokens } from "./tokens";

/**
 * Launch template transitions — panel wipes, mask reveals, scale.
 * Returns transformation values applied by the SceneRenderer.
 */
export function getLaunchTransition({ type = "panel-wipe", fps, frame }) {
  const enter = spring({
    fps,
    frame,
    config: launchTokens.spring.smooth,
  });

  switch (type) {
    case "mask-reveal":
      return {
        opacity: interpolate(enter, [0, 1], [0, 1]),
        scale: interpolate(enter, [0, 1], [1.05, 1]),
      };

    case "scale-reveal":
      return {
        opacity: interpolate(enter, [0, 1], [0, 1]),
        scale: interpolate(enter, [0, 1], [0.94, 1]),
      };

    case "slide":
      return {
        opacity: interpolate(enter, [0, 1], [0, 1]),
        x: interpolate(enter, [0, 1], [60, 0]),
      };

    case "panel-wipe":
    default:
      return {
        opacity: interpolate(enter, [0, 1], [0, 1]),
        y: interpolate(enter, [0, 1], [24, 0]),
      };
  }
}

export default { getLaunchTransition };