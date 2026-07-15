"use client";

import { useState } from "react";
import { useFormPersist } from "../hooks/useFormPersist";

const INITIAL = { niche: "" };

export default function NicheTab() {
  const [form, setForm, clearForm] = useFormPersist("yt-auditor-niche", INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!form.niche.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tools/youtube-auditor/niche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: form.niche }),
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

  return (
    <div>
      <form
        onSubmit={handleAnalyze}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-gray-900">
            What niche do you want to dominate?
          </label>
          {form.niche && (
            <button
              type="button"
              onClick={clearForm}
              className="text-xs font-semibold text-gray-500 hover:text-red-600"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={form.niche}
            onChange={(e) => setForm({ ...form, niche: e.target.value })}
            placeholder="e.g. AI agencies, productivity, home cooking, crypto trading"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            disabled={loading || !form.niche.trim()}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            {loading ? "Analyzing…" : "Analyze Niche"}
          </button>
        </div>
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>

      {result?.insights && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
              Niche Overview: {result.niche}
            </div>
            <p className="text-gray-800 leading-relaxed">
              {result.insights.nicheOverview}
            </p>
            {result.insights.predictedGrowthDifficulty && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold">
                Difficulty: {result.insights.predictedGrowthDifficulty}
              </div>
            )}
          </div>

          {result.insights.winningPatterns && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="font-bold text-gray-900 mb-4">Winning Patterns</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Title Formats</div>
                  <ul className="space-y-1">
                    {result.insights.winningPatterns.titleFormats?.map((f, i) => (
                      <li key={i} className="text-sm text-gray-800">• {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Video Lengths</div>
                  <div className="text-sm text-gray-800">{result.insights.winningPatterns.videoLengths}</div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Upload Cadence</div>
                  <div className="text-sm text-gray-800">{result.insights.winningPatterns.uploadCadence}</div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Common Hooks</div>
                  <ul className="space-y-1">
                    {result.insights.winningPatterns.commonHooks?.map((h, i) => (
                      <li key={i} className="text-sm text-gray-800">• {h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {result.insights.whiteSpaceTopics?.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6">
              <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">
                💎 White-space Topics (Low competition)
              </div>
              <ul className="space-y-2 mt-3">
                {result.insights.whiteSpaceTopics.map((t, i) => (
                  <li key={i} className="text-sm text-gray-800 p-3 bg-white rounded-lg border border-green-100">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.insights.entryStrategy && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="font-bold text-gray-900 mb-4">Entry Strategy</h4>
              <div className="space-y-3">
                {Object.entries(result.insights.entryStrategy).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-lg bg-gray-50">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {key.replace(/([A-Z])/g, " $1").replace(/^as/, "As")}
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.channels?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="font-bold text-gray-900 mb-3">Top Channels Analyzed</h4>
              <div className="space-y-2">
                {result.channels.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div>
                      <div className="font-semibold text-gray-900">{c.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {fmt(c.subscribers)} subs · {fmt(c.avgViews)} avg views · {c.uploadsPerMonth}/mo
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function fmt(n) {
  if (!n) return "0";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}