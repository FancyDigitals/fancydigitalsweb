import { AbsoluteFill } from "remotion";
import { FlatCharacter } from "../characters/FlatCharacter";
import { KineticText } from "../components/KineticText";
import { ObjectProp } from "../components/ObjectProp";
import { HandDraw } from "../components/HandDraw";
import { autoHighlight } from "../tokens";

export default function SolutionScene({ scene }) {
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const highlight = autoHighlight(scene.title);

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
            variant={isVertical ? "display" : "hero"}
            align="center"
            delay={0}
            highlightWords={highlight}
          />
          {scene.subtitle && (
            <div style={{ marginTop: 28 }}>
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
          padding: "0 0 40px",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 40 }}>
          <FlatCharacter
            scene={scene}
            pose="presenting"
            mood="happy"
            size={isVertical ? 500 : 460}
            delay={14}
          />

          <div style={{ marginBottom: 220, position: "relative" }}>
            <ObjectProp type="lightbulb" size={220} color="#FFD93D" delay={34} />
            <div style={{ position: "absolute", top: -50, right: -40 }}>
              <HandDraw
                scene={scene}
                variant="check"
                color="#6BCB77"
                delay={58}
                size={140}
              />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
}