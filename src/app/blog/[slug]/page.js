export const dynamicParams = true;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import NewsletterForm from "@/components/NewsletterForm";

/* ===============================
   Data Fetching (Supabase)
================================= */

async function getPost(slug) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(*), blog_authors(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

async function getRelatedPosts(categoryId, currentSlug) {
  if (!categoryId) return [];

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, featured_image, published_at")
    .eq("status", "published")
    .eq("category_id", categoryId)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(3);

  return data || [];
}

async function getAllSlugs() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  return data || [];
}

export async function generateStaticParams() {
  const posts = await getAllSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

/* ===============================
   Helpers
================================= */

function formatDate(dateString) {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

/* ===============================
   Metadata
================================= */

export async function generateMetadata(props) {
  const params = await props.params;
  const post = await getPost(params.slug);
  if (!post) return {};

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const image = post.og_image || post.featured_image;

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
   Sidebar Component (reusable)
================================= */

function Sidebar() {
  return (
    <div className="space-y-5">
      {/* PROMO 1: AI Landing Page Generator */}
      <Link
        href="/dashboard/tools/ai-landing-page-generator"
        className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 text-white shadow-lg hover:shadow-xl transition"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative">
          <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur rounded text-xs font-bold uppercase tracking-wider mb-3">
            Featured
          </span>
          <h3 className="text-xl font-bold mb-2 leading-tight">
            Build a Landing Page in 60 Seconds
          </h3>
          <p className="text-sm text-white/90 mb-4 leading-relaxed">
            AI generates 9 sections, 6 tones, 5 languages — no code needed.
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
            Try Free
            <span>→</span>
          </div>
        </div>
      </Link>

      {/* PROMO 2: AI Resume Builder */}
      <Link
        href="/free-ai-resume-builder"
        className="group block relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 p-6 hover:border-[#ff914d] hover:shadow-lg transition"
      >
        <h3 className="text-lg font-bold mb-2 leading-tight text-gray-900">
          Free AI Resume Builder
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Land your dream job. Build an ATS-friendly resume in minutes.
        </p>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#ff914d] group-hover:gap-3 transition-all">
          Start Building
          <span>→</span>
        </div>
      </Link>

      {/* PROMO 3: AI Visibility Scanner */}
      <Link
        href="/free-ai-visibility-checker"
        className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white shadow-lg hover:shadow-xl transition"
      >
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ff914d]/20 rounded-full"></div>
        <div className="relative">
          <span className="inline-block px-2 py-1 bg-[#ff914d] rounded text-xs font-bold uppercase tracking-wider mb-3">
            New
          </span>
          <h3 className="text-xl font-bold mb-2 leading-tight">
            Is Your Site AI-Ready?
          </h3>
          <p className="text-sm text-white/80 mb-4 leading-relaxed">
            Get a free AI Visibility Score. See how ChatGPT sees your business.
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
            Scan Now
            <span>→</span>
          </div>
        </div>
      </Link>

            {/* NEWSLETTER (always visible) */}
      <div className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
        <h3 className="text-lg font-bold mb-2">Get Growth Insights</h3>
        <p className="text-sm text-gray-600 mb-4">
          Weekly AI marketing tips for founders. No spam.
        </p>
        <NewsletterForm source="blog-post" />
      </div>
    </div>
  );
}

/* ===============================
   Page
================================= */

export default async function PostPage(props) {
  const params = await props.params;
  const post = await getPost(params.slug);
  if (!post) return notFound();

  const related = await getRelatedPosts(post.category_id, post.slug);

  const image = post.featured_image;
  const author = post.blog_authors;
  const category = post.blog_categories;
  const readingTime = `${post.reading_time || 1} min read`;

  // Increment view count (fire and forget)
  const supabase = createAdminClient();
  supabase
    .from("blog_posts")
    .update({ views: (post.views || 0) + 1 })
    .eq("id", post.id)
    .then(() => {});

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image,
    author: {
      "@type": "Person",
      name: author?.display_name || "Fancy Digitals",
    },
    publisher: {
      "@type": "Organization",
      name: "Fancy Digitals",
      logo: {
        "@type": "ImageObject",
        url: "https://fancydigitals.com.ng/logo.png",
      },
    },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
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
        name: post.title,
        item: `https://fancydigitals.com.ng/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="bg-white pt-20 pb-16 md:pt-28 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-gray-500 overflow-hidden">
          <Link href="/" className="hover:text-[#075a01]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-[#075a01]">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{post.title.slice(0, 40)}{post.title.length > 40 ? "..." : ""}</span>
        </nav>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

          {/* MAIN ARTICLE */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Hero */}
            <header className="mb-8 md:mb-10">
              {category && (
                <Link
                  href={`/blog?category=${category.slug}`}
                  className="inline-block text-xs uppercase tracking-wider text-[#075a01] font-bold mb-3 hover:underline"
                >
                  {category.name}
                </Link>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 tracking-tight text-gray-900">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 text-xs sm:text-sm text-gray-500">
                {author && (
                  <>
                    <span className="font-medium text-gray-700">{author.display_name}</span>
                    <span>·</span>
                  </>
                )}
                <span>{formatDate(post.published_at || post.created_at)}</span>
                <span>·</span>
                <span>{readingTime}</span>
              </div>

              {image && (
                <div className="relative aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    priority
                    unoptimized
                  />
                </div>
              )}
            </header>

            {/* MOBILE SIDEBAR — appears after hero on mobile */}
            <div className="lg:hidden mb-10">
              <Sidebar />
            </div>

            {/* Content */}
            <div
              className="prose prose-base sm:prose-lg prose-neutral max-w-none mb-10 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#075a01] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-[#075a01] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            {/* CTA BUTTON */}
            {post.cta_text && post.cta_url && (
              <div className="my-12 p-8 sm:p-10 bg-gradient-to-br from-[#075a01] to-[#0a8f01] rounded-2xl text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff914d]/20 rounded-full -ml-16 -mb-16"></div>
                <div className="relative">
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">Ready to take action?</p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                    Get started in 30 seconds
                  </h3>
                  <a
                    href={post.cta_url}
                    target={post.cta_url.startsWith("http") ? "_blank" : "_self"}
                    rel={post.cta_url.startsWith("http") ? "noopener noreferrer" : ""}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#075a01] rounded-full text-base font-bold hover:bg-gray-50 hover:scale-[1.02] transition shadow-xl"
                  >
                    {post.cta_text}
                    <span>→</span>
                  </a>
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Card */}
            {author && (
              <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 bg-gray-50 rounded-2xl mb-12">
                {author.avatar_url ? (
                  <Image
                    src={author.avatar_url}
                    alt={author.display_name}
                    width={56}
                    height={56}
                    className="rounded-full shrink-0"
                    unoptimized
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#075a01] to-[#0a8f01] flex items-center justify-center text-white font-bold text-xl sm:text-2xl shrink-0">
                    {author.display_name?.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-base sm:text-lg">{author.display_name}</p>
                  {author.role && (
                    <p className="text-xs sm:text-sm text-[#075a01] font-medium mb-2">{author.role}</p>
                  )}
                  {author.bio && (
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                  )}
                </div>
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 tracking-tight">
                  Related Articles
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug}`}
                      className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-200 transition"
                    >
                      {item.featured_image && (
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={item.featured_image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                            sizes="(max-width: 640px) 100vw, 33vw"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="p-4 sm:p-5">
                        <h3 className="font-semibold text-sm sm:text-base group-hover:text-[#075a01] line-clamp-2 transition">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* DESKTOP SIDEBAR — fixed width 340px, sticky */}
          <aside className="hidden lg:block w-[340px] shrink-0">
            <div className="sticky top-28">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}