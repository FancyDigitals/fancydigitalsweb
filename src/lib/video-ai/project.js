import { generateCreativeDirection } from "./director";
import { generateStoryboard } from "./storyboard";
import { generateScenes } from "./scenes";
import { generateProjectMedia } from "./media";
import { generateProjectVoiceover } from "./voiceover";
import { generateProjectMusic } from "./music";
import { validateProject } from "./validator";
import { understandUploads } from "./vision";
import { matchUploadsToScenes } from "./matcher";
import { normalizeScene } from "./fallback";
import { buildTimeline } from "./timeline";
import { buildProjectMetadata } from "./project-metadata";
import { exportProject } from "./export-project";
import { debugProject } from "./debug";
import { preparePlayerData } from "./player-data";

function stripHeavyFields(input) {
  const {
    uploadedImages,
    brand,
    creativeBrief,
    logo,
    logoData,
    ...clean
  } = input || {};
  return clean;
}

export async function generateVideoProject(input) {
  const brand = input.brand || null;
  const creativeBrief = input.creativeBrief || "";
  const businessInput = stripHeavyFields(input);
  const captionsEnabled = input.captionsEnabled ?? false;

  console.log("========== STEP 1 : CREATIVE ==========");
  const creative = await generateCreativeDirection(businessInput);

  console.log("========== STEP 2 : STORYBOARD ==========");
  const storyboard = await generateStoryboard({
    creativeDirection: creative,
    duration: input.duration,
  });

  console.log("========== STEP 2.5 : UNDERSTAND UPLOADS ==========");
  const uploads = await understandUploads(input.uploadedImages || []);

  console.log("========== STEP 3 : SCENES ==========");
  const sceneResult = await generateScenes({
    storyboard,
    business: businessInput,
    brand,
    uploads,
    creativeBrief,
  });

  sceneResult.scenes = matchUploadsToScenes(uploads, sceneResult.scenes || []);

  const normalizedScenes = sceneResult.scenes.map(normalizeScene);

  // Enforce user's theme choice on every scene
const forcedTheme = input.theme || "apple";
const themedScenes = normalizedScenes.map((s) => ({
  ...s,
  theme: forcedTheme,
}));

  let project = {
    creative,
    storyboard,
    metadata: buildProjectMetadata(input),
    brand,
    creativeBrief,
    captionsEnabled,
    uploads: uploads.map((u) => ({
      id: u.id,
      index: u.index,
      name: u.name,
      userRole: u.userRole,
      userNote: u.userNote,
      analysis: u.analysis,
      image: u.image,
    })),
    scenes: buildTimeline(themedScenes),
  };
  

  console.log("========== STEP 4 : TIMELINE ==========");
  project = validateProject(project);

  console.log("========== STEP 5 : MEDIA ==========");
  project = await generateProjectMedia(project);

  console.log("========== STEP 6 : VOICEOVER ==========");
  if (input.customVoiceover) {
    console.log("[Voiceover] Using user-uploaded voiceover");
    const { estimateMp3Duration } = await import("@/lib/ai/tts");
    const audioDuration = estimateMp3Duration(input.customVoiceover);

    const wordCounts = project.scenes.map(
      (s) => (s.voiceover || "").split(/\s+/).filter(Boolean).length || 1
    );
    const totalWords = wordCounts.reduce((a, b) => a + b, 0);

    const startPadding = 0.3;
    const endPadding = 0.5;

    let cursor = startPadding;
    project.scenes = project.scenes.map((scene, i) => {
      const words = wordCounts[i];
      const share = totalWords > 0 ? words / totalWords : 1 / project.scenes.length;
      const isLast = i === project.scenes.length - 1;
      const baseDuration = share * audioDuration;
      const sceneDuration = isLast
        ? Math.max(2, baseDuration + endPadding)
        : Math.max(1.5, baseDuration);
      const updated = {
        ...scene,
        duration: sceneDuration,
        voiceoverStart: cursor,
        voiceoverEnd: cursor + sceneDuration,
      };
      cursor += sceneDuration;
      return updated;
    });

    project.voiceover = {
      voice: "user",
      audio: input.customVoiceover,
      duration: audioDuration,
      totalDuration: cursor,
      startPadding,
      endPadding,
    };
  } else {
    project = await generateProjectVoiceover(project);
  }

  console.log("========== STEP 7 : MUSIC ==========");
  if (input.customMusic) {
    console.log("[Music] Using user-uploaded music");
    project.music = {
      url: input.customMusic,
      title: "Custom track",
      source: "user",
      volume: 0.28,
      duckVolume: 0.1,
    };
  } else {
    project = await generateProjectMusic(project);
  }

  console.log("========== STEP 8 : PLAYER ==========");
  project = preparePlayerData(project);

  return debugProject(exportProject(project));
}