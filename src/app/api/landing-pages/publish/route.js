import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Reserved slugs (can't be used as a published page slug)
const RESERVED_SLUGS = [
  "admin", "api", "auth", "blog", "dashboard", "tools", "pricing",
  "signin", "signup", "login", "register", "logout", "forgot-password",
  "about", "contact", "services", "portfolio", "p", "free-ai-resume-builder",
  "free-ai-cover-letter", "resume-for", "cover-letter-for",
  "web-design-nigeria", "web-development-nigeria", "seo-services-nigeria",
  "graphics-design-nigeria", "email-marketing-nigeria",
  "test", "demo", "example", "sample", "preview",
  "settings", "billing", "profile", "account", "help", "support",
];

function validateSlug(slug) {
  if (!slug) return "Slug is required";
  if (slug.length < 3) return "Slug must be at least 3 characters";
  if (slug.length > 30) return "Slug must be 30 characters or less";
  if (!/^[a-z0-9-]+$/.test(slug)) return "Only lowercase letters, numbers, and hyphens allowed";
  if (slug.startsWith("-") || slug.endsWith("-")) return "Cannot start or end with a hyphen";
  if (slug.includes("--")) return "Cannot contain consecutive hyphens";
  if (RESERVED_SLUGS.includes(slug)) return "This slug is reserved";
  return null;
}

// CHECK SLUG AVAILABILITY (GET)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.toLowerCase().trim();

    const validationError = validateSlug(slug);
    if (validationError) {
      return NextResponse.json({ available: false, error: validationError });
    }

    const supabase = await createClient();
    const { data } = await supabase
      .from("published_pages")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (data) {
      return NextResponse.json({ available: false, error: "Slug already taken" });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    return NextResponse.json({ available: false, error: "Check failed" }, { status: 500 });
  }
}

// PUBLISH PAGE (POST)
export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify Pro
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const isPro = profile?.plan && profile.plan !== "free";
    if (!isPro) {
      return NextResponse.json(
        { error: "Publishing is a Pro feature. Upgrade to publish your landing page." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { slug: rawSlug, page, form } = body;

    if (!page || !form) {
      return NextResponse.json({ error: "Missing page or form data" }, { status: 400 });
    }

    const slug = rawSlug?.toLowerCase().trim();
    const validationError = validateSlug(slug);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Check if slug is taken (by someone else)
    const { data: existing } = await supabase
      .from("published_pages")
      .select("id, user_id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing && existing.user_id !== user.id) {
      return NextResponse.json({ error: "Slug already taken by another user" }, { status: 409 });
    }

    // If user already has this slug, update it. Otherwise create new.
    let result;
    if (existing && existing.user_id === user.id) {
      const { data, error } = await supabase
        .from("published_pages")
        .update({
          business_name: form.businessName,
          page_data: page,
          form_data: form,
          brand_color: form.brandColor || "#075a01",
          brand_accent: form.brandAccent || "#ff914d",
          tone: form.tone || "Professional",
          is_published: true,
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from("published_pages")
        .insert({
          user_id: user.id,
          slug,
          business_name: form.businessName,
          page_data: page,
          form_data: form,
          brand_color: form.brandColor || "#075a01",
          brand_accent: form.brandAccent || "#ff914d",
          tone: form.tone || "Professional",
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng";

    return NextResponse.json({
      success: true,
      slug: result.slug,
      url: `${baseUrl}/p/${result.slug}`,
      pageId: result.id,
    });
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json({ error: error.message || "Publish failed" }, { status: 500 });
  }
}

// UNPUBLISH (DELETE)
export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("published_pages")
      .delete()
      .eq("slug", slug)
      .eq("user_id", user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unpublish failed" }, { status: 500 });
  }
}