import { getPortfolio } from "@/lib/wordpress";

/* =====================================================
   PORTFOLIO PREVIEW — BRIGHT, CREATIVE, WORDPRESS POWERED
===================================================== */

export default async function PortfolioPreview() {
  // Fetch projects from WordPress
  const wpProjects = await getPortfolio();
  
  // Get first 3 published projects
  const projects = Array.isArray(wpProjects)
    ? wpProjects.slice(0, 3)
    : [];

  if (!projects.length) return null;

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -right-40 -top-40 h-[700px] w-[700px] animate-pulse rounded-full bg-[#075a01]/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[600px] w-[600px] animate-pulse rounded-full bg-[#ff914d]/8 blur-[100px]" />
        <div className="absolute right-0 top-1/2 h-[500px] w-[400px] -translate-y-1/2 animate-pulse rounded-full bg-[#075a01]/5 blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating shapes */}
        <div className="absolute left-[12%] top-24 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/25" />
        <div
          className="absolute right-[10%] top-1/3 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/30"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/3 left-[8%] h-2.5 w-2.5 animate-bounce rounded-full bg-[#075a01]/20"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute right-[18%] top-2/3 h-5 w-5 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#ff914d]/20"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute bottom-24 left-[30%] h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/15"
          style={{ animationDelay: "0.7s" }}
        />

        {/* Decorative lines */}
        <div className="absolute right-0 top-1/4 h-px w-40 bg-gradient-to-r from-transparent via-[#075a01]/10 to-transparent" />
        <div className="absolute left-0 top-2/3 h-px w-32 bg-gradient-to-r from-transparent via-[#ff914d]/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <header className="relative mb-16 text-center md:mb-20">

          <h2
            id="portfolio-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            <span className="block">Selected</span>
            <span className="relative mt-2 inline-block">
              <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent">
                work
              </span>
              <svg
                className="absolute -bottom-3 left-1/2 w-24 -translate-x-1/2 md:w-32"
                viewBox="0 0 120 12"
                fill="none"
              >
                <path
                  d="M2 10C30 4 90 4 118 10"
                  stroke="url(#portfolio-preview-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="portfolio-preview-underline"
                    x1="0"
                    y1="0"
                    x2="120"
                    y2="0"
                  >
                    <stop stopColor="#075a01" />
                    <stop offset="0.5" stopColor="#ff914d" />
                    <stop offset="1" stopColor="#075a01" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            A focused selection of projects built with{" "}
            <span className="font-semibold text-gray-900">clarity</span>,{" "}
            <span className="font-semibold text-gray-900">restraint</span>, and{" "}
            <span className="font-semibold text-gray-900">long-term intent</span>.
          </p>
        </header>

        {/* Projects Grid */}
        <ul
          role="list"
          className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => {
            // Extract WordPress data
            const image =
              project._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/images/placeholder.jpg";
            const title = project.title?.rendered || "Untitled Project";
            const excerpt = project.excerpt?.rendered || "";
            const slug = project.slug;
            
            // Extract categories if available
            const categories = project._embedded?.["wp:term"]?.[0] || [];
            const category = categories[0]?.name || "Web Development";

            return (
              <li
                key={project.id}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a
                  href={`/portfolio/${slug}`}
                  className="relative block h-full"
                >
                  {/* Card */}
                  <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-transparent hover:shadow-2xl hover:shadow-[#075a01]/10">
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#075a01] via-[#ff914d] to-[#075a01] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-[2px] rounded-[22px] bg-white transition-colors duration-300 group-hover:bg-gray-50" />

                    {/* Image Section */}
                    <div className="relative h-[260px] overflow-hidden rounded-t-[22px]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${image})` }}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-30" />

                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                      {/* Category badge */}
                      <div className="absolute left-5 top-5 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-[#075a01]/30 group-hover:bg-white group-hover:shadow-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#075a01]"></span>
                          {category}
                        </span>
                      </div>

                      {/* Project number */}
                      <div className="absolute right-5 top-5 z-10">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/90 text-sm font-bold text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-[#ff914d]/30 group-hover:bg-white group-hover:shadow-md">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Hover view button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-[#075a01]/90 shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <svg
                            className="h-6 w-6 text-white"
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

                      {/* Decorative corner accent */}
                      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-[#ff914d]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Content Section */}
                    <div className="relative p-7">
                      {/* Top border glow */}
                      <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-colors duration-300 group-hover:via-[#075a01]/30" />

                      <h3
                        className="mb-3 text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#075a01]"
                        dangerouslySetInnerHTML={{ __html: title }}
                      />

                      <div
                        className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-600"
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                      />

                      {/* View link */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 font-semibold text-[#075a01] transition-all duration-300 group-hover:gap-3">
                          <span>View case study</span>
                          <svg
                            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
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

                        {/* Mini preview icon */}
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all duration-300 group-hover:bg-[#ff914d]/10 group-hover:text-[#ff914d]">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="relative mt-12 flex flex-col items-center gap-6 md:mt-16 md:flex-row md:justify-center">
          {/* Primary CTA */}
          <a
            href="/portfolio"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-10 py-5 text-lg font-bold text-white shadow-xl shadow-[#075a01]/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#075a01]/30"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <svg
              className="relative h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="relative">View Full Portfolio</span>
            <svg
              className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-10 py-5 text-lg font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg"
          >
            <span>Start a Project</span>
            <svg
              className="h-5 w-5 text-[#ff914d] transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </a>
        </div>

        {/* Bottom decorative */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#075a01]" />
              <div
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01]"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-[#ff914d]"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </div>

        {/* Testimonial Teaser */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm md:p-10">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
            {/* Quote icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10">
              <svg
                className="h-8 w-8 text-[#075a01]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-lg text-gray-700 md:text-xl">
                &ldquo;Fancy Digitals transformed our vision into a stunning
                reality. The attention to detail and strategic approach was
                exactly what we needed.&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                <div>
                  <p className="font-semibold text-gray-900">Happy Client</p>
                  <p className="text-sm text-gray-500">CEO, FeastBasket</p>
                </div>
              </div>
            </div>

            <a
              href="/contact"
              className="group shrink-0 rounded-xl bg-[#075a01]/10 px-6 py-3 font-semibold text-[#075a01] transition-all duration-300 hover:bg-[#075a01] hover:text-white"
            >
              Read More Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}