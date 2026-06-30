import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { notifyGoogleIndexing } from "@/lib/google-indexing";


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

// GET single project (id = "new" returns blank shell)
export async function GET(req, props) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const params = await props.params;
  const { id } = params;

  if (id === "new") {
    return Response.json({
      project: {
        id: null,
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        hero_image: "",
        gallery: [],
        client_name: "",
        industry: "",
        live_url: "",
        tech_stack: [],
        problem: "",
        solution: "",
        category_id: null,
        status: "draft",
        featured: false,
        display_order: 99,
      },
    });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return Response.json({ error: error.message }, { status: 404 });
  return Response.json({ project: data });
}

// PUT (create or update)
export async function PUT(req, props) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const params = await props.params;
  const { id } = params;
  const body = await req.json();

  // Validate
  if (!body.title?.trim()) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  // Auto-slug if missing
  let slug = body.slug?.trim() || slugify(body.title);
  if (!slug) {
    return Response.json({ error: "Slug could not be generated" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Build clean payload
  const payload = {
    slug,
    title: body.title.trim(),
    excerpt: body.excerpt?.trim() || null,
    content: body.content || null,
    hero_image: body.hero_image?.trim() || null,
    gallery: Array.isArray(body.gallery) ? body.gallery.filter(Boolean) : [],
    client_name: body.client_name?.trim() || null,
    industry: body.industry?.trim() || null,
    live_url: body.live_url?.trim() || null,
    tech_stack: Array.isArray(body.tech_stack) ? body.tech_stack.filter(Boolean) : [],
    problem: body.problem?.trim() || null,
    solution: body.solution?.trim() || null,
    category_id: body.category_id || null,
    status: body.status === "published" ? "published" : "draft",
    featured: !!body.featured,
    display_order: Number(body.display_order) || 99,
  };

  // Set published_at when publishing for the first time
  if (payload.status === "published") {
    if (id === "new") {
      payload.published_at = new Date().toISOString();
    } else {
      // Check if it was already published before
      const { data: existing } = await supabase
        .from("portfolio_projects")
        .select("published_at, status")
        .eq("id", id)
        .single();

      if (existing && !existing.published_at) {
        payload.published_at = new Date().toISOString();
      }
    }
  }

  let result;
  if (id === "new") {
    // Check slug uniqueness
    const { data: existingSlug } = await supabase
      .from("portfolio_projects")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existingSlug) {
      return Response.json({ error: `Slug "${slug}" already exists` }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("portfolio_projects")
      .insert(payload)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    result = data;
  } else {
    // Check slug uniqueness if changed
    const { data: existingSlug } = await supabase
      .from("portfolio_projects")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .maybeSingle();

    if (existingSlug) {
      return Response.json({ error: `Slug "${slug}" already exists` }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("portfolio_projects")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    result = data;
  }

  // Auto-notify Google if project is published
  if (result?.status === "published" && result?.slug) {
    const projectUrl = `https://fancydigitals.com.ng/portfolio/${result.slug}`;
    notifyGoogleIndexing(projectUrl, "URL_UPDATED")
      .then((r) => {
        if (r.success) console.log("✅ Notified Google:", projectUrl);
        else console.error("❌ Google indexing failed:", r.error);
      })
      .catch(() => {});
  }

  return Response.json({ project: result });
}