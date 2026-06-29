import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export async function POST(req) {
  try {
    const { adminEmail, subject, message } = await req.json();

    if (adminEmail !== ADMIN_EMAIL) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!subject?.trim() || !message?.trim()) {
      return Response.json({ error: "Subject and message are required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: users, error: dbError } = await supabase
      .from("profiles")
      .select("email, full_name")
      .not("email", "is", null);

    if (dbError) {
      return Response.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    if (!users || users.length === 0) {
      return Response.json({ error: "No users found" }, { status: 400 });
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
        `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">${line.trim()}</p>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a href="https://fancydigitals.com.ng" style="text-decoration:none;">
                <div style="display:inline-block;background:#075a01;border-radius:10px;padding:8px 18px;">
                  <span style="color:white;font-size:16px;font-weight:900;letter-spacing:-0.5px;">Fancy Digitals</span>
                </div>
              </a>
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:20px;padding:40px 40px 32px;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
              <p style="margin:0 0 24px;font-size:22px;font-weight:800;color:#111827;letter-spacing:-0.5px;">
                Hey ${firstName},
              </p>
              ${paragraphs}
              <div style="margin:32px 0 8px;text-align:center;">
                <a
                  href="https://fancydigitals.com.ng/free-ai-visibility-checker"
                  style="display:inline-block;background:#075a01;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;"
                >
                  Check My AI Recommendation Score
                </a>
              </div>
              <p style="margin:24px 0 0;font-size:14px;color:#6b7280;line-height:1.6;">
                Always rooting for your success,<br/>
                <strong style="color:#111827;">Bashir — Fancy Digitals</strong>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:28px 0 0;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;">
                Fancy Digitals · Lagos, Nigeria
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                <a href="https://fancydigitals.com.ng" style="color:#075a01;text-decoration:none;font-weight:600;">fancydigitals.com.ng</a>
                &nbsp;·&nbsp;
                <a href="mailto:fancydigitalsng@gmail.com" style="color:#9ca3af;text-decoration:none;">fancydigitalsng@gmail.com</a>
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