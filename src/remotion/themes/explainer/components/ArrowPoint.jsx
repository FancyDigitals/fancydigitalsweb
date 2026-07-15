import { interpolate, useCurrentFrame } from "remotion";
import { getExplainerAccent } from "../tokens";

/**
 * Curved animated arrow that draws itself, then bounces at the tip.
 * Use for pointing at UI, props, characters.
 */
export function ArrowPoint({
  scene,
  from = { x: 20, y: 80 },
  to = { x: 80, y: 20 },
  color,
  delay = 0,
  strokeWidth = 6,
  curve = 40,
  style = {},
}) {
  const frame = useCurrentFrame();
  const accent = color || getExplainerAccent(scene);

  // Draw progress
  const drawProgress = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Tip bounce
  const tipBounce = Math.sin((frame - delay - 30) / 8) * 3;

  // Compute midpoint with curve offset
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - curve;

  const pathLength = 500; // approx, close enough for stroke-dasharray
  const dashOffset = pathLength * (1 - drawProgress);

  const angle = Math.atan2(to.y - midY, to.x - midX) * (180 / Math.PI);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
          stroke={accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
        />
      </svg>

      {/* Arrow head — appears at the end */}
      {drawProgress > 0.9 && (
        <div
          style={{
            position: "absolute",
            left: `${to.x}%`,
            top: `${to.y}%`,
            transform: `translate(-50%, -50%) translateY(${tipBounce}px) rotate(${angle}deg)`,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path
              d="M 5 15 L 25 5 L 20 15 L 25 25 Z"
              fill={accent}
              stroke={accent}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}