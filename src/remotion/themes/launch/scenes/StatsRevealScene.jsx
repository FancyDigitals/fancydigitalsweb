import { AbsoluteFill } from "remotion";
import { WordByWord } from "../components/WordByWord";
import { HeroStat } from "../components/HeroStat";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { getSurface, getAccent, getAccentSecondary } from "../tokens";

const DEFAULT_STATS = [
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 10, suffix: "x", label: "Faster" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function StatsRevealScene({ scene }) {
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const accent2 = getAccentSecondary(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const stats = scene.stats || DEFAULT_STATS;

  return (
    <AbsoluteFill>
      <PanelWipe color={accent2} direction="right" delay={0} duration={10} />
      <PulseGlow color={accent} size={1000} intensity={0.4} />

      <AbsoluteFill
        style={{
          padding: isVertical ? "100px 60px" : "80px 100px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1100, display: "flex", flexDirection: "column", gap: 72, alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <WordByWord scene={scene} text={scene.title} variant={isVertical ? "title" : "headline"} align="center" delay={0} />
            {scene.subtitle && (
              <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={10} wordDelay={2} style={{ opacity: 0.85 }} />
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isVertical ? "1fr" : `repeat(${Math.min(3, stats.length)}, 1fr)`,
              gap: isVertical ? 60 : 40,
              width: "100%",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {stats.slice(0, 3).map((s, i) => (
              <HeroStat
                key={i}
                scene={scene}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                delay={20 + i * 14}
                size={isVertical ? "hero" : "display"}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}