import { interpolate, useCurrentFrame } from "remotion";
import { getAccent, getSurface } from "../tokens";

/**
 * Animated SVG progress ring — used in stats scenes.
 */
export function ProgressRing({
  scene,
  size = 120,
  strokeWidth = 6,
  target = 100, // 0-100
  delay = 0,
  duration = 45,
  label,
}) {
  const frame = useCurrentFrame();
  const accent = getAccent(scene);
  const surface = getSurface(scene);

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, target],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={surface.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {label && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.22,
            fontWeight: 600,
            color: surface.ink,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}