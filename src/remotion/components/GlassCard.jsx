import { AbsoluteFill } from "remotion";

import { getGlass } from "../design-system/glass";
import { getLayout } from "../utils/layout";

export function GlassCard({ scene, children }) {
  const glass = getGlass(scene.glass || "none");

  if (!glass) {
    return children;
  }

  const layout = getLayout(scene.layout || "hero");

  return (
    <AbsoluteFill
      style={{
        justifyContent: layout.justifyContent,
        alignItems: layout.alignItems,
        padding: layout.padding,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: layout.alignItems,
          maxWidth:
            typeof layout.maxWidth === "number"
              ? `${layout.maxWidth}px`
              : layout.maxWidth,
          borderRadius: glass.radius,
          padding: glass.padding,
          position: "relative",
          overflow: "hidden",
          background: `
            linear-gradient(
              135deg,
              rgba(255,255,255,${glass.opacity * 1.6}) 0%,
              rgba(255,255,255,${glass.opacity * 0.4}) 100%
            ),
            rgba(15, 15, 15, 0.35)
          `,
          border: `1px solid rgba(255,255,255,${glass.border})`,
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.08) inset,
            0 30px 80px rgba(0,0,0,${glass.shadow})
          `,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {children}
      </div>
    </AbsoluteFill>
  );
}