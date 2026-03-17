"use client";

import Image from "next/image";

/* =====================================================
   ABOUT PAGE — BRIGHT, CREATIVE, PREMIUM
===================================================== */

const founder = {
  name: "Bashir Ismail",
  alias: "Fancy",
  role: "Founder & Digital Architect",
  image: "/images/founder.jpg",
  bio: [
    "Bashir Ismail, widely known as Fancy, is the founder of Fancy Digitals — a premium digital studio focused on building calm, scalable, and intentional digital systems.",
    "With years of hands-on experience across design, frontend engineering, and digital strategy, he helps businesses replace chaos with structure and long-term clarity.",
  ],
};

const experience = [
  { years: 11, label: "Digital Experience", icon: "💡" },
  { years: 7, label: "Frontend Engineering", icon: "⚡" },
  { years: 5, label: "Product Design", icon: "🎨" },
  { years: 4, label: "System Architecture", icon: "🏗️" },
  { years: 3, label: "Agency Leadership", icon: "🚀" },
];

const values = [
  {
    title: "Clarity over noise",
    description:
      "Every decision is guided by simplicity, purpose, and long-term usefulness — not trends or vanity.",
    icon: "👁️",
  },
  {
    title: "Systems thinking",
    description:
      "Digital work is treated as an interconnected system, not isolated deliverables.",
    icon: "🔗",
  },
  {
    title: "Calm execution",
    description:
      "Workflows are designed to reduce friction, stress, and unnecessary complexity.",
    icon: "🧘",
  },
];

const clientTypes = [
  { text: "Founders building long-term digital products", icon: "🎯" },
  { text: "Growing brands needing structure and clarity", icon: "📈" },
  { text: "Agencies seeking reliable technical execution", icon: "🤝" },
  { text: "Teams replacing fragile or overbuilt systems", icon: "🔧" },
];

const journey = [
  {
    year: "2015",
    title: "Started in Digital",
    desc: "Began exploring web design and development as a self-taught enthusiast.",
    icon: "🌱",
  },
  {
    year: "2019",
    title: "First Agency Role",
    desc: "Joined a digital agency, honing skills in client work and project delivery.",
    icon: "💼",
  },
  {
    year: "2020",
    title: "Freelance Journey",
    desc: "Launched independent practice, working directly with founders and brands.",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Founded Fancy Digitals",
    desc: "Established the studio to deliver premium, systems-focused digital work.",
    icon: "⭐",
  },
];

const signature = {
  name: "Bashir Ismail",
  title: "Founder",
};

