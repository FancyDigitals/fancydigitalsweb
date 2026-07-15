import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { WordByWord } from "../components/WordByWord";
import { GlassPanel } from "../components/GlassPanel";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { NotificationPop } from "../components/NotificationPop";
import { launchTokens, getSurface, getAccent, getAccentSecondary } from "../tokens";

export default function DashboardRevealScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const accent2 = getAccentSecondary(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const mainEnter = spring({ fps, frame: frame - 8, config: launchTokens.spring.punch });
  const mainOpacity = interpolate(mainEnter, [0, 1], [0, 1]);
  const mainY = interpolate(mainEnter, [0, 1], [60, 0]);
  const mainScale = interpolate(mainEnter, [0, 1], [0.9, 1]);

  const card1 = spring({ fps, frame: frame - 20, config: launchTokens.spring.pop });
  const card2 = spring({ fps, frame: frame - 28, config: launchTokens.spring.pop });

  // Growing number
  const growth = interpolate(frame, [30, 60], [0, 128], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const active = interpolate(frame, [40, 70], [0, 12400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="right" delay={0} duration={10} />
      <PulseGlow color={accent2} size={900} intensity={0.35} />

      <AbsoluteFill
        style={{
          padding: isVertical ? "120px 60px" : "80px 100px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1000, display: "flex", flexDirection: "column", gap: 36, alignItems: "center", textAlign: "center" }}>
          <WordByWord scene={scene} text={scene.title} variant={isVertical ? "title" : "headline"} align="center" delay={0} />

          {/* Main dashboard panel */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: isVertical ? 860 : 1050,
              opacity: mainOpacity,
              transform: `translateY(${mainY}px) scale(${mainScale})`,
            }}
          >
            <GlassPanel scene={scene} padding={28} elevation="xl">
              {scene.mediaUrl ? (
                <Img
                  src={scene.mediaUrl}
                  style={{ width: "100%", height: isVertical ? 420 : 480, objectFit: "cover", borderRadius: launchTokens.radius.md }}
                />
              ) : (
                <div style={{ width: "100%", height: isVertical ? 420 : 480, borderRadius: launchTokens.radius.md, background: `linear-gradient(135deg, ${accent}44, ${accent2}22)` }} />
              )}
            </GlassPanel>

            {/* Notification popup */}
            {frame > 55 && (
              <NotificationPop
                scene={scene}
                title="Live • 128 online"
                subtitle="Updated just now"
                delay={55}
                from="right"
                x={-20}
                y={20}
              />
            )}
          </div>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 860 }}>
            <div style={{ flex: 1, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px) scale(${interpolate(card1, [0, 1], [0.9, 1])})` }}>
              <GlassPanel scene={scene} padding={24} elevation="lg">
                <div style={{ fontSize: 12, fontWeight: 600, color: surface.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Growth</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: accent, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
                  +{Math.round(growth)}%
                </div>
              </GlassPanel>
            </div>
            <div style={{ flex: 1, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px) scale(${interpolate(card2, [0, 1], [0.9, 1])})` }}>
              <GlassPanel scene={scene} padding={24} elevation="lg">
                <div style={{ fontSize: 12, fontWeight: 600, color: surface.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Active</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: surface.ink, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
                  {Math.round(active).toLocaleString()}
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}