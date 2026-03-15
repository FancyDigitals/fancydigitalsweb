"use client";

import { useState, useEffect } from "react";

/* =====================================================
   HERO — BRIGHT, CREATIVE, STUNNING
===================================================== */

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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[700px] w-[700px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[600px] w-[600px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] animate-pulse rounded-full bg-[#075a01]/5 blur-[80px]" />
        <div className="absolute -bottom-40 right-0 h-[600px] w-[600px] animate-pulse rounded-full bg-[#ff914d]/8 blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Radial light burst */}
        <div className="absolute left-1/2 top-0 h-[800px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(7,90,1,0.08),transparent_50%)]" />

        {/* Floating shapes */}
        <div className="absolute left-[5%] top-24 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/30" />
        <div
          className="absolute right-[10%] top-32 h-5 w-5 animate-bounce rounded-full border-2 border-[#ff914d]/30"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute left-[15%] top-[40%] h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/25"
          style={{ animationDelay: "0.7s" }}
        />
        <div
          className="absolute right-[20%] top-[30%] h-6 w-6 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/20"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-[30%] left-[8%] h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[40%] right-[12%] h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/20"
          style={{ animationDelay: "1.2s" }}
        />

        {/* Decorative lines */}
        <div className="absolute left-0 top-1/4 h-px w-32 bg-gradient-to-r from-transparent via-[#075a01]/20 to-transparent" />
        <div className="absolute right-0 top-1/3 h-px w-40 bg-gradient-to-r from-transparent via-[#ff914d]/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-10 md:pt-32 lg:pt-36">

        {/* Main headline */}
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Where Vision Meets</span>
            <span className="relative mt-2 block">
              <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-[length:200%_auto] bg-clip-text text-transparent">
                Digital Excellence
              </span>
              {/* Decorative underline */}
              <svg
                className="absolute -bottom-4 left-1/2 w-64 -translate-x-1/2 md:w-80"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 10C60 4 240 4 298 10"
                  stroke="url(#hero-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="hero-underline"
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                  >
                    <stop stopColor="#075a01" />
                    <stop offset="0.5" stopColor="#ff914d" />
                    <stop offset="1" stopColor="#075a01" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            We craft{" "}
            <span className="font-semibold text-gray-900">
              premium digital experiences
            </span>{" "}
            that captivate, convert, and inspire —{" "}
            <span className="font-semibold text-gray-900">
              websites, brands, and systems
            </span>{" "}
            built for long-term success.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { value: "50+", label: "Projects" },
            { value: "98%", label: "Satisfaction" },
            { value: "7+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-200 to-gray-300 shadow-sm"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-[#ff914d]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500">Trusted by brands</p>
            </div>
          </div>
        </div>

        {/* Creative Slider Frame */}
        <div
          className="group relative mx-auto max-w-6xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer decorative frame */}
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-[#075a01]/20 via-[#ff914d]/20 to-[#075a01]/20 opacity-50 blur-2xl transition-all duration-700 group-hover:opacity-80" />

          {/* Animated border */}
          <div className="absolute -inset-[3px] rounded-[36px] bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-[length:200%_100%] opacity-60 transition-all duration-500 group-hover:opacity-100" />

          {/* Main slider container */}
          <div className="relative overflow-hidden rounded-[33px] border-4 border-white bg-white shadow-2xl shadow-gray-200/50 transition-all duration-500 group-hover:shadow-[0_40px_100px_rgba(7,90,1,0.15)]">
            {/* Slides container */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
              {slides.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-[1.02]"
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

              {/* Grid pattern overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

              {/* Corner frames */}
              <svg
                className="absolute left-6 top-6 h-10 w-10 text-white/60 transition-all duration-500 group-hover:text-white/90"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M0 15V0h15" />
              </svg>
              <svg
                className="absolute right-6 top-6 h-10 w-10 text-white/60 transition-all duration-500 group-hover:text-white/90"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M40 15V0h-15" />
              </svg>
              <svg
                className="absolute bottom-6 left-6 h-10 w-10 text-white/60 transition-all duration-500 group-hover:text-white/90"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M0 25v15h15" />
              </svg>
              <svg
                className="absolute bottom-6 right-6 h-10 w-10 text-white/60 transition-all duration-500 group-hover:text-white/90"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M40 25v15h-15" />
              </svg>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-4 border-white/80 bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30">
                  <svg
                    className="ml-1 h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] transition-all duration-500 ease-out"
                style={{
                  width: `${((currentSlide + 1) / slides.length) * 100}%`,
                }}
              />
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-gradient-to-r from-[#075a01] to-[#ff914d]"
                      : "w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + slides.length) % slides.length
                )
              }
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          {/* Floating feature badges */}
          <div className="absolute -left-4 top-1/4 hidden rounded-2xl border-2 border-white bg-white px-4 py-3 shadow-xl md:block lg:-left-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#075a01]/10 text-xl">
                🎨
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">Design</p>
                <p className="text-xs text-gray-500">Premium Quality</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-1/4 hidden rounded-2xl border-2 border-white bg-white px-4 py-3 shadow-xl md:block lg:-right-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff914d]/10 text-xl">
                ⚡
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">Fast</p>
                <p className="text-xs text-gray-500">Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-16">
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-10 py-5 text-lg font-bold text-white shadow-xl shadow-[#075a01]/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#075a01]/30"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span className="relative">Start Your Project</span>
            <svg
              className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
          </a>

          <a
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-10 py-5 text-lg font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/30 hover:shadow-lg"
          >
            <svg
              className="h-5 w-5 text-[#ff914d] transition-transform duration-300 group-hover:scale-110"
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
          </a>
        </div>

        {/* Services preview */}
        <div className="mt-20">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
            What we create
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🌐",
                title: "Websites",
                desc: "Modern, fast, conversion-ready",
              },
              {
                icon: "🎨",
                title: "Branding",
                desc: "Identity that stands out",
              },
              { icon: "📈", title: "SEO", desc: "Organic growth systems" },
              {
                icon: "🛠️",
                title: "Tools",
                desc: "Custom digital solutions",
              },
            ].map((item) => (
              <a
                key={item.title}
                href="/services"
                className="group flex items-center gap-4 rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-lg"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:from-[#075a01] group-hover:to-[#ff914d]">
                  <span className="transition-all group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert">
                    {item.icon}
                  </span>
                </span>
                <div>
                  <p className="font-bold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <svg
                  className="ml-auto h-5 w-5 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#075a01]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}