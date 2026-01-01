/* =====================================================
   HEADER — PREMIUM, STATIC, AGENCY-LEVEL
===================================================== */

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Glass + brand gradient layer */}
      <div className="relative border-b border-black/10 bg-white/70 backdrop-blur-xl">
        {/* Subtle brand glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 -left-24 h-[260px] w-[260px] rounded-full bg-[#075a01]/20 blur-[120px]" />
          <div className="absolute -top-24 right-0 h-[300px] w-[300px] rounded-full bg-[#ff914d]/20 blur-[140px]" />
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-10">
          {/* BRAND */}
          <a href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#075a01] to-[#ff914d] opacity-30 blur-sm transition group-hover:opacity-60" />
              <img
                src="/logo.png"
                alt="Fancy Digitals Logo"
                className="relative h-9 w-auto"
              />
            </div>

            <div className="leading-tight">
              <span className="block text-sm font-extrabold tracking-[-0.04em] text-gray-900">
                Fancy Digitals
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-500">
                SOLUTION
              </span>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-10 text-sm font-semibold text-gray-700 md:flex"
          >
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative transition hover:text-black"
              >
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-[#075a01] to-[#ff914d] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://wa.me/2349034360785"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              WhatsApp
            </a>

            <a
              href="tel:+2349045547761"
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Call
            </a>

            <a
              href="/contact"
              className="rounded-xl bg-gradient-to-r from-[#075a01] to-[#ff914d] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:opacity-95"
            >
              Start a Project
            </a>
          </div>

          {/* MOBILE MENU — STATIC */}
          <details className="relative md:hidden">
            <summary
              aria-label="Open menu"
              className="cursor-pointer list-none rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-900"
            >
              Menu
            </summary>

            {/* Backdrop */}
            <div className="fixed inset-0 z-40 bg-black/50" />

            {/* Drawer */}
            <div className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm bg-white shadow-2xl">
              <div className="border-b border-black/10 px-5 py-4">
                <p className="text-sm font-semibold text-gray-800">
                  Fancy Digitals
                </p>
                <p className="text-xs text-gray-500">
                  Premium digital studio
                </p>
              </div>

              <div className="px-5 py-6">
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-3 text-sm font-semibold text-gray-800"
                >
                  {NAV.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="rounded-xl border border-black/10 px-4 py-3 transition hover:bg-gray-50"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href="https://wa.me/2349034360785"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-black/10 px-4 py-3 text-center text-sm font-semibold"
                  >
                    WhatsApp
                  </a>

                  <a
                    href="tel:+2349045547761"
                    className="rounded-xl border border-black/10 px-4 py-3 text-center text-sm font-semibold"
                  >
                    Call
                  </a>

                  <a
                    href="/contact"
                    className="rounded-xl bg-gradient-to-r from-[#075a01] to-[#ff914d] px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Start a Project
                  </a>
                </div>

                <p className="mt-10 text-xs text-gray-500">
                  Calm systems • Premium execution • Long-term thinking
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
