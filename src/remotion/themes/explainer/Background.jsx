import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { getExplainerSurface, getExplainerAccent, explainerTokens } from "./tokens";

/**
 * Warm, playful backgrounds with subtle floating shapes.
 * Never harsh — always feels friendly.
 */
export default function ExplainerBackground({ scene }) {
  const frame = useCurrentFrame();
  const surface = getExplainerSurface(scene);
  const accent = getExplainerAccent(scene);

  // Floating decorative circles
  const circle1Y = Math.sin(frame / 60) * 15;
  const circle2Y = Math.cos(frame / 80) * 20;
  const circle3Y = Math.sin(frame / 45) * 10;

  return (
    <AbsoluteFill style={{ background: surface.bg, overflow: "hidden" }}>
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: `${10 + circle1Y * 0.3}%`,
          left: "8%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `${accent}12`,
          transform: `translateY(${circle1Y}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${70 + circle2Y * 0.2}%`,
          right: "10%",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `${explainerTokens.accent.sunshine}18`,
          transform: `translateY(${circle2Y}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "5%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `${explainerTokens.accent.lilac}15`,
          transform: `translateY(${circle3Y}px)`,
        }}
      />

      {/* Subtle dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${
            surface.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
          } 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
}