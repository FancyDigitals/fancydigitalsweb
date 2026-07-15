import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { getSurface, getAccent, getAccentSecondary } from "./tokens";

/**
 * Constantly-animated mesh gradient background.
 * Two color blobs drift across the canvas at different speeds.
 */
export default function LaunchBackground({ scene }) {
  const frame = useCurrentFrame();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const accent2 = getAccentSecondary(scene);
  const style = scene?.backgroundStyle || "light";

  // Two drifting blob positions
  const blob1X = 50 + Math.sin(frame / 90) * 25;
  const blob1Y = 30 + Math.cos(frame / 110) * 20;

  const blob2X = 60 + Math.cos(frame / 80) * 30;
  const blob2Y = 70 + Math.sin(frame / 100) * 22;

  // Subtle pulse on opacity
  const pulse1 = interpolate(
    Math.sin(frame / 40),
    [-1, 1],
    surface.isDark ? [0.18, 0.32] : [0.14, 0.24]
  );
  const pulse2 = interpolate(
    Math.cos(frame / 50),
    [-1, 1],
    surface.isDark ? [0.15, 0.28] : [0.10, 0.20]
  );

  return (
    <AbsoluteFill style={{ background: surface.bg, overflow: "hidden" }}>
      {/* Blob 1 */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${blob1X}% ${blob1Y}%, ${accent}, transparent 45%)`,
          opacity: pulse1,
        }}
      />
      {/* Blob 2 */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${blob2X}% ${blob2Y}%, ${accent2}, transparent 50%)`,
          opacity: pulse2,
        }}
      />

      {/* Vignette to keep focus */}
      {style !== "dark" && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.06) 100%)",
          }}
        />
      )}

      {/* Dark theme extra layer */}
      {surface.isDark && (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      )}
    </AbsoluteFill>
  );
}