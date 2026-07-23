"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Save, Share2, Download, Check, X,
  Calendar as CalendarIcon, LayoutList, LayoutGrid, KanbanSquare,
  Copy, RefreshCw, Sparkles,
} from "lucide-react";
import MonthView from "./views/MonthView";
import WeekView from "./views/WeekView";
import ListView from "./views/ListView";
import KanbanView from "./views/KanbanView";
import PostEditorModal from "./PostEditorModal";
import { PLATFORMS } from "@/lib/content-calendar/agents";

const VIEWS = [
  { id: "month",  label: "Month",  icon: CalendarIcon },
  { id: "week",   label: "Week",   icon: LayoutGrid },
  { id: "list",   label: "List",   icon: LayoutList },
  { id: "kanban", label: "Kanban", icon: KanbanSquare },
];

/* ─── Share Modal ─────────────────────────────────────────── */
function ShareModal({ shareUrl, onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Share Calendar</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm text-gray-500">Anyone with this link can view your calendar.</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 font-mono"
            />
            <button
              onClick={copy}
              className="flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#064c01] shrink-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Workspace ──────────────────────────────────────── */
export default function ContentCalendarWorkspace({ data, savedId, onSaved, userIsPro, isAgency }) {
  const [calendar, setCalendar]       = useState(data || {});
  const [currentId, setCurrentId]     = useState(savedId);
  const [activeView, setActiveView]   = useState("list");
  const [editingPost, setEditingPost] = useState(null);

  const [isSaving, setIsSaving]       = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSharing, setIsSharing]     = useState(false);
  const [shareUrl, setShareUrl]       = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => setCalendar(data || {}), [data]);
  useEffect(() => setCurrentId(savedId), [savedId]);

  const posts = calendar.posts || [];

  /* ── Persist helper ── */
  const persist = useCallback(async (newPosts, newCalendar) => {
    if (!currentId) return;
    try {
      await fetch("/api/ai-content-calendar/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentId,
          title: newCalendar.title || newCalendar.brand_name || "Content Calendar",
          brand_name: newCalendar.brand_name,
          mode: newCalendar.mode,
          industry: newCalendar.industry,
          audience: newCalendar.audience,
          tone: newCalendar.tone,
          goal: newCalendar.goal,
          platforms: newCalendar.platforms || [],
          start_date: newCalendar.start_date,
          duration_days: newCalendar.duration_days,
          input_data: newCalendar,
          posts: newPosts,
        }),
      });
    } catch {}
  }, [currentId]);

  /* ── Update post ── */
  const updatePost = useCallback(async (postId, updates) => {
    const newPosts   = posts.map((p) => (p.id === postId ? { ...p, ...updates } : p));
    const newCalendar = { ...calendar, posts: newPosts };
    setCalendar(newCalendar);
    await persist(newPosts, newCalendar);
  }, [calendar, posts, persist]);

  /* ── Delete post ── */
  const deletePost = useCallback(async (postId) => {
    if (!window.confirm("Delete this post from the calendar?")) return;
    const newPosts    = posts.filter((p) => p.id !== postId);
    const newCalendar = { ...calendar, posts: newPosts };
    setCalendar(newCalendar);
    await persist(newPosts, newCalendar);
  }, [calendar, posts, persist]);

  /* ── Save ── */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/ai-content-calendar/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentId,
          title: calendar.title || calendar.brand_name || "Content Calendar",
          brand_name: calendar.brand_name,
          mode: calendar.mode,
          industry: calendar.industry,
          audience: calendar.audience,
          tone: calendar.tone,
          goal: calendar.goal,
          platforms: calendar.platforms || [],
          start_date: calendar.start_date,
          duration_days: calendar.duration_days,
          input_data: calendar,
          posts,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCurrentId(json.data.id);
        onSaved?.(json.data.id);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      }
    } catch {}
    setIsSaving(false);
  };

  /* ── Share ── */
  const handleShare = async () => {
    if (!currentId) await handleSave();
    setIsSharing(true);
    try {
      const res = await fetch("/api/ai-content-calendar/share", {
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

  /* ── CSV Export (Pro) ── */
  const handleCSVExport = () => {
    if (!userIsPro) { window.location.href = "/pricing"; return; }

    const rows = [[
      "Date","Day","Platform","Type","Pillar","Hook","Caption",
      "CTA","Hashtags","Best Time","Status","Image Prompt",
    ]];

    posts.forEach((p) => {
      rows.push([
        p.date || "", p.day || "",
        PLATFORMS[p.platform]?.name || p.platform,
        p.post_type || "", p.pillar || "", p.hook || "",
        (p.caption || "").replace(/\n/g, " "),
        p.cta || "", (p.hashtags || []).join(" "),
        p.best_time || "", p.status || "draft",
        p.image_prompt || "",
      ]);
    });

    const csv  = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${(calendar.brand_name || "calendar").toLowerCase().replace(/\s+/g, "-")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* ── View renderer ── */
  const renderView = () => {
    const viewProps = { posts, onEditPost: setEditingPost, onDeletePost: deletePost, onUpdatePost: updatePost };
    switch (activeView) {
      case "month":  return <MonthView  {...viewProps} startDate={calendar.start_date} durationDays={calendar.duration_days} />;
      case "week":   return <WeekView   {...viewProps} startDate={calendar.start_date} />;
      case "kanban": return <KanbanView {...viewProps} />;
      default:       return <ListView   {...viewProps} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-2 px-4 sm:px-5 py-3.5 border-b border-gray-100 bg-gray-50">
        {/* Meta */}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-gray-800 truncate">
            {calendar.brand_name || "Content Calendar"}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {posts.length} posts · {calendar.duration_days}d · {(calendar.platforms || []).length} platforms
          </div>
        </div>

        {/* View switcher */}
        <div className="flex items-center rounded-xl border border-gray-200 bg-white p-0.5 gap-0.5">
          {VIEWS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeView === id
                  ? "bg-[#075a01] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* CSV — Pro badge if free */}
          <button
            onClick={handleCSVExport}
            title={userIsPro ? "Export CSV" : "Pro feature"}
            className="relative flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">CSV</span>
            {!userIsPro && (
              <span className="absolute -top-1.5 -right-1.5 rounded-full bg-amber-400 px-1 text-[9px] font-black text-white">
                PRO
              </span>
            )}
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : saveSuccess ? (
              <Check className="h-3.5 w-3.5 text-[#075a01]" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{saveSuccess ? "Saved!" : "Save"}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-2 text-xs font-bold text-white hover:from-[#064c01] hover:to-[#087a01] transition disabled:opacity-60"
          >
            {isSharing ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* ── Calendar view ── */}
      <div className="min-h-[400px]">
        {renderView()}
      </div>

      {/* ── Watermark — hidden for Agency ── */}
      {!isAgency && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-center">
          <p className="text-xs text-gray-400">
            Generated with{" "}
            <span className="font-bold text-[#075a01]">Fancy Digitals</span>{" "}
            AI Content Calendar
          </p>
        </div>
      )}

      {/* ── Modals ── */}
      {editingPost && (
        <PostEditorModal
          post={editingPost}
          onSave={(updates) => { updatePost(editingPost.id, updates); setEditingPost(null); }}
          onClose={() => setEditingPost(null)}
        />
      )}
      {showShareModal && (
        <ShareModal shareUrl={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}