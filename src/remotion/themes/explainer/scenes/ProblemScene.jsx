import { AbsoluteFill } from "remotion";
import { FlatCharacter } from "../characters/FlatCharacter";
import { KineticText } from "../components/KineticText";
import { ObjectProp } from "../components/ObjectProp";
import { HandDraw } from "../components/HandDraw";
import { autoHighlight } from "../tokens";

export default function ProblemScene({ scene }) {
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const highlight = autoHighlight(scene.title);

  return (
    <>
      {/* Bold title with red accent for problem */}
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
            color="#1A1A1A"
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

      {/* Character + question mark */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 0 40px",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 50 }}>
          <div style={{ marginBottom: 200 }}>
            <ObjectProp type="cloud" size={200} color="#8A8A94" delay={30} />
          </div>

          <FlatCharacter
            scene={scene}
            pose="standing"
            mood="focused"
            size={isVertical ? 500 : 460}
            delay={16}
          />

          <div style={{ position: "absolute", top: -40, right: -30 }}>
            <HandDraw
              scene={scene}
              variant="scribble"
              color="#FF6B6B"
              delay={44}
              size={140}
            />
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
}