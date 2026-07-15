import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { explainerTokens, getExplainerAccent } from "../tokens";

/**
 * Bouncing icon in a circular badge with glow.
 * Perfect for feature callouts.
 */
export function IconPop({
  scene,
  icon = "✦",
  label,
  color,
  size = 100,
  delay = 0,
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = color || getExplainerAccent(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: explainerTokens.spring.bounce,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0, 1]);
  const rotate = interpolate(enter, [0, 1], [-30, 0]);

  // Continuous gentle bob
  const bob = Math.sin((frame - delay) / 20) * 4;

  // Pulsing glow
  const glowSize = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [12, 24]
  );

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `translateY(${bob}px) scale(${scale}) rotate(${rotate}deg)`,
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.5,
          color: "#FFFFFF",
          boxShadow: `${explainerTokens.shadow.lg}, 0 0 ${glowSize}px ${accent}88`,
          border: "4px solid #FFFFFF",
        }}
      >
        {icon}
      </div>
      {label && (
        <div
          style={{
            fontFamily: explainerTokens.font.family,
            fontSize: 18,
            fontWeight: 700,
            color: explainerTokens.ink.primary,
            textAlign: "center",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}