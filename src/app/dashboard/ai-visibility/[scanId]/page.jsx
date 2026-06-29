import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import ScanDetailClient from "./client";

export const metadata = {
  title: "Scan Detail | AI Visibility | Fancy Digitals",
};

export default async function ScanDetailPage({ params }) {
  const { scanId } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  // Fetch the scan
  const { data: scan, error } = await supabase
    .from("ai_visibility_scans")
    .select("*")
    .eq("id", scanId)
    .eq("user_id", user.id)
    .single();

  if (error || !scan) notFound();

  // Fetch history of scans for the same domain
  const { data: history } = await supabase
    .from("ai_visibility_scans")
    .select("id, overall_score, created_at")
    .eq("user_id", user.id)
    .eq("domain", scan.domain)
    .order("created_at", { ascending: true });

  return (
    <ScanDetailClient
      scan={scan}
      history={history || []}
    />
  );
}