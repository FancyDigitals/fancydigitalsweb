import Link from "next/link";
import {
  Sparkles,
  Palette,
  Type,
  Package,
  Award,
  Check,
  ArrowRight,
  Layers,
  MessageSquare,
  FileText,
  Download,
} from "lucide-react";

export const metadata = {
  title: "Free AI Brand Kit Generator | Fancy Digitals",
  description:
    "Generate a complete brand identity in 60 seconds — colors, typography, logos, business cards, and brand guidelines. Download the full ZIP with Pro.",
  keywords: [
    "ai brand kit generator",
    "free brand kit generator",
    "brand identity generator",
    "ai logo generator",
    "brand guidelines generator",
    "color palette generator",
    "typography generator ai",
    "brand style guide ai",
  ].join(", "),
  openGraph: {
    title: "Free AI Brand Kit Generator | Fancy Digitals",
    description:
      "Complete brand identity in 60 seconds. Download the full ZIP.",
    type: "website",
  },
};

const FEATURES = [
  {
    icon: Palette,
    title: "Complete Color System",
    desc: "Primary, Secondary, Accent, Neutrals, and Semantic colors — with HEX, RGB, HSL, and usage rules.",
  },
  {
    icon: Type,
    title: "Typography Pairings",
    desc: "Curated Google Fonts pairings for headings, body, and code — with a full spec sheet.",
  },
  {
    icon: Sparkles,
    title: "Logo Concepts + AI Prompts",
    desc: "3 SVG logo concepts you can edit in Figma, plus AI image prompts for Midjourney/DALL-E.",
  },
  {
    icon: MessageSquare,
    title: "Brand Voice Guide",
    desc: "Tone rules, do's and don'ts, sample sentences — everything your team needs.",
  },
  {
    icon: Award,
    title: "Business Cards & Letterhead",
    desc: "Print-ready SVG templates for business cards, letterhead, and social covers.",
  },
  {
    icon: FileText,
    title: "Full Brand Guidelines PDF",
    desc: "A complete brand book you can hand to any designer or developer.",
  },
];

const ZIP_CONTENTS = [
  "Logo files (SVG + editable)",
  "Color palette (CSS, SCSS, Tailwind, JSON)",
  "Typography guide (HTML + Google Fonts imports)",
  "Business cards (front + back, print-ready)",
  "Email signature (HTML template)",
  "Letterhead template",
  "Social covers (LinkedIn, Twitter, Facebook)",
  "Complete brand guidelines document",
  "README with instructions",
];

const FREE_VS_PRO = [
  { feature: "Generate brand kit", free: true, pro: true },
  { feature: "Complete color palette", free: true, pro: true },
  { feature: "Typography system", free: true, pro: true },
  { feature: "Logo concepts", free: true, pro: true },
  { feature: "Brand voice guide", free: true, pro: true },
  { feature: "Web preview + copy items", free: true, pro: true },
  { feature: "Unlimited generations", free: false, pro: true },
  { feature: "Full ZIP download", free: false, pro: true },
  { feature: "Editable SVG logos", free: false, pro: true },
  { feature: "Business card templates", free: false, pro: true },
  { feature: "Social media covers", free: false, pro: true },
  { feature: "Brand guidelines PDF", free: false, pro: true },
];

const FAQS = [
  {
    q: "Is the AI Brand Kit Generator free?",
    a: "Yes. Free users get 1 brand kit per day with web preview and individual item copying. Pro users get unlimited kits plus the full ZIP download with logos, colors, fonts, templates, and brand guidelines.",
  },
  {
    q: "What's inside the ZIP download?",
    a: "Logo SVGs, color palette (CSS/SCSS/Tailwind/JSON), typography guide, business cards, email signature, letterhead, social covers, complete brand guidelines HTML/PDF-ready, and a README.",
  },
  {
    q: "Are the logos real editable SVG files?",
    a: "Yes. Every logo is a real SVG you can open in Figma, Illustrator, or Sketch. We also generate AI image prompts you can paste into Midjourney, DALL-E, or Canva AI for image-based logos.",
  },
  {
    q: "Can I edit the brand kit after generation?",
    a: "Yes. Click any field to edit inline — business name, tagline, colors, fonts, bios, and more. Everything auto-saves.",
  },
  {
    q: "Can I share my brand kit with a designer?",
    a: "Yes. Use the Share button to generate a public link. Pro users can also download the full ZIP and hand it directly to their designer or developer.",
  },
];

export default function FreeAIBrandKitGeneratorPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#075a01]/8 text-[#075a01] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#075a01]/20 mb-6">
            <Sparkles className="w-4 h-4" />
            AI Brand Kit Generator
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
            Your complete
            <br />
            <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
              brand identity.
            </span>
            <br />
            In 60 seconds.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            AI generates your colors, typography, logos, business cards, and
            full brand guidelines. Download everything as a professional ZIP.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/tools/ai-brand-kit-generator"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 text-base"
            >
              <Sparkles className="w-5 h-5" />
              Generate free brand kit
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-200 transition-all text-base"
            >
              See Pro features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            1 free brand kit per day. Pro unlocks unlimited + ZIP download.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-3">
            Everything a real brand needs
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm sm:text-base">
            Not just a logo. A complete brand system.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#075a01]/20 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#0a8f01]/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#075a01]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ZIP contents */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <Package className="w-3.5 h-3.5" />
              PRO EXCLUSIVE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              The complete ZIP download
            </h2>
            <p className="text-gray-500 text-sm">
              Everything your designer or developer needs, in one folder.
            </p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
              <Package className="w-5 h-5 text-[#0a8f01]" />
              <span className="font-mono text-sm text-white/80">
                brand-kit.zip
              </span>
            </div>
            <div className="space-y-2">
              {ZIP_CONTENTS.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#0a8f01] flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Pro */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
            Free vs Pro
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="col-span-1 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Feature
              </div>
              <div className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide">
                Free
              </div>
              <div className="px-4 py-3 text-center text-xs font-bold text-[#075a01] uppercase tracking-wide">
                Pro
              </div>
            </div>
            {FREE_VS_PRO.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 items-center border-b border-gray-100 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <div className="col-span-1 px-4 py-3 text-sm text-gray-700">
                  {row.feature}
                </div>
                <div className="px-4 py-3 text-center">
                  {row.free ? (
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-gray-300 text-sm">—</span>
                  )}
                </div>
                <div className="px-4 py-3 text-center">
                  <Check className="w-4 h-4 text-[#075a01] mx-auto" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all"
            >
              Upgrade to Pro
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-5"
              >
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#075a01] to-[#0a8f01] rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Skip the $10,000 agency fee.
            </h2>
            <p className="text-white/80 mb-6 text-sm sm:text-base">
              Get a world-class brand identity in 60 seconds.
            </p>
            <Link
              href="/dashboard/tools/ai-brand-kit-generator"
              className="inline-flex items-center gap-2 bg-white text-[#075a01] font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Generate free brand kit
            </Link>
            <p className="text-white/60 text-xs mt-4">
              No credit card. 1 free per day.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}