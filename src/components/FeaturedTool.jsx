/* =====================================================
   FEATURED TOOL — PURE STATIC, PREMIUM HIGHLIGHT
===================================================== */

export default function FeaturedTool() {
  return (
    <section
      aria-labelledby="featured-tool-heading"
      className="relative mx-auto w-full max-w-6xl px-5 py-24 md:px-10"
    >
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-8 py-16 shadow-[0_22px_60px_rgba(0,0,0,0.10)] md:px-14">
        {/* Accent strip */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] to-[#ff914d]" />

        <div className="flex flex-col gap-14 md:flex-row md:items-center md:justify-between">
          {/* LEFT — CONTENT */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Featured Tool
            </p>

            <h2
              id="featured-tool-heading"
              className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
            >
              AI Website Audit Tool
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-gray-600">
              Instantly analyze your website’s performance, user experience, SEO
              health, and conversion gaps. Built for founders, businesses, and
              creators who want clarity before investing more time or money.
            </p>

            {/* Capability highlights */}
            <ul className="mt-7 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                Performance & speed insights
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                UX & conversion analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                SEO and visibility checks
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                Clear, actionable recommendations
              </li>
            </ul>

            {/* Status badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                Coming soon
              </span>
              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                AI-powered
              </span>
              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                Free & paid plans
              </span>
            </div>
          </div>

          {/* RIGHT — ACTIONS */}
          <div className="flex w-full max-w-sm flex-col gap-4">
            <a
              href="/tools"
              className="inline-flex items-center justify-center rounded-xl bg-[#075a01] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075a01]"
            >
              View all tools
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-black/15 px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              Request early access
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
