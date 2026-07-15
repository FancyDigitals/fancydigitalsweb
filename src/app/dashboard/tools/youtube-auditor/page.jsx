import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import YoutubeAuditorWorkspace from "./components/Workspace";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "YouTube Auditor & Growth Studio — Fancy Digitals",
  description:
    "Audit any YouTube channel. Get a growth plan to monetization. Outrank your niche.",
};

export default async function YoutubeAuditorPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin?redirect=/dashboard/tools/youtube-auditor");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan || "FREE";

  return <YoutubeAuditorWorkspace user={user} plan={plan} />;
}