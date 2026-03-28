"use client";
import { useState, useEffect, useMemo } from "react";
import { getPortfolio } from "@/lib/wordpress";

/* =====================================================
   PORTFOLIO PAGE — BRIGHT, CREATIVE, PREMIUM
===================================================== */

const categories = [
  { name: "All", icon: "✨" },
  { name: "Web Development", icon: "🌐" },
  { name: "Graphics Design", icon: "🎨" },
  { name: "SEO", icon: "📈" },
  { name: "Email Marketing", icon: "📧" },
  { name: "Media & Outreach", icon: "📣" },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Industries Served" },
  { value: "3x", label: "Average ROI" },
];

export default function PortfolioPage() {
  // State management
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects on mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const wpProjects = await getPortfolio();
        setProjects(wpProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Filter projects based on active category
  const normalize = (str) => str?.toLowerCase().trim();

const filteredProjects = useMemo(() => {
  if (activeCategory === "All") return projects;

  return projects.filter((project) => {
    const categories =
      project._embedded?.["wp:term"]?.[0]?.map((term) =>
        normalize(term.name)
      ) || [];

    return categories.includes(normalize(activeCategory));
  });
}, [projects, activeCategory]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-[#075a01]/5 blur-[80px]" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/8 blur-[100px]" />

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
        <div
          className="absolute right-[8%] top-[70%] h-4 w-4 animate-bounce rounded-full bg-[#075a01]/15"
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
              <span className="text-sm font-semibold text-gray-900">
                Portfolio
              </span>
            </div>
          </nav>

          {/* Main headline */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Selected work built with
              <span className="relative mx-2 mt-3 block">
                <span className="relative z-10 bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  strategy, clarity
                </span>
                <svg
                  className="absolute -bottom-2 left-1/2 w-48 -translate-x-1/2 md:w-64"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 4 150 4 198 10"
                    stroke="url(#portfolio-underline)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="portfolio-underline"
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
              <span className="mt-2 block bg-gradient-to-r from-[#ff914d] to-[#ff6b1a] bg-clip-text text-transparent">
                & execution
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              A curated selection of projects across{" "}
              <span className="font-semibold text-gray-900">branding</span>,{" "}
              <span className="font-semibold text-gray-900">web</span>,{" "}
              <span className="font-semibold text-gray-900">marketing</span>, and{" "}
              <span className="font-semibold text-gray-900">growth systems</span>{" "}
              designed to look premium and perform reliably.
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-lg"
              >
                <p className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="relative px-5 pb-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
  <button
    key={category.name}
    onClick={() => setActiveCategory(category.name)}
    className={`group flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
      activeCategory === category.name
        ? "bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white shadow-lg shadow-[#075a01]/25"
        : "border-2 border-gray-100 bg-white text-gray-600 hover:border-[#075a01]/20 hover:bg-[#075a01]/5 hover:text-[#075a01]"
    }`}
  >
    <span className="text-base">{category.icon}</span>
    <span>{category.name}</span>
  </button>
))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="relative px-5 pb-24 md:px-10">
  <div className="mx-auto max-w-7xl">
    {isLoading ? (
      <div className="flex items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#075a01]"></div>
      </div>
    ) : filteredProjects.length === 0 ? (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-500">No projects found in this category.</p>
      </div>
    ) : (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => {

          const projectCategories =
  project._embedded?.["wp:term"]?.[0]?.map((term) => term.name) || [];
              const image =
                project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const title = project.title?.rendered || "";
              const desc = project.excerpt?.rendered || "";
              const slug = project.slug;

              return (
                <a
                  key={project.id}
                  href={`/portfolio/${slug}`}
                  className="group"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#075a01]/20 hover:shadow-2xl hover:shadow-[#075a01]/10">
                    {/* Image container */}
                    <div className="relative h-[260px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-60" />

                      {/* Category badge */}
<div className="absolute left-4 top-4">
  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
    <span className="h-1.5 w-1.5 rounded-full bg-[#075a01]"></span>
    {projectCategories[0] || "Uncategorized"}
  </span>
</div>

                      {/* Hover overlay with icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-[#075a01]/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
                          <svg
                            className="h-6 w-6 text-[#075a01]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#075a01]"
                        dangerouslySetInnerHTML={{ __html: title }}
                      />

                      <div
                        className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-500"
                        dangerouslySetInnerHTML={{ __html: desc }}
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-[#075a01]">
                          <span>View case study</span>
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

                        {/* Project number */}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Bottom gradient line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </a>
              );
            })}
          </div>
        )}

          {/* Load more button */}
          <div className="mt-16 flex justify-center">
            <button className="group flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 font-bold text-gray-700 shadow-sm transition-all duration-300 hover:border-[#075a01]/20 hover:bg-[#075a01]/5 hover:text-[#075a01]">
              <span>Load More Projects</span>
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
            {/* Section header */}
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2">
                <span className="text-sm font-semibold text-[#ff914d]">
                  Our Process
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                How we deliver{" "}
                <span className="text-[#075a01]">outstanding results</span>
              </h2>
            </div>

            {/* Process steps */}
            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  desc: "Understanding your goals, audience, and challenges",
                  icon: "🔍",
                },
                {
                  step: "02",
                  title: "Strategy",
                  desc: "Crafting a clear roadmap and creative direction",
                  icon: "🎯",
                },
                {
                  step: "03",
                  title: "Creation",
                  desc: "Building with precision, quality, and attention to detail",
                  icon: "⚡",
                },
                {
                  step: "04",
                  title: "Launch",
                  desc: "Deploying and optimizing for maximum impact",
                  icon: "🚀",
                },
              ].map((item, idx) => (
                <div key={item.step} className="group relative text-center">
                  {/* Connector line */}
                  {idx < 3 && (
                    <div className="absolute left-[60%] top-8 hidden h-0.5 w-full bg-gradient-to-r from-[#075a01]/20 to-transparent md:block" />
                  )}

                  <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:from-[#075a01] group-hover:to-[#ff914d] group-hover:text-white group-hover:shadow-lg">
                    {item.icon}
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#ff914d]">
                    Step {item.step}
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                quote:
                  "Fancy Digitals transformed our online presence completely. The attention to detail and strategic thinking was exceptional.",
                author: "Adeola Adeleke",
                role: "Manager, Adeola Adeleke",
                avatar: "👩‍💼",
              },
              {
                quote:
                  "Working with them was a game-changer. Our website now converts 3x better and our brand finally feels premium.",
                author: "David Akinwale",
                role: "Staff, Ice and Liqour",
                avatar: "👨‍💻",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="group rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-xl"
              >
                {/* Quote icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10">
                  <svg
                    className="h-6 w-6 text-[#075a01]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#075a01]/20 to-[#ff914d]/20 text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
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

            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm font-semibold text-white">
                    Start Your Project
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  Want to build something
                  <span className="block text-[#ffed4e]">like this?</span>
                </h2>

                <p className="mt-6 text-lg text-white/80">
                  If your brand needs clarity, structure and a premium digital
                  presence, let&apos;s talk about how we can help bring your
                  vision to life.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#075a01] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Start a Project
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

              {/* Decorative illustration */}
              <div className="relative hidden justify-center md:flex">
                <div className="relative">
                  {/* Concentric circles */}
                  <div className="h-64 w-64 rounded-full border-2 border-dashed border-white/20">
                    <div className="absolute inset-4 rounded-full border border-white/10">
                      <div className="absolute inset-4 rounded-full border border-white/10">
                        <div className="absolute inset-4 rounded-full bg-white/10">
                          {/* Center icon */}
                          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-2xl">
                            <svg
                              className="h-10 w-10 text-[#075a01]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -left-4 top-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">
                    🎨
                  </div>
                  <div className="absolute -right-4 top-1/2 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">
                    ⚡
                  </div>
                  <div className="absolute bottom-8 left-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">
                    🚀
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
            Have questions?{" "}
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