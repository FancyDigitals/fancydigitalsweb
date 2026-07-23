"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronDown,
  Code2,
  Eye,
  FileStack,
  FileText,
  Flame,
  Grid3x3,
  Hash,
  Image as ImageIcon,
  Key,
  Layout,
  Mail,
  Palette,
  Presentation,
  QrCode,
  Receipt,
  Ruler,
  Search,
  Send,
  Share2,
  Sparkles,
  TrendingUp,
  Type,
  Video,
  PlaySquare,
  Zap,
} from "lucide-react";

/* =====================================================
   TOOLS DATA — Grouped by category with icons
===================================================== */
const TOOL_CATEGORIES = [
  {
    label: "AI Tools",
    color: "#075a01",
    accent: "from-[#075a01]/10 to-[#0a8f01]/10",
    icon: Sparkles,
    tools: [
      { label: "AI Social Media Post", href: "/free-ai-social-media-post-generator", icon: Share2, badge: "NEW" },
      { label: "AI Video Generator", href: "/free-ai-video-generator", icon: Video, badge: "AI" },
      { label: "AI Resume Builder", href: "/dashboard/tools/ai-resume-builder", icon: FileText, badge: "AI" },
      { label: "AI Cover Letter", href: "/dashboard/tools/ai-cover-letter", icon: Mail, badge: "AI" },
      { label: "AI Landing Page", href: "/free-ai-landing-page-generator", icon: Layout, badge: "AI" },
      { label: "AI Pitch Deck", href: "/dashboard/tools/ai-pitch-deck", icon: Presentation, badge: "AI" },
      { label: "AI Business Plan", href: "/dashboard/tools/ai-business-plan-generator", icon: BookOpen, badge: "AI" },
      { label: "AI Email Sequence", href: "/dashboard/tools/ai-email-sequence-generator", icon: Send, badge: "AI" },
    ],
  },
  {
    label: "Growth & SEO",
    color: "#0ea5e9",
    accent: "from-sky-500/10 to-blue-500/10",
    icon: TrendingUp,
    tools: [
      { label: "YouTube Auditor", href: "/dashboard/tools/youtube-auditor", icon: PlaySquare, badge: "PRO" },
      { label: "AI Visibility Checker", href: "/free-ai-visibility-checker", icon: Eye, badge: "AI" },
      { label: "Website Audit", href: "/free-website-audit", icon: Search },
      { label: "SEO Meta Generator", href: "/tools/seo-meta-tag-generator", icon: Search },
      { label: "Hashtag Generator", href: "/tools/hashtag-generator", icon: Hash },
    ],
  },
  {
    label: "Business",
    color: "#f97316",
    accent: "from-orange-500/10 to-amber-500/10",
    icon: Briefcase,
    tools: [
      { label: "Invoice Generator", href: "/tools/invoice-generator", icon: Receipt },
      { label: "Document Viewer", href: "/dashboard/tools/document-viewer", icon: FileStack },
      { label: "QR Code Generator", href: "/tools/qr-code-generator", icon: QrCode },
    ],
  },
  {
    label: "Design & Utility",
    color: "#8b5cf6",
    accent: "from-purple-500/10 to-pink-500/10",
    icon: Palette,
    tools: [
      { label: "Color Palette Generator", href: "/tools/color-palette-generator", icon: Palette },
      { label: "Word Counter", href: "/tools/word-counter", icon: Type },
      { label: "Password Generator", href: "/tools/password-generator", icon: Key },
      { label: "Unit Converter", href: "/tools/unit-converter", icon: Ruler },
    ],
  },
];

/* Featured tools — the two right-hand cards */
const FEATURED = {
  newest: {
    label: "AI Social Media Post",
    desc: "One topic. 8 platforms. Seconds.",
    href: "/free-ai-social-media-post-generator",
    tag: "Just Launched",
    icon: Share2,
  },
  popular: {
    label: "AI Video Generator",
    desc: "Cinematic AI videos in 60 seconds.",
    href: "/free-ai-video-generator",
    tag: "Most Popular",
    icon: Video,
  },
};

