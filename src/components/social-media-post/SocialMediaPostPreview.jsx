"use client";

import { useState, useCallback } from "react";
import {
  Copy,
  Check,
  Save,
  Share2,
  Download,
  ChevronDown,
  ChevronUp,
  Clock,
  Hash,
  Zap,
  X,
  ExternalLink,
  ImageIcon,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

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

// ─────────────────────────────────────────────
// Image Brief Card
// ─────────────────────────────────────────────
function ImageBriefCard({ brief }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(brief.ai_prompt || "");
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {}
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-[#075a01]" />
        <span className="text-xs font-bold text-[#075a01] uppercase tracking-widest">
          AI Image Brief
        </span>
      </div>

      <div className="space-y-3">
        {/* Direction + Composition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">
              Image Direction
            </span>
            <p className="text-xs text-gray-700 leading-relaxed">{brief.image_direction}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">
              Composition
            </span>
            <p className="text-xs text-gray-700 leading-relaxed">{brief.composition}</p>
          </div>
        </div>

        {/* Mood + Text Overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">
              Mood / Color
            </span>
            <p className="text-xs text-gray-700 leading-relaxed">{brief.mood}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">
              Text Overlay
            </span>
            <p className="text-xs text-gray-700 leading-relaxed">{brief.text_overlay}</p>
          </div>
        </div>

        {/* Dimensions + Ratio */}
        <div className="flex gap-4 px-1">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-0.5">
              Dimensions
            </span>
            <span className="text-xs font-bold font-mono text-[#075a01]">
              {brief.dimensions}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-0.5">
              Aspect Ratio
            </span>
            <span className="text-xs font-bold font-mono text-[#075a01]">
              {brief.aspect_ratio}
            </span>
          </div>
        </div>

        {/* AI Prompt */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              AI Image Prompt
            </span>
            <span className="text-[10px] text-gray-400">
              Paste into Midjourney, DALL-E, or Canva AI
            </span>
          </div>
          <div className="relative group">
            <p className="text-xs text-gray-600 bg-white border border-gray-200 rounded-xl p-3 italic leading-relaxed pr-10">
              {brief.ai_prompt}
            </p>
            <button
              type="button"
              onClick={copyPrompt}
              className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all"
              title="Copy prompt"
            >
              {copiedPrompt ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Avoid */}
        {brief.avoid && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold">Avoid: </span>
              {brief.avoid}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Single Platform Post Card
// ─────────────────────────────────────────────
function PlatformPost({ platformKey, postData, onEdit, userIsPro }) {
  const meta = PLATFORM_META[platformKey] || {
    label: platformKey,
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
  };

  const [expanded, setExpanded] = useState(true);
  const [activeVariant, setActiveVariant] = useState("main");
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Image brief state
  const [brief, setBrief] = useState(postData.image_brief || null);
  const [loadingBrief, setLoadingBrief] = useState(false);
  const [showBrief, setShowBrief] = useState(false);
  const [briefError, setBriefError] = useState("");

  const currentCaption =
    activeVariant === "main"
      ? postData.main_caption
      : postData.variants?.[activeVariant] || postData.main_caption;

  const charCount = currentCaption?.length || 0;
  const charLimit = postData.char_limit || 999999;
  const charPct = Math.min((charCount / charLimit) * 100, 100);
  const charColor =
    charPct > 90
      ? "text-red-500"
      : charPct > 75
      ? "text-amber-500"
      : "text-gray-400";

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(currentCaption || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const startEdit = (field, value) => {
    setEditing(field);
    setEditValue(value || "");
  };

  const commitEdit = () => {
    if (editing) {
      onEdit(platformKey, editing, editValue);
      setEditing(null);
    }
  };

  const watermarkText = !userIsPro ? "\n\n— Generated with Fancy Digitals" : "";

  // Get image brief on demand
  const handleGetBrief = async () => {
    // If brief already exists just toggle visibility
    if (brief) {
      setShowBrief((v) => !v);
      return;
    }

    setBriefError("");
    setLoadingBrief(true);
    try {
      const res = await fetch("/api/social-media-post/image-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: meta.label,
          caption: currentCaption,
          topic: postData.topic || "",
          tone: postData.tone || "Professional",
          goal: postData.goal || "Engagement",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setBrief(json.data);
        setShowBrief(true);
        // Persist brief into parent post state silently
        onEdit(platformKey, "image_brief", json.data);
      } else {
        setBriefError(json.error || "Failed to generate brief. Try again.");
      }
    } catch {
      setBriefError("Something went wrong. Please try again.");
    } finally {
      setLoadingBrief(false);
    }
  };

  return (
    <div className={`rounded-2xl border ${meta.border} overflow-hidden`}>
      {/* Platform header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 ${meta.bg} transition-colors hover:opacity-90`}
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${meta.text}`}>{meta.label}</span>
          <span className={`text-xs ${meta.text} opacity-70`}>
            {charCount}/{charLimit === 999999 ? "∞" : charLimit}
          </span>
        </div>
        {expanded ? (
          <ChevronUp className={`w-4 h-4 ${meta.text}`} />
        ) : (
          <ChevronDown className={`w-4 h-4 ${meta.text}`} />
        )}
      </button>

      {expanded && (
        <div className="p-4 space-y-4 bg-white">
          {/* Variant tabs */}
          <div className="flex gap-1 flex-wrap">
            {["main", "a", "b", "c"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setActiveVariant(v)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeVariant === v
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {v === "main" ? "Main" : `Variant ${v.toUpperCase()}`}
              </button>
            ))}
          </div>

          {/* Caption */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Caption
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${charColor}`}>
                  {charCount}/{charLimit === 999999 ? "∞" : charLimit}
                </span>
                <button
                  type="button"
                  onClick={copyCaption}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {editing === `caption_${activeVariant}` ? (
              <div className="space-y-2">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 bg-white border border-[#075a01] rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#075a01]/20"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={commitEdit}
                    className="text-xs font-semibold text-white bg-[#075a01] px-3 py-1.5 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="text-xs text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() =>
                  startEdit(
                    `caption_${activeVariant}`,
                    currentCaption + watermarkText
                  )
                }
                className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap cursor-text p-3 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all"
              >
                {currentCaption}
                {!userIsPro && (
                  <span className="block mt-3 text-xs text-gray-400">
                    — Generated with Fancy Digitals
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Hook */}
          {postData.hook && (
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Hook
                </span>
              </div>
              {editing === "hook" ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#075a01] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075a01]/20"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={commitEdit}
                      className="text-xs font-semibold text-white bg-[#075a01] px-3 py-1.5 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="text-xs text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  onClick={() => startEdit("hook", postData.hook)}
                  className="text-sm text-gray-700 italic cursor-text p-2 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all"
                >
                  {postData.hook}
                </p>
              )}
            </div>
          )}

          {/* CTA */}
          {postData.cta && (
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                CTA
              </span>
              {editing === "cta" ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#075a01] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075a01]/20"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={commitEdit}
                      className="text-xs font-semibold text-white bg-[#075a01] px-3 py-1.5 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="text-xs text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  onClick={() => startEdit("cta", postData.cta)}
                  className="text-sm text-[#075a01] font-medium cursor-text p-2 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all"
                >
                  {postData.cta}
                </p>
              )}
            </div>
          )}

          {/* Twitter thread */}
          {platformKey === "twitter" &&
            postData.thread &&
            postData.thread.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                  Thread
                </span>
                <div className="space-y-2">
                  {postData.thread.map((tweet, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-xs text-gray-400 font-bold mt-1 w-4 flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{tweet}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Pinterest pin title */}
          {platformKey === "pinterest" && postData.pin_title && (
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                Pin Title
              </span>
              <p className="text-sm text-gray-800 font-medium">{postData.pin_title}</p>
            </div>
          )}

          {/* Hashtags */}
          {postData.hashtags && postData.hashtags.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Hashtags
                </span>
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
              <span>Best time: {postData.best_time}</span>
            </div>
          )}

          {/* ── Get Image Brief button ── */}
          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleGetBrief}
              disabled={loadingBrief}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all ${
                brief && showBrief
                  ? "bg-[#075a01]/5 border-[#075a01]/30 text-[#075a01]"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#075a01]/40 hover:text-[#075a01] hover:bg-[#075a01]/5"
              } disabled:opacity-60`}
            >
              {loadingBrief ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating image brief...
                </>
              ) : brief && showBrief ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5" />
                  Hide image brief
                </>
              ) : brief ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5" />
                  Show image brief
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5" />
                  Get image brief
                </>
              )}
            </button>

            {/* Brief error */}
            {briefError && (
              <p className="mt-2 text-xs text-red-500 text-center">{briefError}</p>
            )}

            {/* Brief panel */}
            {showBrief && brief && <ImageBriefCard brief={brief} />}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Preview Component
// ─────────────────────────────────────────────
export default function SocialMediaPostPreview({
  data,
  savedId,
  onSaved,
  userIsPro,
  plan,
}) {
  const [posts, setPosts] = useState(() => {
    if (data?.mode === "bulk") return null;
    return data?.posts || data || null;
  });
  const [bulkData, setBulkData] = useState(
    data?.mode === "bulk" ? data : null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [currentId, setCurrentId] = useState(savedId);
  const [activeBulkDay, setActiveBulkDay] = useState(0);

  const currentPosts = bulkData
    ? bulkData.days?.[activeBulkDay]?.posts || {}
    : posts || {};

  const handleEdit = useCallback(
    async (platformKey, field, value) => {
      if (bulkData) {
        setBulkData((prev) => {
          const next = { ...prev };
          const days = [...(next.days || [])];
          const day = { ...days[activeBulkDay] };
          const dayPosts = { ...day.posts };
          const post = { ...dayPosts[platformKey] };

          if (field.startsWith("caption_")) {
            const variant = field.replace("caption_", "");
            if (variant === "main") {
              post.main_caption = value;
            } else {
              post.variants = { ...post.variants, [variant]: value };
            }
          } else {
            post[field] = value;
          }

          dayPosts[platformKey] = post;
          day.posts = dayPosts;
          days[activeBulkDay] = day;
          next.days = days;
          return next;
        });
      } else {
        setPosts((prev) => {
          const next = { ...prev };
          const post = { ...next[platformKey] };

          if (field.startsWith("caption_")) {
            const variant = field.replace("caption_", "");
            if (variant === "main") {
              post.main_caption = value;
            } else {
              post.variants = { ...post.variants, [variant]: value };
            }
          } else {
            post[field] = value;
          }

          next[platformKey] = post;
          return next;
        });
      }

      // Silent auto-save
      if (currentId) {
        try {
          await fetch("/api/social-media-post/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: currentId,
              posts: bulkData || posts,
            }),
          });
        } catch {}
      }
    },
    [currentId, bulkData, posts, activeBulkDay]
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/social-media-post/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentId,
          title: `Social posts — ${data?.topic || new Date().toLocaleDateString()}`,
          platforms: Object.keys(currentPosts),
          topic: data?.topic || "",
          tone: "",
          audience: "",
          input_data: data || {},
          posts: bulkData || posts,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCurrentId(json.data.id);
        onSaved?.(json.data.id);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {}
    setIsSaving(false);
  };

  const handleShare = async () => {
    if (!currentId) await handleSave();
    setIsSharing(true);
    try {
      const res = await fetch("/api/social-media-post/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentId }),
      });
      const json = await res.json();
      if (json.success) {
        setShareUrl(json.shareUrl);
        setShowShareModal(true);
      }
    } catch {}
    setIsSharing(false);
  };

  const copyAll = async () => {
    const allText = Object.keys(currentPosts)
      .map((key) => {
        const meta = PLATFORM_META[key];
        const post = currentPosts[key];
        return `=== ${meta?.label || key} ===\n${post.main_caption}\n\nHashtags: ${(
          post.hashtags || []
        )
          .map((h) => "#" + h.replace(/^#/, ""))
          .join(" ")}`;
      })
      .join("\n\n---\n\n");

    try {
      await navigator.clipboard.writeText(allText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {}
  };

  const exportCSV = () => {
    try {
      const rows = [
        [
          "Platform",
          "Caption",
          "Hook",
          "CTA",
          "Hashtags",
          "Best Time",
          "Variant A",
          "Variant B",
          "Variant C",
        ],
      ];

      const addPosts = (postsObj, dayLabel = "") => {
        Object.entries(postsObj).forEach(([key, post]) => {
          const meta = PLATFORM_META[key];
          rows.push([
            dayLabel ? `${meta?.label || key} (${dayLabel})` : meta?.label || key,
            post.main_caption || "",
            post.hook || "",
            post.cta || "",
            (post.hashtags || [])
              .map((h) => "#" + h.replace(/^#/, ""))
              .join(" "),
            post.best_time || "",
            post.variants?.a || "",
            post.variants?.b || "",
            post.variants?.c || "",
          ]);
        });
      };

      if (bulkData?.days) {
        bulkData.days.forEach((day) => addPosts(day.posts, day.date_label));
      } else {
        addPosts(currentPosts);
      }

      const csv = rows
        .map((row) =>
          row
            .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `social-posts-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  };

  const platformKeys = Object.keys(currentPosts);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex-wrap">
        <span className="text-sm font-semibold text-gray-800">
          Generated Posts
          {bulkData && (
            <span className="ml-2 text-xs font-normal text-gray-500">
              {bulkData.days?.length}-day plan
            </span>
          )}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={copyAll}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
          >
            {copiedAll ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            Copy all
          </button>
          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            CSV
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-1.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-60"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                {isSaving ? "Saving..." : "Save"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bulk day tabs */}
      {bulkData?.days && (
        <div className="flex gap-1 px-4 py-3 border-b border-gray-100 overflow-x-auto">
          {bulkData.days.map((day, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveBulkDay(i)}
              className={`flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeBulkDay === i
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {day.date_label}
            </button>
          ))}
        </div>
      )}

      {/* Platform post cards */}
      <div className="p-4 sm:p-5 space-y-4 max-h-[800px] overflow-y-auto">
        {platformKeys.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No posts generated yet.
          </div>
        ) : (
          platformKeys.map((key) => (
            <PlatformPost
              key={key}
              platformKey={key}
              postData={currentPosts[key]}
              onEdit={handleEdit}
              userIsPro={userIsPro}
            />
          ))
        )}
      </div>

      {/* Free watermark notice */}
      {!userIsPro && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-center">
          <p className="text-xs text-gray-400">
            Free plan includes watermark.{" "}
            <a
              href="/pricing"
              className="text-[#075a01] font-semibold hover:underline"
            >
              Upgrade to Pro
            </a>{" "}
            for clean white-label output.
          </p>
        </div>
      )}

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">
                Share your posts
              </h3>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Anyone with this link can view your posts.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(shareUrl);
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#075a01] px-4 py-2 rounded-xl hover:opacity-90 transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-3 text-sm text-[#075a01] font-medium hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </a>
          </div>
        </div>
      )}
    </div>
  );
}