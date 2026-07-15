import { AbsoluteFill } from "remotion";

import { AbstractBackdrop } from "./components/AbstractBackdrop";
import { FloatingParticles } from "./components/FloatingParticles";
import ExplainerCaption from "./Caption";

import { LogoRenderer } from "../../components/LogoRenderer";
import { Watermark } from "../../components/Watermark";

import CharacterTalkScene from "./scenes/CharacterTalkScene";
import ProblemScene from "./scenes/ProblemScene";
import SolutionScene from "./scenes/SolutionScene";
import FeatureIconsScene from "./scenes/FeatureIconsScene";
import SpeechBubbleScene from "./scenes/SpeechBubbleScene";
import ChartScene from "./scenes/ChartScene";
import CTAScene from "./scenes/CTAScene";
import DefaultScene from "./scenes/DefaultScene";

const SUB_SCENES = {
  talk: CharacterTalkScene,
  problem: ProblemScene,
  solution: SolutionScene,
  features: FeatureIconsScene,
  speech: SpeechBubbleScene,
  chart: ChartScene,
  cta: CTAScene,
  default: DefaultScene,
};

const MOOD_MAP = {
  talk: "calm",
  problem: "focus",
  solution: "fresh",
  features: "playful",
  speech: "warm",
  chart: "energy",
  cta: "energy",
  default: "calm",
};

function pickSubScene(scene) {
  const explicit = scene.explainerScene;
  if (explicit && SUB_SCENES[explicit]) return { Component: SUB_SCENES[explicit], key: explicit };

  const purpose = String(scene.purpose || "").toLowerCase();
  if (purpose === "opening" || purpose === "hook") return { Component: SUB_SCENES.talk, key: "talk" };
  if (purpose === "problem") return { Component: SUB_SCENES.problem, key: "problem" };
  if (purpose === "solution" || purpose === "product") return { Component: SUB_SCENES.solution, key: "solution" };
  if (purpose === "feature" || purpose === "features") return { Component: SUB_SCENES.features, key: "features" };
  if (purpose === "cta" || purpose === "closing") return { Component: SUB_SCENES.cta, key: "cta" };
  if (purpose === "stats" || purpose === "metrics") return { Component: SUB_SCENES.chart, key: "chart" };
  if (purpose === "testimonial") return { Component: SUB_SCENES.speech, key: "speech" };

  return { Component: SUB_SCENES.default, key: "default" };
}

export default function ExplainerScene({ scene, project }) {
  const aspectRatio = project?.metadata?.aspectRatio || "9:16";

  const enrichedScene = {
    ...scene,
    __brand: project?.brand || null,
    __aspectRatio: aspectRatio,
  };

  const { Component: SubScene, key } = pickSubScene(enrichedScene);
  const mood = MOOD_MAP[key] || "calm";

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <AbstractBackdrop scene={enrichedScene} mood={mood} />
      <FloatingParticles scene={enrichedScene} count={14} />

      <SubScene scene={enrichedScene} project={project} />

      {project?.captionsEnabled && <ExplainerCaption scene={enrichedScene} />}

      <Watermark brand={project?.brand} />
      <LogoRenderer brand={project?.brand} aspectRatio={aspectRatio} />
    </AbsoluteFill>
  );
}