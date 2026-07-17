import { getUserProfile } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { getLimits } from "@/lib/pricing";
import PitchDeckWorkspace from "@/components/pitch-deck/PitchDeckWorkspace";

export const metadata = {
  title: "AI Pitch Deck Generator — Fancy Digitals",
  description:
    "Generate world-class pitch decks, investor decks, business proposals and more using AI.",
};

export default async function PitchDeckPage() {
  const profile = await getUserProfile();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const plan = profile?.plan || "FREE";
  const limits = getLimits(plan);

  // Today's usage
  const today = new Date().toISOString().split("T")[0];
  const { data: usageRow } = await supabase
    .from("usage")
    .select("count")
    .eq("user_id", user?.id)
    .eq("tool_slug", "ai-pitch-deck")
    .eq("date", today)
    .maybeSingle();

  const usedToday = usageRow?.count || 0;
  const dailyLimit = limits.pitchDeckPerDay;
  const remaining =
    dailyLimit === Infinity ? Infinity : Math.max(0, dailyLimit - usedToday);

  return (
    <PitchDeckWorkspace
      plan={plan}
      usedToday={usedToday}
      dailyLimit={dailyLimit === Infinity ? null : dailyLimit}
      remaining={remaining === Infinity ? null : remaining}
      userEmail={profile?.email || ""}
    />
  );
}