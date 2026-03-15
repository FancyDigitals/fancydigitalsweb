/* =====================================================
   FINAL CTA — BRIGHT, PREMIUM, CONVERSION-FOCUSED
===================================================== */

export default function FinalCTA({
  title,
  description,
  primaryAction = {
    label: "Start a Project",
    href: "/contact",
  },
  secondaryAction = {
    label: "Chat on WhatsApp",
    href: "https://wa.me/2340000000000",
  },
  eyebrow = "Ready?",
}) {
  if (!title) return null;

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/5 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-[#075a01]/3 blur-[80px]" />

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

      <div className="relative mx-auto max-w-6xl px-5 md:px-10 py-24 md:py-32">
        {/* Main CTA Card */}
        <div className="group relative">
          {/* Outer glow */}
          <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-r from-[#075a01]/20 via-[#ff914d]/15 to-[#075a01]/20 opacity-60 blur-3xl" />

          {/* Card container with gradient border effect */}
          <div className="relative overflow-hidden rounded-[40px] border-2 border-gray-100 bg-white shadow-2xl transition-all duration-500 hover:border-transparent hover:shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#075a01] via-[#ff914d] to-[#075a01] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-[2px] rounded-[38px] bg-white" />

            <div className="relative px-8 py-16 md:px-16 md:py-20 lg:py-24">
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

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center gap-10 lg:gap-12">

                {/* Title */}
                <h2
                  id="final-cta-heading"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1]"
                >
                  <span className="block text-gray-900">
                    {title.split(" ").slice(0, -1).join(" ")}{" "}
                  </span>
                  <span className="relative mt-2 inline-block">
                    <span className="bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01] bg-clip-text text-transparent">
                      {title.split(" ").slice(-1)}
                    </span>
                    <svg
                      className="absolute -bottom-3 left-1/2 w-full max-w-[280px] -translate-x-1/2"
                      viewBox="0 0 200 12"
                      fill="none"
                    >
                      <path
                        d="M2 10C50 4 150 4 198 10"
                        stroke="url(#cta-underline)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="cta-underline"
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
                {description && (
                  <p className="max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-gray-600">
                    {description}
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-5 mt-4">
                  {primaryAction?.href && (
                    <a
                      href={primaryAction.href}
                      className="
                        group/btn relative inline-flex items-center justify-center
                        rounded-2xl overflow-hidden
                        bg-gradient-to-r from-[#075a01] to-[#0a8f01]
                        px-10 py-5 md:px-12 md:py-6
                        text-base md:text-lg font-bold text-white
                        shadow-xl shadow-[#075a01]/25
                        transition-all duration-500
                        hover:-translate-y-1
                        hover:shadow-2xl hover:shadow-[#075a01]/30
                        active:scale-95
                      "
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover/btn:translate-x-full" />

                      <span className="relative flex items-center gap-3">
                        {primaryAction.label}
                        <svg
                          className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2"
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
                      </span>
                    </a>
                  )}

                  {secondaryAction?.href && (
                    <a
                      href={secondaryAction.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group/btn relative inline-flex items-center justify-center
                        rounded-2xl overflow-hidden
                        border-2 border-gray-200 bg-white
                        px-10 py-5 md:px-12 md:py-6
                        text-base md:text-lg font-bold text-gray-700
                        shadow-sm
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:border-[#25D366]/30
                        hover:shadow-lg
                        active:scale-95
                      "
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/5 to-[#25D366]/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                      <span className="relative flex items-center gap-3">
                        {/* WhatsApp icon */}
                        <svg
                          className="w-5 h-5 text-[#25D366] transition-transform group-hover/btn:scale-110"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {secondaryAction.label}
                      </span>
                    </a>
                  )}
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#075a01]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Secure & Confidential
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#ff914d]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Response within 24h
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#075a01]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Free Consultation
                    </span>
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
    </section>
  );
}