export default function AboutPage() {
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
              <span className="text-sm font-semibold text-gray-900">About</span>
            </div>
          </nav>

          {/* Main content grid */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Text content */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                <span className="block">Meet</span>
                <span className="mt-2 block bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent">
                  {founder.name}
                </span>
                <span className="mt-2 block text-2xl font-medium text-gray-500 md:text-3xl">
                  a.k.a &quot;{founder.alias}&quot;
                </span>
              </h1>

              <div className="mx-auto mt-8 max-w-xl space-y-4 lg:mx-0">
                {founder.bio.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base leading-relaxed text-gray-600 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 font-bold text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#075a01]/30"
                >
                  Work With Me
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
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/30 hover:shadow-lg"
                >
                  View My Work
                </a>
              </div>

              {/* Quick social proof */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-gray-200 to-gray-300"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    50+ happy clients
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-[#ff914d]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-500">5.0 rating</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute -inset-8 rounded-full border-2 border-dashed border-[#075a01]/20 opacity-50" />
                <div className="absolute -inset-16 rounded-full border border-dashed border-[#ff914d]/10 opacity-30" />

                {/* Main image container */}
                <div className="relative aspect-[5/6] w-72 overflow-hidden rounded-[2.5rem] border-4 border-white bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 shadow-2xl shadow-gray-200/50 sm:w-80 md:w-96 lg:w-[400px]">
                  <Image
                    src={founder.image}
                    alt={`${founder.name}, Founder of Fancy Digitals`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
                  />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />
                </div>

                {/* Floating badges */}
                <div className="absolute -bottom-4 -right-4 rounded-2xl border-2 border-white bg-white px-5 py-4 shadow-xl md:-right-8">
                  <p className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-3xl font-bold text-transparent">
                    10+
                  </p>
                  <p className="text-xs font-medium text-gray-500">Years Exp.</p>
                </div>

                <div className="absolute -left-4 top-1/4 rounded-2xl border-2 border-white bg-white px-5 py-4 shadow-xl md:-left-8">
                  <p className="text-3xl">✨</p>
                  <p className="text-xs font-medium text-gray-500">Premium</p>
                </div>

                <div className="absolute -right-2 top-8 rounded-xl border-2 border-white bg-white px-3 py-2 shadow-lg">
                  <p className="text-xl">🎯</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE STRIP */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#075a01] via-[#0a8f01] to-[#075a01]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-4">
            {experience.map((item) => (
              <div key={item.label} className="group text-center">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110 md:text-4xl">
                  {item.icon}
                </div>
                <p className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {item.years}
                  <span className="text-[#ffed4e]">+</span>
                </p>
                <p className="mt-2 text-xs font-semibold text-white/80 md:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2">
              <span className="text-sm font-semibold text-[#ff914d]">
                My Journey
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              From curiosity to{" "}
              <span className="text-[#075a01]">expertise</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#075a01] via-[#ff914d] to-[#075a01] md:block" />

            <div className="space-y-8 md:space-y-0">
              {journey.map((item, idx) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
                >
                  {/* Content card */}
                  <div
                    className={`w-full md:w-[calc(50%-40px)] ${
                      idx % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="group rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-xl">
                      <span className="mb-2 inline-block rounded-full bg-[#075a01]/10 px-3 py-1 text-xs font-bold text-[#075a01]">
                        {item.year}
                      </span>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-2xl shadow-lg">
                    {item.icon}
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden w-[calc(50%-40px)] md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Visual element */}
              <div className="relative flex justify-center">
                <div className="relative">
                  {/* Background shape */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 blur-xl" />

                  <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg md:p-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-2xl shadow-lg shadow-[#075a01]/25">
                          👂
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Listen First</p>
                          <p className="text-sm text-gray-500">
                            Understand the real problem
                          </p>
                        </div>
                      </div>

                      <div className="ml-7 h-8 w-px bg-gradient-to-b from-[#075a01]/30 to-transparent" />

                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff914d] to-[#ff6b1a] text-2xl shadow-lg shadow-[#ff914d]/25">
                          🎯
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            Understand Deeply
                          </p>
                          <p className="text-sm text-gray-500">
                            Connect all the dots
                          </p>
                        </div>
                      </div>

                      <div className="ml-7 h-8 w-px bg-gradient-to-b from-[#ff914d]/30 to-transparent" />

                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#ff914d] text-2xl shadow-lg">
                          🚀
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Execute Calmly</p>
                          <p className="text-sm text-gray-500">
                            Deliver with precision
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
                  <span className="text-sm font-semibold text-[#075a01]">
                    My Philosophy
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  How I approach{" "}
                  <span className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-transparent">
                    digital work
                  </span>
                </h2>

                <div className="mt-6 space-y-4">
                  <p className="text-gray-600">
                    My approach begins with{" "}
                    <strong className="text-gray-900">listening</strong>. I
                    believe the quality of any solution is directly tied to how
                    well the problem is understood.
                  </p>
                  <p className="text-gray-600">
                    This allows complex ideas to be translated into{" "}
                    <strong className="text-gray-900">
                      clean, usable, and scalable
                    </strong>{" "}
                    digital systems.
                  </p>
                  <p className="text-gray-600">
                    My agility across multiple disciplines reduces friction,
                    shortens feedback loops, and ensures that strategy, design,
                    and execution remain{" "}
                    <strong className="text-gray-900">
                      aligned from start to finish
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              What drives my work
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#075a01]/20 hover:shadow-xl"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#075a01]/5 to-[#ff914d]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:from-[#075a01] group-hover:to-[#ff914d] group-hover:shadow-lg">
                    <span className="transition-all group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert">
                      {item.icon}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TYPES */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
                <span className="text-sm font-semibold text-[#075a01]">
                  Ideal Clients
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Who I love{" "}
                <span className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-transparent">
                  working with
                </span>
              </h2>

              <p className="mt-4 text-gray-600">
                I partner with businesses and individuals who value intentional,
                long-term digital growth over quick fixes.
              </p>

              <a
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 font-semibold text-[#075a01] transition-colors hover:text-[#0a8f01]"
              >
                Let&apos;s see if we&apos;re a fit
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

            <div className="grid gap-4 sm:grid-cols-2">
              {clientTypes.map((client) => (
                <div
                  key={client.text}
                  className="group flex items-start gap-4 rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:from-[#075a01] group-hover:to-[#ff914d]">
                    <span className="transition-all group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert">
                      {client.icon}
                    </span>
                  </span>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {client.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL NOTE / CTA */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-10 shadow-2xl shadow-[#075a01]/25 md:p-16">
            {/* Background decorations */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ff914d]/20 blur-3xl" />

            {/* Pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div className="text-center md:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <span className="text-2xl">✉️</span>
                  <span className="text-sm font-semibold text-white">
                    A note from me
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Let&apos;s build something
                  <span className="block text-[#ffed4e]">remarkable together</span>
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-lg text-white/90 md:mx-0">
                  Fancy Digitals exists to make complex digital journeys feel
                  manageable, thoughtful, and well-structured. If you value
                  clarity, long-term thinking, and intentional execution,
                  working together will feel natural.
                </p>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
                  <a
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#075a01] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Let&apos;s Work Together
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

              {/* Founder image */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
                    <Image
                      src={founder.image}
                      alt={signature.name}
                      fill
                      className="object-cover object-center"
                      sizes="192px"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 shadow-lg">
                    <p className="text-sm font-bold text-gray-900">
                      {signature.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM QUICK CONTACT */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-500">
            Want to learn more?{" "}
            <a
              href="/contact"
              className="font-semibold text-[#075a01] hover:underline"
            >
              Contact me
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