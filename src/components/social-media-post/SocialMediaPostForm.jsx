"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";

const STORAGE_KEY = "fd_social_post_form_v1";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "twitter", label: "Twitter/X", icon: "𝕏" },
  { id: "facebook", label: "Facebook", icon: "👤" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "youtube", label: "YouTube", icon: "▶" },
  { id: "threads", label: "Threads", icon: "🧵" },
  { id: "pinterest", label: "Pinterest", icon: "📌" },
];

const TONES = [
  "Professional",
  "Casual",
  "Friendly",
  "Inspirational",
  "Humorous",
  "Educational",
  "Persuasive",
  "Storytelling",
  "Bold",
];

const GOALS = [
  "Engagement",
  "Brand Awareness",
  "Lead Generation",
  "Product Promotion",
  "Drive Traffic",
  "Community Building",
  "Educate Audience",
  "Announce News",
];

const INDUSTRIES = [
  "General",
  "Technology",
  "E-commerce",
  "Health & Wellness",
  "Finance",
  "Education",
  "Real Estate",
  "Food & Beverage",
  "Fashion & Beauty",
  "Travel & Hospitality",
  "Marketing & Agency",
  "Consulting",
  "Nonprofit",
  "Entertainment",
  "Sports & Fitness",
];

const MODES = [
  { id: "standard", label: "Standard", desc: "Generate posts for selected platforms" },
  { id: "repurpose", label: "Repurpose", desc: "Paste content, adapt for all platforms" },
  { id: "bulk", label: "Bulk (Week)", desc: "Generate 7 days of content at once" },
];

const DEFAULT_FORM = {
  topic: "",
  tone: "Professional",
  audience: "",
  industry: "General",
  goal: "Engagement",
  platforms: ["instagram", "linkedin", "twitter"],
  mode: "standard",
  repurposeContent: "",
  bulkDays: 7,
  includeEmojis: true,
  language: "English",
};

