import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, source = "blog" } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Valid email required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Get IP for tracking
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const supabase = createAdminClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, unsubscribed")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      if (existing.unsubscribed) {
        // Re-subscribe
        await supabase
          .from("newsletter_subscribers")
          .update({
            unsubscribed: false,
            unsubscribed_at: null,
          })
          .eq("id", existing.id);

        return Response.json({
          success: true,
          message: "Welcome back! You've been re-subscribed.",
        });
      }

      return Response.json({
        success: true,
        message: "You're already subscribed. Thanks!",
      });
    }

    // Insert new subscriber
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: normalizedEmail,
        source,
        ip_address: ip,
        user_agent: userAgent.substring(0, 500),
      });

    if (error) {
      console.error("Newsletter insert error:", error);
      return Response.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    // Send welcome email (fire and forget)
    sendWelcomeEmail(normalizedEmail).catch((err) =>
      console.error("Welcome email failed:", err)
    );

    return Response.json({
      success: true,
      message: "Thanks for subscribing! Check your inbox.",
    });
  } catch (err) {
    console.error("Newsletter error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

async function sendWelcomeEmail(email) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Fancy Digitals</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="https://fancydigitals.com.ng/logo.png" alt="Fancy Digitals" width="48" height="48" style="border-radius:10px;" />
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;border-radius:22px;padding:44px 36px;">

              <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#1d1d1f;letter-spacing:-0.02em;line-height:1.2;">
                You're in. Welcome to Fancy Digitals.
              </h1>

              <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#1d1d1f;">
                Thanks for subscribing. You'll now receive our growth insights — practical thinking on AI marketing, web design, branding, and digital strategy.
              </p>

              <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#1d1d1f;">
                Here's what to expect:
              </p>

              <ul style="margin:0 0 28px;padding-left:20px;font-size:16px;line-height:1.7;color:#1d1d1f;">
                <li>Weekly tips you can apply immediately</li>
                <li>Exclusive guides and case studies</li>
                <li>Early access to new tools and features</li>
                <li>No spam. Ever. Unsubscribe anytime.</li>
              </ul>

              <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#1d1d1f;">
                While you're here, check out our free AI tools — they help thousands of businesses grow faster every month.
              </p>

              <div style="text-align:center;margin:32px 0 8px;">
                <a href="https://fancydigitals.com.ng/tools"
                   style="display:inline-block;background:#075a01;color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:980px;text-decoration:none;">
                  Explore Free Tools
                </a>
              </div>

            </td>
          </tr>

          <tr>
            <td style="padding:28px 8px 0;">
              <p style="margin:0 0 4px;font-size:15px;color:#1d1d1f;font-weight:600;">Bashir Ismail</p>
              <p style="margin:0;font-size:13px;color:#86868b;">Founder, Fancy Digitals</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 8px 0;">
              <div style="height:1px;background:#e5e5ea;margin-bottom:16px;"></div>
              <p style="margin:0 0 8px;font-size:12px;color:#86868b;">
                <a href="https://fancydigitals.com.ng" style="color:#075a01;text-decoration:none;font-weight:600;">fancydigitals.com.ng</a>
                · <a href="mailto:fancydigitalsng@gmail.com" style="color:#86868b;text-decoration:none;">fancydigitalsng@gmail.com</a>
              </p>
              <p style="margin:0;font-size:11px;color:#a1a1a6;">
                You're receiving this because you subscribed at fancydigitals.com.ng
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await resend.emails.send({
    from: "Fancy Digitals <noreply@fancydigitals.com.ng>",
    to: email,
    replyTo: "fancydigitalsng@gmail.com",
    subject: "Welcome to Fancy Digitals 🎉",
    html,
  });
}