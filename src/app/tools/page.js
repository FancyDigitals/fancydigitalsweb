/* =====================================================
   STATIC TOOLS DATA
===================================================== */

const TOOLS = [
  {
    slug: "ai-landing-page-generator",
    name: "AI Landing Page Generator",
    category: "Marketing",
    desc: "Generate high-converting landing page structures and copy with clarity and speed.",
    image: "/tools/ai-landing.png",
    accent: "#075a01",
  },
  {
    slug: "brand-identity-builder",
    name: "Brand Identity Builder",
    category: "Design",
    desc: "Create a consistent brand system with colors, typography, and visual direction.",
    image: "/tools/brand-identity.png",
    accent: "#ff914d",
  },
  {
    slug: "seo-content-planner",
    name: "SEO Content Planner",
    category: "SEO",
    desc: "Plan content around real search intent and long-term organic growth.",
    image: "/tools/seo.png",
    accent: "#0ea5e9",
  },
  {
    slug: "email-sequence-mapper",
    name: "Email Sequence Mapper",
    category: "Email Marketing",
    desc: "Structure email flows that improve engagement, retention, and conversion.",
    image: "/tools/email.png",
    accent: "#8b5cf6",
  },
  {
    slug: "conversion-audit-checklist",
    name: "Conversion Audit Checklist",
    category: "Optimization",
    desc: "Identify friction points and missed opportunities across your website.",
    image: "/tools/conversion.png",
    accent: "#22c55e",
  },
  {
    slug: "product-launch-planner",
    name: "Product Launch Planner",
    category: "Strategy",
    desc: "Plan launches with structure, clarity, and execution confidence.",
    image: "/tools/launch.png",
    accent: "#f97316",
  },
];

/* =====================================================
   PAGE
===================================================== */

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Tools
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Practical digital tools built to{" "}
          <span className="text-[#075a01]">save time</span>,{" "}
          <span className="text-[#ff914d]">increase clarity</span>, and{" "}
          <span className="text-[#0ea5e9]">support growth</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          These tools are designed to remove guesswork from common digital
          decisions — from marketing and SEO to branding and launches.
        </p>
      </section>

      {/* TOOLS GRID */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <a
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.16)]"
            >
              <div
                className="absolute left-0 top-0 h-full w-1"
                style={{ backgroundColor: tool.accent }}
              />

              <div
                className="h-[180px] bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${tool.image})` }}
              />

              <div className="p-6">
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: tool.accent }}
                >
                  {tool.category}
                </p>

                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {tool.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {tool.desc}
                </p>

                <span
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: tool.accent }}
                >
                  Explore tool
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}