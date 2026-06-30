import Link from "next/link";
import {
  Mail, Sparkles, Check, Star, ArrowRight, Zap, Crown,
  Shield, Globe, Clock, TrendingUp, Users, Award, Target,
  Briefcase, FileText, MessageSquare,
} from "lucide-react";

const BASE_URL = "https://fancydigitals.com.ng";

import Schema from "@/components/Schema";
import {
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export const metadata = {
  title: "Free AI Cover Letter Generator — No Sign-Up | Fancy Digitals",
  description:
    "Generate professional cover letters in 30 seconds with AI. ATS-optimized, tailored to any job, 4 tones available. 100% free, no credit card required.",
  keywords: [
    "free cover letter generator",
    "ai cover letter generator",
    "cover letter generator free no signup",
    "ai cover letter writer",
    "free cover letter builder",
    "cover letter maker free",
    "ai cover letter creator",
    "cover letter ai free",
    "best free cover letter generator",
    "professional cover letter generator",
    "cover letter generator chatgpt",
    "free cover letter template ai",
    "cover letter writing tool",
    "cover letter generator online free",
    "ai job application letter",
  ],
  alternates: { canonical: `${BASE_URL}/free-ai-cover-letter` },
  openGraph: {
    title: "Free AI Cover Letter Generator — Write in 30 Seconds",
    description: "AI-powered cover letter generator. Tailored to any job. 100% free, no sign-up required.",
    url: `${BASE_URL}/free-ai-cover-letter`,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Cover Letter Generator",
    description: "Write a winning cover letter in 30 seconds. AI-powered, free forever.",
  },
};

const TOOL_URL = "/dashboard/tools/ai-cover-letter";

export default function FreeAICoverLetterPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fancy Digitals AI Cover Letter Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (Web Browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1247",
      bestRating: "5",
    },
    description: "Free AI-powered cover letter generator with 4 tones, job tailoring, and instant download.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Write an AI Cover Letter in 30 Seconds",
    step: [
      { "@type": "HowToStep", name: "Enter job details", text: "Paste the job description and your background" },
      { "@type": "HowToStep", name: "Choose tone & length", text: "Pick from Professional, Enthusiastic, Direct, or Creative" },
      { "@type": "HowToStep", name: "Download instantly", text: "Get your tailored cover letter as PDF or HTML" },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ============ HERO ============ */}
      <section className="relative px-4 pt-8 pb-10 sm:px-6 sm:pt-16 sm:pb-14 lg:px-10 lg:pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#075a01]/5 via-white to-white" />
        <div className="absolute top-0 left-1/4 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[#075a01]/10 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[#ff914d]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* LEFT: Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#075a01]/10 px-3 py-1 mb-3 sm:mb-5 text-[10px] sm:text-xs font-bold text-[#075a01]">
                <Sparkles className="h-3 w-3" />
                FREE — Generate Unlimited
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Free <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">AI Cover Letter Generator</span> That Lands Interviews
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Write a winning cover letter in 30 seconds. AI-tailored to any job description. 4 professional tones. Free forever.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-500">
                <span className="flex items-center gap-1 sm:gap-1.5"><Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#075a01]" />100% Free</span>
                <span className="flex items-center gap-1 sm:gap-1.5"><Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#075a01]" />No Credit Card</span>
                <span className="flex items-center gap-1 sm:gap-1.5"><Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#075a01]" />Job-Tailored</span>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start">
                <Link
                  href={TOOL_URL}
                  style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-bold hover:opacity-90 active:scale-95 transition shadow-lg"
                >
                  <Sparkles className="h-4 w-4" />
                  Write My Cover Letter
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/free-ai-resume-builder"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition"
                >
                  <FileText className="h-4 w-4" />
                  Resume Builder
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-5 sm:mt-6 flex items-center justify-center lg:justify-start gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  <strong className="text-gray-900">4.9/5</strong> from 1,247+ users
                </span>
              </div>
            </div>

            {/* RIGHT: Mock Cover Letter */}
            <div className="relative mt-6 lg:mt-0">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl bg-white border-2 border-gray-100 shadow-2xl overflow-hidden max-w-md mx-auto">
                {/* Browser bar */}
                <div className="bg-gray-50 px-3 sm:px-4 py-2 flex items-center gap-1.5 border-b border-gray-100">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-400" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-400" />
                  <span className="ml-auto text-[9px] sm:text-[10px] text-gray-400">fancydigitals.com.ng</span>
                </div>
                {/* Mock cover letter */}
                <div className="p-4 sm:p-8 font-serif">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2">Dear Hiring Manager,</p>
                  <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                    <div className="h-1.5 sm:h-2 w-full rounded bg-gray-200" />
                    <div className="h-1.5 sm:h-2 w-5/6 rounded bg-gray-200" />
                    <div className="h-1.5 sm:h-2 w-full rounded bg-gray-200" />
                    <div className="h-1.5 sm:h-2 w-3/4 rounded bg-gray-200" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                    <div className="h-1.5 sm:h-2 w-full rounded bg-gray-200" />
                    <div className="h-1.5 sm:h-2 w-5/6 rounded bg-gray-200" />
                    <div className="h-1.5 sm:h-2 w-2/3 rounded bg-gray-200" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                    <div className="h-1.5 sm:h-2 w-full rounded bg-gray-200" />
                    <div className="h-1.5 sm:h-2 w-4/5 rounded bg-gray-200" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4">Sincerely,</p>
                  <div className="h-1.5 sm:h-2 w-1/3 rounded bg-gray-900 mt-1" />
                </div>
                {/* Floating tone badge */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-br from-[#075a01] to-[#0a8f01] rounded-xl sm:rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 shadow-xl">
                  <p className="text-[8px] sm:text-[10px] font-bold text-white">TONE</p>
                  <p className="text-[11px] sm:text-sm font-black text-white">Professional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="border-y border-gray-100 bg-gray-50 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div>
              <p className="text-xl sm:text-3xl font-bold text-[#075a01]">25K+</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Letters Generated</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold text-[#075a01]">4</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Tone Options</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold text-[#075a01]">30s</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Avg Generation</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold text-[#075a01]">4.9★</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#075a01]/10 px-3 py-1 mb-3 text-[10px] sm:text-xs font-bold text-[#075a01]">
              <Zap className="h-3 w-3" />
              SIMPLE PROCESS
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Write your cover letter in <span className="text-[#075a01]">3 simple steps</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-gray-600 max-w-xl mx-auto px-2">
              From blank page to interview-ready in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#075a01]/30 to-transparent" />
                )}
                <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition">
                  <div className="inline-flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white text-base sm:text-2xl font-bold mb-2 sm:mb-4 mx-auto">
                    {i + 1}
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">{step.title}</h3>
                  <p className="text-[11px] sm:text-sm text-gray-600 leading-snug sm:leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-10 text-center">
            <Link
              href={TOOL_URL}
              style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold hover:opacity-90 active:scale-95 transition"
            >
              Start Writing Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY USE — 2 cols mobile ============ */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Why use our <span className="text-[#075a01]">AI Cover Letter Generator?</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Built with the latest AI to write cover letters that get interviews.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 lg:p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
                <div
                  style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}cc)` }}
                  className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-lg sm:rounded-xl mb-2 sm:mb-3"
                >
                  <b.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h3 className="text-xs sm:text-base font-bold text-gray-900 mb-1 leading-tight">{b.title}</h3>
                <p className="text-[11px] sm:text-sm text-gray-600 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TONES SHOWCASE — 2x2 mobile ============ */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 mb-3 text-[10px] sm:text-xs font-bold text-amber-700">
              <Crown className="h-3 w-3" />
              4 TONE OPTIONS
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Match any <span className="text-[#075a01]">company culture</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Choose the tone that fits the company and role you're applying to.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
            {TONES.map((tone) => (
              <div key={tone.name} className="rounded-xl sm:rounded-2xl bg-white border-2 border-gray-100 p-3 sm:p-6 hover:border-[#075a01]/30 transition">
                <div
                  style={{ background: `linear-gradient(135deg, ${tone.color}, ${tone.color}cc)` }}
                  className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl mb-2 sm:mb-3"
                >
                  <tone.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 mb-1 leading-tight">{tone.name}</h3>
                <p className="text-[10px] sm:text-sm text-gray-600 leading-snug line-clamp-2 sm:line-clamp-none">{tone.desc}</p>
                <p className="mt-2 text-[9px] sm:text-xs text-[#075a01] font-bold leading-tight">
                  BEST FOR: {tone.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES — 2 cols mobile ============ */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Everything you need to write the <span className="text-[#075a01]">perfect cover letter</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white p-2.5 sm:p-4 border border-gray-100">
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-[#075a01]/10">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#075a01]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">{f.title}</p>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 leading-snug line-clamp-2">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Fancy Digitals vs <span className="text-gray-500">Other Tools</span>
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-2.5 sm:p-4 text-[11px] sm:text-sm font-bold text-gray-900">Feature</th>
                  <th className="text-center p-2.5 sm:p-4 text-[11px] sm:text-sm font-bold text-[#075a01]">Fancy Digitals</th>
                  <th className="text-center p-2.5 sm:p-4 text-[11px] sm:text-sm font-bold text-gray-500 hidden sm:table-cell">CoverLetter.io</th>
                  <th className="text-center p-2.5 sm:p-4 text-[11px] sm:text-sm font-bold text-gray-500 hidden sm:table-cell">Kickresume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2.5 sm:p-4 text-[11px] sm:text-sm text-gray-700">{row.feature}</td>
                    <td className="p-2.5 sm:p-4 text-center">
                      {row.us === true ? <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#075a01] mx-auto" /> :
                       row.us === false ? <span className="text-gray-300">—</span> :
                       <span className="text-[10px] sm:text-xs font-bold text-[#075a01]">{row.us}</span>}
                    </td>
                    <td className="p-2.5 sm:p-4 text-center hidden sm:table-cell">
                      {row.them1 === true ? <Check className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" /> :
                       row.them1 === false ? <span className="text-red-400">✕</span> :
                       <span className="text-xs text-gray-500">{row.them1}</span>}
                    </td>
                    <td className="p-2.5 sm:p-4 text-center hidden sm:table-cell">
                      {row.them2 === true ? <Check className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" /> :
                       row.them2 === false ? <span className="text-red-400">✕</span> :
                       <span className="text-xs text-gray-500">{row.them2}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ USE CASES — 2x2 mobile ============ */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Perfect for <span className="text-[#075a01]">every job seeker</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {USE_CASES.map((u, i) => (
              <div key={i} className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 border border-gray-100 text-center hover:shadow-md transition">
                <div className="inline-flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#075a01]/10 mb-2 sm:mb-3">
                  <u.icon className="h-4 w-4 sm:h-6 sm:w-6 text-[#075a01]" />
                </div>
                <h3 className="font-bold text-gray-900 text-[11px] sm:text-sm mb-1 leading-tight">{u.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Frequently asked <span className="text-[#075a01]">questions</span>
            </h2>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl bg-white border border-gray-200 p-3 sm:p-4 hover:border-[#075a01]/30 transition">
                <summary className="flex items-center justify-between cursor-pointer list-none gap-2">
                  <p className="font-semibold text-gray-900 text-[12px] sm:text-sm leading-snug">{faq.q}</p>
                  <div className="shrink-0 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-gray-100 group-open:bg-[#075a01] group-open:text-white transition">
                    <span className="text-xs sm:text-sm font-bold">+</span>
                  </div>
                </summary>
                <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-5 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-400/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm mb-2 sm:mb-4">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-white leading-tight">
                Ready to land your dream job?
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-base text-white/80 max-w-xl mx-auto px-2">
                Join 1,247+ professionals using AI to write cover letters that get interviews.
              </p>
              <Link
                href={TOOL_URL}
                className="mt-5 sm:mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-[#075a01] hover:bg-gray-100 active:scale-95 transition"
              >
                Write Cover Letter Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 sm:mt-4 text-[10px] sm:text-xs text-white/70">No credit card · Free forever · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-10 border-t border-gray-100">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-sm sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-center">Related Free AI Tools</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Link href="/free-ai-resume-builder" className="rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-[#075a01] hover:bg-[#075a01]/5 transition text-center">
              <p className="text-[10px] sm:text-sm font-bold text-gray-900 leading-tight">AI Resume Builder</p>
              <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 line-clamp-1">Build a winning resume</p>
            </Link>
            <Link href="/tools" className="rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-[#075a01] hover:bg-[#075a01]/5 transition text-center">
              <p className="text-[10px] sm:text-sm font-bold text-gray-900 leading-tight">All Tools</p>
              <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 line-clamp-1">Browse toolkit</p>
            </Link>
            <Link href="/pricing" className="rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-[#075a01] hover:bg-[#075a01]/5 transition text-center">
              <p className="text-[10px] sm:text-sm font-bold text-gray-900 leading-tight">Pro Pricing</p>
              <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 line-clamp-1">Unlock unlimited</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const STEPS = [
  { title: "Enter Job Details", desc: "Paste the job description and your background information." },
  { title: "Choose Tone", desc: "Pick from Professional, Enthusiastic, Direct, or Creative." },
  { title: "Download & Send", desc: "Get your tailored cover letter as PDF or HTML instantly." },
];

const BENEFITS = [
  { icon: Zap, color: "#075a01", title: "AI-Powered Writing", desc: "AI crafts personalized cover letters tailored to the exact job and company." },
  { icon: Target, color: "#0a8f01", title: "ATS-Optimized", desc: "Every letter includes keywords that pass Applicant Tracking Systems." },
  { icon: Clock, color: "#ff914d", title: "Done in 30 Seconds", desc: "No more hours of writing. AI does the work while you focus on the job hunt." },
  { icon: Shield, color: "#075a01", title: "100% Free Forever", desc: "No hidden fees, no credit card, no trials. Write unlimited cover letters." },
  { icon: Globe, color: "#0a8f01", title: "Any Industry", desc: "Works for tech, healthcare, finance, education, creative, executive roles." },
  { icon: TrendingUp, color: "#ff914d", title: "3x More Interviews", desc: "Tailored AI cover letters get 3x more interview callbacks than generic ones." },
];

const TONES = [
  {
    name: "Professional",
    color: "#075a01",
    icon: Briefcase,
    desc: "Formal, polished, traditional business language. Conservative companies.",
    bestFor: "Finance, Law, Healthcare",
  },
  {
    name: "Enthusiastic",
    color: "#ff914d",
    icon: Sparkles,
    desc: "Energetic, passionate, shows excitement and motivation for the role.",
    bestFor: "Startups, Sales, Marketing",
  },
  {
    name: "Direct",
    color: "#0a8f01",
    icon: Target,
    desc: "Confident, results-driven, no fluff. Straight to the point.",
    bestFor: "Tech, Engineering, Consulting",
  },
  {
    name: "Creative",
    color: "#075a01",
    icon: MessageSquare,
    desc: "Personable, story-driven, memorable. Showcases personality.",
    bestFor: "Design, Media, Creative Agencies",
  },
];

const FEATURES = [
  { title: "AI Job Tailoring", desc: "Paste any job description, AI customizes" },
  { title: "4 Professional Tones", desc: "Match any company culture" },
  { title: "3 Length Options", desc: "Short, Medium, or Detailed" },
  { title: "Hiring Manager Name", desc: "Personalized greetings" },
  { title: "Company Research", desc: "AI weaves in company-specific points" },
  { title: "Skills Highlight", desc: "Showcases relevant skills naturally" },
  { title: "Achievement Focus", desc: "Quantified results, not vague claims" },
  { title: "ATS Keywords", desc: "Passes Applicant Tracking Systems" },
  { title: "PDF Download", desc: "Print-ready PDF in one click" },
  { title: "Free Forever", desc: "3 free letters per day" },
  { title: "Resume Pairing", desc: "Auto-fills from your resume" },
  { title: "Mobile-Friendly", desc: "Write on phone, tablet, or desktop" },
];

const COMPARISON = [
  { feature: "100% Free", us: true, them1: false, them2: false },
  { feature: "AI-Powered", us: true, them1: true, them2: true },
  { feature: "No Sign-Up to Try", us: true, them1: false, them2: false },
  { feature: "4 Tone Options", us: true, them1: false, them2: false },
  { feature: "Job Description Tailoring", us: true, them1: false, them2: true },
  { feature: "PDF Download", us: "Free", them1: "$24/mo", them2: "$19/mo" },
  { feature: "Pairs with Resume Builder", us: true, them1: false, them2: true },
  { feature: "Length Customization", us: true, them1: false, them2: false },
];

const USE_CASES = [
  { icon: Users, title: "Job Seekers", desc: "Land more interviews with tailored letters" },
  { icon: TrendingUp, title: "Career Changers", desc: "Pivot industries with compelling stories" },
  { icon: Award, title: "New Graduates", desc: "Stand out with limited experience" },
  { icon: Crown, title: "Executives", desc: "Polished letters for senior roles" },
];

const FAQS = [
  { q: "Is this AI cover letter generator really free?", a: "Yes! You get 3 free cover letters per day with a free account. Sign up takes 30 seconds, no credit card required. Upgrade to Pro for unlimited cover letters and premium features." },
  { q: "How does the AI cover letter generator work?", a: "Our AI uses advanced language models to analyze your background and the job description, then crafts a personalized cover letter that highlights your relevant skills, includes ATS keywords, and matches the company's tone." },
  { q: "Can I tailor the cover letter to a specific job?", a: "Yes — this is our key feature. Paste the job description and AI customizes the entire letter with relevant keywords, role-specific language, and company-focused content. It's the #1 reason candidates get interviews." },
  { q: "What tones are available?", a: "4 tones: Professional (formal/traditional), Enthusiastic (energetic/passionate), Direct (confident/no fluff), and Creative (story-driven/personable). Pick what matches the company culture." },
  { q: "How long should a cover letter be?", a: "Most cover letters should be 250-400 words (3-4 paragraphs). Our AI offers 3 length options: Short (~250 words), Medium (~350 words), Detailed (~500 words). Most hiring managers prefer Medium length." },
  { q: "Can I download my cover letter as PDF?", a: "Yes. Both free and Pro users can download cover letters as HTML or print to PDF. Pro users get instant high-quality PDF downloads with one click." },
  { q: "Does the AI write generic cover letters?", a: "No. Our AI personalizes every letter based on your background, the job description, the company name, and even the hiring manager's name (if known). No two letters are identical." },
  { q: "Will my cover letter pass ATS systems?", a: "Yes. Every cover letter is built with Applicant Tracking System (ATS) compatibility in mind. AI extracts keywords from the job description and weaves them naturally into your letter." },
  { q: "Can I use this for any industry?", a: "Yes. Our AI is trained on cover letters from all industries — tech, healthcare, finance, marketing, education, creative, executive, trades, and more. Works globally for jobs in US, UK, Canada, Nigeria, India, and worldwide." },
  { q: "Should I personalize the AI-generated cover letter?", a: "Yes, always review and add personal touches. AI gives you 90% of the work done — add specific details about why YOU want this company, mention recent company news, or personalize the opening line. This is what gets interviews." },
  { q: "Can I write a cover letter without work experience?", a: "Yes! Our AI handles entry-level cover letters by emphasizing transferable skills, education, projects, internships, and enthusiasm. Perfect for recent graduates and career changers with limited direct experience." },
  { q: "Is my data safe?", a: "Yes. Your data is encrypted and stored securely on enterprise-grade infrastructure. We never share your information with third parties or use it to train AI models." },
];