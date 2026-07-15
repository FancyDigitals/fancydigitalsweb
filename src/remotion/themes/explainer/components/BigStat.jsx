import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { explainerTokens, getExplainerAccent, getExplainerSurface } from "../tokens";

export function BigStat({
  scene,
  value = 100,
  suffix = "%",
  label,
  delay = 0,
  size = 200, // font size
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getExplainerSurface(scene);
  const accent = getExplainerAccent(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: { damping: 12, stiffness: 240, mass: 0.5 },
  });

  const scale = interpolate(enter, [0, 1], [0.4, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const rotate = interpolate(enter, [0, 1], [-10, 0]);

  const count = interpolate(
    frame,
    [delay + 4, delay + 46],
    [0, value],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const displayValue = Math.round(count);

  // Pulsing glow
  const glow = interpolate(Math.sin(frame / 15), [-1, 1], [30, 60]);

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div
        style={{
          fontFamily: explainerTokens.font.display,
          fontSize: size,
          fontWeight: 900,
          color: surface.ink,
          lineHeight: 0.9,
          letterSpacing: "-0.05em",
          fontVariantNumeric: "tabular-nums",
          opacity,
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          textShadow: `0 0 ${glow}px ${accent}55`,
          willChange: "transform, opacity",
        }}
      >
        {displayValue}
        <span style={{ color: accent }}>{suffix}</span>
      </div>

      {label && (
        <div
          style={{
            fontFamily: explainerTokens.font.family,
            fontSize: size * 0.16,
            fontWeight: 700,
            color: surface.muted,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            opacity: interpolate(
              frame,
              [delay + 24, delay + 34],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}