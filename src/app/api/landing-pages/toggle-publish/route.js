import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const adminClient = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { pageId, publish } = await request.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    console.log("[toggle-publish] user:", user?.id, "pageId:", pageId, "publish:", publish);

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!pageId) return NextResponse.json({ error: "pageId required" }, { status: 400 });

    // Verify ownership
    const { data: page } = await supabase
      .from("published_pages")
      .select("id")
      .eq("id", pageId)
      .eq("user_id", user.id)
      .single();

    console.log("[toggle-publish] page found:", !!page);

    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Use admin client to bypass RLS
    const { error } = await adminClient
      .from("published_pages")
      .update({ is_published: publish })
      .eq("id", pageId);

    if (error) throw error;

    console.log("[toggle-publish] updated successfully to:", publish);

    return NextResponse.json({ success: true, is_published: publish });
  } catch (error) {
    console.error("[toggle-publish] error:", error.message);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}