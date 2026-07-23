import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLimits } from "@/lib/pricing";

/* ── GET — load user's saved brands ── */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("brand_vault")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error("[BrandVault] GET error:", error);
    return NextResponse.json({ error: "Failed to load brands" }, { status: 500 });
  }
}

/* ── POST — save a new brand ── */
export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    /* Check plan limits */
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .maybeSingle();

    const plan   = profile?.plan || "FREE";
    const limits = getLimits(plan);
    const maxSlots = limits.brandVaultSlots ?? 0;

    if (maxSlots === 0) {
      return NextResponse.json(
        { error: "Brand Vault is a Pro feature. Upgrade to save brands." },
        { status: 403 }
      );
    }

    /* Count existing brands */
    const { count } = await supabase
      .from("brand_vault")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (maxSlots !== Infinity && (count || 0) >= maxSlots) {
      return NextResponse.json(
        { error: `You've reached your ${maxSlots}-brand limit. Upgrade to Agency for unlimited.` },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, industry, audience, tone, voice_notes, colors, avoid } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Brand name is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("brand_vault")
      .insert({
        user_id:     user.id,
        name:        name.trim(),
        industry:    industry?.trim()    || null,
        audience:    audience?.trim()    || null,
        tone:        tone?.trim()        || null,
        voice_notes: voice_notes?.trim() || null,
        colors:      colors?.trim()      || null,
        avoid:       avoid?.trim()       || null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[BrandVault] POST error:", error);
    return NextResponse.json({ error: "Failed to save brand" }, { status: 500 });
  }
}

/* ── DELETE — remove a brand ── */
export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Brand ID required" }, { status: 400 });

    const { error } = await supabase
      .from("brand_vault")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id); /* RLS double-lock */

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BrandVault] DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}