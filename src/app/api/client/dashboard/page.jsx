import { cookies } from "next/headers";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import ClientDashboardClient from "./client";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const metadata = {
  title: "My Website Dashboard — Fancy Digitals",
};

export default async function ClientDashboardPage() {
  // Get client session
  const cookieStore = await cookies();
  const clientId = cookieStore.get("fancy_client_session")?.value;

  if (!clientId) redirect("/client/login");

  // Get client profile
  const { data: client } = await admin
    .from("client_profiles")
    .select("id, email, full_name, avatar_url")
    .eq("id", clientId)
    .single();

  if (!client) redirect("/client/login");

  // Get all sites for this client
  const { data: sites } = await admin
    .from("client_sites")
    .select("id, site_name, page_id, can_edit_contact, created_at")
    .eq("client_id", clientId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (!sites?.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 text-sm">No sites found for your account.</p>
          <p className="text-gray-400 text-xs mt-1">Contact your agency if this is a mistake.</p>
        </div>
      </div>
    );
  }

  // For each site, get page data + leads + views
  const enrichedSites = await Promise.all(
    sites.map(async (site) => {
      const [{ data: page }, { data: leads }, { count: totalLeads }] = await Promise.all([
        admin
          .from("published_pages")
          .select("slug, business_name, brand_color, brand_accent, tone, views, is_published, form_data, page_data, updated_at")
          .eq("id", site.page_id)
          .single(),
        admin
          .from("page_leads")
          .select("id, name, email, phone, gender, city, state, country, intent, message, is_seen, created_at")
          .eq("page_id", site.page_id)
          .order("created_at", { ascending: false })
          .limit(50),
        admin
          .from("page_leads")
          .select("id", { count: "exact", head: true })
          .eq("page_id", site.page_id),
      ]);

      const unseenLeads = (leads || []).filter((l) => !l.is_seen).length;

      return {
        ...site,
        page,
        leads: leads || [],
        totalLeads: totalLeads || 0,
        unseenLeads,
      };
    })
  );

  return (
    <ClientDashboardClient
      client={client}
      sites={enrichedSites}
    />
  );
}