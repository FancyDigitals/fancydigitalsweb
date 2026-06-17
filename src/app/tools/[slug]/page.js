import { tools } from "@/content/tools";
import { notFound } from "next/navigation";
import SEOMetaGenerator from "@/components/tools/live/SEOMetaGenerator";
import WordCounter from "@/components/tools/live/WordCounter";
import WaitlistForm from "@/components/WaitlistForm";
import Link from "next/link";

export async function generateStaticParams() {
  return tools
    .filter((t) => t.published)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool Not Found | Fancy Digitals" };
  return {
    title: `${tool.name} — Free Tool | Fancy Digitals`,
    description: tool.desc,
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug && t.published);

  if (!tool) return notFound();

  const otherTools = tools
    .filter((t) => t.published && t.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fafafa]">

      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-sm px-5 py-3 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">Fancy</span>
          <span className="text-lg font-bold text-[#075a01]">Digitals</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className={`hidden sm:inline-flex rounded-full px-3 py-1 text-xs font-bold ${
            tool.isLive ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
          }`}>
            {tool.status}
          </span>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
        </div>
      </header>

      {/* TOOL HEADER */}
      <section className="pt-24 pb-8 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {tool.category}
                </span>
                <span className="text-gray-200">•</span>
                <span className="text-xs font-bold text-green-600">Free</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {tool.name}
              </h1>
              <p className="mt-1.5 text-sm text-gray-500 max-w-xl">
                {tool.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL BODY */}
      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-5xl">
          {tool.isLive ? (
            <>
              {slug === "seo-meta-tag-generator" && <SEOMetaGenerator />}
              {slug === "word-counter" && <WordCounter />}
            </>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-8 py-16 shadow-sm md:px-14">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-bold text-orange-700">
                    {tool.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  Get notified when this launches
                </h2>
                <p className="mt-3 text-sm text-gray-500">
                  This tool is being built. Join the waitlist and we will
                  notify you the moment it goes live.
                </p>
                <WaitlistForm toolName={tool.name} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHAT IT DOES + WHO IT'S FOR */}
      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-gray-900">
                What this tool does
              </h2>
              <ul className="space-y-2.5">
                {tool.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#075a01]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-gray-900">
                Who it is for
              </h2>
              <ul className="space-y-2.5">
                {tool.whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#075a01]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER TOOLS */}
      {otherTools.length > 0 && (
        <section className="px-5 pb-20 md:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-base font-bold text-gray-900">
              Try other tools
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherTools.map((t) => (
                <a
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${t.accent}15` }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke={t.accent} viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#075a01]">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
                      {t.desc}
                    </p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      t.isLive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER BAR */}
      <footer className="border-t border-gray-100 bg-white px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Built by{" "}
            <a href="https://fancydigitals.com.ng" className="font-semibold text-[#075a01] hover:underline">
              Fancy Digitals
            </a>{" "}
            — Free tools for founders and marketers
          </p>
          <div className="flex items-center gap-4">
            <a href="/contact" className="text-xs font-semibold text-gray-500 hover:text-gray-900">
              Request a custom tool
            </a>
            <a href="/tools" className="rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:opacity-90">
              All Tools
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}