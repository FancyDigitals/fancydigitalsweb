import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTodayUsage, getLimitForTool } from "@/lib/usage";
import DocumentViewerClient from "./client";

export const metadata = {
  title: "Free Document Viewer & Editor — Open PDF, Word, Excel Files | Fancy Digitals",
  description:
    "Open, view, and edit PDF, Word, Excel, PowerPoint, and 15+ document formats free in your browser. No download, no sign-up hassle. Works on mobile.",
};

export default async function DocumentViewerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin?redirect=/dashboard/tools/document-viewer");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name, email")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan && profile.plan.toLowerCase() !== "free";
  const todayUsage = await getTodayUsage("document-viewer");
  const limit = getLimitForTool("document-viewer");

  return (
    <DocumentViewerClient
      isPro={isPro}
      initialUsage={todayUsage}
      limit={limit}
      userEmail={profile?.email}
      userName={profile?.full_name}
    />
  );
}