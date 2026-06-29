"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
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
  Calendar,
  ExternalLink,
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

function scoreColor(s) {
  if (s >= 80) return "text-green-600";
  if (s >= 60) return "text-yellow-600";
  if (s >= 40) return "text-orange-600";
  return "text-red-600";
}
function scoreRingColor(s) {
  if (s >= 80) return "#16a34a";
  if (s >= 60) return "#ca8a04";
  if (s >= 40) return "#ea580c";
  return "#dc2626";
}
function scoreBgColor(s) {
  if (s >= 80) return "bg-green-100";
  if (s >= 60) return "bg-yellow-100";
  if (s >= 40) return "bg-orange-100";
  return "bg-red-100";
}

export default function ScanDetailClient({ scan, history }) {
  const router = useRouter();
  const [rescanning, setRescanning] = useState(false);
  const [error, setError] = useState("");

  const scores = scan.scores || {};
  const signals = scan.signals || {};
  const recommendations = scan.recommendations || [];

  const sortedRecs = [...recommendations].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  // Score trend
  const previousScan = history.length > 1 ? history[history.length - 2] : null;
  const scoreDiff = previousScan ? scan.overall_score - previousScan.overall_score : 0;

  async function handleRescan() {
    setRescanning(true);
    setError("");
    try {
      const res = await fetch("/api/ai-visibility/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scan.url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Re-scan failed");
        setRescanning(false);
        return;
      }
      // Redirect to the new scan
      if (data.scanId) {
        router.push(`/dashboard/ai-visibility/${data.scanId}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err.message || "Network error");
      setRescanning(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* BACK BUTTON */}
        <Link
          href="/dashboard/ai-visibility"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-[#075a01]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all scans
        </Link>

        {/* HEADER */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">{scan.domain}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(scan.created_at).toLocaleString()}
              </span>
              <a
                href={scan.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-[#075a01] hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                Visit site
              </a>
            </div>
          </div>

          <button
            onClick={handleRescan}
            disabled={rescanning}
            className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {rescanning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Re-scanning...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Re-scan
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* OVERALL SCORE + TREND */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {/* Score Card */}
          <div className="md:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-6">
              <ScoreRing score={scan.overall_score} size={140} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">AI Readiness Score</p>
                <p className={`mt-2 text-base font-bold ${scoreColor(scan.overall_score)}`}>
                  {scan.overall_score >= 80 && "Excellent — your site is technically AI-ready."}
                  {scan.overall_score >= 60 && scan.overall_score < 80 && "Good — but key signals are missing."}
                  {scan.overall_score >= 40 && scan.overall_score < 60 && "Needs work — AI struggles to parse your site."}
                  {scan.overall_score < 40 && "Critical — major AI-readability gaps to fix."}
                </p>
                {previousScan && (
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    {scoreDiff > 0 && (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-600">+{scoreDiff} points</span>
                        <span className="text-gray-500">since last scan</span>
                      </>
                    )}
                    {scoreDiff < 0 && (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span className="font-bold text-red-600">{scoreDiff} points</span>
                        <span className="text-gray-500">since last scan</span>
                      </>
                    )}
                    {scoreDiff === 0 && (
                      <>
                        <Minus className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-500">No change since last scan</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Issue counts */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-gray-900">Issues Found</h3>
            <div className="space-y-2">
              {[
                { key: "critical", label: "Critical", color: "text-red-600", bg: "bg-red-50" },
                { key: "high", label: "High", color: "text-orange-600", bg: "bg-orange-50" },
                { key: "medium", label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50" },
                { key: "low", label: "Low", color: "text-blue-600", bg: "bg-blue-50" },
              ].map(({ key, label, color, bg }) => {
                const count = recommendations.filter((r) => r.priority === key).length;
                return (
                  <div key={key} className={`flex items-center justify-between rounded-lg ${bg} px-3 py-2`}>
                    <span className="text-xs font-semibold text-gray-700">{label}</span>
                    <span className={`text-sm font-black ${color}`}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* HISTORY CHART */}
        {history.length > 1 && (
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-1 text-lg font-bold text-gray-900">Score Trend</h3>
            <p className="mb-6 text-sm text-gray-500">Your AI visibility score across {history.length} scans of {scan.domain}.</p>
            <HistoryChart history={history} currentId={scan.id} />
          </div>
        )}

        {/* SIGNAL BREAKDOWN */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
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
                        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: scoreRingColor(score) }} />
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
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-1 text-lg font-bold text-gray-900">Improvement Plan</h3>
          <p className="mb-6 text-sm text-gray-500">All {sortedRecs.length} prioritized actions to boost AI visibility.</p>

          {sortedRecs.length === 0 ? (
            <div className="rounded-xl bg-green-50 p-6 text-center">
              <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <p className="font-bold text-green-900">No issues found.</p>
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
                      <div className="mb-1">
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
                { label: "Title", value: signals.meta?.title || "Missing", ok: !!signals.meta?.title },
                { label: "Description", value: signals.meta?.description || "Missing", ok: !!signals.meta?.description },
                { label: "OG Image", value: signals.meta?.ogImage ? "Present" : "Missing", ok: !!signals.meta?.ogImage },
                { label: "Canonical", value: signals.meta?.canonical ? "Present" : "Missing", ok: !!signals.meta?.canonical },
              ]}
            />
            <SignalGroup
              title="Structured Data"
              items={[
                { label: "Schema count", value: `${signals.schema?.count || 0} found`, ok: (signals.schema?.count || 0) > 0 },
                { label: "Organization", value: signals.schema?.hasOrganization ? "Yes" : "No", ok: signals.schema?.hasOrganization },
                { label: "FAQ", value: signals.schema?.hasFAQ ? "Yes" : "No", ok: signals.schema?.hasFAQ },
                { label: "Breadcrumb", value: signals.schema?.hasBreadcrumb ? "Yes" : "No", ok: signals.schema?.hasBreadcrumb },
              ]}
            />
            <SignalGroup
              title="Content"
              items={[
                { label: "Word count", value: `${signals.content?.wordCount || 0} words`, ok: (signals.content?.wordCount || 0) >= 300 },
                { label: "H1 tags", value: signals.content?.h1Count || 0, ok: signals.content?.h1Count === 1 },
                { label: "H2 tags", value: signals.content?.h2Count || 0, ok: (signals.content?.h2Count || 0) >= 2 },
                { label: "Alt text coverage", value: `${signals.content?.altRatio || 0}%`, ok: (signals.content?.altRatio || 0) >= 80 },
              ]}
            />
            <SignalGroup
              title="Trust & Identity"
              items={[
                { label: "HTTPS", value: signals.technical?.https ? "Yes" : "No", ok: signals.technical?.https },
                { label: "Knowledge Graph", value: signals.knowledgeGraph ? "Found" : "Not found", ok: signals.knowledgeGraph },
                { label: "Social profiles", value: Object.values(signals.social || {}).filter(Boolean).length, ok: Object.values(signals.social || {}).filter(Boolean).length >= 2 },
                { label: "Language tag", value: signals.meta?.lang || "Missing", ok: !!signals.meta?.lang },
              ]}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── SUB COMPONENTS ──────────────────────────────────────────────────────────

function ScoreRing({ score, size = 140 }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreRingColor(score);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
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

function HistoryChart({ history, currentId }) {
  const width = 800;
  const height = 200;
  const padding = 40;
  const maxScore = 100;

  const xStep = history.length > 1 ? (width - padding * 2) / (history.length - 1) : 0;

  const points = history.map((h, i) => ({
    x: padding + i * xStep,
    y: height - padding - (h.overall_score / maxScore) * (height - padding * 2),
    score: h.overall_score,
    date: new Date(h.created_at),
    id: h.id,
    isCurrent: h.id === currentId,
  }));

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 400 }}>
        {/* Y-axis grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = height - padding - (val / maxScore) * (height - padding * 2);
          return (
            <g key={val}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text x={padding - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af" fontWeight="600">{val}</text>
            </g>
          );
        })}

        {/* Line */}
        <path d={pathD} fill="none" stroke="#075a01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.isCurrent ? 7 : 4} fill={p.isCurrent ? "#ff914d" : "#075a01"} stroke="white" strokeWidth="2" />
            <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="11" fill="#111827" fontWeight="700">{p.score}</text>
          </g>
        ))}

        {/* X labels */}
        {points.map((p, i) => {
          if (history.length > 8 && i % 2 !== 0 && i !== points.length - 1) return null;
          return (
            <text key={i} x={p.x} y={height - padding + 18} textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="600">
              {p.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </text>
          );
        })}
      </svg>
    </div>
  );
}