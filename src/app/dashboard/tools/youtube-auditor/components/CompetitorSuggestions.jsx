"use client";

import { useEffect, useState } from "react";

export default function CompetitorSuggestions({ channelUrl }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [comparing, setComparing] = useState(false);
  const [compareResult, setCompareResult] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/tools/youtube-auditor/find-competitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channelUrl }),
        });
        const json = await res.json();
        if (cancelled) return;
        if (!json.success) throw new Error(json.error || "Failed");
        setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [channelUrl]);

  const toggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  };

  const compare = async () => {
    if (selected.length === 0 || !data) return;
    setComparing(true);
    setCompareResult(null);
    try {
      const competitorUrls = selected
        .map((id) => data.competitors.find((c) => c.id === id)?.url)
        .filter(Boolean);

      const res = await fetch("/api/tools/youtube-auditor/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          myChannel: channelUrl,
          competitors: competitorUrls,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setCompareResult(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setComparing(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-sm text-gray-600">
        <div className="inline-block w-5 h-5 rounded-full border-2 border-red-200 border-t-red-600 animate-spin mr-2 align-middle" />
        Analyzing niche and finding real competitors from YouTube...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!data || !data.competitors?.length) return null;

  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
        Suggested competitors (select up to 3)
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.competitors.map((c) => {
          const isSelected = selected.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition ${
                isSelected
                  ? "border-red-500 bg-red-50/50"
                  : "border-gray-200 bg-white hover:border-red-300"
              }`}
            >
              {c.thumbnail && (
                <img
                  src={c.thumbnail}
                  alt=""
                  className="w-11 h-11 rounded-full flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm truncate">
                  {c.title}
                </div>
                <div className="text-xs text-gray-500">
                  {fmt(c.subscribers)} subs · {fmt(c.videoCount)} videos
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  isSelected ? "border-red-600 bg-red-600" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <button
          onClick={compare}
          disabled={comparing}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition text-sm"
        >
          {comparing
            ? `Comparing ${selected.length} competitor${selected.length > 1 ? "s" : ""}…`
            : `Compare ${selected.length} Selected`}
        </button>
      )}

      {compareResult && (
        <div className="mt-6 text-sm text-gray-700">
          ✅ Comparison complete. Switch to the <strong>Compare Competitors</strong> tab to view full details, or scroll below.
          <div className="mt-3 text-xs text-gray-500">
            {compareResult.insights?.verdict}
          </div>
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