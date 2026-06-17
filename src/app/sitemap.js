export default async function sitemap() {
  const baseUrl = "https://fancydigitals.com.ng";

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/tools`, lastModified: new Date() },
    { url: `${baseUrl}/tools/seo-meta-tag-generator`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio`, lastModified: new Date() },
  ];

  let blogUrls = [];

  try {
    const res = await fetch(
      "https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts",
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
          }));
        }
      }
    }
  } catch {
    blogUrls = [];
  }

  return [...staticPages, ...blogUrls];
}