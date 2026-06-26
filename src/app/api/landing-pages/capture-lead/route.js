import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { pageId, slug, email, name, source, phone, message } = body;

    if (!pageId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Use admin client to bypass RLS (public form, no auth needed)
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Get page owner
    const { data: pageRow } = await supabase
      .from("published_pages")
      .select("user_id")
      .eq("id", pageId)
      .single();

    if (!pageRow) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "";
    const userAgent = request.headers.get("user-agent") || "";

    const { error } = await supabase.from("page_leads").insert({
      page_id: pageId,
      user_id: pageRow.user_id,
      email,
      name: name || null,
      phone: body.phone || "", // Add
  gender: body.gender || "", // Add
  city: body.city || "", // Add
  state: body.state || "", // Add
  country: body.country || "", // Add
  intent: body.intent || "", // Add
  message: body.message || `Lead from CTA Modal`,
  ip_address: request.headers.get("x-forwarded-for") || "127.0.0.1",
  user_agent: request.headers.get("user-agent") || "unknown",
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: error.message || "Capture failed" }, { status: 500 });
  }
}