import { AbsoluteFill } from "remotion";

import { MediaRenderer } from "../../compositions/MediaRenderer";
import { AnimatedText } from "../../compositions/AnimatedText";

import { BackgroundBlur } from "../../components/BackgroundBlur";
import { AnimatedGradient } from "../../components/AnimatedGradient";

import { CinematicOverlay } from "../../components/CinematicOverlay";
import { ShadowOverlay } from "../../components/ShadowOverlay";
import { Vignette } from "../../components/Vignette";
import { Glow } from "../../components/Glow";
import { Noise } from "../../components/Noise";
import { FloatingParticles } from "../../components/FloatingParticles";
import { LightSweep } from "../../components/LightSweep";

import { LogoRenderer } from "../../components/LogoRenderer";
import { Watermark } from "../../components/Watermark";
import { SceneBorder } from "../../components/SceneBorder";

import AppleCaption from "./Caption";

export default function AppleScene({ scene, project }) {
  const aspectRatio = project?.metadata?.aspectRatio || "9:16";

  const enrichedScene = {
    ...scene,
    __brand: project?.brand || null,
    __aspectRatio: aspectRatio,
  };

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <BackgroundBlur scene={enrichedScene} />
      <MediaRenderer scene={enrichedScene} />
      <AnimatedGradient />

      <ShadowOverlay />
      <CinematicOverlay scene={enrichedScene} />
      <Vignette />
      <Glow />
      <Noise />
      <FloatingParticles />
      <LightSweep />

      <Watermark brand={project?.brand} />

      {/* AnimatedText now handles glass internally */}
      <AnimatedText scene={enrichedScene} themeName="apple" />

      {project?.captionsEnabled && <AppleCaption scene={enrichedScene} />}

      <LogoRenderer brand={project?.brand} aspectRatio={aspectRatio} />

      <SceneBorder />
    </AbsoluteFill>
  );
}