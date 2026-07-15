import LaunchScene from "./Scene";
import LaunchBackground from "./Background";
import LaunchCaption from "./Caption";
import LaunchTransition from "./Transition";

const launch = {
  id: "launch",
  name: "Launch",

  Scene: LaunchScene,
  Background: LaunchBackground,
  Caption: LaunchCaption,
  Transition: LaunchTransition,

  fontFamily: `-apple-system, "SF Pro Display", "Inter", system-ui, sans-serif`,

  titleSize: 96,
  subtitleSize: 36,

  titleColor: "#0A0A0B",
  subtitleColor: "#4B4B52",

  overlayOpacity: 0.1,
  borderRadius: 24,

  animation: "reveal",
  transition: "panel-wipe",

  imageScale: 1,
};

export default launch;