/* =====================================================
   EMAIL CAPTURE — PURE STATIC, PREMIUM, FUTURE-READY
===================================================== */

export default function EmailCapture({
  title = "Get early access",
  subtitle = "Join the waitlist to be notified when this tool launches.",
  action = "mailto:info@fancydigitals.com",
  submitLabel = "Join waitlist",
  trustNote = "No spam. One email when the tool is ready.",
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:px-12">
      {/* Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] to-[#ff914d]" />

      {/* Content */}
      <div className="max-w-xl">
        <h3 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {subtitle}
        </p>

        {/* Static form */}
        <form
          action={action}
          method="POST"
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <label className="sr-only" htmlFor="email">
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1 rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-[#075a01]"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-[#075a01] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075a01]"
          >
            {submitLabel}
          </button>
        </form>

        {/* Trust note */}
        {trustNote && (
          <p className="mt-5 text-xs leading-relaxed text-gray-500">
            {trustNote}
          </p>
        )}
      </div>
    </div>
  );
}
