import { Composition } from "remotion";
import { BoldTemplate } from "./templates/BoldTemplate";
import { ExplainerTemplate } from "./templates/ExplainerTemplate";

export const VIDEO_FPS = 30;

// Default scenes for previews
const DEFAULT_SCENES = [
  {
    type: "headline",
    title: "How to Use Fancy Digitals",
    subtitle: "Create AI-powered landing pages in minutes",
    duration: 5,
  },
  {
    type: "step",
    stepNumber: 1,
    title: "Sign up free",
    subtitle: "Visit fancydigitals.com.ng",
    duration: 5,
  },
  {
    type: "step",
    stepNumber: 2,
    title: "Pick your tool",
    subtitle: "Landing pages, resumes, cover letters",
    duration: 5,
  },
  {
    type: "cta",
    title: "Start Free Today",
    subtitle: "No credit card required",
    ctaText: "Try It Now",
    ctaUrl: "fancydigitals.com.ng",
    duration: 5,
  },
];

const DEFAULT_PROPS = {
  scenes: DEFAULT_SCENES,
  brandColor: "#075a01",
  contentStyle: "image-text",
  backgroundStyle: "gradient",
  logoUrl: null,
  showWatermark: true,
};

export const RemotionRoot = () => {
  return (
    <>
      {/* BOLD TEMPLATE — legacy */}
      <Composition
        id="BoldTemplate"
        component={BoldTemplate}
        durationInFrames={30 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: [
            {
              text: "Your Business Name",
              duration: 3,
              background:
                "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
            },
            {
              text: "Solves Real Problems",
              duration: 3,
              background:
                "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
            },
            {
              text: "Try It Free Today",
              duration: 4,
              background:
                "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
            },
          ],
          brandColor: "#075a01",
          logoUrl: null,
        }}
      />

      {/* EXPLAINER — 9:16 (Reels, TikTok, Shorts) */}
      <Composition
        id="ExplainerTemplate-9x16"
        component={ExplainerTemplate}
        durationInFrames={35 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={1080}
        height={1920}
        defaultProps={DEFAULT_PROPS}
      />

      {/* EXPLAINER — 16:9 (YouTube) */}
      <Composition
        id="ExplainerTemplate-16x9"
        component={ExplainerTemplate}
        durationInFrames={35 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={DEFAULT_PROPS}
      />

      {/* EXPLAINER — 1:1 (Instagram Feed) */}
      <Composition
        id="ExplainerTemplate-1x1"
        component={ExplainerTemplate}
        durationInFrames={35 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={1080}
        height={1080}
        defaultProps={DEFAULT_PROPS}
      />
    </>
  );
};