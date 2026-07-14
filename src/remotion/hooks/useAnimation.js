import { useCurrentFrame } from "remotion";

import { fade } from "../animations/fade";
import { zoom } from "../animations/zoom";
import { slideUp } from "../animations/slide-up";
import { slideLeft } from "../animations/slide-left";
import { push } from "../animations/push";
import { pull } from "../animations/pull";
import { rotate } from "../animations/rotate";
import { parallax } from "../animations/parallax";
import { kenBurns } from "../animations/kenburns";

export function useAnimation(type = "zoom") {
  const frame = useCurrentFrame();

  const animations = {
    fade,
    zoom,
    slide: slideUp,
    slideup: slideUp,
    slideleft: slideLeft,
    push,
    pull,
    rotate,
    parallax,
    kenburns: kenBurns,
  };

  const animation =
    animations[(type || "").toLowerCase()] ||
    zoom;

  const result = animation(frame);

  return {
    x: result.x ?? 0,
    y: result.y ?? 0,
    scale: result.scale ?? 1,
    rotate: result.rotate ?? 0,
    opacity: result.opacity ?? 1,
  };
}