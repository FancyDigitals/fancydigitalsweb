import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getSurface, getAccent, launchTokens } from "./tokens";

export default function LaunchCaption({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);

  if (!scene?.caption) return null;

  const enter = spring({
    fps,
    frame: frame - 12,
    config: launchTokens.spring.pop,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const y = interpolate(enter, [0, 1], [24, 0]);

  const dotPulse = interpolate(
    Math.sin(frame / 12),
    [-1, 1],
    [0.7, 1]
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 60px 120px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 24px",
          borderRadius: launchTokens.radius.pill,
          background: surface.isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.06)",
          border: `1px solid ${surface.border}`,
          opacity,
          transform: `translateY(${y}px) scale(${scale})`,
          boxShadow: `0 8px 24px ${accent}22`,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accent,
            transform: `scale(${dotPulse})`,
            boxShadow: `0 0 12px ${accent}`,
          }}
        />
        <div
          style={{
            fontFamily: launchTokens.font.family,
            fontSize: 17,
            fontWeight: 600,
            color: surface.ink,
            letterSpacing: "-0.01em",
          }}
        >
          {scene.caption}
        </div>
      </div>
    </AbsoluteFill>
  );
}