import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, action } = await req.json();

    if (!orderId || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get the order
    const { data: order, error: fetchError } = await serviceClient
      .from("pending_orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "pending") {
      return NextResponse.json({ error: "Order already processed" }, { status: 400 });
    }

    // === APPROVE ===
    if (action === "approve") {
      // Find user by email
      const { data: profile } = await serviceClient
        .from("profiles")
        .select("id, email, plan")
        .eq("email", order.email.toLowerCase())
        .maybeSingle();

      if (!profile) {
        return NextResponse.json({
          error: `No account found for ${order.email}. Ask them to sign up first, then approve again.`,
        }, { status: 400 });
      }

      // Update user's plan
      const { error: updateError } = await serviceClient
        .from("profiles")
        .update({
          plan: order.plan,
          plan_status: "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (updateError) {
        console.error("[Orders action] Update profile error:", updateError);
        return NextResponse.json({ error: "Could not upgrade user's plan." }, { status: 500 });
      }

      // Mark order as approved
      await serviceClient
        .from("pending_orders")
        .update({
          status: "approved",
          approved_at: new Date().toISOString(),
          approved_by: user.id,
        })
        .eq("id", orderId);

      // Send confirmation email to user
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const planLabel = {
          pro_monthly: "Pro (Monthly)",
          pro_yearly: "Pro (Yearly)",
          agency_monthly: "Agency (Monthly)",
          agency_yearly: "Agency (Yearly)",
        }[order.plan] || order.plan;

        resend.emails.send({
          from: "Fancy Digitals <noreply@fancydigitals.com.ng>",
          to: order.email,
          replyTo: ADMIN_EMAIL,
          subject: `You're now on ${planLabel}!`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #075a01; margin: 0 0 16px 0;">Payment received!</h2>
              <p>Hi ${order.full_name},</p>
              <p>Your payment for <strong>${planLabel}</strong> has been received and your account is now upgraded.</p>
              <div style="background: #f0fdf4; border-left: 4px solid #075a01; padding: 16px; margin: 20px 0; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px;">You now have <strong>unlimited access</strong> to all 5 AI tools.</p>
              </div>
              <div style="margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng"}/dashboard" style="display: inline-block; background: #075a01; color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px;">Go to dashboard</a>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">Reference: ${order.reference_code}</p>
              <p style="font-size: 12px; color: #6b7280;">Questions? Reply to this email.</p>
            </div>
          `,
        }).catch((err) => console.error("[Orders action] User email failed:", err));
      }

      return NextResponse.json({ success: true, message: "User upgraded" });
    }

    // === REJECT ===
    if (action === "reject") {
      await serviceClient
        .from("pending_orders")
        .update({
          status: "rejected",
          approved_at: new Date().toISOString(),
          approved_by: user.id,
        })
        .eq("id", orderId);

      return NextResponse.json({ success: true, message: "Order rejected" });
    }
  } catch (err) {
    console.error("[Orders action] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}