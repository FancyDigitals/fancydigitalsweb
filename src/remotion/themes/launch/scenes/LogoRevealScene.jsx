import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { WordByWord } from "../components/WordByWord";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { launchTokens, getSurface, getAccent, getAccentSecondary } from "../tokens";

export default function LogoRevealScene({ scene, project }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const accent2 = getAccentSecondary(scene);

  const logoUrl = project?.brand?.logo || project?.brand?.logoUrl;

  const logoEnter = spring({ fps, frame: frame - 6, config: launchTokens.spring.pop });
  const logoOpacity = interpolate(logoEnter, [0, 1], [0, 1]);
  const logoScale = interpolate(logoEnter, [0, 1], [0.4, 1]);
  const logoRotate = interpolate(logoEnter, [0, 1], [-12, 0]);

  // Continuous glow rotation
  const glowRotate = (frame * 1.5) % 360;

  // Multiple pulse rings staggered
  const ring1 = interpolate(frame, [12, 60], [0, 1], { extrapolateRight: "clamp" });
  const ring2 = interpolate(frame, [24, 72], [0, 1], { extrapolateRight: "clamp" });
  const ring3 = interpolate(frame, [36, 84], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <PanelWipe color={accent2} direction="left" delay={0} duration={10} />
      <PulseGlow color={accent} size={900} intensity={0.5} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 56,
        }}
      >
        {/* Logo container */}
        <div style={{ position: "relative", width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Rotating gradient ring */}
          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: `conic-gradient(from ${glowRotate}deg, ${accent}, ${accent2}, ${accent})`,
              filter: "blur(20px)",
              opacity: 0.6,
            }}
          />

          {/* Pulse rings */}
          {[ring1, ring2, ring3].map((r, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: `2px solid ${accent}`,
                opacity: interpolate(r, [0, 0.5, 1], [0, 0.5, 0]),
                transform: `scale(${interpolate(r, [0, 1], [0.6, 1.6])})`,
              }}
            />
          ))}

          {/* Logo */}
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: launchTokens.radius.xl,
              background: surface.isDark ? "rgba(255,255,255,0.08)" : "#FFFFFF",
              border: `1px solid ${surface.border}`,
              boxShadow: `${launchTokens.shadow.xl}, 0 0 80px ${accent}88`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 28,
              opacity: logoOpacity,
              transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
              position: "relative",
              zIndex: 2,
            }}
          >
            {logoUrl ? (
              <Img src={logoUrl} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", borderRadius: launchTokens.radius.lg, background: `linear-gradient(135deg, ${accent}, ${accent2})` }} />
            )}
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, maxWidth: 900, padding: "0 60px", textAlign: "center" }}>
          <WordByWord scene={scene} text={scene.title} variant="display" align="center" delay={30} />
          {scene.subtitle && (
            <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={44} wordDelay={2} style={{ opacity: 0.8 }} />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}