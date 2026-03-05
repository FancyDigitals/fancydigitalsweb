import Link from "next/link";
import Image from "next/image";

const API_URL =
  "https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts?_embed&per_page=12";

export const metadata = {
  title: "Insights & Articles | Fancy Digitals",
  description:
    "Expert insights on web design, SEO, branding and digital growth strategies from Fancy Digitals.",
  alternates: {
    canonical: "https://fancydigitals.com.ng/blog",
  },
  openGraph: {
    title: "Insights & Articles | Fancy Digitals",
    description:
      "Expert insights on web design, SEO, branding and digital growth strategies.",
    url: "https://fancydigitals.com.ng/blog",
    siteName: "Fancy Digitals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Articles | Fancy Digitals",
    description:
      "Expert insights on web design, SEO, branding and digital growth strategies.",
  },
};

async function getPosts() {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 600 },
    });

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}

function stripHTML(html = "") {
  return html.replace(/<[^>]*>?/gm, "");
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

function extractCategories(posts) {
  const map = new Map();

  posts.forEach((post) => {
    const terms = post._embedded?.["wp:term"]?.[0] || [];
    terms.forEach((term) => {
      if (term.taxonomy === "category") {
        map.set(term.slug, term.name);
      }
    });
  });

  return Array.from(map.entries()).map(([slug, name]) => ({
    slug,
    name,
  }));
}

export default async function BlogPage(props) {
  const posts = await getPosts();

  const searchParams = await props.searchParams;
  const selectedCategory = searchParams?.category;

  const categories = extractCategories(posts).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post._embedded?.["wp:term"]?.[0]?.some(
          (term) =>
            term.taxonomy === "category" &&
            term.slug === selectedCategory
        )
      )
    : posts;

  return (
    <main className="bg-white pt-28 pb-32">
      <section className="max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Insights & Strategy
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Practical thinking on digital growth, branding systems,
            performance-driven websites and SEO frameworks.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-16 border-b pb-8">
            <Link
              href="/blog"
              className={`text-sm px-5 py-2 rounded-full border transition ${
                !selectedCategory
                  ? "bg-black text-white border-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={`text-sm px-5 py-2 rounded-full border transition ${
                  selectedCategory === cat.slug
                    ? "bg-black text-white border-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No articles found for this category.
          </div>
        ) : (
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const image =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

              const categories =
                post._embedded?.["wp:term"]?.[0]?.filter(
                  (term) => term.taxonomy === "category"
                ) || [];

              const primaryCategory = categories[0];

              const cleanTitle = stripHTML(post.title.rendered);
              const cleanExcerpt = stripHTML(post.excerpt.rendered);

              return (
                <article
                  key={post.id}
                  className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
                    {image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={image}
                          alt={cleanTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    )}
                  </Link>

                  <div className="p-6">

                    {primaryCategory && (
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        {primaryCategory.name}
                      </span>
                    )}

                    <h2 className="text-lg font-semibold leading-snug mt-3 mb-3 group-hover:underline">
                      {cleanTitle}
                    </h2>

                    <p className="text-sm text-gray-600 mb-5 line-clamp-3">
                      {cleanExcerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-5">
                      <span>{formatDate(post.date)}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium underline underline-offset-4"
                    >
                      Read article
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Conversion Section */}
        <div className="mt-32 pt-20 border-t text-center">
          <h3 className="text-3xl font-semibold mb-6">
            Need expert guidance?
          </h3>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto text-lg">
            We build scalable digital systems that convert traffic into
            measurable revenue.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-black text-white rounded-lg text-sm font-medium"
          >
            Start a Project
          </Link>
        </div>

      </section>
    </main>
  );
}