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
} from "lucide-react";

const CATEGORY_ICONS = {
  All: Sparkles,
  "AI Tools": Zap,
  SEO: Search,
  Writing: FileText,
  Security: Lock,
  Business: TrendingUp,
  Utilities: Wrench,
  Design: Star,
  "Social Media": Mail,
  Marketing: TrendingUp,
  Strategy: Star,
  "Email Marketing": Mail,
  Optimization: CheckCircle2,
};

const STATUS_STYLES = {
  Live: "bg-green-100 text-green-700",
  "Coming Soon": "bg-orange-100 text-orange-700",
  "In Development": "bg-blue-100 text-blue-700",
};

export const metadata = {
  title: "Free Digital Tools + AI Tools | Fancy Digitals",
  description:
    "Free online tools for SEO, marketing, branding, and AI-powered resume building. No sign-up for free tools. AI tools include resume builder, cover letter generator, and more.",
  keywords: [
    "free online tools",
    "ai resume builder",
    "free seo tools",
    "ai cover letter generator",
    "digital tools",
    "marketing tools free",
  ],
};

export default function ToolsPage() {
  const published = tools
    .filter((t) => t.published)
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  const aiTools = published.filter((t) => t.isAI && t.isLive);
  const freeTools = published.filter((t) => !t.isAI);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* BG decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#075a01]/8 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#ff914d]/8 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* HERO */}
      <section className="relative px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Link href="/" className="text-xs sm:text-sm text-gray-500 hover:text-[#075a01]">
                Home
              </Link>
              <ArrowRight className="h-3 w-3 text-gray-300" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900">Tools</span>
            </div>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs sm:text-sm font-bold text-green-700">
                {published.filter((t) => t.isLive).length} tools live now
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Tools that{" "}
              <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                save time
              </span>
              <br className="sm:hidden" /> &amp; help you{" "}
              <span className="bg-gradient-to-r from-[#ff914d] to-[#f97316] bg-clip-text text-transparent">
                ship faster
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Free practical tools. AI-powered assistants. No sign-up for free tools.
            </p>
          </div>
        </div>
      </section>

      {/* AI TOOLS SECTION */}
      {aiTools.length > 0 && (
        <section className="relative px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10">
          <div className="mx-auto max-w-6xl">
            {/* Section heading */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    AI-Powered Tools
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Premium AI features. Free to try.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 px-3 py-1 text-xs font-bold text-amber-700">
                <Crown className="h-3 w-3" />
                FEATURED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-2">
  {aiTools.map((tool) => (
    <Link
      key={tool.slug}
      href={tool.href || `/dashboard/tools/${tool.slug}`}
      className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-[#075a01]/30"
    >
      <div
        className="h-1.5 sm:h-2"
        style={{ background: `linear-gradient(to right, ${tool.accent}, ${tool.accent}aa)` }}
      />

      <div className="p-3 sm:p-5 md:p-6">
        {/* Icon + Title stacked on mobile */}
        <div className="mb-2 sm:mb-3">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div
              style={{ background: `linear-gradient(135deg, ${tool.accent}, ${tool.accent}cc)` }}
              className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl"
            >
              {tool.slug === "ai-resume-builder" && <FileText className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />}
              {tool.slug === "ai-cover-letter" && <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />}
            </div>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-gradient-to-r from-amber-100 to-yellow-100 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-amber-700">
              <Crown className="h-2.5 w-2.5" />
              PRO
            </span>
          </div>

          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight">
            {tool.name}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-snug sm:leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
          {tool.desc}
        </p>

        {/* Features — hidden on mobile, shown sm+ */}
        <ul className="hidden sm:block mb-4 sm:mb-5 space-y-1.5">
          {tool.features?.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#075a01] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          style={{
            background: `linear-gradient(to right, ${tool.accent}, ${tool.accent}dd)`,
            color: "#fff",
          }}
          className="flex items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold group-hover:opacity-90 transition"
        >
          <span className="truncate">
            <span className="sm:hidden">Try Free</span>
            <span className="hidden sm:inline">Start Building Free</span>
          </span>
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  ))}
</div>
          </div>
        </section>
      )}

      {/* FREE TOOLS GRID */}
      <section className="relative px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 shrink-0">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Free Tools
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                No sign-up. Just open and use.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3">
  {freeTools.map((tool) => {
    const CategoryIcon = CATEGORY_ICONS[tool.category] || Wrench;

    return (
      <Link
        key={tool.slug}
        href={tool.href || `/tools/${tool.slug}`}
        className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
      >
        {/* Popular badge — smaller on mobile */}
        {tool.popular && (
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold text-amber-700">
              <Star className="h-2 w-2 sm:h-2.5 sm:w-2.5 fill-current" />
              <span className="hidden sm:inline">POPULAR</span>
              <span className="sm:hidden">HOT</span>
            </span>
          </div>
        )}

        <div className="p-3 sm:p-5">
          {/* Icon */}
          <div className="mb-2 sm:mb-3">
            <div
              style={{
                background: `linear-gradient(135deg, ${tool.accent}20, ${tool.accent}10)`,
                color: tool.accent,
              }}
              className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg mb-2"
            >
              <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            {/* Category + Status */}
            <div className="flex flex-wrap items-center gap-1.5">
              <p
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
                style={{ color: tool.accent }}
              >
                {tool.category}
              </p>
              <span
                className={`inline-block rounded px-1 py-0 text-[8px] sm:text-[9px] font-bold ${STATUS_STYLES[tool.status]}`}
              >
                {tool.status}
              </span>
            </div>
          </div>

          {/* Name + Desc */}
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
            {tool.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 leading-snug line-clamp-2 mb-3 sm:mb-4">
            {tool.desc}
          </p>

          {/* CTA Row */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
            <span
              className="flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs font-bold"
              style={{ color: tool.accent }}
            >
              {tool.isLive ? "Use" : "Learn"}
              <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold text-green-700 bg-green-100 px-1 sm:px-1.5 py-0 sm:py-0.5 rounded">
              FREE
            </span>
          </div>
        </div>
      </Link>
    );
  })}
</div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-8 text-center shadow-2xl sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ff914d]/20 blur-3xl" />

            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Need a custom tool?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                We build custom digital tools for businesses. Let&apos;s discuss your idea.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Discuss Your Idea
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/2349034360785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
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