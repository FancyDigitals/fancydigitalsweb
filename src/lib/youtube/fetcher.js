const YT_API = "https://www.googleapis.com/youtube/v3";
const KEY = process.env.YOUTUBE_API_KEY;

/**
 * Extract a channel identifier from any YouTube URL or handle.
 * Supports:
 *   - https://youtube.com/@handle
 *   - https://youtube.com/channel/UC...
 *   - https://youtube.com/c/customname
 *   - https://youtube.com/user/username
 *   - @handle
 *   - Raw channel ID (UC...)
 */
export function extractChannelIdentifier(input) {
  if (!input) return null;
  const s = String(input).trim();

  // Raw channel ID
  if (/^UC[A-Za-z0-9_-]{22}$/.test(s)) {
    return { type: "id", value: s };
  }

  // Handle format @xxx
  if (s.startsWith("@")) {
    return { type: "handle", value: s.slice(1) };
  }

  try {
    const url = new URL(s);
    const parts = url.pathname.split("/").filter(Boolean);

    // /channel/UC...
    if (parts[0] === "channel" && parts[1]) {
      return { type: "id", value: parts[1] };
    }

    // /@handle
    if (parts[0]?.startsWith("@")) {
      return { type: "handle", value: parts[0].slice(1) };
    }

    // /c/customname or /user/username
    if ((parts[0] === "c" || parts[0] === "user") && parts[1]) {
      return { type: "username", value: parts[1] };
    }

    // /watch?v=... (video URL — extract channel from video)
    if (url.pathname === "/watch") {
      const videoId = url.searchParams.get("v");
      if (videoId) return { type: "video", value: videoId };
    }
  } catch {
    // Not a URL, treat as handle
    return { type: "handle", value: s };
  }

  return null;
}

/**
 * Resolve any identifier to a channel ID.
 */
export async function resolveChannelId(input) {
  const ident = extractChannelIdentifier(input);
  if (!ident) throw new Error("Invalid YouTube URL or handle");

  if (ident.type === "id") return ident.value;

  if (ident.type === "handle") {
    // Search by handle
    const res = await fetch(
      `${YT_API}/channels?part=id&forHandle=@${ident.value}&key=${KEY}`
    );
    const data = await res.json();
    if (data.items?.[0]?.id) return data.items[0].id;
    throw new Error(`Channel not found for handle @${ident.value}`);
  }

  if (ident.type === "username") {
    const res = await fetch(
      `${YT_API}/channels?part=id&forUsername=${ident.value}&key=${KEY}`
    );
    const data = await res.json();
    if (data.items?.[0]?.id) return data.items[0].id;

    // Fallback: search
    const searchRes = await fetch(
      `${YT_API}/search?part=snippet&type=channel&q=${encodeURIComponent(
        ident.value
      )}&maxResults=1&key=${KEY}`
    );
    const searchData = await searchRes.json();
    if (searchData.items?.[0]?.snippet?.channelId) {
      return searchData.items[0].snippet.channelId;
    }
    throw new Error(`Channel not found for username ${ident.value}`);
  }

  if (ident.type === "video") {
    const res = await fetch(
      `${YT_API}/videos?part=snippet&id=${ident.value}&key=${KEY}`
    );
    const data = await res.json();
    if (data.items?.[0]?.snippet?.channelId) {
      return data.items[0].snippet.channelId;
    }
    throw new Error("Could not find channel for video");
  }

  throw new Error("Unrecognized channel format");
}

/**
 * Fetch full channel data.
 */
export async function fetchChannel(channelId) {
  const res = await fetch(
    `${YT_API}/channels?part=snippet,statistics,brandingSettings,contentDetails,topicDetails&id=${channelId}&key=${KEY}`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const channel = data.items?.[0];
  if (!channel) throw new Error("Channel not found");

  return {
    id: channel.id,
    title: channel.snippet.title,
    description: channel.snippet.description,
    customUrl: channel.snippet.customUrl,
    country: channel.snippet.country,
    publishedAt: channel.snippet.publishedAt,
    thumbnail:
      channel.snippet.thumbnails?.high?.url ||
      channel.snippet.thumbnails?.default?.url,
    banner: channel.brandingSettings?.image?.bannerExternalUrl,
    keywords: channel.brandingSettings?.channel?.keywords || "",
    topics: channel.topicDetails?.topicCategories || [],
    subscribers: parseInt(channel.statistics.subscriberCount || 0, 10),
    subscribersHidden: channel.statistics.hiddenSubscriberCount || false,
    totalViews: parseInt(channel.statistics.viewCount || 0, 10),
    videoCount: parseInt(channel.statistics.videoCount || 0, 10),
    uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads,
  };
}

/**
 * Fetch recent videos from a channel (via uploads playlist).
 */
export async function fetchRecentVideos(uploadsPlaylistId, maxResults = 50) {
  const res = await fetch(
    `${YT_API}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${KEY}`
  );

  if (!res.ok) return [];
  const data = await res.json();
  if (!data.items?.length) return [];

  const videoIds = data.items.map((i) => i.contentDetails.videoId).join(",");

  // Batch fetch video stats
  const statsRes = await fetch(
    `${YT_API}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${KEY}`
  );
  const statsData = await statsRes.json();

  return (statsData.items || []).map((v) => ({
    id: v.id,
    title: v.snippet.title,
    description: v.snippet.description,
    publishedAt: v.snippet.publishedAt,
    thumbnail:
      v.snippet.thumbnails?.high?.url ||
      v.snippet.thumbnails?.medium?.url ||
      v.snippet.thumbnails?.default?.url,
    tags: v.snippet.tags || [],
    duration: v.contentDetails.duration, // ISO 8601 (PT4M30S)
    views: parseInt(v.statistics.viewCount || 0, 10),
    likes: parseInt(v.statistics.likeCount || 0, 10),
    comments: parseInt(v.statistics.commentCount || 0, 10),
    url: `https://youtube.com/watch?v=${v.id}`,
  }));
}

/**
 * Search top channels in a niche keyword.
 */
export async function searchTopChannelsInNiche(query, maxResults = 10) {
  const res = await fetch(
    `${YT_API}/search?part=snippet&type=channel&q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}&order=viewCount&key=${KEY}`
  );

  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map((i) => ({
    id: i.snippet.channelId,
    title: i.snippet.title,
    description: i.snippet.description,
    thumbnail: i.snippet.thumbnails?.high?.url,
  }));
}

/**
 * Parse ISO 8601 duration to seconds.
 */
export function parseDuration(iso) {
  if (!iso) return 0;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, h, m, s] = match;
  return (parseInt(h || 0) * 3600) + (parseInt(m || 0) * 60) + parseInt(s || 0);
}

/**
 * Fetch complete channel audit data (channel + recent videos).
 */
export async function fetchFullChannelData(input) {
  const channelId = await resolveChannelId(input);
  const channel = await fetchChannel(channelId);

  const videos = channel.uploadsPlaylistId
    ? await fetchRecentVideos(channel.uploadsPlaylistId, 50)
    : [];

  return { channel, videos };
}