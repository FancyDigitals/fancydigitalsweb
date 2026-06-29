import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";
const VALID_PLANS = ["FREE", "PRO_MONTHLY", "LIFETIME"];

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
    }

    const body = await request.json();
    const { email, newPlan } = body;

    if (!email || !newPlan) {
      return NextResponse.json({ error: "email and newPlan required" }, { status: 400 });
    }

    const planUpper = String(newPlan).toUpperCase();
    if (!VALID_PLANS.includes(planUpper)) {
      return NextResponse.json({
        error: `Invalid plan. Must be one of: ${VALID_PLANS.join(", ")}`,
      }, { status: 400 });
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Find target user
    const { data: targetProfile, error: findErr } = await admin
      .from("profiles")
      .select("id, email, full_name, plan")
      .ilike("email", email.trim())
      .maybeSingle();

    if (findErr || !targetProfile) {
      return NextResponse.json({ error: "User not found with that email" }, { status: 404 });
    }

    const oldPlan = String(targetProfile.plan || "FREE").toUpperCase();

    if (oldPlan === planUpper) {
      return NextResponse.json({
        skipped: true,
        message: `User is already on ${planUpper}`,
      });
    }

    // Update plan (we save lowercase to match existing data pattern)
    const planForDb = planUpper === "FREE" ? "free" : planUpper;

    const updateData = {
      plan: planForDb,
      plan_status: "active",
      plan_started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (planUpper === "LIFETIME" || planUpper === "FREE") {
      updateData.plan_expires_at = null;
    }

    const { error: updateErr } = await admin
      .from("profiles")
      .update(updateData)
      .eq("id", targetProfile.id);

    if (updateErr) {
      console.error("[AdminUpgrade] DB update failed:", updateErr);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    // The Postgres trigger will fire the email automatically.
    // But we also fire manually here as a fallback in case the trigger isn't set up yet.
    try {
      const webhookSecret = process.env.PLAN_CHANGE_WEBHOOK_SECRET;
      if (webhookSecret) {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng";
        await fetch(`${baseUrl}/api/internal/plan-changed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${webhookSecret}`,
          },
          body: JSON.stringify({
            userId: targetProfile.id,
            oldPlan,
            newPlan: planUpper,
          }),
        });
      }
    } catch (emailErr) {
      console.warn("[AdminUpgrade] Email webhook failed (non-blocking):", emailErr);
    }

    return NextResponse.json({
      success: true,
      email: targetProfile.email,
      oldPlan,
      newPlan: planUpper,
    });
  } catch (err) {
    console.error("[AdminUpgrade] Exception:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET — search users for admin panel autocomplete
export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let query = admin
      .from("profiles")
      .select("id, email, full_name, plan, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (q.trim()) {
      query = query.ilike("email", `%${q.trim()}%`);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ users: data || [] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}