import { getUserProfile } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { getLimits, isPro } from "@/lib/pricing";
import EmailSequenceWorkspace from "@/components/email-sequence/EmailSequenceWorkspace";

export const metadata = {
  title: "AI Email Sequence Generator — Fancy Digitals",
  description:
    "Generate complete cold outreach, welcome, launch, and nurture email sequences in 30 seconds. Export to Mailchimp, Klaviyo, or copy directly.",
};

export default async function EmailSequencePage() {
  const profile = await getUserProfile();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const plan = profile?.plan || "FREE";
  const limits = getLimits(plan);
  const userIsPro = isPro(plan);

  const today = new Date().toISOString().split("T")[0];
  const { data: usageRow } = await supabase
    .from("usage")
    .select("count")
    .eq("user_id", user?.id)
    .eq("tool_slug", "ai-email-sequence")
    .eq("date", today)
    .maybeSingle();

  const usedToday = usageRow?.count || 0;
  const dailyLimit = limits.emailSequencePerDay;
  const remaining =
    dailyLimit === Infinity ? Infinity : Math.max(0, dailyLimit - usedToday);

  return (
    <EmailSequenceWorkspace
      plan={plan}
      isPro={userIsPro}
      usedToday={usedToday}
      dailyLimit={dailyLimit === Infinity ? null : dailyLimit}
      remaining={remaining === Infinity ? null : remaining}
      userEmail={profile?.email || ""}
    />
  );
}