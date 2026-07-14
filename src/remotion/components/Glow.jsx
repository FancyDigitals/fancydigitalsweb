import { AbsoluteFill } from "remotion";

export function Glow() {
  return (
    <AbsoluteFill
      style={{
        background:
`
radial-gradient(
circle at 50% 30%,

rgba(255,255,255,.10),

transparent 60%
)
`,
        mixBlendMode:"screen",

        opacity:.6,
      }}
    />
  );
}