import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { welcomeProMonthlyEmail } from "@/lib/email-templates/welcome-pro-monthly";
import { welcomeLifetimeEmail } from "@/lib/email-templates/welcome-lifetime";
import { downgradeToFreeEmail } from "@/lib/email-templates/downgrade-to-free";

const WEBHOOK_SECRET = process.env.PLAN_CHANGE_WEBHOOK_SECRET;

function normalizePlan(p) {
  return String(p || "FREE").toUpperCase();
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!WEBHOOK_SECRET || token !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, oldPlan, newPlan } = body;

    if (!userId || !newPlan) {
      return NextResponse.json({ error: "Missing userId or newPlan" }, { status: 400 });
    }

    const oldP = normalizePlan(oldPlan);
    const newP = normalizePlan(newPlan);

    if (oldP === newP) {
      return NextResponse.json({ skipped: "no_change" });
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: profile, error: profileErr } = await admin
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .single();

    if (profileErr || !profile?.email) {
      console.error("[PlanChanged] Profile not found", { userId, profileErr });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let template = null;
    if (newP === "PRO_MONTHLY") {
      template = welcomeProMonthlyEmail({ name: profile.full_name });
    } else if (newP === "LIFETIME") {
      template = welcomeLifetimeEmail({ name: profile.full_name });
    } else if (newP === "FREE") {
      if (oldP === "PRO_MONTHLY" || oldP === "LIFETIME") {
        template = downgradeToFreeEmail({ name: profile.full_name });
      } else {
        return NextResponse.json({ skipped: "free_to_free" });
      }
    } else {
      return NextResponse.json({ skipped: "unknown_plan" });
    }

    const result = await sendEmail({
      to: profile.email,
      subject: template.subject,
      html: template.html,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, sentTo: profile.email });
  } catch (err) {
    console.error("[PlanChanged] Exception:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}