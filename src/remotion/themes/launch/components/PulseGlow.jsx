import { interpolate, useCurrentFrame } from "remotion";

/**
 * Pulsing radial glow — sits behind key elements to add life.
 */
export function PulseGlow({
  color = "#0E7A43",
  size = 400,
  x = "50%",
  y = "50%",
  intensity = 0.5,
}) {
  const frame = useCurrentFrame();

  const pulse = interpolate(
    Math.sin(frame / 25),
    [-1, 1],
    [intensity * 0.6, intensity]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color}, transparent 60%)`,
        opacity: pulse,
        filter: "blur(40px)",
        pointerEvents: "none",
      }}
    />
  );
}