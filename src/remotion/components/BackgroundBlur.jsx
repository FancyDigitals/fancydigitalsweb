import { AbsoluteFill } from "remotion";

export function BackgroundBlur({
  scene,
}) {
  if (!scene.mediaUrl) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${scene.mediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        transform: "scale(1.25)",

        filter:
          "blur(70px) brightness(.45) saturate(.9)",

        opacity: .85,
      }}
    />
  );
}