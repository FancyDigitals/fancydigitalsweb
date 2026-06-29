"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Loader2,
  Globe,
  Search,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  AlertTriangle,
  Crown,
  Swords,
  Shield,
  FileCode,
  Tag,
  FileText,
  Zap,
  Smartphone,
  Network,
  Brain,
  Award,
  ChevronRight,
  Lightbulb,
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

const WHY_LOSING = {
  technicalSEO: "Your site has weaker technical foundations. Check HTTPS, viewport, and crawlability.",
  schema: "Your competitor has more structured data. AI relies heavily on schema to understand businesses.",
  metaTags: "Your meta tags are weaker. Optimize title, description, OG tags, and canonicals.",
  content: "Your content is thinner. Add more substantive content (800+ words on key pages).",
  performance: "Your site is slower. Faster sites get cited more by AI assistants.",
  mobile: "Your mobile experience is weaker. AI favors mobile-friendly sites.",
  knowledgeGraph: "Competitor is in Google's Knowledge Graph and you aren't. Build entity presence.",
  entityClarity: "Your competitor has clearer entity signals. Add Organization schema and consistent naming.",
  aiReadability: "Your site is harder for AI to parse. Add FAQ schema, semantic headings, and structured data.",
  trustSignals: "Your competitor has stronger trust signals. Add social links, policies, and verification.",
};

