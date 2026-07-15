import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FlatCharacter } from "../characters/FlatCharacter";
import { KineticText } from "../components/KineticText";
import { ObjectProp } from "../components/ObjectProp";
import { autoHighlight, explainerTokens, getExplainerAccent } from "../tokens";

export default function CTAScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const accent = getExplainerAccent(scene);
  const highlight = autoHighlight(scene.title);

  const ctaLabel = scene.ctaLabel || "Get Started";

  const btnEnter = spring({
    fps,
    frame: frame - 44,
    config: { damping: 12, stiffness: 220, mass: 0.5 },
  });
  const btnOpacity = interpolate(btnEnter, [0, 1], [0, 1]);
  const btnScale = interpolate(btnEnter, [0, 1], [0.4, 1]);

  const breath = interpolate(Math.sin(frame / 18), [-1, 1], [0.96, 1.04]);
  const glow = interpolate(Math.sin(frame / 18), [-1, 1], [30, 70]);

  return (
    <>
      <AbsoluteFill
        style={{
          padding: isVertical ? "140px 60px 0" : "80px 100px 0",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900 }}>
          <KineticText
            scene={scene}
            text={scene.title}
            variant={isVertical ? "hero" : "display"}
            align="center"
            delay={0}
            highlightWords={highlight}
          />
          {scene.subtitle && (
            <div style={{ marginTop: 24 }}>
              <KineticText
                scene={scene}
                text={scene.subtitle}
                variant="body"
                align="center"
                delay={22}
                wordDelay={2}
                weight={500}
              />
            </div>
          )}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 0 280px",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 40 }}>
          <FlatCharacter
            scene={scene}
            pose="waving"
            mood="happy"
            size={isVertical ? 440 : 400}
            delay={14}
          />

          <div style={{ marginBottom: 180 }}>
            <ObjectProp type="rocket" size={220} color={accent} delay={34} />
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 0 80px",
        }}
      >
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale * breath})`,
          }}
        >
          <div
            style={{
              padding: "24px 48px",
              borderRadius: 999,
              background: accent,
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 800,
              fontFamily: explainerTokens.font.family,
              boxShadow: `0 12px 32px ${accent}88, 0 0 ${glow}px ${accent}66`,
              border: "4px solid #FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {ctaLabel}
            <span style={{ fontSize: 32 }}>→</span>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
}