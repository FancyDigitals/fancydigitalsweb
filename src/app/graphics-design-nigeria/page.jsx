"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

const services = [
  {
    title: "Logo Design",
    desc: "Memorable logos that capture your brand essence and leave lasting impressions.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="#075a01"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="#ff914d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="#075a01"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Brand Identity",
    desc: "Complete brand systems including colors, typography, and visual guidelines.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="#075a01"
          strokeWidth="2"
        />
        <circle cx="8.5" cy="8.5" r="1.5" fill="#ff914d" />
        <path
          d="M21 15L16 10L5 21"
          stroke="#ff914d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Social Media Designs",
    desc: "Scroll-stopping graphics optimized for every social platform.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke="#075a01"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="#ff914d"
          strokeWidth="2"
        />
        <circle cx="18" cy="6" r="1.5" fill="#ff914d" />
      </svg>
    ),
  },
  {
    title: "Flyers & Posters",
    desc: "Eye-catching print materials that communicate your message effectively.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          stroke="#075a01"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2V8H20"
          stroke="#075a01"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 13H16" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 17H12" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    desc: "Intuitive digital interfaces that users love to interact with.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="3"
          width="20"
          height="14"
          rx="2"
          stroke="#075a01"
          strokeWidth="2"
        />
        <path d="M8 21H16" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 17V21" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="10" r="1.5" fill="#075a01" />
        <rect x="10" y="8" width="9" height="4" rx="1" fill="#ff914d" fillOpacity="0.3" stroke="#ff914d" />
      </svg>
    ),
  },
  {
    title: "Marketing Creatives",
    desc: "High-converting ad designs and promotional materials that drive results.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 12H18L15 21L9 3L6 12H2"
          stroke="#075a01"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="#ff914d" strokeWidth="2" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "How much does logo design cost in Nigeria?",
    a: "It varies, but professional logo design typically starts from ₦50k upwards depending on complexity and deliverables.",
  },
  {
    q: "Do you offer full branding?",
    a: "Yes, we create complete brand identity systems including logo, color palette, typography, brand guidelines, and all collateral.",
  },
  {
    q: "How long does design take?",
    a: "Usually 2–7 days depending on scope. Complex branding projects may take 2-3 weeks for full completion.",
  },
  {
    q: "What files do I receive?",
    a: "You'll receive all source files (AI, PSD), export formats (PNG, JPG, SVG, PDF), and a brand guidelines document.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    desc: "Understanding your brand, audience, and goals",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Concept",
    desc: "Exploring creative directions and ideas",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Design",
    desc: "Crafting pixel-perfect visuals",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2L9.586 9.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Final files and brand guidelines",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function GraphicsDesignNigeria() {
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

          {/* Main headline */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Graphics Design That
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  Stands Out
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
              We create{" "}
              <span className="font-semibold text-gray-900">bold</span>,{" "}
              <span className="font-semibold text-gray-900">clean</span>, and{" "}
              <span className="font-semibold text-gray-900">memorable</span>{" "}
              designs that elevate your brand and attract attention.
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
                Start Your Design
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              View Portfolio
            </Link>
          </div>

          {/* Hero Visual Element */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="relative">
              {/* Design elements showcase */}
              <div className="grid grid-cols-3 gap-4">
                <div className="group rounded-2xl border-2 border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#075a01]/20 hover:shadow-xl">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#075a01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 17L12 22L22 17" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12L12 17L22 12" stroke="#075a01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Logos</p>
                </div>
                <div className="group rounded-2xl border-2 border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#ff914d]/20 hover:shadow-xl">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff914d]/10 to-[#075a01]/10">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke="#ff914d" strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke="#075a01" strokeWidth="2" />
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke="#075a01" strokeWidth="2" />
                      <rect x="14" y="14" width="7" height="7" rx="1" stroke="#ff914d" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Branding</p>
                </div>
                <div className="group rounded-2xl border-2 border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#075a01]/20 hover:shadow-xl">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <circle cx="13.5" cy="6.5" r="2.5" stroke="#075a01" strokeWidth="2" />
                      <circle cx="6" cy="12" r="2" stroke="#ff914d" strokeWidth="2" />
                      <circle cx="18" cy="16" r="3" stroke="#075a01" strokeWidth="2" />
                      <path d="M11 8L8 10" stroke="#ff914d" strokeWidth="1.5" />
                      <path d="M15.5 9L16.5 13" stroke="#ff914d" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Creatives</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 rotate-12 rounded-2xl bg-[#ff914d] px-4 py-2 text-sm font-bold text-white shadow-lg">
                ✨ Pixel Perfect
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#075a01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-semibold text-[#075a01]">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Design Services We Offer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              From logos to complete brand identities, we craft visuals that make your brand unforgettable.
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
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 transition-transform duration-300 group-hover:scale-110">
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

      {/* PROCESS SECTION */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2">
              <svg className="h-4 w-4 text-[#ff914d]" viewBox="0 0 24 24" fill="none">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-semibold text-[#ff914d]">
                How We Work
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Our Design Process
            </h2>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-16 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] md:block" />

            <div className="grid gap-8 md:grid-cols-4">
              {processSteps.map((item, idx) => (
                <div key={idx} className="group relative text-center">
                  {/* Step number */}
                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                    {item.icon}
                    {/* Pulse effect */}
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-[#075a01]/20" style={{ animationDuration: "2s" }} />
                  </div>

                  <span className="mb-2 inline-block rounded-full bg-[#ff914d]/10 px-3 py-1 text-xs font-bold text-[#ff914d]">
                    {item.step}
                  </span>
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

      {/* CASE STUDY / IMPACT SECTION */}
      <section className="relative overflow-hidden px-5 py-24 md:px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-[#075a01]/20 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-40 w-40 rounded-full bg-[#ff914d]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <svg className="h-4 w-4 text-[#ff914d]" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-[#ff914d]">
              Brand Impact
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Designs That{" "}
            <span className="bg-gradient-to-r from-[#ff914d] to-[#ff6b1a] bg-clip-text text-transparent">
              Transform Brands
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We&apos;ve helped brands transform their identity and stand out in competitive markets.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                value: "100%",
                label: "Brand Clarity",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#075a01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 4L12 14.01L9 11.01" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                value: "+200%",
                label: "Engagement",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#075a01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2" fill="#ff914d" />
                  </svg>
                ),
              },
              {
                value: "Strong",
                label: "Visual Identity",
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#075a01" strokeWidth="2" />
                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#ff914d" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="#ff914d" />
                  </svg>
                ),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#ff914d]/30 hover:bg-white/10"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-white md:text-5xl">
                  {stat.value}
                </h3>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
              <svg className="h-4 w-4 text-[#075a01]" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
              </svg>
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

      {/* LOCATION SECTION */}
      <section className="relative px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="text-white">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">Coverage</span>
                </div>

                <h2 className="text-3xl font-bold md:text-4xl">
                  Graphics Design Services
                  <span className="block text-[#ff914d]">Across Nigeria</span>
                </h2>

                <p className="mt-4 text-gray-400">
                  Serving businesses in Lagos, Abuja, Port Harcourt, Ibadan, and across Nigeria with world-class design solutions.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"].map(
                    (city) => (
                      <span
                        key={city}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium"
                      >
                        <svg className="h-3 w-3 text-[#ff914d]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {city}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Decorative design illustration */}
              <div className="relative flex items-center justify-center">
                <div className="relative h-64 w-64">
                  {/* Color palette circles */}
                  <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-white/10" />
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/5" />
                  
                  {/* Floating color swatches */}
                  <div className="absolute left-4 top-8 h-12 w-12 animate-pulse rounded-xl bg-[#075a01] shadow-lg" />
                  <div className="absolute right-8 top-12 h-10 w-10 animate-pulse rounded-lg bg-[#ff914d] shadow-lg" style={{ animationDelay: "0.5s" }} />
                  <div className="absolute bottom-12 left-12 h-8 w-8 animate-pulse rounded-lg bg-white/80 shadow-lg" style={{ animationDelay: "1s" }} />
                  <div className="absolute bottom-8 right-4 h-14 w-14 animate-pulse rounded-xl bg-gradient-to-br from-[#075a01] to-[#ff914d] shadow-lg" style={{ animationDelay: "0.3s" }} />
                  
                  {/* Center icon */}
                  <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
                      <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="#075a01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="8" cy="8" r="2" fill="#ff914d" />
                    </svg>
                  </div>
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
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#075a01" strokeWidth="2" fill="#ff914d" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Ready to{" "}
                <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  Elevate Your Brand
                </span>
                ?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-600">
                Let&apos;s create stunning visuals that make your brand unforgettable. Start your design project today.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 text-center font-bold text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    Start Your Design Project
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
                <svg className="h-4 w-4 text-[#ff914d]" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
                <span className="font-medium text-gray-700">
                  Free Design Consultation
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
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}