import {
  AbsoluteFill,
  Img,
} from "remotion";

export function Watermark({
  brand,
}) {
  if (!brand?.watermark) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <Img
        src={brand.watermark}
        style={{
          width: 420,
          opacity: .05,
        }}
      />
    </AbsoluteFill>
  );
}