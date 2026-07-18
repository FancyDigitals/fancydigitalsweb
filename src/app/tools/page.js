import { tools } from "@/content/tools";
import Link from "next/link";
import {
  Sparkles,
  Search,
  FileText,
  Mail,
  ArrowRight,
  Zap,
  Crown,
  CheckCircle2,
  Lock,
  Wrench,
  Star,
  TrendingUp,
  Globe,
  Video,
  Layers,
  Palette,
  Type,
  Key,
  QrCode,
  Receipt,
  Ruler,
  Hash,
  Youtube,
  Eye,
  Presentation,
  BookOpen,
  Send,
  FileStack,
  Share2,
  Rocket,
  Grid3x3,
} from "lucide-react";

// Map every tool slug to its icon
const TOOL_ICONS = {
  "ai-resume-builder": FileText,
  "ai-cover-letter": Mail,
  "ai-landing-page-generator": Layout,
  "ai-video-generator": Video,
  "ai-pitch-deck": Presentation,
  "ai-business-plan": BookOpen,
  "ai-email-sequence": Send,
  "ai-social-media-post": Share2,
  "ai-readiness-checker": Eye,
  "youtube-auditor": Youtube,
  "document-viewer": FileStack,
  "seo-meta-tag-generator": Search,
  "word-counter": Type,
  "password-generator": Key,
  "invoice-generator": Receipt,
  "qr-code-generator": QrCode,
  "color-palette-generator": Palette,
  "hashtag-generator": Hash,
  "unit-converter": Ruler,
};

// Fake `Layout` fallback for missing lucide
import { Layout } from "lucide-react";

export const metadata = {
  title: "AI Tools & Free Digital Tools | Fancy Digitals",
  description:
    "The complete AI business toolkit. 20+ free & AI-powered tools for marketers, founders, agencies, and creators. No sign-up for free tools.",
  keywords: [
    "free online tools",
    "ai tools",
    "ai resume builder",
    "free seo tools",
    "ai social media generator",
    "digital tools",
  ],
};

