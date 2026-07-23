"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, RotateCcw, RefreshCw } from "lucide-react";

const STORAGE_KEY = "fd_content_calendar_campaign_v1";

const CAMPAIGN_TYPES = [
  "Product launch",
  "Service launch",
  "Event promotion",
  "Sale / discount",
  "Webinar",
  "Course launch",
  "Book launch",
  "App launch",
  "Grand opening",
  "Rebrand",
  "Fundraiser",
  "Awareness campaign",
  "Holiday campaign",
  "Other",
];

const TONES = ["Professional", "Casual", "Bold", "Urgent", "Playful", "Luxury", "Inspiring"];

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
];

const DEFAULT_FORM = {
  campaign_type: "Product launch",
  campaign_details: "",
  brand_name: "",
  industry: "",
  audience: "",
  tone: "Bold",
  platforms: ["instagram", "linkedin", "twitter"],
  duration_days: 7,
  start_date: new Date().toISOString().split("T")[0],
  launch_date: "",
};

export default function CampaignForm({
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
  const [error, setError] = useState("");
  const [restored, setRestored] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setForm((prev) => ({ ...prev, ...JSON.parse(saved) }));
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

    if (!form.campaign_details.trim() || form.campaign_details.length < 30) {
      setError("Describe your campaign in at least 30 characters.");
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
        body: JSON.stringify({ ...form, mode: "campaign" }),
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
        <h2 className="text-base font-bold text-gray-900">Campaign Mode</h2>
        <button
          type="button"
          onClick={clearForm}
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
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
        <label className={labelClass}>Campaign type *</label>
        <select
          value={form.campaign_type}
          onChange={(e) => update("campaign_type", e.target.value)}
          className={inputClass}
        >
          {CAMPAIGN_TYPES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>
          Campaign details *{" "}
          <span className="text-gray-400 font-normal">
            ({form.campaign_details.length} chars)
          </span>
        </label>
        <textarea
          value={form.campaign_details}
          onChange={(e) => update("campaign_details", e.target.value)}
          placeholder="e.g. Launching our new AI writing assistant on March 15. Target: freelance writers. Key features: real-time editing, tone matching, unlimited use for $19/mo. Offering 50% off for first 100 signups."
          rows={5}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Brand name</label>
          <input
            type="text"
            value={form.brand_name}
            onChange={(e) => update("brand_name", e.target.value)}
            placeholder="Your brand"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Industry</label>
          <input
            type="text"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            placeholder="e.g. SaaS"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Target audience</label>
          <input
            type="text"
            value={form.audience}
            onChange={(e) => update("audience", e.target.value)}
            placeholder="e.g. Freelance writers"
            className={inputClass}
          />
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Campaign start</label>
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => update("start_date", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Launch date</label>
          <input
            type="date"
            value={form.launch_date}
            onChange={(e) => update("launch_date", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Duration</label>
        <div className="grid grid-cols-3 gap-1.5">
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
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {(!atLimit || userIsPro) && (
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-60 transition-all text-sm"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Building your campaign...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Campaign Calendar
            </>
          )}
        </button>
      )}
    </form>
  );
}