import Link from "next/link";
import {
  FileText,
  Sparkles,
  Check,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Globe,
  Building2,
  Lightbulb,
  BarChart3,
  Swords,
  Wallet,
  Rocket,
  Settings,
  TrendingUp,
  Briefcase,
  Users,
  Edit3,
  Share2,
  Target,
} from "lucide-react";

export const metadata = {
  title: "Free AI Business Plan Generator — Fancy Digitals",
  description:
    "Generate a complete, investor-ready business plan in 60 seconds using AI. Executive summary, market analysis, financial projections, go-to-market strategy and more. Free to try.",
  keywords: [
    "ai business plan generator",
    "free business plan generator",
    "business plan maker ai",
    "startup business plan generator",
    "business plan writer ai",
    "free business plan template",
    "business plan for investors",
    "sba business plan generator",
  ],
  openGraph: {
    title: "Free AI Business Plan Generator — Fancy Digitals",
    description:
      "Generate a complete, investor-ready business plan in 60 seconds using AI.",
    type: "website",
  },
};

const FEATURES = [
  {
    Icon: FileText,
    title: "Full 11-Section Business Plan",
    desc: "Executive summary, market analysis, competitive analysis, go-to-market strategy, financial projections and more — all written by AI.",
  },
  {
    Icon: Zap,
    title: "Ready in 60 Seconds",
    desc: "AI writes every section with real strategic depth. No placeholders, no filler, no templates to fill in manually.",
  },
  {
    Icon: Edit3,
    title: "Inline Editing",
    desc: "Click any section to edit inline. Every change auto-saves instantly to your account.",
  },
  {
    Icon: Share2,
    title: "Shareable Public Link",
    desc: "Share your business plan with investors, banks, or accelerators via a professional public link.",
  },
  {
    Icon: TrendingUp,
    title: "Financial Projections",
    desc: "AI generates realistic Year 1, 2, and 3 revenue projections, expense breakdowns, and funding requirements.",
  },
  {
    Icon: Target,
    title: "Multiple Plan Types",
    desc: "Startup, Small Business, SaaS, E-commerce, Service Business, and Nonprofit plans — each with tailored sections.",
  },
];

const PLAN_TYPES = [
  "Startup Plan",
  "Small Business Plan",
  "SaaS Business Plan",
  "E-commerce Plan",
  "Service Business Plan",
  "Nonprofit Plan",
  "Investor-Ready Plan",
  "Bank Loan Plan",
];

const SECTIONS = [
  { Icon: Star, name: "Executive Summary" },
  { Icon: Building2, name: "Company Overview" },
  { Icon: Lightbulb, name: "Problem & Solution" },
  { Icon: BarChart3, name: "Market Analysis" },
  { Icon: Swords, name: "Competitive Analysis" },
  { Icon: Wallet, name: "Business Model" },
  { Icon: Rocket, name: "Go-To-Market Strategy" },
  { Icon: Settings, name: "Operations Plan" },
  { Icon: TrendingUp, name: "Financial Projections" },
  { Icon: Briefcase, name: "Funding Requirements" },
  { Icon: Users, name: "Team" },
];

const FAQS = [
  {
    q: "Is the AI Business Plan Generator really free?",
    a: "Yes. You get 1 free business plan per day with no credit card required. Pro unlocks unlimited plans, all plan types, and priority AI generation.",
  },
  {
    q: "How long does it take to generate a plan?",
    a: "Usually 20–40 seconds. AI writes all sections with real strategic content — no placeholders, no filler.",
  },
  {
    q: "Can I edit the plan after it's generated?",
    a: "Yes. Click any section to edit inline. Every change auto-saves to your account.",
  },
  {
    q: "Can I share my plan with investors?",
    a: "Yes. Use the Share button to create a professional public link your investors or bank can view online.",
  },
  {
    q: "What types of business plans are supported?",
    a: "Startup, Small Business, SaaS, E-commerce, Service Business, Nonprofit — each tailored for investors, bank loans, accelerators, or internal planning.",
  },
  {
    q: "Does it include financial projections?",
    a: "Yes. AI generates Year 1, 2, and 3 revenue projections, expense breakdowns, and funding requirements with use of funds breakdown.",
  },
  {
    q: "Do you save my business plans?",
    a: "Yes. Every plan is saved to your account automatically. Access your full plan history anytime.",
  },
  {
    q: "Can I export as PDF?",
    a: "Yes. Use the Export PDF button in the preview to download a print-ready PDF version of your plan.",
  },
];

export default function FreeBusinessPlanGeneratorPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#075a01]/5 via-white to-[#0a8f01]/5 px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#075a01]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            AI Business Plan
            <span className="block bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
              Generator Free
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Generate a complete, investor-ready business plan in 60 seconds. AI
            writes your executive summary, market analysis, financial
            projections, competitive analysis, and go-to-market strategy
            automatically.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/tools/ai-business-plan-generator"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-3.5 text-sm font-bold text-white hover:from-[#064c01] hover:to-[#087a01] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#075a01]/25"
            >
              <FileText className="h-4 w-4" />
              Generate My Business Plan Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            {["No credit card required", "1 free plan per day", "Saved to your account", "Share with investors"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <Check className="h-3 w-3 text-[#075a01]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Everything inside your business plan
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              AI writes all {SECTIONS.length} sections with real, specific content
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SECTIONS.map((section) => (
              <div
                key={section.name}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#075a01]/10 shrink-0">
                  <section.Icon className="h-4 w-4 text-[#075a01]" />
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {section.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plan types ── */}
      <section className="px-4 sm:px-6 py-16 bg-gradient-to-br from-gray-50 to-[#075a01]/5">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            Built for every type of business
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Choose your plan type and AI tailors every section accordingly
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PLAN_TYPES.map((type) => (
              <span
                key={type}
                className="rounded-full border border-[#075a01]/20 bg-white px-4 py-2 text-sm font-semibold text-[#075a01]"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              More than a template
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              AI writes real content for your specific business — not generic filler
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#075a01]/10">
                  <f.Icon className="h-5 w-5 text-[#075a01]" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats banner ── */}
      <section className="px-4 sm:px-6 py-12 bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { Icon: Zap, value: "60 sec", label: "Generation time" },
              { Icon: FileText, value: "11", label: "Sections per plan" },
              { Icon: Globe, value: "7", label: "Business plan types" },
              { Icon: Shield, value: "Free", label: "No card required" },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.Icon className="h-6 w-6 mx-auto mb-2 text-white/80" />
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
              >
                <h3 className="text-sm font-bold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-4 sm:px-6 py-16 bg-gradient-to-br from-[#075a01]/5 to-[#0a8f01]/5">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Your business plan is 60 seconds away
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Join thousands of founders who used Fancy Digitals to build
            investor-ready business plans.
          </p>
          <Link
            href="/dashboard/tools/ai-business-plan-generator"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 text-sm font-bold text-white hover:from-[#064c01] hover:to-[#087a01] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#075a01]/25"
          >
            <FileText className="h-4 w-4" />
            Generate My Business Plan Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-gray-400">
            Free · No credit card · Saved to your account
          </p>
        </div>
      </section>
    </>
  );
}