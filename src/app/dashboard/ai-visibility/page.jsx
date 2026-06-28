import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isPro } from "@/lib/pricing";
import AIVisibilityClient from "./client";

export const metadata = {
  title: "AI Visibility Intelligence | Fancy Digitals",
  description: "Analyze how AI assistants like ChatGPT, Gemini, and Perplexity see your business.",
};

export default async function AIVisibilityPage() {
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
  // Forced cache bust

  console.log("🟢 AI VISIBILITY DEBUG:", { userPlan, userIsPro, rawProfile: profile });

  const { data: scans } = await supabase
    .from("ai_visibility_scans")
    .select("id, url, domain, overall_score, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <AIVisibilityClient
      initialScans={scans || []}
      isPro={userIsPro}
    />
  );
}