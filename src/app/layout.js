import "./globals.css";
import "@/styles/new-year-popup.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactFloat from "@/components/MobileContactFloat";
import NewYearPopup from "@/components/NewYearPopup";
import GalleryLightbox from "@/components/GalleryLightbox";

export const metadata = {
  metadataBase: new URL("https://fancydigitals.com.ng"),
  title: {
    default:
      "Fancy Digitals — Web Design, SEO & Digital Marketing Agency",
    template: "%s | Fancy Digitals",
  },
  description:
    "Fancy Digitals is a professional web design, SEO, branding and digital marketing agency serving global clients with a strong presence in Nigeria.",
  keywords: [
    "web design services",
    "professional web design",
    "SEO services",
    "graphics design services",
    "web design agency Nigeria",
    "web developer Lagos",
    "digital marketing agency",
    "ecommerce web design",
    "branding agency Nigeria"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://fancydigitals.com.ng",
    title:
      "Fancy Digitals — Web Design & Digital Marketing Agency",
    description:
      "Professional web design, SEO, branding and digital marketing services worldwide with focus on Nigeria.",
    siteName: "Fancy Digitals",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Fancy Digitals — Web Design & Digital Marketing Agency",
    description:
      "Professional web design, SEO and branding services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Fancy Digitals",
    url: "https://fancydigitals.com.ng",
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    description:
      "Web design, SEO, graphics design and digital marketing agency serving global businesses with strong focus in Nigeria.",
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050705] text-white antialiased">
        <NewYearPopup />

        <Header />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {children}

        <Footer />

        <MobileContactFloat />
        <GalleryLightbox />
      </body>
    </html>
  );
}