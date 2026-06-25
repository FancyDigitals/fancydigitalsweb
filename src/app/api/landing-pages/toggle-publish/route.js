import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const adminClient = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { pageId, publish } = await request.json();
    if (!pageId) return NextResponse.json({ error: "pageId required" }, { status: 400 });

    // Verify ownership using regular client
    const { data: page } = await supabase
      .from("published_pages")
      .select("id")
      .eq("id", pageId)
      .eq("user_id", user.id)
      .single();

    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Use admin client to bypass RLS for the update
    const { error } = await adminClient
      .from("published_pages")
      .update({ is_published: publish })
      .eq("id", pageId);

    if (error) throw error;

    return NextResponse.json({ success: true, is_published: publish });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}