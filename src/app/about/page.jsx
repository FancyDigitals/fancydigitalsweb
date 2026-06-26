import AboutClient from "./client";

const BASE_URL = "https://fancydigitals.com.ng";

export const metadata = {
  title: "Bashir Ismail (Fancy) — Technology Entrepreneur & Startup Founder | Nigeria",
  description:
    "Bashir Ismail, known as Fancy, is a Nigerian technology entrepreneur, startup founder, AI engineer, and product builder. Founder of Fancy Digitals, SafetyGrid, and BeVibesHub.",
  keywords: [
    "Bashir Ismail",
    "Bashir Ismail founder",
    "Bashir Ismail technology entrepreneur",
    "Bashir Ismail AI engineer",
    "Bashir Ismail startup founder Nigeria",
    "Bashir Fancy",
    "Fancy Digitals founder",
    "Bashir Ismail Fancy Digitals",
    "SafetyGrid founder",
    "BeVibesHub founder",
    "Nigerian technology entrepreneur",
    "Nigerian startup founder",
    "AI engineer Nigeria",
    "product builder Nigeria",
    "digital product builder Africa",
    "Fancy Digitals Nigeria",
    "Nigerian SaaS founder",
    "AI tools founder Nigeria",
    "best web designer Nigeria",
    "Lagos tech founder",
    "Bashir Ismail digital studio",
    "African tech entrepreneur",
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "Bashir Ismail — Technology Entrepreneur & Startup Founder",
    description:
      "Founder of Fancy Digitals, SafetyGrid, and BeVibesHub. Building AI-powered software, digital tools, and technology companies from Africa.",
    url: `${BASE_URL}/about`,
    type: "profile",
    images: [
      {
        url: `${BASE_URL}/images/founder.jpg`,
        width: 1200,
        height: 630,
        alt: "Bashir Ismail (Fancy), Technology Entrepreneur and Startup Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bashir Ismail — Technology Entrepreneur & Startup Founder",
    description:
      "Founder of Fancy Digitals, SafetyGrid, and BeVibesHub. Building technology companies from Africa.",
    images: [`${BASE_URL}/images/founder.jpg`],
  },
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bashir Ismail",
    alternateName: ["Fancy", "Bashir Fancy", "Bashir Ismail Fancy"],
    jobTitle: "Technology Entrepreneur, Startup Founder & AI Engineer",
    description:
      "Bashir Ismail is a Nigerian technology entrepreneur, startup founder, AI engineer, and digital product builder. He is the founder of Fancy Digitals, SafetyGrid, and BeVibesHub.",
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/images/founder.jpg`,
    nationality: { "@type": "Country", name: "Nigeria" },
    sameAs: [
      "https://fancydigitals.com.ng",
      "https://wa.me/2349034360785",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Fancy Digitals",
      url: BASE_URL,
    },
    founder: [
  { "@type": "Organization", name: "Fancy Digitals", url: "https://fancydigitals.com.ng" },
  { "@type": "Organization", name: "SafetyGrid", url: "https://safetygrid.app" },
  { "@type": "Organization", name: "BeVibesHub", url: "https://bevibeshub.com.ng" },
],
    knowsAbout: [
      "Artificial Intelligence",
      "Software Engineering",
      "Frontend Engineering",
      "Product Design",
      "Brand Strategy",
      "SEO",
      "Digital Marketing",
      "Automation",
      "SaaS Development",
      "Public Safety Technology",
      "Digital Publishing",
    ],
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
      "A Nigerian digital agency and AI SaaS platform building AI-powered tools, landing pages, resumes, and digital infrastructure for founders and businesses worldwide.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressLocality: "Lagos",
    },
    sameAs: [
  "https://wa.me/2349034360785",
  "https://safetygrid.app",
  "https://bevibeshub.com.ng",
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
          text: "Bashir Ismail, known as Fancy, is a Nigerian technology entrepreneur, startup founder, AI engineer, and digital product builder. He is the founder of Fancy Digitals, SafetyGrid, and BeVibesHub — three independent technology ventures built to solve real-world problems.",
        },
      },
      {
        "@type": "Question",
        name: "What companies has Bashir Ismail founded?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bashir Ismail has founded three companies: Fancy Digitals (AI SaaS platform and digital agency), SafetyGrid (public safety technology), and BeVibesHub (digital publishing platform).",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Bashir Ismail work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bashir works with AI engineering, software development, frontend engineering (Next.js, React), SEO, product design, brand strategy, automation, and digital publishing systems.",
        },
      },
      {
        "@type": "Question",
        name: "How can I work with Bashir Ismail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Bashir through the Fancy Digitals website, by phone at +234 904 554 7761, or via WhatsApp at +234 903 436 0785.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About Bashir Ismail", item: `${BASE_URL}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutClient />
    </>
  );
}