import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

export function AnimatedGradient() {
  const frame = useCurrentFrame();

  const rotate = interpolate(
    frame,
    [0, 300],
    [0, 360]
  );

  return (
    <AbsoluteFill
      style={{
        opacity: .18,

        mixBlendMode: "soft-light",

        transform: `rotate(${rotate}deg)`,

        background: `
conic-gradient(
from 180deg,

rgba(7,90,1,.28),

transparent,

rgba(255,255,255,.10),

transparent,

rgba(11,16,32,.40)
)
`,
      }}
    />
  );
}