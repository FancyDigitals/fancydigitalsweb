import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { getTheme } from "../theme-loader";
import { getLayoutWithLogo } from "../utils/layout";
import { getTextStyle } from "../design-system/textStyles";
import { getGlass } from "../design-system/glass";

export function AnimatedText({ scene, themeName = "apple" }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const theme = getTheme(themeName);
  const layout = getLayoutWithLogo({
    layoutName: scene.layout || "hero",
    brand: scene.__brand,
    aspectRatio: scene.__aspectRatio,
  });
  const textStyle = getTextStyle(scene.textStyle || "hero");
  const glass = getGlass(scene.glass || "none");

  const hasCaption = !!scene.caption;
  const captionAtTop = layout.captionAnchor === "top";

  const titleSpring = spring({
    fps,
    frame,
    config: { damping: 22, stiffness: 90, mass: 0.9 },
  });

  const subtitleSpring = spring({
    fps,
    frame: frame - 8,
    config: { damping: 22, stiffness: 80, mass: 1 },
  });

  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [24, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.98, 1]);

  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleSpring, [0, 1], [18, 0]);

  const maxWidthPx =
    typeof layout.maxWidth === "number"
      ? `${layout.maxWidth}px`
      : layout.maxWidth || "820px";

  const captionSafeZone = hasCaption
    ? captionAtTop
      ? "180px 90px 90px"
      : "90px 90px 200px"
    : layout.padding;

  // Text shadow only when NOT using a glass card
  // (glass card provides its own contrast surface)
  const textShadowStack = glass
    ? "0 1px 2px rgba(0,0,0,0.3)"
    : [
        "0 2px 12px rgba(0,0,0,0.65)",
        "0 4px 24px rgba(0,0,0,0.55)",
        "0 8px 40px rgba(0,0,0,0.45)",
        "0 0 2px rgba(0,0,0,0.85)",
      ].join(", ");

  const subtitleShadowStack = glass
    ? "0 1px 2px rgba(0,0,0,0.25)"
    : [
        "0 1px 8px rgba(0,0,0,0.6)",
        "0 3px 18px rgba(0,0,0,0.5)",
        "0 0 2px rgba(0,0,0,0.75)",
      ].join(", ");

  const scrimPosition = getScrimPosition(layout);
  const showScrim = !glass; // glass replaces scrim

  // Build the text block itself (title + subtitle)
  const textBlock = (
    <>
      <h1
        style={{
          margin: 0,
          fontFamily: theme.fontFamily,
          fontSize: textStyle.title,
          fontWeight: textStyle.weight,
          lineHeight: textStyle.lineHeight,
          letterSpacing: textStyle.spacing,
          color: theme.titleColor,
          textAlign: layout.textAlign,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          textShadow: textShadowStack,
          WebkitFontSmoothing: "antialiased",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          textWrap: "balance",
        }}
      >
        {scene.title}
      </h1>

      {!!scene.subtitle && (
        <p
          style={{
            marginTop: 26,
            marginBottom: 0,
            fontFamily: theme.fontFamily,
            fontSize: textStyle.subtitle,
            fontWeight: textStyle.subtitleWeight,
            lineHeight: textStyle.subtitleLineHeight,
            letterSpacing: textStyle.subtitleSpacing,
            color: theme.subtitleColor,
            textAlign: layout.textAlign,
            opacity: subtitleOpacity * 0.95,
            transform: `translateY(${subtitleY}px)`,
            textShadow: subtitleShadowStack,
            WebkitFontSmoothing: "antialiased",
            textWrap: "balance",
            maxWidth: "95%",
          }}
        >
          {scene.subtitle}
        </p>
      )}
    </>
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Radial scrim only when no glass card */}
      {showScrim && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(
              ellipse ${scrimPosition.size} at ${scrimPosition.origin},
              rgba(0,0,0,0.55) 0%,
              rgba(0,0,0,0.35) 30%,
              rgba(0,0,0,0.15) 55%,
              transparent 75%
            )`,
            opacity: titleOpacity * 0.9,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Text content — wrapped in glass if requested */}
      <AbsoluteFill
        style={{
          justifyContent: layout.justifyContent,
          alignItems: layout.alignItems,
          padding: captionSafeZone,
          textAlign: layout.textAlign,
        }}
      >
        {glass ? (
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: layout.alignItems,
              maxWidth: maxWidthPx,
              borderRadius: glass.radius,
              padding: glass.padding,
              position: "relative",
              overflow: "hidden",
              opacity: titleOpacity,
              transform: `translateY(${titleY * 0.5}px)`,
              background: `
                linear-gradient(
                  135deg,
                  rgba(255,255,255,${glass.opacity * 2.2}) 0%,
                  rgba(255,255,255,${glass.opacity * 0.6}) 100%
                ),
                rgba(10, 10, 12, 0.55)
              `,
              border: `1px solid rgba(255,255,255,${glass.border * 1.4})`,
              boxShadow: `
                0 1px 0 rgba(255,255,255,0.12) inset,
                0 0 0 1px rgba(255,255,255,0.04) inset,
                0 30px 80px rgba(0,0,0,${glass.shadow}),
                0 8px 24px rgba(0,0,0,0.4)
              `,
            }}
          >
            {/* Top sheen */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {textBlock}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: maxWidthPx,
              display: "flex",
              flexDirection: "column",
              alignItems: layout.alignItems,
              textAlign: layout.textAlign,
              gap: 0,
            }}
          >
            {textBlock}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function getScrimPosition(layout) {
  const j = layout.justifyContent;
  const a = layout.alignItems;

  let vertical = "50%";
  if (j === "flex-start") vertical = "20%";
  if (j === "flex-end") vertical = "80%";

  let horizontal = "50%";
  if (a === "flex-start") horizontal = "25%";
  if (a === "flex-end") horizontal = "75%";

  return {
    origin: `${horizontal} ${vertical}`,
    size: "70% 45%",
  };
}