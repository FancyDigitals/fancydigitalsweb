import { AbsoluteFill } from "remotion";
import { KineticText } from "../components/KineticText";
import { IconPop } from "../components/IconPop";
import { autoHighlight, explainerTokens } from "../tokens";

const DEFAULT_FEATURES = [
  { icon: "⚡", label: "Fast", color: explainerTokens.accent.sunshine },
  { icon: "✨", label: "Simple", color: explainerTokens.accent.lilac },
  { icon: "🎯", label: "Focused", color: explainerTokens.accent.coral },
  { icon: "💎", label: "Premium", color: explainerTokens.accent.ocean },
];

export default function FeatureIconsScene({ scene }) {
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const highlight = autoHighlight(scene.title);
  const features = scene.features || DEFAULT_FEATURES;

  return (
    <AbsoluteFill
      style={{
        padding: isVertical ? "120px 60px" : "80px 100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: 1000, display: "flex", flexDirection: "column", gap: 70, alignItems: "center", textAlign: "center" }}>
        <div>
          <KineticText
            scene={scene}
            text={scene.title}
            variant={isVertical ? "display" : "hero"}
            align="center"
            delay={0}
            highlightWords={highlight}
          />
          {scene.subtitle && (
            <div style={{ marginTop: 20 }}>
              <KineticText
                scene={scene}
                text={scene.subtitle}
                variant="body"
                align="center"
                delay={20}
                wordDelay={2}
                weight={500}
              />
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isVertical ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 48,
          }}
        >
          {features.slice(0, 4).map((f, i) => (
            <IconPop
              key={i}
              scene={scene}
              icon={f.icon}
              label={f.label}
              color={f.color}
              size={isVertical ? 140 : 150}
              delay={40 + i * 10}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}