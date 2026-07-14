import { AbsoluteFill } from "remotion";

export function SceneBorder() {
  return (
    <AbsoluteFill
      style={{
        border:
          "1px solid rgba(255,255,255,.05)",

        borderRadius:40,

        inset:24,

        position:"absolute",

        pointerEvents:"none",
      }}
    />
  );
}