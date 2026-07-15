import { AbsoluteFill } from "remotion";

import LaunchBackground from "./Background";
import LaunchCaption from "./Caption";

import { LogoRenderer } from "../../components/LogoRenderer";
import { Watermark } from "../../components/Watermark";

// Sub-scene registry
import LogoRevealScene from "./scenes/LogoRevealScene";
import SearchRevealScene from "./scenes/SearchRevealScene";
import BrowserRevealScene from "./scenes/BrowserRevealScene";
import LaptopRevealScene from "./scenes/LaptopRevealScene";
import PhoneRevealScene from "./scenes/PhoneRevealScene";
import DashboardRevealScene from "./scenes/DashboardRevealScene";
import FloatingPanelsScene from "./scenes/FloatingPanelsScene";
import FeatureGridScene from "./scenes/FeatureGridScene";
import StatsRevealScene from "./scenes/StatsRevealScene";
import CardRevealScene from "./scenes/CardRevealScene";
import CTARevealScene from "./scenes/CTARevealScene";
import DefaultScene from "./scenes/DefaultScene";

const SUB_SCENES = {
  logo: LogoRevealScene,
  search: SearchRevealScene,
  browser: BrowserRevealScene,
  laptop: LaptopRevealScene,
  phone: PhoneRevealScene,
  dashboard: DashboardRevealScene,
  panels: FloatingPanelsScene,
  features: FeatureGridScene,
  stats: StatsRevealScene,
  card: CardRevealScene,
  cta: CTARevealScene,
  default: DefaultScene,
};

/**
 * Picks the right sub-scene component.
 * Priority: explicit scene.launchScene → inferred from purpose/media → default.
 */
function pickSubScene(scene) {
  const explicit = scene.launchScene;
  if (explicit && SUB_SCENES[explicit]) return SUB_SCENES[explicit];

  const purpose = String(scene.purpose || "").toLowerCase();

  if (purpose === "opening" || purpose === "closing") return SUB_SCENES.logo;
  if (purpose === "cta") return SUB_SCENES.cta;
  if (purpose === "stats" || purpose === "metrics") return SUB_SCENES.stats;
  if (purpose === "feature" || purpose === "features")
    return SUB_SCENES.features;
  if (purpose === "product" || purpose === "demo") {
    // If they uploaded a screenshot, wrap it in a browser/laptop
    if (scene.mediaSource === "upload") return SUB_SCENES.browser;
    return SUB_SCENES.dashboard;
  }
  if (purpose === "hook" || purpose === "problem") return SUB_SCENES.search;

  return SUB_SCENES.default;
}

export default function LaunchScene({ scene, project }) {
  const aspectRatio = project?.metadata?.aspectRatio || "9:16";

  const enrichedScene = {
    ...scene,
    __brand: project?.brand || null,
    __aspectRatio: aspectRatio,
  };

  const SubScene = pickSubScene(enrichedScene);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <LaunchBackground scene={enrichedScene} />

      <SubScene scene={enrichedScene} project={project} />

      <LaunchCaption scene={enrichedScene} />

      <Watermark brand={project?.brand} />

      <LogoRenderer brand={project?.brand} aspectRatio={aspectRatio} />
    </AbsoluteFill>
  );
}