export default function ToolsPage() {
  const published = tools
    .filter((t) => t.published)
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  const aiTools = published.filter((t) => t.isAI && t.isLive);
  const freeTools = published.filter((t) => !t.isAI && t.isLive);
  const totalTools = published.filter((t) => t.isLive).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* ─────────────────────────────────
          BG DECOR — subtle premium mesh
      ────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#075a01]/[0.04] blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#ff914d]/[0.04] blur-[100px]" />
        <div className="absolute left-1/2 top-2/3 h-[400px] w-[400px] rounded-full bg-purple-500/[0.03] blur-[80px]" />
      </div>

      {/* ═════════════════════════════════
          HERO — Editorial, dense, premium
      ══════════════════════════════════ */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Small pill */}
          <div className="mb-8 flex justify-center">
          </div>

          {/* Headline */}
          <h1 className="text-center text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            The complete
            <br />
            <span className="bg-gradient-to-r from-[#075a01] via-[#0a8f01] to-[#075a01] bg-clip-text text-transparent">
              AI toolkit
            </span>{" "}
            for
            <br />
            modern businesses.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-gray-600 sm:text-lg">
            Everything you need to build, market, and grow in one place.
            Free tools for daily work. AI-powered tools for the heavy lifting.
          </p>

          {/* Stats bar */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900 sm:text-3xl">
                {aiTools.length}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                AI Tools
              </div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-2xl font-black text-gray-900 sm:text-3xl">
                {freeTools.length}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Free Tools
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900 sm:text-3xl">
                100%
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                No Signup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════
          AI TOOLS — Feature-rich cards
      ══════════════════════════════════ */}
      {aiTools.length > 0 && (
        <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Section header */}
            <div className="mb-8 flex items-end justify-between border-b border-gray-100 pb-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-500">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
                    AI Powered
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                  Built for serious work.
                </h2>
              </div>
              <span className="hidden text-sm font-semibold text-gray-400 sm:inline">
                {aiTools.length} tools
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aiTools.map((tool) => {
                const ToolIcon = TOOL_ICONS[tool.slug] || Sparkles;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href || `/dashboard/tools/${tool.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/30 hover:shadow-[0_12px_40px_rgba(7,90,1,0.12)]"
                  >
                    {/* Hover accent line */}
                    <div
                      className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{
                        background: `linear-gradient(to right, ${tool.accent}, ${tool.accent}66)`,
                      }}
                    />

                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${tool.accent}15, ${tool.accent}08)`,
                          border: `1px solid ${tool.accent}20`,
                        }}
                      >
                        <ToolIcon
                          className="h-5 w-5"
                          style={{ color: tool.accent }}
                        />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-700 ring-1 ring-amber-200/60">
                        <Crown className="h-2.5 w-2.5" />
                        PRO
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-1.5 text-base font-bold leading-tight text-gray-900 group-hover:text-gray-900 sm:text-[15px]">
                      {tool.name}
                    </h3>
                    <p className="mb-4 text-[13px] leading-relaxed text-gray-500 line-clamp-2">
                      {tool.desc}
                    </p>

                    {/* Feature list */}
                    <ul className="mb-4 space-y-1.5 border-t border-gray-100 pt-4">
                      {tool.features?.slice(0, 3).map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[11px] text-gray-600"
                        >
                          <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#075a01]" />
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-1">
                      <span
                        className="flex items-center gap-1 text-xs font-bold"
                        style={{ color: tool.accent }}
                      >
                        Try free
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        {tool.category}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════
          FREE TOOLS — Grid, dense, sleek
      ══════════════════════════════════ */}
      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-8 flex items-end justify-between border-b border-gray-100 pb-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-900">
                  <Wrench className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                  Free Forever
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                No signup. Just open and use.
              </h2>
            </div>
            <span className="hidden text-sm font-semibold text-gray-400 sm:inline">
              {freeTools.length} tools
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {freeTools.map((tool) => {
              const ToolIcon = TOOL_ICONS[tool.slug] || Wrench;
              return (
                <Link
                  key={tool.slug}
                  href={tool.href || `/tools/${tool.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:p-5"
                >
                  {/* Popular badge */}
                  {tool.popular && (
                    <div className="absolute right-3 top-3 z-10">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${tool.accent}15, ${tool.accent}08)`,
                      border: `1px solid ${tool.accent}20`,
                    }}
                  >
                    <ToolIcon
                      className="h-4 w-4"
                      style={{ color: tool.accent }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 text-sm font-bold leading-tight text-gray-900 line-clamp-2">
                    {tool.name}
                  </h3>
                  <p className="mb-3 text-[11px] leading-relaxed text-gray-500 line-clamp-2">
                    {tool.desc}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider"
                      style={{ color: tool.accent }}
                    >
                      {tool.category}
                    </span>
                    <ArrowRight
                      className="h-3 w-3 transition-all group-hover:translate-x-0.5"
                      style={{ color: tool.accent }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════
          BIG CTA — Sleek dark card
      ══════════════════════════════════ */}
      <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black p-8 shadow-2xl sm:p-14 lg:p-16">
            {/* Decor */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#075a01]/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#ff914d]/20 blur-3xl" />

            {/* Grid pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur-sm">
                  <Rocket className="h-3 w-3 text-[#ff914d]" />
                  <span className="text-xs font-semibold text-white/90">
                    Need something custom?
                  </span>
                </div>
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                  Let's build the
                  <br />
                  tool <span className="text-[#ff914d]">you need.</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                  We build custom AI tools, dashboards, and internal tools for
                  agencies, startups, and enterprises. Let's talk.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl lg:w-full lg:max-w-xs"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/2349034360785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 lg:w-full lg:max-w-xs"
                >
                  <Grid3x3 className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}