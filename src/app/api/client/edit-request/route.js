import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const clientId = cookieStore.get("fancy_client_session")?.value;
    if (!clientId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { siteId, field, newValue, oldValue } = await request.json();

    if (!siteId || !field || !newValue) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verify client owns this site
    const { data: site } = await admin
      .from("client_sites")
      .select("id, can_edit_contact")
      .eq("id", siteId)
      .eq("client_id", clientId)
      .single();

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    if (!site.can_edit_contact) {
      return NextResponse.json({ error: "Editing not allowed" }, { status: 403 });
    }

    await admin.from("client_edit_requests").insert({
      site_id: siteId,
      client_id: clientId,
      field,
      old_value: oldValue || "",
      new_value: newValue,
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[edit-request]", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}