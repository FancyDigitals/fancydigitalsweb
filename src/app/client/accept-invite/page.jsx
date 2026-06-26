import { createClient as createAdminClient } from "@supabase/supabase-js";
import AcceptInviteClient from "./client";
import { redirect } from "next/navigation";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function AcceptInvitePage({ searchParams }) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) redirect("/client/login");

  const { data: invite } = await admin
    .from("client_invites")
    .select("id, client_email, client_name, status, expires_at, page_id")
    .eq("token", token)
    .single();

  if (!invite || invite.status === "accepted") {
    redirect("/client/login");
  }

  if (new Date(invite.expires_at) < new Date()) {
    redirect("/client/login?error=expired");
  }

  return (
    <AcceptInviteClient
      token={token}
      clientEmail={invite.client_email}
      clientName={invite.client_name}
    />
  );
}