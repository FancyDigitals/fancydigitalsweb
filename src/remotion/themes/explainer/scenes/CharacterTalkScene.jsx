import { AbsoluteFill } from "remotion";
import { FlatCharacter } from "../characters/FlatCharacter";
import { SpeechBubble } from "../components/SpeechBubble";
import { KineticText } from "../components/KineticText";
import { autoHighlight } from "../tokens";

export default function CharacterTalkScene({ scene }) {
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const highlight = autoHighlight(scene.title);

  return (
    <>
      {/* Big title top */}
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
        </div>
      </AbsoluteFill>

      {/* Character + speech bubble */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 40px 40px",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 20 }}>
          <div style={{ marginBottom: 280 }}>
            <SpeechBubble
              scene={scene}
              text={scene.subtitle || (scene.voiceover || "").slice(0, 70) + "..."}
              tailSide="right"
              delay={26}
              maxWidth={380}
              fontSize={24}
            />
          </div>

          <FlatCharacter
            scene={scene}
            pose="presenting"
            mood="happy"
            size={isVertical ? 500 : 460}
            delay={14}
            facing="left"
          />
        </div>
      </AbsoluteFill>
    </>
  );
}