const WHY_WINNING = {
  technicalSEO: "Stronger technical foundation — keep it tight.",
  schema: "More structured data — AI understands your business better.",
  metaTags: "Sharper meta tags — better link previews and search snippets.",
  content: "Richer content — AI has more to cite from.",
  performance: "Faster site — better user experience and AI preference.",
  mobile: "Better mobile experience — AI rewards this.",
  knowledgeGraph: "Stronger Knowledge Graph presence — AI recognizes you as an entity.",
  entityClarity: "Clearer business identity — AI knows exactly who you are.",
  aiReadability: "More AI-friendly structure — easier for models to parse and cite.",
  trustSignals: "Stronger trust signals — more credibility in AI's eyes.",
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

export default function CompareClient({ isPro }) {
  const [yourUrl, setYourUrl] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleCompare(e) {
    e?.preventDefault();
    if (!yourUrl.trim() || !competitorUrl.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai-visibility/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yourUrl: yourUrl.trim(), competitorUrl: competitorUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Comparison failed");
        return;
      }
      setResult(data);
      setTimeout(() => {
        document.getElementById("compare-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* BACK */}
        <Link
          href="/dashboard/ai-visibility"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-[#075a01]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to AI Visibility
        </Link>

        {/* HEADER */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff914d]">
            <Swords className="h-4 w-4" />
            <span>AI Readiness Comparison</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Compare your AI readiness.
          </h1>
          <p className="mt-2 max-w-2xl text-gray-500">
            See how your on-page AI readiness stacks up against any competitor and what to fix to close the gap.
          </p>
        </div>

        {/* Honest disclaimer */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <div className="text-xs text-blue-900">
              <p className="font-bold">Important:</p>
              <p className="mt-1 text-blue-800/80">
                This compares <strong>on-page AI readiness only</strong> not real-world authority. A competitor with lower readiness can still outrank you if they have stronger backlinks, traffic, or brand presence. Use this to identify technical gaps you can fix, not to predict who AI will recommend.
              </p>
            </div>
          </div>
        </div>

        {/* PRO GATE */}
        {!isPro && (
          <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-8 text-center shadow-2xl">
            <Crown className="mx-auto mb-4 h-10 w-10 text-[#ff914d]" />
            <h2 className="text-2xl font-black text-white">Pro Feature</h2>
            <p className="mx-auto mt-2 max-w-md text-white/80">
              Competitor comparison is available on Pro. Upgrade to scan competitors and get strategic insights.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] shadow-lg transition-all hover:-translate-y-0.5"
            >
              Upgrade to Pro <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* FORM */}
        {isPro && (
          <form onSubmit={handleCompare} className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Your website</label>
                <div className="relative">
                  <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={yourUrl}
                    onChange={(e) => setYourUrl(e.target.value)}
                    placeholder="yoursite.com"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Competitor</label>
                <div className="relative">
                  <Swords className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={competitorUrl}
                    onChange={(e) => setCompetitorUrl(e.target.value)}
                    placeholder="competitor.com"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#ff914d] focus:ring-2 focus:ring-[#ff914d]/10"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !yourUrl.trim() || !competitorUrl.trim()}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Comparing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Compare
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loading && (
              <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                <p className="font-medium">Scanning both sites in parallel...</p>
                <p className="mt-1 text-xs text-gray-500">This takes 30–60 seconds. We're running PageSpeed, parsing schema, and checking Knowledge Graph for both.</p>
              </div>
            )}
          </form>
        )}

        {/* RESULT */}
        {result && (
          <div id="compare-result">
            <CompareResult result={result} />
          </div>
        )}

      </div>
    </div>
  );
}

// ─── COMPARE RESULT ─────────────────────────────────────────────────────────

function CompareResult({ result }) {
  const { you, competitor, insights } = result;

  return (
    <div className="space-y-6">

      {/* VERDICT */}
      <div className={`overflow-hidden rounded-2xl border p-8 shadow-sm md:p-10 ${
        insights.verdict === "winning" ? "border-green-200 bg-gradient-to-br from-green-50 to-white" :
        insights.verdict === "losing" ? "border-red-200 bg-gradient-to-br from-red-50 to-white" :
        "border-yellow-200 bg-gradient-to-br from-yellow-50 to-white"
      }`}>
        <div className="grid items-center gap-6 md:grid-cols-3">
          {/* You */}
          <div className="text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">You</p>
            <p className="truncate text-sm font-semibold text-gray-700">{you.domain}</p>
            <p className={`mt-3 text-6xl font-black ${scoreColor(you.overall)}`}>{you.overall}</p>
          </div>

          {/* Verdict */}
          <div className="text-center">
            {insights.verdict === "winning" && (
              <>
                <Trophy className="mx-auto mb-3 h-12 w-12 text-green-600" />
                <p className="text-2xl font-black text-green-700">More AI-ready</p>
                <p className="mt-1 text-sm text-green-600">+{insights.overallDiff} points ahead on technical readiness</p>
              </>
            )}
            {insights.verdict === "losing" && (
              <>
                <AlertTriangle className="mx-auto mb-3 h-12 w-12 text-red-600" />
                <p className="text-2xl font-black text-red-700">Less AI-ready</p>
                <p className="mt-1 text-sm text-red-600">{insights.overallDiff} points behind on technical readiness</p>
              </>
            )}
            {insights.verdict === "close" && (
              <>
                <Minus className="mx-auto mb-3 h-12 w-12 text-yellow-600" />
                <p className="text-2xl font-black text-yellow-700">Similar readiness</p>
                <p className="mt-1 text-sm text-yellow-600">
                  {insights.overallDiff > 0 ? `+${insights.overallDiff}` : insights.overallDiff} point gap
                </p>
              </>
            )}
          </div>

          {/* Competitor */}
          <div className="text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Competitor</p>
            <p className="truncate text-sm font-semibold text-gray-700">{competitor.domain}</p>
            <p className={`mt-3 text-6xl font-black ${scoreColor(competitor.overall)}`}>{competitor.overall}</p>
          </div>
        </div>
      </div>

      {/* SIDE BY SIDE BREAKDOWN */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-1 text-lg font-bold text-gray-900">Signal-by-Signal Breakdown</h3>
        <p className="mb-6 text-sm text-gray-500">How you compare across all 10 AI visibility signals.</p>

        <div className="space-y-3">
          {Object.keys(you.scores).map((key) => {
            const yourScore = you.scores[key];
            const compScore = competitor.scores[key];
            const diff = yourScore - compScore;
            const winning = diff > 5;
            const losing = diff < -5;
            const Icon = SCORE_ICONS[key] || Sparkles;

            return (
              <div key={key} className="grid items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 md:grid-cols-[200px_1fr_auto]">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{SCORE_LABELS[key]}</p>
                </div>

                <div className="space-y-2">
                  {/* You */}
                  <div className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-xs font-semibold text-gray-500">You</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full" style={{ width: `${yourScore}%`, background: scoreRingColor(yourScore) }} />
                    </div>
                    <span className={`w-10 text-right text-sm font-black ${scoreColor(yourScore)}`}>{yourScore}</span>
                  </div>
                  {/* Competitor */}
                  <div className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-xs font-semibold text-gray-500">Comp.</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full" style={{ width: `${compScore}%`, background: scoreRingColor(compScore) }} />
                    </div>
                    <span className={`w-10 text-right text-sm font-black ${scoreColor(compScore)}`}>{compScore}</span>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  {winning && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                      <TrendingUp className="h-3 w-3" />
                      +{diff}
                    </div>
                  )}
                  {losing && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
                      <TrendingDown className="h-3 w-3" />
                      {diff}
                    </div>
                  )}
                  {!winning && !losing && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                      <Minus className="h-3 w-3" />
                      Tied
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHY YOU'RE LOSING */}
      {insights.losses.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-1 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Where competitor wins</h3>
          </div>
          <p className="mb-6 text-sm text-gray-500">Fix these first — biggest gaps are your highest priority.</p>

          <div className="space-y-3">
            {insights.losses.map(({ key, yourScore, compScore, diff }) => {
              const Icon = SCORE_ICONS[key] || Sparkles;
              return (
                <div key={key} className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-gray-900">{SCORE_LABELS[key]}</p>
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                        {diff} point gap
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{WHY_LOSING[key]}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      You: <strong className="text-red-700">{yourScore}</strong> · Competitor: <strong className="text-gray-700">{compScore}</strong>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WHERE YOU WIN */}
      {insights.wins.length > 0 && (
        <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-1 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Where you win</h3>
          </div>
          <p className="mb-6 text-sm text-gray-500">Your strengths — keep maintaining these.</p>

          <div className="space-y-3">
            {insights.wins.map(({ key, yourScore, compScore, diff }) => {
              const Icon = SCORE_ICONS[key] || Sparkles;
              return (
                <div key={key} className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-green-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-gray-900">{SCORE_LABELS[key]}</p>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-700">
                        +{diff} ahead
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{WHY_WINNING[key]}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      You: <strong className="text-green-700">{yourScore}</strong> · Competitor: <strong className="text-gray-700">{compScore}</strong>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STRATEGIC SUMMARY */}
      {insights.biggestGap && (
        <div className="rounded-2xl border border-[#ff914d]/30 bg-gradient-to-br from-[#ff914d]/5 to-white p-8 shadow-sm md:p-10">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#ff914d]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#ff914d]">Strategic Recommendation</p>
          </div>
          <h3 className="text-2xl font-black text-gray-900">
            Focus on <span className="text-[#ff914d]">{SCORE_LABELS[insights.biggestGap.key]}</span> first.
          </h3>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            That's your biggest gap ({insights.biggestGap.diff} points behind). Closing it will move the needle on your overall AI visibility score faster than any other improvement.
          </p>
        </div>
      )}

    </div>
  );
}