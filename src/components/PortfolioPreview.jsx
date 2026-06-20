import { getPortfolio } from "@/lib/wordpress";

export default async function PortfolioPreview() {
  const wpProjects = await getPortfolio();
  const projects = Array.isArray(wpProjects) ? wpProjects.slice(0, 3) : [];

  if (!projects.length) return null;

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-12 sm:py-20 md:py-24 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] lg:h-[700px] lg:w-[700px] animate-pulse rounded-full bg-[#075a01]/8 blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] animate-pulse rounded-full bg-[#ff914d]/8 blur-[80px] sm:blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px]" />
        <div className="hidden sm:block absolute left-[12%] top-24 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/25" />
        <div className="hidden sm:block absolute right-[10%] top-1/3 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/30" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">

        {/* Header */}
        <header className="relative mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
          <h2
            id="portfolio-heading"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
          >
            <span className="block">Selected</span>
            <span className="relative mt-1 sm:mt-2 inline-block">
              <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent">
                work
              </span>
              <svg className="absolute -bottom-2 sm:-bottom-3 left-1/2 w-16 sm:w-24 md:w-32 -translate-x-1/2" viewBox="0 0 120 12" fill="none">
                <path d="M2 10C30 4 90 4 118 10" stroke="url(#port-underline)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="port-underline" x1="0" y1="0" x2="120" y2="0">
                    <stop stopColor="#075a01" />
                    <stop offset="0.5" stopColor="#ff914d" />
                    <stop offset="1" stopColor="#075a01" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-5 sm:mt-7 md:mt-8 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 px-2">
            A focused selection of projects built with{" "}
            <span className="font-semibold text-gray-900">clarity</span>,{" "}
            <span className="font-semibold text-gray-900">restraint</span>, and{" "}
            <span className="font-semibold text-gray-900">long-term intent</span>.
          </p>
        </header>

        {/* Projects Grid — 1 col mobile / 2 col tablet / 3 col desktop */}
        <ul role="list" className="relative grid gap-3 sm:gap-6 lg:gap-8 grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const image =
              project._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/images/placeholder.jpg";
            const title = project.title?.rendered || "Untitled Project";
            const excerpt = project.excerpt?.rendered || "";
            const slug = project.slug;
            const categories = project._embedded?.["wp:term"]?.[0] || [];
            const category = categories[0]?.name || "Web Development";

            return (
              <li key={project.id} className="group">
                <a href={`/portfolio/${slug}`} className="relative block h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 hover:border-transparent hover:shadow-2xl hover:shadow-[#075a01]/10">
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#075a01] via-[#ff914d] to-[#075a01] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-[2px] rounded-[14px] sm:rounded-[22px] bg-white transition-colors duration-300 group-hover:bg-gray-50" />

                    {/* Image */}
                    <div className="relative h-[120px] sm:h-[200px] md:h-[240px] lg:h-[260px] overflow-hidden rounded-t-[14px] sm:rounded-t-[22px]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-30" />
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                      <div className="absolute left-3 top-3 sm:left-4 sm:top-4 md:left-5 md:top-5 z-10">
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/60 bg-white/90 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-gray-700 shadow-sm backdrop-blur-sm">
                          <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#075a01]" />
                          <span className="truncate max-w-[100px] sm:max-w-none">{category}</span>
                        </span>
                      </div>

                      <div className="absolute right-3 top-3 sm:right-4 sm:top-4 md:right-5 md:top-5 z-10">
                        <span className="flex h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-white/60 bg-white/90 text-xs sm:text-sm font-bold text-gray-700 shadow-sm backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full border-2 border-white/80 bg-[#075a01]/90 shadow-xl backdrop-blur-sm">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-3 sm:p-5 md:p-7">
                      <div className="absolute inset-x-4 sm:inset-x-5 md:inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-colors duration-300 group-hover:via-[#075a01]/30" />
                      <h3
  className="mb-1.5 sm:mb-3 text-xs sm:text-lg md:text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#075a01] line-clamp-2 leading-tight"
  dangerouslySetInnerHTML={{ __html: title }}
/>
                      <div
  className="hidden sm:block mb-4 sm:mb-5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-gray-600"
  dangerouslySetInnerHTML={{ __html: excerpt }}
/>
                      <div className="flex items-center justify-between">
  <div className="inline-flex items-center gap-1 sm:gap-2 font-semibold text-[#075a01] transition-all duration-300 group-hover:gap-3 text-[10px] sm:text-sm">
    <span className="sm:hidden">View →</span>
    <span className="hidden sm:inline">View case study</span>
    <svg className="hidden sm:block h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  </div>
  <div className="hidden sm:flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all duration-300 group-hover:bg-[#ff914d]/10 group-hover:text-[#ff914d]">
    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </div>
</div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="relative mt-8 sm:mt-12 md:mt-16 flex flex-col items-stretch sm:items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/portfolio"
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-bold text-white shadow-xl shadow-[#075a01]/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#075a01]/30 active:scale-95"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <svg className="relative h-4 w-4 sm:h-5 sm:w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="relative">View Full Portfolio</span>
            <svg className="relative h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>

          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border-2 border-gray-200 bg-white px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg active:scale-95"
          >
            <span>Start a Project</span>
            <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#ff914d] transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </a>
        </div>

        {/* Bottom decorative */}
        <div className="mt-10 sm:mt-14 md:mt-16 flex justify-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gray-200" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-[#075a01]" />
              <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 animate-pulse rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01]" style={{ animationDelay: "0.2s" }} />
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-[#ff914d]" style={{ animationDelay: "0.4s" }} />
            </div>
            <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}