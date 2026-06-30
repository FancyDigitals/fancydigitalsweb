import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export async function POST(req) {
  try {
    const { adminEmail, subject, message, emails } = await req.json();

    if (adminEmail !== ADMIN_EMAIL) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!subject?.trim() || !message?.trim()) {
      return Response.json({ error: "Subject and message are required" }, { status: 400 });
    }

    let users = [];

    if (emails && Array.isArray(emails) && emails.length > 0) {
      // Use provided list
      users = emails;
    } else {
      // Fallback — fetch all from DB
      const supabase = createAdminClient();
      const { data, error: dbError } = await supabase
        .from("profiles")
        .select("email, full_name")
        .not("email", "is", null);

      if (dbError) {
        return Response.json({ error: "Failed to fetch users" }, { status: 500 });
      }
      users = data || [];
    }

    if (users.length === 0) {
      return Response.json({ error: "No recipients found" }, { status: 400 });
    }

    let sent = 0;
    let failed = 0;

    const BATCH_SIZE = 10;
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);

      await Promise.all(
        batch.map(async (user) => {
          try {
            const firstName = user.full_name?.split(" ")[0] || "there";
            const html = buildEmail({ firstName, subject, message });

            await resend.emails.send({
              from: "Fancy Digitals <noreply@fancydigitals.com.ng>",
              to: user.email,
              replyTo: ADMIN_EMAIL,
              subject,
              html,
            });
            sent++;
          } catch (err) {
            failed++;
            console.error("Failed to send to:", user.email, err.message);
          }
        })
      );

      if (i + BATCH_SIZE < users.length) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    return Response.json({ success: true, sent, failed, total: users.length });
  } catch (err) {
    console.error("Broadcast error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

function buildEmail({ firstName, subject, message }) {
  const paragraphs = message
    .split("\n")
    .filter((line) => line.trim())
    .map(
      (line) =>
        `<p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:#1d1d1f;font-weight:400;letter-spacing:-0.01em;">${line.trim()}</p>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${subject}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 24px 16px !important; }
      .card { padding: 32px 24px !important; border-radius: 16px !important; }
      .banner { border-radius: 16px !important; }
      .hero-title { font-size: 24px !important; line-height: 1.25 !important; }
      .cta-btn { padding: 16px 28px !important; font-size: 14px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f5f5f7;opacity:0;">
    ${subject} — from Fancy Digitals
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f7;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <a href="https://fancydigitals.com.ng" style="text-decoration:none;display:inline-block;">
                <img
                  src="https://fancydigitals.com.ng/logo.png"
                  alt="Fancy Digitals"
                  width="48"
                  height="48"
                  style="display:block;border:0;border-radius:10px;"
                />
              </a>
            </td>
          </tr>

          <!-- BANNER IMAGE -->
          <tr>
            <td style="padding-bottom:32px;">
              <a href="https://fancydigitals.com.ng" style="text-decoration:none;display:block;">
                <img
                  src="https://fancydigitals.com.ng/email-banner.png"
                  alt="Fancy Digitals — We Build. We Scale. You Lead."
                  width="600"
                  class="banner"
                  style="display:block;width:100%;height:auto;border:0;border-radius:20px;"
                />
              </a>
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td class="card" style="background:#ffffff;border-radius:24px;padding:48px 48px 40px;">

              <!-- GREETING -->
              <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#86868b;letter-spacing:0.02em;text-transform:uppercase;">
                Hi ${firstName},
              </p>

              <!-- HERO TITLE (first line of message, bold) -->
              <h1 class="hero-title" style="margin:0 0 28px;font-size:30px;line-height:1.15;font-weight:700;color:#1d1d1f;letter-spacing:-0.03em;">
                ${subject}
              </h1>

              <!-- DIVIDER -->
              <div style="height:1px;background:#e5e5ea;margin:0 0 28px;"></div>

              <!-- MESSAGE -->
              ${paragraphs}

              <!-- CTA -->
              <div style="margin:36px 0 8px;text-align:center;">
                <a
                  href="https://fancydigitals.com.ng/free-ai-visibility-checker"
                  class="cta-btn"
                  style="display:inline-block;background:#075a01;color:#ffffff;font-size:15px;font-weight:600;padding:16px 36px;border-radius:980px;text-decoration:none;letter-spacing:-0.01em;"
                >
                  Check My AI Recommendation Score
                </a>
              </div>

              <p style="margin:16px 0 0;text-align:center;font-size:13px;color:#86868b;">
                Takes 30 seconds. No signup required.
              </p>

            </td>
          </tr>

          <!-- SIGNATURE BLOCK -->
          <tr>
            <td style="padding:32px 8px 0;">
              <p style="margin:0 0 4px;font-size:15px;color:#1d1d1f;font-weight:600;letter-spacing:-0.01em;">
                Bashir Ismail
              </p>
              <p style="margin:0;font-size:13px;color:#86868b;">
                Founder, Fancy Digitals
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:48px 8px 0;">
              <div style="height:1px;background:#e5e5ea;margin-bottom:24px;"></div>

              <p style="margin:0 0 12px;font-size:12px;color:#86868b;line-height:1.6;">
                <a href="https://fancydigitals.com.ng" style="color:#075a01;text-decoration:none;font-weight:600;">fancydigitals.com.ng</a>
                &nbsp;·&nbsp;
                <a href="mailto:fancydigitalsng@gmail.com" style="color:#86868b;text-decoration:none;">fancydigitalsng@gmail.com</a>
              </p>

              <p style="margin:0 0 8px;font-size:11px;color:#a1a1a6;line-height:1.5;">
                Fancy Digitals · Lagos, Nigeria
              </p>

              <p style="margin:0;font-size:11px;color:#a1a1a6;line-height:1.5;">
                You received this email because you have an account with Fancy Digitals.
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
}