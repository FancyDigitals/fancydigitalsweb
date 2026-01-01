/* =====================================================
   CONTACT SECTION — PURE STATIC, ADVANCED, ACCESSIBLE
===================================================== */

export default function ContactSection({
  eyebrow,
  title,
  highlight,
  description,
  actions = [],
  trustNote,
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative mx-auto w-full max-w-6xl px-5 py-28 md:px-10"
    >
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-8 py-16 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:px-14">
        {/* Accent line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] to-[#ff914d]" />

        <div className="max-w-2xl">
          {/* Eyebrow */}
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              {eyebrow}
            </p>
          )}

          {/* Title */}
          <h2
            id="contact-heading"
            className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
          >
            {title}{" "}
            {highlight && (
              <span className="text-[#075a01]">{highlight}</span>
            )}
          </h2>

          {/* Description */}
          {description && (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              {actions.map((action) => {
                const isPrimary = action.variant === "primary";

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={
                      isPrimary
                        ? "inline-flex items-center justify-center rounded-xl bg-[#075a01] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075a01]"
                        : "inline-flex items-center justify-center rounded-xl border border-black/15 px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                    }
                  >
                    {action.label}
                  </a>
                );
              })}
            </div>
          )}

          {/* Trust note */}
          {trustNote && (
            <p className="mt-8 max-w-lg text-xs leading-relaxed text-gray-500">
              {trustNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
