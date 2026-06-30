import AboutClient from "./client";
import Schema from "@/components/Schema";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const BASE_URL = "https://fancydigitals.com.ng";

export const metadata = {
  title: "Bashir Ismail (Fancy) — Technology Entrepreneur & AI Founder",
  description:
    "Bashir Ismail, known as Fancy, is a technology entrepreneur, AI engineer, and startup founder. Founder of Fancy Digitals (AI SaaS), SafetyGrid, and BeVibesHub. Building AI-powered software and digital tools for businesses worldwide.",
  keywords: [
    "Bashir Ismail",
    "Bashir Ismail founder",
    "Bashir Fancy",
    "Fancy Digitals founder",
    "Bashir Ismail Fancy Digitals",
    "SafetyGrid founder",
    "BeVibesHub founder",
    "AI engineer founder",
    "AI SaaS founder",
    "technology entrepreneur",
    "startup founder AI",
    "AI product builder",
    "AI tools founder",
    "Next.js engineer",
    "Lagos tech founder",
    "African tech entrepreneur",
    "AI marketing founder",
    "generative AI engineer",
    "Bashir Ismail digital studio",
    "Nigerian AI entrepreneur",
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "Bashir Ismail — Founder of Fancy Digitals, SafetyGrid & BeVibesHub",
    description:
      "Technology entrepreneur and AI engineer building AI-powered software, SaaS platforms, and digital tools for businesses worldwide.",
    url: `${BASE_URL}/about`,
    type: "profile",
    images: [
      {
        url: `${BASE_URL}/images/founder.jpg`,
        width: 1200,
        height: 630,
        alt: "Bashir Ismail (Fancy), Technology Entrepreneur and AI Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bashir Ismail — AI Founder & Technology Entrepreneur",
    description:
      "Founder of Fancy Digitals, SafetyGrid, and BeVibesHub. Building AI-powered tools for businesses worldwide.",
    images: [`${BASE_URL}/images/founder.jpg`],
  },
};

export default function AboutPage() {
  // ═══════════════════════════════════════════════════
  // PERSON SCHEMA — Maximum authority signals for AI
  // ═══════════════════════════════════════════════════
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/about#bashir`,
    name: "Bashir Ismail",
    alternateName: ["Fancy", "Bashir Fancy", "Bashir Ismail Fancy"],
    givenName: "Bashir",
    familyName: "Ismail",
    jobTitle: "Founder & AI Engineer",
    description:
      "Bashir Ismail (known as Fancy) is a technology entrepreneur, AI engineer, and digital product builder. He is the founder of Fancy Digitals (AI SaaS platform), SafetyGrid (public safety technology), and BeVibesHub (digital publishing platform). He specializes in building AI-powered software, SaaS infrastructure, and digital tools that serve businesses worldwide.",
    url: `${BASE_URL}/about`,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/founder.jpg`,
      width: 1200,
      height: 1200,
      caption: "Bashir Ismail, Founder of Fancy Digitals",
    },
    nationality: {
      "@type": "Country",
      name: "Nigeria",
    },
    homeLocation: {
      "@type": "Place",
      name: "Lagos, Nigeria",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
    },
    worksFor: [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Fancy Digitals",
        url: BASE_URL,
      },
    ],
    founder: [
      {
        "@type": "Organization",
        name: "Fancy Digitals",
        url: "https://fancydigitals.com.ng",
        description: "AI-powered SaaS platform and digital agency",
        foundingDate: "2024",
      },
      {
        "@type": "Organization",
        name: "SafetyGrid",
        url: "https://safetygrid.app",
        description: "Public safety technology platform",
      },
      {
        "@type": "Organization",
        name: "BeVibesHub",
        url: "https://bevibeshub.com.ng",
        description: "Digital publishing and lifestyle platform",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "AI Engineering",
      "Generative AI",
      "Large Language Models",
      "Software Engineering",
      "Frontend Engineering",
      "Next.js Development",
      "React Development",
      "SaaS Architecture",
      "Product Design",
      "Brand Strategy",
      "Search Engine Optimization",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "AI Visibility Optimization",
      "Digital Marketing",
      "Marketing Automation",
      "SaaS Development",
      "Public Safety Technology",
      "Digital Publishing",
      "Conversion Optimization",
      "Landing Page Design",
      "AI-Powered Tool Development",
    ],
    knowsLanguage: ["English", "Yoruba", "Hausa"],
    sameAs: [
      "https://fancydigitals.com.ng",
      "https://safetygrid.app",
      "https://bevibeshub.com.ng",
      "https://wa.me/2349034360785",
      "https://twitter.com/fancydigitalsng",
      "https://linkedin.com/in/bashir-ismail",
      "https://instagram.com/fancydigitalsng",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-904-554-7761",
      contactType: "Customer Service",
      email: "fancydigitalsng@gmail.com",
      availableLanguage: "English",
      areaServed: "Worldwide",
    },
    award: [
      "Founder of 3 technology companies",
      "Built AI-powered SaaS platform serving global users",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Technology Entrepreneur & AI Engineer",
      occupationalCategory: "15-1252.00", // BLS code for Software Developers
      skills: [
        "AI Engineering",
        "Next.js",
        "React",
        "SaaS Architecture",
        "Product Design",
        "Brand Strategy",
        "SEO",
      ],
    },
  };

  // ═══════════════════════════════════════════════════
  // ORGANIZATION SCHEMA — Fancy Digitals (enhanced)
  // ═══════════════════════════════════════════════════
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Fancy Digitals",
    alternateName: "Fancy Digitals Studio",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.png`,
    founder: {
      "@type": "Person",
      "@id": `${BASE_URL}/about#bashir`,
      name: "Bashir Ismail",
      alternateName: "Fancy",
    },
    foundingDate: "2024",
    foundingLocation: {
      "@type": "Place",
      name: "Lagos, Nigeria",
    },
    description:
      "Modern AI-powered digital studio offering free AI tools (Landing Page Generator, Resume Builder, Cover Letter Generator, AI Visibility Checker) and full-service agency solutions including web design, branding, SEO, app development, and AI automation for businesses worldwide.",
    slogan: "The all-in-one AI-powered digital studio",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressRegion: "Lagos",
      addressLocality: "Lagos",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+234-904-554-7761",
        contactType: "Customer Service",
        email: "fancydigitalsng@gmail.com",
        availableLanguage: "English",
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        telephone: "+234-903-436-0785",
        contactType: "Sales",
        contactOption: "WhatsApp",
        availableLanguage: "English",
      },
    ],
    sameAs: [
      "https://wa.me/2349034360785",
      "https://twitter.com/fancydigitalsng",
      "https://linkedin.com/company/fancy-digitals",
      "https://instagram.com/fancydigitalsng",
      "https://safetygrid.app",
      "https://bevibeshub.com.ng",
    ],
    knowsAbout: [
      "AI Tools",
      "AI Landing Page Generation",
      "AI Resume Building",
      "AI Cover Letter Writing",
      "AI Visibility Optimization",
      "Generative Engine Optimization",
      "Web Design",
      "Web Development",
      "Brand Identity",
      "SEO",
      "App Development",
      "AI Automation",
      "Email Marketing",
      "Digital Marketing",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Worldwide",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services & AI Tools",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Landing Page Generator",
            url: `${BASE_URL}/free-ai-landing-page-generator`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Resume Builder",
            url: `${BASE_URL}/free-ai-resume-builder`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Cover Letter Generator",
            url: `${BASE_URL}/free-ai-cover-letter`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Visibility Checker",
            url: `${BASE_URL}/free-ai-visibility-checker`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Web Design & Development" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Brand Identity Design" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "SEO Services" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "App Development" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI Automation" },
        },
      ],
    },
    employee: {
      "@type": "Person",
      "@id": `${BASE_URL}/about#bashir`,
      name: "Bashir Ismail",
      jobTitle: "Founder & AI Engineer",
    },
  };

  // ═══════════════════════════════════════════════════
  // PROFILE PAGE SCHEMA — Modern 2026 signal
  // ═══════════════════════════════════════════════════
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/about#profilepage`,
    mainEntity: {
      "@id": `${BASE_URL}/about#bashir`,
    },
    url: `${BASE_URL}/about`,
    name: "About Bashir Ismail — Founder of Fancy Digitals",
    description:
      "Profile page for Bashir Ismail, technology entrepreneur and founder of Fancy Digitals, SafetyGrid, and BeVibesHub.",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  // ═══════════════════════════════════════════════════
  // ABOUT PAGE SCHEMA — Tells AI this is the canonical About
  // ═══════════════════════════════════════════════════
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about#aboutpage`,
    url: `${BASE_URL}/about`,
    name: "About Fancy Digitals & Founder Bashir Ismail",
    description:
      "Learn about Fancy Digitals, founded by Bashir Ismail (Fancy) — a modern AI-powered digital studio offering free AI tools and premium agency services for businesses worldwide.",
    mainEntity: {
      "@id": `${BASE_URL}/about#bashir`,
    },
    about: [
      {
        "@id": `${BASE_URL}/#organization`,
      },
      {
        "@id": `${BASE_URL}/about#bashir`,
      },
    ],
  };

  // ═══════════════════════════════════════════════════
  // FAQ SCHEMA — Enhanced with more questions
  // ═══════════════════════════════════════════════════
  const faqSchemaData = faqSchema([
    {
      question: "Who is Bashir Ismail?",
      answer:
        "Bashir Ismail, known as Fancy, is a technology entrepreneur, AI engineer, and digital product builder. He is the founder of Fancy Digitals (AI SaaS platform and digital agency), SafetyGrid (public safety technology), and BeVibesHub (digital publishing platform). Based in Lagos, Nigeria, he builds AI-powered software and digital tools that serve businesses worldwide.",
    },
    {
      question: "What is Fancy Digitals?",
      answer:
        "Fancy Digitals is a modern AI-powered digital studio founded by Bashir Ismail. It offers free AI tools including an AI Landing Page Generator, AI Resume Builder, AI Cover Letter Generator, and AI Visibility Checker, plus full-service agency offerings like web design, branding, SEO, app development, and AI automation. It serves businesses globally.",
    },
    {
      question: "What companies has Bashir Ismail founded?",
      answer:
        "Bashir Ismail has founded three technology companies: Fancy Digitals (AI SaaS platform and digital studio), SafetyGrid (public safety technology platform), and BeVibesHub (digital publishing and lifestyle platform). Each addresses a different real-world problem with technology.",
    },
    {
      question: "What does Bashir Ismail specialize in?",
      answer:
        "Bashir Ismail specializes in artificial intelligence engineering, SaaS architecture, Next.js and React development, product design, brand strategy, search engine optimization, generative engine optimization (GEO), AI visibility optimization, and digital marketing automation. He builds end-to-end AI products from concept to global launch.",
    },
    {
      question: "How can I work with Bashir Ismail or Fancy Digitals?",
      answer:
        "You can contact Bashir and the Fancy Digitals team through the website at fancydigitals.com.ng, by email at fancydigitalsng@gmail.com, by phone at +234 904 554 7761, or via WhatsApp at +234 903 436 0785. Fancy Digitals serves clients worldwide.",
    },
    {
      question: "Where is Fancy Digitals based?",
      answer:
        "Fancy Digitals is headquartered in Lagos, Nigeria, but operates globally. The company's AI tools are accessible to anyone worldwide, and the agency services are delivered remotely to clients across Africa, North America, Europe, and Asia.",
    },
    {
      question: "Is Fancy Digitals legitimate?",
      answer:
        "Yes. Fancy Digitals is a registered technology company founded in 2024 by Bashir Ismail. It operates a production SaaS platform serving thousands of users worldwide, with verified payment processing, secure cloud infrastructure, and full transparency around its founder and operations.",
    },
  ]);

  // ═══════════════════════════════════════════════════
  // BREADCRUMB
  // ═══════════════════════════════════════════════════
  const breadcrumbData = breadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "About Bashir Ismail", url: `${BASE_URL}/about` },
  ]);

  return (
    <>
      <Schema data={personSchema} />
      <Schema data={orgSchema} />
      <Schema data={profilePageSchema} />
      <Schema data={aboutPageSchema} />
      <Schema data={faqSchemaData} />
      <Schema data={breadcrumbData} />
      <AboutClient />
    </>
  );
}