import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth/actions";
import { redirect } from "next/navigation";
import LandingPagesDashboardClient from "./client";

export const metadata = {
  title: "Landing Pages — Fancy Digitals",
};

export default async function LandingPagesDashboardPage() {
  const profile = await getUserProfile();
  if (!profile) redirect("/signin");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all user's published pages
  const { data: pages } = await supabase
    .from("published_pages")
    .select("id, slug, business_name, tone, brand_color, is_published, views, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // For each page, fetch lead counts
  const pageIds = (pages || []).map((p) => p.id);

  let leadCounts = {};
  let unseenCounts = {};

  if (pageIds.length > 0) {
    const { data: leads } = await supabase
      .from("page_leads")
      .select("page_id, is_seen")
      .in("page_id", pageIds);

    (leads || []).forEach((lead) => {
      leadCounts[lead.page_id] = (leadCounts[lead.page_id] || 0) + 1;
      if (!lead.is_seen) {
        unseenCounts[lead.page_id] = (unseenCounts[lead.page_id] || 0) + 1;
      }
    });
  }

  const enrichedPages = (pages || []).map((p) => ({
    ...p,
    totalLeads: leadCounts[p.id] || 0,
    unseenLeads: unseenCounts[p.id] || 0,
  }));

  return (
    <LandingPagesDashboardClient
      pages={enrichedPages}
      userId={user.id}
    />
  );
}