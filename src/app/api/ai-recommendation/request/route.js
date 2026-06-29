import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { businessName, website, industry, targetKeywords, email } = await req.json();

    if (!businessName || !website || !email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Save to DB
    const { error: dbError } = await supabase
      .from("ai_recommendation_requests")
      .insert({
        business_name: businessName,
        website,
        industry: industry || null,
        target_keywords: targetKeywords || null,
        email,
      });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return Response.json({ error: "Failed to save request" }, { status: 500 });
    }

    // Notify Bashir
    await resend.emails.send({
      from: "Fancy Digitals <noreply@fancydigitals.com.ng>",
      to: "fancydigitalsng@gmail.com",
      replyTo: email,
      subject: `New AI Recommendation Request — ${businessName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#075a01">New AI Recommendation Request</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr style="border-bottom:1px solid #e5e7eb">
              <td style="padding:10px 0;font-weight:bold;color:#374151;width:160px">Business Name</td>
              <td style="padding:10px 0;color:#111827">${businessName}</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb">
              <td style="padding:10px 0;font-weight:bold;color:#374151">Website</td>
              <td style="padding:10px 0;color:#111827">${website}</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb">
              <td style="padding:10px 0;font-weight:bold;color:#374151">Industry</td>
              <td style="padding:10px 0;color:#111827">${industry || "Not provided"}</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb">
              <td style="padding:10px 0;font-weight:bold;color:#374151">Target Keywords</td>
              <td style="padding:10px 0;color:#111827">${targetKeywords || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#374151">Email</td>
              <td style="padding:10px 0;color:#111827">${email}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:8px;border-left:4px solid #075a01">
            <p style="margin:0;font-size:13px;color:#166534">Reply directly to this email to contact ${businessName}.</p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("AI recommendation request error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}