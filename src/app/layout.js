import "./globals.css";
import "@/styles/new-year-popup.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactFloat from "@/components/MobileContactFloat";
import NewYearPopup from "@/components/NewYearPopup";
import GalleryLightbox from "@/components/GalleryLightbox";
import { GoogleAnalytics } from "@next/third-parties/google";
import DashboardDetector from "@/components/DashboardDetector";
import Schema from "@/components/Schema";
import {
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

const BASE_URL = "https://fancydigitals.com.ng";
const GA_ID = "G-3K633E2JSK";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fancy Digitals — AI Tools, Web Design, SEO & Digital Agency",
    template: "%s | Fancy Digitals",
  },
  description:
    "Fancy Digitals is a modern AI-powered digital studio. Use free AI tools — AI resume builder, landing page generator, AI visibility scanner — and premium agency services for web design, branding, SEO, and AI automation. Serving businesses worldwide.",
  keywords: [
    "AI tools for business",
    "AI landing page generator",
    "AI resume builder",
    "AI visibility checker",
    "AI cover letter generator",
    "web design agency",
    "digital marketing agency",
    "SEO services",
    "AEO optimization",
    "GEO optimization",
    "AI marketing tools",
    "free AI tools",
    "ChatGPT optimization",
    "AI for small business",
    "branding agency",
    "app development",
    "AI automation",
    "Fancy Digitals",
    "Bashir Ismail",
  ],
  authors: [{ name: "Bashir Ismail", url: BASE_URL }],
  creator: "Fancy Digitals",
  publisher: "Fancy Digitals",
  category: "Technology",
  classification: "AI Tools, Digital Agency, SaaS Platform",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Fancy Digitals — AI-Powered Digital Studio",
    description:
      "Free AI tools + premium digital agency services. Build AI-optimized landing pages, check your AI visibility, and grow your business with our all-in-one platform.",
    siteName: "Fancy Digitals",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Fancy Digitals — AI-Powered Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fancydigitalsng",
    creator: "@fancydigitalsng",
    title: "Fancy Digitals — AI Tools & Digital Agency",
    description:
      "Free AI tools for businesses + premium agency services. Web design, branding, SEO, AI automation under one roof.",
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
  other: {
    "ai-content-policy": "human-authored",
  },
};

// LocalBusiness (kept as-is since you have specific Lagos location data)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Fancy Digitals",
  image: `${BASE_URL}/og-image.png`,
  url: BASE_URL,
  telephone: "+234-904-554-7761",
  email: "fancydigitalsng@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "USD, NGN, GBP, EUR",
  paymentAccepted: "Bank Transfer, PayStack, Flutterwave, Card",
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
  areaServed: [
    "Worldwide",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
  ],
  knowsAbout: [
    "AI Marketing",
    "AI Visibility Optimization",
    "Generative Engine Optimization (GEO)",
    "Answer Engine Optimization (AEO)",
    "AI-Indexed Optimization (AIO)",
    "Web Design",
    "Web Development",
    "SEO",
    "Digital Marketing",
    "Brand Identity Design",
    "Mobile App Development",
    "AI Automation",
    "Conversion Optimization",
    "Landing Page Design",
    "Resume Building",
    "Cover Letter Writing",
    "ChatGPT Optimization",
    "Email Marketing",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#075a01" />
        <meta name="msapplication-TileColor" content="#075a01" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin="anonymous"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap"
  rel="stylesheet"
/>
      </head>
      <body className="min-h-screen bg-[#050705] text-white antialiased">
        <NewYearPopup />

        {/* SCHEMAS — Centralized & 2026-optimized */}
        <Schema data={organizationSchema()} />
        <Schema data={websiteSchema()} />
        <Schema data={localBusinessSchema} />

        <DashboardDetector
          header={<Header />}
          footer={<Footer />}
          float={<MobileContactFloat />}
          lightbox={<GalleryLightbox />}
        >
          {children}
        </DashboardDetector>

        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}