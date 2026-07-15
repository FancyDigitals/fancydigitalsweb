"use client";

import { useState } from "react";
import { useFormPersist } from "../hooks/useFormPersist";

const INITIAL = { myChannel: "", competitors: ["", "", ""] };

export default function CompareTab() {
  const [form, setForm, clearForm] = useFormPersist("yt-auditor-compare", INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCompare = async (e) => {
    e?.preventDefault();
    const validCompetitors = (form.competitors || []).filter((c) => c.trim());
    if (!form.myChannel.trim() || validCompetitors.length === 0) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tools/youtube-auditor/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          myChannel: form.myChannel,
          competitors: validCompetitors,
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

  return (
    <div>
      <form
        onSubmit={handleCompare}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-gray-900">
            Your channel
          </label>
          {(form.myChannel || form.competitors.some(Boolean)) && (
            <button
              type="button"
              onClick={clearForm}
              className="text-xs font-semibold text-gray-500 hover:text-red-600"
            >
              Clear all
            </button>
          )}
        </div>
        <input
          type="text"
          value={form.myChannel}
          onChange={(e) => setForm({ ...form, myChannel: e.target.value })}
          placeholder="https://youtube.com/@yourchannel"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm mb-4 focus:outline-none focus:border-red-500"
        />

        <label className="block text-sm font-bold text-gray-900 mb-2">
          Up to 3 competitors
        </label>
        <div className="space-y-2 mb-4">
          {form.competitors.map((c, i) => (
            <input
              key={i}
              type="text"
              value={c}
              onChange={(e) => {
                const next = [...form.competitors];
                next[i] = e.target.value;
                setForm({ ...form, competitors: next });
              }}
              placeholder={`Competitor ${i + 1}`}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-500"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || !form.myChannel.trim()}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          {loading ? "Comparing… (60-120s)" : "Compare Channels"}
        </button>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>

      {result && <CompareReport result={result} />}
    </div>
  );
}

function CompareReport({ result }) {
  const { mine, competitors, insights } = result;
  const all = [mine, ...competitors];

  return (
    <div className="space-y-4 sm:space-y-6">
      {insights?.verdict && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-4 sm:p-6">
          <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
            Verdict
          </div>
          <p className="text-base sm:text-lg font-bold text-gray-900">
            {insights.verdict}
          </p>
          <p className="text-sm text-gray-700 mt-3 leading-relaxed">
            {insights.positioning}
          </p>
        </div>
      )}

      {/* Comparison — card stack on mobile, table on desktop */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
                  Channel
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
                  Subs
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
                  Avg views
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
                  Uploads/mo
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
                  View/Sub
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {all.map((c, i) => (
                <tr key={i} className={i === 0 ? "bg-red-50/30" : ""}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {i === 0 && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-600 text-white uppercase">
                          You
                        </span>
                      )}
                      <span className="font-semibold text-gray-900">
                        {c.title}
                      </span>
                    </div>
                  </td>
                  <td className="text-right px-4 py-3 font-bold text-gray-900">
                    {fmt(c.subscribers)}
                  </td>
                  <td className="text-right px-4 py-3 text-gray-700">
                    {fmt(c.avgViews)}
                  </td>
                  <td className="text-right px-4 py-3 text-gray-700">
                    {c.uploadsPerMonth}
                  </td>
                  <td className="text-right px-4 py-3 text-gray-700">
                    {c.viewToSubRatio?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card stack */}
        <div className="sm:hidden divide-y divide-gray-100">
          {all.map((c, i) => (
            <div
              key={i}
              className={`p-4 ${i === 0 ? "bg-red-50/30" : ""}`}
            >
              <div className="flex items-center gap-2 mb-3">
                {i === 0 && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-600 text-white uppercase">
                    You
                  </span>
                )}
                <span className="font-semibold text-gray-900 truncate">
                  {c.title}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Subs
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {fmt(c.subscribers)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Avg views
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {fmt(c.avgViews)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Uploads/mo
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {c.uploadsPerMonth}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    View/Sub
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {c.viewToSubRatio?.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gaps & advantages */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.biggestGaps?.length > 0 && (
            <div className="bg-white rounded-2xl border border-red-100 p-4 sm:p-5">
              <h4 className="font-bold text-gray-900 mb-3">Biggest Gaps</h4>
              <ul className="space-y-3">
                {insights.biggestGaps.map((g, i) => (
                  <li key={i}>
                    <div className="text-sm font-bold text-red-700">
                      {g.area}
                    </div>
                    <div className="text-xs text-gray-700 mt-0.5">
                      {g.gap}
                    </div>
                    <div className="text-xs text-gray-500 italic mt-0.5">
                      {g.impact}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {insights.biggestAdvantages?.length > 0 && (
            <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-5">
              <h4 className="font-bold text-gray-900 mb-3">Your Advantages</h4>
              <ul className="space-y-3">
                {insights.biggestAdvantages.map((a, i) => (
                  <li key={i}>
                    <div className="text-sm font-bold text-green-700">
                      {a.area}
                    </div>
                    <div className="text-xs text-gray-700 mt-0.5">
                      {a.edge}
                    </div>
                    <div className="text-xs text-green-600 italic mt-0.5">
                      → {a.howToLeverage}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Content gaps */}
      {insights?.contentGaps?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
          <h4 className="font-bold text-gray-900 mb-3">Content Gaps to Fill</h4>
          <ul className="space-y-2">
            {insights.contentGaps.map((c, i) => (
              <li
                key={i}
                className="text-sm text-gray-800 p-3 bg-amber-50 border border-amber-100 rounded-lg"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Overtake plan */}
      {insights?.overtakePlan && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-6 text-white">
          <h4 className="text-base sm:text-lg font-bold mb-4">
            90-Day Overtake Plan
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PhaseBlock
              title="First 30 days"
              items={insights.overtakePlan.phase1_30days}
            />
            <PhaseBlock
              title="Days 30-60"
              items={insights.overtakePlan.phase2_60days}
            />
            <PhaseBlock
              title="Days 60-90"
              items={insights.overtakePlan.phase3_90days}
            />
          </div>
          {insights.predictedTimelineToMatch && (
            <div className="mt-4 sm:mt-6 pt-4 border-t border-white/10 text-sm text-white/80">
              <strong className="text-white">
                Predicted timeline to match top competitor:
              </strong>{" "}
              {insights.predictedTimelineToMatch}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PhaseBlock({ title, items }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
        {title}
      </div>
      <ul className="space-y-2">
        {items?.map((it, i) => (
          <li
            key={i}
            className="text-sm text-white/90 leading-relaxed flex items-start gap-2"
          >
            <svg
              className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function fmt(n) {
  if (!n) return "0";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}