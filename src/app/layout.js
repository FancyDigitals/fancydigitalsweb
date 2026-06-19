import "./globals.css";
import "@/styles/new-year-popup.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactFloat from "@/components/MobileContactFloat";
import NewYearPopup from "@/components/NewYearPopup";
import GalleryLightbox from "@/components/GalleryLightbox";
import LayoutShell from "@/components/LayoutShell";
import { GoogleAnalytics } from "@next/third-parties/google";

const BASE_URL = "https://fancydigitals.com.ng";
const GA_ID = "G-3K633E2JSK";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fancy Digitals — Web Design, Free Tools, SEO & Digital Agency Nigeria",
    template: "%s | Fancy Digitals",
  },
  description:
    "Fancy Digitals is a premium web design, SEO, branding and digital tools agency in Nigeria. Use our free online tools — word counter, password generator, invoice generator, QR code generator and more. Serving founders and businesses worldwide.",
  keywords: [
    "web design agency Nigeria",
    "free online tools",
    "word counter",
    "password generator",
    "invoice generator free",
    "QR code generator",
    "color palette generator",
    "hashtag generator",
    "unit converter",
    "SEO meta tag generator",
    "web developer Lagos",
    "digital marketing agency Nigeria",
    "branding agency Nigeria",
    "SEO services Nigeria",
    "free digital tools",
    "online tools no signup",
    "Fancy Digitals",
  ],
  authors: [{ name: "Bashir Ismail", url: BASE_URL }],
  creator: "Fancy Digitals",
  publisher: "Fancy Digitals",
  category: "Technology",
  classification: "Digital Agency, Free Online Tools",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Fancy Digitals — Web Design, Free Tools & Digital Agency Nigeria",
    description:
      "Premium web design, SEO and branding agency in Nigeria. Plus 8+ free online tools — word counter, password generator, invoice maker, QR code generator and more. No sign-up required.",
    siteName: "Fancy Digitals",
    locale: "en_NG",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Fancy Digitals — Web Design, Free Tools & Digital Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fancydigitals",
    creator: "@fancydigitals",
    title: "Fancy Digitals — Free Tools, Web Design & SEO Agency Nigeria",
    description: "8+ free online tools with no sign-up. Plus premium web design, SEO and branding services.",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Fancy Digitals",
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png`, width: 512, height: 512 },
    image: `${BASE_URL}/og-image.png`,
    description: "Premium web design, SEO, branding and free digital tools agency based in Nigeria serving founders and businesses worldwide.",
    foundingDate: "2022",
    founder: {
      "@type": "Person",
      name: "Bashir Ismail",
      jobTitle: "Founder & Digital Architect",
      url: `${BASE_URL}/about`,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressRegion: "Lagos",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+234-904-554-7761",
        contactType: "customer service",
        availableLanguage: "English",
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        telephone: "+234-903-436-0785",
        contactType: "sales",
        contactOption: "WhatsApp",
        availableLanguage: "English",
      },
    ],
    sameAs: ["https://wa.me/2349034360785"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management" } },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Fancy Digitals",
    description: "Web design, free online tools, SEO and digital marketing agency",
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/tools?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-NG",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Fancy Digitals",
    image: `${BASE_URL}/og-image.png`,
    url: BASE_URL,
    telephone: "+234-904-554-7761",
    email: "hello@fancydigitals.com.ng",
    priceRange: "₦₦₦",
    currenciesAccepted: "NGN, USD, GBP, EUR",
    paymentAccepted: "Bank Transfer, PayStack, Flutterwave",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressRegion: "Lagos",
      addressLocality: "Lagos",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.5244,
      longitude: 3.3792,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: ["Nigeria", "United Kingdom", "United States", "Ghana", "Kenya", "South Africa"],
    knowsAbout: [
      "Web Design", "Web Development", "SEO", "Digital Marketing",
      "Brand Identity", "UI/UX Design", "Free Online Tools",
      "Password Generator", "QR Code Generator", "Invoice Generator",
      "Word Counter", "Color Palette Generator", "Hashtag Generator",
      "Unit Converter", "SEO Meta Tag Generator", "AI Automation",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "50",
    },
  };

  return (
    <html lang="en-NG">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://blog.fancydigitals.com.ng" />
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos, Nigeria" />
        <meta name="geo.position" content="6.5244;3.3792" />
        <meta name="ICBM" content="6.5244, 3.3792" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#075a01" />
        <meta name="msapplication-TileColor" content="#075a01" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-screen bg-[#050705] text-white antialiased">
        <NewYearPopup />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

        <LayoutShell
          header={<Header />}
          footer={<Footer />}
          float={<MobileContactFloat />}
          lightbox={<GalleryLightbox />}
        >
          {children}
        </LayoutShell>

        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}