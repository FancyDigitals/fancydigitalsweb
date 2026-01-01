/* =====================================================
   WAITLIST FORM — MODERN, STATIC, BACKEND-READY
===================================================== */

export default function WaitlistForm({ toolName = "this tool" }) {
  return (
    <section
      aria-labelledby="waitlist-heading"
      className="relative mt-16"
    >
      {/* Ambient accent */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-[240px] w-[240px] rounded-full bg-[#075a01]/15 blur-[120px]" />

      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-black/10 bg-white
          p-8 md:p-10
          shadow-[0_24px_70px_rgba(0,0,0,0.10)]
        "
      >
        {/* Subtle top accent */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01]" />

        {/* Header */}
        <header className="max-w-lg">
          <h3
            id="waitlist-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Get early access
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Join the waitlist to be notified when{" "}
            <span className="font-semibold text-gray-900">
              {toolName}
            </span>{" "}
            is ready for use.
          </p>
        </header>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        {/* Static form */}
        <form
          action="mailto:info@fancydigitals.com.ng"
          method="post"
          encType="text/plain"
          className="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="
                w-full rounded-xl
                border border-black/10
                bg-white
                px-5 py-4
                text-sm text-gray-900
                outline-none
                transition
                focus:border-[#075a01]
                focus:ring-4 focus:ring-[#075a01]/10
              "
            />
          </div>

          <input type="hidden" name="tool" value={toolName} />

          <button
            type="submit"
            className="
              inline-flex shrink-0 items-center justify-center
              rounded-xl
              bg-[#075a01]
              px-8 py-4
              text-sm font-semibold text-white
              shadow-[0_14px_40px_rgba(7,90,1,0.35)]
              transition
              hover:opacity-90
              focus:outline-none
              focus:ring-4 focus:ring-[#075a01]/20
            "
          >
            Join waitlist
          </button>
        </form>

        {/* Helper */}
        <p className="mt-6 max-w-md text-xs leading-relaxed text-gray-500">
          No spam. Early access only. You’ll only hear from us when this tool is ready.
        </p>
      </div>
    </section>
  );
}
