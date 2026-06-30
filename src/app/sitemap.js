export const revalidate = 3600; // Rebuild every hour
import { tools } from "@/content/tools";
import { JOB_ROLES } from "@/data/job-roles";
import { createAdminClient } from "@/lib/supabase/admin";

const BASE_URL = "https://fancydigitals.com.ng";

// Fetch all published blog posts
async function getBlogPosts() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at, featured")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    return data || [];
  } catch {
    return [];
  }
}

// Fetch all published portfolio projects
async function getPortfolioProjects() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("portfolio_projects")
      .select("slug, updated_at, published_at, featured")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    return data || [];
  } catch {
    return [];
  }
}

// Fetch all blog categories
async function getBlogCategories() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("blog_categories")
      .select("slug")
      .order("name", { ascending: true });

    return data || [];
  } catch {
    return [];
  }
}

// Fetch all portfolio categories
async function getPortfolioCategories() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("portfolio_categories")
      .select("slug")
      .order("name", { ascending: true });

    return data || [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  // Fetch all dynamic content in parallel
  const [blogPosts, portfolioProjects, blogCategories, portfolioCategories] =
    await Promise.all([
      getBlogPosts(),
      getPortfolioProjects(),
      getBlogCategories(),
      getPortfolioCategories(),
    ]);

  // ═══════════════════════════════════════
  // TIER 1 — Homepage & Money Pages (Priority 1.0 - 0.95)
  // ═══════════════════════════════════════
  const tier1Pages = [
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
    {
      url: `${BASE_URL}/free-ai-landing-page-generator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/free-ai-visibility-checker`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  // ═══════════════════════════════════════
  // TIER 2 — Hubs & Content Indexes (Priority 0.92 - 0.88)
  // ═══════════════════════════════════════
  const tier2Pages = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.92,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.92,
    },
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
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // ═══════════════════════════════════════
  // TIER 3 — Tool Pages (from CMS)
  // ═══════════════════════════════════════
  const toolPages = tools
    .filter((t) => t.published)
    .sort((a, b) => (a.order || 99) - (b.order || 99))
    .map((t) => ({
      url: `${BASE_URL}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: t.isLive ? "weekly" : "monthly",
      priority: t.isLive ? 0.90 : 0.65,
    }));

  // ═══════════════════════════════════════
  // TIER 4 — Blog Posts (Dynamic from Supabase)
  // ═══════════════════════════════════════
  const blogPostPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : (post.published_at ? new Date(post.published_at) : now),
    changeFrequency: "weekly",
    priority: post.featured ? 0.85 : 0.78,
  }));

  // ═══════════════════════════════════════
  // TIER 5 — Portfolio Projects (Dynamic from Supabase)
  // ═══════════════════════════════════════
  const portfolioProjectPages = portfolioProjects.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.slug}`,
    lastModified: project.updated_at ? new Date(project.updated_at) : (project.published_at ? new Date(project.published_at) : now),
    changeFrequency: "monthly",
    priority: project.featured ? 0.82 : 0.75,
  }));

  // ═══════════════════════════════════════
  // TIER 6 — Blog Categories (Dynamic)
  // ═══════════════════════════════════════
  const blogCategoryPages = blogCategories.map((cat) => ({
    url: `${BASE_URL}/blog?category=${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.72,
  }));

  // ═══════════════════════════════════════
  // TIER 7 — Portfolio Categories (Dynamic)
  // ═══════════════════════════════════════
  const portfolioCategoryPages = portfolioCategories.map((cat) => ({
    url: `${BASE_URL}/portfolio?category=${cat.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.70,
  }));

  // ═══════════════════════════════════════
  // TIER 8 — Programmatic Role Pages (100 pages)
  // ═══════════════════════════════════════
  const resumePages = JOB_ROLES.map((role) => ({
    url: `${BASE_URL}/resume-for/${role.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.80,
  }));

  const coverLetterPages = JOB_ROLES.map((role) => ({
    url: `${BASE_URL}/cover-letter-for/${role.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.80,
  }));

  // ═══════════════════════════════════════
  // TIER 9 — Legal & Utility Pages
  // ═══════════════════════════════════════
  const legalPages = [
    {
      url: `${BASE_URL}/signin`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.40,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.50,
    },
  ];

  // ═══════════════════════════════════════
  // COMBINE ALL — Strategic order for crawlers
  // ═══════════════════════════════════════
  return [
    ...tier1Pages,           // Money pages first
    ...tier2Pages,           // Hubs & indexes
    ...toolPages,            // Individual tools
    ...blogPostPages,        // Latest blog content
    ...portfolioProjectPages, // Portfolio case studies
    ...blogCategoryPages,    // Blog category filters
    ...portfolioCategoryPages, // Portfolio category filters
    ...resumePages,          // 50 resume role pages
    ...coverLetterPages,     // 50 cover letter role pages
    ...legalPages,           // Lowest priority
  ];
}