import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { explainerTokens, getExplainerAccent, getExplainerSurface } from "../tokens";

/**
 * Modern abstract backdrop — drifting gradient blobs + floating shapes.
 * Adapts mood/color per scene. Constant motion. Premium editorial feel.
 */
export function AbstractBackdrop({ scene, mood = "calm" }) {
  const frame = useCurrentFrame();
  const surface = getExplainerSurface(scene);
  const accent = getExplainerAccent(scene);

  // Mood → color palette
  const palettes = {
    calm: [accent, explainerTokens.accent.ocean, explainerTokens.accent.lilac],
    warm: [explainerTokens.accent.coral, explainerTokens.accent.sunshine, explainerTokens.accent.tangerine],
    fresh: [explainerTokens.accent.grass, accent, explainerTokens.accent.ocean],
    playful: [explainerTokens.accent.coral, explainerTokens.accent.sunshine, explainerTokens.accent.lilac],
    focus: [accent, explainerTokens.accent.ocean, "#4A5568"],
    energy: [explainerTokens.accent.coral, explainerTokens.accent.sunshine, accent],
  };
  const colors = palettes[mood] || palettes.calm;

  // Drifting blob positions
  const blob1X = 20 + Math.sin(frame / 80) * 12;
  const blob1Y = 25 + Math.cos(frame / 100) * 15;
  const blob2X = 70 + Math.cos(frame / 90) * 18;
  const blob2Y = 65 + Math.sin(frame / 110) * 12;
  const blob3X = 50 + Math.sin(frame / 120) * 20;
  const blob3Y = 85 + Math.cos(frame / 130) * 10;

  // Floating geometric shapes
  const shape1Y = Math.sin(frame / 60) * 12;
  const shape2Y = Math.cos(frame / 50) * 15;
  const shape3Y = Math.sin(frame / 70) * 10;
  const shape1Rot = frame * 0.15;
  const shape2Rot = -frame * 0.12;

  return (
    <AbsoluteFill style={{ background: surface.bg, overflow: "hidden" }}>
      {/* Gradient blob 1 */}
      <div
        style={{
          position: "absolute",
          top: `${blob1Y}%`,
          left: `${blob1X}%`,
          width: 700,
          height: 700,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors[0]}, transparent 65%)`,
          opacity: 0.35,
          filter: "blur(40px)",
        }}
      />
      {/* Gradient blob 2 */}
      <div
        style={{
          position: "absolute",
          top: `${blob2Y}%`,
          left: `${blob2X}%`,
          width: 600,
          height: 600,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors[1]}, transparent 65%)`,
          opacity: 0.3,
          filter: "blur(50px)",
        }}
      />
      {/* Gradient blob 3 */}
      <div
        style={{
          position: "absolute",
          top: `${blob3Y}%`,
          left: `${blob3X}%`,
          width: 500,
          height: 500,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors[2]}, transparent 65%)`,
          opacity: 0.28,
          filter: "blur(45px)",
        }}
      />

      {/* Floating geometric shapes */}
      {/* Circle */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "8%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          border: `3px solid ${accent}`,
          opacity: 0.4,
          transform: `translateY(${shape1Y}px) rotate(${shape1Rot}deg)`,
        }}
      />

      {/* Square */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "8%",
          width: 70,
          height: 70,
          borderRadius: 14,
          background: `${colors[1]}44`,
          transform: `translateY(${shape2Y}px) rotate(${shape2Rot}deg)`,
        }}
      />

      {/* Triangle */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          right: "12%",
          transform: `translateY(${shape3Y}px)`,
        }}
      >
        <svg width="70" height="60" viewBox="0 0 70 60">
          <path
            d="M 35 5 L 65 55 L 5 55 Z"
            fill="none"
            stroke={colors[2]}
            strokeWidth="3"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Plus sign */}
      <div
        style={{
          position: "absolute",
          bottom: "35%",
          right: "20%",
          transform: `translateY(${-shape1Y}px) rotate(${-shape1Rot}deg)`,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M 20 5 L 20 35 M 5 20 L 35 20"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Dot grid overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${
            surface.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
          } 1.5px, transparent 1.5px)`,
          backgroundSize: "48px 48px",
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
}