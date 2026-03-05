export const dynamicParams = true;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_BASE =
  "https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts";

/* ===============================
   Data Fetching
================================= */

async function getAllPosts() {
  try {
    const res = await fetch(`${API_BASE}?_embed&per_page=50`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getPost(slug) {
  try {
    const res = await fetch(
      `${API_BASE}?slug=${slug}&_embed`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/* ===============================
   Helpers
================================= */

function stripHTML(html = "") {
  return html.replace(/<[^>]*>?/gm, "");
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

function calculateReadingTime(content) {
  const text = stripHTML(content);
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/* ===============================
   Metadata
================================= */

export async function generateMetadata(props) {
  const params = await props.params;
  const post = await getPost(params.slug);
  if (!post) return {};

  const title = stripHTML(post.title.rendered);
  const description = stripHTML(post.excerpt.rendered);
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: `${title} | Fancy Digitals`,
    description,
    alternates: {
      canonical: `https://fancydigitals.com.ng/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://fancydigitals.com.ng/blog/${post.slug}`,
      type: "article",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

/* ===============================
   Page
================================= */

export default async function PostPage(props) {
  const params = await props.params;
  const post = await getPost(params.slug);
  if (!post) return notFound();

  const posts = await getAllPosts();

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const author = post._embedded?.author?.[0];

  const categories =
    post._embedded?.["wp:term"]?.[0]?.filter(
      (term) => term.taxonomy === "category"
    ) || [];

  const primaryCategory = categories[0];

  const cleanTitle = stripHTML(post.title.rendered);
  const cleanExcerpt = stripHTML(post.excerpt.rendered);
  const readingTime = calculateReadingTime(
    post.content.rendered
  );

  /* ===============================
     Related Posts
  ================================= */

  const related = posts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        primaryCategory &&
        p._embedded?.["wp:term"]?.[0]?.some(
          (term) =>
            term.taxonomy === "category" &&
            term.slug === primaryCategory.slug
        )
    )
    .slice(0, 3);

  /* ===============================
     Schemas
  ================================= */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cleanTitle,
    description: cleanExcerpt,
    image,
    author: {
      "@type": "Person",
      name: author?.name || "Fancy Digitals",
    },
    publisher: {
      "@type": "Organization",
      name: "Fancy Digitals",
      logo: {
        "@type": "ImageObject",
        url: "https://fancydigitals.com.ng/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.modified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://fancydigitals.com.ng/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://fancydigitals.com.ng/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cleanTitle,
        item: `https://fancydigitals.com.ng/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="bg-white pt-28 pb-32">
      <article className="max-w-4xl mx-auto px-6">

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        {/* Hero */}
        <header className="mb-14">

          {primaryCategory && (
            <span className="text-xs uppercase tracking-wide text-gray-500">
              {primaryCategory.name}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mt-4 mb-6">
            {cleanTitle}
          </h1>

          <p className="text-sm text-gray-400 mb-8">
            {formatDate(post.date)} • {readingTime}
          </p>

          {image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={cleanTitle}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-neutral max-w-none mb-16"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />

        {/* Mid CTA */}
        <div className="my-20 p-10 bg-gray-50 rounded-2xl text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Need help implementing this?
          </h3>
          <p className="text-gray-600 mb-6">
            We build performance-driven websites and SEO systems that
            generate measurable growth.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-black text-white rounded-lg text-sm font-medium"
          >
            Talk to Us
          </Link>
        </div>

        {/* Author Block */}
        {author && (
          <div className="flex items-center gap-4 border-t pt-8 mb-20">
            {author.avatar_urls?.["96"] && (
              <Image
                src={author.avatar_urls["96"]}
                alt={author.name}
                width={60}
                height={60}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-sm text-gray-500">
                Contributor at Fancy Digitals
              </p>
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-8">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group border border-gray-100 rounded-xl p-6 hover:shadow-sm transition"
                >
                  <h3 className="font-medium group-hover:underline">
                    {stripHTML(item.title.rendered)}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Strong End CTA */}
        <div className="mt-32 pt-20 border-t text-center">
          <h3 className="text-3xl font-semibold mb-6">
            Ready to grow your business?
          </h3>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-black text-white rounded-lg text-sm font-medium"
          >
            Start Your Project
          </Link>
        </div>

      </article>
    </main>
  );
}