import { getPortfolio } from "@/lib/wordpress";
import Link from "next/link";

export default async function PortfolioSingle({ params }) {
  const projects = await getPortfolio();
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <span className="text-[40vw] font-black select-none">404</span>
        </div>
        <div className="relative text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lost in Space</h1>
          <p className="text-gray-500 mb-8">This project doesn&apos;t exist</p>
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-[#559659] text-white rounded-full font-medium hover:gap-4 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
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
  const gallery = project.acf?.gallery || [];

  return (
    <main className="bg-white min-h-screen">

      {/* ========== CREATIVE HERO ========== */}
      <section className="relative pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/portfolio" className="group flex items-center gap-3 text-gray-400 hover:text-gray-900 transition-colors">
              <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              <span className="text-sm font-medium">Back</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">#{year}</span>
              <div className="w-px h-4 bg-gray-200" />
              <span className="px-3 py-1 text-xs font-semibold text-[#559659] bg-[#559659]/10 rounded-full">
                {project.type || "Web"}
              </span>
            </div>
          </div>

          {/* Main Hero Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left - Text */}
            <div className="order-2 lg:order-1">
              
              {/* Large Number */}
              <div className="flex items-start gap-6 mb-8">
                <span className="text-8xl md:text-9xl font-black text-gray-100 leading-none select-none">01</span>
                <div className="pt-4">
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Project</p>
                  <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1]"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                </div>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-6 mb-8 pl-4 border-l-2 border-[#559659]">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Client</p>
                  <p className="text-lg font-semibold text-gray-900">{client}</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Year</p>
                  <p className="text-lg font-semibold text-gray-900">{year}</p>
                </div>
              </div>

              {/* CTA */}
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="w-14 h-14 rounded-full bg-[#559659] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-[#559659] transition-colors">View Live Site</p>
                    <p className="text-sm text-gray-400">See it in action →</p>
                  </div>
                </a>
              )}
            </div>

            {/* Right - Image */}
            <div className="order-1 lg:order-2 relative">
              {image && (
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50">
                    <img src={image} alt={title} className="w-full aspect-[4/3] object-cover" />
                  </div>
                  
                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#559659] to-[#f5ac57] flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-gray-900">98</p>
                        <p className="text-xs text-gray-400">Performance</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-dashed border-[#559659]/30 rounded-2xl -z-10" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#f5ac57]/10 rounded-full -z-10" />
                </div>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* ========== METRICS STRIP ========== */}
      <section className="py-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-4">
            
            {[
              { num: '06', label: 'Weeks', desc: 'Delivery Time' },
              { num: '180', label: '%', desc: 'Traffic Boost' },
              { num: '100', label: '%', desc: 'Client Happy' },
              { num: '24', label: '/7', desc: 'Support' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <span className="text-4xl font-black text-gray-900 group-hover:text-[#559659] transition-colors">{item.num}</span>
                    <span className="text-xl font-bold text-[#f5ac57]">{item.label}</span>
                  </div>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block w-px h-12 bg-gray-200" />}
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ========== CONTENT ========== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Sidebar */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-8 space-y-8">
                
                {/* Quick Info */}
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Project Info</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-500">Client</span>
                      <span className="text-sm font-semibold text-gray-900">{client}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-500">Year</span>
                      <span className="text-sm font-semibold text-gray-900">{year}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="text-sm font-semibold text-gray-900">{project.type || "Web Dev"}</span>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Share</h3>
                  <div className="flex gap-2">
                    {['twitter', 'linkedin', 'copy'].map((platform) => (
                      <button 
                        key={platform}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#559659] hover:text-white flex items-center justify-center text-gray-400 transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          {platform === 'twitter' && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />}
                          {platform === 'linkedin' && <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />}
                          {platform === 'copy' && <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />}
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              
              {/* Section Title */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#559659]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">About the Project</h2>
                  <p className="text-sm text-gray-400">Deep dive into the details</p>
                </div>
              </div>

              <article 
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:flex prose-h2:items-center prose-h2:gap-3
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-[#559659] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-blockquote:border-l-4 prose-blockquote:border-[#559659] prose-blockquote:bg-[#559659]/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-medium
                  prose-img:rounded-2xl prose-img:shadow-lg
                  prose-code:text-[#f5ac57] prose-code:bg-[#f5ac57]/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
                  prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />

            </div>
          </div>
        </div>
      </section>


      {/* ========== TECH STACK ========== */}
      {technologies.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl font-black text-gray-100">T</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tech Stack</h2>
                <p className="text-sm text-gray-400">{technologies.length} technologies used</p>
              </div>
            </div>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="group relative flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-gray-200 hover:border-[#559659] hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#559659] to-[#f5ac57] flex items-center justify-center text-white text-sm font-bold">
                    {tech.tech_name?.charAt(0)}
                  </span>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors pr-2">
                    {tech.tech_name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}


      {/* ========== GALLERY ========== */}
      {gallery.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm text-[#559659] font-semibold uppercase tracking-widest mb-2">Gallery</p>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">Project Showcase</h2>
              </div>
              <p className="hidden md:block text-sm text-gray-400">{gallery.length} images</p>
            </div>

            {/* Creative Grid */}
            <div className="grid grid-cols-6 gap-4">
              {gallery.map((img, i) => {
                // Create varied layouts
                const layouts = [
                  'col-span-6 md:col-span-4 aspect-video',
                  'col-span-6 md:col-span-2 aspect-square',
                  'col-span-3 md:col-span-2 aspect-square',
                  'col-span-3 md:col-span-2 aspect-square',
                  'col-span-6 md:col-span-2 aspect-[3/4]',
                  'col-span-6 md:col-span-3 aspect-video',
                  'col-span-6 md:col-span-3 aspect-video',
                ];
                
                return (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${layouts[i % layouts.length]}`}
                  >
                    <img
                      src={img.url}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <span className="text-xs font-bold text-gray-900">{i + 1}</span>
                    </div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}


      {/* ========== TESTIMONIAL ========== */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="relative">
            {/* Quote Mark */}
            <div className="absolute -top-8 -left-4 text-[150px] leading-none font-serif text-gray-100 select-none">&ldquo;</div>
            
            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-100/50">
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#f5ac57]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed mb-8">
                Working with Fancy Digitals was an exceptional experience. They delivered beyond expectations with creativity and professionalism.
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#559659] to-[#f5ac57] flex items-center justify-center text-white text-xl font-bold">
                    {client.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{client}</p>
                    <p className="text-sm text-gray-500">Project Lead</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-[#559659]/10 rounded-full">
                  <svg className="w-4 h-4 text-[#559659]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-[#559659]">Verified Client</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ========== CTA ========== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="relative bg-gray-900 rounded-[2rem] p-10 md:p-16 overflow-hidden">
            
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#559659]/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f5ac57]/30 rounded-full blur-[100px]" />
            
            <div className="relative text-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#559659] animate-pulse" />
                <span className="text-sm text-white/80">Ready to start</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                Let&apos;s Build Something<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#559659] to-[#f5ac57]">Amazing Together</span>
              </h2>
              
              <p className="text-gray-400 mb-10 max-w-md mx-auto">
                Have a project in mind? We&apos;d love to hear about it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-[#559659] hover:text-white transition-all"
                >
                  Start Project
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  More Work
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ========== FOOTER NAV ========== */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2">
            
            <Link 
              href="/portfolio"
              className="group flex items-center gap-5 p-8 md:p-10 hover:bg-gray-50 transition-colors border-b md:border-b-0 md:border-r border-gray-100"
            >
              <span className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-[#559659] flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Previous</p>
                <p className="text-lg font-bold text-gray-900 group-hover:text-[#559659] transition-colors">All Projects</p>
              </div>
            </Link>

            <Link 
              href="/contact"
              className="group flex items-center justify-end gap-5 p-8 md:p-10 hover:bg-gray-50 transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Next Step</p>
                <p className="text-lg font-bold text-gray-900 group-hover:text-[#559659] transition-colors">Get in Touch</p>
              </div>
              <span className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-[#559659] flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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