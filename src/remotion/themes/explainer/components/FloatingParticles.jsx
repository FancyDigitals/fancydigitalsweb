import { AbsoluteFill, useCurrentFrame } from "remotion";
import { getExplainerAccent } from "../tokens";

/**
 * Drifting particles — adds constant subtle motion.
 * 12 dots floating at different speeds.
 */
export function FloatingParticles({ scene, count = 12 }) {
  const frame = useCurrentFrame();
  const accent = getExplainerAccent(scene);

  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.5; // golden angle for even distribution
    const baseX = (seed * 7) % 100;
    const baseY = (seed * 13) % 100;
    const speed = 0.3 + ((i % 5) * 0.15);
    const size = 4 + (i % 4) * 2;
    const drift = 30 + (i % 3) * 15;

    const x = baseX + Math.sin((frame + i * 30) / (60 / speed)) * (drift / 10);
    const y = baseY + Math.cos((frame + i * 40) / (70 / speed)) * (drift / 10);

    return { x, y, size, opacity: 0.3 + (i % 3) * 0.15, key: i };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.key}
          style={{
            position: "absolute",
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: accent,
            opacity: p.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
}