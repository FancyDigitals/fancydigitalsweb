/* =====================================================
   TOOLS PREVIEW — PURE STATIC, FUTURE-READY
===================================================== */

export default function ToolsPreview({
  title = "Tools built for clarity",
  maxItems = 3,
}) {
  const tools = [
    {
      slug: "ai-landing-page-generator",
      title: "AI Landing Page Generator",
      description:
        "Generate high-converting landing page structures with clarity, intent, and conversion focus.",
      status: "Coming soon",
    },
    {
      slug: "brand-identity-builder",
      title: "Brand Identity Builder",
      description:
        "Design a clean, consistent brand system — colors, typography, and visual direction.",
      status: "In development",
    },
    {
      slug: "seo-content-planner",
      title: "SEO Content Planner",
      description:
        "Plan SEO-ready content around keyword intent and long-term ranking opportunities.",
      status: "Coming soon",
    },
    {
      slug: "email-funnel-generator",
      title: "Email Funnel Generator",
      description:
        "Create structured email sequences that move leads from interest to conversion.",
      status: "Planned",
    },
  ];

  const visibleTools = tools.slice(0, maxItems);

  if (!visibleTools.length) return null;

  return (
    <section
      aria-labelledby="tools-heading"
      className="relative mx-auto w-full max-w-6xl px-5 py-24 md:px-10"
    >
      {/* HEADER */}
      <header className="mb-14 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
          Tools
        </p>

        <h2
          id="tools-heading"
          className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
        >
          {title}
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          Focused, practical tools designed to help founders, creators, and teams
          make better decisions and scale with confidence.
        </p>
      </header>

      {/* GRID */}
      <ul
        role="list"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleTools.map((tool) => (
          <li
            key={tool.slug}
            className="group relative rounded-2xl border border-black/10
                       bg-white p-6
                       shadow-[0_14px_40px_rgba(0,0,0,0.06)]
                       transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)]"
          >
            {/* STATUS */}
            {tool.status && (
              <span
                className="mb-4 inline-flex rounded-full
                           bg-[#ff914d]/10 px-3 py-1
                           text-xs font-semibold text-[#ff914d]"
              >
                {tool.status}
              </span>
            )}

            <h3 className="mb-3 text-base font-semibold tracking-tight text-gray-900">
              {tool.title}
            </h3>

            <p className="text-sm leading-relaxed text-gray-600">
              {tool.description}
            </p>

            <a
              href={`/tools/${tool.slug}`}
              className="mt-5 inline-flex items-center
                         text-sm font-semibold text-[#075a01]"
            >
              View tool
              <span className="ml-1 transition group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* ACCENT */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5
                         bg-gradient-to-r from-transparent via-[#075a01]/40 to-transparent
                         opacity-0 transition group-hover:opacity-100"
            />
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="/contact"
          className="inline-flex items-center
                     text-sm font-semibold text-[#075a01]
                     transition hover:opacity-80"
        >
          Get early access to tools
          <span className="ml-1">→</span>
        </a>
      </div>
    </section>
  );
}
