import { getPortfolio } from "@/lib/wordpress";
import Link from "next/link";

export default async function PortfolioSingle({ params }) {
  const projects = await getPortfolio();
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white">
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-[#559659]/30 to-[#f5ac57]/30 rounded-full blur-3xl opacity-40 animate-pulse" />
          <h1 className="relative text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#559659] to-[#f5ac57] tracking-tighter">
            404
          </h1>
        </div>
        <p className="mt-8 text-2xl text-gray-400 font-light">Project not found</p>
        <Link 
          href="/portfolio"
          className="mt-10 group px-10 py-4 bg-gradient-to-r from-[#559659] to-[#559659]/80 rounded-full font-semibold hover:shadow-2xl hover:shadow-[#559659]/30 transition-all duration-500 hover:scale-105"
        >
          <span className="flex items-center gap-3">
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </span>
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
  const gallery = project.acf?.gallery || [];

  return (
    <main className="bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white overflow-hidden">

      {/* ============ EPIC HERO SECTION ============ */}
      <section className="relative min-h-screen flex items-end pb-24">
        
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#559659]/20 rounded-full blur-[120px] animate-pulse [animation-duration:8s]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#f5ac57]/20 rounded-full blur-[120px] animate-pulse [animation-duration:10s] [animation-delay:2s]" />
          <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#559659]/10 rounded-full blur-[140px] animate-pulse [animation-duration:12s] [animation-delay:4s]" />
          
          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(85,150,89,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,172,87,0.1),transparent_50%)]" />
        </div>

        {/* Hero Image with Advanced Effects */}
        {image && (
          <div className="absolute inset-0">
            {/* Image Container */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[3000ms] hover:scale-110"
                style={{ 
                  backgroundImage: `url(${image})`,
                  filter: 'brightness(0.7) saturate(1.2)'
                }}
              />
            </div>
            
            {/* Multi-layer Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-[#0a0a0f]/60" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#559659]/10 via-transparent to-[#f5ac57]/10" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
          </div>
        )}

        {/* Decorative Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,.15) 1.5px, transparent 1.5px)`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Spotlight Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(85,150,89,0.15),transparent_60%)]" />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#559659]/20 to-[#f5ac57]/20 backdrop-blur-xl rounded-full border border-white/10 mb-10 group hover:scale-105 transition-transform duration-300">
            <div className="relative flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#559659] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#559659]"></span>
              </span>
              <span className="text-sm font-semibold text-gray-200 uppercase tracking-[0.2em]">
                Featured Case Study
              </span>
            </div>
          </div>

          {/* Epic Title */}
          <div className="relative mb-12 space-y-4">
            {/* Decorative Elements */}
            <div className="absolute -left-8 top-0 w-1.5 h-24 bg-gradient-to-b from-[#559659] via-[#f5ac57] to-transparent rounded-full" />
            <div className="absolute -left-12 top-12 w-1 h-16 bg-gradient-to-b from-[#f5ac57]/50 to-transparent rounded-full" />
            
            <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter">
              <span 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400 drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </h1>
            
            {/* Accent Line */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px w-20 bg-gradient-to-r from-[#559659] to-transparent" />
              <div className="h-px w-12 bg-gradient-to-r from-[#f5ac57] to-transparent" />
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-14">
            {/* Client Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#559659]/50 to-[#f5ac57]/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#559659]/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#559659]/20 to-[#f5ac57]/20 flex items-center justify-center border border-[#559659]/30">
                  <svg className="w-6 h-6 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#f5ac57] uppercase tracking-widest font-semibold mb-1">Client</p>
                  <p className="font-bold text-white text-lg">{client}</p>
                </div>
              </div>
            </div>

            {/* Year Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f5ac57]/50 to-[#559659]/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#f5ac57]/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f5ac57]/20 to-[#559659]/20 flex items-center justify-center border border-[#f5ac57]/30">
                  <svg className="w-6 h-6 text-[#f5ac57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#559659] uppercase tracking-widest font-semibold mb-1">Year</p>
                  <p className="font-bold text-white text-lg">{year}</p>
                </div>
              </div>
            </div>

            {/* Category Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#559659]/50 to-[#f5ac57]/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#559659]/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#559659]/20 to-[#f5ac57]/20 flex items-center justify-center border border-[#559659]/30">
                  <svg className="w-6 h-6 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#f5ac57] uppercase tracking-widest font-semibold mb-1">Category</p>
                  <p className="font-bold text-white text-lg">{project.type || "Web Development"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          {projectUrl && (
            <div className="relative inline-block group mb-32">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#559659] to-[#f5ac57] rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-[#559659] to-[#559659]/90 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl shadow-[#559659]/30"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <span className="relative z-10 flex items-center gap-4">
                  <span>View Live Project</span>
                  <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="text-xs text-gray-400 uppercase tracking-[0.3em] font-semibold">Scroll</span>
          <div className="w-8 h-12 rounded-full border-2 border-[#559659]/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gradient-to-b from-[#559659] to-[#f5ac57] rounded-full animate-pulse" />
          </div>
        </div>
      </section>


      {/* ============ GLASSMORPHIC STATS CARD ============ */}
      <section className="relative z-20 -mt-32 max-w-7xl mx-auto px-6 lg:px-12 mb-32">
        <div className="relative group">
          {/* Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#559659]/40 via-[#f5ac57]/40 to-[#559659]/40 rounded-[2rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/20 p-10 md:p-14">
            <div className="grid md:grid-cols-4 gap-10 md:gap-14">
              
              {/* Stat 1 - Timeline */}
              <div className="group/stat relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#559659]/20 to-transparent rounded-3xl opacity-0 group-hover/stat:opacity-100 transition-all duration-500 blur-2xl" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#559659]/10 rounded-xl border border-[#559659]/20">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#559659] to-[#559659]/70 flex items-center justify-center shadow-lg shadow-[#559659]/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#559659] font-bold">Timeline</span>
                  </div>
                  <div>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 mb-2">6</p>
                    <p className="text-sm text-gray-400 font-medium">Weeks to launch</p>
                  </div>
                </div>
              </div>

              {/* Stat 2 - Impact */}
              <div className="group/stat relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#f5ac57]/20 to-transparent rounded-3xl opacity-0 group-hover/stat:opacity-100 transition-all duration-500 blur-2xl" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#f5ac57]/10 rounded-xl border border-[#f5ac57]/20">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f5ac57] to-[#f5ac57]/70 flex items-center justify-center shadow-lg shadow-[#f5ac57]/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#f5ac57] font-bold">Impact</span>
                  </div>
                  <div>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 mb-2">+180%</p>
                    <p className="text-sm text-gray-400 font-medium">Traffic increase</p>
                  </div>
                </div>
              </div>

              {/* Stat 3 - Satisfaction */}
              <div className="group/stat relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#559659]/20 to-transparent rounded-3xl opacity-0 group-hover/stat:opacity-100 transition-all duration-500 blur-2xl" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#559659]/10 rounded-xl border border-[#559659]/20">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#559659] to-[#559659]/70 flex items-center justify-center shadow-lg shadow-[#559659]/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#559659] font-bold">Happy</span>
                  </div>
                  <div>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 mb-2">100%</p>
                    <p className="text-sm text-gray-400 font-medium">Client satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Stat 4 - Performance */}
              <div className="group/stat relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#f5ac57]/20 to-transparent rounded-3xl opacity-0 group-hover/stat:opacity-100 transition-all duration-500 blur-2xl" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#f5ac57]/10 rounded-xl border border-[#f5ac57]/20">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f5ac57] to-[#f5ac57]/70 flex items-center justify-center shadow-lg shadow-[#f5ac57]/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#f5ac57] font-bold">Speed</span>
                  </div>
                  <div>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 mb-2">98</p>
                    <p className="text-sm text-gray-400 font-medium">Lighthouse score</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#559659]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#f5ac57]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>


      {/* ============ TECH STACK - CREATIVE CARDS ============ */}
      {technologies.length > 0 && (
        <section className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32">
          
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#559659]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f5ac57]/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-[#559659]/10 to-[#f5ac57]/10 rounded-full border border-[#559659]/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#559659] animate-pulse" />
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#559659]">Tech Stack</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                <span className="text-white">Built with </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#559659] via-[#f5ac57] to-[#559659] bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                  Cutting-Edge
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
                  Technologies
                </span>
              </h2>
              
              <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Every technology carefully selected to create a powerful, scalable, and performant solution.
              </p>
            </div>

            {/* Tech Grid - Hover Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="group relative"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#559659]/50 to-[#f5ac57]/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  
                  <div className="relative h-full p-7 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#559659]/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#559659]/20">
                    {/* Icon */}
                    <div className="w-16 h-16 mb-5 rounded-xl bg-gradient-to-br from-[#559659]/20 to-[#f5ac57]/20 flex items-center justify-center border border-[#559659]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#559659] to-[#f5ac57]">
                        {tech.tech_name?.charAt(0)}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-white mb-1.5 text-lg">
                      {tech.tech_name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      Core Technology
                    </p>

                    {/* Corner Accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#559659] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ============ PROJECT CONTENT - MODERN LAYOUT ============ */}
      <section className="relative py-32">
        {/* Background Elements */}
        <div className="absolute left-0 top-1/4 w-[600px] h-[600px] bg-[#559659]/5 rounded-full blur-[150px]" />
        <div className="absolute right-0 bottom-1/4 w-[600px] h-[600px] bg-[#f5ac57]/5 rounded-full blur-[150px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sticky Sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32 space-y-8">
                
                {/* Navigation Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#559659]/20 to-[#f5ac57]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-7 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-8 h-px bg-gradient-to-r from-[#559659] to-transparent" />
                      Navigate
                    </h3>
                    <nav className="space-y-4">
                      {['Overview', 'Challenge', 'Solution', 'Results'].map((item, i) => (
                        <a 
                          key={item}
                          href={`#${item.toLowerCase()}`} 
                          className="flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-300 group/link"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#559659]/10 to-[#f5ac57]/10 border border-[#559659]/20 group-hover/link:border-[#559659]/50 group-hover/link:scale-110 transition-all duration-300">
                            <span className="text-xs font-bold text-[#559659]">{i + 1}</span>
                          </div>
                          <span className="font-semibold">{item}</span>
                          <svg className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Share Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#f5ac57]/20 to-[#559659]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-7 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-8 h-px bg-gradient-to-r from-[#f5ac57] to-transparent" />
                      Share
                    </h3>
                    <div className="flex gap-3">
                      {['Twitter', 'LinkedIn', 'Link'].map((platform, i) => (
                        <button 
                          key={platform}
                          className="group/btn flex-1 aspect-square rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#559659]/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#559659]/20"
                        >
                          <svg className="w-5 h-5 text-gray-400 group-hover/btn:text-[#559659] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            {i === 0 && <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>}
                            {i === 1 && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
                            {i === 2 && <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>}
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <article 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-black
                  prose-headings:tracking-tight
                  prose-h2:text-4xl
                  prose-h2:mt-20
                  prose-h2:mb-8
                  prose-h2:text-transparent
                  prose-h2:bg-clip-text
                  prose-h2:bg-gradient-to-r
                  prose-h2:from-white
                  prose-h2:to-gray-400
                  prose-p:text-gray-300
                  prose-p:leading-relaxed
                  prose-p:text-lg
                  prose-strong:text-white
                  prose-strong:font-bold
                  prose-a:text-[#559659]
                  prose-a:no-underline
                  prose-a:border-b-2
                  prose-a:border-[#559659]/30
                  hover:prose-a:border-[#559659]
                  prose-a:transition-colors
                  prose-blockquote:border-l-4
                  prose-blockquote:border-[#559659]
                  prose-blockquote:bg-gradient-to-r
                  prose-blockquote:from-[#559659]/10
                  prose-blockquote:to-transparent
                  prose-blockquote:rounded-r-2xl
                  prose-blockquote:py-6
                  prose-blockquote:px-8
                  prose-blockquote:not-italic
                  prose-blockquote:font-medium
                  prose-img:rounded-3xl
                  prose-img:shadow-2xl
                  prose-img:border
                  prose-img:border-white/10
                  prose-code:text-[#f5ac57]
                  prose-code:bg-[#f5ac57]/10
                  prose-code:px-3
                  prose-code:py-1
                  prose-code:rounded-lg
                  prose-code:font-semibold
                  prose-pre:bg-[#12121a]
                  prose-pre:border
                  prose-pre:border-white/10
                  prose-pre:shadow-2xl
                  prose-li:text-gray-300
                  prose-ul:list-disc
                  prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

          </div>
        </div>
      </section>


      {/* ============ GALLERY - MASONRY GRID ============ */}
      {gallery.length > 0 && (
        <section className="relative py-40 overflow-hidden">
          
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#559659]/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f5ac57]/5 rounded-full blur-[150px]" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* Section Header */}
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-[#559659]/10 to-[#f5ac57]/10 rounded-full border border-[#559659]/20 mb-8">
                <svg className="w-4 h-4 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#559659]">Gallery</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                <span className="text-white">Visual </span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#559659] to-[#f5ac57]">
                    Journey
                  </span>
                  <div className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#559659]/30 to-[#f5ac57]/30 -rotate-1 blur-sm" />
                </span>
              </h2>
              
              <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Explore the details, screens, and moments that bring this project to life.
              </p>
            </div>

            {/* Masonry Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((img, i) => {
                const isLarge = i % 5 === 0;
                const isMedium = i % 3 === 0 && !isLarge;
                
                return (
                  <div
                    key={i}
                    className={`group relative rounded-3xl overflow-hidden ${
                      isLarge ? 'md:col-span-2 md:row-span-2' : 
                      isMedium ? 'md:row-span-2' : ''
                    }`}
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#559659]/40 to-[#f5ac57]/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                    
                    <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 group-hover:border-[#559659]/40 overflow-hidden transition-all duration-500">
                      <div className={`${isLarge ? 'aspect-[16/10]' : isMedium ? 'aspect-[4/5]' : 'aspect-video'} overflow-hidden`}>
                        <img
                          src={img.url}
                          alt={`Gallery image ${i + 1}`}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                        />
                      </div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Expand Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#559659] to-[#f5ac57] flex items-center justify-center shadow-2xl shadow-[#559659]/50 transform scale-75 group-hover:scale-100 transition-all duration-500 hover:rotate-90">
                          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10h-3m0 0H7m3 0V7m0 3v3" />
                          </svg>
                        </div>
                      </div>

                      {/* Image Number */}
                      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                          <span className="text-sm font-bold text-white">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}


      {/* ============ TESTIMONIAL - ELEGANT CARD ============ */}
      <section className="relative py-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="relative">
            {/* Giant Quote Mark */}
            <div className="absolute -top-20 -left-16 text-[280px] font-serif text-transparent bg-clip-text bg-gradient-to-br from-[#559659]/20 to-[#f5ac57]/20 select-none leading-none pointer-events-none">
              &ldquo;
            </div>
            
            {/* Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#559659]/40 to-[#f5ac57]/40 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-12 md:p-16 lg:p-20">
                
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative group/avatar">
                      <div className="absolute -inset-2 bg-gradient-to-br from-[#559659] to-[#f5ac57] rounded-3xl blur-xl opacity-50 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#559659] to-[#f5ac57] p-1">
                        <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center">
                          <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#559659] to-[#f5ac57]">
                            {client.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#559659] to-[#f5ac57] rounded-xl flex items-center justify-center shadow-lg shadow-[#559659]/50">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-10">
                      &ldquo;Fancy Digitals exceeded all our expectations. Their attention to detail, creative vision, and technical expertise transformed our brand&apos;s digital presence into something truly remarkable.&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div>
                        <p className="font-bold text-white text-xl mb-1">{client}</p>
                        <p className="text-[#f5ac57] font-semibold">Project Lead & Decision Maker</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="relative">
                            <svg className="w-7 h-7 text-[#f5ac57] drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#559659]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f5ac57]/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ============ CTA - IMMERSIVE GRADIENT ============ */}
      <section className="relative py-48 overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#559659] via-[#559659]/90 to-[#f5ac57]" />
          
          {/* Animated Orbs */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse [animation-duration:8s]" />
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl animate-pulse [animation-duration:10s] [animation-delay:2s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-3xl" />
          </div>

          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.3) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.3) 2px, transparent 2px)`,
              backgroundSize: '100px 100px'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/20 backdrop-blur-xl rounded-full mb-12 border border-white/20 hover:scale-105 transition-transform duration-300">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">
              Let&apos;s Collaborate
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-[0.9] tracking-tight text-white drop-shadow-2xl">
            Ready to build
            <span className="block mt-3">something amazing?</span>
          </h2>

          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            Let&apos;s create a digital experience that sets your brand apart and drives real results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-[#559659] rounded-2xl font-black text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              
              <span className="relative z-10">Start Your Project</span>
              <svg className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-4 px-12 py-6 bg-white/10 backdrop-blur-xl border-2 border-white/40 rounded-2xl font-black text-xl hover:bg-white/20 hover:border-white/60 transition-all duration-500 text-white hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View More Work
            </Link>

          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-white/80">
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: '100% Satisfaction' },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: '48h Response' },
              { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Worldwide' }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 group/badge">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover/badge:scale-110 group-hover/badge:bg-white/20 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                  </svg>
                </div>
                <span className="font-bold">{badge.text}</span>
              </div>
            ))}
          </div>

        </div>

      </section>


      {/* ============ ELEGANT FOOTER NAVIGATION ============ */}
      <section className="relative border-t border-white/10">
        
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#559659]/5" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Back to Portfolio */}
            <Link 
              href="/portfolio"
              className="group relative flex items-center gap-8 py-16 md:pr-16 transition-all duration-300 hover:bg-white/[0.02]"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-[#559659]/40 to-[#f5ac57]/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-[#559659]/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-[#559659] transition-all duration-300 group-hover:-translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm text-[#f5ac57] uppercase tracking-[0.2em] font-bold mb-2">Previous</p>
                <p className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#559659] group-hover:to-[#f5ac57] transition-all duration-300">
                  Back to Portfolio
                </p>
              </div>
            </Link>

            {/* Contact */}
            <Link 
              href="/contact"
              className="group relative flex items-center justify-end gap-8 py-16 md:pl-16 transition-all duration-300 hover:bg-white/[0.02]"
            >
              <div className="text-right">
                <p className="text-sm text-[#559659] uppercase tracking-[0.2em] font-bold mb-2">Next Step</p>
                <p className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#559659] group-hover:to-[#f5ac57] transition-all duration-300">
                  Let&apos;s Talk
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-[#f5ac57]/40 to-[#559659]/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-[#f5ac57]/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-[#f5ac57] transition-all duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}