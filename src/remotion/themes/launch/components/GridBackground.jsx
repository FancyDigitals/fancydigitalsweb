import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { getSurface } from "../tokens";

/**
 * Subtle dot / grid pattern background — used behind product/UI scenes
 * for depth without noise.
 */
export function GridBackground({ scene, style = "dots", opacity = 0.06 }) {
  const frame = useCurrentFrame();
  const surface = getSurface(scene);

  const parallax = interpolate(frame, [0, 300], [0, -20], {
    extrapolateRight: "clamp",
  });

  const dotColor = surface.isDark
    ? `rgba(255,255,255,${opacity * 4})`
    : `rgba(0,0,0,${opacity * 3})`;

  const pattern =
    style === "grid"
      ? `linear-gradient(${dotColor} 1px, transparent 1px),
         linear-gradient(90deg, ${dotColor} 1px, transparent 1px)`
      : `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: pattern,
        backgroundSize: "32px 32px",
        backgroundPosition: `0 ${parallax}px`,
        pointerEvents: "none",
      }}
    />
  );
}