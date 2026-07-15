import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { explainerTokens, getExplainerAccent, getExplainerSurface } from "../tokens";

/**
 * Kinetic text — each word animates independently.
 *  - Enter: staggered scale + slide-up + motion blur
 *  - Idle: subtle float per word (different rhythm each)
 *  - Highlight: key words rendered in accent color with underline sweep
 *  - Exit (optional): scale + fade
 */
export function KineticText({
  scene,
  text,
  variant = "headline", // mega | hero | display | headline | title | body | label
  align = "center",
  delay = 0,
  wordDelay = 3,
  highlightWords = [],  // ["fast", "premium"]  case-insensitive
  color,
  weight,
  underline = false,     // draw an animated underline under the whole line
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getExplainerSurface(scene);
  const accent = getExplainerAccent(scene);

  const sizes = {
    mega: 200,
    hero: 140,
    display: 108,
    headline: 76,
    title: 54,
    body: 30,
    label: 18,
  };
  const weights = {
    mega: 900,
    hero: 900,
    display: 800,
    headline: 800,
    title: 700,
    body: 600,
    label: 600,
  };
  const lineHeights = {
    mega: 0.9,
    hero: 0.95,
    display: 1.0,
    headline: 1.08,
    title: 1.15,
    body: 1.35,
    label: 1.4,
  };

  const fontSize = sizes[variant] || sizes.headline;
  const fontWeight = weight || weights[variant];
  const lineHeight = lineHeights[variant];

  const words = String(text || "").split(/(\s+)/); // keep whitespace tokens

  // Highlight matcher (case-insensitive, ignores punctuation)
  const highlightSet = new Set(
    (highlightWords || []).map((w) =>
      String(w).toLowerCase().replace(/[^\w]/g, "")
    )
  );

  const isHighlighted = (word) => {
    const clean = word.toLowerCase().replace(/[^\w]/g, "");
    return highlightSet.has(clean);
  };

  // Total animation length — used for underline draw
  const totalWords = words.filter((w) => !/^\s+$/.test(w)).length;
  const linePlayhead = frame - delay - totalWords * wordDelay - 6;
  const underlineProgress = interpolate(
    linePlayhead,
    [0, 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
        gap: 6,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: explainerTokens.font.display,
          fontSize,
          fontWeight,
          lineHeight,
          color: color || surface.ink,
          letterSpacing: variant === "mega" || variant === "hero" ? "-0.04em" : "-0.02em",
          textAlign: align,
          textWrap: "balance",
          margin: 0,
        }}
      >
        {words.map((w, i) => {
          if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;

          // Independent word timing
          const wordIndex = words.slice(0, i).filter((x) => !/^\s+$/.test(x)).length;
          const wordFrame = frame - delay - wordIndex * wordDelay;

          const enter = spring({
            fps,
            frame: wordFrame,
            config: { damping: 12, stiffness: 220, mass: 0.5 },
          });

          const opacity = interpolate(enter, [0, 1], [0, 1]);
          const y = interpolate(enter, [0, 1], [40, 0]);
          const scale = interpolate(enter, [0, 1], [0.7, 1]);
          const blur = interpolate(enter, [0, 1], [10, 0]);
          const rotate = interpolate(enter, [0, 1], [-4, 0]);

          // Continuous micro-float per word (different rhythm each)
          const floatY = Math.sin((frame + wordIndex * 15) / 40) * 2;

          const highlighted = isHighlighted(w);

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                position: "relative",
                opacity,
                transform: `translateY(${y + floatY}px) scale(${scale}) rotate(${rotate}deg)`,
                filter: `blur(${blur}px)`,
                color: highlighted ? accent : "inherit",
                willChange: "transform, opacity, filter",
              }}
            >
              {w}
              {highlighted && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -4,
                    height: fontSize * 0.08,
                    background: accent,
                    borderRadius: 999,
                    transform: `scaleX(${opacity})`,
                    transformOrigin: "left",
                    opacity: 0.6,
                  }}
                />
              )}
            </span>
          );
        })}
      </div>

      {/* Optional underline sweep across the whole line */}
      {underline && (
        <div
          style={{
            height: fontSize * 0.06,
            width: `${underlineProgress * 100}%`,
            background: accent,
            borderRadius: 999,
            marginTop: 8,
          }}
        />
      )}
    </div>
  );
}