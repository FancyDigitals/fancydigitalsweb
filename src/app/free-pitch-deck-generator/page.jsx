import Link from "next/link";
import { tools } from "@/content/tools";
import ToolAnalytics from "@/components/tools/ToolAnalytics";
import {
  Presentation,
  Sparkles,
  Zap,
  Layers,
  Palette,
  Share2,
  Download,
  Mail,
  Edit3,
  FileText,
  CheckCircle2,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";

const BASE_URL = "https://fancydigitals.com.ng";
const TOOL_SLUG = "ai-pitch-deck";

export const metadata = {
  title:
    "Free AI Pitch Deck Generator — Investor Decks, Proposals & Business Documents | Fancy Digitals",
  description:
    "Generate world-class pitch decks, investor decks, business proposals, media kits, and 40+ document types in seconds with AI. 8 premium themes, inline editing, custom logo, PDF export, shareable link. Free to start.",
  keywords: [
    "ai pitch deck generator",
    "free pitch deck generator",
    "ai pitch deck maker",
    "investor pitch deck ai",
    "startup pitch deck generator",
    "ai proposal generator",
    "business proposal generator",
    "ai presentation generator",
    "gamma alternative",
    "pitch com alternative",
    "beautiful ai alternative",
    "seed round pitch deck",
    "series a pitch deck ai",
    "ai media kit generator",
    "grant proposal generator ai",
    "professional pitch deck maker",
    "ai deck builder",
    "sales proposal generator",
    "company profile generator",
    "capability statement generator ai",
  ].join(", "),
  alternates: { canonical: `${BASE_URL}/free-pitch-deck-generator` },
  openGraph: {
    title:
      "Free AI Pitch Deck Generator — Investor Decks & Proposals in Seconds",
    description:
      "AI writes your entire pitch deck in 30 seconds. 40+ document types. 8 premium themes. Edit inline. Export PDF. Share instantly.",
    url: `${BASE_URL}/free-pitch-deck-generator`,
    siteName: "Fancy Digitals",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Pitch Deck Generator by Fancy Digitals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Pitch Deck Generator | Fancy Digitals",
    description:
      "AI writes your entire investor deck in 30 seconds. 8 premium themes. Free to start.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */

export default function PitchDeckLandingPage() {
  const tool = tools.find((t) => t.slug === TOOL_SLUG);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Pitch Deck Generator",
    description:
      "Generate world-class pitch decks, investor decks, business proposals, and 40+ document types in seconds with AI.",
    url: `${BASE_URL}/free-pitch-deck-generator`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "487",
    },
    publisher: {
      "@type": "Organization",
      name: "Fancy Digitals",
      url: BASE_URL,
    },
  };

  const faqSchema = tool?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Pitch Deck Generator",
        item: `${BASE_URL}/free-pitch-deck-generator`,
      },
    ],
  };

  const otherTools = tools
    .filter(
      (t) => t.published && t.isLive && t.isAI && t.slug !== TOOL_SLUG
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <ToolAnalytics toolName="AI Pitch Deck Generator (Landing)" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-24 pb-16 px-5 md:px-10">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-br from-violet-200/40 via-purple-200/30 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-1.5 shadow-sm mb-6">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700">
              New · AI Pitch Deck
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.05]">
            Investor-Ready Pitch Decks.
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Written by AI in 30 Seconds.
            </span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            Stop paying $2,000 for pitch deck designers. Generate professional
            pitch decks, investor decks, business proposals, and 40+ document
            types with AI. 8 premium themes. Edit inline. Export PDF.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/tools/ai-pitch-deck"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:shadow-xl hover:shadow-violet-600/40 hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Generate Your Deck Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Free to start
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              No credit card
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              40+ document types
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Export as PDF
            </div>
          </div>

          {/* Rating */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              4.9/5
            </span>
            <span className="text-sm text-gray-400">
              · 487+ founders trust it
            </span>
          </div>
        </div>

        {/* Preview mockup */}
        <div className="mx-auto max-w-5xl mt-16">
          <div className="relative rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-violet-600/10 overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <div className="ml-3 flex-1 rounded-md bg-white border border-gray-200 px-3 py-1 text-[10px] text-gray-400">
                fancydigitals.com.ng/dashboard/tools/ai-pitch-deck
              </div>
            </div>

            {/* Fake pitch deck preview */}
            <div className="p-8 sm:p-14 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-auto">
                  01 / 12
                </div>
              </div>

              <div className="relative space-y-3">
                <div className="h-1 w-20 rounded-full bg-white/60" />
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                  Acme Ventures
                </h2>
                <p className="text-lg text-white/90 font-medium max-w-xl">
                  The Future of AI-Powered Commerce
                </p>
                <p className="text-sm text-white/60 max-w-md pt-2">
                  A Series A investor deck · Q4 2026
                </p>
              </div>

              <div className="relative flex items-end justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
                <div>
                  <p className="mb-1 opacity-60">Presented by</p>
                  <p className="text-sm normal-case tracking-normal font-semibold text-white/80">
                    Fancy Digitals
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1 opacity-60">Confidential</p>
                  <p className="text-sm normal-case tracking-normal font-semibold text-white/80">
                    2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY THIS EXISTS ═══ */}
      <section className="px-5 md:px-10 py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
              The problem
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              Great ideas die in bad decks.
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base text-gray-600 leading-relaxed">
              Investors decide in the first 3 slides. Agencies charge $2,000+.
              Freelancers take weeks. Templates look generic. Meanwhile your
              round closes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "3 weeks with a designer",
                body: "Endless revisions. Missed deadlines. Missed rounds.",
              },
              {
                icon: FileText,
                title: "Generic Canva templates",
                body: "Investors have seen the same 5 templates 1,000 times.",
              },
              {
                icon: Shield,
                title: "$2,000+ from an agency",
                body: "Great work, but not budget-friendly for early stage.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 mb-4">
                  <Icon className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section
        id="how-it-works"
        className="px-5 md:px-10 py-20 bg-[#fafafa]"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
              How it works
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              From idea to investor-ready in 30 seconds.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />

            {[
              {
                step: "01",
                title: "Describe your business",
                body: "Enter your business name, problem, solution, market, and funding ask. AI does the rest.",
              },
              {
                step: "02",
                title: "AI writes every slide",
                body: "Choose your document type and theme. AI generates a professional, strategic deck in 30 seconds.",
              },
              {
                step: "03",
                title: "Edit, export & send",
                body: "Click any text to edit inline. Add your logo. Export PDF or share the link with investors.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white font-black text-lg shadow-lg shadow-violet-600/30">
                  {step}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/dashboard/tools/ai-pitch-deck"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Start Generating Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 40+ DOCUMENT TYPES ═══ */}
      <section className="px-5 md:px-10 py-20 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
              40+ document types
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              One tool. Every document you'll ever need.
            </h2>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Startup Pitch Deck",
              "Investor Deck",
              "Seed Round Deck",
              "Series A Deck",
              "Business Proposal",
              "Partnership Proposal",
              "Agency Proposal",
              "Sales Proposal",
              "Company Profile",
              "Business Plan",
              "Executive Summary",
              "Product Launch Deck",
              "Marketing Proposal",
              "PR Kit",
              "Media Kit",
              "Press Release",
              "Capability Statement",
              "Case Study",
              "Portfolio Presentation",
              "Company One Pager",
              "Funding Request",
              "Project Proposal",
              "Service Proposal",
              "Consulting Proposal",
              "Grant Proposal",
              "Government Proposal",
              "NGO Proposal",
              "Investor Update",
              "Annual Report",
              "Quarterly Report",
              "Board Presentation",
              "Product Roadmap",
              "Vision Deck",
              "Customer Success Deck",
              "Training Deck",
              "Course Deck",
            ].map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-700 hover:border-violet-200 hover:bg-violet-50 transition"
              >
                <CheckCircle2 className="h-3 w-3 text-violet-600 shrink-0" />
                <span className="truncate">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THEMES SHOWCASE ═══ */}
      <section className="px-5 md:px-10 py-20 bg-[#fafafa]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
              8 premium themes
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              World-class design.
              <br />
              Without a designer.
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base text-gray-600">
              Each theme has real visual identity — inspired by Apple, Vercel,
              Bloomberg, YC, Rolex, Linear, Behance, and Goldman Sachs.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {[
              { name: "Minimal", desc: "Apple-clean", bg: "bg-white", border: "border-neutral-200", text: "text-neutral-900" },
              { name: "Dark", desc: "Vercel-modern", bg: "bg-neutral-950", border: "border-neutral-800", text: "text-white" },
              { name: "Corporate", desc: "Bloomberg", bg: "bg-gradient-to-br from-blue-950 to-blue-900", border: "border-blue-900", text: "text-white" },
              { name: "Startup", desc: "YC vibe", bg: "bg-gradient-to-br from-violet-600 to-fuchsia-600", border: "border-violet-500", text: "text-white" },
              { name: "Luxury", desc: "Rolex-refined", bg: "bg-[#0a0805]", border: "border-amber-900/40", text: "text-amber-100" },
              { name: "Modern", desc: "Linear-fresh", bg: "bg-[#0a0a0f]", border: "border-sky-900/40", text: "text-sky-300" },
              { name: "Creative", desc: "Behance-bold", bg: "bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400", border: "border-orange-300", text: "text-white" },
              { name: "Finance", desc: "Goldman", bg: "bg-gradient-to-br from-emerald-950 to-green-900", border: "border-emerald-900", text: "text-white" },
            ].map((theme) => (
              <div
                key={theme.name}
                className={`aspect-[4/5] rounded-2xl border-2 ${theme.border} ${theme.bg} p-4 flex flex-col justify-between shadow-md hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className={`text-[9px] font-bold uppercase tracking-widest ${theme.text} opacity-60`}>
                  Cover
                </div>
                <div>
                  <div className="h-0.5 w-8 rounded bg-current opacity-40 mb-2" />
                  <p className={`text-lg font-black ${theme.text} leading-tight`}>
                    {theme.name}
                  </p>
                  <p className={`text-[10px] ${theme.text} opacity-60 mt-1`}>
                    {theme.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES GRID ═══ */}
      <section className="px-5 md:px-10 py-20 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
              Everything included
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              Features that make it feel unfair.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "30-Second AI Generation",
                body: "AI writes every slide with real strategic content — problem, solution, market, traction, team, ask.",
              },
              {
                icon: Edit3,
                title: "Inline Editing",
                body: "Click any text on any slide to edit directly. Everything auto-saves as you type.",
              },
              {
                icon: Layers,
                title: "Add, Remove, Reorder Slides",
                body: "Total control over your deck structure. Move slides left or right. Delete what you don't need.",
              },
              {
                icon: Palette,
                title: "Custom Logo & Brand Color",
                body: "Upload your logo with 6 placement options. Set your brand color. Every slide instantly branded.",
              },
              {
                icon: Share2,
                title: "Shareable Public Link",
                body: "Send investors a link. They view your deck online, download PDF, no signup needed.",
              },
              {
                icon: Download,
                title: "PDF Export",
                body: "Print-ready PDF export. Perfect for email attachments, DocSend, or investor portals.",
              },
              {
                icon: Mail,
                title: "AI-Written Email",
                body: "AI generates a personalized outreach email you can send from any email client in one click.",
              },
              {
                icon: FileText,
                title: "Speaker Notes",
                body: "Every slide includes professional speaker notes to guide your presentation.",
              },
              {
                icon: Sparkles,
                title: "9 Professional Tones",
                body: "Investor, Corporate, Startup, Luxury, Creative — match the exact voice your audience expects.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-violet-200 hover:shadow-md transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 mb-4">
                  <Icon className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON ═══ */}
      <section className="px-5 md:px-10 py-20 bg-[#fafafa]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
              Why founders choose us
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              vs. Gamma, Pitch.com, Beautiful.ai
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider">
                    Fancy Digitals
                  </th>
                  <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider opacity-70">
                    Gamma
                  </th>
                  <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider opacity-70">
                    Pitch
                  </th>
                  <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider opacity-70">
                    Beautiful.ai
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["40+ document types", true, false, false, false],
                  ["AI writes strategic content", true, true, false, true],
                  ["8 premium themes", true, true, true, true],
                  ["Inline editing", true, true, true, true],
                  ["Custom logo with 6 positions", true, false, false, false],
                  ["Shareable public link", true, true, true, true],
                  ["AI-written outreach email", true, false, false, false],
                  ["Speaker notes on every slide", true, false, false, false],
                  ["Free plan available", true, true, true, false],
                  ["Full deck in 30 seconds", true, true, false, false],
                ].map(([feature, us, gamma, pitch, beautiful]) => (
                  <tr key={feature} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      {feature}
                    </td>
                    <td className="text-center px-4 py-3">
                      {us ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 inline" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="text-center px-4 py-3">
                      {gamma ? (
                        <CheckCircle2 className="h-5 w-5 text-gray-400 inline" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="text-center px-4 py-3">
                      {pitch ? (
                        <CheckCircle2 className="h-5 w-5 text-gray-400 inline" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="text-center px-4 py-3">
                      {beautiful ? (
                        <CheckCircle2 className="h-5 w-5 text-gray-400 inline" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ WHO IT'S FOR ═══ */}
      <section className="px-5 md:px-10 py-20 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
              Built for
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              Founders. Agencies. Anyone with a story.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Startup Founders", desc: "Raising seed, Series A, or Series B" },
              { title: "Accelerator Applicants", desc: "YC, Techstars, 500 Startups, MEST" },
              { title: "Agencies", desc: "Creating pitch decks for clients" },
              { title: "Consultants", desc: "Sending service proposals daily" },
              { title: "Sales Teams", desc: "Branded proposals that close deals" },
              { title: "Grant Applicants", desc: "Government, NGO, foundation funding" },
              { title: "PR Teams", desc: "Media kits and press releases" },
              { title: "Nonprofits", desc: "Pitching donors and sponsors" },
              { title: "Marketing Leaders", desc: "Campaign decks and strategy plans" },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                  <Users className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      {tool?.faq?.length > 0 && (
        <section className="px-5 md:px-10 py-20 bg-[#fafafa]">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                FAQ
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
                Everything you want to know.
              </h2>
            </div>

            <div className="space-y-3">
              {tool.faq.map((f, i) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
                  open={i === 0}
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 hover:bg-gray-50">
                    <h3 className="text-sm font-bold text-gray-900">{f.q}</h3>
                    <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FINAL CTA ═══ */}
      <section className="px-5 md:px-10 py-20 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-10 sm:p-14 text-center">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur mb-4">
                <Award className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Your next investor deck.
                <br />
                Ready in 30 seconds.
              </h2>
              <p className="mt-4 text-white/80 text-base max-w-xl mx-auto leading-relaxed">
                Stop overthinking. Stop paying designers. Generate your first
                deck free — no card required.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/dashboard/tools/ai-pitch-deck"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-violet-700 hover:bg-gray-100 shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate My Deck Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  See Pricing
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Free plan available
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  No credit card
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RELATED TOOLS ═══ */}
      {otherTools.length > 0 && (
        <section className="px-5 md:px-10 pb-20 bg-white">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-base font-bold text-gray-900">
              More AI tools from Fancy Digitals
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherTools.map((t) => (
                <Link
                  key={t.slug}
                  href={t.href}
                  className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-violet-200"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${t.accent}20` }}
                  >
                    <Sparkles
                      className="h-4 w-4"
                      style={{ color: t.accent }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-violet-600">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
                      {t.desc}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Live
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer band */}
      <footer className="border-t border-gray-100 bg-white px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Built by{" "}
            <Link
              href="/"
              className="font-semibold text-violet-600 hover:underline"
            >
              Fancy Digitals
            </Link>{" "}
            — The AI business operating system
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900"
            >
              All Tools
            </Link>
            <Link
              href="/dashboard/tools/ai-pitch-deck"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-xs font-bold text-white hover:opacity-90"
            >
              Start Free
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}