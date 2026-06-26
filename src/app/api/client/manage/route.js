import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET — list all clients for this builder
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: sites } = await admin
      .from("client_sites")
      .select("id, client_email, site_name, is_active, created_at, page_id, client_id")
      .eq("builder_id", user.id)
      .order("created_at", { ascending: false });

    // Get client names
    const clientIds = [...new Set((sites || []).map((s) => s.client_id).filter(Boolean))];
    let clientNames = {};
    if (clientIds.length > 0) {
      const { data: profiles } = await admin
        .from("client_profiles")
        .select("id, full_name, email")
        .in("id", clientIds);
      (profiles || []).forEach((p) => {
        clientNames[p.id] = { name: p.full_name, email: p.email };
      });
    }

    // Get invite statuses
    const pageIds = [...new Set((sites || []).map((s) => s.page_id).filter(Boolean))];
    let inviteStatuses = {};
    if (pageIds.length > 0) {
      const { data: invites } = await admin
        .from("client_invites")
        .select("client_email, status, page_id")
        .eq("builder_id", user.id)
        .in("page_id", pageIds);
      (invites || []).forEach((inv) => {
        const key = `${inv.page_id}_${inv.client_email}`;
        inviteStatuses[key] = inv.status;
      });
    }

    // Get page slugs
    let pageSlugs = {};
    if (pageIds.length > 0) {
      const { data: pages } = await admin
        .from("published_pages")
        .select("id, slug, business_name")
        .in("id", pageIds);
      (pages || []).forEach((p) => {
        pageSlugs[p.id] = { slug: p.slug, name: p.business_name };
      });
    }

    const enriched = (sites || []).map((s) => ({
      ...s,
      client_name: clientNames[s.client_id]?.name || "",
      invite_status: inviteStatuses[`${s.page_id}_${s.client_email}`] || "unknown",
      page_slug: pageSlugs[s.page_id]?.slug || "",
      page_name: pageSlugs[s.page_id]?.name || s.site_name,
    }));

    return NextResponse.json({ clients: enriched });
  } catch (error) {
    console.error("[client-manage-list]", error);
    return NextResponse.json({ error: "Failed to load clients" }, { status: 500 });
  }
}

// DELETE — revoke client access
export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { siteId } = await request.json();
    if (!siteId) return NextResponse.json({ error: "siteId required" }, { status: 400 });

    // Verify builder owns this site record
    const { data: site } = await admin
      .from("client_sites")
      .select("id")
      .eq("id", siteId)
      .eq("builder_id", user.id)
      .single();

    if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Deactivate (soft delete)
    await admin
      .from("client_sites")
      .update({ is_active: false })
      .eq("id", siteId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[client-manage-delete]", error);
    return NextResponse.json({ error: "Failed to revoke access" }, { status: 500 });
  }
}