import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { launchTokens, getSurface } from "../tokens";

/**
 * Launch template typography component.
 * Handles hero, headline, title, and body text with premium animation.
 */
export function LaunchText({
  scene,
  text,
  variant = "headline", // hero | headline | title | body | label
  delay = 0,
  align = "left",
  color, // override
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: launchTokens.spring.smooth,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [24, 0]);
  const blur = interpolate(enter, [0, 1], [6, 0]);

  const sizes = {
    hero: launchTokens.size.hero,
    display: launchTokens.size.display,
    headline: launchTokens.size.headline,
    title: launchTokens.size.title,
    body: launchTokens.size.body,
    label: launchTokens.size.label,
  };

  const weights = {
    hero: launchTokens.weight.bold,
    display: launchTokens.weight.bold,
    headline: launchTokens.weight.semibold,
    title: launchTokens.weight.semibold,
    body: launchTokens.weight.regular,
    label: launchTokens.weight.medium,
  };

  const lineHeights = {
    hero: 1.02,
    display: 1.04,
    headline: 1.08,
    title: 1.15,
    body: 1.4,
    label: 1.4,
  };

  return (
    <div
      style={{
        fontFamily: launchTokens.font.family,
        fontSize: sizes[variant],
        fontWeight: weights[variant],
        lineHeight: lineHeights[variant],
        letterSpacing: variant === "hero" || variant === "display" ? "-0.03em" : "-0.02em",
        color: color || surface.ink,
        textAlign: align,
        opacity,
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
        willChange: "transform, opacity, filter",
        textWrap: "balance",
        margin: 0,
        ...style,
      }}
    >
      {text}
    </div>
  );
}