"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, RotateCcw, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "fd_content_calendar_planning_v1";

const INDUSTRIES = [
  "Technology", "SaaS", "E-commerce", "Fashion & Beauty", "Food & Beverage",
  "Health & Wellness", "Fitness", "Finance & Fintech", "Real Estate", "Education",
  "Marketing & Agency", "Consulting", "Legal", "Nonprofit", "Travel & Hospitality",
  "Entertainment", "Media & Publishing", "Manufacturing", "Automotive", "Sports", "General",
];

const TONES = ["Professional", "Casual", "Bold", "Friendly", "Witty", "Inspirational", "Educational", "Luxury"];

const GOALS = [
  "Grow followers and reach",
  "Drive website traffic",
  "Generate leads",
  "Increase sales",
  "Build community engagement",
  "Establish thought leadership",
  "Launch a product",
  "Brand awareness",
];

const PLATFORMS = [
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "twitter", name: "Twitter/X" },
  { id: "facebook", name: "Facebook" },
  { id: "tiktok", name: "TikTok" },
  { id: "youtube", name: "YouTube" },
  { id: "threads", name: "Threads" },
  { id: "pinterest", name: "Pinterest" },
];

const DURATION_PRESETS = [
  { days: 7, label: "1 Week" },
  { days: 14, label: "2 Weeks" },
  { days: 30, label: "1 Month" },
  { days: 60, label: "2 Months" },
  { days: 90, label: "3 Months" },
];

const DEFAULT_FORM = {
  brand_name: "",
  industry: "Technology",
  audience: "",
  tone: "Professional",
  goal: "Grow followers and reach",
  platforms: ["instagram", "linkedin"],
  duration_days: 7,
  start_date: new Date().toISOString().split("T")[0],
  include_hashtags: true,
  include_image_prompts: true,
};

export default function PlanningForm({
  onGenerated,
  isGenerating,
  setIsGenerating,
  atLimit,
  userIsPro,
  maxDays,
  prefillData,
  onPrefillConsumed,
}) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [restored, setRestored] = useState(false);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const isFirstRender = useRef(true);

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

  useEffect(() => {
    if (!prefillData) return;
    setForm((prev) => ({ ...prev, ...prefillData }));
    if (onPrefillConsumed) onPrefillConsumed();
  }, [prefillData]);

  useEffect(() => {
    if (isFirstRender.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const togglePlatform = (id) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(id)
        ? prev.platforms.filter((p) => p !== id)
        : [...prev.platforms, id],
    }));
  };

  const clearForm = () => {
    if (!window.confirm("Clear all inputs?")) return;
    setForm(DEFAULT_FORM);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.brand_name.trim()) {
      setError("Brand name is required.");
      return;
    }
    if (form.platforms.length === 0) {
      setError("Select at least one platform.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai-content-calendar/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode: "planning" }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Generation failed.");
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
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Planning Mode</h2>
        <button
          type="button"
          onClick={clearForm}
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Clear
        </button>
      </div>

      {restored && (
        <div className="bg-[#075a01]/5 border border-[#075a01]/20 rounded-xl px-3 py-2 text-xs text-[#075a01] font-medium">
          Restored from your last session.
        </div>
      )}

      <div>
        <label className={labelClass}>Brand or business name *</label>
        <input
          type="text"
          value={form.brand_name}
          onChange={(e) => update("brand_name", e.target.value)}
          placeholder="e.g. Acme Studio"
          className={inputClass}
        />
      </div>

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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Industry</label>
          <select
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            className={inputClass}
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tone</label>
          <select
            value={form.tone}
            onChange={(e) => update("tone", e.target.value)}
            className={inputClass}
          >
            {TONES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Primary goal</label>
        <select
          value={form.goal}
          onChange={(e) => update("goal", e.target.value)}
          className={inputClass}
        >
          {GOALS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Platforms *</label>
        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map((p) => {
            const isSelected = form.platforms.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePlatform(p.id)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-[#075a01] text-white border-[#075a01]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>Calendar duration</label>
        <div className="grid grid-cols-5 gap-1.5">
          {DURATION_PRESETS.map((d) => {
            const isDisabled = d.days > maxDays;
            const isSelected = form.duration_days === d.days;
            return (
              <button
                key={d.days}
                type="button"
                disabled={isDisabled}
                onClick={() => update("duration_days", d.days)}
                className={`text-[10px] font-bold px-2 py-2 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-[#075a01] text-white border-[#075a01]"
                    : isDisabled
                    ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
                title={isDisabled ? `Upgrade to Pro for ${d.label}` : ""}
              >
                {d.label}
              </button>
            );
          })}
        </div>
        {!userIsPro && (
          <p className="text-[10px] text-gray-400 mt-1.5">
            Free plan: max 7 days · Pro: 90 days · Agency: 365 days
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced((v) => !v)}
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
      >
        {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        Advanced options
      </button>

      {showAdvanced && (
        <div className="space-y-4 pt-1 border-t border-gray-100">
          <div>
            <label className={labelClass}>Start date</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => update("start_date", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={form.include_hashtags}
                onChange={(e) => update("include_hashtags", e.target.checked)}
                className="w-4 h-4 accent-[#075a01]"
              />
              Include hashtags for each post
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={form.include_image_prompts}
                onChange={(e) => update("include_image_prompts", e.target.checked)}
                className="w-4 h-4 accent-[#075a01]"
              />
              Include AI image prompts for each post
            </label>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {(!atLimit || userIsPro) && (
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-60 transition-all text-sm"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Building your calendar... ({form.duration_days} days × {form.platforms.length} platforms)
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Content Calendar
            </>
          )}
        </button>
      )}
    </form>
  );
}