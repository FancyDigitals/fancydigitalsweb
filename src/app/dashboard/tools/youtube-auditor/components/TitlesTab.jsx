"use client";

import { useState } from "react";
import { useFormPersist } from "../hooks/useFormPersist";
import ThumbnailPreview from "./ThumbnailPreview";

const INITIAL = {
  topic: "",
  niche: "",
  channelName: "",
  style: "professional",
};

export default function TitlesTab({ isPro }) {
  const [form, setForm, clearForm] = useFormPersist("yt-auditor-titles", INITIAL);
  const [generateThumbnails, setGenerateThumbnails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const update = (patch) => setForm({ ...form, ...patch });

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!form.topic.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tools/youtube-auditor/titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          generateThumbnails: generateThumbnails && isPro,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed");
      setResult(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <form
        onSubmit={handleGenerate}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-gray-900">
            What's the video about?
          </label>
          {(form.topic || form.niche || form.channelName) && (
            <button
              type="button"
              onClick={clearForm}
              className="text-xs font-semibold text-gray-500 hover:text-red-600"
            >
              Clear form
            </button>
          )}
        </div>
        <textarea
          value={form.topic}
          onChange={(e) => update({ topic: e.target.value })}
          placeholder="e.g. How I built a $10K/month AI agency in 90 days"
          rows={2}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500 mb-4"
        />

        {/* Stack on mobile, 3-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            value={form.niche}
            onChange={(e) => update({ niche: e.target.value })}
            placeholder="Niche (e.g. AI agency)"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            value={form.channelName}
            onChange={(e) => update({ channelName: e.target.value })}
            placeholder="Your channel name"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500"
          />
          <select
            value={form.style}
            onChange={(e) => update({ style: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500 bg-white"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="controversial">Controversial</option>
            <option value="educational">Educational</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        {/* Generate thumbnails toggle */}
        <div
          onClick={() => isPro && setGenerateThumbnails(!generateThumbnails)}
          className={`mb-4 p-3 rounded-xl border-2 transition ${
            !isPro
              ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
              : generateThumbnails
              ? "border-red-500 bg-red-50/50 cursor-pointer"
              : "border-gray-200 bg-white hover:border-red-300 cursor-pointer"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                generateThumbnails && isPro
                  ? "border-red-600 bg-red-600"
                  : "border-gray-300"
              }`}
            >
              {generateThumbnails && isPro && (
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-bold text-gray-900 text-sm">
                  Generate real thumbnail images
                </div>
                {!isPro && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-white uppercase">
                    Pro
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600 mt-0.5">
                3 vibrant YouTube-optimized thumbnails generated with AI (adds
                ~30s)
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !form.topic.trim()}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          {loading ? "Generating…" : "Generate Titles & Thumbnails"}
        </button>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>

      {result && (
        <div className="space-y-4 sm:space-y-6">
          {/* Titles */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              10 CTR-Optimized Titles
            </h3>
            <div className="space-y-2">
              {result.titles?.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 sm:gap-3 p-3 rounded-lg border border-gray-100 hover:border-red-300 hover:bg-red-50/30 transition group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm sm:text-base break-words">
                      {t.title}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs">
                      <span className="text-gray-500">{t.format}</span>
                      <CtrBadge tier={t.predictedCtrTier} />
                    </div>
                    <div className="text-xs text-gray-600 mt-1 italic">
                      {t.hook}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.title)}
                    className="text-xs font-bold text-gray-500 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100 transition shrink-0"
                    aria-label="Copy title"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Generated thumbnails */}
          {result.generatedThumbnails?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                Generated Thumbnails
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                YouTube-style with person + bold text overlay. Click Download PNG
                to export at 1280×720.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {result.generatedThumbnails.map((item, i) => (
                  <ThumbnailPreview key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Thumbnail descriptions */}
          {result.thumbnailDirections?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Thumbnail Concepts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {result.thumbnailDirections.map((td, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Option {i + 1}
                    </div>
                    <div className="font-bold text-gray-900 mb-3">
                      {td.concept}
                    </div>
                    <div className="mb-3">
                      <div className="text-xs font-bold text-gray-500 mb-1">
                        Elements:
                      </div>
                      <ul className="space-y-1">
                        {td.elements?.map((el, j) => (
                          <li key={j} className="text-xs text-gray-700">
                            <span className="text-gray-400 mr-1">•</span> {el}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-gray-200">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Text overlay
                      </div>
                      <div className="text-base sm:text-lg font-black text-gray-900">
                        {td.textOverlay}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.descriptionTemplate && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  SEO Description
                </h3>
                <button
                  onClick={() => copyToClipboard(result.descriptionTemplate)}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </button>
              </div>
              <pre className="p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-800 whitespace-pre-wrap font-sans overflow-x-auto">
                {result.descriptionTemplate}
              </pre>
            </div>
          )}

          {result.tags?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Tags
                </h3>
                <button
                  onClick={() => copyToClipboard(result.tags.join(", "))}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CtrBadge({ tier }) {
  const styles = {
    high: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
        styles[tier] || styles.medium
      }`}
    >
      {tier} CTR
    </span>
  );
}