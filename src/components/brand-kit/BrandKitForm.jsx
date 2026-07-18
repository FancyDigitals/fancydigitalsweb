"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, RotateCcw, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "fd_brand_kit_form_v1";

const INDUSTRIES = [
  "Technology",
  "SaaS",
  "E-commerce",
  "Fashion & Beauty",
  "Food & Beverage",
  "Health & Wellness",
  "Fitness",
  "Finance & Fintech",
  "Real Estate",
  "Education",
  "Marketing & Agency",
  "Consulting",
  "Legal",
  "Nonprofit",
  "Travel & Hospitality",
  "Entertainment",
  "Media & Publishing",
  "Manufacturing",
  "Automotive",
  "Sports",
  "General",
];

const STYLES = [
  "Minimal",
  "Bold",
  "Luxury",
  "Tech",
  "Organic",
  "Playful",
  "Corporate",
  "Editorial",
  "Retro",
  "Futuristic",
];

const LOGO_PREFERENCES = [
  "Wordmark",
  "Icon + Text",
  "Monogram",
  "Abstract",
  "Combination Mark",
];

const PERSONALITY_TRAITS = [
  { key: "modernity", left: "Classic", right: "Modern" },
  { key: "energy", left: "Serious", right: "Playful" },
  { key: "boldness", left: "Elegant", right: "Bold" },
  { key: "formality", left: "Casual", right: "Formal" },
  { key: "warmth", left: "Cool", right: "Warm" },
];

const DEFAULT_FORM = {
  business_name: "",
  tagline: "",
  industry: "Technology",
  style: "Modern",
  logo_preference: "Combination Mark",
  audience: "",
  preferred_color: "",
  description: "",
  personality: {
    modernity: 7,
    energy: 5,
    boldness: 6,
    formality: 5,
    warmth: 6,
  },
};

export default function BrandKitForm({
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({
          ...prev,
          ...parsed,
          personality: { ...prev.personality, ...(parsed.personality || {}) },
        }));
        setRestored(true);
        setTimeout(() => setRestored(false), 3000);
      }
    } catch {}
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    if (!prefillData) return;
    const { _loadedKit, _loadedId, ...formData } = prefillData;
    setForm((prev) => ({
      ...prev,
      ...formData,
      personality: {
        ...prev.personality,
        ...(formData.personality || {}),
      },
    }));
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

  const updatePersonality = (key, value) =>
    setForm((prev) => ({
      ...prev,
      personality: { ...prev.personality, [key]: value },
    }));

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

    if (!form.business_name.trim()) {
      setError("Business name is required.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/brand-kit/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
        <h2 className="text-base font-bold text-gray-900">Create Brand Kit</h2>
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
        <label className={labelClass}>Business name *</label>
        <input
          type="text"
          value={form.business_name}
          onChange={(e) => update("business_name", e.target.value)}
          placeholder="e.g. Acme Studio"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Tagline (optional)</label>
        <input
          type="text"
          value={form.tagline}
          onChange={(e) => update("tagline", e.target.value)}
          placeholder="Leave blank to let AI generate one"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>What does the business do?</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="e.g. AI-powered project management software for creative teams..."
          rows={3}
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
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Style</label>
          <select
            value={form.style}
            onChange={(e) => update("style", e.target.value)}
            className={inputClass}
          >
            {STYLES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Brand personality</label>
        <div className="space-y-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
          {PERSONALITY_TRAITS.map((trait) => (
            <div key={trait.key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-500 font-medium">{trait.left}</span>
                <span className="text-[10px] text-gray-500 font-medium">{trait.right}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={form.personality[trait.key]}
                onChange={(e) =>
                  updatePersonality(trait.key, Number(e.target.value))
                }
                className="w-full accent-[#075a01]"
              />
            </div>
          ))}
        </div>
      </div>

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
            <label className={labelClass}>Target audience</label>
            <input
              type="text"
              value={form.audience}
              onChange={(e) => update("audience", e.target.value)}
              placeholder="e.g. Small business owners aged 25-45"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Preferred color direction (optional)</label>
            <input
              type="text"
              value={form.preferred_color}
              onChange={(e) => update("preferred_color", e.target.value)}
              placeholder="e.g. earthy greens, or leave blank for AI"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Logo preference</label>
            <select
              value={form.logo_preference}
              onChange={(e) => update("logo_preference", e.target.value)}
              className={inputClass}
            >
              {LOGO_PREFERENCES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {atLimit && !userIsPro && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-amber-800 font-medium mb-2">
            Daily limit reached
          </p>
          <p className="text-xs text-amber-700 mb-3">
            Upgrade to Pro for unlimited brand kits + full ZIP downloads.
          </p>
          <a
            href="/pricing"
            className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-5 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            Upgrade to Pro
          </a>
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
              Building your brand identity...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Complete Brand Kit
            </>
          )}
        </button>
      )}
    </form>
  );
}