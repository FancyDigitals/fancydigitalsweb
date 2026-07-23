"use client";

import { useState } from "react";
import {
  Instagram, Twitter, Linkedin, Youtube, Facebook,
  Globe, Edit3, Trash2, Clock, Hash, Image, ChevronDown, ChevronUp,
} from "lucide-react";

const PLATFORM_STYLES = {
  instagram: { bg: "bg-pink-50",   text: "text-pink-700",   border: "border-pink-200",   icon: Instagram },
  twitter:   { bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200",    icon: Twitter },
  linkedin:  { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   icon: Linkedin },
  youtube:   { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    icon: Youtube },
  facebook:  { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", icon: Facebook },
  tiktok:    { bg: "bg-gray-50",   text: "text-gray-700",   border: "border-gray-200",   icon: Globe },
};

const STATUS_STYLES = {
  draft:     "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-100 text-blue-700",
  published: "bg-green-100 text-green-700",
};

function PostRow({ post, onEdit, onDelete, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);
  const ps = PLATFORM_STYLES[post.platform] || PLATFORM_STYLES.tiktok;
  const PlatformIcon = ps.icon;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${ps.border} mb-2`}>
      {/* Collapsed header */}
      <div
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${ps.bg} hover:opacity-90 transition`}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Platform badge */}
        <div className={`flex items-center gap-1.5 shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${ps.bg} ${ps.text}`}>
          <PlatformIcon className="h-3.5 w-3.5" />
          <span className="capitalize hidden sm:inline">{post.platform}</span>
        </div>

        {/* Date + day */}
        <div className="shrink-0 text-xs text-gray-500 w-24 hidden sm:block">
          <div className="font-semibold text-gray-700">{post.date || "—"}</div>
          <div>{post.day || ""}</div>
        </div>

        {/* Post type */}
        {post.post_type && (
          <span className="shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold text-gray-600 border border-gray-200 hidden md:inline">
            {post.post_type}
          </span>
        )}

        {/* Hook preview */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {post.hook || post.caption?.slice(0, 80) || "No content"}
          </p>
          {post.pillar && (
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">{post.pillar}</p>
          )}
        </div>

        {/* Status */}
        <select
          value={post.status || "draft"}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onStatusChange(post.id, { status: e.target.value })}
          className={`shrink-0 rounded-lg border-0 px-2 py-1 text-xs font-bold cursor-pointer focus:ring-2 focus:ring-[#075a01]/30 ${
            STATUS_STYLES[post.status || "draft"]
          }`}
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onEdit(post)} className="rounded-lg p-1.5 text-gray-400 hover:text-[#075a01] hover:bg-white transition">
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onDelete(post.id)} className="rounded-lg p-1.5 text-gray-400 hover:text-red-500 hover:bg-white transition">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          {expanded ? <ChevronUp className="h-3.5 w-3.5 text-gray-400" /> : <ChevronDown className="h-3.5 w-3.5 text-gray-400" />}
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 py-4 bg-white space-y-4">
          {/* Caption */}
          {post.caption && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Caption</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.caption}</p>
            </div>
          )}

          {/* CTA */}
          {post.cta && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Call to Action</p>
              <p className="text-sm font-semibold text-[#075a01]">{post.cta}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Hashtags */}
            {post.hashtags?.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Hash className="h-3 w-3 text-gray-400" />
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Hashtags</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.map((tag, i) => (
                    <span key={i} className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${ps.bg} ${ps.text}`}>
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Best time */}
            {post.best_time && (
              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Best Time</p>
                </div>
                <p className="text-sm text-gray-700">{post.best_time}</p>
              </div>
            )}
          </div>

          {/* Image prompt */}
          {post.image_prompt && (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-1 mb-1">
                <Image className="h-3 w-3 text-gray-400" />
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Image Prompt</p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">{post.image_prompt}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ListView({ posts, onEditPost, onDeletePost, onUpdatePost }) {
  // Group by date
  const grouped = posts.reduce((acc, post) => {
    const key = post.date || "Unscheduled";
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <Globe className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-600">No posts yet</p>
        <p className="text-xs text-gray-400 mt-1">Generate a calendar to see posts here</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xs font-black uppercase tracking-wider text-gray-500">{date}</div>
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] font-bold text-gray-400">{grouped[date].length} posts</span>
          </div>
          {grouped[date].map((post) => (
            <PostRow
              key={post.id}
              post={post}
              onEdit={onEditPost}
              onDelete={onDeletePost}
              onStatusChange={onUpdatePost}
            />
          ))}
        </div>
      ))}
    </div>
  );
}