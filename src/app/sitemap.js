import { tools } from "@/content/tools";

export default async function sitemap() {
  const baseUrl = "https://fancydigitals.com.ng";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
  ];

  const toolPages = tools
    .filter((t) => t.published)
    .map((t) => ({
      url: `${baseUrl}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: t.isLive ? "weekly" : "monthly",
      priority: t.isLive ? 0.9 : 0.6,
    }));

  let blogUrls = [];
  try {
    const res = await fetch(
      "https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts?per_page=50",
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const posts = await res.json();
        if (Array.isArray(posts)) {
          blogUrls = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.modified,
            changeFrequency: "monthly",
            priority: 0.7,
          }));
        }
      }
    }
  } catch {
    blogUrls = [];
  }

  return [...staticPages, ...toolPages, ...blogUrls];
}