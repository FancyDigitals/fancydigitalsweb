/* =====================================================
   FOOTER — ELEGANT, EYE-CATCHING, PREMIUM
===================================================== */

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    studio: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "Tools", href: "/tools" },
      { label: "About", href: "/about" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    social: [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bashir-ismail-a00498141/" },
  { label: "Instagram", href: "https://instagram.com/fancy_digitals" },
],
  };

  return (
    <footer className="relative overflow-hidden bg-gray-950 pt-24 pb-12 text-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[#075a01]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-5">
            <a href="/" className="group inline-flex items-center gap-3 mb-6">

              {/* Logo */}
              <div className="flex items-center justify-center rounded-xl bg-white p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform group-hover:scale-110">
  <Image
    src="/logo.png"
    alt="Fancy Digitals Logo"
    width={32}
    height={32}
    className="object-contain"
    priority
  />
</div>

              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Digital Studio
              </span>

            </a>

            <p className="max-w-sm text-base leading-relaxed text-gray-400">
              Crafting premium digital experiences that combine intentional design with high-performance engineering.
            </p>

            {/* Newsletter Mini */}
            <div className="mt-8 max-w-sm">
              <p className="text-sm font-semibold mb-3 text-gray-300">Stay updated</p>

              <form className="relative flex">
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#075a01] transition-all"
                />

                <button className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg bg-[#075a01] px-4 text-xs font-bold hover:bg-[#0a8f01] transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Studio</h4>
              <ul className="flex flex-col gap-3">
                {links.studio.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-500 hover:text-[#ff914d] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Social</h4>
              <ul className="flex flex-col gap-3">
                {links.social.map((link) => (
                  <li key={link.label}>
                    <a
  href={link.href}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-gray-500 hover:text-[#0a9001] transition-colors"
>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h4>
              <address className="not-italic flex flex-col gap-3 text-sm text-gray-500">
                <p>info@fancydigitals.com.ng | fancydigitalsng@gmail.com</p>
                <p>Lagos, Nigeria</p>

                <div className="mt-2 inline-flex items-center gap-2 text-[#ff914d] font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff914d] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff914d]"></span>
                  </span>
                  Available for projects
                </div>
              </address>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">

          <p className="text-xs text-gray-600">
            © {currentYear} Digital Studio. All rights reserved.
          </p>

          <ul className="flex items-center gap-6">
            {links.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs text-gray-600 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-700">
            Designed with
            <span className="h-1 w-1 rounded-full bg-[#ff914d] animate-pulse" />
            by Fancy Digitals
          </div>

        </div>
      </div>
    </footer>
  );
}