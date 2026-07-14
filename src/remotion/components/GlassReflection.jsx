import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

export function GlassReflection() {

  const frame =
    useCurrentFrame();

  const x =
    interpolate(
      frame,
      [0,140],
      [-900,900]
    );

  return (
    <AbsoluteFill
      style={{
        overflow:"hidden",

        pointerEvents:"none",
      }}
    >
      <div
        style={{
          position:"absolute",

          left:x,

          width:220,

          height:"100%",

          transform:"rotate(18deg)",

          background:
`
linear-gradient(
90deg,

transparent,

rgba(255,255,255,.16),

transparent
)
`,
        }}
      />
    </AbsoluteFill>
  );
}