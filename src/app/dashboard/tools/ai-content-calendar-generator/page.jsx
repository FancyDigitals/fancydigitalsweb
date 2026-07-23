import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLimits, isAgency } from "@/lib/pricing";
import ContentCalendarPageClient from "./ContentCalendarPageClient";

export const metadata = {
  title: "AI Content Calendar Generator | Fancy Digitals",
  description: "Generate a full social media content calendar in seconds. Plan posts for Instagram, Twitter, LinkedIn, YouTube and more.",
};

export default async function ContentCalendarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/dashboard/tools/ai-content-calendar-generator");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  const plan   = profile?.plan || "FREE";
  const limits = getLimits(plan);

  return (
    <ContentCalendarPageClient
      user={{ id: user.id, email: user.email, name: profile?.full_name }}
      plan={plan}
      limits={{
        contentCalendarPerDay:  limits.contentCalendarPerDay,
        contentCalendarMaxDays: limits.contentCalendarMaxDays,
        brandVaultSlots:        limits.brandVaultSlots,
        whiteLabel:             limits.whiteLabel,
      }}
      isAgency={isAgency(plan)}
    />
  );
}