/* =====================================================
   TOOLS PAGE — BRIGHT, CREATIVE, PREMIUM
===================================================== */

const TOOLS = [
  {
    slug: "ai-landing-page-generator",
    name: "AI Landing Page Generator",
    category: "Marketing",
    desc: "Generate high-converting landing page structures and copy with clarity and speed.",
    image: "/tools/ai-landing.png",
    icon: "🚀",
    accent: "#075a01",
    accentLight: "from-[#075a01]/10 to-[#0a8f01]/10",
    popular: true,
  },
  {
    slug: "brand-identity-builder",
    name: "Brand Identity Builder",
    category: "Design",
    desc: "Create a consistent brand system with colors, typography, and visual direction.",
    image: "/tools/brand-identity.png",
    icon: "🎨",
    accent: "#ff914d",
    accentLight: "from-[#ff914d]/10 to-[#ff6b1a]/10",
    popular: true,
  },
  {
    slug: "seo-content-planner",
    name: "SEO Content Planner",
    category: "SEO",
    desc: "Plan content around real search intent and long-term organic growth.",
    image: "/tools/seo.png",
    icon: "📈",
    accent: "#0ea5e9",
    accentLight: "from-[#0ea5e9]/10 to-[#06b6d4]/10",
    popular: false,
  },
  {
    slug: "email-sequence-mapper",
    name: "Email Sequence Mapper",
    category: "Email Marketing",
    desc: "Structure email flows that improve engagement, retention, and conversion.",
    image: "/tools/email.png",
    icon: "📧",
    accent: "#8b5cf6",
    accentLight: "from-[#8b5cf6]/10 to-[#a78bfa]/10",
    popular: false,
  },
  {
    slug: "conversion-audit-checklist",
    name: "Conversion Audit Checklist",
    category: "Optimization",
    desc: "Identify friction points and missed opportunities across your website.",
    image: "/tools/conversion.png",
    icon: "✅",
    accent: "#22c55e",
    accentLight: "from-[#22c55e]/10 to-[#4ade80]/10",
    popular: false,
  },
  {
    slug: "product-launch-planner",
    name: "Product Launch Planner",
    category: "Strategy",
    desc: "Plan launches with structure, clarity, and execution confidence.",
    image: "/tools/launch.png",
    icon: "🎯",
    accent: "#f97316",
    accentLight: "from-[#f97316]/10 to-[#fb923c]/10",
    popular: true,
  },
];

const CATEGORIES = [
  { name: "All Tools", icon: "✨", count: 6 },
  { name: "Marketing", icon: "📣", count: 1 },
  { name: "Design", icon: "🎨", count: 1 },
  { name: "SEO", icon: "📈", count: 1 },
  { name: "Email Marketing", icon: "📧", count: 1 },
  { name: "Strategy", icon: "🎯", count: 1 },
];

const BENEFITS = [
  {
    title: "Save Hours of Work",
    desc: "Skip the guesswork and get structured outputs in minutes, not days.",
    icon: "⏱️",
  },
  {
    title: "Proven Frameworks",
    desc: "Each tool is built on tested methodologies and real-world experience.",
    icon: "📐",
  },
  {
    title: "Completely Free",
    desc: "All tools are free to use — no sign-up required, no hidden costs.",
    icon: "🎁",
  },
  {
    title: "Always Improving",
    desc: "We continuously update tools based on feedback and best practices.",
    icon: "🔄",
  },
];

/* =====================================================
   PAGE
===================================================== */

