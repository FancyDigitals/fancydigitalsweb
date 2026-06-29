import { tools } from "@/content/tools";
import { JOB_ROLES } from "@/data/job-roles";

const BASE_URL = "https://fancydigitals.com.ng";

export default async function sitemap() {
  const now = new Date();

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.98,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/free-ai-resume-builder`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/free-ai-cover-letter`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    // ✅ HUB PAGES (IMPORTANT)
    {
      url: `${BASE_URL}/resume-for`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${BASE_URL}/cover-letter-for`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.92,
    },
  ];

  // Tool pages
  const toolPages = tools
    .filter((t) => t.published)
    .sort((a, b) => (a.order || 99) - (b.order || 99))
    .map((t) => ({
      url: `${BASE_URL}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: t.isLive ? "weekly" : "monthly",
      priority: t.isLive ? 0.95 : 0.65,
    }));

  // ✅ Programmatic Role Pages
  const resumePages = JOB_ROLES.map((role) => ({
    url: `${BASE_URL}/resume-for/${role.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const coverLetterPages = JOB_ROLES.map((role) => ({
    url: `${BASE_URL}/cover-letter-for/${role.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...resumePages,
    ...coverLetterPages,
  ];
}