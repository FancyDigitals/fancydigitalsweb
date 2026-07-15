import { AbsoluteFill } from "remotion";
import { WordByWord } from "../components/WordByWord";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { getAccent } from "../tokens";

export default function DefaultScene({ scene }) {
  const accent = getAccent(scene);

  // Extract punchy words to highlight
  const words = String(scene.title || "").split(/\s+/);
  const highlight = words.length > 2 ? [words[words.length - 1]] : [];

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="right" delay={0} duration={12} />
      <PulseGlow color={accent} size={700} intensity={0.35} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "120px 90px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1000, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <WordByWord
            scene={scene}
            text={scene.title}
            variant="display"
            align="center"
            delay={14}
            highlightWords={highlight}
          />
          {scene.subtitle && (
            <WordByWord
              scene={scene}
              text={scene.subtitle}
              variant="body"
              align="center"
              delay={24}
              wordDelay={2}
              style={{ maxWidth: 720, opacity: 0.85 }}
            />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}