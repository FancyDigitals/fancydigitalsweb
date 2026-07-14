import { AbsoluteFill } from "remotion";

export default function AppleCaption({
  scene,
}) {
  if (!scene.caption) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 90,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: 880,

          padding: "18px 34px",

          borderRadius: 999,

          background:
            "linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.05))",

          backdropFilter:
            "blur(28px)",

          border:
            "1px solid rgba(255,255,255,.12)",

          boxShadow:
            "0 18px 50px rgba(0,0,0,.35)",

          color: "#FFFFFF",

          fontSize: 28,

          fontWeight: 500,

          lineHeight: 1.45,

          letterSpacing: "-0.02em",

          textAlign: "center",
        }}
      >
        {scene.caption}
      </div>
    </AbsoluteFill>
  );
}