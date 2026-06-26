import AboutClient from "./client";

const BASE_URL = "https://fancydigitals.com.ng";

export const metadata = {
  title: "Bashir Ismail (Fancy) — Founder of Fancy Digitals | Digital Agency Nigeria",
  description:
    "Meet Bashir Ismail, founder of Fancy Digitals — a Nigerian digital agency building AI tools, landing pages, resumes, and premium web systems for founders worldwide.",
  keywords: [
    "Bashir Ismail",
    "Bashir Ismail founder",
    "Fancy Digitals founder",
    "Bashir Ismail Fancy Digitals",
    "Fancy Digitals Nigeria",
    "digital agency founder Nigeria",
    "web design founder Lagos",
    "AI tools founder Nigeria",
    "Nigerian SaaS founder",
    "AI landing page generator founder",
    "AI resume builder founder",
    "Bashir Fancy",
    "Fancy digital architect",
    "founder Fancy Digitals Nigeria",
    "best web designer Nigeria",
    "Nigerian digital architect",
    "Lagos web developer founder",
    "Bashir Ismail digital studio",
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "Bashir Ismail — Founder of Fancy Digitals",
    description:
      "The founder behind Fancy Digitals — building AI tools and premium digital systems for businesses worldwide.",
    url: `${BASE_URL}/about`,
    type: "profile",
    images: [
      {
        url: `${BASE_URL}/images/founder.jpg`,
        width: 1200,
        height: 630,
        alt: "Bashir Ismail, Founder of Fancy Digitals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bashir Ismail — Founder of Fancy Digitals",
    description: "Building AI tools and premium digital systems from Nigeria.",
    images: [`${BASE_URL}/images/founder.jpg`],
  },
};

export default function AboutPage() {
  // All structured data for SEO — Google rich results
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bashir Ismail",
    alternateName: ["Fancy", "Bashir Fancy"],
    jobTitle: "Founder & Digital Architect",
    description:
      "Founder of Fancy Digitals — a digital agency building AI tools, landing pages, and premium web systems for global clients.",
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/images/founder.jpg`,
    sameAs: [
      "https://wa.me/2349034360785",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Fancy Digitals",
      url: BASE_URL,
    },
    knowsAbout: [
      "Web Design",
      "Frontend Engineering",
      "AI Tools Development",
      "Landing Page Design",
      "Digital Strategy",
      "Product Design",
      "Brand Identity",
      "SEO",
    ],
    nationality: { "@type": "Country", name: "Nigeria" },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fancy Digitals",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    founder: {
      "@type": "Person",
      name: "Bashir Ismail",
      alternateName: "Fancy",
    },
    foundingDate: "2022",
    description:
      "A premium digital studio building AI tools, landing pages, resumes, and scalable web systems for founders and businesses worldwide.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressLocality: "Lagos",
    },
    sameAs: [
      "https://wa.me/2349034360785",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Bashir Ismail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bashir Ismail, known as Fancy, is the founder of Fancy Digitals — a Nigerian digital agency building AI tools, landing pages, resumes, and premium web systems for businesses worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "What is Fancy Digitals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fancy Digitals is a digital agency based in Nigeria that builds AI-powered tools (AI Resume Builder, AI Cover Letter, AI Landing Page Generator), free utility tools, custom websites, and provides SEO, branding, and digital strategy services.",
        },
      },
      {
        "@type": "Question",
        name: "What AI tools has Bashir built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bashir has built AI Resume Builder, AI Cover Letter Generator, AI Landing Page Generator, and a suite of free productivity tools including QR Code Generator, Password Generator, Invoice Maker, and more.",
        },
      },
      {
        "@type": "Question",
        name: "How can I work with Bashir Ismail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Bashir through the Fancy Digitals contact page, by phone at +234 904 554 7761, or via WhatsApp at +234 903 436 0785.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Fancy Digitals based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fancy Digitals is based in Lagos, Nigeria, and serves clients across Nigeria, Africa, and globally.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}