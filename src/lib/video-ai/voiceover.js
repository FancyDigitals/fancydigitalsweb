import { generateSpeech, pickVoice, estimateMp3Duration } from "@/lib/ai/tts";

/**
 * Clean up a raw voiceover line so Deepgram doesn't stutter
 * on repeated punctuation, ellipses, or dangling starts.
 */
function cleanLine(text) {
  let t = String(text || "").trim();
  if (!t) return "";

  // Collapse whitespace
  t = t.replace(/\s+/g, " ");
  // Kill ellipses and repeated periods
  t = t.replace(/\.{2,}/g, ".");
  // Kill repeated punctuation
  t = t.replace(/([,;:!?])\1+/g, "$1");
  // Remove leading connective fragments Deepgram trips on
  t = t.replace(/^(and|but|so|or)\s+/i, "");
  // Ensure ending punctuation
  if (!/[.!?]$/.test(t)) t += ".";
  return t;
}

export async function generateProjectVoiceover(project) {
  if (!project?.scenes?.length) {
    console.log("[Voiceover] No scenes, skipping");
    return project;
  }

  const theme =
    project.metadata?.tone ||
    project.creative?.brandPersonality ||
    "apple";
  const voice = pickVoice({ theme });

  const sceneLines = project.scenes.map((scene) => cleanLine(scene.voiceover));
  const hasAnyVoiceover = sceneLines.some((t) => t.length > 0);

  if (!hasAnyVoiceover) {
    console.warn("[Voiceover] No voiceover text on any scene");
    return { ...project, voiceover: null };
  }

  // Join into ONE narration. Single space after period gives natural cadence
  // without triggering Deepgram's "new paragraph" stutter.
  const fullScript = sceneLines
  .filter((s) => s.length > 0)
  .map((s, i) => {
    // Ensure natural sentence-ending punctuation
    let clean = s.trim();
    if (!/[.!?]$/.test(clean)) clean += ".";
    return clean;
  })
  .join(" ");  // single space — Deepgram treats it as continuous prose

  const audio = await generateSpeech({ text: fullScript, voice });
  if (!audio) {
    console.warn("[Voiceover] TTS returned null");
    return { ...project, voiceover: null };
  }

  const audioDuration = estimateMp3Duration(audio);
  console.log(`[Voiceover] ✅ Generated, estimated ${audioDuration.toFixed(2)}s`);

  // Distribute time across scenes proportionally by word count
  const wordCounts = sceneLines.map(
    (s) => s.split(/\s+/).filter(Boolean).length || 1
  );
  const totalWords = wordCounts.reduce((a, b) => a + b, 0);

  const startPadding = 0.3;
  const endPadding = 0.5;

  // Total timeline is padded voiceover; scenes fill only the speech portion
  const speechDuration = audioDuration;

  let cursor = startPadding;
  const scenes = project.scenes.map((scene, i) => {
    const words = wordCounts[i];
    const share = totalWords > 0 ? words / totalWords : 1 / project.scenes.length;

    // Last scene absorbs any rounding + end padding so video ends AFTER audio
    const isLast = i === project.scenes.length - 1;
    const baseDuration = share * speechDuration;
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

  const totalTimelineDuration = cursor;

  return {
    ...project,
    scenes,
    voiceover: {
      voice,
      audio,
      duration: audioDuration,
      totalDuration: totalTimelineDuration,
      startPadding,
      endPadding,
    },
  };
}