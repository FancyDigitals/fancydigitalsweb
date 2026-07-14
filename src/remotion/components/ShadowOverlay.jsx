import { AbsoluteFill } from "remotion";

export function ShadowOverlay() {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(to bottom,rgba(0,0,0,.18),transparent 25%,transparent 75%,rgba(0,0,0,.38))",
      }}
    />
  );
}