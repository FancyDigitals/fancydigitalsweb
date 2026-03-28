"use client";

import { getPortfolio } from "@/lib/wordpress";
import Link from "next/link";
import GalleryWithModal from "@/components/GalleryWithModal";

export default async function PortfolioSingle({ params }) {
  const projects = await getPortfolio();
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  console.log(project);

  const shareProject = async (type) => {
  const url = window.location.href;
  const text = "Check out this project on my portfolio";

  if (type === "twitter") {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  }

  if (type === "linkedin") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  }

  if (type === "copy") {
    await navigator.clipboard.writeText(url);
    alert("Link copied");
  }
};

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#4e9559]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#f6b05a]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative text-center">
          <div className="relative inline-block mb-8">
            <h1 className="text-[140px] font-bold bg-gradient-to-br from-[#4e9559] to-[#f6b05a] bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-br from-[#4e9559]/20 to-[#f6b05a]/20 blur-3xl -z-10" />
          </div>
          <p className="text-2xl font-semibold text-gray-700 mb-2">Project Not Found</p>
          <p className="text-gray-500 mb-10">This project doesn't exist or has been removed</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#4e9559] to-[#4e9559]/90 text-white rounded-xl font-semibold shadow-lg shadow-[#4e9559]/25 hover:shadow-xl hover:shadow-[#4e9559]/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const image = project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const title = project.title?.rendered || "";
  const content = project.content?.rendered || "";
  const client = project.acf?.client || "Confidential";
  const year = project.acf?.year || new Date().getFullYear();
  const projectUrl = project.acf?.project_url || "";
  const technologies = project.acf?.technologies || [];

  const rawGallery = project.acf?.gallery || [];
  const gallery = rawGallery
    .map((img) => {
      if (typeof img === "string") return { url: img };
      if (img.url) return img;
      if (img.source_url) return { url: img.source_url };
      if (img.sizes?.large) return { url: img.sizes.large };
      if (img.sizes?.full) return { url: img.sizes.full };
      return { url: img.guid || img.link || "" };
    })
    .filter((img) => img.url);

  return (
    <main className="bg-white text-gray-900 overflow-hidden">

      {/* ==================== ELEGANT HERO ==================== */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50">

        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#4e9559]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#f6b05a]/8 rounded-full blur-3xl" />
        </div>

        {/* Hero Image (FIXED - CLEAR + PREMIUM) */}
{image && (
  <div className="absolute inset-0">
    
    {/* Image */}
    <div
      className="absolute inset-0 bg-cover bg-center scale-105"
      style={{ backgroundImage: `url(${image})` }}
    />

    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Soft gradient blend */}
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

    {/* Side fade for text clarity */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/70" />

  </div>
)}

        {/* Minimal Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#4e9559 1px, transparent 1px), linear-gradient(90deg, #4e9559 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Back Button */}
        <div className="absolute top-8 left-6 lg:left-12 z-20">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 hover:border-[#4e9559]/30 hover:bg-white transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 text-gray-600 group-hover:text-[#4e9559] group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Back</span>
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">

          {/* Case Study Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#4e9559] rounded-full" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Case Study</span>
          </div>

          {/* Title */}
          <div className="relative mb-8">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4e9559] to-[#f6b05a] rounded-full" />
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-gray-900"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>

          {/* Info Cards - Clean & Minimal */}
          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4e9559] to-[#4e9559]/80 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Client</p>
                <p className="font-semibold text-gray-900">{client}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f6b05a] to-[#f6b05a]/80 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Year</p>
                <p className="font-semibold text-gray-900">{year}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4e9559] to-[#f6b05a] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type</p>
                <p className="font-semibold text-gray-900">{project.type || "Web Development"}</p>
              </div>
            </div>
          </div>

          {/* CTA Button - Elegant */}
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#4e9559] to-[#4e9559]/90 text-white rounded-xl font-semibold shadow-lg shadow-[#4e9559]/20 hover:shadow-xl hover:shadow-[#4e9559]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>View Live Project</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </section>

      {/* ==================== OVERVIEW - Sophisticated ==================== */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <span className="inline-block px-4 py-1.5 bg-[#4e9559]/10 text-[#4e9559] rounded-full text-sm font-semibold mb-6">
                Overview
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Crafting Digital
                <span className="block bg-gradient-to-r from-[#4e9559] to-[#f6b05a] bg-clip-text text-transparent">Excellence</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                A meticulously designed project that combines aesthetic beauty with functional excellence to deliver exceptional user experiences.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["User-Centered Design", "High Performance", "Scalable Architecture", "Premium Quality"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#4e9559]/20 hover:shadow-md transition-all">
                    <div className="w-2 h-2 rounded-full bg-[#4e9559]" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "⚡", title: "Lightning Fast", desc: "Optimized performance", color: "#f6b05a" },
                { icon: "🎨", title: "Beautiful Design", desc: "Stunning aesthetics", color: "#4e9559" },
                { icon: "📱", title: "Fully Responsive", desc: "Perfect on all devices", color: "#f6b05a" },
                { icon: "🔒", title: "Secure & Safe", desc: "Enterprise-grade security", color: "#4e9559" },
              ].map((card, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{card.icon}</span>
                  <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ==================== TECH STACK - Minimal Pills ==================== */}
      {technologies.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#f6b05a]/10 text-[#f6b05a] rounded-full text-sm font-semibold mb-4">
                  Technology Stack
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Built with <span className="bg-gradient-to-r from-[#4e9559] to-[#f6b05a] bg-clip-text text-transparent">Premium Tools</span>
                </h2>
              </div>
              <p className="text-gray-600 max-w-md">Carefully selected technologies for optimal performance and maintainability.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, i) => (
                <div key={i} className="group flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-gray-200 hover:border-[#4e9559]/30 hover:shadow-md transition-all">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4e9559] to-[#f6b05a] flex items-center justify-center text-white text-sm font-bold">
                    {tech.tech_name?.charAt(0)}
                  </span>
                  <span className="font-medium text-gray-700">{tech.tech_name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ==================== CONTENT - Clean Typography ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Sidebar */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* Project Info */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Project Details</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Client", value: client },
                      { label: "Year", value: year },
                      { label: "Category", value: project.type || "Web Development" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="font-semibold text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Share Project</h3>
                  <div className="flex gap-2">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100">
  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
    Share Project
  </h3>

  <div className="flex gap-2">
    <button
      onClick={() => shareProject("twitter")}
      className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-white font-bold hover:scale-110 transition-transform shadow-sm"
    >
      𝕏
    </button>

    <button
      onClick={() => shareProject("linkedin")}
      className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold hover:scale-110 transition-transform shadow-sm"
    >
      in
    </button>

    <button
      onClick={() => shareProject("copy")}
      className="w-10 h-10 rounded-xl bg-[#4e9559] flex items-center justify-center text-white font-bold hover:scale-110 transition-transform shadow-sm"
    >
      🔗
    </button>
  </div>
</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 bg-[#4e9559]/10 text-[#4e9559] rounded-full text-sm font-semibold mb-4">
                  About This Project
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
              </div>

              <article
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-[#4e9559] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-blockquote:border-l-[#4e9559] prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-code:text-[#f6b05a] prose-code:bg-[#f6b05a]/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* ==================== GALLERY ==================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#f6b05a]/10 text-[#f6b05a] rounded-full text-sm font-semibold mb-4">
                Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Project <span className="bg-gradient-to-r from-[#4e9559] to-[#f6b05a] bg-clip-text text-transparent">Showcase</span>
              </h2>
            </div>
            {gallery.length > 0 && (
              <span className="text-sm font-medium text-gray-600">{gallery.length} images</span>
            )}
          </div>

          {gallery.length > 0 ? (
            <GalleryWithModal gallery={gallery} />
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-slate-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gallery Images</h3>
              <p className="text-gray-500">Gallery images will be available soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== CTA - Premium ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4e9559] to-[#4e9559]/90 p-12 md:p-16 shadow-2xl">

            <div className="absolute inset-0 bg-gradient-to-br from-[#f6b05a]/10 to-transparent" />

            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="text-sm font-medium text-white/90">Ready to Start</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Let's Build Something<br />Extraordinary Together
              </h2>

              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Transform your vision into a stunning digital reality with our expert team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#4e9559] rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Start Your Project
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
                  View More Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== FOOTER NAV - Refined ==================== */}
      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">

            <Link href="/portfolio" className="group flex items-center gap-6 py-10 md:pr-10 hover:bg-slate-50 transition-colors">
              <span className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-[#4e9559] flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Previous</p>
                <p className="text-lg font-semibold text-gray-900 group-hover:text-[#4e9559] transition-colors">All Projects</p>
              </div>
            </Link>

            <Link href="/contact" className="group flex items-center justify-end gap-6 py-10 md:pl-10 hover:bg-slate-50 transition-colors">
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Next</p>
                <p className="text-lg font-semibold text-gray-900 group-hover:text-[#4e9559] transition-colors">Get In Touch</p>
              </div>
              <span className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-[#4e9559] flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}