export default function SocialMediaPostForm({
  onGenerated,
  isGenerating,
  setIsGenerating,
  atLimit,
  userIsPro,
  prefillData,
  onPrefillConsumed,
}) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [restored, setRestored] = useState(false);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const isFirstRender = useRef(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...parsed }));
        setRestored(true);
        setTimeout(() => setRestored(false), 3000);
      }
    } catch {}
    isFirstRender.current = false;
  }, []);

  // Apply prefill when received
  useEffect(() => {
    if (!prefillData) return;
    const { _loadedPosts, _loadedId, _loadedTitle, ...formData } = prefillData;
    setForm((prev) => ({ ...prev, ...formData }));
    if (onPrefillConsumed) onPrefillConsumed();
  }, [prefillData]);

  // Auto-save to localStorage
  useEffect(() => {
    if (isFirstRender.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const togglePlatform = (id) => {
    setForm((prev) => {
      const has = prev.platforms.includes(id);
      if (has && prev.platforms.length === 1) return prev; // keep at least one
      return {
        ...prev,
        platforms: has
          ? prev.platforms.filter((p) => p !== id)
          : [...prev.platforms, id],
      };
    });
  };

  const selectAllPlatforms = () =>
    setForm((prev) => ({ ...prev, platforms: PLATFORMS.map((p) => p.id) }));

  const clearForm = () => {
    if (!window.confirm("Clear all inputs? This cannot be undone.")) return;
    setForm(DEFAULT_FORM);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.mode !== "repurpose" && !form.topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    if (form.mode === "repurpose" && !form.repurposeContent.trim()) {
      setError("Please paste the content you want to repurpose.");
      return;
    }
    if (form.platforms.length === 0) {
      setError("Select at least one platform.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/social-media-post/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Generation failed. Please try again.");
        return;
      }

      onGenerated(json.data, json.usage);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#075a01]/30 focus:border-[#075a01] transition-all";
  const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Create Posts</h2>
        <button
          type="button"
          onClick={clearForm}
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Clear
        </button>
      </div>

      {/* Restored banner */}
      {restored && (
        <div className="bg-[#075a01]/5 border border-[#075a01]/20 rounded-xl px-3 py-2 text-xs text-[#075a01] font-medium">
          Restored from your last session.
        </div>
      )}

      {/* Mode selector */}
      <div>
        <label className={labelClass}>Mode</label>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => update("mode", m.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                form.mode === m.id
                  ? "border-[#075a01] bg-[#075a01]/5 ring-1 ring-[#075a01]/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-xs font-semibold text-gray-900">{m.label}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Topic or repurpose content */}
      {form.mode === "repurpose" ? (
        <div>
          <label className={labelClass}>Content to repurpose</label>
          <textarea
            value={form.repurposeContent}
            onChange={(e) => update("repurposeContent", e.target.value)}
            placeholder="Paste your blog post, email, script, or any content here. AI will adapt it for all selected platforms..."
            rows={5}
            className={inputClass}
          />
        </div>
      ) : (
        <div>
          <label className={labelClass}>
            {form.mode === "bulk" ? "Content theme / topic" : "What do you want to post about?"}
          </label>
          <textarea
            value={form.topic}
            onChange={(e) => update("topic", e.target.value)}
            placeholder={
              form.mode === "bulk"
                ? "e.g. Our new product launch for eco-friendly water bottles..."
                : "e.g. Announcing our new AI feature that saves marketers 10 hours a week..."
            }
            rows={3}
            className={inputClass}
          />
        </div>
      )}

      {/* Bulk days */}
      {form.mode === "bulk" && (
        <div>
          <label className={labelClass}>Number of days</label>
          <select
            value={form.bulkDays}
            onChange={(e) => update("bulkDays", Number(e.target.value))}
            className={inputClass}
          >
            {[3, 5, 7, 10, 14].map((d) => (
              <option key={d} value={d}>
                {d} days
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Platform selector */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={labelClass + " mb-0"}>Platforms</label>
          <button
            type="button"
            onClick={selectAllPlatforms}
            className="text-xs text-[#075a01] font-medium hover:underline"
          >
            Select all
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {PLATFORMS.map((p) => {
            const selected = form.platforms.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePlatform(p.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all ${
                  selected
                    ? "border-[#075a01] bg-[#075a01]/5 ring-1 ring-[#075a01]/20"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <span className="text-base leading-none">{p.icon}</span>
                <span className="text-[10px] font-medium text-gray-700 leading-tight">
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tone + Goal */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Tone</label>
          <select
            value={form.tone}
            onChange={(e) => update("tone", e.target.value)}
            className={inputClass}
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Goal</label>
          <select
            value={form.goal}
            onChange={(e) => update("goal", e.target.value)}
            className={inputClass}
          >
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audience */}
      <div>
        <label className={labelClass}>Target audience</label>
        <input
          type="text"
          value={form.audience}
          onChange={(e) => update("audience", e.target.value)}
          placeholder="e.g. Small business owners aged 25-45"
          className={inputClass}
        />
      </div>

      {/* Advanced toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced((v) => !v)}
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
      >
        {showAdvanced ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
        Advanced options
      </button>

      {showAdvanced && (
        <div className="space-y-4 pt-1 border-t border-gray-100">
          <div>
            <label className={labelClass}>Industry</label>
            <select
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
              className={inputClass}
            >
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Language</label>
            <select
              value={form.language}
              onChange={(e) => update("language", e.target.value)}
              className={inputClass}
            >
              {["English", "Spanish", "French", "German", "Portuguese", "Arabic"].map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-700">Include emojis</div>
              <div className="text-[11px] text-gray-500">Platform-appropriate emojis</div>
            </div>
            <button
              type="button"
              onClick={() => update("includeEmojis", !form.includeEmojis)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${
                form.includeEmojis ? "bg-[#075a01]" : "bg-gray-300"
              }`}
              style={{ height: "22px" }}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.includeEmojis ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Upgrade prompt for free users at limit */}
      {atLimit && !userIsPro && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-amber-800 font-medium mb-2">
            Daily limit reached
          </p>
          <p className="text-xs text-amber-700 mb-3">
            Upgrade to Pro for unlimited social media post generation.
          </p>
          <a
            href="/pricing"
            className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-5 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            Upgrade to Pro
          </a>
        </div>
      )}

      {/* Submit */}
      {(!atLimit || userIsPro) && (
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-60 transition-all text-sm"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating posts...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {form.mode === "bulk"
                ? `Generate ${form.bulkDays}-Day Content Plan`
                : form.mode === "repurpose"
                ? "Repurpose for All Platforms"
                : `Generate for ${form.platforms.length} Platform${form.platforms.length > 1 ? "s" : ""}`}
            </>
          )}
        </button>
      )}
    </form>
  );
}