import { parseDuration } from "./fetcher";

/**
 * Calculate deep metrics from channel + videos.
 * These are used by both the UI and the AI insight generator.
 */
export function calculateMetrics({ channel, videos }) {
  if (!videos || videos.length === 0) {
    return {
      ...channel,
      metrics: {
        empty: true,
        note: "No videos found",
      },
    };
  }

  const now = Date.now();
  const daysAgo = (date) => (now - new Date(date).getTime()) / (1000 * 60 * 60 * 24);

  const totalVideoViews = videos.reduce((sum, v) => sum + v.views, 0);
  const totalLikes = videos.reduce((sum, v) => sum + v.likes, 0);
  const totalComments = videos.reduce((sum, v) => sum + v.comments, 0);
  const totalDurationSec = videos.reduce((sum, v) => sum + parseDuration(v.duration), 0);

  const avgViews = Math.round(totalVideoViews / videos.length);
  const avgLikes = Math.round(totalLikes / videos.length);
  const avgComments = Math.round(totalComments / videos.length);
  const avgDurationSec = Math.round(totalDurationSec / videos.length);

  const viewToSubRatio = channel.subscribers > 0
    ? avgViews / channel.subscribers
    : 0;

  const likeRatio = totalVideoViews > 0
    ? (totalLikes / totalVideoViews) * 100
    : 0;
  const commentRatio = totalVideoViews > 0
    ? (totalComments / totalVideoViews) * 100
    : 0;

  // Upload cadence
  const sortedVideos = [...videos].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
  const daysSinceLatest = sortedVideos[0]
    ? daysAgo(sortedVideos[0].publishedAt)
    : null;
  const daysSinceOldest = sortedVideos[sortedVideos.length - 1]
    ? daysAgo(sortedVideos[sortedVideos.length - 1].publishedAt)
    : null;
  const uploadFrequencyDays = daysSinceOldest && videos.length > 1
    ? daysSinceOldest / videos.length
    : null;
  const uploadsPerMonth = uploadFrequencyDays
    ? Math.round(30 / uploadFrequencyDays)
    : 0;

  // Top and worst performers
  const topVideos = [...videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  const worstVideos = [...videos]
    .sort((a, b) => a.views - b.views)
    .slice(0, 5);

  // Estimated total watch time in hours (avg duration × views)
  const estimatedWatchHours = Math.round(
    (avgDurationSec * totalVideoViews * 0.4) / 3600 // 40% avg retention estimate
  );

  // Monetization gap
  const monetization = calculateMonetizationGap(channel, {
    estimatedWatchHours,
    uploadsPerMonth,
    avgViews,
    avgDurationSec,
  });

  // Title patterns
  const titleAnalysis = analyzeTitles(videos);

  // Description quality
  const descriptionAnalysis = analyzeDescriptions(videos);

  // Tag usage
  const tagAnalysis = analyzeTags(videos);

  return {
    ...channel,
    metrics: {
      // Volumes
      totalVideoViews,
      avgViews,
      avgLikes,
      avgComments,
      avgDurationSec,
      avgDurationFormatted: formatDuration(avgDurationSec),

      // Ratios
      viewToSubRatio,
      likeRatio,
      commentRatio,

      // Cadence
      daysSinceLatest,
      uploadFrequencyDays,
      uploadsPerMonth,

      // Watch time
      estimatedWatchHours,

      // Performers
      topVideos,
      worstVideos,

      // Monetization
      monetization,

      // Content quality
      titleAnalysis,
      descriptionAnalysis,
      tagAnalysis,

      // Channel age
      channelAgeDays: daysAgo(channel.publishedAt),
      channelAgeYears: (daysAgo(channel.publishedAt) / 365).toFixed(1),
    },
  };
}

function calculateMonetizationGap(channel, { estimatedWatchHours, uploadsPerMonth, avgViews, avgDurationSec }) {
  const SUB_THRESHOLD = 1000;
  const WATCH_HOURS_THRESHOLD = 4000;
  const SHORTS_VIEWS_THRESHOLD = 10_000_000;

  const subsGap = Math.max(0, SUB_THRESHOLD - channel.subscribers);
  const watchGap = Math.max(0, WATCH_HOURS_THRESHOLD - estimatedWatchHours);

  const monetizable = subsGap === 0 && watchGap === 0;

  // ETA calculation based on current velocity
  const currentSubs = channel.subscribers;
  const channelAgeMonths = Math.max(
    1,
    (Date.now() - new Date(channel.publishedAt).getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  const subsPerMonth = currentSubs / channelAgeMonths;
  const monthsToSubsThreshold = subsPerMonth > 0
    ? Math.ceil(subsGap / subsPerMonth)
    : null;

  const watchHoursPerMonth = uploadsPerMonth * avgViews * (avgDurationSec * 0.4 / 3600);
  const monthsToWatchThreshold = watchHoursPerMonth > 0
    ? Math.ceil(watchGap / watchHoursPerMonth)
    : null;

  return {
    monetizable,
    subsGap,
    watchGap,
    subsThreshold: SUB_THRESHOLD,
    watchThreshold: WATCH_HOURS_THRESHOLD,
    subsProgress: Math.min(100, (channel.subscribers / SUB_THRESHOLD) * 100),
    watchProgress: Math.min(100, (estimatedWatchHours / WATCH_HOURS_THRESHOLD) * 100),
    monthsToSubsThreshold,
    monthsToWatchThreshold,
    eta:
      monetizable
        ? "Already monetizable"
        : Math.max(monthsToSubsThreshold || 0, monthsToWatchThreshold || 0) > 0
        ? `~${Math.max(monthsToSubsThreshold || 0, monthsToWatchThreshold || 0)} months at current pace`
        : "Unknown — insufficient data",
  };
}

function analyzeTitles(videos) {
  const lengths = videos.map((v) => v.title.length);
  const avgLength = Math.round(lengths.reduce((s, l) => s + l, 0) / lengths.length);
  const hasNumber = videos.filter((v) => /\d/.test(v.title)).length;
  const hasQuestion = videos.filter((v) => v.title.includes("?")).length;
  const hasBrackets = videos.filter((v) => /[\[\(]/.test(v.title)).length;
  const allCaps = videos.filter((v) => {
    const words = v.title.split(" ");
    const caps = words.filter((w) => w.length > 2 && w === w.toUpperCase()).length;
    return caps / words.length > 0.3;
  }).length;

  return {
    avgLength,
    tooShort: avgLength < 30,
    tooLong: avgLength > 70,
    usesNumbers: `${hasNumber}/${videos.length}`,
    usesQuestions: `${hasQuestion}/${videos.length}`,
    usesBrackets: `${hasBrackets}/${videos.length}`,
    overusesCaps: allCaps > videos.length * 0.4,
  };
}

function analyzeDescriptions(videos) {
  const lengths = videos.map((v) => (v.description || "").length);
  const avgLength = Math.round(lengths.reduce((s, l) => s + l, 0) / lengths.length);
  const empty = videos.filter((v) => !v.description || v.description.length < 50).length;
  const hasLinks = videos.filter((v) => /https?:\/\//.test(v.description || "")).length;
  const hasTimestamps = videos.filter((v) => /\d+:\d+/.test(v.description || "")).length;

  return {
    avgLength,
    tooShort: avgLength < 200,
    empty: `${empty}/${videos.length}`,
    hasLinks: `${hasLinks}/${videos.length}`,
    hasTimestamps: `${hasTimestamps}/${videos.length}`,
  };
}

function analyzeTags(videos) {
  const tagCounts = videos.map((v) => (v.tags || []).length);
  const avgTags = Math.round(tagCounts.reduce((s, c) => s + c, 0) / videos.length);
  const withoutTags = videos.filter((v) => !v.tags || v.tags.length === 0).length;

  return {
    avgTags,
    withoutTags: `${withoutTags}/${videos.length}`,
    underused: avgTags < 5,
  };
}

function formatDuration(sec) {
  if (!sec) return "0s";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}