export const metadata = {
  title: "About Bashir Ismail — Founder of Fancy Digitals",
  description:
    "Meet Bashir Ismail (Fancy), founder of Fancy Digitals. A digital architect with 10+ years experience in web design, frontend engineering, SEO and brand systems. Based in Lagos, Nigeria.",
  keywords: [
    "Bashir Ismail",
    "Fancy Digitals founder",
    "web designer Nigeria",
    "digital agency founder Lagos",
    "web design expert Nigeria",
    "brand designer Nigeria",
  ],
  alternates: {
    canonical: "https://fancydigitals.com.ng/about",
  },
  openGraph: {
    title: "About Bashir Ismail — Founder of Fancy Digitals",
    description: "10+ years of digital experience. Web design, branding, SEO and free tools built for founders worldwide.",
    url: "https://fancydigitals.com.ng/about",
    type: "profile",
    images: [{ url: "https://fancydigitals.com.ng/images/founder.jpg", alt: "Bashir Ismail - Founder of Fancy Digitals" }],
  },
};

export default function AboutLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bashir Ismail",
    alternateName: "Fancy",
    jobTitle: "Founder & Digital Architect",
    url: "https://fancydigitals.com.ng/about",
    image: "https://fancydigitals.com.ng/images/founder.jpg",
    worksFor: {
      "@type": "Organization",
      name: "Fancy Digitals",
      url: "https://fancydigitals.com.ng",
    },
    knowsAbout: [
      "Web Design", "Frontend Engineering", "SEO", "Brand Identity",
      "Digital Marketing", "UI/UX Design", "Product Design", "AI Automation",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressRegion: "Lagos",
    },
    sameAs: ["https://fancydigitals.com.ng"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {children}
    </>
  );
}