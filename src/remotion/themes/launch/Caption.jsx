import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getSurface, getAccent, launchTokens } from "./tokens";

/**
 * Launch-style caption — minimal pill at bottom, subtle rise-in animation.
 */
export default function LaunchCaption({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);

  if (!scene?.caption) return null;

  const enter = spring({
    fps,
    frame: frame - 20,
    config: launchTokens.spring.smooth,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [16, 0]);

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
          gap: 10,
          padding: "12px 22px",
          borderRadius: launchTokens.radius.pill,
          background: surface.isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.05)",
          border: `1px solid ${surface.border}`,
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: accent,
          }}
        />
        <div
          style={{
            fontFamily: launchTokens.font.family,
            fontSize: 16,
            fontWeight: 500,
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