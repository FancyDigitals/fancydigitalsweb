import Header from "@/components/Header";

/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title: "Feast Basket E-commerce Website | Portfolio",
  description:
    "Case study of the Feast Basket e-commerce platform — a grocery-focused online store built for trust, speed, and seamless customer experience.",
};

/* =====================================================
   PAGE
===================================================== */

export default function FeastBasketCaseStudy() {
  const galleryImages = [
    { src: "/portfolio/feast-basket/screen-1.jpg", label: "Homepage Design" },
    { src: "/portfolio/feast-basket/screen-2.jpg", label: "Product Catalog" },
    { src: "/portfolio/feast-basket/screen-3.jpg", label: "Checkout Flow" },
  ];

  const objectives = [
    { text: "Simplify grocery discovery and ordering", icon: "🛒" },
    { text: "Build trust through clean UI and structure", icon: "✨" },
    { text: "Ensure fast performance on mobile devices", icon: "📱" },
    { text: "Support future feature expansion", icon: "🚀" },
  ];

  const deliverables = [
    "Custom E-commerce Design",
    "Responsive Development",
    "Product Management System",
    "Shopping Cart & Checkout",
    "Payment Integration",
    "Order Management Dashboard",
  ];

  const process = [
    {
      phase: "01",
      title: "Discovery & Research",
      description: "Analyzed the grocery e-commerce landscape, user behaviors, and competitor platforms to identify opportunities for Feast Basket.",
    },
    {
      phase: "02",
      title: "UX Strategy & Wireframes",
      description: "Mapped out user journeys, designed intuitive navigation flows, and created wireframes for seamless grocery shopping experience.",
    },
    {
      phase: "03",
      title: "Visual Design & Branding",
      description: "Developed a warm, trustworthy visual identity with clean product layouts, appetizing imagery, and conversion-focused CTAs.",
    },
    {
      phase: "04",
      title: "Development & Launch",
      description: "Built a high-performance e-commerce platform with fast loading times, secure checkout, and scalable architecture.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-950 via-[#0a0a0a] to-gray-950 text-white overflow-hidden">
      <Header />

      {/* Large ambient glows - Brand colors */}
      <div className="pointer-events-none absolute -top-48 left-1/4 h-[800px] w-[800px] rounded-full bg-[#075a01]/25 blur-[200px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/4 right-0 h-[700px] w-[700px] rounded-full bg-[#ff914d]/15 blur-[180px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      <div className="pointer-events-none absolute bottom-1/3 -left-32 h-[600px] w-[600px] rounded-full bg-[#075a01]/15 blur-[160px] animate-[pulse_12s_ease-in-out_infinite_1s]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#ff914d]/10 blur-[140px]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute top-32 left-[10%] h-4 w-4 rounded-full bg-[#075a01]/50 animate-[float_5s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-48 right-[15%] h-3 w-3 rounded-full bg-[#ff914d]/40 animate-[float_7s_ease-in-out_infinite_1s]" />
      <div className="pointer-events-none absolute top-1/3 left-[5%] h-2 w-2 rounded-full bg-white/20 animate-[float_6s_ease-in-out_infinite_2s]" />
      <div className="pointer-events-none absolute top-1/2 right-[8%] h-3 w-3 rounded-full bg-[#075a01]/40 animate-[float_8s_ease-in-out_infinite_0.5s]" />
      <div className="pointer-events-none absolute bottom-1/4 left-[20%] h-2.5 w-2.5 rounded-full bg-[#ff914d]/30 animate-[float_9s_ease-in-out_infinite_1.5s]" />
      <div className="pointer-events-none absolute top-2/3 right-[25%] h-2 w-2 rounded-full bg-white/15 animate-[float_6s_ease-in-out_infinite_3s]" />

      {/* Grid pattern */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.02]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      {/* Radial spotlight */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-full bg-[radial-gradient(ellipse_at_top,rgba(7,90,1,0.15),transparent_60%)]" />

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 pt-8 pb-12 md:px-10 md:pt-12">
        {/* Breadcrumb */}
        <nav className="mb-10 animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li className="flex items-center gap-2">
                <a href="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span className="flex items-center justify-center h-6 w-6 rounded-lg bg-white/[0.05] border border-white/[0.08] group-hover:bg-[#075a01]/20 group-hover:border-[#075a01]/30 transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                </a>
              </li>
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li>
                <a href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </a>
              </li>
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff914d] opacity-50"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-[#ff914d] to-[#ff6b1a]"></span>
                </span>
                <span className="font-semibold text-white">Feast Basket</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative animate-[fadeUp_1s_ease-out]">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            {/* Left side - Main content */}
            <div className="max-w-2xl">
              {/* Category & Type badges */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#075a01]/20 to-[#075a01]/10 backdrop-blur-sm px-4 py-2 border border-[#075a01]/30 shadow-[0_0_20px_rgba(7,90,1,0.2)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#075a01] opacity-60"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-[#075a01] to-[#0a9001]"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Case Study
                  </span>
                </div>
                
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff914d]/20 to-[#ff914d]/10 backdrop-blur-sm px-4 py-2 border border-[#ff914d]/30">
                  <svg className="w-3.5 h-3.5 text-[#ff914d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    E-commerce
                  </span>
                </div>
              </div>

              {/* Title with gradient */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Feast Basket
                </span>
                <span className="block mt-1 bg-gradient-to-r from-[#0a9001] via-[#ff914d] to-[#0a9001] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_6s_ease-in-out_infinite]">
                  E-commerce Website
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                A grocery-focused e-commerce platform designed to simplify ordering,
                build customer trust, and support scalable growth.
              </p>
            </div>

            {/* Right side - Quick info card */}
            <div className="lg:w-[320px] animate-[fadeUp_1s_ease-out_0.2s_both]">
              <div className="relative group">
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#075a01]/40 via-[#ff914d]/30 to-[#075a01]/40 opacity-60" />
                
                <div className="relative rounded-[23px] bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shadow-[0_4px_15px_rgba(7,90,1,0.4)]">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Project Complete</p>
                      <p className="text-xs text-gray-500">Successfully delivered</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Category", value: "Web Development", color: "text-[#0a9001]" },
                      { label: "Focus", value: "E-commerce & UX", color: "text-[#ff914d]" },
                      { label: "Audience", value: "Consumers", color: "text-white" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-white/[0.06] last:border-0">
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20 md:px-10 animate-[fadeUp_1s_ease-out_0.3s_both]">
        <div className="group relative">
          {/* Outer glow */}
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-[#075a01]/20 via-[#ff914d]/15 to-[#075a01]/20 opacity-60 blur-2xl" />
          
          {/* Frame border */}
          <div className="absolute -inset-[2px] rounded-[36px] bg-gradient-to-br from-[#075a01]/50 via-[#ff914d]/40 to-[#075a01]/50 opacity-80" />

          <div
            className="
              relative overflow-hidden rounded-[34px]
              bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
              shadow-[0_40px_120px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
            "
          >
            {/* Image */}
            <div
              className="
                h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]
                bg-cover bg-center
                transition-transform duration-[2s] ease-out
                group-hover:scale-105
              "
              style={{ backgroundImage: "url(/portfolio/feast-basket/cover.jpg)" }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/40 via-transparent to-gray-950/40" />

            {/* Grid texture */}
            <div
              className="
                pointer-events-none absolute inset-0 opacity-[0.03]
                [background-image:linear-gradient(to_right,rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,1)_1px,transparent_1px)]
                [background-size:50px_50px]
              "
            />

            {/* Corner frames */}
            <svg className="absolute top-6 left-6 w-12 h-12 text-white/20 transition-all duration-500 group-hover:text-white/40 group-hover:scale-110 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 10V0h10" />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </svg>
            <svg className="absolute top-6 right-6 w-12 h-12 text-white/20 transition-all duration-500 group-hover:text-white/40 group-hover:scale-110 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M24 10V0h-10" />
              <circle cx="14" cy="10" r="2" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-6 left-6 w-12 h-12 text-white/20 transition-all duration-500 group-hover:text-white/40 group-hover:scale-110 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 14v10h10" />
              <circle cx="10" cy="14" r="2" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-6 right-6 w-12 h-12 text-white/20 transition-all duration-500 group-hover:text-white/40 group-hover:scale-110 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M24 14v10h-10" />
              <circle cx="14" cy="14" r="2" fill="currentColor" />
            </svg>

            {/* Bottom info strip */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-gray-950/90 to-transparent">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Brand mark */}
                  <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shadow-[0_8px_30px_rgba(7,90,1,0.5)] border border-white/10">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Platform</p>
                    <p className="text-lg font-bold text-white">Feast Basket</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                    <span className="h-2 w-2 rounded-full bg-[#0a9001] animate-pulse" />
                    E-commerce Platform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div className="animate-[fadeUp_1s_ease-out_0.4s_both]">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#075a01]/20 to-[#075a01]/10 border border-[#075a01]/30 shadow-[0_0_30px_rgba(7,90,1,0.2)]">
                <svg className="w-7 h-7 text-[#0a9001]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Project Overview</h2>
                <p className="text-sm text-gray-500">The vision and scope</p>
              </div>
            </div>

            {/* Overview card */}
            <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="absolute top-0 left-0 h-32 w-32 bg-gradient-to-br from-[#075a01]/10 to-transparent rounded-tl-3xl" />
              
              <div className="relative space-y-6 text-base md:text-lg leading-relaxed text-gray-300">
                <p>
                  Feast Basket was built to solve a practical problem: making <span className="text-white font-semibold">grocery ordering</span> simple, <span className="text-[#0a9001] font-semibold">reliable</span>, and <span className="text-[#ff914d] font-semibold">fast</span> for everyday users. The platform prioritizes clarity, product visibility, and frictionless checkout.
                </p>
                <p>
                  The design balances warmth and structure, ensuring customers feel confident browsing products while vendors can scale operations efficiently. Every element was crafted to maximize conversion and customer satisfaction.
                </p>
              </div>

              {/* Highlight stats */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { value: "100%", label: "Mobile Optimized" },
                  { value: "<2s", label: "Load Time" },
                  { value: "∞", label: "Scalability" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0a9001] to-[#ff914d] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Deliverables */}
          <div className="animate-[fadeUp_1s_ease-out_0.5s_both]">
            <div className="sticky top-8">
              <div className="relative group">
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#ff914d]/40 via-transparent to-[#075a01]/40 opacity-60" />
                
                <div className="relative rounded-[23px] bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#ff914d] to-[#ff6b1a] shadow-[0_4px_15px_rgba(255,145,77,0.4)]">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">Deliverables</h3>
                  </div>

                  <ul className="space-y-3">
                    {deliverables.map((item, index) => (
                      <li
                        key={index}
                        className="
                          group/item flex items-center gap-3 p-3 rounded-xl
                          bg-white/[0.02] border border-white/[0.04]
                          transition-all duration-300
                          hover:bg-white/[0.05] hover:border-white/[0.08]
                        "
                      >
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-lg bg-[#ff914d]/20 text-[#ff914d] text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIVES SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 md:px-10 animate-[fadeUp_1s_ease-out_0.5s_both]">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#ff914d]/20 to-[#ff914d]/10 border border-[#ff914d]/30 shadow-[0_0_30px_rgba(255,145,77,0.2)]">
            <svg className="w-7 h-7 text-[#ff914d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Project Objectives</h2>
            <p className="text-sm text-gray-500">What we aimed to achieve</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {objectives.map((item, index) => (
            <div
              key={index}
              className="
                group relative flex items-start gap-5 p-6 rounded-3xl
                bg-white/[0.02] border border-white/[0.06]
                backdrop-blur-sm
                transition-all duration-500
                hover:bg-white/[0.05] hover:border-white/[0.12]
                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
              "
            >
              {/* Gradient glow on hover */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#075a01]/20 to-[#ff914d]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white text-2xl shadow-[0_8px_25px_rgba(7,90,1,0.4)] group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </span>
              
              <div className="relative flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                  Objective {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base md:text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 md:px-10 animate-[fadeUp_1s_ease-out_0.6s_both]">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#075a01]/20 via-[#ff914d]/10 to-[#ff914d]/20 border border-white/10 shadow-[0_0_30px_rgba(7,90,1,0.15)]">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our Process</h2>
            <p className="text-sm text-gray-500">How we brought it to life</p>
          </div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-7 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#075a01] via-[#ff914d] to-[#075a01] opacity-30" />

          <div className="space-y-8">
            {process.map((step, index) => (
              <div
                key={index}
                className={`
                  relative flex flex-col md:flex-row gap-8
                  ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
                `}
              >
                {/* Timeline dot */}
                <div className="absolute left-7 md:left-1/2 -translate-x-1/2 top-0 z-10">
                  <div className="relative flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white text-lg font-bold shadow-[0_0_30px_rgba(7,90,1,0.5)] border-4 border-gray-950">
                    {step.phase}
                  </div>
                </div>

                {/* Content card */}
                <div className={`
                  flex-1 ml-20 md:ml-0
                  ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}
                `}>
                  <div
                    className="
                      group p-6 rounded-3xl
                      bg-white/[0.02] border border-white/[0.06]
                      backdrop-blur-sm
                      transition-all duration-500
                      hover:bg-white/[0.05] hover:border-white/[0.12]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                    "
                  >
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff914d] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternate layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 pb-28 md:px-10 animate-[fadeUp_1s_ease-out_0.7s_both]">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#ff914d]/20 to-[#ff914d]/10 border border-[#ff914d]/30 shadow-[0_0_30px_rgba(255,145,77,0.2)]">
            <svg className="w-7 h-7 text-[#ff914d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Platform Visuals</h2>
            <p className="text-sm text-gray-500">The complete e-commerce experience</p>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`
                group relative overflow-hidden rounded-3xl
                bg-white/[0.02] border border-white/[0.06]
                shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                transition-all duration-700
                hover:-translate-y-2
                hover:shadow-[0_30px_70px_rgba(0,0,0,0.4),0_0_40px_rgba(7,90,1,0.15)]
                hover:border-white/[0.12]
                cursor-pointer
              `}
            >
              <div
                className="
                  h-[260px] bg-cover bg-center
                  transition-all duration-[1200ms] ease-out
                  group-hover:scale-110
                "
                style={{ backgroundImage: `url(${img.src})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                    {img.label}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-bold text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Corner accent */}
              <svg className="absolute top-4 right-4 w-6 h-6 text-white/20 group-hover:text-white/40 transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M24 8V0h-8" />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 pb-32 md:px-10 animate-[fadeUp_1s_ease-out_0.8s_both]">
        <div className="group relative">
          {/* Outer glow */}
          <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-r from-[#075a01]/30 via-[#ff914d]/25 to-[#075a01]/30 opacity-60 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          
          {/* Animated border */}
          <div className="absolute -inset-[3px] rounded-[44px] bg-gradient-to-br from-[#075a01] via-[#ff914d] to-[#075a01] opacity-80 animate-[gradient_5s_ease-in-out_infinite] bg-[length:200%_200%]" />

          <div
            className="
              relative overflow-hidden rounded-[41px]
              bg-gradient-to-br from-[#075a01] via-[#065201] to-[#054501]
              px-8 py-14 md:px-16 md:py-20
              shadow-[0_40px_100px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]
            "
          >
            {/* Inner glows */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-white/[0.08] blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-[350px] w-[350px] rounded-full bg-[#ff914d]/20 blur-[120px]" />

            {/* Pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />

            {/* Corner frames */}
            <svg className="absolute top-8 left-8 w-10 h-10 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 10V0h10" />
            </svg>
            <svg className="absolute top-8 right-8 w-10 h-10 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M24 10V0h-10" />
            </svg>
            <svg className="absolute bottom-8 left-8 w-10 h-10 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 14v10h10" />
            </svg>
            <svg className="absolute bottom-8 right-8 w-10 h-10 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M24 14v10h-10" />
            </svg>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 mb-6 border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    Start Selling Online
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Want a high-performing e-commerce platform?
                </h2>

                <p className="text-base text-white/80 leading-relaxed">
                  Fancy Digitals designs e-commerce systems that are clear,
                  conversion-focused, and built to scale with your business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="
                    group/btn relative inline-flex items-center justify-center
                    rounded-xl bg-white
                    px-8 py-4
                    text-base font-bold text-[#075a01]
                    shadow-[0_15px_40px_rgba(0,0,0,0.2)]
                    transition-all duration-300
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                    hover:scale-105
                    active:scale-95
                    overflow-hidden
                  "
                >
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#075a01]/10 to-transparent skew-x-12" />
                  <span className="relative flex items-center gap-2">
                    Start a Project
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </a>

                <a
                  href="/portfolio"
                  className="
                    inline-flex items-center justify-center
                    rounded-xl border-2 border-white/30 bg-white/5
                    px-8 py-4
                    text-base font-bold text-white
                    transition-all duration-300
                    hover:bg-white/15 hover:border-white/50
                    hover:scale-105
                    active:scale-95
                  "
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Portfolio
                </a>
              </div>
            </div>

            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff914d] via-white to-[#ff914d] bg-[length:200%_100%] animate-[gradient_4s_linear_infinite] rounded-b-[41px]" />
          </div>
        </div>
      </section>

      {/* Bottom decorative */}
      <div className="pb-16 flex justify-center">
        <div className="flex items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/20" />
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#075a01] animate-pulse" />
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01] animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="h-2 w-2 rounded-full bg-[#ff914d] animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </div>
      
      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.5; }
          50% { transform: translateY(-25px) rotate(180deg) scale(1.1); opacity: 0.8; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}