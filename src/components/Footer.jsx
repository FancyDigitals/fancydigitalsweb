export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white border-t border-black/5">
      {/* Subtle brand glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#ff914d]/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-10">
        {/* Top section */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold tracking-tight text-gray-900">
              Fancy Digitals
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
              A premium digital studio focused on clarity, structure, and
              long-term digital systems that scale with your business.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Navigation
            </p>

            <ul className="mt-4 space-y-3 text-sm font-medium">
              <li>
                <a
                  href="/about"
                  className="text-gray-700 transition hover:text-[#075a01]"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-700 transition hover:text-[#075a01]"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  className="text-gray-700 transition hover:text-[#075a01]"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="/tools"
                  className="text-gray-700 transition hover:text-[#075a01]"
                >
                  Tools
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-700 transition hover:text-[#075a01]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Call to action */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold text-gray-900">
              Start something meaningful
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              If you value intentional design, modern systems, and long-term
              thinking, let’s build something together.
            </p>

            <a
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#075a01] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start a project
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-black/5" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Fancy Digitals. All rights reserved.
          </p>

          <p className="text-xs font-medium text-gray-500">
            Designed & built with clarity and intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
