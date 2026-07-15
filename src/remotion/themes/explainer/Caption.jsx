import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getExplainerSurface, getExplainerAccent, explainerTokens } from "./tokens";

export default function ExplainerCaption({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getExplainerSurface(scene);
  const accent = getExplainerAccent(scene);

  if (!scene?.caption) return null;

  const enter = spring({
    fps,
    frame: frame - 15,
    config: explainerTokens.spring.bounce,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.7, 1]);
  const y = interpolate(enter, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 60px 100px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 28px",
          borderRadius: explainerTokens.radius.pill,
          background: "#FFFFFF",
          border: `3px solid ${accent}`,
          boxShadow: explainerTokens.shadow.md,
          opacity,
          transform: `translateY(${y}px) scale(${scale})`,
          fontFamily: explainerTokens.font.family,
          fontSize: 18,
          fontWeight: 700,
          color: explainerTokens.ink.primary,
        }}
      >
        {scene.caption}
      </div>
    </AbsoluteFill>
  );
}