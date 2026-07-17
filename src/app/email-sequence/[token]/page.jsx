import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, ExternalLink, Clock, Send, Eye, MousePointerClick, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const token = params?.token;
  if (!token) return { title: "Email Sequence" };

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data } = await supabase
      .from("email_sequences")
      .select("title, sequence_type")
      .eq("share_token", token)
      .eq("is_public", true)
      .single();

    if (!data) return { title: "Email Sequence — Fancy Digitals" };

    return {
      title: `${data.title} — Email Sequence`,
      description: `View this AI-generated ${data.sequence_type} email sequence created with Fancy Digitals.`,
    };
  } catch {
    return { title: "Email Sequence — Fancy Digitals" };
  }
}

export default async function PublicEmailSequencePage({ params }) {
  const token = params?.token;
  if (!token) notFound();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: sequence, error } = await supabase
    .from("email_sequences")
    .select("*")
    .eq("share_token", token)
    .eq("is_public", true)
    .single();

  if (error || !sequence) notFound();

  const emails = sequence.emails || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01] shrink-0">
              <Mail className="h-3.5 w-3.5 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-900 truncate">{sequence.title}</p>
          </div>
          <Link
            href="/dashboard/tools/ai-email-sequence-generator"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-2 text-xs font-bold text-white hover:from-[#064c01] hover:to-[#087a01] shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            Create yours free
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 sm:p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            {sequence.sequence_type}
            {sequence.audience && ` · ${sequence.audience}`}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black">{sequence.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {emails.length} emails
            </span>
            {sequence.tone && (
              <>
                <span className="text-white/40">·</span>
                <span>{sequence.tone} tone</span>
              </>
            )}
          </div>
        </div>

        {sequence.strategy_notes && (
          <div className="rounded-2xl border border-[#075a01]/15 bg-[#075a01]/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#075a01]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#075a01]">Strategy</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{sequence.strategy_notes}</p>
          </div>
        )}

        {emails.map((email, i) => (
          <div key={email.id || i} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white font-black text-sm">
                {email.number || i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{email.subject}</p>
                {email.sendDelay && (
                  <p className="text-xs text-[#075a01] font-semibold flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {email.sendDelay}
                  </p>
                )}
              </div>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Send className="h-3 w-3 text-gray-400" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Subject</p>
                </div>
                <p className="text-sm font-bold text-gray-900">{email.subject}</p>
                {email.subjectAlt && (
                  <p className="text-xs text-gray-500 mt-1">A/B: {email.subjectAlt}</p>
                )}
              </div>

              {email.previewText && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Eye className="h-3 w-3 text-gray-400" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Preview</p>
                  </div>
                  <p className="text-xs text-gray-600 italic">{email.previewText}</p>
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Body</p>
                </div>
                <div className="text-[15px] leading-[1.75] text-gray-800 whitespace-pre-wrap">
                  {email.body}
                </div>
              </div>

              {email.ctaText && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MousePointerClick className="h-3 w-3 text-[#075a01]" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#075a01]">CTA</p>
                  </div>
                  <div className="inline-flex">
                    <div className="rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-2.5 text-sm font-bold text-white">
                      {email.ctaText}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 text-center text-white">
          <h3 className="text-lg font-black">Create your own email sequence free</h3>
          <p className="mt-1 text-sm text-white/80">
            AI writes cold outreach, welcome, launch and nurture sequences in 30 seconds.
          </p>
          <Link
            href="/dashboard/tools/ai-email-sequence-generator"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#075a01] hover:bg-white/90 transition"
          >
            <Mail className="h-4 w-4" />
            Get started free
          </Link>
        </div>
      </div>
    </div>
  );
}