"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Filter,
  Briefcase,
} from "lucide-react";

export default function PortfolioClient({ projects, categories }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category_id === activeCategory);
  }, [projects, activeCategory]);

  // Only show categories that have projects
  const activeCategories = useMemo(() => {
    const usedIds = new Set(projects.map((p) => p.category_id).filter(Boolean));
    return categories.filter((c) => usedIds.has(c.id));
  }, [projects, categories]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#075a01]/[0.07] blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-[#ff914d]/[0.07] blur-[120px]" />
      </div>

      {/* ── HERO ── */}
      <section className="relative px-4 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl">

          {/* Breadcrumb */}
          <div className="mb-8 flex justify-center md:mb-10">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-semibold text-gray-500 backdrop-blur transition-colors hover:text-[#075a01]"
            >
              <span>Home</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900">Portfolio</span>
            </Link>
          </div>

          {/* Headline */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#ff914d]/10 px-3 py-1.5">
              <Sparkles className="h-3 w-3 text-[#ff914d]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff914d]">
                Selected Work
              </span>
            </div>

            <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-4xl md:text-6xl">
              Work that
              <span className="block bg-gradient-to-r from-[#075a01] via-[#0a8f01] to-[#ff914d] bg-clip-text text-transparent">
                speaks for itself.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:mt-7 md:text-lg">
              A curated selection of premium digital projects — built with intention, designed to convert.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      {activeCategories.length > 0 && (
        <section className="relative border-y border-gray-100 bg-gray-50/60 px-4 py-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
              <div className="hidden shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 md:flex">
                <Filter className="h-3 w-3" />
                Filter
              </div>

              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === "all"
                    ? "bg-[#075a01] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                All Projects
              </button>

              {activeCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeCategory === c.id
                      ? "bg-[#075a01] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── GRID ── */}
      <section className="relative px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
              {filtered.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-gray-950 px-6 py-12 text-center md:px-12 md:py-20">

            {/* Background glow */}
            <div className="pointer-events-none absolute -left-32 top-0 h-[300px] w-[300px] rounded-full bg-[#075a01]/30 blur-[100px]" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-[300px] w-[300px] rounded-full bg-[#ff914d]/20 blur-[100px]" />

            <div className="relative">
              <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
                Ready to build
                <span className="block bg-gradient-to-r from-[#0a8f01] to-[#ff914d] bg-clip-text text-transparent">
                  something this good?
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm text-gray-400 md:mt-5 md:text-base">
                Tell us about your project. We'll respond within 24 hours with ideas.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 sm:w-auto"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <a
                  href="https://wa.me/2349034360785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/10 sm:w-auto"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── PROJECT CARD ──────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#075a01]/20 hover:shadow-2xl hover:shadow-[#075a01]/10 md:rounded-3xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {project.hero_image ? (
          <img
            src={project.hero_image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Briefcase className="h-8 w-8 text-gray-300 md:h-12 md:w-12" />
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute left-2 top-2 md:left-3 md:top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ff914d] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md md:px-2.5 md:py-1 md:text-[10px]">
              <Sparkles className="h-2.5 w-2.5" />
              Featured
            </span>
          </div>
        )}

        {/* Index number */}
        <div className="absolute right-2 top-2 hidden md:right-3 md:top-3 md:block">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-gray-600 backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* View arrow on hover */}
        <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-4 md:right-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg md:h-11 md:w-11">
            <ArrowUpRight className="h-4 w-4 text-[#075a01] md:h-5 md:w-5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-5">
        {project.industry && (
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#ff914d] md:mb-1.5 md:text-[10px]">
            {project.industry}
          </p>
        )}

        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#075a01] md:text-base">
          {project.title}
        </h3>

        {project.excerpt && (
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-gray-500 md:mt-2 md:text-sm">
            {project.excerpt}
          </p>
        )}

        {project.client_name && (
          <div className="mt-2 flex items-center gap-1.5 border-t border-gray-100 pt-2 md:mt-3 md:pt-3">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 md:text-[10px]">
              Client
            </span>
            <span className="truncate text-[11px] font-semibold text-gray-700 md:text-xs">
              {project.client_name}
            </span>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#075a01] via-[#0a8f01] to-[#ff914d] transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

// ─── EMPTY STATE ────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#075a01]/10">
        <Briefcase className="h-7 w-7 text-[#075a01]" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">No projects yet</h3>
      <p className="mt-2 text-sm text-gray-500">
        New projects will appear here soon.
      </p>
    </div>
  );
}