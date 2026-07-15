import ExplainerScene from "./Scene";
import ExplainerBackground from "./Background";
import ExplainerCaption from "./Caption";
import ExplainerTransition from "./Transition";

const explainer = {
  id: "explainer",
  name: "Explainer",

  Scene: ExplainerScene,
  Background: ExplainerBackground,
  Caption: ExplainerCaption,
  Transition: ExplainerTransition,

  fontFamily: `"Nunito", "SF Pro Rounded", -apple-system, system-ui, sans-serif`,

  titleSize: 76,
  subtitleSize: 32,

  titleColor: "#1A1A1A",
  subtitleColor: "#4A4A52",

  overlayOpacity: 0.05,
  borderRadius: 26,

  animation: "bounce",
  transition: "wipe",

  imageScale: 1,
};

export default explainer;