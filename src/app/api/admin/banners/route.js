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
    .from("promo_banners")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ banners: data || [] });
}

export async function POST() {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();

  // Find highest display_order
  const { data: existing } = await supabase
    .from("promo_banners")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.display_order || 0) + 1;

  const { data, error } = await supabase
    .from("promo_banners")
    .insert({
      title: "New Banner",
      description: "Edit this banner from the admin panel.",
      cta_text: "Learn More",
      cta_url: "/",
      style: "gradient_green",
      display_order: nextOrder,
      active: false, // Inactive by default
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ banner: data });
}

export async function DELETE(req) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("promo_banners").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}