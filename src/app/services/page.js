/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title: "Services | Fancy Digitals",
  description:
    "A structured overview of the services offered by Fancy Digitals, outlining scope, focus, and delivery philosophy.",
};

/* =====================================================
   SERVICES DATA
===================================================== */

const SERVICES = [
  {
    title: "Website Design & Development",
    focus: "Structure, performance, and long-term clarity",
    description:
      "We design and build modern websites that feel premium, load fast, and remain easy to extend over time. Every layout is intentional, conversion-aware, and engineered with future growth in mind.",
    includes: [
      "Marketing and business websites",
      "E-commerce storefronts",
      "Landing pages",
      "Responsive frontend builds",
      "Performance and structural optimization",
    ],
    icon: "🌐",
    color: "from-[#075a01] to-[#0a8f01]",
    lightColor: "from-[#075a01]/10 to-[#0a8f01]/10",
  },
  {
    title: "UI / UX Design",
    focus: "Usability, hierarchy, and user confidence",
    description:
      "Our UI / UX work focuses on clarity and flow. Interfaces are designed to reduce friction, guide attention, and support confident decision-making rather than visual noise.",
    includes: [
      "User interface design",
      "User experience strategy",
      "Wireframes and layout systems",
      "Design systems and components",
      "Mobile-first interaction design",
    ],
    icon: "🎨",
    color: "from-[#ff914d] to-[#ff6b1a]",
    lightColor: "from-[#ff914d]/10 to-[#ff6b1a]/10",
  },
  {
    title: "Brand Identity & Visual Systems",
    focus: "Consistency, trust, and recognition",
    description:
      "We build brand systems that look intentional and remain consistent across all touchpoints. The goal is long-term credibility, not short-lived design trends.",
    includes: [
      "Logo design and refinement",
      "Color and typography systems",
      "Brand usage guidelines",
      "Visual consistency rules",
      "Marketing and social templates",
    ],
    icon: "✨",
    color: "from-[#075a01] to-[#ff914d]",
    lightColor: "from-[#075a01]/10 to-[#ff914d]/10",
  },
  {
    title: "Email Marketing Systems",
    focus: "Retention, structure, and engagement",
    description:
      "We design structured email systems that support customer journeys, improve retention, and maintain brand clarity across every message.",
    includes: [
      "Email template design",
      "Campaign structure",
      "Lifecycle and nurture flows",
      "Copy and design alignment",
      "Brand-consistent layouts",
    ],
    icon: "📧",
    color: "from-[#0a8f01] to-[#075a01]",
    lightColor: "from-[#0a8f01]/10 to-[#075a01]/10",
  },
  {
    title: "SEO & Website Foundations",
    focus: "Clean structure and sustainable growth",
    description:
      "Our SEO work focuses on building clean technical foundations that support sustainable organic growth, rather than short-term tactics.",
    includes: [
      "Technical SEO audits",
      "On-page optimization",
      "Site structure improvements",
      "Performance and crawlability fixes",
      "Content hierarchy guidance",
    ],
    icon: "📈",
    color: "from-[#ff914d] to-[#075a01]",
    lightColor: "from-[#ff914d]/10 to-[#075a01]/10",
  },
];

const APPROACH = [
  {
    step: "01",
    title: "Understand",
    desc: "We listen first. Every project starts with understanding your goals, challenges, and audience.",
    icon: "👂",
  },
  {
    step: "02",
    title: "Strategize",
    desc: "We create a clear roadmap that aligns design, technology, and business objectives.",
    icon: "🎯",
  },
  {
    step: "03",
    title: "Execute",
    desc: "We build with precision, maintaining open communication throughout the process.",
    icon: "⚡",
  },
  {
    step: "04",
    title: "Deliver",
    desc: "We launch, optimize, and ensure everything performs exactly as intended.",
    icon: "🚀",
  },
];

const WHY_CHOOSE_US = [
  {
    title: "Premium Quality",
    desc: "Every project receives the same attention to detail and commitment to excellence.",
    icon: "💎",
  },
  {
    title: "Clear Communication",
    desc: "No jargon, no surprises. We keep you informed at every step.",
    icon: "💬",
  },
  {
    title: "Long-term Thinking",
    desc: "We build systems that scale and remain maintainable over time.",
    icon: "🔮",
  },
  {
    title: "Results-Driven",
    desc: "Beautiful design that actually converts and drives business growth.",
    icon: "📊",
  },
];

