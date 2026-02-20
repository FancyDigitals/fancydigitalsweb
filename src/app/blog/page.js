import Link from "next/link";

export const metadata = {
  title: "Blog | Fancy Digitals",
  description:
    "Insights on web design, SEO, branding, digital marketing and business growth from Fancy Digitals.",
};

async function getPosts() {
  const res = await fetch(
    "https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts?_embed",
    { next: { revalidate: 600 } } // cache for 10 minutes
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {posts.map((post) => {
          const image =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          const cleanTitle = post.title.rendered.replace(/<[^>]+>/g, "");

          return (
            <article
              key={post.id}
              className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              {image && (
                <img
                  src={image}
                  alt={cleanTitle}
                  className="w-full h-60 object-cover"
                />
              )}

              <div className="p-6">
                <h2
                  className="text-2xl font-semibold mb-4"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                />

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-green-600 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}