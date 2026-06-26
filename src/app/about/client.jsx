"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Globe,
  PenTool,
  Wrench,
  ShieldCheck,
  Zap,
  Code2,
  Search,
  Palette,
  Target,
  Layers,
  MessageCircle,
  Mail,
  Building2,
  Sparkles,
  QrCode,
  Lock,
  Receipt,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "10+", label: "Years Building" },
  { value: "3", label: "Companies Founded" },
  { value: "20+", label: "Products Built" },
  { value: "15+", label: "Certifications" },
  { value: "50+", label: "Projects Delivered" },
];

const companies = [
  {
    name: "Fancy Digitals",
    tag: "AI SaaS & Digital Agency",
    description:
      "An AI-powered SaaS platform and digital agency building tools that help founders, businesses, and creators grow online — from AI-generated landing pages and resumes to full web systems.",
    href: "https://fancydigitals.com.ng",
    accent: "#075a01",
    logo: "/images/fancy-logo.png",
  },
  {
    name: "SafetyGrid",
    tag: "Public Safety Technology",
    description:
      "A community-powered public safety platform using location intelligence, emergency communication, and crowd-sourced reporting to make communities safer across Africa and beyond.",
    href: "https://safetygrid.app",
    accent: "#1d4ed8",
    logo: "/images/safetygrid-logo.png",
  },
  {
    name: "BeVibesHub",
    tag: "Digital Publishing",
    description:
      "An independent digital publishing platform delivering informative content across technology, business, education, lifestyle, entertainment, and global trends.",
    href: "https://bevibeshub.com.ng",
    accent: "#ff914d",
    logo: "/images/bevibeshub-logo.png",
  },
];

const expertise = [
  "AI Engineering",
  "Software Development",
  "Frontend Engineering",
  "SEO Strategy",
  "Product Design",
  "Brand Strategy",
  "Automation",
  "Email Marketing",
  "Content Systems",
  "Digital Publishing",
  "SaaS Architecture",
  "System Design",
];

const products = [
  { name: "SafetyGrid", desc: "Public safety platform", Icon: ShieldCheck, color: "#1d4ed8" },
  { name: "AI Resume Builder", desc: "ATS-optimized resumes", href: "/free-ai-resume-builder", Icon: FileText, color: "#075a01" },
  { name: "AI Landing Page Generator", desc: "Full pages in 60 seconds", href: "/free-ai-landing-page-generator", Icon: Globe, color: "#0a8f01" },
  { name: "AI Cover Letter", desc: "Tailored cover letters", href: "/free-ai-cover-letter", Icon: PenTool, color: "#ff914d" },
  { name: "QR Code Generator", desc: "Free QR tool", href: "/tools/qr-code-generator", Icon: QrCode, color: "#075a01" },
  { name: "Password Generator", desc: "Secure passwords", href: "/tools/password-generator", Icon: Lock, color: "#7c3aed" },
  { name: "Invoice Generator", desc: "Professional invoices", href: "/tools/invoice-generator", Icon: Receipt, color: "#0369a1" },
];

const timeline = [
  { year: "2014", title: "Started Building", desc: "Self-taught web design and development from scratch." },
  { year: "2022", title: "Founded Fancy Digitals", desc: "Launched the digital agency to serve founders and brands." },
  { year: "2023", title: "Launched BeVibesHub", desc: "Built an independent digital publishing platform." },
  { year: "2024", title: "Started SafetyGrid", desc: "Began building public safety technology for communities." },
  { year: "2024", title: "Built AI Tool Suite", desc: "Shipped AI Resume Builder, Cover Letter, and Landing Page Generator." },
  { year: "Now", title: "Current Mission", desc: "Building globally respected technology companies from Africa." },
];

const recognition = [
  { name: "Google", desc: "Search presence & indexing", Icon: Search, live: true },
  { name: "LinkedIn", desc: "Professional network", Icon: Building2, live: true },
  { name: "GitHub", desc: "Open source presence", Icon: Code2, live: true },
  { name: "Product Hunt", desc: "Product launches", Icon: Zap, live: true },
  { name: "Media Publications", desc: "Coming Soon", Icon: FileText, live: false },
  { name: "Research Publications", desc: "Coming Soon", Icon: Layers, live: false },
];

