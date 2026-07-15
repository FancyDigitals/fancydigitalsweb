import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { WordByWord } from "../components/WordByWord";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { launchTokens, getSurface, getAccent, getAccentSecondary } from "../tokens";

export default function CTARevealScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const accent2 = getAccentSecondary(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const ctaLabel = scene.ctaLabel || "Get Started";

  const btnEnter = spring({ fps, frame: frame - 30, config: launchTokens.spring.pop });
  const btnOpacity = interpolate(btnEnter, [0, 1], [0, 1]);
  const btnY = interpolate(btnEnter, [0, 1], [30, 0]);
  const btnScale = interpolate(btnEnter, [0, 1], [0.7, 1]);

  // Continuous glow pulse
  const glow = interpolate(Math.sin(frame / 18), [-1, 1], [0.5, 1]);
  const glowSize = interpolate(Math.sin(frame / 18), [-1, 1], [40, 80]);

  // Continuous scale breath
  const breath = interpolate(Math.sin(frame / 22), [-1, 1], [0.98, 1.02]);

  // Arrow pulse
  const arrowShift = interpolate(Math.sin(frame / 10), [-1, 1], [0, 6]);

  return (
    <AbsoluteFill>
      <PanelWipe color={accent2} direction="up" delay={0} duration={12} />
      <PulseGlow color={accent} size={1200} intensity={0.5} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "120px 60px" : "80px 100px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, maxWidth: 1000 }}>
          <WordByWord scene={scene} text={scene.title} variant={isVertical ? "display" : "hero"} align="center" delay={0} />
          {scene.subtitle && (
            <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={14} wordDelay={2} style={{ opacity: 0.85, maxWidth: 720 }} />
          )}

          {/* Button */}
          <div style={{ opacity: btnOpacity, transform: `translateY(${btnY}px) scale(${btnScale * breath})`, marginTop: 20 }}>
            <div
              style={{
                padding: "24px 48px",
                borderRadius: launchTokens.radius.pill,
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                color: "#FFFFFF",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                boxShadow: `0 16px 40px ${accent}88, 0 0 ${glowSize}px ${accent}${Math.round(glow * 255).toString(16).padStart(2, "0")}`,
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {ctaLabel}
              <div style={{ transform: `translateX(${arrowShift}px)`, display: "flex" }}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}