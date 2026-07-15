import { AbsoluteFill } from "remotion";
import { WordByWord } from "../components/WordByWord";
import { FloatingCard } from "../components/FloatingCard";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { getSurface, getAccent, getAccentSecondary, launchTokens } from "../tokens";

export default function FloatingPanelsScene({ scene }) {
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const accent2 = getAccentSecondary(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  return (
    <AbsoluteFill>
      <PanelWipe color={accent2} direction="down" delay={0} duration={12} />
      <PulseGlow color={accent} size={800} intensity={0.4} />

      <AbsoluteFill
        style={{
          padding: isVertical ? "120px 60px 0" : "60px 90px 0",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          zIndex: 3,
        }}
      >
        <div style={{ maxWidth: 900, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <WordByWord scene={scene} text={scene.title} variant={isVertical ? "title" : "headline"} align="center" delay={0} />
          {scene.subtitle && (
            <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={10} wordDelay={2} style={{ opacity: 0.85 }} />
          )}
        </div>
      </AbsoluteFill>

      <FloatingCard scene={scene} delay={16} x={-300} y={60} rotation={-6} width={300} elevation="xl">
        <div style={{ fontSize: 12, fontWeight: 600, color: surface.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Feature</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: surface.ink, marginBottom: 6, letterSpacing: "-0.02em" }}>Fast</div>
        <div style={{ fontSize: 15, color: surface.muted, lineHeight: 1.5 }}>Ship in seconds, not weeks.</div>
      </FloatingCard>

      <FloatingCard scene={scene} delay={24} x={0} y={-20} rotation={0} width={340} elevation="xl">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${accent}, ${accent2})`, boxShadow: launchTokens.shadow.glow(accent) }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: surface.ink }}>Premium</div>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, color: surface.ink, letterSpacing: "-0.03em" }}>Beautiful.</div>
        <div style={{ fontSize: 15, color: surface.muted, marginTop: 6 }}>Every pixel considered.</div>
      </FloatingCard>

      <FloatingCard scene={scene} delay={32} x={300} y={100} rotation={6} width={280} elevation="xl">
        <div style={{ fontSize: 12, fontWeight: 600, color: surface.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Simple</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: surface.ink, marginBottom: 6, letterSpacing: "-0.02em" }}>Just works</div>
        <div style={{ fontSize: 15, color: surface.muted, lineHeight: 1.5 }}>No setup. No fuss.</div>
      </FloatingCard>
    </AbsoluteFill>
  );
}