import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { launchTokens } from "../tokens";

/**
 * Full-screen colored panel that wipes across at scene entry.
 * Signature Launch transition.
 */
export function PanelWipe({
  color,
  direction = "right", // right | left | up | down
  delay = 0,
  duration = 18,
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    fps,
    frame: frame - delay,
    config: launchTokens.spring.punch,
    durationInFrames: duration,
  });

  // Exit phase — panel slides off after briefly covering
  const exit = spring({
    fps,
    frame: frame - delay - duration - 4,
    config: launchTokens.spring.punch,
    durationInFrames: duration,
  });

  const enterProgress = interpolate(enter, [0, 1], [0, 100]);
  const exitProgress = interpolate(exit, [0, 1], [0, 100]);

  let transform;
  if (direction === "right") {
    transform = `translateX(${-100 + enterProgress - exitProgress}%)`;
  } else if (direction === "left") {
    transform = `translateX(${100 - enterProgress + exitProgress}%)`;
  } else if (direction === "up") {
    transform = `translateY(${100 - enterProgress + exitProgress}%)`;
  } else {
    transform = `translateY(${-100 + enterProgress - exitProgress}%)`;
  }

  return (
    <AbsoluteFill
      style={{
        background: color,
        transform,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
}