import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Hash, Clock, Zap, ExternalLink } from "lucide-react";

const PLATFORM_META = {
  instagram: { label: "Instagram", color: "#E1306C", bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
  linkedin: { label: "LinkedIn", color: "#0A66C2", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  twitter: { label: "Twitter/X", color: "#000000", bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
  facebook: { label: "Facebook", color: "#1877F2", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  tiktok: { label: "TikTok", color: "#010101", bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
  youtube: { label: "YouTube", color: "#FF0000", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
  threads: { label: "Threads", color: "#000000", bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
  pinterest: { label: "Pinterest", color: "#E60023", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
};

export async function generateMetadata({ params }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_posts")
    .select("title, topic")
    .eq("share_token", params.token)
    .eq("is_public", true)
    .single();

  if (!data) return { title: "Social Posts | Fancy Digitals" };

  return {
    title: `${data.title || "Social Posts"} | Fancy Digitals`,
    description: data.topic
      ? `Social media posts about: ${data.topic}`
      : "View these AI-generated social media posts.",
  };
}

function PlatformCard({ platformKey, postData }) {
  const meta = PLATFORM_META[platformKey] || {
    label: platformKey,
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
  };

  return (
    <div className={`rounded-2xl border ${meta.border} overflow-hidden`}>
      <div className={`px-4 py-3 ${meta.bg}`}>
        <span className={`text-sm font-bold ${meta.text}`}>{meta.label}</span>
      </div>
      <div className="p-4 space-y-4 bg-white">
        {/* Caption */}
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Caption</span>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {postData.main_caption}
          </p>
        </div>

        {/* Hook */}
        {postData.hook && (
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hook</span>
            </div>
            <p className="text-sm text-gray-700 italic">{postData.hook}</p>
          </div>
        )}

        {/* CTA */}
        {postData.cta && (
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">CTA</span>
            <p className="text-sm text-[#075a01] font-medium">{postData.cta}</p>
          </div>
        )}

        {/* Twitter thread */}
        {platformKey === "twitter" && postData.thread && (
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Thread</span>
            <div className="space-y-2">
              {postData.thread.map((tweet, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-xs text-gray-400 font-bold mt-1 w-4 flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-gray-700">{tweet}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hashtags */}
        {postData.hashtags && postData.hashtags.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Hash className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hashtags</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {postData.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-0.5 rounded-full ${meta.bg} ${meta.text} border ${meta.border}`}
                >
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Best time */}
        {postData.best_time && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            Best time: {postData.best_time}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function SocialPostSharePage({ params }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("social_posts")
    .select("*")
    .eq("share_token", params.token)
    .eq("is_public", true)
    .single();

  if (!data || error) {
    notFound();
  }

  const posts = data.posts;
  const isBulk = posts?.mode === "bulk";
  const platformKeys = isBulk
    ? Object.keys(posts?.days?.[0]?.posts || {})
    : Object.keys(posts?.posts || posts || {});

  const displayPosts = isBulk
    ? posts?.days?.[0]?.posts || {}
    : posts?.posts || posts || {};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            AI Social Media Posts
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            {data.title || "Social Media Posts"}
          </h1>
          {data.topic && (
            <p className="text-gray-500 text-sm">{data.topic}</p>
          )}
        </div>

        {/* Bulk note */}
        {isBulk && posts?.days?.length > 1 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-sm text-amber-800">
            This is a {posts.days.length}-day content plan. Showing Day 1. Sign in to view all days.
          </div>
        )}

        {/* Platform cards */}
        <div className="space-y-4 mb-10">
          {Object.entries(displayPosts).map(([key, post]) => (
            <PlatformCard key={key} platformKey={key} postData={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#075a01] to-[#0a8f01] rounded-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-xl font-black mb-2">
            Create your own social media posts
          </h2>
          <p className="text-white/80 text-sm mb-5">
            Generate posts for all 8 platforms in seconds. Repurpose, bulk
            create, and schedule — all in one place.
          </p>
          <a
            href="/dashboard/tools/ai-social-media-post-generator"
            className="inline-flex items-center gap-2 bg-white text-[#075a01] font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Try it free
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            Generated with{" "}
            <a
              href="/"
              className="text-[#075a01] font-semibold hover:underline"
            >
              Fancy Digitals
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}