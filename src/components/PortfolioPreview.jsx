import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Briefcase } from "lucide-react";

export default async function PortfolioPreview() {
  const supabase = createAdminClient();

  const { data: rawProjects } = await supabase
    .from("portfolio_projects")
    .select("id, slug, title, excerpt, hero_image, industry, client_name, featured")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("display_order", { ascending: true })
    .order("published_at", { ascending: false })
    .limit(3);

  const projects = rawProjects || [];

  if (!projects.length) return null;

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 md:py-24 lg:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#075a01]/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#ff914d]/8 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">

        {/* HEADER */}
        <header className="relative mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#ff914d]/10 px-3 py-1.5">
            <Sparkles className="h-3 w-3 text-[#ff914d]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff914d]">
              Selected Work
            </span>
          </div>

          <h2
            id="portfolio-heading"
            className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Work that{" "}
            <span className="block bg-gradient-to-r from-[#075a01] via-[#0a8f01] to-[#ff914d] bg-clip-text text-transparent md:inline">
              speaks for itself.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base md:mt-7 md:text-lg">
            A focused selection of projects built with{" "}
            <span className="font-semibold text-gray-900">clarity</span>,{" "}
            <span className="font-semibold text-gray-900">restraint</span>, and{" "}
            <span className="font-semibold text-gray-900">long-term intent</span>.
          </p>
        </header>

        {/* PROJECTS GRID — 2 col mobile, 3 col desktop */}
        <ul role="list" className="relative grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, index) => (
            <li key={project.id}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="relative mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:mt-16">
          <Link
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#075a01]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0a8f01] sm:text-base"
          >
            View Full Portfolio
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-[#ff914d]/30 hover:shadow-md sm:text-base"
          >
            Start a Project
          </Link>
        </div>

        {/* Bottom decorative dots */}
        <div className="mt-12 flex justify-center md:mt-16">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-200" />
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#075a01]" />
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01]"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff914d]"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </div>
      </div>
    </section>
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

        {/* Index */}
        <div className="absolute right-2 top-2 hidden md:right-3 md:top-3 md:block">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-gray-600 backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Hover overlay */}
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