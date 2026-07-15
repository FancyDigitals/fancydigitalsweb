import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { launchTokens, getSurface, getAccent } from "../tokens";

/**
 * Floating UI card — used in feature grids, panels, dashboards.
 * Includes subtle float animation.
 */
export function FloatingCard({
  scene,
  children,
  delay = 0,
  x = 0,
  y = 0,
  rotation = 0,
  width = 300,
  padding = 24,
  elevation = "lg",
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: launchTokens.spring.gentle,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  const enterY = interpolate(enter, [0, 1], [40, 0]);

  // Gentle continuous float
  const floatY = Math.sin((frame + delay * 2) / 30) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: `50%`,
        top: `50%`,
        width,
        padding,
        borderRadius: launchTokens.radius.lg,
        background: surface.isDark
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${surface.border}`,
        boxShadow: launchTokens.shadow[elevation],
        transform: `
          translate(calc(-50% + ${x}px), calc(-50% + ${y + enterY + floatY}px))
          scale(${scale})
          rotate(${rotation}deg)
        `,
        opacity,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}