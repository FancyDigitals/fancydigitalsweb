import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { launchTokens, getAccent } from "../tokens";

/**
 * Shape morph transition — a colored rectangle that scales in and out.
 * Used as a scene divider or reveal mask.
 */
export function ShapeTransition({ scene, delay = 0, color, style = {} }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = color || getAccent(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: launchTokens.spring.snappy,
  });

  const scaleX = interpolate(enter, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 4,
          transform: `translateY(-50%) scaleX(${scaleX})`,
          transformOrigin: "left",
          background: accent,
        }}
      />
    </AbsoluteFill>
  );
}