/* =====================================================
   PAGE
===================================================== */

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-[#075a01]/5 blur-[80px]" />
        <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/8 blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Floating shapes */}
        <div className="absolute left-[8%] top-32 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20" />
        <div
          className="absolute right-[12%] top-48 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/30"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute left-[15%] top-[55%] h-2 w-2 animate-bounce rounded-full bg-[#075a01]/25"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute right-[20%] top-[35%] h-5 w-5 animate-bounce rounded-full border-2 border-[#ff914d]/20"
          style={{ animationDelay: "0.3s" }}
        />
        <div className="absolute left-[5%] top-[40%] h-6 w-6 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/15" />
        <div
          className="absolute right-[8%] top-[65%] h-4 w-4 animate-bounce rounded-full bg-[#075a01]/15"
          style={{ animationDelay: "0.7s" }}
        />
        <div
          className="absolute left-[25%] top-[80%] h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/20"
          style={{ animationDelay: "0.9s" }}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-sm">
              <a
                href="/"
                className="text-sm text-gray-500 transition-colors hover:text-[#075a01]"
              >
                Home
              </a>
              <svg
                className="h-4 w-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-900">
                Services
              </span>
            </div>
          </nav>

          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="group inline-flex items-center gap-3 rounded-full border border-[#075a01]/20 bg-white px-5 py-2.5 shadow-lg shadow-[#075a01]/5 transition-all duration-300 hover:border-[#075a01]/30 hover:shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#075a01] opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#075a01]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                Our Services
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              What we do, and
              <span className="relative mx-2 mt-3 block">
                <span className="relative z-10 bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  how we do it
                </span>
                <svg
                  className="absolute -bottom-2 left-1/2 w-40 -translate-x-1/2 md:w-56"
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
                      <stop offset="1" stopColor="#ff914d" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Each service is defined by{" "}
              <span className="font-semibold text-gray-900">scope</span>,{" "}
              <span className="font-semibold text-gray-900">focus</span>, and{" "}
              <span className="font-semibold text-gray-900">
                delivery principles
              </span>{" "}
              — designed to bring clarity and premium quality to every project.
            </p>
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: "5+", label: "Core Services" },
              { value: "50+", label: "Projects Done" },
              { value: "98%", label: "Satisfaction" },
              { value: "24h", label: "Response Time" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-lg"
              >
                <p className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-3xl font-bold text-transparent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-[#075a01]/20 hover:shadow-2xl hover:shadow-[#075a01]/5"
              >
                {/* Top gradient bar */}
                <div
                  className={`h-1.5 bg-gradient-to-r ${service.color}`}
                />

                {/* Decorative background */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br from-[#075a01]/5 to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative p-8 md:p-10 lg:p-12">
                  <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                    {/* Left: Header & Description */}
                    <div>
                      {/* Service number & icon */}
                      <div className="mb-6 flex items-center gap-4">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.lightColor} text-3xl transition-transform duration-300 group-hover:scale-110`}
                        >
                          {service.icon}
                        </div>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
                          Service {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        {service.title}
                      </h2>

                      {/* Focus badge */}
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
                        <svg
                          className="h-4 w-4 text-[#075a01]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-[#075a01]">
                          {service.focus}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-6 text-base leading-relaxed text-gray-600">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <a
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 font-semibold text-[#075a01] transition-colors hover:text-[#0a8f01]"
                      >
                        <span>Get started</span>
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
                      </a>
                    </div>

                    {/* Right: Includes list */}
                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 md:p-8">
                      <p className="mb-5 flex items-center gap-2 text-sm font-bold text-gray-900">
                        <svg
                          className="h-5 w-5 text-[#075a01]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          />
                        </svg>
                        Scope includes
                      </p>

                      <ul className="space-y-3">
                        {service.includes.map((item, idx) => (
                          <li
                            key={item}
                            className="group/item flex items-start gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-white hover:shadow-sm"
                          >
                            <span
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${service.lightColor} text-xs font-bold text-[#075a01]`}
                            >
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-600 transition-colors group-hover/item:text-gray-900">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
            {/* Section header */}
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2">
                <span className="text-sm font-semibold text-[#ff914d]">
                  Our Approach
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                How we{" "}
                <span className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-transparent">
                  work with you
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                A proven process that ensures clarity, quality, and results at
                every stage.
              </p>
            </div>

            {/* Process steps */}
            <div className="grid gap-8 md:grid-cols-4">
              {APPROACH.map((item, idx) => (
                <div key={item.step} className="group relative text-center">
                  {/* Connector line */}
                  {idx < 3 && (
                    <div className="absolute left-[60%] top-10 hidden h-0.5 w-full bg-gradient-to-r from-[#075a01]/20 to-transparent md:block" />
                  )}

                  <div className="relative mb-5 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:from-[#075a01] group-hover:to-[#ff914d] group-hover:text-white group-hover:shadow-lg">
                    {item.icon}
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#ff914d]">
                    Step {item.step}
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
              <span className="text-sm font-semibold text-[#075a01]">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              What makes us{" "}
              <span className="text-[#ff914d]">different</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={item.title}
                className="group rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#075a01]/20 hover:shadow-xl"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:from-[#075a01] group-hover:to-[#ff914d] group-hover:shadow-lg">
                  {item.icon}
                </div>

                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Starter",
                price: "₦150k",
                period: "starting at",
                features: [
                  "Single page website",
                  "Mobile responsive",
                  "Basic SEO setup",
                  "1 revision round",
                ],
                popular: false,
              },
              {
                title: "Professional",
                price: "₦500k",
                period: "starting at",
                features: [
                  "Multi-page website",
                  "Custom design",
                  "Advanced SEO",
                  "3 revision rounds",
                  "Priority support",
                ],
                popular: true,
              },
              {
                title: "Enterprise",
                price: "Custom",
                period: "tailored to you",
                features: [
                  "Full digital solution",
                  "Brand identity",
                  "E-commerce ready",
                  "Unlimited revisions",
                  "Dedicated support",
                ],
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.title}
                className={`group relative overflow-hidden rounded-3xl border-2 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.popular
                    ? "border-[#075a01] bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white shadow-lg shadow-[#075a01]/25"
                    : "border-gray-100 bg-white hover:border-[#075a01]/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-[#ff914d] px-3 py-1 text-xs font-bold">
                    Most Popular
                  </div>
                )}

                <p
                  className={`text-sm font-semibold ${
                    plan.popular ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {plan.period}
                </p>
                <p
                  className={`mt-2 text-4xl font-bold ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mt-1 text-xl font-bold ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <svg
                        className={`h-5 w-5 ${
                          plan.popular ? "text-[#ffed4e]" : "text-[#075a01]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          plan.popular ? "text-white/90" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`mt-8 block w-full rounded-xl py-4 text-center font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-white text-[#075a01] hover:bg-gray-100"
                      : "bg-[#075a01] text-white hover:bg-[#0a8f01]"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            * Prices are estimates. Final pricing depends on project scope and
            requirements.{" "}
            <a href="/contact" className="text-[#075a01] hover:underline">
              Contact us
            </a>{" "}
            for a custom quote.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-10 shadow-2xl shadow-[#075a01]/25 md:p-16">
            {/* Background decorations */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ff914d]/20 blur-3xl" />

            {/* Pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

            <div className="relative text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-semibold text-white">
                  Ready to Start?
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Let&apos;s build something
                <span className="block text-[#ffed4e]">remarkable together</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
                Whether you need a new website, brand identity, or complete
                digital transformation, we&apos;re here to help bring your vision
                to life.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#075a01] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Start Your Project
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
                </a>

                <a
                  href="https://wa.me/2349034360785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-white/10"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM QUICK CONTACT */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-500">
            Have questions about our services?{" "}
            <a
              href="/contact"
              className="font-semibold text-[#075a01] hover:underline"
            >
              Contact us
            </a>{" "}
            or call{" "}
            <a
              href="tel:+2349045547761"
              className="font-semibold text-[#075a01] hover:underline"
            >
              +234 904 554 7761
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}