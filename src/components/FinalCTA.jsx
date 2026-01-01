/* =====================================================
   FINAL CTA — PURE STATIC, FLAGSHIP CONVERSION SECTION
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
      className="relative mx-auto w-full max-w-6xl px-5 py-28 md:px-10"
    >
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#075a01] px-8 py-16 text-white shadow-[0_28px_70px_rgba(0,0,0,0.25)] md:px-14">
        {/* Subtle ambient accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 -right-24 h-72 w-72 rounded-full bg-black/10 blur-[140px]" />

        <div className="relative z-10 flex flex-col gap-14 md:flex-row md:items-center md:justify-between">
          {/* TEXT BLOCK */}
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                {eyebrow}
              </p>
            )}

            <h2
              id="final-cta-heading"
              className="text-3xl font-semibold tracking-tight md:text-4xl"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85">
                {description}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex w-full max-w-sm flex-col gap-4">
            {primaryAction?.href && (
              <a
                href={primaryAction.href}
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#075a01] transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {primaryAction.label}
              </a>
            )}

            {secondaryAction?.href && (
              <a
                href={secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {secondaryAction.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
