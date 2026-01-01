import { portfolio } from "@/content/portfolio/index";

/* =====================================================
   PORTFOLIO PREVIEW — STATIC • MODERN • AGENCY-GRADE
===================================================== */

export default function PortfolioPreview() {
  const projects = Array.isArray(portfolio)
    ? portfolio.filter((p) => p?.published).slice(0, 3)
    : [];

  if (!projects.length) return null;

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28"
    >
      {/* Ambient background wash */}
      <div className="pointer-events-none absolute -top-48 right-0 h-[520px] w-[520px] rounded-full bg-[#075a01]/10 blur-[200px]" />
      <div className="pointer-events-none absolute -bottom-48 left-0 h-[520px] w-[520px] rounded-full bg-[#ff914d]/10 blur-[220px]" />

      {/* Header */}
      <header className="relative mb-16 max-w-3xl md:mb-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Portfolio
        </p>

        <h2
          id="portfolio-heading"
          className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
        >
          Selected{" "}
          <span className="bg-gradient-to-r from-[#075a01] to-[#ff914d] bg-clip-text text-transparent">
            work
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-600">
          A focused selection of projects built with clarity, restraint,
          and long-term intent.
        </p>
      </header>

      {/* Grid */}
      <ul
        role="list"
        className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-12"
      >
        {projects.map((project) => (
          <li key={project.slug} className="group relative">
            <a
              href={`/portfolio/${project.slug}`}
              className="
                relative block h-full overflow-hidden
                rounded-[28px] bg-white
                border border-black/10
                shadow-[0_22px_60px_rgba(0,0,0,0.10)]
                transition-all duration-700 ease-out
                hover:-translate-y-1
                hover:shadow-[0_40px_120px_rgba(0,0,0,0.22)]
              "
            >
              {/* Image */}
              <div className="relative h-[300px] overflow-hidden">
                <div
                  className="
                    absolute inset-0 bg-cover bg-center
                    transition-transform duration-[1000ms] ease-out
                    group-hover:scale-[1.06]
                  "
                  style={{ backgroundImage: `url(${project.coverImage})` }}
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/70 via-black/35 to-transparent
                    opacity-70 transition-opacity duration-700
                    group-hover:opacity-85
                  "
                />
              </div>

              {/* Content */}
              <div className="relative p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {project.category}
                </p>

                <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {project.description}
                </p>

                <span
                  className="
                    mt-6 inline-flex items-center gap-1
                    text-sm font-semibold text-[#075a01]
                    transition-all duration-300
                    group-hover:gap-2
                  "
                >
                  View case study
                  <span aria-hidden="true">→</span>
                </span>
              </div>

              {/* Bottom accent */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-x-0 bottom-0 h-[3px]
                  bg-gradient-to-r from-transparent via-[#075a01]/70 to-transparent
                  opacity-0 transition-opacity duration-700
                  group-hover:opacity-100
                "
              />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative mt-20 md:mt-24">
        <a
          href="/portfolio"
          className="
            inline-flex items-center gap-2
            rounded-xl bg-white
            border border-black/10
            px-7 py-3.5
            text-sm font-semibold text-gray-900
            shadow-[0_16px_48px_rgba(0,0,0,0.12)]
            transition
            hover:-translate-y-0.5
            hover:shadow-[0_26px_80px_rgba(0,0,0,0.22)]
          "
        >
          View full portfolio
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
