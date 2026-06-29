import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isPro } from "@/lib/pricing";
import CompareClient from "./client";

export const metadata = {
  title: "Competitor Comparison | AI Visibility | Fancy Digitals",
  description: "Compare your AI visibility score against a competitor side by side.",
};

export default async function ComparePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const userPlan = profile?.plan || "FREE";
  const userIsPro = isPro(userPlan);

  return <CompareClient isPro={userIsPro} />;
}