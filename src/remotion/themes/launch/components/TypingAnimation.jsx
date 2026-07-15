import { interpolate, useCurrentFrame } from "remotion";
import { launchTokens, getSurface } from "../tokens";

/**
 * Typewriter animation for search bars and URL fields.
 */
export function TypingAnimation({
  scene,
  text,
  delay = 0,
  cps = 24, // characters per second
  showCursor = true,
  fontSize = 22,
  color,
  style = {},
}) {
  const frame = useCurrentFrame();
  const surface = getSurface(scene);

  const charsToShow = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - delay) / (30 / cps)))
  );

  const visibleText = text.slice(0, charsToShow);

  const cursorOpacity = frame % 30 < 15 ? 1 : 0;

  return (
    <div
      style={{
        fontFamily: launchTokens.font.mono,
        fontSize,
        fontWeight: 500,
        color: color || surface.ink,
        letterSpacing: "-0.01em",
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        ...style,
      }}
    >
      {visibleText}
      {showCursor && charsToShow < text.length && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: fontSize,
            background: color || surface.ink,
            opacity: cursorOpacity,
          }}
        />
      )}
    </div>
  );
}