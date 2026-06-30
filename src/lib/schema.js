const BASE_URL = "https://fancydigitals.com.ng";
const ORG_NAME = "Fancy Digitals";
const ORG_LOGO = `${BASE_URL}/logo.png`;
const FOUNDER = "Bashir Ismail";

/* ===============================
   ORGANIZATION SCHEMA
================================= */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: ORG_NAME,
    alternateName: "Fancy Digitals Studio",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO,
      width: 512,
      height: 512,
    },
    image: ORG_LOGO,
    description:
      "Modern digital studio offering AI-powered tools and full-service agency solutions including web design, branding, SEO, app development, and AI automation for businesses worldwide.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: FOUNDER,
      url: `${BASE_URL}/about`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-903-436-0785",
      contactType: "Customer Service",
      email: "fancydigitalsng@gmail.com",
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
    sameAs: [
      "https://twitter.com/fancydigitalsng",
      "https://linkedin.com/company/fancy-digitals",
      "https://instagram.com/fancydigitalsng",
    ],
    knowsAbout: [
      "AI Marketing",
      "Web Design",
      "Branding",
      "Search Engine Optimization",
      "App Development",
      "AI Automation",
      "Email Marketing",
      "Landing Page Generation",
      "AI Visibility Optimization",
      "Generative Engine Optimization",
    ],
    slogan: "The all-in-one AI-powered digital studio",
  };
}

/* ===============================
   WEBSITE SCHEMA (with search)
================================= */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: ORG_NAME,
    description:
      "AI-powered digital studio for modern businesses — tools, design, development, and growth.",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "en-US",
  };
}

/* ===============================
   ARTICLE SCHEMA (blog posts)
================================= */
export function articleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.seo_description,
    image: post.featured_image || post.og_image,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.blog_authors?.display_name || FOUNDER,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    articleSection: post.blog_categories?.name,
    wordCount: post.content?.replace(/<[^>]*>/g, "").split(/\s+/).length,
  };
}

/* ===============================
   BREADCRUMB SCHEMA
================================= */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ===============================
   FAQ SCHEMA
================================= */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ===============================
   SERVICE SCHEMA
================================= */
export function serviceSchema({ name, description, slug, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    areaServed: "Worldwide",
    url: `${BASE_URL}/${slug}`,
    image: image || ORG_LOGO,
  };
}

/* ===============================
   SOFTWARE APPLICATION SCHEMA (tools)
================================= */
export function softwareApplicationSchema({
  name,
  description,
  slug,
  category = "BusinessApplication",
  image,
  price = "0",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category,
    operatingSystem: "Web Browser",
    url: `${BASE_URL}/${slug}`,
    image: image || ORG_LOGO,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
    creator: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}


/* ===============================
   PRODUCT SCHEMA (for paid plans)
================================= */
export function productSchema({ name, description, price, slug }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: {
      "@id": `${BASE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/${slug}`,
    },
  };
}

/* ===============================
   HELPER — Inject multiple schemas as one
================================= */
export function combineSchemas(...schemas) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((s) => {
      const { "@context": ctx, ...rest } = s;
      return rest;
    }),
  };
}