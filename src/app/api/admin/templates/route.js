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
    .from("email_templates")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ templates: data || [] });
}

export async function POST() {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();

  // Find highest display_order
  const { data: existing } = await supabase
    .from("email_templates")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.display_order || 0) + 1;

  const { data, error } = await supabase
    .from("email_templates")
    .insert({
      label: "New Template",
      subject: "Subject line goes here",
      message: "Write your email message here.\n\nEach line break becomes a new paragraph.",
      cta_text: "Learn More",
      cta_url: "https://fancydigitals.com.ng",
      banner: "email-banner-launch.png",
      category: "general",
      display_order: nextOrder,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ template: data });
}

export async function DELETE(req) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("email_templates").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}