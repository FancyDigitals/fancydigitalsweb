import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return NextResponse.json({ error: "pageId required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify user owns this page
  const { data: page } = await supabase
    .from("published_pages")
    .select("id")
    .eq("id", pageId)
    .eq("user_id", user.id)
    .single();

  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: leads } = await supabase
    .from("page_leads")
    .select("id, name, email, phone, message, is_seen, created_at")
    .eq("page_id", pageId)
    .order("created_at", { ascending: false });

  return NextResponse.json({ leads: leads || [] });
}