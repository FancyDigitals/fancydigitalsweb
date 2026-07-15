import { AbsoluteFill } from "remotion";
import { FlatCharacter } from "../characters/FlatCharacter";
import { SpeechBubble } from "../components/SpeechBubble";
import { KineticText } from "../components/KineticText";
import { autoHighlight, explainerTokens } from "../tokens";

export default function SpeechBubbleScene({ scene }) {
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const highlight = autoHighlight(scene.title);
  const quote = scene.quote || scene.subtitle || "Life-changing product!";
  const author = scene.author || "Happy Customer";

  return (
    <>
      <AbsoluteFill
        style={{
          padding: isVertical ? "120px 60px 0" : "60px 100px 0",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
        }}
      >
        <KineticText
          scene={scene}
          text={scene.title}
          variant={isVertical ? "display" : "hero"}
          align="center"
          delay={0}
          highlightWords={highlight}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: isVertical ? "0 40px" : "0 100px",
          paddingTop: isVertical ? 280 : 200,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
          <FlatCharacter
            scene={scene}
            pose="standing"
            mood="happy"
            size={isVertical ? 360 : 380}
            delay={14}
          />

          <div style={{ maxWidth: 420 }}>
            <SpeechBubble
              scene={scene}
              text={`"${quote}"`}
              tailSide="left"
              delay={30}
              maxWidth={420}
              fontSize={24}
            />
            <div
              style={{
                marginTop: 20,
                marginLeft: 24,
                fontFamily: explainerTokens.font.family,
                fontSize: 20,
                fontWeight: 700,
                color: explainerTokens.ink.secondary,
              }}
            >
              — {author}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
}