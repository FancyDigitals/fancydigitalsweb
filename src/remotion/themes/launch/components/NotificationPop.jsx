import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { launchTokens, getSurface, getAccent } from "../tokens";

/**
 * Notification card that pops in from the side.
 * Adds UI life to browser / dashboard scenes.
 */
export function NotificationPop({
  scene,
  title = "New signup",
  subtitle = "user@example.com",
  delay = 0,
  x = 24,
  y = 24,
  from = "right", // right | left | top | bottom
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: launchTokens.spring.pop,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.7, 1]);

  const offsets = {
    right: `${interpolate(enter, [0, 1], [40, 0])}px 0`,
    left: `${interpolate(enter, [0, 1], [-40, 0])}px 0`,
    top: `0 ${interpolate(enter, [0, 1], [-40, 0])}px`,
    bottom: `0 ${interpolate(enter, [0, 1], [40, 0])}px`,
  };

  return (
    <div
      style={{
        position: "absolute",
        [from === "left" ? "left" : "right"]: x,
        [from === "bottom" ? "bottom" : "top"]: y,
        padding: "14px 18px",
        borderRadius: launchTokens.radius.lg,
        background: surface.isDark ? "rgba(30,30,36,0.95)" : "rgba(255,255,255,0.98)",
        border: `1px solid ${surface.border}`,
        boxShadow: launchTokens.shadow.xl,
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `translate(${offsets[from]}) scale(${scale})`,
        minWidth: 240,
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        ✓
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: surface.ink }}>{title}</div>
        <div style={{ fontSize: 11, color: surface.muted, fontFamily: launchTokens.font.mono }}>{subtitle}</div>
      </div>
    </div>
  );
}