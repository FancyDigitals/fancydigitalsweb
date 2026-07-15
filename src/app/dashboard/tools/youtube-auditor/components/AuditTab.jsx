"use client";

import { useState } from "react";
import { useFormPersist } from "../hooks/useFormPersist";
import AuditReport from "./AuditReport";
import CompetitorSuggestions from "./CompetitorSuggestions";

const INITIAL = { channelUrl: "" };

export default function AuditTab({ isPro }) {
  const [form, setForm, clearForm] = useFormPersist("yt-auditor-audit", INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showCompetitors, setShowCompetitors] = useState(false);

  const handleAudit = async (e) => {
    e?.preventDefault();
    if (!form.channelUrl.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setShowCompetitors(false);

    try {
      const res = await fetch("/api/tools/youtube-auditor/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl: form.channelUrl }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Audit failed");
      setResult(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ===== INPUT ===== */}
      <form
        onSubmit={handleAudit}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-gray-900">
            Paste YouTube channel URL or @handle
          </label>
          {form.channelUrl && (
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
            value={form.channelUrl}
            onChange={(e) => setForm({ ...form, channelUrl: e.target.value })}
            placeholder="https://youtube.com/@mkbhd  or  @mkbhd"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !form.channelUrl.trim()}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            {loading ? "Analyzing…" : "Audit Channel"}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Works with any channel URL, @handle, custom URL, or video URL. Form auto-saves.
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>

      {loading && <AuditLoadingState />}

      {result && !loading && (
        <>
          <AuditReport result={result} />

          {/* Find competitors CTA */}
          <div className="mt-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  🎯 Find competitors automatically
                </h3>
                <p className="text-sm text-gray-700">
                  We'll analyze this channel's niche and suggest 3-5 real competitors from YouTube. One-click compare.
                </p>
              </div>
              {isPro ? (
                <button
                  onClick={() => setShowCompetitors(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm whitespace-nowrap"
                >
                  Find Competitors
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold">
                  🔒 Pro Feature
                </div>
              )}
            </div>

            {showCompetitors && isPro && (
              <div className="mt-6">
                <CompetitorSuggestions channelUrl={form.channelUrl} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function AuditLoadingState() {
  const steps = [
    "Resolving channel",
    "Fetching last 50 videos",
    "Analyzing metrics",
    "Calculating monetization gap",
    "Generating deep insights",
    "Building action plan",
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full border-4 border-red-200 border-t-red-600 animate-spin" />
        <div className="text-lg font-bold text-gray-900">
          Auditing channel...
        </div>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            {step}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-500">
        Deep audits take 30-90 seconds. We're pulling real YouTube data + generating strategic insights.
      </p>
    </div>
  );
}