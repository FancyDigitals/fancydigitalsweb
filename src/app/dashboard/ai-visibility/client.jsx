"use client";

import { useState } from "react";
import {
  Sparkles,
  Search,
  Loader2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  ExternalLink,
  Globe,
  Zap,
  Shield,
  FileCode,
  Tag,
  FileText,
  Smartphone,
  Brain,
  Award,
  Network,
  Crown,
  ChevronRight,
  ArrowRight,
  Swords,
  Info,
} from "lucide-react";

const SCORE_ICONS = {
  technicalSEO: Shield,
  schema: FileCode,
  metaTags: Tag,
  content: FileText,
  performance: Zap,
  mobile: Smartphone,
  knowledgeGraph: Network,
  entityClarity: Brain,
  aiReadability: Sparkles,
  trustSignals: Award,
};

const SCORE_LABELS = {
  technicalSEO: "Technical SEO",
  schema: "Schema / Structured Data",
  metaTags: "Meta Tags",
  content: "Content Quality",
  performance: "Performance",
  mobile: "Mobile / Accessibility",
  knowledgeGraph: "Knowledge Graph",
  entityClarity: "Entity Clarity",
  aiReadability: "AI Readability",
  trustSignals: "Trust Signals",
};

const PRIORITY_STYLE = {
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Critical" },
  high: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", label: "High" },
  medium: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", label: "Medium" },
  low: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", label: "Low" },
};

function scoreColor(score) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-600";
  return "text-red-600";
}

function scoreRingColor(score) {
  if (score >= 80) return "#16a34a";
  if (score >= 60) return "#ca8a04";
  if (score >= 40) return "#ea580c";
  return "#dc2626";
}

function scoreBgColor(score) {
  if (score >= 80) return "bg-green-100";
  if (score >= 60) return "bg-yellow-100";
  if (score >= 40) return "bg-orange-100";
  return "bg-red-100";
}

