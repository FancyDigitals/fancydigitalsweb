import { AbsoluteFill } from "remotion";

export default function QuoteLayout({
  scene,
}) {
  return (
    <AbsoluteFill
      style={{
        background: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontSize: 90,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {scene.title}
      </h1>
    </AbsoluteFill>
  );
}