const faqs = [
  {
    q: "Who is Bashir Ismail?",
    a: "Bashir Ismail, known as Fancy, is a Nigerian technology entrepreneur, startup founder, AI engineer, and product builder. He is the founder of Fancy Digitals, SafetyGrid, and BeVibesHub — three independent technology ventures built to solve real-world problems.",
  },
  {
    q: "What companies has Bashir founded?",
    a: "Bashir has founded three companies: Fancy Digitals (AI SaaS and digital agency), SafetyGrid (public safety technology platform), and BeVibesHub (digital publishing platform).",
  },
  {
    q: "What technologies does Bashir work with?",
    a: "Bashir works across AI engineering, software development, frontend engineering (Next.js, React), SEO, product design, brand strategy, automation, SaaS architecture, and digital publishing systems.",
  },
  {
    q: "How can I work with Bashir?",
    a: "Reach out via the Fancy Digitals contact page, call +234 904 554 7761, or message on WhatsApp at +234 903 436 0785 to discuss your project.",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AboutClient() {
  return (
    <main className="bg-white text-gray-900 antialiased">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 md:px-10 md:pt-32">
        {/* subtle grid bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right,#0000000a 1px,transparent 1px),linear-gradient(to bottom,#0000000a 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* green glow */}
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#075a01]/8 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-[#ff914d]/8 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-12 flex justify-center">
            <ol className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-2 shadow-sm text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-[#075a01] transition-colors">Home</Link></li>
              <li aria-hidden className="text-gray-200">/</li>
              <li className="font-semibold text-gray-800">About</li>
            </ol>
          </nav>

          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* left — text */}
            <div className="order-2 lg:order-1">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#075a01]">
                Founder · Product Builder · Technology Entrepreneur
              </p>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Bashir
                <br />
                <span className="text-[#075a01]">Ismail</span>
                <span className="text-[#ff914d]">.</span>
              </h1>

              <p className="mt-5 text-lg font-medium text-gray-500 md:text-xl">
                Technology Entrepreneur, Startup Founder,
                <br className="hidden sm:block" /> AI Engineer &amp; Digital Product Builder.
              </p>

              <div className="mt-8 space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  Bashir Ismail professionally known as <strong className="font-semibold text-gray-900">Fancy</strong> is a Nigerian technology entrepreneur, startup founder, AI engineer, and product builder. He is the founder of{" "}
                  <strong className="font-semibold text-gray-900">Fancy Digitals</strong>,{" "}
                  <strong className="font-semibold text-gray-900">SafetyGrid</strong>, and{" "}
                  <strong className="font-semibold text-gray-900">BeVibesHub</strong> three independent ventures built to solve real-world problems through technology, AI, and digital publishing.
                </p>
                <p>
                  His long-term vision is to build globally respected technology companies from Africa creating software, AI systems, digital infrastructure, and internet products that positively impact millions of people worldwide.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/2349034360785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#075a01]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0a8f01] hover:shadow-xl"
                >
                  Work With Me
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#companies"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                >
                  Explore My Companies
                </a>
              </div>
            </div>

            {/* right — image */}
            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative">
                <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 blur-2xl" />
                <div className="relative h-[420px] w-[320px] overflow-hidden rounded-[2rem] border border-white/60 shadow-2xl sm:h-[480px] sm:w-[360px]">
                  <Image
                    src="/images/founder.jpg"
                    alt="Bashir Ismail (Fancy) — Technology Entrepreneur and Startup Founder"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 320px, 360px"
                  />
                  {/* name badge */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 px-4 py-3 backdrop-blur-sm shadow-lg">
                    <p className="text-sm font-black text-gray-900">Bashir Ismail</p>
                    <p className="text-xs text-gray-500">Founder · Fancy Digitals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-gray-100 bg-gray-50 px-6 py-14 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-black text-[#075a01] md:text-5xl">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANIES ── */}
      <section id="companies" className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff914d]">Companies Founded</div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Three ventures. One mission.
          </h2>
          <p className="mt-3 max-w-xl text-gray-500">
            Each company targets a distinct problem space together forming a portfolio of technology built to last.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {companies.map(({ name, tag, description, href, accent, logo }) => (
  <div
    key={name}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    {/* top accent line */}
    <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl" style={{ background: accent }} />

    <div className="mb-6 h-12 w-12 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={48}
        height={48}
        className="h-full w-full object-contain"
      />
    </div>

    <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
      {tag}
    </p>
    <h3 className="mb-3 text-xl font-black text-gray-900">{name}</h3>
    <p className="flex-1 text-sm leading-relaxed text-gray-500">{description}</p>

    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
      style={{ color: accent }}
    >
      Visit
      <ArrowUpRight className="h-4 w-4" />
    </a>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="bg-[#075a01] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#ff914d]">
            Founder Philosophy
          </p>
          <blockquote className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            &ldquo;Build simple things that solve real problems. Build them well. Build them to last.&rdquo;
          </blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Great technology is invisible. It does not demand attention it removes friction. Every product Bashir builds is guided by simplicity, long-term thinking, intentional design, and a deep respect for the people who use it. Software should solve meaningful problems at scale, not add complexity to already complex lives.
          </p>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#075a01]">Expertise</div>
          <h2 className="mb-12 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Skills that ship products.
          </h2>

          <div className="flex flex-wrap gap-3">
            {expertise.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-[#075a01]/30 hover:bg-[#075a01]/5 hover:text-[#075a01]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-gray-50 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff914d]">Featured Products</div>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Built from scratch. Used by thousands.
          </h2>
          <p className="mb-12 max-w-xl text-gray-500">
            Every product below was personally conceived, designed, engineered, and launched by Bashir.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map(({ name, desc, href, Icon, color }) => {
              const Tag = href ? Link : "div";
              const props = href ? { href } : {};
              return (
                <Tag
                  key={name}
                  {...props}
                  className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}18`, color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{name}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{desc}</p>
                  </div>
                  {href && (
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold" style={{ color }}>
                      Try free <ArrowUpRight className="h-3 w-3" />
                    </span>
                  )}
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#075a01]">Journey</div>
          <h2 className="mb-16 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            A decade of building.
          </h2>

          <div className="relative">
            {/* vertical line */}
            <div aria-hidden className="absolute left-[11px] top-2 h-[calc(100%-24px)] w-px bg-gray-200" />

            <ol className="space-y-10">
              {timeline.map(({ year, title, desc }, i) => (
                <li key={i} className="relative flex gap-6 pl-8">
                  {/* dot */}
                  <div
                    aria-hidden
                    className="absolute left-0 top-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white shadow"
                    style={{ background: year === "Now" ? "#ff914d" : "#075a01" }}
                  />
                  <div>
                    <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-gray-400">{year}</p>
                    <p className="text-base font-black text-gray-900">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="border-y border-gray-100 bg-gray-50 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#075a01]">Mission</div>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Building globally respected
            <br />
            <span className="text-[#075a01]">technology from Africa.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            The mission is clear: create software, AI systems, public safety technology, digital infrastructure, publishing platforms, and internet products that positively impact millions of people worldwide and prove, unambiguously, that world-class technology can be built from Nigeria and across the African continent.
          </p>
        </div>
      </section>

      {/* ── RECOGNITION ── */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff914d]">Recognition & Presence</div>
          <h2 className="mb-12 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Where you can find Bashir.
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {recognition.map(({ name, desc, Icon, live }) => (
              <div
                key={name}
                className={`flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-all ${
                  live
                    ? "border-gray-100 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                    : "border-dashed border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${live ? "bg-[#075a01]/10" : "bg-gray-100"}`}>
                  <Icon className={`h-5 w-5 ${live ? "text-[#075a01]" : "text-gray-400"}`} />
                </div>
                <p className="text-xs font-bold text-gray-800">{name}</p>
                <p className="text-[10px] text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#075a01]">FAQ</div>
          <h2 className="mb-12 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Common questions.
          </h2>

          <dl className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <dt className="text-sm font-bold text-gray-900 md:text-base">{faq.q}</dt>
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-500 transition-all group-open:rotate-45 group-open:bg-[#075a01] group-open:text-white"
                  >
                    +
                  </span>
                </summary>
                <dd className="mt-4 text-sm leading-relaxed text-gray-600">{faq.a}</dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#075a01] px-8 py-16 shadow-2xl md:px-16">
            {/* glows */}
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ff914d]/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid items-center gap-12 md:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff914d]">
                  Let&apos;s Connect
                </p>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  Let&apos;s build something
                  <br />
                  <span className="text-[#ff914d]">that matters.</span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                  Whether you have a product idea, need a digital system built, or want to collaborate — reach out. Every great thing starts with a conversation.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/2349034360785"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#075a01] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Start a Project
                  </a>
                  <a
                    href="mailto:fancydigitalsng@gmail.com"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </a>
                </div>
              </div>

              {/* portrait */}
              <div className="hidden md:block">
                <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
                  <Image
                    src="/images/founder.jpg"
                    alt="Bashir Ismail"
                    fill
                    className="object-cover object-center"
                    sizes="208px"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-black text-white">Bashir Ismail</p>
                  <p className="text-xs text-white/50">Founder, Fancy Digitals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}