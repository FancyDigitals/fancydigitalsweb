import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const CLIENT_COOKIE = "fancy_client_session";

export async function getClientSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLIENT_COOKIE)?.value;
  if (!token) return null;

  const supabase = await createClient();
  const { data: client } = await supabase
    .from("client_profiles")
    .select("id, email, full_name, avatar_url")
    .eq("id", token)
    .single();

  return client || null;
}

export async function setClientSession(clientId, response) {
  const cookieStore = await cookies();
  cookieStore.set(CLIENT_COOKIE, clientId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function clearClientSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CLIENT_COOKIE);
}