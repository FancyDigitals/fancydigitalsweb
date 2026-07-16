import Link from "next/link";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import AuditReport from "@/app/dashboard/tools/youtube-auditor/components/AuditReport";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getShared(id);

  if (!data) {
    return { title: "Report Not Found — Fancy Digitals" };
  }

  return {
    title: `${data.channel_title} — YouTube Audit Report | Fancy Digitals`,
    description: `See the full YouTube growth audit for ${data.channel_title}. Monetization gap, action plan, and insights.`,
    openGraph: {
      title: `${data.channel_title} — YouTube Growth Report`,
      description: `Deep audit + growth strategy. Powered by Fancy Digitals.`,
    },
  };
}

async function getShared(id) {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data } = await supabase
    .from("shared_audits")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (data) {
    // Increment view count (fire and forget)
    supabase
      .from("shared_audits")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", id)
      .then(() => {});
  }

  return data;
}

export default async function SharedAuditPage({ params }) {
  const { id } = await params;
  const shared = await getShared(id);

  if (!shared) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Report not found
          </h1>
          <p className="text-gray-600 mb-6">
            This audit link may have expired or been removed.
          </p>
          <Link
            href="/free-youtube-auditor"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            Create Your Free Audit
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ===== BRAND HEADER ===== */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Fancy Digitals" className="h-8 w-auto" />
            <span className="font-bold text-gray-900 hidden sm:block">
              Fancy Digitals
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-gray-500">
              {shared.views || 0} views
            </span>
            <Link
              href="/free-youtube-auditor"
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition text-xs sm:text-sm"
            >
              Audit Your Channel Free
            </Link>
          </div>
        </div>
      </div>

      {/* ===== REPORT ===== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-1">
            Shared Audit Report
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {shared.channel_title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Generated {new Date(shared.created_at).toLocaleDateString()}
          </p>
        </div>

        <AuditReport result={shared.data} />

        {/* ===== FOOTER CTA ===== */}
        <div className="mt-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Want an audit like this for your channel?
          </h2>
          <p className="text-white/85 mb-6 max-w-lg mx-auto">
            Free, no credit card. Get a monetization roadmap, growth plan, and
            AI insights in under 60 seconds.
          </p>
          <Link
            href="/free-youtube-auditor"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-red-600 font-bold px-6 py-3 rounded-xl transition"
          >
            Get Your Free Audit
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}