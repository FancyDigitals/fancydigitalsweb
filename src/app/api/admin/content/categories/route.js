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

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(req) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "blog"; // blog | portfolio

  const table = type === "portfolio" ? "portfolio_categories" : "blog_categories";

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("name", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ categories: data || [] });
}

export async function POST(req) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { type, name, description } = await req.json();
  if (!name?.trim()) return Response.json({ error: "Name required" }, { status: 400 });

  const table = type === "portfolio" ? "portfolio_categories" : "blog_categories";

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(table)
    .insert({
      name: name.trim(),
      slug: slugify(name),
      description: description?.trim() || null,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ category: data });
}

export async function DELETE(req) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type") || "blog";
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const table = type === "portfolio" ? "portfolio_categories" : "blog_categories";

  const supabase = createAdminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}