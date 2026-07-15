import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { WordByWord } from "../components/WordByWord";
import { TypingAnimation } from "../components/TypingAnimation";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { launchTokens, getSurface, getAccent } from "../tokens";

export default function SearchRevealScene({ scene, project }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);

  const business = project?.metadata?.businessName || "yourbrand";
  const url = scene.searchText || `${String(business).toLowerCase().replace(/\s+/g, "")}.com`;

  const expand = spring({ fps, frame: frame - 4, config: launchTokens.spring.punch });
  const barWidth = interpolate(expand, [0, 1], [60, 720]);
  const barOpacity = interpolate(expand, [0, 1], [0, 1]);
  const barScale = interpolate(expand, [0, 1], [0.8, 1]);

  // Focus ring pulse
  const focusPulse = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [0, 0.4]
  );

  const titleDelay = 40;

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="down" delay={0} duration={10} />
      <PulseGlow color={accent} size={600} y="45%" intensity={0.4} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 56,
          padding: "0 60px",
        }}
      >
        {/* Search bar with focus glow */}
        <div style={{ position: "relative" }}>
          {/* Focus glow */}
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: launchTokens.radius.pill,
              background: accent,
              opacity: focusPulse,
              filter: "blur(16px)",
            }}
          />

          <div
            style={{
              position: "relative",
              width: barWidth,
              height: 76,
              borderRadius: launchTokens.radius.pill,
              background: surface.isDark ? "rgba(255,255,255,0.08)" : "#FFFFFF",
              border: `2px solid ${accent}`,
              boxShadow: launchTokens.shadow.lg,
              display: "flex",
              alignItems: "center",
              padding: "0 28px",
              gap: 16,
              opacity: barOpacity,
              transform: `scale(${barScale})`,
              overflow: "hidden",
              transition: "none",
            }}
          >
            {/* Search icon */}
            <div style={{ color: accent, flexShrink: 0, display: "flex" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Typing URL */}
            {frame > 14 && (
              <TypingAnimation scene={scene} text={url} delay={14} cps={30} fontSize={26} style={{ flex: 1 }} />
            )}

            {/* Enter key hint */}
            {frame > 40 && (
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: `${accent}22`,
                  color: accent,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: launchTokens.font.mono,
                  opacity: interpolate(frame, [40, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}
              >
                ↵
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, maxWidth: 900, textAlign: "center" }}>
          <WordByWord scene={scene} text={scene.title} variant="headline" align="center" delay={titleDelay} />
          {scene.subtitle && (
            <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={titleDelay + 12} wordDelay={2} style={{ opacity: 0.85 }} />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}