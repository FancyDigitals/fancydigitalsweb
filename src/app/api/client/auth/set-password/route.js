import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 });
    }

    // Validate token
    const { data: invite } = await admin
      .from("client_invites")
      .select("id, client_email, status, expires_at")
      .eq("token", token)
      .single();

    if (!invite) {
      return NextResponse.json({ error: "Invalid invite token" }, { status: 400 });
    }

    if (invite.status === "accepted") {
      return NextResponse.json({ error: "Invite already used" }, { status: 400 });
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: "Invite expired" }, { status: 400 });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);

    // Update client profile
    const { data: client } = await admin
      .from("client_profiles")
      .update({ password_hash: passwordHash })
      .eq("email", invite.client_email)
      .select("id")
      .single();

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Mark invite as accepted
    await admin
      .from("client_invites")
      .update({ status: "accepted" })
      .eq("id", invite.id);

    // Set session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("fancy_client_session", client.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[set-password]", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}