export default function ToolsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-[#0ea5e9]/5 blur-[80px]" />
        <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#8b5cf6]/8 blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Floating shapes */}
        <div className="absolute left-[8%] top-32 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20" />
        <div
          className="absolute right-[12%] top-48 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/30"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute left-[15%] top-[55%] h-2 w-2 animate-bounce rounded-full bg-[#0ea5e9]/25"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute right-[20%] top-[35%] h-5 w-5 animate-bounce rounded-full border-2 border-[#8b5cf6]/20"
          style={{ animationDelay: "0.3s" }}
        />
        <div className="absolute left-[5%] top-[40%] h-6 w-6 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/15" />
        <div
          className="absolute right-[8%] top-[65%] h-4 w-4 animate-bounce rounded-full bg-[#22c55e]/15"
          style={{ animationDelay: "0.7s" }}
        />
        <div
          className="absolute left-[25%] top-[80%] h-3 w-3 animate-bounce rounded-full bg-[#f97316]/20"
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
              <span className="text-sm font-semibold text-gray-900">Tools</span>
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
                Free Digital Tools
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Practical tools built to
              <span className="relative mx-2 mt-3 block">
                <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#0ea5e9] bg-clip-text text-transparent">
                  save time
                </span>
                <span className="mx-2 text-gray-900">&</span>
                <span className="bg-gradient-to-r from-[#ff914d] to-[#f97316] bg-clip-text text-transparent">
                  increase clarity
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              These tools are designed to remove guesswork from common digital
              decisions — from{" "}
              <span className="font-semibold text-gray-900">marketing</span> and{" "}
              <span className="font-semibold text-gray-900">SEO</span> to{" "}
              <span className="font-semibold text-gray-900">branding</span> and{" "}
              <span className="font-semibold text-gray-900">launches</span>.
            </p>
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4">
            {[
              { value: "6+", label: "Free Tools", icon: "🛠️" },
              { value: "100%", label: "Free Forever", icon: "🎁" },
              { value: "0", label: "Sign-up Required", icon: "🚫" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-lg"
              >
                <span className="mb-2 block text-2xl">{stat.icon}</span>
                <p className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-500 md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="relative px-5 pb-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category, index) => (
              <button
                key={category.name}
                className={`group flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  index === 0
                    ? "bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white shadow-lg shadow-[#075a01]/25"
                    : "border-2 border-gray-100 bg-white text-gray-600 hover:border-[#075a01]/20 hover:bg-[#075a01]/5 hover:text-[#075a01]"
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    index === 0
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TOOL */}
      <section className="relative px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#075a01]/20 bg-gradient-to-br from-white to-gray-50 shadow-xl">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#075a01]/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ff914d]/5 blur-3xl" />

            <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
              {/* Left: Content */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
                  <span className="text-lg">⭐</span>
                  <span className="text-sm font-bold text-[#075a01]">
                    Featured Tool
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  AI Landing Page Generator
                </h2>

                <p className="mt-4 text-lg text-gray-600">
                  Generate high-converting landing page structures and copy with
                  clarity and speed. Perfect for marketers, founders, and
                  agencies.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Generate complete landing page copy",
                    "Multiple industry templates",
                    "Conversion-focused structure",
                    "Export to any platform",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#075a01]/10">
                        <svg
                          className="h-4 w-4 text-[#075a01]"
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
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/tools/ai-landing-page-generator"
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 font-bold text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Try It Free
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
              </div>

              {/* Right: Visual */}
              <div className="relative flex items-center justify-center">
                <div className="relative">
                  {/* Background shape */}
                  <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 blur-xl" />

                  {/* Tool preview card */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    <div className="h-4 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#0ea5e9]" />
                    <div className="p-6">
                      {/* Mock UI */}
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                        <div className="h-3 w-3 rounded-full bg-green-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 w-3/4 rounded bg-gray-200" />
                        <div className="h-3 w-full rounded bg-gray-100" />
                        <div className="h-3 w-5/6 rounded bg-gray-100" />
                        <div className="mt-4 h-8 w-32 rounded-lg bg-[#075a01]" />
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -left-6 top-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-lg">
                    🚀
                  </div>
                  <div className="absolute -right-6 bottom-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-lg">
                    ✨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2">
              <span className="text-sm font-semibold text-[#ff914d]">
                All Tools
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Explore our{" "}
              <span className="text-[#075a01]">complete toolkit</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, index) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
                style={{
                  "--tool-accent": tool.accent,
                }}
              >
                {/* Hover gradient border */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${tool.accent}40, transparent, ${tool.accent}20)`,
                  }}
                />
                <div className="absolute inset-[2px] rounded-[22px] bg-white" />

                {/* Popular badge */}
                {tool.popular && (
                  <div
                    className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: tool.accent }}
                  >
                    Popular
                  </div>
                )}

                {/* Content */}
                <div className="relative">
                  {/* Image/Preview area */}
                  <div
                    className={`relative h-[180px] overflow-hidden rounded-t-3xl bg-gradient-to-br ${tool.accentLight}`}
                  >
                    {/* Tool icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50">
                        {tool.icon}
                      </span>
                    </div>

                    {/* Decorative elements */}
                    <div
                      className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-2xl"
                      style={{ backgroundColor: `${tool.accent}15` }}
                    />
                  </div>

                  {/* Text content */}
                  <div className="relative p-6">
                    {/* Category */}
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: tool.accent }}
                      />
                      <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: tool.accent }}
                      >
                        {tool.category}
                      </p>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-gray-700">
                      {tool.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                      {tool.desc}
                    </p>

                    {/* CTA */}
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="flex items-center gap-2 text-sm font-bold transition-colors"
                        style={{ color: tool.accent }}
                      >
                        Try tool
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
                      </span>

                      {/* Free badge */}
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        Free
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
            {/* Section header */}
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
                <span className="text-sm font-semibold text-[#075a01]">
                  Why Use Our Tools
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Built for{" "}
                <span className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-transparent">
                  real results
                </span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit, idx) => (
                <div key={benefit.title} className="group text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:from-[#075a01] group-hover:to-[#ff914d] group-hover:shadow-lg">
                    <span className="transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert">
                      {benefit.icon}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0ea5e9]/10 px-4 py-2">
              <span className="text-sm font-semibold text-[#0ea5e9]">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Get results in{" "}
              <span className="text-[#0ea5e9]">3 simple steps</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose a Tool",
                desc: "Browse our collection and pick the tool that fits your current challenge.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Input Your Details",
                desc: "Fill in the required information — no sign-up, no credit card needed.",
                icon: "✍️",
              },
              {
                step: "03",
                title: "Get Your Output",
                desc: "Receive structured, actionable results you can implement immediately.",
                icon: "🎉",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="group relative rounded-2xl border-2 border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#0ea5e9]/20 hover:shadow-xl"
              >
                {/* Connector line */}
                {idx < 2 && (
                  <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 bg-gradient-to-r from-[#0ea5e9]/30 to-transparent md:block" />
                )}

                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#0ea5e9]">
                  Step {item.step}
                </span>

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0ea5e9]/10 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0ea5e9] group-hover:shadow-lg">
                  <span className="transition-all group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert">
                    {item.icon}
                  </span>
                </div>

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
      </section>

      {/* REQUEST A TOOL */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg md:grid-cols-2 md:p-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#8b5cf6]/10 px-4 py-2">
                <span className="text-sm font-semibold text-[#8b5cf6]">
                  Have an Idea?
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Request a new tool
              </h2>

              <p className="mt-4 text-gray-600">
                Can&apos;t find what you need? Let us know what tool would help
                your business, and we might build it next.
              </p>

              <a
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 font-semibold text-[#8b5cf6] transition-colors hover:text-[#7c3aed]"
              >
                Submit your idea
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

            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#8b5cf6]/10">
                  <span className="text-6xl">💡</span>
                </div>
                <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg">
                  ✨
                </div>
                <div className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg">
                  🛠️
                </div>
              </div>
            </div>
          </div>
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
                  Need Custom Solutions?
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Want a tool built
                <span className="block text-[#ffed4e]">just for you?</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
                We also build custom digital tools for businesses. From
                calculators to dashboards, let&apos;s create something unique
                for your needs.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#075a01] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Discuss Your Idea
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
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
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
            Need help choosing the right tool?{" "}
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