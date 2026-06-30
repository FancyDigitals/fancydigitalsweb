import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";
import NewsletterForm from "@/components/NewsletterForm";

export const revalidate = 600;

export const metadata = {
  title: "Insights & Articles | Fancy Digitals",
  description:
    "Expert insights on AI marketing, web design, SEO, branding and digital growth strategies from Fancy Digitals.",
  alternates: {
    canonical: "https://fancydigitals.com.ng/blog",
  },
  openGraph: {
    title: "Insights & Articles | Fancy Digitals",
    description:
      "Expert insights on AI marketing, web design, SEO, branding and digital growth strategies.",
    url: "https://fancydigitals.com.ng/blog",
    siteName: "Fancy Digitals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Articles | Fancy Digitals",
    description:
      "Expert insights on AI marketing, web design, SEO, branding and digital growth strategies.",
  },
};

async function getPosts() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(*), blog_authors(display_name, avatar_url)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(50);

  return data || [];
}

async function getCategories() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_categories")
    .select("slug, name")
    .order("name", { ascending: true });

  return data || [];
}

async function getBanners() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("promo_banners")
    .select("*")
    .eq("active", true)
    .eq("show_on_blog", true)
    .order("display_order", { ascending: true });

  return data || [];
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

export default async function BlogPage(props) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams?.category;

  const [posts, categories, banners] = await Promise.all([
    getPosts(),
    getCategories(),
    getBanners(),
  ]);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.blog_categories?.slug === selectedCategory)
    : posts;

  // Featured post = first one marked featured, or first post
  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const restPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <main className="bg-white pt-20 pb-16 md:pt-28 md:pb-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#075a01] mb-3">
            Fancy Digitals Blog
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Insights & Strategy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Practical thinking on AI marketing, digital growth, branding systems,
            performance-driven websites and SEO frameworks.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 md:mb-14 pb-6 sm:pb-8 border-b border-gray-100">
            <Link
              href="/blog"
              className={`text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full border transition font-medium ${
                !selectedCategory
                  ? "bg-[#075a01] text-white border-[#075a01]"
                  : "text-gray-600 border-gray-200 hover:border-[#075a01]/30 hover:text-[#075a01]"
              }`}
            >
              All Articles
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={`text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full border transition font-medium ${
                  selectedCategory === cat.slug
                    ? "bg-[#075a01] text-white border-[#075a01]"
                    : "text-gray-600 border-gray-200 hover:border-[#075a01]/30 hover:text-[#075a01]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#075a01]/10">
              <span className="text-3xl">📝</span>
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              No articles {selectedCategory ? "in this category" : "yet"}
            </p>
            <p className="text-sm text-gray-500">
              {selectedCategory ? "Try a different category." : "Check back soon."}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post (Hero Card) */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block mb-12 md:mb-16 grid md:grid-cols-2 gap-6 md:gap-10 items-center"
              >
                {featuredPost.featured_image && (
                  <div className="relative aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      unoptimized
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {featuredPost.blog_categories && (
                      <span className="text-xs uppercase tracking-wider text-[#075a01] font-bold">
                        {featuredPost.blog_categories.name}
                      </span>
                    )}
                    <span className="inline-block px-2 py-0.5 bg-[#ff914d]/10 text-[#ff914d] rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4 group-hover:text-[#075a01] transition tracking-tight">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="text-base sm:text-lg text-gray-600 mb-5 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500">
                    {featuredPost.blog_authors?.display_name && (
                      <>
                        <span className="font-medium text-gray-700">
                          {featuredPost.blog_authors.display_name}
                        </span>
                        <span>·</span>
                      </>
                    )}
                    <span>{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
                    <span>·</span>
                    <span>{featuredPost.reading_time || 1} min read</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Two Column Grid: Articles + Sidebar */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

              {/* Articles Grid */}
              <div className="flex-1 min-w-0">
                {restPosts.length > 0 ? (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 tracking-tight">
                      Latest Articles
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                      {restPosts.map((post) => {
                        const image = post.featured_image;
                        const category = post.blog_categories;

                        return (
                          <article
                            key={post.id}
                            className="group"
                          >
                            <Link href={`/blog/${post.slug}`}>
                              {image && (
                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 sm:mb-5 shadow-sm">
                                  <Image
                                    src={image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    unoptimized
                                  />
                                </div>
                              )}
                            </Link>

                            <div>
                              {category && (
                                <span className="text-xs uppercase tracking-wider text-[#075a01] font-bold">
                                  {category.name}
                                </span>
                              )}
                              <Link href={`/blog/${post.slug}`}>
                                <h3 className="text-lg sm:text-xl font-bold leading-snug mt-2 mb-3 group-hover:text-[#075a01] transition line-clamp-2 tracking-tight">
                                  {post.title}
                                </h3>
                              </Link>
                              {post.excerpt && (
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                  {post.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{formatDate(post.published_at || post.created_at)}</span>
                                <span>·</span>
                                <span>{post.reading_time || 1} min read</span>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  // Empty state when only featured post exists
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#075a01]/10">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      More articles coming soon
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                      We&apos;re actively publishing new insights on AI marketing, web design, and growth.
                    </p>
                    <Link
                      href="/tools"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#075a01] hover:underline"
                    >
                      Try our free AI tools while you wait
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:w-[340px] lg:shrink-0">
                <div className="lg:sticky lg:top-28 space-y-5">
                  {banners.map((banner) => {
                    const styles = getStyleClasses(banner.style);

                    return (
                      <Link
                        key={banner.id}
                        href={banner.cta_url}
                        className={`group block relative overflow-hidden rounded-2xl p-6 transition ${styles.wrapper}`}
                      >
                        {banner.image_url && (
                          <div className="absolute inset-0 opacity-20">
                            <img
                              src={banner.image_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {(banner.style === "gradient_green" || banner.style === "dark_premium" || banner.style === "orange_glow") && (
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        )}
                        <div className="relative">
                          {banner.badge_text && (
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 ${styles.badge}`}>
                              {banner.badge_text}
                            </span>
                          )}
                          <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight">
                            {banner.title}
                          </h3>
                          {banner.description && (
                            <p className={`text-sm mb-4 leading-relaxed ${styles.description}`}>
                              {banner.description}
                            </p>
                          )}
                          <div className={`flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${styles.cta}`}>
                            {banner.cta_text}
                            <span>→</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}

                  {/* Newsletter */}
                  <div className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
                    <h3 className="text-lg font-bold mb-2">Get Growth Insights</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Weekly AI marketing tips for founders. No spam.
                    </p>
                    <NewsletterForm source="blog-list" />
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}

        {/* Conversion Section */}
        <div className="mt-24 md:mt-32 pt-16 md:pt-20 border-t border-gray-100 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
            Need expert guidance?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            We build AI-powered systems that convert traffic into measurable revenue.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-[#075a01] text-white rounded-xl text-sm font-semibold hover:bg-[#0a8f01] transition shadow-md hover:shadow-lg"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </main>
  );
}

function getStyleClasses(style) {
  switch (style) {
    case "gradient_green":
      return {
        wrapper: "bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white shadow-lg hover:shadow-xl",
        badge: "bg-white/20 text-white backdrop-blur",
        description: "text-white/90",
        cta: "",
      };
    case "white_card":
      return {
        wrapper: "bg-white border-2 border-gray-100 hover:border-[#ff914d] hover:shadow-lg text-gray-900",
        badge: "bg-[#ff914d]/10 text-[#ff914d]",
        description: "text-gray-600",
        cta: "text-[#ff914d]",
      };
    case "dark_premium":
      return {
        wrapper: "bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-lg hover:shadow-xl",
        badge: "bg-[#ff914d] text-white",
        description: "text-white/80",
        cta: "",
      };
    case "orange_glow":
      return {
        wrapper: "bg-[#ff914d] text-white shadow-lg hover:shadow-xl",
        badge: "bg-white/20 text-white",
        description: "text-white/90",
        cta: "",
      };
    default:
      return {
        wrapper: "bg-white border border-gray-100 text-gray-900",
        badge: "bg-gray-100 text-gray-700",
        description: "text-gray-600",
        cta: "",
      };
  }
}