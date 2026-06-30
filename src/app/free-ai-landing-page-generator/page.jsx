import Link from "next/link";
import {
  Globe, Sparkles, Check, Star, ArrowRight, Zap, Crown,
  Shield, Clock, TrendingUp, Users, Award, Target,
  Palette, Languages, Mail, BarChart2, FileText,
  MessageSquare, Image, CreditCard, Layout, Megaphone,
} from "lucide-react";

const BASE_URL = "https://fancydigitals.com.ng";
const TOOL_URL = "/dashboard/tools/ai-landing-page-generator";

import Schema from "@/components/Schema";
import {
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export const metadata = {
  title: "Free AI Landing Page Generator — Build & Publish in 60 Seconds",
  description:
    "Generate a complete, professional landing page with AI in 60 seconds. Custom branding, lead capture, pricing tables, FAQs, testimonials & more. Free to try.",
  keywords: [
    "ai landing page generator",
    "free landing page generator",
    "ai landing page builder",
    "landing page generator free",
    "ai page builder",
    "landing page creator ai",
    "free ai website builder",
    "landing page maker free",
    "ai website generator",
    "generate landing page ai",
    "free landing page builder no code",
    "ai powered landing page",
    "landing page generator no code",
    "best ai landing page generator",
    "publish landing page free",
  ],
  alternates: { canonical: `${BASE_URL}/free-ai-landing-page-generator` },
  openGraph: {
    title: "Free AI Landing Page Generator — Build & Publish in 60 Seconds",
    description: "AI builds your entire landing page from a description. Publish live instantly. Free to try.",
    url: `${BASE_URL}/free-ai-landing-page-generator`,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Landing Page Generator",
    description: "Build and publish a full landing page with AI in 60 seconds. Free.",
  },
};

export default function FreeAILandingPageGeneratorPage() {
  // Schemas — using centralized library
  const softwareSchema = softwareApplicationSchema({
    name: "Fancy Digitals AI Landing Page Generator",
    description: "Free AI landing page generator. Describe your business, pick a tone and language, and get a fully written, publishable landing page in 60 seconds. Supports 6 visual tones, 5 languages, lead capture, custom pricing tables, FAQs, testimonials, and instant publishing.",
    slug: "free-ai-landing-page-generator",
    category: "BusinessApplication",
    price: "0",
  });

  const faqSchemaData = faqSchema(FAQS.map((f) => ({ question: f.q, answer: f.a })));

  const breadcrumbData = breadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Free AI Tools", url: `${BASE_URL}/tools` },
    { name: "AI Landing Page Generator", url: `${BASE_URL}/free-ai-landing-page-generator` },
  ]);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Generate a Landing Page with AI in 60 Seconds",
    description: "Step-by-step guide to creating a complete, conversion-optimized landing page using AI in under a minute.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Describe your business",
        text: "Enter your business name, what you offer, and who your audience is.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Pick your sections",
        text: "Choose tone, language, and which sections to include — FAQ, pricing, testimonials, and more.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Generate and publish",
        text: "AI writes the full page. Preview it, then publish live at your own URL in one click.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <Schema data={softwareSchema} />
      <Schema data={faqSchemaData} />
      <Schema data={howToSchema} />
      <Schema data={breadcrumbData} />

      {/* ============ HERO ============ */}
      <section className="relative px-4 pt-12 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#075a01]/5 via-white to-white" />
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#075a01]/10 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-64 w-64 rounded-full bg-[#ff914d]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 mb-5 text-xs font-bold text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                FREE — No Code. No Designer. Just AI.
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                AI{" "}
                <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  Landing Page Generator
                </span>{" "}
                that Converts
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Describe your business. AI writes your entire landing page —
                hero, features, pricing, FAQ, testimonials, lead capture — and
                publishes it live. Done in 60 seconds.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#075a01]" />
                  No coding
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#075a01]" />
                  No designer
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#075a01]" />5 tones & 5 languages
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#075a01]" />
                  Publish live instantly
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href={TOOL_URL}
                  style={{
                    background: "linear-gradient(to right, #075a01, #0a8f01)",
                    color: "#fff",
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold hover:opacity-90 active:scale-95 transition shadow-lg"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate My Landing Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                >
                  See How It Works
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center lg:justify-start gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">4.9/5</strong> from 1,200+ users
                </span>
              </div>
            </div>

            {/* RIGHT — mock landing page preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl bg-white border-2 border-gray-100 shadow-2xl overflow-hidden">
                {/* Browser bar */}
                <div className="bg-gray-50 px-4 py-2 flex items-center gap-1.5 border-b border-gray-100">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 flex-1 rounded bg-gray-200 h-4 text-[10px] text-gray-400 flex items-center px-2">
                    fancydigitals.com.ng/p/your-business
                  </span>
                </div>

                {/* Mock page content */}
                <div className="bg-gradient-to-b from-[#075a01]/8 to-white p-5">
                  {/* Nav */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                    <div className="h-3 w-20 rounded bg-[#075a01]" />
                    <div className="h-6 w-16 rounded-lg bg-[#075a01] text-white text-[9px] flex items-center justify-center font-bold">
                      Get Started
                    </div>
                  </div>
                  {/* Hero */}
                  <div className="text-center mb-4">
                    <div className="h-2 w-16 rounded bg-[#ff914d]/60 mx-auto mb-2" />
                    <div className="h-4 w-3/4 rounded bg-gray-900 mx-auto mb-1" />
                    <div className="h-4 w-2/3 rounded bg-gray-900 mx-auto mb-3" />
                    <div className="h-2 w-full rounded bg-gray-300 mx-auto mb-1" />
                    <div className="h-2 w-5/6 rounded bg-gray-300 mx-auto mb-4" />
                    <div className="h-8 w-28 rounded-xl bg-[#075a01] mx-auto" />
                  </div>
                  {/* Features */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl bg-white border border-gray-100 p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-lg bg-[#075a01]/20 mb-1.5" />
                        <div className="h-2 w-full rounded bg-gray-300 mb-1" />
                        <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                      </div>
                    ))}
                  </div>
                  {/* Pricing */}
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`rounded-xl p-2 border ${i === 2 ? "border-[#075a01] bg-[#075a01]/5 shadow-md" : "border-gray-100 bg-white"}`}
                      >
                        <div className="h-2 w-10 rounded bg-gray-300 mb-1" />
                        <div className="h-3 w-8 rounded bg-gray-900 mb-1.5" />
                        <div className="h-1.5 w-full rounded bg-gray-200 mb-0.5" />
                        <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-[#ff914d] to-orange-600 rounded-2xl px-3 py-2 shadow-xl">
                  <p className="text-[10px] font-bold text-white">GENERATED IN</p>
                  <p className="text-2xl font-black text-white">60s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="border-y border-gray-100 bg-gray-50 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">5K+</p>
              <p className="text-xs text-gray-500 mt-1">Pages Generated</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">60s</p>
              <p className="text-xs text-gray-500 mt-1">Avg Generation Time</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">5</p>
              <p className="text-xs text-gray-500 mt-1">Languages Supported</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">4.9★</p>
              <p className="text-xs text-gray-500 mt-1">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section
        id="how-it-works"
        className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#075a01]/10 px-3 py-1 mb-3 text-xs font-bold text-[#075a01]">
              <Zap className="h-3 w-3" />
              SIMPLE PROCESS
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Your landing page in{" "}
              <span className="text-[#075a01]">3 simple steps</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              No design skills. No copywriting. No code. Just describe your
              business and go.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#075a01]/30 to-transparent" />
                )}
                <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition">
                  <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white text-lg sm:text-2xl font-bold mb-3 sm:mb-4 mx-auto">
                    {i + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={TOOL_URL}
              style={{
                background: "linear-gradient(to right, #075a01, #0a8f01)",
                color: "#fff",
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold hover:opacity-90 transition"
            >
              Generate My Page Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTIONS YOU GET ============ */}
      <section className="px-4 py-16 bg-gray-50 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff914d]/10 px-3 py-1 mb-3 text-xs font-bold text-[#ff914d]">
              <Layout className="h-3 w-3" />9 POWERFUL SECTIONS
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Everything a high-converting page needs,{" "}
              <span className="text-[#075a01]">written by AI</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Every section is AI-written based on your business. Toggle what
              you need. Skip what you don&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SECTIONS.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  <s.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{s.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TONES ============ */}
      <section className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 mb-3 text-xs font-bold text-purple-700">
              <Palette className="h-3 w-3" />5 DESIGN TONES
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Five completely different{" "}
              <span className="text-[#075a01]">visual styles</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Same business. Five looks. Each tone changes the typography,
              layout, spacing, and visual personality of your page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {TONES.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 p-5 hover:shadow-md transition"
                style={{ borderColor: `${t.color}30`, background: `${t.color}06` }}
              >
                <div
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl mb-3 text-white text-xs font-black"
                  style={{ background: t.color }}
                >
                  {t.letter}
                </div>
                <h3
                  className="font-bold text-gray-900 mb-1"
                  style={{ fontFamily: t.font }}
                >
                  {t.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LANGUAGES ============ */}
      <section className="px-4 py-16 bg-gray-50 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 mb-4 text-xs font-bold text-blue-700">
                <Languages className="h-3 w-3" />
                MULTILINGUAL AI
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Generate your page in{" "}
                <span className="text-[#075a01]">5 languages</span>
              </h2>
              <p className="text-gray-600 mb-6">
                AI writes your entire landing page natively in the language you
                choose — not translated, but written from scratch. Arabic pages
                even render right-to-left automatically.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl bg-white border border-gray-100 p-3 shadow-sm"
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {lang.name}
                      </p>
                      <p className="text-[10px] text-gray-500">{lang.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/10 to-[#075a01]/10 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl bg-white border border-gray-100 shadow-xl p-6 space-y-3">
                {LANGUAGE_PREVIEW.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-100 p-3"
                    dir={item.rtl ? "rtl" : "ltr"}
                  >
                    <p className="text-[10px] font-bold text-gray-400 mb-1">
                      {item.lang}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY USE ============ */}
      <section className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Why use our{" "}
              <span className="text-[#075a01]">AI Landing Page Generator?</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Built for founders, marketers, and agencies who need results fast
              — not a $5,000 website project.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 lg:p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${b.color}, ${b.color}cc)`,
                  }}
                  className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl mb-2 sm:mb-3"
                >
                  <b.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug sm:leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES CHECKLIST ============ */}
      <section className="px-4 py-16 bg-gray-50 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Everything included,{" "}
              <span className="text-[#075a01]">nothing extra to pay for</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white p-2.5 sm:p-4 border border-gray-100"
              >
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-[#075a01]/10">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#075a01]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">
                    {f.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 leading-snug">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Fancy Digitals vs{" "}
              <span className="text-gray-500">Other Page Builders</span>
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-bold text-gray-900">
                    Feature
                  </th>
                  <th className="text-center p-4 text-sm font-bold text-[#075a01]">
                    Fancy Digitals
                  </th>
                  <th className="text-center p-4 text-sm font-bold text-gray-500 hidden sm:table-cell">
                    Unbounce
                  </th>
                  <th className="text-center p-4 text-sm font-bold text-gray-500 hidden sm:table-cell">
                    Leadpages
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 text-sm text-gray-700">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.us === true ? (
                        <Check className="h-5 w-5 text-[#075a01] mx-auto" />
                      ) : row.us === false ? (
                        <span className="text-gray-300">—</span>
                      ) : (
                        <span className="text-xs font-bold text-[#075a01]">
                          {row.us}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      {row.them1 === true ? (
                        <Check className="h-5 w-5 text-gray-400 mx-auto" />
                      ) : row.them1 === false ? (
                        <span className="text-red-400">✕</span>
                      ) : (
                        <span className="text-xs text-gray-500">{row.them1}</span>
                      )}
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      {row.them2 === true ? (
                        <Check className="h-5 w-5 text-gray-400 mx-auto" />
                      ) : row.them2 === false ? (
                        <span className="text-red-400">✕</span>
                      ) : (
                        <span className="text-xs text-gray-500">{row.them2}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="px-4 py-16 bg-gray-50 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Perfect for{" "}
              <span className="text-[#075a01]">every kind of business</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {USE_CASES.map((u, i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 border border-gray-100 text-center hover:shadow-md transition"
              >
                <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#075a01]/10 mb-2 sm:mb-3">
                  <u.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#075a01]" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-tight">
                  {u.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Frequently asked{" "}
              <span className="text-[#075a01]">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl bg-white border border-gray-200 p-4 hover:border-[#075a01]/30 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <p className="font-semibold text-gray-900 text-sm pr-4">
                    {faq.q}
                  </p>
                  <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 group-open:bg-[#075a01] group-open:text-white transition">
                    <span className="text-sm font-bold">+</span>
                  </div>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Your landing page is 60 seconds away
              </h2>
              <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
                Join 1,200+ founders and marketers who generate professional
                landing pages with AI — no designers, no developers, no waiting.
              </p>
              <Link
                href={TOOL_URL}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] hover:bg-gray-100 transition"
              >
                Generate My Landing Page — Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs text-white/70">
                No credit card required · Free to generate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section className="px-4 py-12 sm:px-6 lg:px-10 border-t border-gray-100">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Related Free AI Tools
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <Link
              href="/tools"
              className="rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-[#075a01] hover:bg-green-50/30 transition text-center"
            >
              <p className="text-[11px] sm:text-sm font-bold text-gray-900 leading-tight">
                All Tools
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                Browse the full toolkit
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============ DATA ============

const STEPS = [
  {
    title: "Describe Your Business",
    desc: "Enter your business name, what you offer, who your customers are, and your main goal.",
  },
  {
    title: "Choose Your Style",
    desc: "Pick a tone (Professional, Bold, Minimal, Playful, Friendly, Luxury), language, and which sections to include.",
  },
  {
    title: "Generate & Publish",
    desc: "AI writes the full page in 60 seconds. Preview it, then publish live at your own URL instantly.",
  },
];

const SECTIONS = [
  {
    icon: Megaphone,
    color: "#075a01",
    title: "Hero Section",
    desc: "AI-written headline, subheadline, and CTA button that speaks directly to your audience.",
  },
  {
    icon: Target,
    color: "#0369a1",
    title: "Problem & Features",
    desc: "Clearly states what problem you solve and how your product/service fixes it.",
  },
  {
    icon: CreditCard,
    color: "#7c3aed",
    title: "Pricing Tables",
    desc: "1–5 custom pricing tiers with features, CTAs, and popular badge. You set the prices.",
  },
  {
    icon: MessageSquare,
    color: "#f97316",
    title: "Testimonials",
    desc: "Upload real testimonials with photos, or let AI write realistic ones for you.",
  },
  {
    icon: FileText,
    color: "#ec4899",
    title: "FAQ Section",
    desc: "Write your questions — AI fills in honest, natural answers in your chosen language.",
  },
  {
    icon: Mail,
    color: "#22c55e",
    title: "Email Lead Capture",
    desc: "Built-in email form with CTA modal. Every lead is saved to your dashboard automatically.",
  },
  {
    icon: Image,
    color: "#f59e0b",
    title: "Team Section",
    desc: "Showcase your team with photos, roles, and AI-generated bios.",
  },
  {
    icon: BarChart2,
    color: "#06b6d4",
    title: "Social Proof Stats",
    desc: "Display your key numbers — customers served, success rate, years in business.",
  },
  {
    icon: Globe,
    color: "#8b5cf6",
    title: "Custom Footer & Chat",
    desc: "Footer with social links, address, phone. Optional Tawk.to live chat integration.",
  },
];

const TONES = [
  {
    name: "Professional",
    letter: "P",
    color: "#075a01",
    font: "system-ui",
    desc: "Clean, structured, corporate. Perfect for SaaS, consulting, and B2B businesses.",
  },
  {
    name: "Bold",
    letter: "B",
    color: "#111827",
    font: "Inter",
    desc: "Massive type, high contrast, blocky design. Grabs attention. Great for launches.",
  },
  {
    name: "Minimal",
    letter: "M",
    color: "#6b7280",
    font: "Georgia",
    desc: "Lots of whitespace, serif fonts, elegant spacing. Ideal for creatives and agencies.",
  },
  {
    name: "Playful",
    letter: "P",
    color: "#f97316",
    font: "system-ui",
    desc: "Rounded, bubbly, energetic. Perfect for apps, kids products, and fun brands.",
  },
  {
    name: "Friendly",
    letter: "F",
    color: "#0369a1",
    font: "Inter",
    desc: "Warm, approachable, conversational. Works for coaches, therapists, and services.",
  },
  {
    name: "Luxury",
    letter: "L",
    color: "#c9a84c",
    font: "Georgia",
    desc: "Dark background, gold accents, elegant typography. Think Apple, Tesla, Rolex.",
  },
];

const LANGUAGES = [
  { flag: "🇬🇧", name: "English", note: "Free" },
  { flag: "🇪🇸", name: "Spanish", note: "Pro" },
  { flag: "🇫🇷", name: "French", note: "Pro" },
  { flag: "🇸🇦", name: "Arabic (RTL)", note: "Pro" },
  { flag: "🇩🇪", name: "German", note: "Pro" },
];

const LANGUAGE_PREVIEW = [
  { lang: "English", text: "The fastest way to build your business online.", rtl: false },
  { lang: "Spanish", text: "La forma más rápida de hacer crecer tu negocio.", rtl: false },
  { lang: "French", text: "Le moyen le plus rapide de développer votre activité.", rtl: false },
  { lang: "Arabic", text: "أسرع طريقة لبناء أعمالك التجارية على الإنترنت.", rtl: true },
  { lang: "German", text: "Der schnellste Weg, Ihr Unternehmen online aufzubauen.", rtl: false },
];

const BENEFITS = [
  {
    icon: Zap,
    color: "#075a01",
    title: "Done in 60 Seconds",
    desc: "No writing, no designing. Describe your business and AI delivers a complete page in under a minute.",
  },
  {
    icon: Globe,
    color: "#0369a1",
    title: "Publish Live Instantly",
    desc: "Your page goes live at your own URL the second you hit publish. No hosting setup needed.",
  },
  {
    icon: Users,
    color: "#f97316",
    title: "Built-in Lead Capture",
    desc: "Every lead that fills your form is saved automatically. View, export, and manage from your dashboard.",
  },
  {
    icon: Palette,
    color: "#7c3aed",
    title: "Your Brand, Your Colors",
    desc: "Upload your logo, set your brand colors. AI adapts the entire page to match your identity.",
  },
  {
    icon: Shield,
    color: "#22c55e",
    title: "No Code Required",
    desc: "Zero technical knowledge needed. If you can type, you can build a landing page with Fancy Digitals.",
  },
  {
    icon: TrendingUp,
    color: "#ec4899",
    title: "Conversion-Focused Copy",
    desc: "AI writes like a human copywriter — specific, direct, and persuasive. No generic AI filler.",
  },
];

const FEATURES = [
  { title: "AI Copywriting", desc: "Full page written by AI from your description" },
  { title: "6 Visual Tones", desc: "Professional, Bold, Minimal, Playful, Friendly, Luxury" },
  { title: "5 Languages", desc: "English free · Spanish, French, Arabic, German on Pro" },
  { title: "Custom Pricing Tables", desc: "1–5 tiers with your own prices and features" },
  { title: "FAQ Generator", desc: "AI answers your questions in any language" },
  { title: "Testimonials + Photos", desc: "Upload real ones or let AI write realistic ones" },
  { title: "Team Section", desc: "Photos, roles, and AI-written bios" },
  { title: "Email Lead Capture", desc: "Forms with CTA modal + lead magnet download" },
  { title: "Lead Dashboard", desc: "View, manage, and export all your leads" },
  { title: "Brand Colors & Logo", desc: "Upload your logo and set brand colors (Pro)" },
  { title: "Video Embed", desc: "YouTube or Vimeo embed with AI-written context" },
  { title: "Live Chat (Tawk.to)", desc: "Connect your Tawk.to account with two fields" },
  { title: "Custom Footer", desc: "Social links, address, phone, copyright" },
  { title: "Arabic RTL Support", desc: "Full right-to-left layout for Arabic pages" },
  { title: "Publish Live URL", desc: "fancydigitals.com.ng/p/your-slug" },
  { title: "Instant Unpublish", desc: "Take any page down in one click" },
];

const COMPARISON = [
  { feature: "AI writes full page copy", us: true, them1: false, them2: false },
  { feature: "Free to generate", us: true, them1: false, them2: false },
  { feature: "Publish live instantly", us: true, them1: true, them2: true },
  { feature: "Built-in lead dashboard", us: true, them1: true, them2: true },
  { feature: "5 languages", us: true, them1: false, them2: false },
  { feature: "6 visual tones", us: true, them1: false, them2: false },
  { feature: "No monthly fee to start", us: true, them1: false, them2: false },
  { feature: "Starting price", us: "Free", them1: "$99/mo", them2: "$49/mo" },
];

const USE_CASES = [
  {
    icon: Target,
    title: "Founders & Startups",
    desc: "Validate your idea with a live page before spending on development",
  },
  {
    icon: Megaphone,
    title: "Marketers & Agencies",
    desc: "Launch campaigns in minutes, not days. Build pages for every client",
  },
  {
    icon: Award,
    title: "Freelancers",
    desc: "Professional landing page that gets you more clients and looks credible",
  },
  {
    icon: Crown,
    title: "Small Businesses",
    desc: "Affordable alternative to hiring a web designer. Publish today",
  },
];

const FAQS = [
  {
    q: "Is the AI landing page generator really free?",
    a: "You get 2 free page generations per day with a free account. Pro users get unlimited generations, plus brand colors, logo upload, multilingual pages, and publishing.",
  },
  {
    q: "Do I need coding or design skills?",
    a: "None at all. You describe your business in plain text, pick your options, and AI handles all the writing and design. If you can fill out a form, you can use this tool.",
  },
  {
    q: "How does the AI write my landing page?",
    a: "Our AI uses advanced language models (Google Gemini) trained on conversion copywriting principles. It reads your business description, audience, and goals — then writes specific, human-sounding copy tailored to your brand.",
  },
  {
    q: "Can I publish my landing page live?",
    a: "Yes. Pro users can publish their page live at fancydigitals.com.ng/p/your-slug in one click. The page is fully hosted — no domain, no server, nothing to set up.",
  },
  {
    q: "What languages does it support?",
    a: "English is free. Spanish, French, Arabic, and German are available on the Pro plan. Arabic pages automatically render right-to-left.",
  },
  {
    q: "How do I collect leads from my page?",
    a: "Enable the Email Capture section when generating. Visitors who fill the form are automatically saved to your Lead Dashboard. You can view, export to CSV, and manage all leads from there.",
  },
  {
    q: "Can I use my own branding?",
    a: "Yes. Pro users can upload a logo and set custom brand colors. The AI adapts the entire page to match your brand identity.",
  },
  {
    q: "What tones/styles are available?",
    a: "Six: Professional (clean SaaS look), Bold (high contrast, massive type), Minimal (elegant serif whitespace), Playful (rounded, energetic), Friendly (warm, approachable), and Luxury (dark, gold, Tesla/Apple-style).",
  },
  {
    q: "Can I edit the page after generating?",
    a: "Currently the tool regenerates the full page based on your updated inputs. Direct inline editing is available for Pro users in select sections and is being expanded.",
  },
  {
    q: "Does it work on mobile?",
    a: "Every generated landing page is fully mobile-optimized with a hamburger nav, sticky CTA bar, and responsive layout that looks great on any screen size.",
  },
];