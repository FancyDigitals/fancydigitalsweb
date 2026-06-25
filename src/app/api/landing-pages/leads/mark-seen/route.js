import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  const { pageId } = await request.json();
  if (!pageId) return NextResponse.json({ error: "pageId required" }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify ownership
  const { data: page } = await supabase
    .from("published_pages")
    .select("id")
    .eq("id", pageId)
    .eq("user_id", user.id)
    .single();

  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await supabase
    .from("page_leads")
    .update({ is_seen: true })
    .eq("page_id", pageId)
    .eq("is_seen", false);

  return NextResponse.json({ success: true });
}