export default function AIVisibilityClient({ initialScans, isPro }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [scans, setScans] = useState(initialScans);

  async function handleScan(e) {
    e?.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai-visibility/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Scan failed");
        return;
      }

      setResult(data.result);

      // Add to scans list
      if (data.scanId) {
        setScans((prev) => [
          {
            id: data.scanId,
            url: data.result.url,
            domain: data.result.domain,
            overall_score: data.result.overall,
            status: "completed",
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this scan?")) return;
    try {
      const res = await fetch(`/api/ai-visibility/scan?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setScans((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff914d] mb-2">
              <Sparkles className="h-4 w-4" />
              <span>AI Readiness Intelligence</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Is your website ready for AI?
            </h1>
            <p className="mt-2 max-w-2xl text-gray-500">
              Measure how well your site is technically prepared to be understood, parsed, and cited by AI assistants like ChatGPT, Gemini, Claude, and Perplexity.
            </p>
          </div>
          <a
            href="/dashboard/ai-visibility/compare"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#ff914d]/40 hover:shadow-md"
          >
            <Swords className="h-4 w-4 text-[#ff914d]" />
            Compare vs. Competitor
          </a>
        </div>

        {/* Honest Disclaimer */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <div className="text-xs text-blue-900">
              <p className="font-bold">What this measures (and what it doesn't):</p>
              <p className="mt-1 text-blue-800/80">
                This tool measures <strong>on-page AI readiness</strong> schema, content, technical SEO, and structured data. It does NOT measure real-world authority (backlinks, brand mentions, traffic, press). A high score means your site is technically prepared. Combined with real authority, that's what gets you recommended by AI.
              </p>
            </div>
          </div>
        </div>

        {/* SCAN FORM */}
        <form onSubmit={handleScan} className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-gray-700">Enter your website URL</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="fancydigitals.com.ng"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze
                </>
              )}
            </button>
          </div>

          {!isPro && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
              <Crown className="h-3 w-3 text-[#ff914d]" />
              Free plan: 3 scans per day. <a href="/pricing" className="ml-1 font-semibold text-[#075a01] hover:underline">Upgrade for unlimited</a>
            </p>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
              <p className="font-medium">This usually takes 20–45 seconds.</p>
              <p className="mt-1 text-xs text-gray-500">Running PageSpeed analysis, parsing schema, checking Knowledge Graph, and calculating 10 visibility signals...</p>
            </div>
          )}
        </form>

        {/* RESULT */}
        {result && <ScanResult result={result} />}

        {/* RECENT SCANS */}
        {scans.length > 0 && !result && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Scans</h2>
              <p className="mt-1 text-sm text-gray-500">{scans.length} total</p>
            </div>
            <div className="divide-y divide-gray-100">
              {scans.map((scan) => (
                <div key={scan.id} className="group flex items-center gap-4 p-5 transition-colors hover:bg-gray-50">
                  <a
                    href={`/dashboard/ai-visibility/${scan.id}`}
                    className="flex flex-1 items-center gap-4 min-w-0"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${scoreBgColor(scan.overall_score)}`}>
                      <span className={`text-lg font-black ${scoreColor(scan.overall_score)}`}>
                        {scan.overall_score}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-900 group-hover:text-[#075a01]">{scan.domain}</p>
                      <p className="truncate text-xs text-gray-500">{new Date(scan.created_at).toLocaleString()}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 group-hover:text-[#075a01]" />
                  </a>
                  <button
                    onClick={() => handleDelete(scan.id)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {scans.length === 0 && !result && !loading && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#075a01]/10">
              <Sparkles className="h-6 w-6 text-[#075a01]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Start your first scan</h3>
            <p className="mt-2 text-sm text-gray-500">Enter a URL above to see how AI assistants understand your business.</p>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── RESULT COMPONENT ───────────────────────────────────────────────────────
function ScanResult({ result }) {
  const { overall, scores, signals, recommendations, domain } = result;

  const sortedRecs = [...recommendations].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-6">

      {/* OVERALL SCORE CARD */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm">
        <div className="grid items-center gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
          <ScoreRing score={overall} size={160} />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">AI Readiness Score for</p>
            <h2 className="mt-1 text-2xl font-black text-gray-900 md:text-3xl">{domain}</h2>
            <p className={`mt-2 text-base font-bold ${scoreColor(overall)}`}>
              {overall >= 80 && "Excellent — your site is technically AI-ready."}
              {overall >= 60 && overall < 80 && "Good — but key signals are missing."}
              {overall >= 40 && overall < 60 && "Needs work — AI struggles to parse your site."}
              {overall < 40 && "Critical — major AI-readability gaps to fix."}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3 text-red-500" />
                {recommendations.filter(r => r.priority === "critical").length} critical
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-orange-500" />
                {recommendations.filter(r => r.priority === "high").length} high
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-blue-500" />
                {recommendations.filter(r => r.priority === "medium" || r.priority === "low").length} other
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INDIVIDUAL SCORES */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-1 text-lg font-bold text-gray-900">Signal Breakdown</h3>
        <p className="mb-6 text-sm text-gray-500">How your site scored across 10 AI visibility signals.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(scores).map(([key, score]) => {
            const Icon = SCORE_ICONS[key] || Sparkles;
            return (
              <div key={key} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${scoreBgColor(score)}`}>
                  <Icon className={`h-4 w-4 ${scoreColor(score)}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-gray-700">{SCORE_LABELS[key]}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${score}%`, background: scoreRingColor(score) }}
                      />
                    </div>
                    <span className={`text-sm font-black ${scoreColor(score)}`}>{score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-1 text-lg font-bold text-gray-900">Your Improvement Plan</h3>
        <p className="mb-6 text-sm text-gray-500">Prioritized actions to boost your AI visibility.</p>

        {sortedRecs.length === 0 ? (
          <div className="rounded-xl bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-600" />
            <p className="font-bold text-green-900">No critical issues found.</p>
            <p className="mt-1 text-sm text-green-700">Your site looks great to AI assistants.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedRecs.map((rec, i) => {
              const style = PRIORITY_STYLE[rec.priority];
              return (
                <div key={i} className={`flex items-start gap-3 rounded-xl border ${style.border} ${style.bg} p-4`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ${style.text}`}>
                    {rec.priority === "critical" && <XCircle className="h-4 w-4" />}
                    {rec.priority === "high" && <AlertCircle className="h-4 w-4" />}
                    {rec.priority === "medium" && <TrendingUp className="h-4 w-4" />}
                    {rec.priority === "low" && <ChevronRight className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                        {style.label}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">{rec.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{rec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SIGNAL DETAILS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-6 text-lg font-bold text-gray-900">Detected Signals</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <SignalGroup
            title="Meta Tags"
            items={[
              { label: "Title", value: signals.meta.title || "Missing", ok: !!signals.meta.title },
              { label: "Description", value: signals.meta.description || "Missing", ok: !!signals.meta.description },
              { label: "OG Image", value: signals.meta.ogImage ? "Present" : "Missing", ok: !!signals.meta.ogImage },
              { label: "Canonical", value: signals.meta.canonical ? "Present" : "Missing", ok: !!signals.meta.canonical },
            ]}
          />
          <SignalGroup
            title="Structured Data"
            items={[
              { label: "Schema count", value: `${signals.schema.count} found`, ok: signals.schema.count > 0 },
              { label: "Organization", value: signals.schema.hasOrganization ? "Yes" : "No", ok: signals.schema.hasOrganization },
              { label: "FAQ", value: signals.schema.hasFAQ ? "Yes" : "No", ok: signals.schema.hasFAQ },
              { label: "Breadcrumb", value: signals.schema.hasBreadcrumb ? "Yes" : "No", ok: signals.schema.hasBreadcrumb },
            ]}
          />
          <SignalGroup
            title="Content"
            items={[
              { label: "Word count", value: `${signals.content.wordCount} words`, ok: signals.content.wordCount >= 300 },
              { label: "H1 tags", value: signals.content.h1Count, ok: signals.content.h1Count === 1 },
              { label: "H2 tags", value: signals.content.h2Count, ok: signals.content.h2Count >= 2 },
              { label: "Alt text coverage", value: `${signals.content.altRatio}%`, ok: signals.content.altRatio >= 80 },
            ]}
          />
          <SignalGroup
            title="Trust & Identity"
            items={[
              { label: "HTTPS", value: signals.technical.https ? "Yes" : "No", ok: signals.technical.https },
              { label: "Knowledge Graph", value: signals.knowledgeGraph ? "Found" : "Not found", ok: signals.knowledgeGraph },
              { label: "Social profiles", value: Object.values(signals.social).filter(Boolean).length, ok: Object.values(signals.social).filter(Boolean).length >= 2 },
              { label: "Language tag", value: signals.meta.lang || "Missing", ok: !!signals.meta.lang },
            ]}
          />
        </div>
      </div>

    </div>
  );
}

function ScoreRing({ score, size = 160 }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreRingColor(score);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black" style={{ color }}>{score}</span>
        <span className="text-xs font-semibold text-gray-400">out of 100</span>
      </div>
    </div>
  );
}

function SignalGroup({ title, items }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold text-gray-900">{title}</h4>
      <div className="space-y-2">
        {items.map(({ label, value, ok }) => (
          <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm">
            <div className="flex items-center gap-2 min-w-0">
              {ok ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-600" />
              ) : (
                <XCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
              )}
              <span className="font-medium text-gray-700">{label}</span>
            </div>
            <span className="truncate text-xs font-semibold text-gray-500" title={String(value)}>
              {typeof value === "string" && value.length > 30 ? value.slice(0, 30) + "..." : value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}