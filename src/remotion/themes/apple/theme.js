import AppleScene from "./Scene";
import AppleBackground from "./Background";
import AppleCaption from "./Caption";
import AppleTransition from "./Transition";

const apple = {
  id: "apple",

  name: "Apple",

  Scene: AppleScene,

  Background: AppleBackground,

  Caption: AppleCaption,

  Transition: AppleTransition,

  fontFamily: "Inter",

  titleSize: 94,

  subtitleSize: 42,

  titleColor: "#FFFFFF",

  subtitleColor: "#F5F5F5",

  overlayOpacity: .32,

  borderRadius: 36,

  animation: "fade",

  transition: "crossfade",

  imageScale: 1.05,
};

export default apple;