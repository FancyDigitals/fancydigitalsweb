import { tools } from "@/content/tools";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { name: "All", icon: "✨" },
  { name: "SEO", icon: "🔍" },
  { name: "Marketing", icon: "📣" },
  { name: "Design", icon: "🎨" },
  { name: "Email Marketing", icon: "📧" },
  { name: "Optimization", icon: "✅" },
  { name: "Strategy", icon: "🎯" },
];

const STATUS_STYLES = {
  Live: "bg-green-100 text-green-700",
  "Coming Soon": "bg-orange-100 text-orange-700",
  "In Development": "bg-blue-100 text-blue-700",
};

export const metadata = {
  title: "Free Digital Tools | Fancy Digitals",
  description:
    "Free practical tools for SEO, marketing, branding, and business growth. No sign-up required.",
};

export default function ToolsPage() {
  const published = tools
    .filter((t) => t.published)
    .sort((a, b) => a.order - b.order);

  const featuredTool = published.find((t) => t.isLive) || published[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />

      {/* BG decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* HERO */}
      <section className="relative px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-sm">
              <a href="/" className="text-sm text-gray-500 hover:text-[#075a01]">Home</a>
              <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm font-semibold text-gray-900">Tools</span>
            </div>
          </nav>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-bold text-green-700">
                {published.filter((t) => t.isLive).length} tool live now — free to use
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Practical tools built to{" "}
              <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                save time
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-[#ff914d] to-[#f97316] bg-clip-text text-transparent">
                increase clarity
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              No sign-up. No credit card. Just open a tool and get results in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED LIVE TOOL */}
      {featuredTool && (
        <section className="relative px-5 pb-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl border-2 border-[#075a01]/20 bg-gradient-to-br from-white to-gray-50 shadow-xl">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#075a01]/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ff914d]/5 blur-3xl" />

              <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm font-bold text-green-700">Live — Try it now</span>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                    {featuredTool.name}
                  </h2>

                  <p className="mt-4 text-lg text-gray-600">{featuredTool.desc}</p>

                  <ul className="mt-6 space-y-3">
                    {featuredTool.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#075a01]/10">
                          <svg className="h-4 w-4 text-[#075a01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
  href={`/tools/${featuredTool.slug}`}
  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    Use Tool Free
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>

                {/* Right visual */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 blur-xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl w-full max-w-sm">
                      <div className="h-2 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#0ea5e9]" />
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-3 w-3 rounded-full bg-red-400" />
                          <div className="h-3 w-3 rounded-full bg-yellow-400" />
                          <div className="h-3 w-3 rounded-full bg-green-400" />
                        </div>
                        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
                          <p className="text-xs text-gray-400 mb-1">Page Title</p>
                          <div className="h-3 w-4/5 rounded bg-[#075a01]/20" />
                        </div>
                        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
                          <p className="text-xs text-gray-400 mb-1">Meta Description</p>
                          <div className="space-y-1.5">
                            <div className="h-2.5 w-full rounded bg-gray-200" />
                            <div className="h-2.5 w-3/4 rounded bg-gray-200" />
                          </div>
                        </div>
                        <div className="rounded-lg bg-white border border-gray-200 p-3">
                          <p className="text-xs text-gray-400 mb-2">Google Preview</p>
                          <div className="h-3 w-1/2 rounded bg-[#1a0dab]/20 mb-1" />
                          <div className="h-2 w-full rounded bg-gray-100" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -left-6 top-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-lg">🔍</div>
                    <div className="absolute -right-6 bottom-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-lg">✨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL TOOLS GRID */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              All <span className="text-[#075a01]">Tools</span>
            </h2>
            <p className="mt-3 text-gray-500">Use live tools now. Get notified when others launch.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((tool) => (
              <a
  key={tool.slug}
  href={`/tools/${tool.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${tool.accent}30, transparent)` }}
                />
                <div className="absolute inset-[2px] rounded-[22px] bg-white" />

                {/* popular badge */}
                {tool.popular && (
                  <div
                    className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: tool.accent }}
                  >
                    Popular
                  </div>
                )}

                <div className="relative">
                  {/* icon area */}
                  <div className={`relative h-[160px] overflow-hidden rounded-t-[22px] bg-gradient-to-br ${tool.accentLight} flex items-center justify-center`}>
                    <span className="text-7xl opacity-25 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
                      {tool.icon}
                    </span>
                  </div>

                  <div className="relative p-6">
                    {/* status + category */}
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tool.accent }}>
                        {tool.category}
                      </p>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[tool.status] || "bg-gray-100 text-gray-600"}`}>
                        {tool.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{tool.desc}</p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-bold" style={{ color: tool.accent }}>
                        {tool.isLive ? "Use now" : "Learn more"}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">Free</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-10 text-center shadow-2xl md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ff914d]/20 blur-3xl" />

            <h2 className="relative text-3xl font-bold text-white md:text-4xl">
              Want a tool built just for you?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">
              We build custom digital tools for businesses. Let us know what you need.
            </p>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#075a01] shadow-lg transition hover:-translate-y-1">
                Discuss Your Idea
              </a>
              <a
                href="https://wa.me/2349034360785"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}