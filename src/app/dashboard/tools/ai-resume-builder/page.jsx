import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTodayUsage, getLimitForTool } from "@/lib/usage";
import ResumeBuilderClient from "./client";

export const metadata = {
  title: "AI Resume Builder — Free ATS Resume Maker | Fancy Digitals",
  description:
    "Build a professional ATS-optimized resume in 30 seconds with AI. Free resume builder, 6 premium templates, ATS score checker.",
};

const TEMPLATES = [
  { id: "basic", name: "Basic", description: "Clean & simple", pro: false, accent: "#1f2937" },
  { id: "modern", name: "Modern", description: "Contemporary", pro: true, accent: "#075a01" },
  { id: "professional", name: "Professional", description: "Executive", pro: true, accent: "#1e3a5f" },
  { id: "creative", name: "Creative", description: "Bold & memorable", pro: true, accent: "#7c3aed" },
  { id: "minimal", name: "Minimal", description: "Elegant", pro: true, accent: "#0f172a" },
  { id: "tech", name: "Tech", description: "For developers", pro: true, accent: "#0369a1" },
  { id: "elegant", name: "Elegant", description: "Refined & polished", pro: true, accent: "#78350f" },
  { id: "bold", name: "Bold", description: "Strong sidebar", pro: true, accent: "#dc2626" },
  { id: "compact", name: "Compact", description: "Fits more content", pro: true, accent: "#374151" },
  { id: "academic", name: "Academic", description: "Research-style", pro: true, accent: "#1e40af" },
  { id: "startup", name: "Startup", description: "Modern bento", pro: true, accent: "#059669" },
  { id: "photo", name: "Photo-First", description: "Visual focus", pro: true, accent: "#0891b2" },
];

export default async function ResumeBuilderPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin?redirect=/dashboard/tools/ai-resume-builder");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name, email")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan !== "free";
  const todayUsage = await getTodayUsage("ai-resume-builder");
  const limit = getLimitForTool("ai-resume-builder");

  return (
    <ResumeBuilderClient
      isPro={isPro}
      initialUsage={todayUsage}
      limit={limit}
      userEmail={profile?.email}
      userName={profile?.full_name}
      templates={TEMPLATES}
    />
  );
}