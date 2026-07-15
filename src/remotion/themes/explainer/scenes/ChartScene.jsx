import { AbsoluteFill } from "remotion";
import { KineticText } from "../components/KineticText";
import { ChartBar } from "../components/ChartBar";
import { BigStat } from "../components/BigStat";
import { FlatCharacter } from "../characters/FlatCharacter";
import { autoHighlight } from "../tokens";

const DEFAULT_DATA = [
  { label: "Before", value: 30, suffix: "%" },
  { label: "Week 1", value: 55, suffix: "%" },
  { label: "Week 2", value: 78, suffix: "%" },
  { label: "Week 3", value: 96, suffix: "%" },
];

export default function ChartScene({ scene }) {
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";
  const highlight = autoHighlight(scene.title);

  // If scene has a hero stat, show it big instead of bar chart
  const hasHeroStat = scene.heroStat && typeof scene.heroStat.value === "number";
  const data = scene.chartData || DEFAULT_DATA;

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
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: isVertical ? 360 : 240,
        }}
      >
        {hasHeroStat ? (
          <BigStat
            scene={scene}
            value={scene.heroStat.value}
            suffix={scene.heroStat.suffix || "%"}
            label={scene.heroStat.label}
            delay={30}
            size={isVertical ? 260 : 300}
          />
        ) : (
          <ChartBar
            scene={scene}
            data={data}
            width={isVertical ? 640 : 820}
            height={isVertical ? 400 : 440}
            delay={30}
          />
        )}
      </AbsoluteFill>

      {!isVertical && !hasHeroStat && (
        <AbsoluteFill
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "0 60px 40px",
          }}
        >
          <FlatCharacter scene={scene} pose="pointing" mood="happy" size={240} delay={50} />
        </AbsoluteFill>
      )}
    </>
  );
}