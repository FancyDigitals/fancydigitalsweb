import { tools } from "@/content/tools";
import { JOB_ROLES } from "@/data/job-roles";

const BASE_URL = "https://fancydigitals.com.ng";

export default async function sitemap() {

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.98,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.92,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/free-ai-resume-builder`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/web-design-nigeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/web-development-nigeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/seo-services-nigeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/graphics-design-nigeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${BASE_URL}/email-marketing-nigeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82,
    },
  ];

  // Tool pages — live tools get highest priority
  const toolPages = tools
    .filter((t) => t.published)
    .sort((a, b) => (a.order || 99) - (b.order || 99))
    .map((t) => ({
      url: `${BASE_URL}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: t.isLive ? "weekly" : "monthly",
      priority: t.isLive ? 0.95 : 0.65,
    }));

  // Portfolio static pages
  const portfolioPages = [
    "fancy-digitals-website",
    "feast-basket-ecommerce",
    "sibgahtullah",
    "tejurolex",
    "todma-brand-identity",
    "client-brand-system",
  ].map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.70,
  }));

  // ============ PROGRAMMATIC SEO PAGES ============
  // Resume pages — 50 high-volume job roles
  const resumePages = JOB_ROLES.map((role) => ({
  url: `${BASE_URL}/resume-for/${role.slug}`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.85,
}));

const coverLetterPages = JOB_ROLES.map((role) => ({
  url: `${BASE_URL}/cover-letter-for/${role.slug}`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.85,
}));

  // Blog posts from WordPress
  let blogUrls = [];
  try {
    const res = await fetch(
      "https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts?per_page=100&_fields=slug,modified",
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const posts = await res.json();
        if (Array.isArray(posts)) {
          blogUrls = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: post.modified || new Date(),
            changeFrequency: "monthly",
            priority: 0.75,
          }));
        }
      }
    }
  } catch {
    blogUrls = [];
  }

  return [
    ...staticPages,
    ...toolPages,
    ...portfolioPages,
    ...resumePages,        // ⬅️ 50 NEW resume SEO pages
    ...coverLetterPages,   // ⬅️ 50 NEW cover letter SEO pages
    ...blogUrls,
  ];
}