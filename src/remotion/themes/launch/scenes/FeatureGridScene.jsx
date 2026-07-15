import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { WordByWord } from "../components/WordByWord";
import { GlassPanel } from "../components/GlassPanel";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { launchTokens, getSurface, getAccent } from "../tokens";

const DEFAULT_FEATURES = [
  { title: "Fast", desc: "Lightning quick", icon: "⚡" },
  { title: "Simple", desc: "Just works", icon: "✦" },
  { title: "Premium", desc: "Every detail", icon: "◆" },
  { title: "Powerful", desc: "Full control", icon: "◈" },
];

export default function FeatureGridScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const features = scene.features || DEFAULT_FEATURES;

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="up" delay={0} duration={10} />
      <PulseGlow color={accent} size={800} intensity={0.35} />

      <AbsoluteFill
        style={{
          padding: isVertical ? "120px 60px" : "80px 100px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1100, display: "flex", flexDirection: "column", alignItems: "center", gap: 56, width: "100%", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <WordByWord scene={scene} text={scene.title} variant={isVertical ? "title" : "headline"} align="center" delay={0} />
            {scene.subtitle && (
              <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={10} wordDelay={2} style={{ opacity: 0.85, maxWidth: 700 }} />
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isVertical ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: 18,
              width: "100%",
            }}
          >
            {features.slice(0, 4).map((f, i) => {
              const cardEnter = spring({
                fps,
                frame: frame - 22 - i * 5,
                config: launchTokens.spring.pop,
              });
              const cardOpacity = interpolate(cardEnter, [0, 1], [0, 1]);
              const cardY = interpolate(cardEnter, [0, 1], [40, 0]);
              const cardScale = interpolate(cardEnter, [0, 1], [0.8, 1]);

              // Icon bounce
              const iconBounce = spring({
                fps,
                frame: frame - 32 - i * 5,
                config: launchTokens.spring.pop,
              });
              const iconScale = interpolate(iconBounce, [0, 1], [0, 1]);

              return (
                <div key={i} style={{ opacity: cardOpacity, transform: `translateY(${cardY}px) scale(${cardScale})` }}>
                  <GlassPanel scene={scene} padding={28} elevation="lg">
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: `${accent}22`,
                        color: accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        marginBottom: 18,
                        transform: `scale(${iconScale})`,
                        boxShadow: `0 8px 20px ${accent}33`,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: surface.ink, marginBottom: 6, letterSpacing: "-0.01em" }}>{f.title}</div>
                    <div style={{ fontSize: 14, color: surface.muted, lineHeight: 1.5 }}>{f.desc}</div>
                  </GlassPanel>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}