/**
 * Self-hosted royalty-free music library.
 * Files live in /public/music and are served by Next.js directly.
 * Works in browser preview AND headless render — no CORS, no rate limits.
 */
const LIBRARY = [
  {
    id: "ambient-piano",
    file: "/music/ambient-piano.mp3",
    title: "Ambient Piano",
    moods: ["calm", "serene", "hopeful", "ambient", "emotional", "cinematic"],
    duration: 135,
  },
  {
    id: "cinematic-inspire",
    file: "/music/cinematic-inspire.mp3",
    title: "Cinematic Inspire",
    moods: ["cinematic", "inspiring", "uplifting", "confident", "powerful"],
    duration: 155,
  },
  {
    id: "corporate-tech",
    file: "/music/corporate-tech.mp3",
    title: "Corporate Tech",
    moods: ["corporate", "professional", "confident", "modern", "startup"],
    duration: 148,
  },
  {
    id: "emotional-piano",
    file: "/music/emotional-piano.mp3",
    title: "Emotional Piano",
    moods: ["emotional", "hopeful", "cinematic", "intimate"],
    duration: 168,
  },
  {
    id: "energetic-upbeat",
    file: "/music/energetic-upbeat.mp3",
    title: "Energetic Upbeat",
    moods: ["energetic", "upbeat", "playful", "startup", "social"],
    duration: 125,
  },
  {
    id: "luxury-elegant",
    file: "/music/luxury-elegant.mp3",
    title: "Luxury Elegant",
    moods: ["luxurious", "elegant", "sophisticated", "cinematic", "premium"],
    duration: 172,
  },
  {
    id: "epic-powerful",
    file: "/music/epic-powerful.mp3",
    title: "Epic Powerful",
    moods: ["epic", "powerful", "dramatic", "cinematic", "tesla"],
    duration: 149,
  },
  {
    id: "minimal-ambient",
    file: "/music/minimal-ambient.mp3",
    title: "Minimal Ambient",
    moods: ["minimal", "ambient", "calm", "apple", "professional"],
    duration: 145,
  },
];

const MOOD_KEYWORDS = {
  cinematic: "cinematic",
  ambient: "ambient",
  inspiring: "inspiring",
  uplifting: "uplifting",
  corporate: "corporate",
  emotional: "emotional",
  energetic: "energetic",
  luxurious: "luxurious",
  luxury: "luxurious",
  calm: "calm",
  serious: "dramatic",
  hopeful: "hopeful",
  confident: "confident",
  powerful: "powerful",
  serene: "serene",
  playful: "playful",
  professional: "professional",
  premium: "premium",
  apple: "apple",
  tesla: "tesla",
  startup: "startup",
  social: "social",
  minimal: "minimal",
  elegant: "elegant",
};

function scoreTrack(track, moodTokens) {
  let score = 0;
  for (const token of moodTokens) {
    if (track.moods.includes(token)) score += 3;
    for (const m of track.moods) {
      if (m.includes(token) || token.includes(m)) score += 1;
    }
  }
  return score;
}

function extractMoodTokens(mood) {
  const raw = String(mood || "").toLowerCase();
  const tokens = new Set();
  for (const key of Object.keys(MOOD_KEYWORDS)) {
    if (raw.includes(key)) tokens.add(MOOD_KEYWORDS[key]);
  }
  if (!tokens.size) tokens.add("cinematic");
  return Array.from(tokens);
}

export async function searchMusic({ mood, duration = 30 }) {
  const tokens = extractMoodTokens(mood);

  const scored = LIBRARY.map((track) => ({
    track,
    score: scoreTrack(track, tokens),
  })).sort((a, b) => b.score - a.score);

  const best = scored[0]?.track || LIBRARY[0];

  console.log(
    `[Music] ✅ Picked "${best.title}" for mood tokens: [${tokens.join(", ")}]`
  );

  return {
    url: best.file,
    title: best.title,
    duration: best.duration,
    source: "self-hosted",
  };
}