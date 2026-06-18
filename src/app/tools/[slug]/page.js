import { tools } from "@/content/tools";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const BASE_URL = "https://fancydigitals.com.ng";

const STATUS_STYLES = {
  Live: "bg-green-100 text-green-700",
  "Coming Soon": "bg-orange-100 text-orange-700",
  "In Development": "bg-blue-100 text-blue-700",
};

export const metadata = {
  title: "Free Online Tools — Word Counter, Password Generator, Invoice Maker & More | Fancy Digitals",
  description:
    "Use 8+ free online tools by Fancy Digitals. Word counter, password generator, invoice generator, QR code generator, color palette generator, SEO meta tag generator, hashtag generator and unit converter. No sign-up. No credit card. Free forever.",
  keywords: [
    "free online tools",
    "word counter online free",
    "password generator free",
    "invoice generator free no signup",
    "QR code generator free",
    "color palette generator",
    "SEO meta tag generator",
    "hashtag generator free",
    "unit converter online",
    "free tools no signup",
    "online tools free",
    "digital tools free",
    "Fancy Digitals tools",
    "free SEO tools",
    "free writing tools",
    "free business tools",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools`,
  },
  openGraph: {
    title: "Free Online Tools — Word Counter, Password Generator & More | Fancy Digitals",
    description:
      "8+ free online tools. No sign-up required. Word counter, password generator, invoice maker, QR code generator, color palette generator, hashtag generator, unit converter and SEO meta tag generator.",
    url: `${BASE_URL}/tools`,
    siteName: "Fancy Digitals",
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Free Online Tools by Fancy Digitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "8+ Free Online Tools — No Sign-up | Fancy Digitals",
    description: "Word counter, password generator, invoice maker, QR code generator and more. All free, no sign-up required.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function ToolsPage() {
  const published = tools.filter((t) => t.published).sort((a, b) => a.order - b.order);
  const liveTools = published.filter((t) => t.isLive);
  const featuredTool = liveTools[0];

  const toolsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Online Tools — Fancy Digitals",
    description: "Free online tools including word counter, password generator, invoice generator, QR code generator and more.",
    url: `${BASE_URL}/tools`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Free Online Tools by Fancy Digitals",
      description: "Free digital tools for SEO, writing, security, business and design. No sign-up required.",
      numberOfItems: published.length,
      itemListElement: published.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/tools/${t.slug}`,
        name: t.name,
      })),
    },
  };

  const softwareAppSchemas = liveTools.map((t) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t.name,
    description: t.longDesc || t.desc,
    url: `${BASE_URL}/tools/${t.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    publisher: { "@type": "Organization", name: "Fancy Digitals", url: BASE_URL },
    keywords: t.keywords?.join(", "),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are all Fancy Digitals tools really free?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. All tools on Fancy Digitals are completely free to use. No sign-up, no credit card, no hidden fees. Use them as many times as you want." },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account to use the tools?",
        acceptedAnswer: { "@type": "Answer", text: "No. All tools work instantly in your browser with no account required. Just open a tool and start using it." },
      },
      {
        "@type": "Question",
        name: "Are the tools safe to use?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. All tools run entirely in your browser. No data is sent to any server. Your text, passwords, invoices and other data never leave your device." },
      },
      {
        "@type": "Question",
        name: "What free tools does Fancy Digitals offer?",
        acceptedAnswer: { "@type": "Answer", text: `Fancy Digitals offers ${liveTools.length} free online tools including: ${liveTools.map((t) => t.name).join(", ")}. More tools are being added regularly.` },
      },
      {
        "@type": "Question",
        name: "Can I request a custom tool?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Contact Fancy Digitals via the contact page or WhatsApp to request a custom tool built for your specific business needs." },
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsPageSchema) }} />
      {softwareAppSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* HERO */}
      <section className="relative px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-sm">
              <a href="/" className="text-sm text-gray-500 hover:text-[#075a01]">Home</a>
              <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm font-semibold text-gray-900">Tools</span>
            </div>
          </nav>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-bold text-green-700">
                {liveTools.length} tools live now — free to use, no sign-up
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Free online tools built for
              <span className="relative mx-2 mt-3 block">
                <span className="bg-gradient-to-r from-[#075a01] via-[#075a01] to-[#075a01] bg-clip-text text-transparent">real work</span>
                <span className="mx-2 text-gray-900">&</span>
                <span className="bg-gradient-to-r from-[#ff914d] to-[#f97316] bg-clip-text text-transparent">real results</span>
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Word counter, password generator, invoice maker, QR code generator, color palette tool,
              hashtag generator, unit converter and SEO meta tag generator.
              No sign-up. No credit card. Free forever.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED LIVE TOOL */}
      {featuredTool && (
        <section className="relative px-5 pb-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl border-2 border-[#075a01]/20 bg-gradient-to-br from-white to-gray-50 shadow-xl">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#075a01]/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ff914d]/5 blur-3xl" />

              <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm font-bold text-green-700">Live — Use it now, free</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{featuredTool.name}</h2>
                  <p className="mt-4 text-lg text-gray-600">{featuredTool.longDesc || featuredTool.desc}</p>
                  <ul className="mt-6 space-y-3">
                    {featuredTool.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#075a01]/10">
                          <svg className="h-4 w-4 text-[#075a01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/tools/${featuredTool.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    Use Tool Free — No Sign-up
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 blur-xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl w-full max-w-sm p-6">
                      <div className="h-2 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#0ea5e9] rounded-full mb-4" />
                      <div className="space-y-3">
                        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
                          <p className="text-xs text-gray-400 mb-1">Keyword</p>
                          <div className="h-3 w-3/4 rounded bg-[#075a01]/20" />
                        </div>
                        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
                          <p className="text-xs text-gray-400 mb-1">SEO Score</p>
                          <div className="h-2 w-full rounded-full bg-gray-100">
                            <div className="h-2 w-4/5 rounded-full bg-[#075a01]" />
                          </div>
                        </div>
                        <div className="rounded-lg bg-white border border-[#075a01]/20 p-3">
                          <p className="text-xs text-gray-400 mb-1">Result</p>
                          <div className="h-3 w-full rounded bg-gray-100" />
                          <div className="h-3 w-2/3 rounded bg-gray-100 mt-1" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -left-6 top-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg text-lg">🔍</div>
                    <div className="absolute -right-6 bottom-1/4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg text-lg">✨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL TOOLS GRID */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              All <span className="text-[#075a01]">Free Tools</span>
            </h2>
            <p className="mt-3 text-gray-500">Use live tools now. Get notified when others launch.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((tool) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${tool.accent}30, transparent)` }}
                />
                <div className="absolute inset-[2px] rounded-[22px] bg-white" />

                {tool.popular && (
                  <div className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: tool.accent }}>
                    Popular
                  </div>
                )}

                <div className="relative">
                  <div className={`relative h-[160px] overflow-hidden rounded-t-[22px] bg-gradient-to-br ${tool.accentLight} flex items-center justify-center`}>
                    <div className="text-6xl opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30">
                      {tool.icon || "🔧"}
                    </div>
                  </div>

                  <div className="relative p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tool.accent }}>{tool.category}</p>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[tool.status] || "bg-gray-100 text-gray-600"}`}>
                        {tool.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{tool.desc}</p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-bold" style={{ color: tool.accent }}>
                        {tool.isLive ? "Use free now" : "Join waitlist"}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">Free</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION — for SEO */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Are all Fancy Digitals tools really free?", a: "Yes. All tools are completely free. No sign-up, no credit card, no hidden fees. Use them as many times as you want." },
              { q: "Do I need to create an account?", a: "No. All tools work instantly in your browser with zero account required. Just open and use." },
              { q: "Is my data safe when using these tools?", a: "Yes. All tools run entirely in your browser. No data is sent to any server. Your text, passwords, invoices and other data never leave your device." },
              { q: "What free tools are available?", a: `Currently ${liveTools.length} tools are live: ${liveTools.map((t) => t.name).join(", ")}. More are being built regularly.` },
              { q: "Can I request a custom tool?", a: "Yes. Contact us via the contact page or WhatsApp to request a custom tool for your business." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-bold text-gray-900">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-10 text-center shadow-2xl md:p-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Want a tool built just for you?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">We build custom digital tools for businesses. Let us know what you need.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#075a01] shadow-lg transition hover:-translate-y-1">Discuss Your Idea</a>
              <a href="https://wa.me/2349034360785" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}