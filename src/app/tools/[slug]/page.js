import { tools } from "@/content/tools";
import { notFound } from "next/navigation";
import SEOMetaGenerator from "@/components/tools/live/SEOMetaGenerator";
import WordCounter from "@/components/tools/live/WordCounter";
import PasswordGenerator from "@/components/tools/live/PasswordGenerator";
import QRCodeGenerator from "@/components/tools/live/QRCodeGenerator";
import ColorPaletteGenerator from "@/components/tools/live/ColorPaletteGenerator";
import InvoiceGenerator from "@/components/tools/live/InvoiceGenerator";
import HashtagGenerator from "@/components/tools/live/HashtagGenerator";
import UnitConverter from "@/components/tools/live/UnitConverter";
import WaitlistForm from "@/components/WaitlistForm";
import ToolAnalytics from "@/components/tools/ToolAnalytics";
import Link from "next/link";

const BASE_URL = "https://fancydigitals.com.ng";

export async function generateStaticParams() {
  return tools
    .filter((t) => t.published)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool Not Found | Fancy Digitals" };
  return {
    title: `${tool.name} — Free Online Tool | Fancy Digitals`,
    description: tool.longDesc || tool.desc,
    keywords: tool.keywords?.join(", "),
    alternates: {
      canonical: `${BASE_URL}/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} — Free Online Tool | Fancy Digitals`,
      description: tool.longDesc || tool.desc,
      url: `${BASE_URL}/tools/${tool.slug}`,
      siteName: "Fancy Digitals",
      type: "website",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — Free Tool | Fancy Digitals`,
      description: tool.desc,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug && t.published);

  if (!tool) return notFound();

  const otherTools = tools
    .filter((t) => t.published && t.slug !== slug && t.isLive)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.longDesc || tool.desc,
    url: `${BASE_URL}/tools/${tool.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: tool.isLive
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
    publisher: {
      "@type": "Organization",
      name: "Fancy Digitals",
      url: BASE_URL,
    },
    keywords: tool.keywords?.join(", "),
  };

  const faqSchema = tool.faq?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: `${BASE_URL}/tools/${tool.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">

      <ToolAnalytics toolName={tool.name} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* BREADCRUMB + Back Link */}
<nav className="pt-24 pb-2 px-5 md:px-10">
  <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
    <ol className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
      <li><Link href="/" className="hover:text-gray-600 transition">Home</Link></li>
      <li>/</li>
      <li><Link href="/tools" className="hover:text-gray-600 transition">Tools</Link></li>
      <li>/</li>
      <li className="text-gray-700 font-medium truncate">{tool.name}</li>
    </ol>
    <div className="flex items-center gap-2 shrink-0">
      <span className={`hidden sm:inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        tool.isLive ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
      }`}>
        {tool.status}
      </span>
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All Tools
      </Link>
    </div>
  </div>
</nav>

      {/* TOOL HEADER */}
      <section className="pt-4 pb-8 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{tool.category}</span>
            <span className="text-gray-200">•</span>
            <span className="text-xs font-bold text-green-600">Free</span>
            <span className="text-gray-200">•</span>
            <span className="text-xs text-gray-400">No sign-up required</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{tool.name}</h1>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl leading-relaxed">
            {tool.longDesc || tool.desc}
          </p>
        </div>
      </section>

      {/* TOOL BODY */}
      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-5xl">
          {tool.isLive ? (
            <>
              {slug === "seo-meta-tag-generator" && <SEOMetaGenerator />}
              {slug === "word-counter" && <WordCounter />}
              {slug === "password-generator" && <PasswordGenerator />}
              {slug === "qr-code-generator" && <QRCodeGenerator />}
              {slug === "color-palette-generator" && <ColorPaletteGenerator />}
              {slug === "invoice-generator" && <InvoiceGenerator />}
              {slug === "hashtag-generator" && <HashtagGenerator />}
              {slug === "unit-converter" && <UnitConverter />}
            </>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-8 py-16 shadow-sm md:px-14">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-bold text-orange-700">{tool.status}</span>
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  Get notified when this launches
                </h2>
                <p className="mt-3 text-sm text-gray-500">
                  This tool is being built. Join the waitlist and we will notify you the moment it goes live.
                </p>
                <WaitlistForm toolName={tool.name} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES + WHO FOR */}
      <section className="px-5 pb-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-gray-900">What this tool does</h2>
              <ul className="space-y-2.5">
                {tool.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#075a01]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-gray-900">Who it is for</h2>
              <ul className="space-y-2.5">
                {tool.whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#075a01]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {tool.faq?.length > 0 && (
        <section className="px-5 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {tool.faq.map((f) => (
                <div key={f.q} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTHER TOOLS */}
      {otherTools.length > 0 && (
        <section className="px-5 pb-20 md:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-base font-bold text-gray-900">
              Try other free tools
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherTools.map((t) => (
                <a
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${t.accent}20` }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke={t.accent} viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#075a01]">{t.name}</p>
                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">{t.desc}</p>
                    <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      {t.status}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Built by{" "}
            <a href={BASE_URL} className="font-semibold text-[#075a01] hover:underline">
              Fancy Digitals
            </a>
            {" "}— Free tools for founders and marketers
          </p>
          <div className="flex items-center gap-4">
            <a href="/contact" className="text-xs font-semibold text-gray-500 hover:text-gray-900">
              Request a custom tool
            </a>
            <a href="/tools" className="rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:opacity-90">
              All Tools
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}