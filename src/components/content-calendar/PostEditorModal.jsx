"use client";

import { useState } from "react";
import { X, Check, Hash, Clock, Image, Sparkles } from "lucide-react";

const PLATFORMS = ["instagram", "twitter", "linkedin", "youtube", "facebook", "tiktok"];
const STATUSES  = ["draft", "scheduled", "published"];

export default function PostEditorModal({ post, onSave, onClose }) {
  const [form, setForm] = useState({
    date:         post.date         || "",
    day:          post.day          || "",
    platform:     post.platform     || "instagram",
    post_type:    post.post_type    || "",
    pillar:       post.pillar       || "",
    hook:         post.hook         || "",
    caption:      post.caption      || "",
    cta:          post.cta          || "",
    hashtags:     (post.hashtags || []).join(" "),
    best_time:    post.best_time    || "",
    status:       post.status       || "draft",
    image_prompt: post.image_prompt || "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    onSave({
      ...form,
      hashtags: form.hashtags
        ? form.hashtags.split(/\s+/).filter(Boolean).map((t) => (t.startsWith("#") ? t : `#${t}`))
        : [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Edit Post</h3>
            <p className="text-xs text-gray-400 mt-0.5">{post.date} · {post.platform}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:bg-[#064c01]"
            >
              <Check className="h-3.5 w-3.5" /> Save
            </button>
            <button onClick={onClose} className="rounded-xl border border-gray-200 p-2 text-gray-400 hover:bg-gray-50">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Row 1: Date, Platform, Status */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="field-label">Date</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                className="field-input" />
            </div>
            <div>
              <label className="field-label">Platform</label>
              <select value={form.platform} onChange={(e) => set("platform", e.target.value)} className="field-input">
                {PLATFORMS.map((p) => <option key={p} value={p} className="capitalize">{p}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className="field-input">
                {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: Type + Pillar */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Post Type</label>
              <input value={form.post_type} onChange={(e) => set("post_type", e.target.value)}
                placeholder="e.g. Reel, Carousel, Story"
                className="field-input" />
            </div>
            <div>
              <label className="field-label">Content Pillar</label>
              <input value={form.pillar} onChange={(e) => set("pillar", e.target.value)}
                placeholder="e.g. Education, Promotion"
                className="field-input" />
            </div>
          </div>

          {/* Hook */}
          <div>
            <label className="field-label">Hook</label>
            <input value={form.hook} onChange={(e) => set("hook", e.target.value)}
              placeholder="Opening line to grab attention"
              className="field-input" />
          </div>

          {/* Caption */}
          <div>
            <label className="field-label">Caption</label>
            <textarea
              value={form.caption}
              onChange={(e) => set("caption", e.target.value)}
              rows={5}
              placeholder="Full post caption..."
              className="field-input resize-none"
            />
          </div>

          {/* CTA */}
          <div>
            <label className="field-label">Call to Action</label>
            <input value={form.cta} onChange={(e) => set("cta", e.target.value)}
              placeholder="e.g. Save this for later!"
              className="field-input" />
          </div>

          {/* Hashtags + Best Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 field-label">
                <Hash className="h-3 w-3" /> Hashtags
              </label>
              <input value={form.hashtags} onChange={(e) => set("hashtags", e.target.value)}
                placeholder="#marketing #brand"
                className="field-input" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 field-label">
                <Clock className="h-3 w-3" /> Best Time to Post
              </label>
              <input value={form.best_time} onChange={(e) => set("best_time", e.target.value)}
                placeholder="e.g. 9:00 AM EST"
                className="field-input" />
            </div>
          </div>

          {/* Image Prompt */}
          <div>
            <label className="flex items-center gap-1.5 field-label">
              <Image className="h-3 w-3" /> Image / Visual Prompt
            </label>
            <textarea
              value={form.image_prompt}
              onChange={(e) => set("image_prompt", e.target.value)}
              rows={2}
              placeholder="Describe the visual for this post..."
              className="field-input resize-none"
            />
          </div>
        </div>
      </div>

      {/* Utility classes via global style tag */}
      <style jsx global>{`
        .field-label {
          display: block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 6px;
        }
        .field-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: white;
          padding: 8px 12px;
          font-size: 13px;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
        }
        .field-input:focus {
          border-color: #075a01;
          box-shadow: 0 0 0 3px rgba(7,90,1,0.08);
        }
      `}</style>
    </div>
  );
}