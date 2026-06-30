import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return null;
  }
  return user;
}

export async function GET() {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, featured_image, status, featured, views, published_at, created_at, category_id")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ posts: data || [] });
}

export async function DELETE(req) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}