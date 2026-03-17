import { getPortfolio } from "@/lib/wordpress";
import Link from "next/link";

export default async function PortfolioSingle({ params }) {
  const projects = await getPortfolio();
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  console.log(project);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#559659] to-[#f5ac57] rounded-full blur-2xl opacity-20 animate-pulse" />
          <h1 className="relative text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#559659] to-[#f5ac57]">
            404
          </h1>
        </div>
        <p className="mt-6 text-xl text-gray-400">Project not found</p>
        <Link
          href="/portfolio"
          className="mt-8 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          ← Back to Portfolio
        </Link>
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
    <main className="bg-[#0a0a0f] text-white overflow-hidden">

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-end pb-20">

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[#559659]/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#f5ac57]/15 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />
          <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-[#559659]/10 rounded-full blur-[150px] animate-pulse [animation-delay:4s]" />
        </div>

        {image && (
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-[#0a0a0f]/50" />
          </div>
        )}

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-8 left-6 lg:left-12 z-20">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium text-gray-300">Back</span>
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">

          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
            <span className="w-2 h-2 bg-[#559659] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">Case Study</span>
          </div>

          <div className="relative mb-8">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#559659] via-[#f5ac57] to-transparent rounded-full" />
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Client</p>
                <p className="font-semibold text-white">{client}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#f5ac57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Year</p>
                <p className="font-semibold text-white">{year}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Type</p>
                <p className="font-semibold text-white">{project.type || "Web Development"}</p>
              </div>
            </div>
          </div>

          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#559659] to-[#559659]/80 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#559659]/25 hover:scale-105"
            >
              <span>View Live Project</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>


      {/* ==================== STATS ==================== */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="p-1 rounded-3xl bg-gradient-to-r from-[#559659]/30 via-[#f5ac57]/30 to-[#559659]/30">
          <div className="bg-[#12121a] rounded-[22px] p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "6", label: "Weeks", desc: "Delivery", icon: "⏱️", color: "#559659" },
                { value: "+180%", label: "", desc: "Traffic Growth", icon: "📈", color: "#f5ac57" },
                { value: "100%", label: "", desc: "Satisfaction", icon: "😊", color: "#559659" },
                { value: "98", label: "/100", desc: "Performance", icon: "⚡", color: "#f5ac57" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl md:text-4xl font-black" style={{ color: stat.color }}>{stat.value}</span>
                    <span className="text-lg font-semibold text-gray-500">{stat.label}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ==================== OVERVIEW ==================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#559659]/10 rounded-full text-sm font-semibold text-[#559659] mb-6">
                Overview
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Transforming ideas into
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#559659] to-[#f5ac57]">digital excellence</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                This project showcases our commitment to delivering exceptional digital solutions that drive real business results.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["User-Centered Design", "High Performance", "Scalable Code", "Ongoing Support"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#559659]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "⚡", title: "Lightning Fast", desc: "Optimized for speed" },
                { icon: "🎨", title: "Beautiful UI", desc: "Stunning design" },
                { icon: "📱", title: "Responsive", desc: "All devices" },
                { icon: "🔒", title: "Secure", desc: "Protected data" },
              ].map((card, i) => (
                <div key={i} className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300">
                  <span className="text-4xl block mb-4">{card.icon}</span>
                  <h3 className="font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ==================== CHALLENGE & SOLUTION ==================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="relative p-8 md:p-10 bg-gradient-to-br from-red-950/30 to-[#12121a] rounded-3xl border border-red-500/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
                <p className="text-gray-400 mb-6">The client&apos;s existing platform was outdated and failing to convert visitors.</p>
                <ul className="space-y-3">
                  {["Poor user experience", "Slow loading times", "Low conversion rates", "Outdated design"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#559659]/20 to-[#12121a] rounded-3xl border border-[#559659]/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#559659]/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#559659]/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
                <p className="text-gray-400 mb-6">A modern, high-performance platform optimized for conversions.</p>
                <ul className="space-y-3">
                  {["Modern responsive design", "Lightning-fast performance", "Conversion optimized", "Scalable architecture"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-[#559659] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ==================== TECH STACK ==================== */}
      {technologies.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5ac57]/10 rounded-full text-sm font-semibold text-[#f5ac57] mb-4">
                  Tech Stack
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Technologies
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#559659] to-[#f5ac57]"> Used</span>
                </h2>
              </div>
              <p className="text-gray-400 max-w-md">Every tool carefully selected for performance.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, i) => (
                <div key={i} className="group flex items-center gap-3 px-5 py-3 bg-white/[0.03] rounded-full border border-white/10 hover:border-[#559659]/50 hover:bg-white/[0.08] transition-all duration-300">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#559659] to-[#f5ac57] flex items-center justify-center text-white text-sm font-bold">
                    {tech.tech_name?.charAt(0)}
                  </span>
                  <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{tech.tech_name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ==================== CONTENT ==================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">

            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-8 space-y-6">
                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Project Info</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Client", value: client },
                      { label: "Year", value: year },
                      { label: "Category", value: project.type || "Web Dev" },
                      { label: "Duration", value: "6 Weeks" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className="font-semibold text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Share</h3>
                  <div className="flex gap-2">
                    {["X", "in", "🔗"].map((icon, i) => (
                      <button key={i} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#559659] flex items-center justify-center text-gray-400 hover:text-white transition-all font-bold text-sm">
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#559659]/10 rounded-full text-sm font-semibold text-[#559659] mb-4">About</span>
                <h2 className="text-2xl font-bold text-white">Project Details</h2>
              </div>

              <article
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/10
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-[#559659] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-blockquote:border-l-[#559659] prose-blockquote:bg-white/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  prose-img:rounded-2xl prose-img:shadow-xl
                  prose-code:text-[#f5ac57] prose-code:bg-[#f5ac57]/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-li:text-gray-300 prose-li:marker:text-[#559659]"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* ==================== GALLERY (FIXED) ==================== */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#559659]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5ac57]/10 rounded-full text-sm font-semibold text-[#f5ac57] mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#559659] to-[#f5ac57]">Showcase</span>
              </h2>
              <p className="text-gray-400 mt-2">Visual highlights from this project</p>
            </div>
            {gallery.length > 0 && (
              <span className="text-sm font-medium text-gray-400">{gallery.length} images</span>
            )}
          </div>

          {gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((img, i) => {
                const isLarge = i === 0;
                return (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#559659]/50 transition-all duration-500 cursor-pointer ${
                      isLarge ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                    }`}
                  >
                    <div className={`${isLarge ? "aspect-[16/10]" : "aspect-video"} overflow-hidden`}>
                      <img
                        src={img.url}
                        alt={`Project screenshot ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">Screenshot {i + 1}</p>
                          <p className="text-white/60 text-sm">Click to expand</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#559659] flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Gallery Images</h3>
              <p className="text-gray-500 max-w-md mx-auto">Gallery images will be added soon.</p>
            </div>
          )}
        </div>
      </section>


      {/* ==================== RESULTS ==================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#559659]/10 rounded-full text-sm font-semibold text-[#559659] mb-4">Results</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">The Impact</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { before: "2.5s", after: "0.8s", label: "Load Time", change: "68% faster" },
              { before: "1.2%", after: "4.8%", label: "Conversion", change: "300% increase" },
              { before: "45", after: "98", label: "Performance", change: "118% better" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Before</p>
                    <p className="text-2xl font-bold text-gray-500 line-through">{item.before}</p>
                  </div>
                  <svg className="w-6 h-6 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">After</p>
                    <p className="text-2xl font-bold text-[#559659]">{item.after}</p>
                  </div>
                </div>
                <p className="font-semibold text-white">{item.label}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-[#559659]/10 rounded-full text-sm font-semibold text-[#559659]">{item.change}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================== TESTIMONIAL ==================== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="p-1 rounded-3xl bg-gradient-to-r from-[#559659]/30 via-[#f5ac57]/30 to-[#559659]/30">
            <div className="bg-[#12121a] rounded-[22px] p-10 md:p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#559659] to-[#f5ac57] flex items-center justify-center mb-8 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex gap-1 justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#f5ac57]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl font-semibold text-white leading-relaxed mb-8">
                &ldquo;Fancy Digitals exceeded all expectations. Exceptional work!&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#559659] to-[#f5ac57] flex items-center justify-center text-white text-xl font-bold">
                  {client.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">{client}</p>
                  <p className="text-sm text-gray-400">Project Lead</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ==================== CTA ==================== */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#559659] via-[#559659]/90 to-[#559659]/80 p-12 md:p-16">

            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
            </div>

            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white/90">Available for projects</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Ready to build<br />something amazing?
              </h2>

              <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
                Let&apos;s create a digital experience that sets your brand apart.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#559659] rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Start Your Project
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                  View More Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== FOOTER NAV ==================== */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">

            <Link href="/portfolio" className="group flex items-center gap-6 py-10 md:pr-10 hover:bg-white/[0.02] transition-colors">
              <span className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-[#559659] flex items-center justify-center transition-all">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Back</p>
                <p className="text-xl font-bold text-white group-hover:text-[#559659] transition-colors">All Projects</p>
              </div>
            </Link>

            <Link href="/contact" className="group flex items-center justify-end gap-6 py-10 md:pl-10 hover:bg-white/[0.02] transition-colors">
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Next</p>
                <p className="text-xl font-bold text-white group-hover:text-[#559659] transition-colors">Contact Us</p>
              </div>
              <span className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-[#559659] flex items-center justify-center transition-all">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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