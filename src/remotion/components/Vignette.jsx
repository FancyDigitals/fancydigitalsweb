import { AbsoluteFill } from "remotion";

export function Vignette() {
  return (
    <AbsoluteFill
      style={{
        background:
`
radial-gradient(
ellipse at center,
transparent 25%,
rgba(0,0,0,.18) 55%,
rgba(0,0,0,.65) 100%
)
`,
      }}
    />
  );
}