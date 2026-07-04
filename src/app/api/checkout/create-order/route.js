import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";
const VALID_PLANS = ["pro_monthly", "pro_yearly", "agency_monthly", "agency_yearly"];

function generateReferenceCode() {
  // Format: FD-XXXXX (5 chars, uppercase, no ambiguous chars)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "FD-";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, phone, notes, plan, amount, currency } = body;

    // Validation
    if (!fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (!VALID_PLANS.includes(plan)) {
      return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
    }
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    // Get user if logged in (optional)
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {
      // Not logged in, that's fine
    }

    // Use service client to bypass RLS for insert
    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Generate unique reference code (retry up to 5 times if collision)
    let referenceCode = null;
    for (let i = 0; i < 5; i++) {
      const candidate = generateReferenceCode();
      const { data: existing } = await serviceClient
        .from("pending_orders")
        .select("id")
        .eq("reference_code", candidate)
        .maybeSingle();
      if (!existing) {
        referenceCode = candidate;
        break;
      }
    }

    if (!referenceCode) {
      return NextResponse.json({ error: "Could not generate reference code. Try again." }, { status: 500 });
    }

    // Insert order
    const { data: order, error: insertError } = await serviceClient
      .from("pending_orders")
      .insert({
        user_id: userId,
        reference_code: referenceCode,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        notes: notes?.trim() || null,
        plan,
        amount,
        currency: currency || "NGN",
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("[Checkout] Insert error:", insertError);
      return NextResponse.json({ error: "Could not save your order. Please try again." }, { status: 500 });
    }

    // Send email notification to admin (fire and forget)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails.send({
        from: "Fancy Digitals <noreply@fancydigitals.com.ng>",
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `New order: ${plan} — ${referenceCode}`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #075a01; margin: 0 0 16px 0;">New pending order</h2>

            <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Reference Code</p>
              <p style="margin: 0; font-size: 28px; font-weight: bold; color: #111827;">${referenceCode}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #6b7280;">Name</td><td style="padding: 8px 0; font-weight: 600;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: 600;">${email}</td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${phone}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #6b7280;">Plan</td><td style="padding: 8px 0; font-weight: 600;">${plan}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Amount</td><td style="padding: 8px 0; font-weight: 600; color: #075a01;">${currency} ${Number(amount).toLocaleString()}</td></tr>
              ${notes ? `<tr><td style="padding: 8px 0; color: #6b7280;">Notes</td><td style="padding: 8px 0;">${notes}</td></tr>` : ""}
            </table>

            <div style="margin-top: 24px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng"}/dashboard/admin/orders" style="display: inline-block; background: #075a01; color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px;">Review order</a>
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Check your Opay app for a transfer matching reference <strong>${referenceCode}</strong>.</p>
          </div>
        `,
      }).catch((err) => console.error("[Checkout] Admin email failed:", err));
    }

    return NextResponse.json({
      success: true,
      order: {
        reference_code: order.reference_code,
        amount: order.amount,
        currency: order.currency,
        plan: order.plan,
      },
    });
  } catch (err) {
    console.error("[Checkout] Error:", err);
    return NextResponse.json({ error: err.message || "Something went wrong." }, { status: 500 });
  }
}