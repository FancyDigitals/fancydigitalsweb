import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

export function LightSweep() {
  const frame =
    useCurrentFrame();

  const x = interpolate(
    frame,
    [0,180],
    [-700,1700]
  );

  return (
    <AbsoluteFill
      style={{
        pointerEvents:"none",

        opacity:.08,

        transform:`translateX(${x}px)`,

        background:
`
linear-gradient(
90deg,

transparent,

rgba(255,255,255,.9),

transparent
)
`,
      }}
    />
  );
}