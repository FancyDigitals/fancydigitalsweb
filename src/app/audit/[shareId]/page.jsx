import { createClient as createAdminClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Search,
  Zap,
  Shield,
  Star,
  TrendingUp,
  MessageSquare,
  Eye,
  Users,
  BarChart2,
  Smartphone,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Award,
  Lightbulb,
  Download,
  ArrowRight,
  Camera,
  ImageIcon,
} from "lucide-react";

const CATEGORY_ICONS = {
  seo: Search,
  performance: Zap,
  mobile: Smartphone,
  content: MessageSquare,
  trust: Shield,
  conversion: TrendingUp,
  brand: Star,
  socialProof: Users,
  aiVisibility: Eye,
  messagingPresence: MessageSquare,
  competitorGap: BarChart2,
};

const EFFORT_STYLES = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

function getGradeColor(grade) {
  const colors = { A: "#075a01", B: "#0a8f01", C: "#f59e0b", D: "#f97316", F: "#ef4444" };
  return colors[grade] || "#6b7280";
}

function getSeverityBg(severity) {
  const bgs = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-gray-100 text-gray-600",
  };
  return bgs[severity] || "bg-gray-100 text-gray-600";
}

function ScoreRing({ score, grade, size = "lg" }) {
  const radius = size === "lg" ? 54 : 36;
  const stroke = size === "lg" ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const svgSize = (radius + stroke) * 2;
  const color = getGradeColor(grade);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={svgSize} height={svgSize} className="-rotate-90">
        <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <p className={`font-black leading-none ${size === "lg" ? "text-3xl" : "text-lg"}`} style={{ color }}>{score}</p>
        <p className={`font-bold ${size === "lg" ? "text-base" : "text-xs"}`} style={{ color }}>{grade}</p>
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  const Icon = CATEGORY_ICONS[category.id] || BarChart2;
  const color = getGradeColor(category.grade);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm">{category.name}</p>
          <p className="text-xs text-gray-500 line-clamp-2">{category.summary}</p>
        </div>
        <ScoreRing score={category.score} grade={category.grade} size="sm" />
      </div>

      {category.issues?.length > 0 && (
        <div className="border-t border-gray-100 p-4 space-y-3">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wide">Issues found</p>
          {category.issues.map((issue, i) => (
            <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <div className="flex items-start gap-2 mb-1.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${getSeverityBg(issue.severity)}`}>{issue.severity}</span>
                <p className="text-xs font-bold text-gray-900">{issue.issue}</p>
              </div>
              <p className="text-[11px] text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Impact:</span> {issue.impact}
              </p>
              <p className="text-[11px] text-[#075a01]">
                <span className="font-semibold">Fix:</span> {issue.fix}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { shareId } = await params;
  return {
    title: `Website Audit Report — Fancy Digitals`,
    description: `Full website audit report — SEO, speed, content, trust, conversion, and more.`,
    openGraph: {
      title: "Website Audit Report — Fancy Digitals",
      description: "Full website audit with scores, priority fixes, and innovative growth ideas.",
    },
  };
}

export default async function SharedAuditPage({ params }) {
  const { shareId } = await params;

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data, error } = await admin
    .from("website_audits")
    .select("*")
    .eq("share_id", shareId)
    .eq("is_public", true)
    .single();

  if (error || !data) notFound();

  const { audit, ux_audit: uxAudit, meta } = data;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#075a01]/6 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#ff914d]/6 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative border-b border-gray-100 bg-white/80 backdrop-blur-sm px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <img src="/logo.png" alt="" className="h-5 brightness-0 invert" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Fancy Digitals</span>
          </Link>
          <Link
            href="/free-website-audit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:bg-[#0a8f01] transition"
          >
            Audit Your Website Free
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <section className="relative px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* Shared badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#075a01]/10 px-3 py-1 text-xs font-bold text-[#075a01]">
              <Search className="h-3 w-3" />
              Website Audit Report
            </span>
            <span className="text-xs text-gray-400">
              Audited {new Date(meta?.scannedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          {/* Overall Score */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ScoreRing score={audit.overallScore} grade={audit.overallGrade} size="lg" />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h1 className="text-xl font-black text-gray-900">{audit.websiteName || meta?.url}</h1>
                  <span className="inline-flex self-center items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">
                    {audit.websiteType}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{meta?.url}</p>
                <p className="text-sm text-gray-500 mb-3">{audit.websiteIntent}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{audit.overallSummary}</p>
              </div>
            </div>

            {meta?.pageSpeed && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-100">
                {[
                  { label: "Performance", val: meta.pageSpeed.performance },
                  { label: "SEO", val: meta.pageSpeed.seo },
                  { label: "Accessibility", val: meta.pageSpeed.accessibility },
                  { label: "Best Practices", val: meta.pageSpeed.bestPractices },
                ].map((s) => (
                  <div key={s.label} className="text-center rounded-lg bg-gray-50 p-3">
                    <p className="text-2xl font-black" style={{ color: s.val >= 90 ? "#075a01" : s.val >= 70 ? "#f59e0b" : "#ef4444" }}>
                      {s.val}
                    </p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Fixes */}
          {audit.priorityFixes?.length > 0 && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                <h2 className="text-base font-black text-gray-900">Top Priority Fixes</h2>
              </div>
              <div className="space-y-3">
                {audit.priorityFixes.map((fix) => (
                  <div key={fix.rank} className="rounded-xl bg-white border border-red-100 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-600">{fix.rank}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getSeverityBg(fix.severity)}`}>{fix.severity}</span>
                          <span className="text-xs font-bold text-gray-500">{fix.category}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">{fix.issue}</p>
                        <p className="text-xs text-[#075a01] mb-1"><span className="font-bold">Fix:</span> {fix.fix}</p>
                        <p className="text-xs text-gray-500"><span className="font-bold">Impact:</span> {fix.estimatedImpact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UX Audit */}
          {uxAudit && (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="h-5 w-5 text-indigo-500 shrink-0" />
                <div>
                  <h2 className="text-base font-black text-gray-900">In-App UX Analysis</h2>
                  <p className="text-xs text-gray-500">Based on {meta?.screenshotsAnalyzed} uploaded screenshot{meta?.screenshotsAnalyzed > 1 ? "s" : ""}</p>
                </div>
                <div className="ml-auto">
                  <ScoreRing score={uxAudit.uxScore} grade={uxAudit.uxGrade} size="sm" />
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">{uxAudit.uxSummary}</p>

              {uxAudit.screenshotInsights?.length > 0 && (
                <div className="space-y-3 mb-4">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Screenshot breakdown:</p>
                  {uxAudit.screenshotInsights.map((insight, i) => (
                    <div key={i} className="rounded-xl bg-white border border-indigo-100 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="h-4 w-4 text-indigo-400 shrink-0" />
                        <p className="text-xs font-bold text-gray-900">{insight.label}</p>
                      </div>
                      <p className="text-[11px] text-gray-500 mb-2">{insight.whatWeSee}</p>
                      {insight.strengths?.length > 0 && (
                        <ul className="mb-2 space-y-1">
                          {insight.strengths.map((s, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-[11px] text-green-700">
                              <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5" />{s}
                            </li>
                          ))}
                        </ul>
                      )}
                      {insight.issues?.length > 0 && (
                        <div className="space-y-2">
                          {insight.issues.map((issue, j) => (
                            <div key={j} className="rounded-lg bg-gray-50 p-2.5">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className={`text-[10px] font-bold px-1 py-0.5 rounded ${getSeverityBg(issue.severity)}`}>{issue.severity}</span>
                                <p className="text-[11px] font-bold text-gray-800">{issue.issue}</p>
                              </div>
                              <p className="text-[10px] text-[#075a01]"><span className="font-bold">Fix:</span> {issue.fix}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {uxAudit.missingFeatures?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">Missing features:</p>
                  <ul className="space-y-1.5">
                    {uxAudit.missingFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <XCircle className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Innovative Ideas */}
          {audit.innovativeIdeas?.length > 0 && (
            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-purple-500 shrink-0" />
                <h2 className="text-base font-black text-gray-900">Innovative Ideas to Grow Faster</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {audit.innovativeIdeas.map((idea, i) => (
                  <div key={i} className="rounded-xl bg-white border border-purple-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900">{idea.title}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ml-2 ${EFFORT_STYLES[idea.effort] || "bg-gray-100 text-gray-600"}`}>{idea.effort}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{idea.description}</p>
                    <p className="text-xs text-purple-700 font-semibold">{idea.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competitor Comparison */}
          {audit.competitorComparison && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="h-5 w-5 text-blue-500 shrink-0" />
                <h2 className="text-base font-black text-gray-900">Competitor Comparison</h2>
              </div>
              <p className="text-sm text-gray-700 mb-4">{audit.competitorComparison.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl bg-white border border-green-100 p-4">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Where you win</p>
                  <ul className="space-y-1.5">
                    {audit.competitorComparison.theyWinAt?.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />{w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-white border border-red-100 p-4">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">Where competitors win</p>
                  <ul className="space-y-1.5">
                    {audit.competitorComparison.competitorsWinAt?.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />{w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-xl bg-white border border-blue-100 p-4">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Biggest gap to close</p>
                <p className="text-sm text-gray-700 mb-2">{audit.competitorComparison.biggestGap}</p>
                <p className="text-xs font-bold text-[#075a01]">How to win: {audit.competitorComparison.howToWin}</p>
              </div>
            </div>
          )}

          {/* Category Breakdown */}
          <div>
            <h2 className="text-base font-black text-gray-900 mb-3">Full Category Breakdown</h2>
            <div className="space-y-3">
              {audit.categories?.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>

          {/* Quick Wins + Missing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audit.quickWins?.length > 0 && (
              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-green-600 shrink-0" />
                  <h2 className="text-sm font-black text-gray-900">Quick Wins</h2>
                </div>
                <div className="space-y-3">
                  {audit.quickWins.map((win, i) => (
                    <div key={i} className="rounded-lg bg-white border border-green-100 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-gray-900">{win.title}</p>
                        <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">{win.timeToFix}</span>
                      </div>
                      <p className="text-[11px] text-gray-500">{win.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {audit.missingElements?.length > 0 && (
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-orange-500 shrink-0" />
                  <h2 className="text-sm font-black text-gray-900">What You&apos;re Missing</h2>
                </div>
                <ul className="space-y-2">
                  {audit.missingElements.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <XCircle className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />{m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 sm:p-8 text-center">
            <h2 className="text-lg font-black text-white mb-2">Audit your own website for free</h2>
            <p className="text-sm text-white/80 mb-5">
              Get your full score, priority fixes, UX analysis, competitor comparison, and innovative growth ideas.
            </p>
            <Link
              href="/free-website-audit"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] hover:bg-gray-100 transition"
            >
              Audit My Website Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
