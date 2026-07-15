import { launchTokens, getSurface } from "../tokens";

/**
 * Premium glass panel — used for cards, floating windows, UI containers.
 */
export function GlassPanel({
  scene,
  children,
  padding = 32,
  radius = launchTokens.radius.lg,
  elevation = "md", // sm | md | lg | xl
  style = {},
}) {
  const surface = getSurface(scene);

  return (
    <div
      style={{
        padding,
        borderRadius: radius,
        background: surface.isDark
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${surface.border}`,
        boxShadow: launchTokens.shadow[elevation],
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Subtle top sheen */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: surface.isDark
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}