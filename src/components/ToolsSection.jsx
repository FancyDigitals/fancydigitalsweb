import { tools } from "@/content/tools";
import Link from "next/link";

const CATEGORY_COLORS = {
  SEO: { bg: "bg-[#075a01]/10", text: "text-[#075a01]", dot: "bg-[#075a01]" },
  Writing: { bg: "bg-[#0ea5e9]/10", text: "text-[#0ea5e9]", dot: "bg-[#0ea5e9]" },
  Security: { bg: "bg-[#8b5cf6]/10", text: "text-[#8b5cf6]", dot: "bg-[#8b5cf6]" },
  Utilities: { bg: "bg-[#f97316]/10", text: "text-[#f97316]", dot: "bg-[#f97316]" },
  Design: { bg: "bg-[#ec4899]/10", text: "text-[#ec4899]", dot: "bg-[#ec4899]" },
  Business: { bg: "bg-[#075a01]/10", text: "text-[#075a01]", dot: "bg-[#075a01]" },
  Marketing: { bg: "bg-[#ff914d]/10", text: "text-[#ff914d]", dot: "bg-[#ff914d]" },
  "Social Media": { bg: "bg-[#e1306c]/10", text: "text-[#e1306c]", dot: "bg-[#e1306c]" },
  "Email Marketing": { bg: "bg-[#0ea5e9]/10", text: "text-[#0ea5e9]", dot: "bg-[#0ea5e9]" },
  Optimization: { bg: "bg-[#22c55e]/10", text: "text-[#22c55e]", dot: "bg-[#22c55e]" },
  Strategy: { bg: "bg-[#f97316]/10", text: "text-[#f97316]", dot: "bg-[#f97316]" },
};

function ToolIcon({ accent }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill={`${accent}15`} />
      <path d="M12 20h16M20 12v16" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="6" stroke={accent} strokeWidth="2" />
    </svg>
  );
}

export default function ToolsSection() {
  const published = tools
    .filter((t) => t.published)
    .sort((a, b) => a.order - b.order);

  const liveTools = published.filter((t) => t.isLive);
  const comingTools = published.filter((t) => !t.isLive).slice(0, 4);

  return (
    <section
      aria-labelledby="tools-section-heading"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 md:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">

        {/* Header */}
        <header className="mb-16 text-center md:mb-20">

          <h2
            id="tools-section-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            <span className="block">Free tools built for</span>
            <span className="relative mt-2 inline-block">
              <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent">
                real work
              </span>
              <svg className="absolute -bottom-3 left-1/2 w-48 -translate-x-1/2 md:w-64" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 4 150 4 198 10" stroke="url(#tools-underline)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="tools-underline" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#075a01" />
                    <stop offset="0.5" stopColor="#ff914d" />
                    <stop offset="1" stopColor="#075a01" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            No sign-up. No credit card. Just open a tool and get results in seconds.
            Built by Fancy Digitals for founders, marketers, and creators.
          </p>
        </header>

        {/* LIVE TOOLS — Featured Row */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              Live Now
            </span>
            <span className="text-sm text-gray-400">{liveTools.length} tools ready to use</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {liveTools.map((tool) => {
              const catStyle = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.Utilities;
              return (
                <a
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-xl"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(135deg, ${tool.accent}20, transparent, ${tool.accent}10)` }}
                  />
                  <div className="absolute inset-[2px] rounded-[14px] bg-white" />

                  <div className="relative">
                    {/* Icon + Status */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="h-10 w-10 rounded-xl" style={{ backgroundColor: `${tool.accent}15` }}>
                        <div className="flex h-full w-full items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke={tool.accent} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                          </svg>
                        </div>
                      </div>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                        Free
                      </span>
                    </div>

                    {/* Category */}
                    <div className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${catStyle.bg} ${catStyle.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${catStyle.dot}`} />
                      {tool.category}
                    </div>

                    {/* Name */}
                    <h3 className="mb-1.5 text-sm font-bold text-gray-900 leading-snug group-hover:text-gray-700">
                      {tool.name}
                    </h3>

                    {/* Desc */}
                    <p className="text-xs leading-relaxed text-gray-400 line-clamp-2">
                      {tool.desc}
                    </p>

                    {/* CTA */}
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold transition-all duration-300" style={{ color: tool.accent }}>
                      Use now
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-2xl"
                    style={{ backgroundColor: tool.accent }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* COMING SOON — Smaller Row */}
        {comingTools.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold text-orange-700">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Coming Soon
              </span>
              <span className="text-sm text-gray-400">Join the waitlist</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {comingTools.map((tool) => {
                const catStyle = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.Utilities;
                return (
                  <a
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${tool.accent}15` }}>
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke={tool.accent} strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-gray-700 group-hover:text-gray-900">{tool.name}</p>
                      <p className={`text-[10px] font-semibold ${catStyle.text}`}>{tool.category}</p>
                    </div>
                    <svg className="ml-auto h-3.5 w-3.5 shrink-0 text-gray-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: `${liveTools.length}`, label: "Tools Live Now", color: "#075a01" },
            { value: `${tools.filter((t) => t.published).length}+`, label: "Tools Total", color: "#ff914d" },
            { value: "0", label: "Sign-up Required", color: "#0ea5e9" },
            { value: "Free", label: "Forever", color: "#8b5cf6" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl sm:text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/tools"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-10 py-5 text-lg font-bold text-white shadow-xl shadow-[#075a01]/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#075a01]/30"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
            <span className="relative">Explore All Free Tools</span>
            <svg className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>

          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-10 py-5 text-lg font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg"
          >
            <span>Request a Custom Tool</span>
            <svg className="h-5 w-5 text-[#ff914d] transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </a>
        </div>

        {/* Bottom decorative */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#075a01]" />
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01]" style={{ animationDelay: "0.2s" }} />
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff914d]" style={{ animationDelay: "0.4s" }} />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}