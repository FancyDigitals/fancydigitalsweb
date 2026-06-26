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
  const cookieStore = await cookies();
  const clientId = cookieStore.get("fancy_client_session")?.value;

  if (!clientId) redirect("/client/login");

  const { data: client } = await admin
    .from("client_profiles")
    .select("id, email, full_name, avatar_url")
    .eq("id", clientId)
    .single();

  if (!client) redirect("/client/login");

  const { data: sites } = await admin
    .from("client_sites")
    .select("id, site_name, page_id, can_edit_contact, created_at")
    .eq("client_id", clientId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (!sites?.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          </div>
          <p className="font-bold text-gray-700 mb-1">No sites found</p>
          <p className="text-sm text-gray-500">
            Contact your agency — your website access will appear here once it's set up.
          </p>
        </div>
      </div>
    );
  }

  const enrichedSites = await Promise.all(
    sites.map(async (site) => {
      const [{ data: page }, { data: leads }, { count: totalLeads }] =
        await Promise.all([
          admin
            .from("published_pages")
            .select(
              "slug, business_name, brand_color, brand_accent, tone, views, is_published, form_data, page_data, updated_at"
            )
            .eq("id", site.page_id)
            .single(),
          admin
            .from("page_leads")
            .select(
              "id, name, email, phone, gender, city, state, country, intent, message, is_seen, created_at"
            )
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

  return <ClientDashboardClient client={client} sites={enrichedSites} />;
}