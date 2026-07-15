import { interpolate, spring } from "remotion";
import { explainerTokens } from "./tokens";

export function getExplainerTransition({ type = "wipe", fps, frame }) {
  const enter = spring({
    fps,
    frame,
    config: explainerTokens.spring.snap,
  });

  switch (type) {
    case "bounce":
      return {
        opacity: interpolate(enter, [0, 1], [0, 1]),
        scale: interpolate(enter, [0, 1], [0.8, 1]),
      };
    case "slide":
      return {
        opacity: interpolate(enter, [0, 1], [0, 1]),
        x: interpolate(enter, [0, 1], [80, 0]),
      };
    case "wipe":
    default:
      return {
        opacity: interpolate(enter, [0, 1], [0, 1]),
        y: interpolate(enter, [0, 1], [30, 0]),
      };
  }
}

export default { getExplainerTransition };