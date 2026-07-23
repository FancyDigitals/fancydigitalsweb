"use client";

import { Edit3, Trash2 } from "lucide-react";

const COLUMNS = [
  { id: "draft",     label: "Draft",     color: "bg-gray-100 text-gray-700",   border: "border-gray-200" },
  { id: "scheduled", label: "Scheduled", color: "bg-blue-100 text-blue-700",   border: "border-blue-200" },
  { id: "published", label: "Published", color: "bg-green-100 text-green-700", border: "border-green-200" },
];

const PLATFORM_DOTS = {
  instagram: "bg-pink-500",
  twitter:   "bg-sky-500",
  linkedin:  "bg-blue-600",
  youtube:   "bg-red-500",
  facebook:  "bg-indigo-500",
  tiktok:    "bg-gray-700",
};

function KanbanCard({ post, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition group">
      {/* Platform + date */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${PLATFORM_DOTS[post.platform] || "bg-gray-400"}`} />
          <span className="text-[10px] font-bold capitalize text-gray-500">{post.platform}</span>
        </div>
        <span className="text-[10px] text-gray-400">{post.date || "—"}</span>
      </div>

      {/* Post type */}
      {post.post_type && (
        <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-bold text-gray-600 mb-1.5">
          {post.post_type}
        </span>
      )}

      {/* Hook */}
      <p className="text-xs font-semibold text-gray-800 leading-snug mb-1 line-clamp-2">
        {post.hook || post.caption?.slice(0, 80) || "No content"}
      </p>

      {/* Pillar */}
      {post.pillar && (
        <p className="text-[10px] text-gray-400 mb-2 truncate">{post.pillar}</p>
      )}

      {/* Status + actions */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <select
          value={post.status || "draft"}
          onChange={(e) => onStatusChange(post.id, { status: e.target.value })}
          className="text-[10px] font-bold rounded-lg border-0 bg-transparent text-gray-500 focus:ring-1 focus:ring-[#075a01]/30 cursor-pointer"
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button onClick={() => onEdit(post)} className="rounded-lg p-1 text-gray-400 hover:text-[#075a01] hover:bg-gray-50">
            <Edit3 className="h-3 w-3" />
          </button>
          <button onClick={() => onDelete(post.id)} className="rounded-lg p-1 text-gray-400 hover:text-red-500 hover:bg-gray-50">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KanbanView({ posts, onEditPost, onDeletePost, onUpdatePost }) {
  const grouped = COLUMNS.reduce((acc, col) => {
    acc[col.id] = posts.filter((p) => (p.status || "draft") === col.id);
    return acc;
  }, {});

  return (
    <div className="p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.id}>
            {/* Column header */}
            <div className={`flex items-center justify-between rounded-xl px-3 py-2 mb-3 ${col.color} border ${col.border}`}>
              <span className="text-xs font-black uppercase tracking-wider">{col.label}</span>
              <span className="text-xs font-bold opacity-70">{grouped[col.id].length}</span>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {grouped[col.id].length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 py-6 text-center">
                  <p className="text-[10px] text-gray-400">No {col.label.toLowerCase()} posts</p>
                </div>
              ) : (
                grouped[col.id].map((post) => (
                  <KanbanCard
                    key={post.id}
                    post={post}
                    onEdit={onEditPost}
                    onDelete={onDeletePost}
                    onStatusChange={onUpdatePost}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}