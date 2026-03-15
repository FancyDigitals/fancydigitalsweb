"use client";

import { useEffect, useState } from "react";

/* =====================================================
   HEADER — BRIGHT, CREATIVE, PREMIUM
===================================================== */

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/* Main header bar */}
      <div
        className={`relative transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 shadow-[0_4px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        {/* Decorative top gradient line */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01]" />

        {/* Animated background shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#075a01]/5 blur-3xl" />
          <div className="absolute -right-20 -top-10 h-32 w-32 rounded-full bg-[#ff914d]/5 blur-3xl" />
          {/* Floating dots pattern */}
          <div className="absolute right-[20%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#075a01]/20" />
          <div className="absolute right-[22%] top-1/3 h-1 w-1 rounded-full bg-[#ff914d]/30" />
          <div className="absolute left-[15%] top-2/3 h-1 w-1 rounded-full bg-[#075a01]/20" />
        </div>

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          {/* LOGO / BRAND */}
          <a href="/" className="group flex items-center gap-3">
            {/* Creative logo container */}
            <div className="relative">
              {/* Animated ring */}
              <div className="absolute -inset-2 rounded-2xl border-2 border-dashed border-[#075a01]/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-180" />
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#075a01]/20 to-[#ff914d]/20 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
              {/* Logo box */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shadow-[0_8px_30px_rgba(7,90,1,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_12px_40px_rgba(7,90,1,0.4)]">
                <img
                  src="/logo.png"
                  alt="Fancy Digitals Logo"
                  className="h-7 w-auto brightness-0 invert"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>

            {/* Brand text */}
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-gray-900 transition-colors group-hover:text-[#075a01]">
                Fancy Digitals
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                <span className="h-1 w-1 rounded-full bg-[#ff914d]" />
                Digital Studio
              </span>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-[#075a01]"
              >
                <span className="relative z-10">{item.label}</span>
                {/* Hover background */}
                <div className="absolute inset-0 scale-90 rounded-xl bg-[#075a01]/5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                {/* Active indicator */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#075a01] to-[#ff914d] transition-all duration-300 group-hover:w-6" />
                {/* Floating dot on hover */}
                <div className="absolute -right-1 top-1 h-1.5 w-1.5 scale-0 rounded-full bg-[#ff914d] transition-transform duration-300 group-hover:scale-100" />
              </a>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* WhatsApp */}
            <a
              href="https://wa.me/2349034360785"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-green-200 hover:bg-green-50 hover:text-green-700 hover:shadow-md"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white transition-transform duration-300 group-hover:scale-110">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Call */}
            <a
              href="tel:+2349045547761"
              className="group flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-[#ff914d]/30 hover:bg-orange-50 hover:text-[#ff914d] hover:shadow-md"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff914d] text-white transition-transform duration-300 group-hover:scale-110">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="hidden xl:inline">Call Us</span>
            </a>

            {/* Main CTA */}
            <a
              href="/contact"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(7,90,1,0.25)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(7,90,1,0.35)] hover:scale-[1.02]"
            >
              {/* Animated shine */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {/* Floating particles */}
              <div className="absolute right-2 top-2 h-1 w-1 rounded-full bg-white/40 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-2 right-4 h-0.5 w-0.5 rounded-full bg-white/30 opacity-0 transition-all duration-500 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                Start a Project
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              {/* Orange accent corner */}
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#ff914d] blur-lg" />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-[#075a01]/20 hover:shadow-md lg:hidden"
          >
            <div className="relative flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 rounded-full bg-gray-700 transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-4 opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </div>
            {/* Pulse ring on menu open */}
            {menuOpen && (
              <div className="absolute inset-0 animate-ping rounded-xl border-2 border-[#075a01]/30" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm transform bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Decorative header gradient */}
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-[#075a01]/5 to-transparent" />

          {/* Floating decorative shapes */}
          <div className="pointer-events-none absolute right-8 top-20 h-20 w-20 rounded-full border-2 border-dashed border-[#075a01]/10" />
          <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 rounded-full bg-[#ff914d]/5 blur-3xl" />

          {/* Close button & header */}
          <div className="relative flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <p className="text-lg font-bold text-gray-900">Menu</p>
              <div className="mt-1 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-gray-100 transition-all duration-300 hover:border-red-200 hover:bg-red-50"
            >
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="relative px-4 py-6">
            <nav className="space-y-1">
              {NAV.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-4 py-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#075a01]/5 hover:to-transparent"
                  style={{
                    transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 transition-all duration-300 group-hover:from-[#075a01]/10 group-hover:to-[#ff914d]/10">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#075a01]/40 transition-all duration-300 group-hover:bg-[#075a01]" />
                    </div>
                    <span className="text-base font-semibold text-gray-700 transition-colors group-hover:text-[#075a01]">
                      {item.label}
                    </span>
                  </div>
                  <svg className="h-4 w-4 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#075a01]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {/* Contact buttons */}
            <div className="space-y-3">
              <a
                href="https://wa.me/2349034360785"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-xl border-2 border-gray-100 bg-white px-4 py-4 transition-all duration-300 hover:border-green-200 hover:bg-green-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-green-700">Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+2349045547761"
                className="group flex items-center justify-center gap-3 rounded-xl border-2 border-gray-100 bg-white px-4 py-4 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff914d] text-white shadow-lg shadow-[#ff914d]/30">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-[#ff914d]">Call Us Directly</span>
              </a>

              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-4 py-5 font-bold text-white shadow-[0_8px_30px_rgba(7,90,1,0.3)]"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative">Start a Project</span>
                <svg className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                {/* Corner accent */}
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#ff914d] blur-xl" />
              </a>
            </div>

            {/* Bottom info card */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-5 ring-1 ring-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Fancy Digitals</p>
                  <p className="text-xs text-gray-500">Premium Digital Studio</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#075a01]/10 px-3 py-1 text-[10px] font-semibold text-[#075a01]">
                  ✦ Calm Systems
                </span>
                <span className="rounded-full bg-[#ff914d]/10 px-3 py-1 text-[10px] font-semibold text-[#ff914d]">
                  ✦ Premium Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}