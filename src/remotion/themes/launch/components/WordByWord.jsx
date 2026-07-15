import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { launchTokens, getSurface, getAccent } from "../tokens";

/**
 * Text that reveals word-by-word with blur + slide.
 * Optionally highlights specific words with brand accent color.
 */
export function WordByWord({
  scene,
  text,
  variant = "headline", // hero | display | headline | title | body
  align = "left",
  delay = 0,
  wordDelay = 3,
  highlightWords = [], // array of words to highlight in accent color
  color,
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);

  const sizes = {
    mega: launchTokens.size.mega,
    hero: launchTokens.size.hero,
    display: launchTokens.size.display,
    headline: launchTokens.size.headline,
    title: launchTokens.size.title,
    body: launchTokens.size.body,
    label: launchTokens.size.label,
  };
  const weights = {
    mega: launchTokens.weight.heavy,
    hero: launchTokens.weight.bold,
    display: launchTokens.weight.bold,
    headline: launchTokens.weight.semibold,
    title: launchTokens.weight.semibold,
    body: launchTokens.weight.regular,
    label: launchTokens.weight.medium,
  };
  const lineHeights = {
    mega: 0.95,
    hero: 1.02,
    display: 1.04,
    headline: 1.08,
    title: 1.15,
    body: 1.4,
    label: 1.4,
  };

  const words = String(text).split(/(\s+)/); // preserve spaces

  return (
    <div
      style={{
        fontFamily: launchTokens.font.family,
        fontSize: sizes[variant],
        fontWeight: weights[variant],
        lineHeight: lineHeights[variant],
        letterSpacing: variant === "mega" || variant === "hero" ? "-0.04em" : "-0.02em",
        color: color || surface.ink,
        textAlign: align,
        textWrap: "balance",
        margin: 0,
        ...style,
      }}
    >
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;

        const wordFrame = frame - delay - i * wordDelay;
        const enter = spring({
          fps,
          frame: wordFrame,
          config: launchTokens.spring.snap,
        });

        const opacity = interpolate(enter, [0, 1], [0, 1]);
        const y = interpolate(enter, [0, 1], [20, 0]);
        const blur = interpolate(enter, [0, 1], [8, 0]);

        const isHighlight = highlightWords.some(
          (h) => h.toLowerCase() === w.toLowerCase().replace(/[.,!?]/g, "")
        );

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px)`,
              filter: `blur(${blur}px)`,
              color: isHighlight ? accent : "inherit",
              willChange: "transform, opacity, filter",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
}