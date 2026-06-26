import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { pageId, clientEmail, clientName } = await request.json();

    if (!pageId || !clientEmail) {
      return NextResponse.json({ error: "pageId and clientEmail required" }, { status: 400 });
    }

    // Verify builder owns this page
    const { data: page } = await admin
      .from("published_pages")
      .select("id, business_name, slug")
      .eq("id", pageId)
      .eq("user_id", user.id)
      .single();

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const email = clientEmail.toLowerCase().trim();

    // Check if client profile already exists
    let { data: clientProfile } = await admin
      .from("client_profiles")
      .select("id")
      .eq("email", email)
      .single();

    // If not, create one with a temp password
    const tempPassword = Math.random().toString(36).slice(-10) + "A1!";
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    if (!clientProfile) {
      const { data: newClient, error: createError } = await admin
        .from("client_profiles")
        .insert({
          email,
          full_name: clientName || "",
          password_hash: passwordHash,
        })
        .select("id")
        .single();

      if (createError) throw createError;
      clientProfile = newClient;
    }

    // Check if client_site already exists
    const { data: existingSite } = await admin
      .from("client_sites")
      .select("id")
      .eq("page_id", pageId)
      .eq("client_email", email)
      .single();

    if (!existingSite) {
      await admin.from("client_sites").insert({
        builder_id: user.id,
        client_id: clientProfile.id,
        page_id: pageId,
        client_email: email,
        site_name: page.business_name,
      });
    }

    // Create invite token
    const { data: invite, error: inviteError } = await admin
      .from("client_invites")
      .insert({
        builder_id: user.id,
        page_id: pageId,
        client_email: email,
        client_name: clientName || "",
        status: "pending",
      })
      .select("token")
      .single();

    if (inviteError) throw inviteError;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng";
    const acceptUrl = `${baseUrl}/client/accept-invite?token=${invite.token}`;

    return NextResponse.json({
      success: true,
      acceptUrl,
      tempPassword,
      clientEmail: email,
      message: "Invite created. Share the acceptUrl and tempPassword with your client.",
    });
  } catch (error) {
    console.error("[client-invite]", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}