/* =====================================================
   SERVICES PREVIEW — BRIGHT, CREATIVE, PREMIUM
===================================================== */

export default function ServicesPreview() {
  const SERVICES = [
    {
      title: "Web Design & Development",
      desc: "High-performance websites built with clarity, speed, and long-term scalability in mind.",
      icon: "🌐",
      emoji: "💻",
      gradient: "from-[#075a01] to-[#0a8f01]",
      lightGradient: "from-[#075a01]/10 to-[#0a8f01]/10",
      delay: "0s",
    },
    {
      title: "Brand Identity & Design",
      desc: "Cohesive brand systems that communicate trust, consistency, and authority.",
      icon: "🎨",
      emoji: "✨",
      gradient: "from-[#ff914d] to-[#ff6b1a]",
      lightGradient: "from-[#ff914d]/10 to-[#ff6b1a]/10",
      delay: "0.1s",
    },
    {
      title: "UI / UX Design",
      desc: "User-centered interfaces engineered for usability, clarity, and conversion.",
      icon: "🎯",
      emoji: "💡",
      gradient: "from-[#075a01] via-[#0a8f01] to-[#ff914d]",
      lightGradient: "from-[#075a01]/10 via-[#0a8f01]/10 to-[#ff914d]/10",
      delay: "0.2s",
    },
  ];

  return (
    <section
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/5 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-[#075a01]/3 blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating shapes */}
        <div className="absolute left-[10%] top-32 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20" />
        <div
          className="absolute right-[15%] top-48 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/25"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-32 left-[20%] h-5 w-5 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/15"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute right-[8%] top-[60%] h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/20"
          style={{ animationDelay: "0.7s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <header className="relative mb-16 text-center">

          <h2
            id="services-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            <span className="block">What we do,</span>
            <span className="relative mt-2 inline-block">
              <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent">
                intentionally
              </span>
              <svg
                className="absolute -bottom-3 left-1/2 w-48 -translate-x-1/2 md:w-64"
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
                  <linearGradient
                    id="services-underline"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                  >
                    <stop stopColor="#075a01" />
                    <stop offset="0.5" stopColor="#ff914d" />
                    <stop offset="1" stopColor="#075a01" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            We design and build digital systems that feel{" "}
            <span className="font-semibold text-gray-900">premium</span>, remain{" "}
            <span className="font-semibold text-gray-900">clear</span>, and scale
            without breaking. Each service is structured for{" "}
            <span className="font-semibold text-gray-900">long-term value</span>.
          </p>
        </header>

        {/* Services grid */}
        <ul role="list" className="relative grid gap-8 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className="group"
              style={{ animationDelay: service.delay }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl md:p-10">
                {/* Gradient border on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="absolute inset-[2px] rounded-[22px] bg-white" />

                {/* Content */}
                <div className="relative">
                  {/* Icon with background */}
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.lightGradient} text-3xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      <span
                        className={`transition-all duration-300 group-hover:scale-110`}
                        style={{
                          filter: "grayscale(0)",
                        }}
                      >
                        {service.icon}
                      </span>
                    </div>

                    {/* Number badge */}
                    <span className="text-5xl font-bold text-gray-100 transition-colors group-hover:text-gray-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {service.desc}
                  </p>

                  {/* Learn more link */}
                  <div
                    className={`inline-flex items-center gap-2 font-semibold text-[#075a01] transition-all duration-300 group-hover:gap-3`}
                  >
                    <span>Learn more</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                  </div>

                  {/* Decorative emoji */}
                  <div className="absolute -right-4 -top-4 text-5xl opacity-0 transition-all duration-500 group-hover:opacity-20">
                    {service.emoji}
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

        {/* Feature highlights */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "⚡", label: "Fast Delivery", desc: "Quick turnaround times" },
            { icon: "💎", label: "Premium Quality", desc: "Top-tier execution" },
            { icon: "🔄", label: "Unlimited Revisions", desc: "Until you're satisfied" },
            { icon: "🛡️", label: "100% Secure", desc: "Your data is safe" },
          ].map((feature) => (
            <div
              key={feature.label}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </span>
              <div>
                <p className="font-bold text-gray-900">{feature.label}</p>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="relative mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/services"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-10 py-5 text-lg font-bold text-white shadow-xl shadow-[#075a01]/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#075a01]/30"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span className="relative">See all services</span>
            <svg
              className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>

          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-10 py-5 text-lg font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg"
          >
            <span>Get a Quote</span>
            <svg
              className="h-5 w-5 text-[#ff914d] transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </a>
        </div>

        {/* Bottom decorative */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#075a01]" />
              <div
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01]"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-[#ff914d]"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}