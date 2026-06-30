"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Briefcase,
  Calendar,
  User,
  Link2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";

export default function PortfolioSingleClient({ project, related }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const gallery = project.gallery || [];

  function openGallery(i) {
    setGalleryIndex(i);
    setGalleryOpen(true);
  }

  function shareProject(type) {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${project.title} — case study by Fancy Digitals`;

    if (type === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (type === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (type === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    image: project.hero_image,
    author: { "@type": "Organization", name: "Fancy Digitals" },
    datePublished: project.published_at,
    url: `https://fancydigitals.com.ng/portfolio/${project.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fancydigitals.com.ng" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://fancydigitals.com.ng/portfolio" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://fancydigitals.com.ng/portfolio/${project.slug}` },
    ],
  };

  return (
    <main className="bg-white">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gray-50 pt-20 pb-12 md:pt-28 md:pb-16">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#075a01]/8 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-[#ff914d]/8 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-4 md:px-8">

          {/* Back */}
          <Link
            href="/portfolio"
            className="group mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-[#075a01]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All projects
          </Link>

          {/* Industry badge */}
          {project.industry && (
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#ff914d]/10 px-3 py-1.5">
              <Sparkles className="h-3 w-3 text-[#ff914d]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff914d]">
                {project.industry}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          {/* Excerpt */}
          {project.excerpt && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:mt-6 md:text-lg">
              {project.excerpt}
            </p>
          )}

          {/* Meta cards */}
          <div className="mt-8 grid grid-cols-2 gap-2 md:mt-10 md:flex md:flex-wrap md:gap-3">
            {project.client_name && (
              <MetaCard icon={User} label="Client" value={project.client_name} />
            )}
            {project.industry && (
              <MetaCard icon={Briefcase} label="Industry" value={project.industry} />
            )}
            {project.published_at && (
              <MetaCard
                icon={Calendar}
                label="Year"
                value={new Date(project.published_at).getFullYear()}
              />
            )}
          </div>

          {/* Live URL CTA */}
          {project.live_url && (
            <div className="mt-7">
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#0a8f01]"
              >
                Visit Live Project
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      {project.hero_image && (
        <section className="relative -mt-2 px-4 md:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-2xl md:rounded-3xl">
              <img
                src={project.hero_image}
                alt={project.title}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── PROBLEM / SOLUTION ── */}
      {(project.problem || project.solution) && (
        <section className="relative px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {project.problem && (
                <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 md:p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                      The Problem
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="rounded-2xl border border-[#075a01]/15 bg-[#075a01]/5 p-6 md:p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#075a01]/15 px-3 py-1">
                    <CheckCircle2 className="h-3 w-3 text-[#075a01]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#075a01]">
                      Our Solution
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK ── */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <section className="border-y border-gray-100 bg-gray-50 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 md:mb-6">
              Built With
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm md:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MAIN CONTENT ── */}
      {project.content && (
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div
              className="prose prose-lg prose-neutral max-w-none
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900
                prose-h2:mt-12 prose-h2:text-2xl md:prose-h2:text-3xl
                prose-h3:mt-10 prose-h3:text-xl md:prose-h3:text-2xl
                prose-p:leading-relaxed prose-p:text-gray-700
                prose-a:font-semibold prose-a:text-[#075a01] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-[#075a01] prose-blockquote:bg-gray-50 prose-blockquote:py-3 prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:shadow-lg
                prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[#075a01] prose-code:before:content-none prose-code:after:content-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {gallery.length > 0 && (
        <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-end justify-between md:mb-10">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff914d]">
                  Gallery
                </p>
                <h2 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
                  Project Showcase
                </h2>
              </div>
              <span className="text-xs font-semibold text-gray-500">
                {gallery.length} {gallery.length === 1 ? "image" : "images"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => openGallery(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 transition-transform hover:scale-[1.02] md:rounded-2xl"
                >
                  <img
                    src={img}
                    alt={`${project.title} - ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SHARE ── */}
      <section className="border-t border-gray-100 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gray-50 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <Share2 className="h-4 w-4" />
              Share this project
            </div>
            <div className="flex gap-2">
              <button
  onClick={() => shareProject("twitter")}
  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white font-bold transition-transform hover:scale-110"
  title="Share on Twitter"
>
  𝕏
</button>
<button
  onClick={() => shareProject("linkedin")}
  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0077b5] text-white font-bold transition-transform hover:scale-110"
  title="Share on LinkedIn"
>
  in
</button>
              <button
                onClick={() => shareProject("copy")}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#075a01] px-3 text-xs font-bold text-white transition-transform hover:scale-105"
                title="Copy link"
              >
                <Link2 className="h-4 w-4" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff914d]">
              Continue Exploring
            </p>
            <h2 className="mb-8 text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
              Related Projects
            </h2>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {p.hero_image ? (
                      <img
                        src={p.hero_image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Briefcase className="h-6 w-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    {p.industry && (
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-[#ff914d]">
                        {p.industry}
                      </p>
                    )}
                    <h3 className="line-clamp-2 text-sm font-bold leading-tight text-gray-900 group-hover:text-[#075a01] md:text-base">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gray-950 px-6 py-12 text-center md:px-12 md:py-20">
            <div className="pointer-events-none absolute -left-32 top-0 h-[300px] w-[300px] rounded-full bg-[#075a01]/30 blur-[100px]" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-[300px] w-[300px] rounded-full bg-[#ff914d]/20 blur-[100px]" />

            <div className="relative">
              <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
                Got a project
                <span className="block bg-gradient-to-r from-[#0a8f01] to-[#ff914d] bg-clip-text text-transparent">
                  in mind?
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm text-gray-400 md:text-base">
                Let's build something this good — together.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 sm:w-auto"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/10 sm:w-auto"
                >
                  View More Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY LIGHTBOX MODAL ── */}
      {galleryOpen && (
        <GalleryModal
          images={gallery}
          startIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
          projectTitle={project.title}
        />
      )}

    </main>
  );
}

// ─── META CARD ─────────────────────────────────────────────────────────────
function MetaCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm md:px-4 md:py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#075a01]/10 md:h-9 md:w-9">
        <Icon className="h-4 w-4 text-[#075a01]" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 md:text-[10px]">
          {label}
        </p>
        <p className="truncate text-xs font-bold text-gray-900 md:text-sm">{value}</p>
      </div>
    </div>
  );
}

// ─── GALLERY MODAL ─────────────────────────────────────────────────────────
function GalleryModal({ images, startIndex, onClose, projectTitle }) {
  const [current, setCurrent] = useState(startIndex);

  function next() {
    setCurrent((c) => (c + 1) % images.length);
  }
  function prev() {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:right-6 md:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur md:left-6 md:top-6">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <div className="relative max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[current]}
          alt={`${projectTitle} - ${current + 1}`}
          className="max-h-[85vh] w-auto rounded-xl"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}