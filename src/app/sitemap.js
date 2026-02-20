export default async function sitemap() {
  const baseUrl = "https://fancydigitals.com.ng";

  // Fetch blog posts
  const res = await fetch(
    "https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts",
    { next: { revalidate: 3600 } }
  );

  const posts = await res.json();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.modified,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}