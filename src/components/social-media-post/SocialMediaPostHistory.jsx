"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Trash2,
  FileText,
  Copy,
  RefreshCw,
  Instagram,
} from "lucide-react";

const PLATFORM_LABELS = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "Twitter/X",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  threads: "Threads",
  pinterest: "Pinterest",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SocialMediaPostHistory({ onLoad, onUseAsTemplate }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/social-media-post/history");
      const json = await res.json();
      if (json.success) {
        setHistory(json.data || []);
      } else {
        setError("Failed to load history.");
      }
    } catch {
      setError("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this post set? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await fetch(`/api/social-media-post/history?id=${id}`, {
        method: "DELETE",
      });
      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch {
      setError("Failed to delete.");
    } finally {
      setDeleting(null);
    }
  };

  const handleLoad = async (item) => {
    try {
      const res = await fetch(`/api/social-media-post/load?id=${item.id}`);
      const json = await res.json();
      if (json.success) {
        onLoad(json.data);
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        <span className="text-sm">Loading your posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchHistory}
          className="text-sm text-[#075a01] underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <FileText className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          No saved posts yet
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Generate your first social media posts and save them here. They'll
          appear here for easy access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">
          My Posts ({history.length})
        </h2>
        <button
          onClick={fetchHistory}
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-[#075a01]/30 hover:shadow-sm transition-all group cursor-pointer"
            onClick={() => handleLoad(item)}
          >
            {/* Icon + title */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#0a8f01]/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-[#075a01]" />
              </div>
              <button
                type="button"
                onClick={(e) => handleDelete(item.id, e)}
                disabled={deleting === item.id}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all p-1 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
              {item.title || "Social Posts"}
            </h3>

            {item.topic && (
              <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                {item.topic}
              </p>
            )}

            {/* Platforms */}
            {item.platforms && item.platforms.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {item.platforms.slice(0, 4).map((p) => (
                  <span
                    key={p}
                    className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-md"
                  >
                    {PLATFORM_LABELS[p] || p}
                  </span>
                ))}
                {item.platforms.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded-md">
                    +{item.platforms.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {formatDate(item.updated_at || item.created_at)}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUseAsTemplate(item);
                }}
                className="text-xs text-[#075a01] font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Use as template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}