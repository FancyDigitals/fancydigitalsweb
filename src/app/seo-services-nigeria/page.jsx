"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

const services = [
  {
    title: "Keyword Research",
    desc: "We target keywords your customers are actually searching for.",
    icon: (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#075a01" strokeWidth="2" />
    <path d="M20 20L16.65 16.65" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
  },
  {
    title: "On-Page SEO",
    desc: "We optimize your pages, content, and structure for ranking.",
    icon: (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="#075a01" strokeWidth="2" />
    <path d="M8 10H16M8 14H12" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
  },
  {
    title: "Technical SEO",
    desc: "Fix speed, indexing, and backend issues killing your rankings.",
    icon: (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#ff914d" strokeWidth="2" />
    <path d="M19.4 15A1.65 1.65 0 0021 13.35V10.65A1.65 1.65 0 0019.4 9L17.7 6.6A1.65 1.65 0 0016.2 6H7.8A1.65 1.65 0 006.3 6.6L4.6 9A1.65 1.65 0 003 10.65V13.35A1.65 1.65 0 004.6 15L6.3 17.4A1.65 1.65 0 007.8 18H16.2A1.65 1.65 0 0017.7 17.4L19.4 15Z" stroke="#075a01" strokeWidth="2" />
  </svg>
)
  },
  {
    title: "Content Strategy",
    desc: "We create content that attracts traffic and converts.",
    icon: (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
    <path d="M4 4H20V20H4V4Z" stroke="#075a01" strokeWidth="2" />
    <path d="M8 8H16M8 12H16M8 16H12" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
  },
  {
    title: "Backlink Building",
    desc: "High-quality links that boost your authority and rankings.",
    icon: (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
    <path d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1" stroke="#075a01" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 11a5 5 0 01-7 0l-2 2a5 5 0 007 7l1-1" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
  },
  {
    title: "Local SEO",
    desc: "Dominate searches in your city and nearby locations.",
    icon: (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-6-4.5-6-10a6 6 0 1112 0c0 5.5-6 10-6 10Z" stroke="#075a01" strokeWidth="2" />
    <circle cx="12" cy="11" r="2" fill="#ff914d" />
  </svg>
)
  },
];

const faqs = [
  {
    q: "How long does SEO take in Nigeria?",
    a: "SEO typically takes 3–6 months to see strong results depending on competition.",
  },
  {
    q: "Do you guarantee #1 ranking?",
    a: "No serious agency guarantees #1, but we focus on consistent growth and top rankings.",
  },
  {
    q: "Is SEO better than ads?",
    a: "SEO gives long-term traffic, while ads give instant traffic. The best strategy uses both.",
  },
  {
    q: "Do you offer local SEO?",
    a: "Yes, we help businesses rank in Lagos, Abuja, and other cities.",
  },
];

const processSteps = [
  { step: "01", title: "Audit", desc: "Deep dive into your current SEO health" },
  { step: "02", title: "Strategy", desc: "Custom roadmap for your growth" },
  { step: "03", title: "Execution", desc: "Implement proven SEO tactics" },
  { step: "04", title: "Growth", desc: "Scale and maintain rankings" },
];

export default function SEOServicesNigeria() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-[#075a01]/5 blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Floating shapes */}
        <div className="absolute left-[10%] top-32 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20" />
        <div
          className="absolute right-[15%] top-48 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/30"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute left-[20%] top-[60%] h-2 w-2 animate-bounce rounded-full bg-[#075a01]/25"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute right-[25%] top-[40%] h-5 w-5 animate-bounce rounded-full border-2 border-[#ff914d]/20"
          style={{ animationDelay: "0.3s" }}
        />
        <div className="absolute left-[5%] top-[45%] h-6 w-6 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/15" />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="group inline-flex items-center gap-3 rounded-full border border-[#075a01]/20 bg-white px-5 py-2.5 shadow-lg shadow-[#075a01]/5 transition-all duration-300 hover:border-[#075a01]/30 hover:shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#075a01] opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#075a01]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                #1 SEO Agency in Nigeria
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              SEO Services That
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  Actually Rank
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 4 150 4 198 10"
                    stroke="url(#underline-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="underline-gradient"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                    >
                      <stop stopColor="#075a01" />
                      <stop offset="1" stopColor="#ff914d" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="bg-gradient-to-r from-[#ff914d] to-[#ff6b1a] bg-clip-text text-transparent">
                in Nigeria
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              We don&apos;t just optimize websites. We push your business to the{" "}
              <span className="font-semibold text-gray-900">top of Google</span>,
              bring in{" "}
              <span className="font-semibold text-gray-900">
                qualified traffic
              </span>
              , and turn clicks into{" "}
              <span className="font-semibold text-gray-900">customers</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 text-center font-bold text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#075a01]/30 sm:w-auto"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                Get Started
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg sm:w-auto"
            >
              <svg
                className="h-5 w-5 text-[#ff914d]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              See Results
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "300%+", label: "Traffic Growth" },
              { value: "50+", label: "Projects Done" },
              { value: "Top 3", label: "Rankings" },
              { value: "5x", label: "Lead Increase" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-[#075a01]/20 hover:shadow-lg"
              >
                <p className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative border-y border-gray-100 bg-white py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 px-5 text-center">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-xs font-bold text-white shadow-sm"
              >
                {["🚀", "💼", "📈", "✨"][i - 1]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 md:text-base">
            Trusted by{" "}
            <span className="font-semibold text-gray-900">startups</span>,{" "}
            <span className="font-semibold text-gray-900">brands</span>, and{" "}
            <span className="font-semibold text-gray-900">
              fast-growing businesses
            </span>{" "}
            across Nigeria
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              What You Get
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Comprehensive SEO solutions designed to dominate search results
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-xl"
              >
                {/* Decorative corner */}
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 transition-all duration-300 group-hover:scale-150" />

                <div className="relative">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </span>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <svg
                    className="h-4 w-4 text-[#075a01]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="relative overflow-hidden px-5 py-24 md:px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-[#075a01]/20 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-40 w-40 rounded-full bg-[#ff914d]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">

          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Real Growth.{" "}
            <span className="bg-gradient-to-r from-[#ff914d] to-[#ff6b1a] bg-clip-text text-transparent">
              Not Empty Promises.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We focus on ROI. More traffic, more leads, more revenue. Simple.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
  {
    value: "300%+",
    label: "Traffic Growth",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17L9 11L13 15L21 7"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 7H15M21 7V13"
          stroke="#ff914d"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "5x",
    label: "Lead Increase",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2V6"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 22V18"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4.93 4.93L7.76 7.76"
          stroke="#ff914d"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16.24 16.24L19.07 19.07"
          stroke="#ff914d"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="4" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    value: "Top 3",
    label: "Google Rankings",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 17L18 21L16 14L22 9L14 8L12 2L10 8L2 9L8 14L6 21L12 17Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill="#ff914d" />
      </svg>
    ),
  },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#ff914d]/30 hover:bg-white/10"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
  {stat.icon}
</span>
                <h3 className="text-4xl font-bold text-white md:text-5xl">
                  {stat.value}
                </h3>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Our Process
            </h2>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-16 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] md:block" />

            <div className="grid gap-8 md:grid-cols-4">
              {processSteps.map((item, idx) => (
                <div key={idx} className="group relative text-center">
                  {/* Step number */}
                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-xl font-bold text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                    {item.step}
                    {/* Pulse effect */}
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-[#075a01]/20" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-8 text-white shadow-2xl shadow-[#075a01]/20 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <span className="text-sm font-semibold">📊 Case Study</span>
                </div>

                <h2 className="text-2xl font-bold md:text-3xl">
                  From Zero to Page 1
                </h2>

                <p className="mt-4 text-white/80">
                  One of our clients went from zero visibility to ranking on page
                  1 of Google within months — generating consistent leads and
                  sales.
                </p>

                <Link
                  href="/portfolio"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#ff914d] transition-all hover:gap-3"
                >
                  View Full Case Study
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "+320%", label: "Organic Traffic" },
                  { value: "Top 3", label: "Keywords" },
                  { value: "4x", label: "Lead Growth" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm"
                  >
                    <p className="text-xl font-bold md:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
              <span className="text-sm font-semibold text-[#075a01]">
                Quick Answers
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 font-semibold text-gray-900">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      openFaq === idx
                        ? "rotate-180 bg-[#075a01] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="px-5 text-gray-600">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2">
            <span className="text-sm font-semibold text-[#ff914d]">
              More Services
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Other Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We don&apos;t just do SEO. We help you grow your entire digital
            presence.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/web-development-nigeria"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/30 hover:shadow-lg sm:w-auto"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#075a01]/10">
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="#075a01"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 6V18M16 6V18"
      stroke="#ff914d"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
</span>
              Web Development
              <svg
                className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#075a01]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/email-marketing-nigeria"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg sm:w-auto"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff914d]/10">
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="#075a01"
      strokeWidth="2"
    />
    <path
      d="M3 7L12 13L21 7"
      stroke="#ff914d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</span>
              Email Marketing
              <svg
                className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#ff914d]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATION SEO */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="text-white">

                <h2 className="text-3xl font-bold md:text-4xl">
                  SEO Services
                  <span className="block text-[#ff914d]">Across Nigeria</span>
                </h2>

                <p className="mt-4 text-gray-400">
                  We provide professional SEO services in Lagos, Abuja, Port
                  Harcourt, Ibadan, and across Nigeria. Whether you&apos;re a
                  startup or an established business, we help you dominate search
                  results in your location.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"].map(
                    (city) => (
                      <span
                        key={city}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium"
                      >
                        📍 {city}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Decorative map illustration */}
              <div className="relative flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-full border-2 border-dashed border-white/10">
                  <div className="absolute inset-4 rounded-full border border-white/5">
                    <div className="absolute inset-4 rounded-full border border-white/5">
                      <div className="absolute inset-4 rounded-full bg-[#075a01]/20">
                        {/* Center pin */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            <div className="h-4 w-4 animate-ping rounded-full bg-[#ff914d]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-[#ff914d] shadow-lg shadow-[#ff914d]/50" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Orbiting dots */}
                  <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-white/30" />
                  <div className="absolute right-1/4 top-1/3 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                  <div className="absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-white/20" />
                  <div className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 rounded-full bg-[#ff914d]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl shadow-gray-200/50 md:p-12">
            {/* Top gradient bar */}
            <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01]" />

            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ff914d]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#075a01]/10 blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Ready to Rank on{" "}
                <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  Google
                </span>
                ?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-600">
                Let&apos;s grow your business with SEO that works. The best
                projects start with a simple conversation.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 text-center font-bold text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    Start Your SEO Project
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </Link>
                <a
                  href="https://wa.me/2349034360785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-4 font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Floating badge */}
              <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2 text-sm">
                <span className="text-[#ff914d]">✨</span>
                <span className="font-medium text-gray-700">
                  Free SEO Audit Included
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long does SEO take in Nigeria?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SEO typically takes 3–6 months depending on competition.",
                },
              },
              {
                "@type": "Question",
                name: "Do you guarantee #1 ranking?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No agency can guarantee #1 ranking, but we aim for top positions.",
                },
              },
              {
                "@type": "Question",
                name: "Is SEO better than ads?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SEO is long-term while ads are instant. Best results come from combining both.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer local SEO?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we optimize businesses for Lagos, Abuja, and other Nigerian cities.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}