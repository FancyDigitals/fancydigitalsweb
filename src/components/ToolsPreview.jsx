/* =====================================================
   TOOLS PREVIEW — ELEGANT, EYE-CATCHING, PREMIUM
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
      statusColor: "from-[#ff914d] to-[#ff6b1a]",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      gradient: "from-[#ff914d] to-[#ff6b1a]",
      delay: "0s",
    },
    {
      slug: "brand-identity-builder",
      title: "Brand Identity Builder",
      description:
        "Design a clean, consistent brand system — colors, typography, and visual direction.",
      status: "In development",
      statusColor: "from-[#075a01] to-[#0a8f01]",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
      gradient: "from-[#075a01] to-[#0a8f01]",
      delay: "0.1s",
    },
    {
      slug: "seo-content-planner",
      title: "SEO Content Planner",
      description:
        "Plan SEO-ready content around keyword intent and long-term ranking opportunities.",
      status: "Coming soon",
      statusColor: "from-[#ff914d] to-[#ff6b1a]",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      gradient: "from-[#075a01] via-[#0a8f01] to-[#ff914d]",
      delay: "0.2s",
    },
    {
      slug: "email-funnel-generator",
      title: "Email Funnel Generator",
      description:
        "Create structured email sequences that move leads from interest to conversion.",
      status: "Planned",
      statusColor: "from-gray-500 to-gray-400",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      gradient: "from-[#ff914d] to-[#075a01]",
      delay: "0.3s",
    },
  ];

  const visibleTools = tools.slice(0, maxItems);

  if (!visibleTools.length) return null;

  return (
    <section
      aria-labelledby="tools-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-gray-950 to-[#0a0a0a] py-32 md:py-40"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#ff914d]/15 blur-[180px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#075a01]/20 blur-[160px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 h-[400px] w-[300px] rounded-full bg-[#075a01]/10 blur-[120px]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute top-24 right-[12%] h-3 w-3 rounded-full bg-[#ff914d]/30 animate-[float_6s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/3 left-[8%] h-2 w-2 rounded-full bg-[#075a01]/40 animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="pointer-events-none absolute bottom-32 right-[18%] h-2.5 w-2.5 rounded-full bg-white/10 animate-[float_7s_ease-in-out_infinite_2s]" />
      <div className="pointer-events-none absolute top-2/3 left-[20%] h-2 w-2 rounded-full bg-[#ff914d]/25 animate-[float_9s_ease-in-out_infinite_0.5s]" />

      {/* Grid pattern overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.015]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      {/* Diagonal lines accent */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.02]">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] [background-image:repeating-linear-gradient(45deg,transparent,transparent_100px,rgba(255,255,255,0.5)_100px,rgba(255,255,255,0.5)_101px)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-10">
        {/* HEADER */}
        <header className="mb-16 md:mb-20 max-w-3xl animate-[fadeUp_1s_ease-out]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-8 border border-white/10 shadow-[0_0_30px_rgba(255,145,77,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff914d] opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-[#ff914d] to-[#ff6b1a]"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Tools
            </span>
          </div>

          <h2
            id="tools-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
            </span>
            <span className="bg-gradient-to-r from-[#ff914d] via-[#0a9001] to-[#ff914d] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_6s_ease-in-out_infinite]">
              {title.split(" ").slice(-1)}
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-400 max-w-2xl">
            Focused, practical tools designed to help founders, creators, and teams
            make better decisions and scale with confidence.
          </p>
        </header>

        {/* GRID */}
        <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTools.map((tool, index) => (
            <li
              key={tool.slug}
              className="group animate-[fadeUp_1s_ease-out_both]"
              style={{ animationDelay: tool.delay }}
            >
              <div
                className="
                  relative h-full rounded-3xl
                  bg-gradient-to-br from-white/[0.06] to-white/[0.02]
                  backdrop-blur-xl
                  border border-white/[0.06]
                  p-8
                  shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]
                  transition-all duration-700 ease-out
                  hover:-translate-y-3
                  hover:shadow-[0_40px_80px_rgba(0,0,0,0.4),0_0_50px_rgba(255,145,77,0.1),inset_0_1px_0_rgba(255,255,255,0.12)]
                  hover:border-white/[0.12]
                  overflow-hidden
                "
              >
                {/* Gradient glow on hover */}
                <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${tool.gradient} opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-15`} />
                
                {/* Corner accents */}
                <div className="pointer-events-none absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-tr-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tr from-white/[0.02] to-transparent rounded-bl-3xl" />

                {/* Icon */}
                <div
                  className={`
                    relative mb-6 inline-flex h-14 w-14 items-center justify-center
                    rounded-2xl bg-gradient-to-br ${tool.gradient}
                    text-white
                    shadow-[0_8px_30px_rgba(255,145,77,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]
                    transition-all duration-500
                    group-hover:scale-110
                    group-hover:shadow-[0_12px_40px_rgba(255,145,77,0.35),inset_0_1px_0_rgba(255,255,255,0.3)]
                  `}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 rounded-2xl overflow-hidden" />
                  {tool.icon}
                </div>

                {/* STATUS */}
                {tool.status && (
                  <div className="mb-4">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 rounded-full
                        bg-gradient-to-r ${tool.statusColor}
                        px-3 py-1.5
                        text-[10px] font-bold uppercase tracking-wider text-white
                        shadow-[0_4px_15px_rgba(0,0,0,0.2)]
                      `}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
                      </span>
                      {tool.status}
                    </span>
                  </div>
                )}

                {/* Index watermark */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="relative mb-3 text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors duration-300">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {tool.description}
                </p>

                {/* View tool link */}
                <a
                  href={`/tools/${tool.slug}`}
                  className="
                    relative mt-6 inline-flex items-center gap-2
                    text-sm font-semibold text-[#ff914d]
                    transition-all duration-300
                    group-hover:text-[#ffab70]
                  "
                >
                  <span>View tool</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>

                {/* Bottom accent line */}
                <div
                  className={`
                    absolute bottom-0 left-0 right-0 h-1
                    bg-gradient-to-r ${tool.gradient}
                    opacity-0 transition-all duration-500
                    group-hover:opacity-100
                    rounded-b-3xl
                  `}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-16 md:mt-20 flex justify-center animate-[fadeUp_1s_ease-out_0.4s_both]">
          <a
            href="/contact"
            className="
              group relative inline-flex items-center justify-center
              rounded-2xl
              px-10 py-5
              text-base font-bold text-white
              overflow-hidden
              transition-all duration-500
              hover:scale-105
              active:scale-95
            "
          >
            {/* Animated gradient border */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#ff914d] via-[#075a01] to-[#ff914d] bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
            
            {/* Inner background */}
            <div className="absolute inset-[2px] rounded-[14px] bg-gray-950 transition-colors duration-300 group-hover:bg-gray-900" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(255,145,77,0.4)]" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
            
            <span className="relative flex items-center gap-3">
              <svg className="w-5 h-5 text-[#ff914d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              Get early access to tools
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#ff914d] to-[#075a01] animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.4; }
          50% { transform: translateY(-25px) rotate(180deg) scale(1.1); opacity: 0.7; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}