/* Services data */
const SERVICES = [
  {
    label: "SEO Services",
    desc: "Rank higher on Google in 90 days.",
    href: "/seo-services-nigeria",
    icon: Search,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Web Development",
    desc: "Fast, modern sites that convert.",
    href: "/web-development-nigeria",
    icon: Code2,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Email Marketing",
    desc: "Sequences that drive real revenue.",
    href: "/email-marketing-nigeria",
    icon: Mail,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    label: "Graphics Design",
    desc: "Brand visuals that stop the scroll.",
    href: "/graphics-design-nigeria",
    icon: ImageIcon,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
];

/* Main nav structure */
const NAV = [
  { label: "Services", type: "services" },
  { label: "Tools", type: "tools" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

/* Badge component */
function Badge({ text }) {
  const styles = {
    NEW: "bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white",
    AI: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700",
    PRO: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700",
  };
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wide ${
        styles[text] || "bg-gray-100 text-gray-600"
      }`}
    >
      {text}
    </span>
  );
}

/* =====================================================
   TOOLS MEGA MENU
===================================================== */
function ToolsMegaMenu() {
  return (
    <div className="fixed left-1/2 top-[76px] -translate-x-1/2 mt-2 w-[min(1100px,calc(100vw-2rem))] rounded-3xl border border-gray-100 bg-white shadow-[0_20px_80px_rgba(7,90,1,0.15)] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 overflow-hidden z-50">
      {/* Top gradient accent */}
      <div className="h-1 bg-gradient-to-r from-[#075a01] via-[#0a8f01] to-[#ff914d]" />

      <div className="grid grid-cols-12 gap-0">
        {/* LEFT — 4 category columns */}
        <div className="col-span-9 grid grid-cols-4 gap-0 p-6">
          {TOOL_CATEGORIES.map((cat, i) => {
            const CatIcon = cat.icon || Sparkles;
            return (
              <div
                key={i}
                className="group/col relative px-3 py-2 rounded-2xl transition-all hover:bg-gray-50/50"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${cat.accent}`}
                  >
                    <CatIcon
                      className="h-3.5 w-3.5"
                      style={{ color: cat.color }}
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {cat.label}
                  </span>
                </div>

                {/* Tools list */}
                <div className="space-y-0.5">
                  {cat.tools.map((tool, j) => {
  const ToolIcon = tool.icon || Sparkles;
  return (
    <Link
      key={j}
      href={tool.href}
      className="group/item flex items-center justify-between gap-2 px-2 py-2 rounded-lg transition-all hover:bg-white hover:shadow-sm"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <ToolIcon className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 group-hover/item:text-[#075a01] transition-colors" />
        <span className="text-[13px] font-medium text-gray-700 group-hover/item:text-gray-900 truncate">
          {tool.label}
        </span>
      </div>
      {tool.badge && <Badge text={tool.badge} />}
    </Link>
  );
})}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — Featured cards */}
        <div className="col-span-3 bg-gradient-to-br from-gray-50 to-white p-5 border-l border-gray-100 flex flex-col gap-3">
          {/* NEWEST card */}
          <Link
            href={FEATURED.newest.href}
            className="group/feat relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-4 text-white shadow-[0_8px_30px_rgba(7,90,1,0.25)] transition-all hover:shadow-[0_12px_40px_rgba(7,90,1,0.4)] hover:-translate-y-0.5"
          >
            {/* Decorative shine */}
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/feat:translate-x-full" />

            <div className="relative">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                  {FEATURED.newest.tag}
                </span>
              </div>
              <div className="flex items-start justify-between mb-1">
                <FEATURED.newest.icon className="h-6 w-6" />
                <ArrowRight className="h-4 w-4 opacity-60 group-hover/feat:opacity-100 group-hover/feat:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-black mt-2 leading-tight">
                {FEATURED.newest.label}
              </h4>
              <p className="text-[11px] text-white/80 mt-1 leading-relaxed">
                {FEATURED.newest.desc}
              </p>
            </div>
          </Link>

          {/* POPULAR card */}
          <Link
            href={FEATURED.popular.href}
            className="group/feat relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-4 transition-all hover:border-[#075a01]/30 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Flame className="h-3 w-3 text-orange-500" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-orange-600">
                {FEATURED.popular.tag}
              </span>
            </div>
            <div className="flex items-start justify-between mb-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#0a8f01]/10">
                <FEATURED.popular.icon className="h-4 w-4 text-[#075a01]" />
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover/feat:text-[#075a01] group-hover/feat:translate-x-1 transition-all" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 mt-2 leading-tight">
              {FEATURED.popular.label}
            </h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              {FEATURED.popular.desc}
            </p>
          </Link>

          {/* Browse all */}
          <Link
            href="/tools"
            className="group/all mt-auto flex items-center justify-between gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-white transition-all hover:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <Grid3x3 className="h-4 w-4" />
              <span className="text-xs font-bold">Browse All Tools</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/all:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   SERVICES MEGA MENU
===================================================== */
function ServicesMegaMenu() {
  return (
    <div className="fixed left-1/2 top-[76px] -translate-x-1/2 mt-2 w-[min(700px,calc(100vw-2rem))] rounded-3xl border border-gray-100 bg-white shadow-[0_20px_80px_rgba(7,90,1,0.15)] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 overflow-hidden z-50">
      <div className="h-1 bg-gradient-to-r from-[#ff914d] via-[#0a8f01] to-[#075a01]" />

      <div className="p-6">
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
            Our Services
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map((svc, i) => {
            const SvcIcon = svc.icon || Sparkles;
            return (
              <Link
                key={i}
                href={svc.href}
                className="group/svc flex items-start gap-3 rounded-2xl border border-gray-100 p-4 transition-all hover:border-[#075a01]/20 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${svc.bg} transition-transform group-hover/svc:scale-110`}
                >
                  <SvcIcon className={`h-5 w-5 ${svc.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-gray-900 group-hover/svc:text-[#075a01] transition-colors">
                      {svc.label}
                    </h4>
                    <ArrowRight className="h-3 w-3 text-gray-300 opacity-0 group-hover/svc:opacity-100 group-hover/svc:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA card */}
        <Link
          href="/contact"
          className="group/cta mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] p-4 text-white transition-all hover:shadow-lg"
        >
          <div>
            <p className="text-sm font-bold">Need a custom solution?</p>
            <p className="text-xs text-white/80 mt-0.5">
              Let's discuss your project — free consultation.
            </p>
          </div>
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover/cta:scale-110">
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}

/* =====================================================
   MAIN HEADER
===================================================== */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileGroup = (label) => {
    setExpandedMobile(expandedMobile === label ? null : label);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/* Main bar */}
      <div
        className={`relative transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 shadow-[0_4px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01]" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          {/* LOGO */}
          <a href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl border-2 border-dashed border-[#075a01]/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-180" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#075a01]/20 to-[#ff914d]/20 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shadow-[0_8px_30px_rgba(7,90,1,0.3)] transition-all duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Fancy Digitals Logo"
                  className="h-7 w-auto brightness-0 invert"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>

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
            {NAV.map((item, i) => (
  <div key={i} className="relative group pb-2 -mb-2">
                {item.href ? (
                  <a
                    href={item.href}
                    className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-[#075a01] transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-[#075a01] transition-colors cursor-pointer">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                )}

                {item.type === "tools" && <ToolsMegaMenu />}
                {item.type === "services" && <ServicesMegaMenu />}
              </div>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 lg:flex">
            <AuthButton />

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

            <a
              href="/contact"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(7,90,1,0.25)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(7,90,1,0.35)] hover:scale-[1.02]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#ff914d] blur-lg" />
            </a>
          </div>

          {/* MOBILE BUTTON */}
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
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[90%] max-w-md transform bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out overflow-y-auto overscroll-contain ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-[#075a01]/5 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-gray-100 px-6 py-5 sticky top-0 bg-white/95 backdrop-blur-xl z-10">
            <div>
              <p className="text-lg font-bold text-gray-900">Menu</p>
              <div className="mt-1 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-gray-100 transition-all duration-300 hover:border-red-200 hover:bg-red-50"
            >
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="relative px-4 py-6">
            {/* Simple nav links */}
            <nav className="space-y-1 mb-6">
              {NAV.filter((n) => n.href).map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-base font-semibold text-gray-700 rounded-xl hover:bg-gray-50 hover:text-[#075a01] transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* SERVICES accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleMobileGroup("services")}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-900 rounded-xl hover:bg-gray-50 transition-all"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expandedMobile === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedMobile === "services" && (
                <div className="mt-2 space-y-1 pl-2">
                  {SERVICES.map((svc, i) => {
                    const SvcIcon = svc.icon || Sparkles;
                    return (
                      <Link
                        key={i}
                        href={svc.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all"
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${svc.bg}`}
                        >
                          <SvcIcon className={`h-4 w-4 ${svc.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">
                            {svc.label}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            {svc.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TOOLS grouped */}
            <div className="mb-6">
              <button
                onClick={() => toggleMobileGroup("tools")}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-900 rounded-xl hover:bg-gray-50 transition-all"
              >
                <span>Tools</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expandedMobile === "tools" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedMobile === "tools" && (
                <div className="mt-2 space-y-4">
                  {TOOL_CATEGORIES.map((cat, i) => {
                    const CatIcon = cat.icon || Sparkles;
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center gap-2 px-3 pb-1">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${cat.accent}`}
                          >
                            <CatIcon
                              className="h-3 w-3"
                              style={{ color: cat.color }}
                            />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            {cat.label}
                          </span>
                        </div>
                        {cat.tools.map((tool, j) => {
                          const ToolIcon = tool.icon || Sparkles;
                          return (
                            <Link
                              key={j}
                              href={tool.href}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all"
                            >
                              <div className="flex items-center gap-2.5">
                                <ToolIcon className="h-3.5 w-3.5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">
                                  {tool.label}
                                </span>
                              </div>
                              {tool.badge && <Badge text={tool.badge} />}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}
                  <Link
                    href="/tools"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between mt-4 rounded-xl bg-gray-900 px-4 py-3 text-white"
                  >
                    <span className="text-sm font-bold">Browse All Tools</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Contact
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {/* Contact buttons */}
            <div className="space-y-3">
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-center gap-3 rounded-xl border-2 border-gray-100 bg-white px-4 py-4 transition-all duration-300 hover:border-[#075a01]/30 hover:bg-green-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075a01] text-white shadow-lg shadow-[#075a01]/30">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-[#075a01]">
                  Sign In / Dashboard
                </span>
              </Link>

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
                <span className="font-semibold text-gray-700 group-hover:text-green-700">
                  Chat on WhatsApp
                </span>
              </a>

              <a
                href="tel:+2349045547761"
                className="group flex items-center justify-center gap-3 rounded-xl border-2 border-gray-100 bg-white px-4 py-4 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff914d] text-white shadow-lg shadow-[#ff914d]/30">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-[#ff914d]">
                  Call Us Directly
                </span>
              </a>

              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-4 py-5 font-bold text-white shadow-[0_8px_30px_rgba(7,90,1,0.3)]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative">Start a Project</span>
                <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#ff914d] blur-xl" />
              </a>
            </div>

            {/* Bottom brand card */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-5 ring-1 ring-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Fancy Digitals
                  </p>
                  <p className="text-xs text-gray-500">Premium Digital Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}