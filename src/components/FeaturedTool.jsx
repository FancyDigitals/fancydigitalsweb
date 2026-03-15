/* =====================================================
   FEATURED TOOL — BRIGHT, ELEGANT, PREMIUM
===================================================== */

export default function FeaturedTool() {
  const capabilities = [
    {
      text: "Performance & speed insights",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      text: "UX & conversion analysis",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      text: "SEO and visibility checks",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      text: "Clear, actionable recommendations",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const badges = [
    { text: "Coming soon", color: "from-[#ff914d] to-[#ff6b1a]", pulse: true },
    { text: "AI-powered", color: "from-[#075a01] to-[#0a8f01]", pulse: false },
    { text: "Free & paid plans", color: "from-gray-600 to-gray-500", pulse: false },
  ];

  return (
    <section
      aria-labelledby="featured-tool-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/5 blur-[100px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[300px] animate-pulse rounded-full bg-[#075a01]/3 blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating shapes */}
        <div className="absolute left-[10%] top-32 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20" />
        <div
          className="absolute right-[15%] top-48 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/25"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-32 left-[20%] h-5 w-5 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/15"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute right-[8%] top-[60%] h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/20"
          style={{ animationDelay: "0.7s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        {/* Main card */}
        <div className="group relative">
          {/* Outer glow */}
          <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-r from-[#075a01]/20 via-[#ff914d]/15 to-[#075a01]/20 opacity-60 blur-3xl transition-all duration-1000 group-hover:opacity-100" />

          {/* Card container with gradient border effect */}
          <div className="relative overflow-hidden rounded-[40px] border-2 border-gray-100 bg-white shadow-2xl transition-all duration-500 hover:border-transparent hover:shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#075a01] via-[#ff914d] to-[#075a01] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-[2px] rounded-[38px] bg-white" />

            <div className="relative px-8 py-16 md:px-14 md:py-20">
              {/* Inner decorative elements */}
              <div className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#075a01]/5 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-[350px] w-[350px] rounded-full bg-[#ff914d]/5 blur-[120px]" />

              {/* Corner accents */}
              <div className="pointer-events-none absolute top-0 left-0 h-48 w-48 bg-gradient-to-br from-gray-50 via-transparent to-transparent rounded-tl-[38px]" />
              <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl from-[#ff914d]/5 via-transparent to-transparent rounded-tr-[38px]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-tr from-gray-50 via-transparent to-transparent rounded-bl-[38px]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 bg-gradient-to-tl from-[#ff914d]/5 via-transparent to-transparent rounded-br-[38px]" />

              {/* Decorative corner frames */}
              <svg
                className="absolute top-8 left-8 w-10 h-10 text-gray-200 transition-all duration-500 group-hover:text-[#075a01]/30 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M0 10V0h10" />
              </svg>
              <svg
                className="absolute top-8 right-8 w-10 h-10 text-gray-200 transition-all duration-500 group-hover:text-[#ff914d]/30 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M24 10V0h-10" />
              </svg>
              <svg
                className="absolute bottom-8 left-8 w-10 h-10 text-gray-200 transition-all duration-500 group-hover:text-[#075a01]/30 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M0 14v10h10" />
              </svg>
              <svg
                className="absolute bottom-8 right-8 w-10 h-10 text-gray-200 transition-all duration-500 group-hover:text-[#ff914d]/30 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M24 14v10h-10" />
              </svg>

              {/* Accent strip top */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-[38px]" />

              {/* Decorative background icon */}
              <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.02] transition-opacity duration-700 group-hover:opacity-[0.04]">
                <svg className="w-80 h-80 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <div className="relative flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT — CONTENT */}
                <div className="max-w-xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-[#075a01]/20 bg-white px-5 py-2.5 mb-8 shadow-lg shadow-[#075a01]/5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#075a01] opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#075a01] to-[#0a8f01]"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                      Featured Tool
                    </span>
                  </div>

                  {/* Heading */}
                  <h2
                    id="featured-tool-heading"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
                  >
                    <span className="block text-gray-900">
                      AI Website
                    </span>
                    <span className="relative mt-1 inline-block">
                      <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent bg-[length:200%_auto]">
                        Audit Tool
                      </span>
                      <svg
                        className="absolute -bottom-2 left-0 w-full max-w-[200px]"
                        viewBox="0 0 200 12"
                        fill="none"
                      >
                        <path
                          d="M2 10C50 4 150 4 198 10"
                          stroke="url(#tool-underline)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="tool-underline"
                            x1="0"
                            y1="0"
                            x2="200"
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

                  {/* Description */}
                  <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-lg">
                    Instantly analyze your website's performance, user experience, SEO
                    health, and conversion gaps. Built for founders, businesses, and
                    creators who want clarity before investing more time or money.
                  </p>

                  {/* Capability highlights */}
                  <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {capabilities.map((item, index) => (
                      <li
                        key={index}
                        className="
                          group/item flex items-center gap-3
                          rounded-xl border border-gray-100 bg-white
                          px-4 py-3
                          shadow-sm
                          transition-all duration-300
                          hover:border-[#075a01]/20
                          hover:shadow-md
                          hover:-translate-y-0.5
                        "
                      >
                        <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white shadow-md shadow-[#075a01]/20 transition-transform duration-300 group-hover/item:scale-110">
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Status badges */}
                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    {badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`
                          inline-flex items-center gap-2 rounded-full
                          bg-gradient-to-r ${badge.color}
                          px-4 py-2
                          text-xs font-bold uppercase tracking-wider text-white
                          shadow-lg
                          transition-transform duration-300 hover:scale-105
                        `}
                      >
                        {badge.pulse && (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                          </span>
                        )}
                        {badge.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT — ACTIONS & VISUAL */}
                <div className="flex flex-col items-center gap-8 lg:items-end">
                  {/* Decorative visual element */}
                  <div className="relative w-full max-w-xs">
                    {/* Glow behind */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#075a01]/10 to-[#ff914d]/10 blur-3xl rounded-3xl" />
                    
                    {/* Mock UI preview */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-6 shadow-2xl">
                      {/* Window controls */}
                      <div className="flex items-center gap-2 mb-5">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                        <div className="h-3 w-3 rounded-full bg-green-400" />
                        <div className="ml-4 h-6 flex-1 rounded-lg bg-gray-100 flex items-center px-3">
                          <span className="text-[10px] text-gray-500 truncate">yourwebsite.com</span>
                        </div>
                      </div>
                      
                      {/* Mock metrics */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">Performance</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-gray-100 overflow-hidden">
                              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#075a01] to-[#0a8f01]" />
                            </div>
                            <span className="text-xs font-bold text-[#075a01]">85</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">SEO Score</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-gray-100 overflow-hidden">
                              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#ff914d] to-[#ff6b1a]" />
                            </div>
                            <span className="text-xs font-bold text-[#ff914d]">72</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">UX Analysis</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-gray-100 overflow-hidden">
                              <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
                            </div>
                            <span className="text-xs font-bold text-gray-900">91</span>
                          </div>
                        </div>
                      </div>

                      {/* Scanning line animation */}
                      <div className="absolute inset-x-6 top-20 h-px bg-gradient-to-r from-transparent via-[#075a01] to-transparent animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex w-full max-w-xs flex-col gap-4">
                    <a
                      href="/tools"
                      className="
                        group/btn relative inline-flex items-center justify-center
                        rounded-xl overflow-hidden
                        bg-gradient-to-r from-[#075a01] to-[#0a8f01]
                        px-8 py-4
                        text-sm font-bold text-white
                        shadow-xl shadow-[#075a01]/25
                        transition-all duration-500
                        hover:-translate-y-1
                        hover:shadow-2xl hover:shadow-[#075a01]/30
                        active:scale-95
                      "
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:translate-x-full" />
                      
                      <span className="relative flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                        View all tools
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </a>

                    <a
                      href="/contact"
                      className="
                        group/btn relative inline-flex items-center justify-center
                        rounded-xl overflow-hidden
                        border-2 border-gray-200 bg-white
                        px-8 py-4
                        text-sm font-bold text-gray-700
                        shadow-sm
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:border-[#ff914d]/30
                        hover:shadow-lg
                        active:scale-95
                      "
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#075a01]/0 via-[#ff914d]/5 to-[#075a01]/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      
                      <span className="relative flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#ff914d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        </svg>
                        Request early access
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-b-[38px]" />
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
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
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes scan {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(80px); }
        }
      `}</style>
    </section>
  );
}