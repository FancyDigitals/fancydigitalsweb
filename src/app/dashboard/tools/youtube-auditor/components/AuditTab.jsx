"use client";

import { useState } from "react";
import { useFormPersist } from "../hooks/useFormPersist";
import AuditReport from "./AuditReport";
import CompetitorSuggestions from "./CompetitorSuggestions";
import AuditChat from "./AuditChat";

const INITIAL = { channelUrl: "" };

export default function AuditTab({ isPro }) {
  const [form, setForm, clearForm] = useFormPersist("yt-auditor-audit", INITIAL);

  const [loadingData, setLoadingData] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showCompetitors, setShowCompetitors] = useState(false);

  // STEP 1
  const handleAudit = async (e) => {
    e?.preventDefault();
    if (!form.channelUrl.trim()) return;
    setLoadingData(true);
    setError("");
    setResult(null);
    setShowCompetitors(false);

    try {
      const res = await fetch("/api/tools/youtube-auditor/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelUrl: form.channelUrl,
          generateInsights: false,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Audit failed");
      setResult(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingData(false);
    }
  };

  // STEP 2 — merge insights into result so AuditReport re-renders
  const handleGenerateInsights = async () => {
    if (!form.channelUrl.trim()) return;
    setLoadingInsights(true);
    setError("");

    try {
      const res = await fetch("/api/tools/youtube-auditor/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelUrl: form.channelUrl,
          generateInsights: true,
          skipSave: true,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Insights failed");

      // MERGE insights into result
      setResult((prev) => ({
        ...prev,
        insights: json.insights,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingInsights(false);
    }
  };

  const hasInsights = !!result?.insights;

  return (
    <div>
      <form
        onSubmit={handleAudit}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6"
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

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={form.channelUrl}
            onChange={(e) => setForm({ ...form, channelUrl: e.target.value })}
            placeholder="https://youtube.com/@mkbhd  or  @mkbhd"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
            disabled={loadingData}
          />
          <button
            type="submit"
            disabled={loadingData || !form.channelUrl.trim()}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition whitespace-nowrap"
          >
            {loadingData ? "Fetching…" : "Audit Channel"}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Works with any channel URL, @handle, custom URL, or video URL.
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>

      {loadingData && <DataLoadingState />}

      {result && !loadingData && (
        <>
          <AuditReport result={result} />

          {hasInsights && (
  <div className="mt-4 sm:mt-6">
    <AuditChat auditData={result} isPro={isPro} />
  </div>
)}

          {/* STEP 2 CTA — only show if no insights yet */}
          {!hasInsights && (
            <div className="mt-4 sm:mt-6 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Generate AI Growth Insights
                  </h3>
                  <p className="text-sm text-gray-600">
                    Deep strategic analysis, action plan, and monetization roadmap
                    based on this channel's real data.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Takes 30-60 seconds — runs separately so it never times out.
                  </p>
                </div>
                <button
                  onClick={handleGenerateInsights}
                  disabled={loadingInsights}
                  className="w-full sm:w-auto shrink-0 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition whitespace-nowrap"
                >
                  {loadingInsights ? "Generating…" : "Generate Insights"}
                </button>
              </div>

              {loadingInsights && (
                <div className="mt-6">
                  <InsightsLoadingState />
                </div>
              )}
            </div>
          )}

          {/* FIND COMPETITORS */}
          <div className="mt-4 sm:mt-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Find competitors automatically
                </h3>
                <p className="text-sm text-gray-700">
                  We'll analyze this channel's niche and suggest 3-5 real
                  competitors from YouTube. One-click compare.
                </p>
              </div>
              {isPro ? (
                <button
                  onClick={() => setShowCompetitors(true)}
                  className="w-full sm:w-auto shrink-0 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm whitespace-nowrap"
                >
                  Find Competitors
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold">
                  Pro Feature
                </div>
              )}
            </div>

            {showCompetitors && isPro && (
              <div className="mt-4 sm:mt-6">
                <CompetitorSuggestions channelUrl={form.channelUrl} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function DataLoadingState() {
  const steps = [
    "Resolving channel",
    "Fetching last 50 videos",
    "Analyzing metrics",
    "Calculating monetization gap",
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full border-4 border-red-200 border-t-red-600 animate-spin shrink-0" />
        <div className="text-base font-bold text-gray-900">
          Fetching channel data…
        </div>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            {step}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">
        Usually completes in 3-8 seconds.
      </p>
    </div>
  );
}

function InsightsLoadingState() {
  const steps = [
    "Reading channel metrics",
    "Analyzing content patterns",
    "Building growth strategy",
    "Writing action plan",
    "Calculating monetization roadmap",
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-5 h-5 rounded-full border-3 border-gray-300 border-t-gray-900 animate-spin shrink-0" />
        <span className="text-sm font-semibold text-gray-700">
          AI is analyzing this channel…
        </span>
      </div>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
          {step}
        </div>
      ))}
      <p className="text-xs text-gray-400 mt-3">
        Takes 30-60 seconds. Do not close this tab.
      </p>
    </div>
  );
}