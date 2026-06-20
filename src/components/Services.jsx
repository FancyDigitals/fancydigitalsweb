/* =====================================================
   SERVICES PREVIEW — BRIGHT, CREATIVE, PREMIUM
===================================================== */

export default function ServicesPreview() {
  const SERVICES = [
    {
      title: "Web Design & Development",
      shortTitle: "Web Design",
      desc: "High-performance websites built with clarity, speed, and long-term scalability in mind.",
      icon: (
        <svg className="h-5 w-5 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="#075a01" strokeWidth="2" />
          <path d="M8 20H16" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 18V20" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      gradient: "from-[#075a01] to-[#0a8f01]",
      lightGradient: "from-[#075a01]/10 to-[#0a8f01]/10",
      delay: "0s",
    },
    {
      title: "Brand Identity & Design",
      shortTitle: "Branding",
      desc: "Cohesive brand systems that communicate trust, consistency, and authority.",
      icon: (
        <svg className="h-5 w-5 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#075a01" strokeWidth="2" />
          <path d="M12 3V21" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 12H21" stroke="#ff914d" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      gradient: "from-[#ff914d] to-[#ff6b1a]",
      lightGradient: "from-[#ff914d]/10 to-[#ff6b1a]/10",
      delay: "0.1s",
    },
    {
      title: "UI / UX Design",
      shortTitle: "UI/UX",
      desc: "User-centered interfaces engineered for usability, clarity, and conversion.",
      icon: (
        <svg className="h-5 w-5 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="#075a01" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8" cy="12" r="2" fill="#ff914d" />
        </svg>
      ),
      gradient: "from-[#075a01] via-[#0a8f01] to-[#ff914d]",
      lightGradient: "from-[#075a01]/10 via-[#0a8f01]/10 to-[#ff914d]/10",
      delay: "0.2s",
    },
  ];

  return (
    <section
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-12 sm:py-20 md:py-24 lg:py-32"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] animate-pulse rounded-full bg-[#075a01]/5 blur-[80px] sm:blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] animate-pulse rounded-full bg-[#ff914d]/5 blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] animate-pulse rounded-full bg-[#075a01]/3 blur-[60px] sm:blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px]" />

        {/* Floating shapes — hidden on mobile */}
        <div className="hidden sm:block absolute left-[10%] top-32 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20" />
        <div className="hidden sm:block absolute right-[15%] top-48 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/25" style={{ animationDelay: "0.5s" }} />
        <div className="hidden sm:block absolute bottom-32 left-[20%] h-5 w-5 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/15" style={{ animationDelay: "0.3s" }} />
        <div className="hidden sm:block absolute right-[8%] top-[60%] h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/20" style={{ animationDelay: "0.7s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">

        {/* Header */}
        <header className="relative mb-8 sm:mb-12 md:mb-16 text-center">
          <h2
            id="services-heading"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
          >
            <span className="block">What we do,</span>
            <span className="relative mt-1 sm:mt-2 inline-block">
              <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent">
                intentionally
              </span>
              <svg
                className="absolute -bottom-2 sm:-bottom-3 left-1/2 w-32 sm:w-48 md:w-64 -translate-x-1/2"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 4 150 4 198 10"
                  stroke="url(#services-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="services-underline" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#075a01" />
                    <stop offset="0.5" stopColor="#ff914d" />
                    <stop offset="1" stopColor="#075a01" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-5 sm:mt-7 md:mt-8 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 px-2">
            We design and build digital systems that feel{" "}
            <span className="font-semibold text-gray-900">premium</span>, remain{" "}
            <span className="font-semibold text-gray-900">clear</span>, and scale
            without breaking. Each service is structured for{" "}
            <span className="font-semibold text-gray-900">long-term value</span>.
          </p>
        </header>

        {/* Services grid — 2 cols mobile, 3 cols desktop */}
        <ul role="list" className="relative grid gap-3 sm:gap-6 md:gap-8 grid-cols-2 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className={`group ${index === 2 ? "col-span-2 md:col-span-1" : ""}`}
              style={{ animationDelay: service.delay }}
            >
              <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-100 bg-white p-3 sm:p-6 md:p-8 lg:p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-transparent hover:shadow-2xl">
                {/* Gradient border on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="absolute inset-[2px] rounded-[14px] sm:rounded-[22px] bg-white" />

                {/* Content */}
                <div className="relative">
                  {/* Icon with background */}
                  <div className="mb-3 sm:mb-5 md:mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.lightGradient} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      <span className="flex h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 group-hover:scale-110 transition">
                        {service.icon}
                      </span>
                    </div>

                    {/* Number badge */}
                    <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-100 transition-colors group-hover:text-gray-50 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title — short on mobile, full on desktop */}
                  <h3 className="mb-1.5 sm:mb-3 md:mb-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                    <span className="sm:hidden">{service.shortTitle}</span>
                    <span className="hidden sm:inline">{service.title}</span>
                  </h3>

                  {/* Description — hidden on smallest screens */}
                  <p className="mb-3 sm:mb-5 md:mb-6 text-[11px] sm:text-sm md:text-base leading-snug sm:leading-relaxed text-gray-600 line-clamp-3 sm:line-clamp-none">
                    {service.desc}
                  </p>

                  {/* Learn more link */}
                  <div className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold text-[#075a01] transition-all duration-300 group-hover:gap-2 sm:group-hover:gap-3">
                    <span>Learn more</span>
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="relative mt-8 sm:mt-12 md:mt-16 flex flex-col items-stretch sm:items-center justify-center gap-3 sm:flex-row">
          <a
            href="/services"
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-bold text-white shadow-xl shadow-[#075a01]/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#075a01]/30 active:scale-95"
          >
            <div className="absolute inset-0 -translate-x-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span className="relative">See all services</span>
            <svg
              className="relative h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>

          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border-2 border-gray-200 bg-white px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg active:scale-95"
          >
            <span>Get a Quote</span>
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#ff914d] transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </a>
        </div>

        {/* Bottom decorative */}
        <div className="mt-10 sm:mt-14 md:mt-16 flex justify-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gray-200" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-[#075a01]" />
              <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 animate-pulse rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01]" style={{ animationDelay: "0.2s" }} />
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-[#ff914d]" style={{ animationDelay: "0.4s" }} />
            </div>
            <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}