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

      {/* Noise texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#075a01] opacity-[0.07] blur-[120px] md:-top-60 md:h-[700px] md:w-[700px] md:blur-[140px]" />
        <div className="absolute top-1/3 -left-20 h-[300px] w-[300px] rounded-full bg-[#075a01] opacity-[0.05] blur-[100px] md:-left-40 md:h-[500px] md:w-[500px] md:blur-[120px]" />
        <div className="absolute top-1/4 -right-20 h-[300px] w-[300px] rounded-full bg-[#ff914d] opacity-[0.05] blur-[100px] md:-right-40 md:h-[500px] md:w-[500px] md:blur-[120px]" />
      </div>

      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#075a01]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28 md:px-10 md:pb-20 md:pt-32 lg:pt-36">

        {/* Headline */}
<div className="mx-auto mb-4 max-w-4xl text-center sm:mb-6 md:mb-7">
  <h1 className="text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
    <span className="block text-white/90">Where Vision</span>
    <span className="block bg-gradient-to-r from-[#075a01] via-[#4ade80] to-[#ff914d] bg-clip-text text-transparent">
      Meets Excellence
    </span>
  </h1>
</div>

{/* Subheadline */}
<p className="mx-auto mb-6 max-w-[280px] text-center text-[11px] leading-relaxed text-white/50 sm:mb-8 sm:max-w-md sm:text-sm md:mb-10 md:max-w-xl md:text-base lg:text-lg">
  Premium websites, brands, and digital tools —
  built for founders and businesses who demand clarity and performance.
</p>

{/* CTA Buttons */}
<div className="mb-8 grid w-full max-w-md grid-cols-2 gap-2 px-4 sm:mb-10 sm:flex sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:px-0 md:mb-14 md:gap-4">
  <a
    href="/contact"
    className="group relative col-span-2 inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-[#075a01] px-4 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#0a8f01] hover:shadow-[0_0_40px_rgba(7,90,1,0.4)] active:scale-95 sm:col-span-1 sm:gap-2.5 sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5"
  >
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    <span className="relative">Start Your Project</span>
    <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
  </a>

  <a
    href="/tools"
    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 sm:gap-2.5 sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5"
  >
    Free Tools
    <Wrench className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
  </a>

  <a
    href="/portfolio"
    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 sm:gap-2.5 sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5"
  >
    Portfolio
    <Images className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
  </a>
</div>

        {/* Slider */}
        <div
          className="group relative mx-auto max-w-5xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#075a01]/40 via-[#ff914d]/20 to-[#075a01]/40 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100 md:rounded-[28px]" />
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#075a01]/30 via-white/5 to-[#ff914d]/20 md:rounded-[28px]" />

          <div className="relative overflow-hidden rounded-2xl bg-[#0a1015] md:rounded-[26px]">
            {/* Responsive aspect ratio */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <div className="absolute inset-0">
                {slides.map((src, index) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-all duration-1000 ease-out ${
                      index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  </div>
                ))}

                {/* Corner frames */}
                <svg className="absolute left-3 top-3 h-5 w-5 text-white/30 sm:left-5 sm:top-5 sm:h-7 sm:w-7 md:h-8 md:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0 12V0h12" />
                </svg>
                <svg className="absolute right-3 top-3 h-5 w-5 text-white/30 sm:right-5 sm:top-5 sm:h-7 sm:w-7 md:h-8 md:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M32 12V0H20" />
                </svg>
                <svg className="absolute bottom-3 left-3 h-5 w-5 text-white/30 sm:bottom-5 sm:left-5 sm:h-7 sm:w-7 md:h-8 md:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0 20v12h12" />
                </svg>
                <svg className="absolute bottom-3 right-3 h-5 w-5 text-white/30 sm:bottom-5 sm:right-5 sm:h-7 sm:w-7 md:h-8 md:w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M32 20v12H20" />
                </svg>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 sm:bottom-5 sm:gap-1.5">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "h-1 w-4 bg-white sm:h-1.5 sm:w-6"
                          : "h-1 w-1 bg-white/30 hover:bg-white/60 sm:h-1.5 sm:w-1.5"
                      }`}
                    />
                  ))}
                </div>
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

        {/* Services mini grid */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {[
            { icon: Wrench, title: "Free Tools", desc: "8+ tools, no sign-up", href: "/tools" },
            { icon: Globe, title: "Websites", desc: "Modern & conversion-ready", href: "/services" },
            { icon: Palette, title: "Branding", desc: "Identity that stands out", href: "/services" },
            { icon: TrendingUp, title: "SEO", desc: "Organic growth systems", href: "/seo-services-nigeria" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                className="group flex items-center gap-2 sm:gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[#075a01]/30 hover:bg-white/[0.06] sm:px-4 sm:py-4 md:px-5"
              >
                <span className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 transition-all duration-300 group-hover:bg-[#075a01]/20">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/50 transition-colors duration-300 group-hover:text-[#4ade80]" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white/80 group-hover:text-white sm:text-sm">
                    {item.title}
                  </p>
                  <p className="hidden truncate text-[10px] text-white/30 sm:block sm:text-xs">{item.desc}</p>
                </div>
                <ArrowRight className="ml-auto h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#075a01]" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050a0f] to-transparent md:h-32" />
    </section>
  );
}