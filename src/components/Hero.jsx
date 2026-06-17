"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  Palette,
  TrendingUp,
  Wrench,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

export default function Hero({
  slides = [
    "/hero/slide-1.jpg",
    "/hero/slide-2.jpg",
    "/hero/slide-3.jpg",
  ],
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  if (!slides.length) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050a0f]">

      {/* ── Noise texture ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* ── Glow orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#075a01] opacity-[0.07] blur-[120px] md:-top-60 md:h-[700px] md:w-[700px] md:blur-[140px]" />
        <div className="absolute top-1/3 -left-20 h-[300px] w-[300px] rounded-full bg-[#075a01] opacity-[0.05] blur-[100px] md:-left-40 md:h-[500px] md:w-[500px] md:blur-[120px]" />
        <div className="absolute top-1/4 -right-20 h-[300px] w-[300px] rounded-full bg-[#ff914d] opacity-[0.05] blur-[100px] md:-right-40 md:h-[500px] md:w-[500px] md:blur-[120px]" />
      </div>

      {/* ── Top border ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#075a01]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:px-10 md:pb-24 md:pt-36 lg:pt-40">

        {/* ── Eyebrow ── */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm sm:gap-2.5 sm:px-5 sm:py-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#075a01] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#075a01] sm:h-2 sm:w-2" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 sm:text-xs sm:tracking-[0.2em]">
              Digital Agency · Nigeria
            </span>
          </div>
        </div>

        {/* ── Headline ── */}
        <div className="mx-auto mb-6 max-w-4xl text-center sm:mb-8">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block text-white/90">Where Vision</span>
            <span className="block bg-gradient-to-r from-[#075a01] via-[#4ade80] to-[#ff914d] bg-clip-text text-transparent">
              Meets Excellence
            </span>
          </h1>
        </div>

        {/* ── Subheadline ── */}
        <p className="mx-auto mb-10 max-w-sm text-center text-sm leading-relaxed text-white/40 sm:max-w-lg sm:text-base md:mb-12 md:max-w-xl md:text-lg">
          Premium websites, brands, and digital systems —
          built for founders and businesses who demand clarity and performance.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mb-20">
          <a
            href="/contact"
            className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#075a01] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0a8f01] hover:shadow-[0_0_40px_rgba(7,90,1,0.4)] sm:w-auto sm:px-8 sm:py-4"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Start Your Project</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <a
            href="/portfolio"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white sm:w-auto sm:px-8 sm:py-4"
          >
            View Portfolio
            <Images className="h-4 w-4" />
          </a>
        </div>

        {/* ── Slider ── */}
        <div
          className="group relative mx-auto max-w-5xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#075a01]/40 via-[#ff914d]/20 to-[#075a01]/40 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100 md:rounded-[28px]" />

          {/* Border */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#075a01]/30 via-white/5 to-[#ff914d]/20 md:rounded-[28px]" />

          {/* Container */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0a1015] md:rounded-[26px]">
            <div className="relative aspect-[4/3] sm:aspect-[16/9]">
              {slides.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-[1.02]"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover sm:object-cover object-contain bg-[#0a1015]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>
              ))}

              {/* Corner frames — hidden on very small screens */}
              <svg className="absolute left-3 top-3 h-6 w-6 text-white/30 sm:left-5 sm:top-5 sm:h-8 sm:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M0 12V0h12" />
              </svg>
              <svg className="absolute right-3 top-3 h-6 w-6 text-white/30 sm:right-5 sm:top-5 sm:h-8 sm:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M32 12V0H20" />
              </svg>
              <svg className="absolute bottom-3 left-3 h-6 w-6 text-white/30 sm:bottom-5 sm:left-5 sm:h-8 sm:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M0 20v12h12" />
              </svg>
              <svg className="absolute bottom-3 right-3 h-6 w-6 text-white/30 sm:bottom-5 sm:right-5 sm:h-8 sm:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M32 20v12H20" />
              </svg>

              {/* Slide counter */}
              <div className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/40 px-2 py-1 backdrop-blur-sm sm:left-5 sm:top-5 sm:px-3 sm:py-1.5">
                <span className="font-mono text-[10px] font-medium text-white/60 sm:text-xs">
                  {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>

              {/* Nav arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-black/60 hover:text-white sm:left-4 sm:h-10 sm:w-10"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-black/60 hover:text-white sm:right-4 sm:h-10 sm:w-10"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 sm:bottom-5 sm:gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "h-1 w-5 bg-white sm:h-1.5 sm:w-6"
                        : "h-1 w-1 bg-white/30 hover:bg-white/60 sm:h-1.5 sm:w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#075a01] to-[#ff914d] transition-all duration-500 ease-out"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:mt-12 sm:grid-cols-4 md:mt-16">
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "7+", label: "Years Experience" },
            { value: "24h", label: "Response Time" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 bg-[#050a0f] px-4 py-5 text-center sm:px-6 sm:py-6 md:px-8"
            >
              <p className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl">
                {stat.value}
              </p>
              <p className="text-[10px] text-white/30 sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Services mini grid ── */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {[
            { icon: Globe, title: "Websites", desc: "Modern & conversion-ready" },
            { icon: Palette, title: "Branding", desc: "Identity that stands out" },
            { icon: TrendingUp, title: "SEO", desc: "Organic growth systems" },
            { icon: Wrench, title: "Tools", desc: "Custom digital solutions" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href="/services"
                className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-[#075a01]/30 hover:bg-white/[0.06] sm:gap-4 sm:px-5 sm:py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 transition-all duration-300 group-hover:bg-[#075a01]/20 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 text-white/50 transition-colors duration-300 group-hover:text-[#4ade80] sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white/80 group-hover:text-white sm:text-sm">
                    {item.title}
                  </p>
                  <p className="truncate text-[10px] text-white/30 sm:text-xs">{item.desc}</p>
                </div>
                <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#075a01] sm:h-4 sm:w-4" />
              </a>
            );
          })}
        </div>

      </div>

      {/* ── Bottom fade ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a0f] to-transparent md:h-40" />
    </section>
  );
}