import { interpolate, useCurrentFrame } from "remotion";
import { explainerTokens, getExplainerAccent } from "../tokens";

/**
 * Whiteboard-style hand-drawn underline / circle around text.
 * SVG stroke-dasharray for a natural drawing effect.
 */
export function HandDraw({
  scene,
  variant = "underline", // underline | circle | check | scribble | arrow
  color,
  delay = 0,
  size = 300,
  strokeWidth = 5,
  style = {},
}) {
  const frame = useCurrentFrame();
  const accent = color || getExplainerAccent(scene);

  const paths = {
    underline: {
      d: "M 10 30 Q 100 40 200 28 Q 260 22 290 30",
      length: 300,
    },
    circle: {
      d: "M 20 50 Q 20 10 100 10 Q 180 10 180 60 Q 180 100 100 100 Q 25 100 20 55 Q 22 50 18 45",
      length: 500,
    },
    check: {
      d: "M 30 60 L 70 100 L 170 20",
      length: 250,
    },
    scribble: {
      d: "M 20 50 Q 50 20 80 50 Q 110 80 140 50 Q 170 20 200 50 Q 230 80 260 50",
      length: 320,
    },
    arrow: {
      d: "M 20 80 Q 100 40 180 80 M 170 70 L 180 80 L 170 90",
      length: 280,
    },
  };

  const path = paths[variant] || paths.underline;

  const drawProgress = interpolate(
    frame,
    [delay, delay + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dashOffset = path.length * (1 - drawProgress);

  return (
    <div style={{ display: "inline-block", ...style }}>
      <svg
        viewBox="0 0 300 120"
        width={size}
        height={size * 0.4}
      >
        <path
          d={path.d}
          stroke={accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={path.length}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  );
}