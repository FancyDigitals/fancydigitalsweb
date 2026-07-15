import { NextResponse } from "next/server";
import { fetchChannel, resolveChannelId } from "@/lib/youtube/fetcher";
import { createClient } from "@/lib/supabase/server";
import { getLimits } from "@/lib/pricing";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const YT_API = "https://www.googleapis.com/youtube/v3";
const KEY = process.env.YOUTUBE_API_KEY;

export async function POST(req) {
  try {
    // Auth + Pro gate
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    const plan = profile?.plan || "FREE";
    const limits = getLimits(plan);
    if (!limits.youtubeCompetitorCompare) {
      return NextResponse.json(
        {
          success: false,
          error: "Competitor discovery is a Pro feature",
          requiresUpgrade: true,
        },
        { status: 403 }
      );
    }

    const { channelUrl } = await req.json();
    if (!channelUrl?.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing channelUrl" },
        { status: 400 }
      );
    }

    // Resolve source channel + get its data
    const sourceId = await resolveChannelId(channelUrl);
    const sourceChannel = await fetchChannel(sourceId);

    // Extract search keywords from the source channel
    const keywords = extractSearchKeywords(sourceChannel);
    console.log(`[find-competitors] Source: ${sourceChannel.title} · keywords:`, keywords);

    // Search top channels for each keyword (in parallel)
    const seen = new Set([sourceId]);
    const candidates = new Map();

    const searchResults = await Promise.all(
      keywords.slice(0, 3).map((kw) =>
        fetch(
          `${YT_API}/search?part=snippet&type=channel&q=${encodeURIComponent(
            kw
          )}&maxResults=10&order=viewCount&key=${KEY}`
        )
          .then((r) => r.json())
          .then((d) => d.items || [])
          .catch(() => [])
      )
    );

    for (const results of searchResults) {
      for (const item of results) {
        const cid = item.snippet.channelId;
        if (seen.has(cid)) continue;
        seen.add(cid);
        candidates.set(cid, {
          id: cid,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        });
      }
    }

    if (candidates.size === 0) {
      return NextResponse.json(
        { success: false, error: "Could not find competitors" },
        { status: 404 }
      );
    }

    // Batch-fetch stats for top 10 candidates
    const candidateIds = Array.from(candidates.keys()).slice(0, 10);
    const statsRes = await fetch(
      `${YT_API}/channels?part=statistics,snippet&id=${candidateIds.join(",")}&key=${KEY}`
    );
    const statsData = await statsRes.json();

    const withStats = (statsData.items || []).map((c) => ({
      id: c.id,
      title: c.snippet.title,
      thumbnail: c.snippet.thumbnails?.high?.url || c.snippet.thumbnails?.default?.url,
      customUrl: c.snippet.customUrl,
      subscribers: parseInt(c.statistics.subscriberCount || 0, 10),
      totalViews: parseInt(c.statistics.viewCount || 0, 10),
      videoCount: parseInt(c.statistics.videoCount || 0, 10),
      url: c.snippet.customUrl
        ? `https://youtube.com/${c.snippet.customUrl}`
        : `https://youtube.com/channel/${c.id}`,
    }));

    // Filter: relevant size (10% to 100x source subs), sort by size descending
    const sourceSubs = sourceChannel.subscribers || 1;
    const minSubs = Math.max(100, sourceSubs * 0.1);
    const maxSubs = sourceSubs * 100;

    const relevant = withStats
      .filter((c) => c.subscribers >= minSubs && c.subscribers <= maxSubs)
      .sort((a, b) => {
        // Prefer channels similar in size to source
        const aDist = Math.abs(Math.log(a.subscribers) - Math.log(sourceSubs));
        const bDist = Math.abs(Math.log(b.subscribers) - Math.log(sourceSubs));
        return aDist - bDist;
      })
      .slice(0, 5);

    // If filter left nothing, return the biggest ones
    const finalList = relevant.length > 0
      ? relevant
      : withStats.sort((a, b) => b.subscribers - a.subscribers).slice(0, 5);

    return NextResponse.json({
      success: true,
      source: {
        id: sourceChannel.id,
        title: sourceChannel.title,
        subscribers: sourceChannel.subscribers,
      },
      competitors: finalList,
    });
  } catch (error) {
    console.error("[find-competitors]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Extract useful search keywords from a channel.
 * Priority: title words → topic categories → description key phrases.
 */
function extractSearchKeywords(channel) {
  const keywords = new Set();

  // Topic categories (Wikipedia URLs like /Software or /Technology)
  if (channel.topics?.length) {
    for (const topicUrl of channel.topics.slice(-4)) {
      const topic = topicUrl.split("/").pop()?.replace(/_/g, " ");
      if (topic && topic.length > 2) keywords.add(topic);
    }
  }

  // Channel keywords field (set by owner in YouTube Studio)
  if (channel.keywords) {
    const parts = channel.keywords
      .split(/[,"]/)
      .map((k) => k.trim())
      .filter((k) => k.length > 2 && k.length < 30);
    parts.slice(0, 3).forEach((k) => keywords.add(k));
  }

  // Meaningful words from channel title
  if (channel.title) {
    const titleWords = channel.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w));
    titleWords.forEach((w) => keywords.add(w));
  }

  // First meaningful line of description
  if (channel.description) {
    const firstSentence = channel.description
      .split(/[.!?\n]/)[0]
      ?.trim()
      .toLowerCase();
    if (firstSentence && firstSentence.length < 100) {
      const words = firstSentence
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 3 && !STOP.has(w))
        .slice(0, 3);
      words.forEach((w) => keywords.add(w));
    }
  }

  const list = Array.from(keywords).slice(0, 5);
  return list.length > 0 ? list : [channel.title || "youtube"];
}

const STOP = new Set([
  "the", "and", "for", "with", "from", "this", "that", "your", "our", "channel",
  "video", "videos", "youtube", "here", "welcome", "about", "make", "makes",
  "content", "official", "network", "team", "shop", "check", "subscribe",
]);