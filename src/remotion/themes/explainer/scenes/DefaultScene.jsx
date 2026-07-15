import { AbsoluteFill } from "remotion";
import { FlatCharacter } from "../characters/FlatCharacter";
import { KineticText } from "../components/KineticText";
import { autoHighlight } from "../tokens";

export default function DefaultScene({ scene }) {
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const highlight = autoHighlight(scene.title);

  return (
    <>
      {/* Big centered text — dominates the frame */}
      <AbsoluteFill
        style={{
          justifyContent: isVertical ? "flex-start" : "center",
          alignItems: "center",
          padding: isVertical ? "180px 60px 0" : "60px 100px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900 }}>
          <KineticText
            scene={scene}
            text={scene.title}
            variant={isVertical ? "display" : "hero"}
            align="center"
            delay={0}
            highlightWords={highlight}
          />
          {scene.subtitle && (
            <div style={{ marginTop: 32 }}>
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
      </AbsoluteFill>

      {/* Character at bottom */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 0 60px",
        }}
      >
        <FlatCharacter
          scene={scene}
          pose="waving"
          mood="happy"
          size={isVertical ? 460 : 400}
          delay={30}
        />
      </AbsoluteFill>
    </>
  );
}