import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

import { getLayout } from "../utils/layout";
import { getTextStyle } from "../design-system/textStyles";

export function CaptionRenderer({ scene }) {
  const frame = useCurrentFrame();

  if (!scene.caption) return null;

  const layout = getLayout(scene.layout || "hero");
  const textStyle = getTextStyle(scene.textStyle || "hero");
  const atTop = layout.captionAnchor === "top";

  const opacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 14], [12, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: atTop ? "flex-start" : "flex-end",
        alignItems: "center",
        padding: atTop ? "80px 60px 0" : "0 60px 80px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: "14px 24px",
          borderRadius: 100,
          background: `
            linear-gradient(
              135deg,
              rgba(255,255,255,0.08) 0%,
              rgba(255,255,255,0.02) 100%
            ),
            rgba(10, 10, 10, 0.72)
          `,
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#fff",
          fontSize: textStyle.caption,
          fontWeight: 500,
          lineHeight: 1.35,
          textAlign: "center",
          letterSpacing: "-0.005em",
          opacity,
          transform: `translateY(${atTop ? -translateY : translateY}px)`,
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.06) inset,
            0 20px 60px rgba(0,0,0,0.5)
          `,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {scene.caption}
      </div>
    </AbsoluteFill>
  );
}