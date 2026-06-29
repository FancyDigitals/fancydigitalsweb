import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Fancy Digitals <noreply@fancydigitals.com.ng>";
const REPLY_TO = "fancydigitalsng@gmail.com";

/**
 * Send an email via Resend
 * @param {Object} opts
 * @param {string|string[]} opts.to - recipient email(s)
 * @param {string} opts.subject - email subject
 * @param {string} opts.html - HTML body
 * @param {string} [opts.text] - plain text fallback
 */
export async function sendEmail({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[Email] RESEND_API_KEY missing — skipping send");
    return { skipped: true };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      reply_to: REPLY_TO,
      subject,
      html,
      text: text || stripHtml(html),
    });

    if (result.error) {
      console.error("[Email] Send failed:", result.error);
      return { error: result.error };
    }

    console.log(`[Email] ✅ Sent to ${to} — id=${result.data?.id}`);
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error("[Email] Exception:", err);
    return { error: err.message };
  }
}

function stripHtml(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}