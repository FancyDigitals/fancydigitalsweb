import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* =====================================================
   BRAND TOKENS
===================================================== */

const BRAND = {
  green: "#075a01",
  gold: "#ff914d",
};

/* =====================================================
   STATIC TOOLS DATA
===================================================== */

const TOOLS = {
  "ai-landing-page-generator": {
    name: "AI Landing Page Generator",
    category: "Marketing Tool",
    accent: BRAND.green,
    gradient:
      "linear-gradient(135deg, rgba(7,90,1,1) 0%, rgba(7,90,1,0.85) 55%, rgba(255,145,77,0.25) 100%)",
    tagline: "Generate clear, conversion-focused landing page structures in minutes.",
    intro:
      "A practical tool designed to remove guesswork from landing page structure and messaging.",
    problem:
      "Most landing pages fail because the message is unclear and the structure does not guide decisions.",
    solution:
      "This tool applies proven layout logic and messaging hierarchy so every section earns its place.",
    features: [
      "Section-by-section page structure",
      "Headline and value proposition guidance",
      "Trust signal placement",
      "Conversion-focused CTA logic",
    ],
    useCases: [
      "SaaS product launches",
      "Service-based businesses",
      "Startup MVP validation",
      "Marketing campaigns",
    ],
    outcomes: [
      "Faster page creation",
      "Clearer messaging hierarchy",
      "Higher confidence in conversion flow",
    ],
    cta: {
      label: "Talk to us about this tool",
      href: "/contact",
    },
  },
};

/* =====================================================
   STATIC PARAMS (CRITICAL)
===================================================== */

export function generateStaticParams() {
  return Object.keys(TOOLS).map((slug) => ({ slug }));
}

/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title: "Tool | Fancy Digitals",
  description:
    "Detailed breakdowns of practical digital tools built for clarity, structure, and long-term growth.",
};

/* =====================================================
   PAGE
===================================================== */

export default function ToolDetailPage({ params }) {
  const slug = params?.slug;
  const tool = TOOLS[slug];

  if (!tool) {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <Header />
        <section className="mx-auto max-w-6xl px-5 pt-40 pb-28 md:px-10">
          <h1 className="text-3xl font-semibold">Tool not found</h1>
          <p className="mt-4 max-w-xl text-gray-600">
            The tool you’re looking for does not exist or the URL is incorrect.
          </p>
          <a
            href="/tools"
            className="mt-8 inline-flex rounded-xl bg-[#075a01] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to tools
          </a>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Header />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: tool.gradient }}
      >
        <div className="mx-auto max-w-6xl px-5 pt-36 pb-28 md:px-10 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            {tool.category}
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            {tool.name}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90">
            {tool.tagline}
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10">
        <p className="max-w-3xl text-lg leading-relaxed text-gray-700">
          {tool.intro}
        </p>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/5 bg-[#f8f9f8] p-8">
            <h2 className="text-xl font-semibold">The problem</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {tool.problem}
            </p>
          </div>

          <div
            className="rounded-3xl p-8 text-white"
            style={{ background: tool.gradient }}
          >
            <h2 className="text-xl font-semibold">The solution</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              {tool.solution}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-10">
        <h2 className="text-2xl font-semibold">What this tool provides</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tool.features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              <p className="text-sm font-semibold">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div
          className="rounded-3xl p-12 text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          style={{ background: tool.gradient }}
        >
          <h2 className="max-w-2xl text-2xl font-semibold md:text-3xl">
            Want to use this tool for your business?
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-white/90">
            We don’t just build tools — we help apply them correctly to real
            business problems.
          </p>

          <div className="mt-8">
            <a
              href={tool.cta.href}
              className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold"
              style={{ color: tool.accent }}
            >
              {tool.cta.label}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
