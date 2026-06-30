import Link from "next/link";
import {
  FileText, Sparkles, Check, Star, ArrowRight, Zap, Crown,
  Shield, Globe, Clock, TrendingUp, Users, Award, Target,
  Mail, Phone, MapPin, Briefcase, GraduationCap,
} from "lucide-react";

const BASE_URL = "https://fancydigitals.com.ng";

import Schema from "@/components/Schema";
import {
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export const metadata = {
  title: "Free AI Resume Builder — ATS Resume Maker | No Sign-Up Required",
  description:
    "Build a professional ATS-optimized resume in 30 seconds with AI. 6 premium templates, photo upload, job match scoring. Free forever. Start now.",
  keywords: [
    "free ai resume builder",
    "ai resume builder no signup",
    "ats resume builder free",
    "resume generator ai free",
    "ai cv builder",
    "professional resume maker free",
    "ai resume generator no signup",
    "free resume builder online",
    "resume builder ai free download",
    "best free ai resume builder",
  ],
  alternates: { canonical: `${BASE_URL}/free-ai-resume-builder` },
  openGraph: {
    title: "Free AI Resume Builder — Build a Resume in 30 Seconds",
    description: "AI-powered, ATS-optimized resume builder. Free forever. Get your professional resume in seconds.",
    url: `${BASE_URL}/free-ai-resume-builder`,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Resume Builder",
    description: "Build an ATS-optimized resume in 30 seconds. Free.",
  },
};

const TOOL_URL = "/dashboard/tools/ai-resume-builder";

export default function FreeAIResumeBuilderPage() {
  // Schemas — using centralized library
  const softwareSchema = softwareApplicationSchema({
    name: "Fancy Digitals AI Resume Builder",
    description: "Free AI-powered resume builder with ATS optimization, 6 premium templates, photo upload, job match scoring, and instant PDF download. Build professional ATS-friendly resumes in 30 seconds. No credit card required.",
    slug: "free-ai-resume-builder",
    category: "BusinessApplication",
    price: "0",
  });

  const faqSchemaData = faqSchema(FAQS.map((f) => ({ question: f.q, answer: f.a })));

  const breadcrumbData = breadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Free AI Tools", url: `${BASE_URL}/tools` },
    { name: "AI Resume Builder", url: `${BASE_URL}/free-ai-resume-builder` },
  ]);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Build an AI Resume in 30 Seconds",
    description: "Step-by-step guide to creating an ATS-optimized, professional resume using AI in under a minute.",
    totalTime: "PT30S",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your information",
        text: "Fill in your name, target role, work experience, and skills. Takes 2 minutes.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "AI writes your resume",
        text: "Click Generate. AI creates an ATS-optimized, achievement-focused resume in 30 seconds.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download as PDF",
        text: "Save or print your professional, ATS-friendly resume and start applying immediately.",
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
            {/* LEFT: Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 mb-5 text-xs font-bold text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                FREE — Build Unlimited Resumes
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Free <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">AI Resume Builder</span> that Lands Interviews
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Build an ATS-optimized resume in 30 seconds. AI-powered. 6 premium templates. Job match scoring. Free forever.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#075a01]" />100% Free</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#075a01]" />No Credit Card</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#075a01]" />ATS-Optimized</span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href={TOOL_URL}
                  style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold hover:opacity-90 active:scale-95 transition shadow-lg"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Building Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                >
                  See How It Works
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">4.9/5</strong> from 847+ users
                </span>
              </div>
            </div>

            {/* RIGHT: Mock Resume Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl bg-white border-2 border-gray-100 shadow-2xl overflow-hidden">
                {/* Browser bar */}
                <div className="bg-gray-50 px-4 py-2 flex items-center gap-1.5 border-b border-gray-100">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-auto text-[10px] text-gray-400">fancydigitals.com.ng</span>
                </div>
                {/* Mock resume */}
                <div className="p-6 sm:p-8">
                  <div className="border-b-2 border-gray-900 pb-3 mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#075a01] to-[#0a8f01] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                      JD
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                      <p className="text-sm text-[#075a01] font-semibold">Senior Frontend Developer</p>
                      <p className="text-xs text-gray-500 mt-1">john@email.com · +234 800 0000 · Lagos</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#075a01] font-bold mb-1">Summary</p>
                    <div className="space-y-1">
                      <div className="h-2 w-full rounded bg-gray-200" />
                      <div className="h-2 w-4/5 rounded bg-gray-200" />
                      <div className="h-2 w-2/3 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#075a01] font-bold mb-1">Experience</p>
                    <div className="flex justify-between mb-1">
                      <div className="h-2 w-1/3 rounded bg-gray-900" />
                      <div className="h-2 w-12 rounded bg-gray-200" />
                    </div>
                    <div className="h-2 w-1/4 rounded bg-gray-300 mb-2" />
                    <div className="space-y-1 pl-3">
                      <div className="h-1.5 w-full rounded bg-gray-200" />
                      <div className="h-1.5 w-5/6 rounded bg-gray-200" />
                      <div className="h-1.5 w-3/4 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#075a01] font-bold mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {["React", "TypeScript", "Node.js", "AWS", "Docker"].map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#075a01]/10 text-[#075a01] font-semibold">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating ATS badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl px-3 py-2 shadow-xl">
                  <p className="text-[10px] font-bold text-white">ATS SCORE</p>
                  <p className="text-2xl font-black text-white">94</p>
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
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">10K+</p>
              <p className="text-xs text-gray-500 mt-1">Resumes Built</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">98%</p>
              <p className="text-xs text-gray-500 mt-1">ATS Pass Rate</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">30s</p>
              <p className="text-xs text-gray-500 mt-1">Avg Generation</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#075a01]">4.9★</p>
              <p className="text-xs text-gray-500 mt-1">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#075a01]/10 px-3 py-1 mb-3 text-xs font-bold text-[#075a01]">
              <Zap className="h-3 w-3" />
              SIMPLE PROCESS
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Build your resume in <span className="text-[#075a01]">3 simple steps</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              From blank page to interview-ready in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
  {STEPS.map((step, i) => (
    <div key={i} className="relative">
      {/* Connection line — desktop only */}
      {i < STEPS.length - 1 && (
        <div className="hidden sm:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#075a01]/30 to-transparent" />
      )}
      <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition">
        <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white text-lg sm:text-2xl font-bold mb-3 sm:mb-4 mx-auto">
          {i + 1}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">{step.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  ))}
</div>

          <div className="mt-10 text-center">
            <Link
              href={TOOL_URL}
              style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold hover:opacity-90 transition"
            >
              Start Building Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY USE ============ */}
      <section className="px-4 py-16 bg-gray-50 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Why use our <span className="text-[#075a01]">AI Resume Builder?</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Built with the latest AI technology to help you land interviews faster.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
  {BENEFITS.map((b, i) => (
    <div key={i} className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 lg:p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
      <div
        style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}cc)` }}
        className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-lg sm:rounded-xl mb-2 sm:mb-3"
      >
        <b.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">{b.title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">{b.desc}</p>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* ============ TEMPLATES SHOWCASE ============ */}
      <section className="px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 mb-3 text-xs font-bold text-amber-700">
              <Crown className="h-3 w-3" />
              6 PREMIUM TEMPLATES
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Designs that get you <span className="text-[#075a01]">noticed</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Choose from 6 professionally designed templates. Each optimized for ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
  {TEMPLATES_PREVIEW.map((tpl) => (
    <div key={tpl.name} className="group relative">
      <div className="aspect-[3/4] rounded-lg sm:rounded-xl border-2 border-gray-200 overflow-hidden bg-white hover:border-[#075a01] transition cursor-pointer shadow-sm">
        <div className="h-4 sm:h-6 w-full" style={{ background: tpl.accent }} />
        <div className="p-1.5 sm:p-2 space-y-1">
          <div className="h-1.5 w-2/3 rounded bg-gray-900" />
          <div className="h-1 w-1/2 rounded bg-gray-300" />
          <div className="pt-1 sm:pt-2 space-y-0.5">
            <div className="h-0.5 w-full rounded bg-gray-200" />
            <div className="h-0.5 w-full rounded bg-gray-200" />
            <div className="h-0.5 w-3/4 rounded bg-gray-200" />
          </div>
          <div className="pt-1 sm:pt-2">
            <div className="h-1 w-1/3 rounded mb-0.5" style={{ background: tpl.accent }} />
            <div className="h-0.5 w-full rounded bg-gray-200" />
            <div className="h-0.5 w-5/6 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <p className="text-[11px] sm:text-xs font-bold text-center mt-1.5 sm:mt-2 text-gray-700">{tpl.name}</p>
    </div>
  ))}
</div>

          <div className="mt-10 text-center">
            <Link
              href={TOOL_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-[#075a01] text-[#075a01] px-6 py-3 text-sm font-bold hover:bg-[#075a01] hover:text-white transition"
            >
              Try All Templates Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="px-4 py-16 bg-gray-50 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Everything you need to build the <span className="text-[#075a01]">perfect resume</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
  {FEATURES.map((f, i) => (
    <div key={i} className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white p-2.5 sm:p-4 border border-gray-100">
      <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-[#075a01]/10">
        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#075a01]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">{f.title}</p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 leading-snug line-clamp-2">{f.desc}</p>
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
              Fancy Digitals vs <span className="text-gray-500">Other Resume Builders</span>
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-bold text-gray-900">Feature</th>
                  <th className="text-center p-4 text-sm font-bold text-[#075a01]">Fancy Digitals</th>
                  <th className="text-center p-4 text-sm font-bold text-gray-500 hidden sm:table-cell">Resume.io</th>
                  <th className="text-center p-4 text-sm font-bold text-gray-500 hidden sm:table-cell">Kickresume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 text-sm text-gray-700">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.us === true ? <Check className="h-5 w-5 text-[#075a01] mx-auto" /> :
                       row.us === false ? <span className="text-gray-300">—</span> :
                       <span className="text-xs font-bold text-[#075a01]">{row.us}</span>}
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      {row.them1 === true ? <Check className="h-5 w-5 text-gray-400 mx-auto" /> :
                       row.them1 === false ? <span className="text-red-400">✕</span> :
                       <span className="text-xs text-gray-500">{row.them1}</span>}
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      {row.them2 === true ? <Check className="h-5 w-5 text-gray-400 mx-auto" /> :
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

      {/* ============ USE CASES ============ */}
      <section className="px-4 py-16 bg-gray-50 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Perfect for <span className="text-[#075a01]">every job seeker</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
  {USE_CASES.map((u, i) => (
    <div key={i} className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 border border-gray-100 text-center hover:shadow-md transition">
      <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#075a01]/10 mb-2 sm:mb-3">
        <u.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#075a01]" />
      </div>
      <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-tight">{u.title}</h3>
      <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">{u.desc}</p>
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
              Frequently asked <span className="text-[#075a01]">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl bg-white border border-gray-200 p-4 hover:border-[#075a01]/30 transition">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <p className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</p>
                  <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 group-open:bg-[#075a01] group-open:text-white transition">
                    <span className="text-sm font-bold">+</span>
                  </div>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
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
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Ready to land your dream job?
              </h2>
              <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
                Join 847+ professionals using Fancy Digitals to build standout resumes in seconds.
              </p>
              <Link
                href={TOOL_URL}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] hover:bg-gray-100 transition"
              >
                Start Building Now — Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs text-white/70">No credit card required · Free forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED TOOLS ============ */}
      <section className="px-4 py-12 sm:px-6 lg:px-10 border-t border-gray-100">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Related Free AI Tools</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
  <Link href="/dashboard/tools/ai-cover-letter" className="rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-[#075a01] hover:bg-green-50/30 transition text-center">
    <p className="text-[11px] sm:text-sm font-bold text-gray-900 leading-tight">AI Cover Letter</p>
    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Tailored to any job</p>
  </Link>
  <Link href="/tools" className="rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-[#075a01] hover:bg-green-50/30 transition text-center">
    <p className="text-[11px] sm:text-sm font-bold text-gray-900 leading-tight">All Tools</p>
    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Browse toolkit</p>
  </Link>
  <Link href="/pricing" className="rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-[#075a01] hover:bg-green-50/30 transition text-center">
    <p className="text-[11px] sm:text-sm font-bold text-gray-900 leading-tight">Pro Pricing</p>
    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Unlock unlimited</p>
  </Link>
</div>
        </div>
      </section>
    </main>
  );
}

const STEPS = [
  { title: "Enter Your Info", desc: "Fill in your name, target role, and work experience. Takes 2 minutes." },
  { title: "AI Writes Your Resume", desc: "Our AI crafts a polished, ATS-optimized resume in 30 seconds." },
  { title: "Download & Apply", desc: "Get your resume as PDF and start applying to jobs immediately." },
];

const BENEFITS = [
  { icon: Zap, color: "#075a01", title: "AI-Powered Writing", desc: "Our AI generates professional summaries and bullet points tailored to your target role." },
  { icon: Target, color: "#0369a1", title: "ATS-Optimized", desc: "Every resume passes Applicant Tracking Systems used by 99% of Fortune 500 companies." },
  { icon: Clock, color: "#f97316", title: "Done in 30 Seconds", desc: "No more hours staring at a blank page. AI writes your resume while you wait." },
  { icon: Shield, color: "#7c3aed", title: "100% Free Forever", desc: "No hidden fees, no credit card, no trial limits. Build resumes for free." },
  { icon: Globe, color: "#22c55e", title: "Works Globally", desc: "Optimized for job markets in the US, UK, Canada, Australia, and worldwide." },
  { icon: TrendingUp, color: "#ec4899", title: "Get More Interviews", desc: "AI-optimized resumes get 3x more interview callbacks than generic templates." },
];

const TEMPLATES_PREVIEW = [
  { name: "Basic", accent: "#111827" },
  { name: "Modern", accent: "#075a01" },
  { name: "Professional", accent: "#1e3a5f" },
  { name: "Creative", accent: "#7c3aed" },
  { name: "Minimal", accent: "#0f172a" },
  { name: "Tech", accent: "#0369a1" },
];

const FEATURES = [
  { title: "AI-Generated Summary", desc: "Powerful professional summary written by AI" },
  { title: "Smart Bullet Points", desc: "Achievement-focused bullets with metrics" },
  { title: "ATS Score Checker", desc: "Real-time compatibility analysis" },
  { title: "Job Match Analyzer", desc: "Compare resume to any job description" },
  { title: "6 Premium Templates", desc: "Professional designs to choose from" },
  { title: "Photo Upload", desc: "Add your professional photo (optional)" },
  { title: "Real PDF Download", desc: "Print-ready PDF in one click" },
  { title: "Cover Letter Pairing", desc: "Generate matching cover letter instantly" },
  { title: "AI Auto-Fix (Pro)", desc: "Optimize resume for any job in one click" },
  { title: "Custom Colors (Pro)", desc: "Match your personal brand" },
];

const COMPARISON = [
  { feature: "100% Free", us: true, them1: false, them2: false },
  { feature: "AI-Powered", us: true, them1: false, them2: true },
  { feature: "ATS Score Checker", us: true, them1: true, them2: false },
  { feature: "Job Match Analyzer", us: true, them1: false, them2: false },
  { feature: "AI Auto-Fix Resume", us: true, them1: false, them2: false },
  { feature: "PDF Download", us: "Free", them1: "$24/mo", them2: "$19/mo" },
  { feature: "Templates", us: "6", them1: "30+", them2: "35+" },
  { feature: "AI Cover Letter", us: true, them1: false, them2: true },
];

const USE_CASES = [
  { icon: Users, title: "Job Seekers", desc: "Land interviews faster with ATS-friendly resumes" },
  { icon: TrendingUp, title: "Career Changers", desc: "Pivot industries with tailored AI rewrites" },
  { icon: Award, title: "New Graduates", desc: "Start strong even with limited experience" },
  { icon: Crown, title: "Executives", desc: "Polished executive resumes in minutes" },
];

const FAQS = [
  { q: "Is this AI resume builder really free?", a: "Yes! You get 3 free resumes per day with a free account. Upgrade to Pro for unlimited resumes plus premium templates, real PDF download, and AI auto-optimization." },
  { q: "Do I need to create an account?", a: "Yes, a free account is required to use the AI resume builder. Sign up takes 30 seconds and gives you 3 resumes per day forever, with no credit card required." },
  { q: "Will my resume pass ATS systems?", a: "Yes. Every resume is built with ATS (Applicant Tracking System) compatibility in mind. Our built-in ATS Score Checker shows you exactly how to maximize your score." },
  { q: "How does the AI work?", a: "Our AI uses advanced language models to analyze your information and craft professional, achievement-focused bullet points and summaries tailored to your target role." },
  { q: "Can I download my resume as PDF?", a: "Yes. Pro users get instant high-quality PDF downloads with one click. Free users can print to PDF directly from the browser." },
  { q: "Is my data safe?", a: "Yes. Your data is encrypted and stored securely on enterprise-grade infrastructure. We never share your information with third parties." },
  { q: "Can I edit my resume after generating?", a: "Pro users can save and re-edit any resume anytime. Free users can regenerate with updated information." },
  { q: "What templates are available?", a: "We offer 6 professional templates: Basic, Modern, Professional, Creative, Minimal, and Tech. Free users get the Basic template; Pro unlocks all 6." },
  { q: "Does it work for all industries?", a: "Yes. Our AI is trained on resumes from all industries — tech, finance, healthcare, marketing, creative, executive roles, and more." },
  { q: "Can I use this on mobile?", a: "Absolutely. The entire builder is mobile-friendly. Build your resume on your phone, tablet, or desktop." },
];