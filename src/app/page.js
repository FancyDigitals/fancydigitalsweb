import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustedLogos from "@/components/TrustedLogos";
import ToolsSection from "@/components/ToolsSection";
import PortfolioPreview from "@/components/PortfolioPreview";
import FinalCTA from "@/components/FinalCTA";
import { homePage } from "@/content/pages/home";

const BASE_URL = "https://fancydigitals.com.ng";

export const metadata = {
  title: "Fancy Digitals — Web Design, Free Online Tools & SEO Agency Nigeria",
  description:
    "Fancy Digitals offers premium web design, SEO and branding services in Nigeria. Use our free online tools — word counter, password generator, invoice maker, QR code generator, color palette generator, hashtag generator and unit converter. No sign-up. Free forever.",
  keywords: [
    // AI Tools — Landing Page
    "ai landing page generator",
    "free ai landing page generator",
    "ai landing page builder",
    "landing page generator free",
    "landing page maker ai",
    "ai page builder free",
    "generate landing page with ai",
    "ai website generator free",
    "landing page creator ai",
    "free landing page builder no code",
    "ai powered landing page",
    "best ai landing page generator",
    "landing page generator no code",
    "publish landing page free",
    "ai landing page generator no signup",
    "landing page builder free online",
    "create landing page with ai",
    "ai marketing page generator",
    "free business landing page generator",
    "ai landing page tool",
    // AI Tools — Resume
    "ai resume builder free",
    "free ai resume builder",
    "ats resume builder free",
    "ai cv builder free",
    "resume generator ai",
    "best free ai resume builder",
    "ai resume builder no signup",
    "professional resume maker free",
    // AI Tools — Cover Letter
    "ai cover letter generator free",
    "free ai cover letter writer",
    "cover letter generator ai",
    "ai cover letter builder",
    // Agency — Nigeria
    "web design agency Nigeria",
    "web design Lagos",
    "web developer Nigeria",
    "digital marketing agency Lagos",
    "branding agency Nigeria",
    "SEO agency Nigeria",
    "graphics design Nigeria",
    "website design Nigeria affordable",
    "web development company Lagos Nigeria",
    "seo services Nigeria",
    // Free Tools
    "free online tools no signup",
    "free digital tools",
    "word counter online",
    "password generator free",
    "invoice generator online free",
    "QR code generator free",
    "color palette generator",
    "hashtag generator Instagram",
    "unit converter online",
    "SEO meta tag generator",
    "free tools for marketers",
    "free tools for small business",
    "online business tools free",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Fancy Digitals — Web Design, Free Tools & SEO Agency Nigeria",
    description:
      "Premium web design, SEO and branding services. Plus 8+ free online tools with no sign-up required. Word counter, password generator, invoice maker and more.",
    url: BASE_URL,
    siteName: "Fancy Digitals",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Fancy Digitals — Free Tools & Digital Agency Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fancy Digitals — Free Tools & Digital Agency Nigeria",
    description: "8+ free online tools. Premium web design, SEO & branding. No sign-up required.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function HomePage() {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "Fancy Digitals — Web Design, Free Online Tools & SEO Agency Nigeria",
    description: "Premium web design, SEO, branding and free online tools for founders and businesses.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Free Online Tools by Fancy Digitals",
      description: "Free tools for SEO, writing, security, business and design",
      itemListElement: [
        { "@type": "ListItem", position: 1, url: `${BASE_URL}/tools/seo-meta-tag-generator`, name: "SEO Meta Tag Generator" },
        { "@type": "ListItem", position: 2, url: `${BASE_URL}/tools/word-counter`, name: "Word Counter" },
        { "@type": "ListItem", position: 3, url: `${BASE_URL}/tools/password-generator`, name: "Password Generator" },
        { "@type": "ListItem", position: 4, url: `${BASE_URL}/tools/invoice-generator`, name: "Invoice Generator" },
        { "@type": "ListItem", position: 5, url: `${BASE_URL}/tools/qr-code-generator`, name: "QR Code Generator" },
        { "@type": "ListItem", position: 6, url: `${BASE_URL}/tools/color-palette-generator`, name: "Color Palette Generator" },
        { "@type": "ListItem", position: 7, url: `${BASE_URL}/tools/hashtag-generator`, name: "Hashtag Generator" },
        { "@type": "ListItem", position: 8, url: `${BASE_URL}/tools/unit-converter`, name: "Unit Converter" },
      ],
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#075a01] opacity-[0.18] blur-[160px]" />
        <div className="absolute top-40 -right-32 h-[460px] w-[460px] rounded-full bg-[#ff914d] opacity-[0.16] blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#075a01] opacity-[0.12] blur-[180px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <Hero slides={homePage.hero.slides} />

      {homePage.toolsSection.enabled && (
        <section className="relative" id="tools">
          <ToolsSection />
        </section>
      )}

      <section className="relative" id="services">
        <Services
          title={homePage.servicesPreview.title}
          subtitle={homePage.servicesPreview.subtitle}
          items={homePage.servicesPreview.items}
        />
      </section>

      <TrustedLogos />

      <section className="relative" id="portfolio">
        <PortfolioPreview />
      </section>

      <section className="relative">
        <FinalCTA
          title={homePage.finalCTA.title}
          description={homePage.finalCTA.description}
          primaryAction={homePage.finalCTA.primaryAction}
          secondaryAction={homePage.finalCTA.secondaryAction}
        />
      </section>
    </main>
  );
}