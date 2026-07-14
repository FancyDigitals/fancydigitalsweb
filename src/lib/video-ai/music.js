import { searchMusic } from "@/lib/ai/music-library";

/**
 * Pick a single background music track for the whole project.
 * Attaches to project.music.
 */
export async function generateProjectMusic(project) {
  if (!project) return project;

  const mood =
    project.creative?.musicMood ||
    project.creative?.emotion ||
    project.metadata?.tone ||
    "cinematic ambient";

  const totalDuration =
    project.scenes?.reduce((t, s) => t + (s.duration || 5), 0) || 30;

  console.log(`[Music] Searching for mood: "${mood}", duration: ${totalDuration}s`);

  const track = await searchMusic({
    mood,
    duration: totalDuration,
  });

  if (!track) {
    console.warn("[Music] No track found");
    return {
      ...project,
      music: null,
    };
  }

  console.log(`[Music] Selected: ${track.title}`);

  return {
    ...project,
    music: {
      url: track.url,
      title: track.title,
      duration: track.duration,
      source: track.source,
      mood,
      volume: 0.25, // low background level
      duckVolume: 0.08, // duck when voiceover plays
    },
  };
}