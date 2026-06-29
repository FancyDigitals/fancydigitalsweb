import { emailLayout } from "./base";

export function welcomeProMonthlyEmail({ name }) {
  const firstName = (name || "").split(" ")[0] || "there";

  const content = `
    <!-- Hero -->
    <tr>
      <td class="px" style="padding: 48px 48px 0;">
        <p style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ff914d;">
          Pro Monthly · Activated
        </p>
        <h1 class="h1" style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:38px;font-weight:800;line-height:1.1;letter-spacing:-0.02em;color:#0a0a0a;">
          Welcome to Pro, ${escapeHtml(firstName)}.
        </h1>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;line-height:1.65;color:#525252;">
          Your Pro Monthly plan is now active. Every tool, every feature, no limits — all yours from this moment forward.
        </p>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td class="px" style="padding: 36px 48px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="border-radius:12px;background:#075a01;">
              <a href="https://fancydigitals.com.ng/dashboard" class="btn" style="display:inline-block;padding:14px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">
                Open Dashboard →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- What's unlocked -->
    <tr>
      <td class="px" style="padding: 48px 48px 0;">
        <p style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">
          What's unlocked
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${benefitRow("Unlimited AI generations", "Resume, cover letter, landing page generator — no daily limits.")}
          ${benefitRow("Publish unlimited landing pages", "Ship as many sites as you need. All on premium subdomains.")}
          ${benefitRow("Custom domains", "Connect your own domain. White-label, professional, yours.")}
          ${benefitRow("Client portals", "Invite up to 3 clients per page. Give them editor access without giving up control.")}
          ${benefitRow("Premium tone systems & languages", "Bold, Luxury, Minimal tones. Spanish, French, Arabic, German support.")}
        </table>
      </td>
    </tr>

    <!-- Tip -->
    <tr>
      <td class="px" style="padding: 40px 48px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9f9f7;border-radius:14px;">
          <tr>
            <td style="padding: 24px 26px;">
              <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;font-weight:700;color:#0a0a0a;">
                A small note
              </p>
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;line-height:1.65;color:#666;">
                Need anything? Just reply to this email. It comes straight to me.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Sign-off -->
    <tr>
      <td class="px" style="padding: 36px 48px 0;">
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;line-height:1.6;color:#525252;">
          Welcome aboard,<br>
          <strong style="color:#0a0a0a;">Bashir Ismail</strong><br>
          <span style="color:#999;font-size:13px;">Founder · Fancy Digitals</span>
        </p>
      </td>
    </tr>
  `;

  return {
    subject: "Welcome to Pro — your Fancy Digitals upgrade is live",
    html: emailLayout({
      preheader: "Every tool. Every feature. No limits.",
      content,
    }),
  };
}

function benefitRow(title, desc) {
  return `
    <tr>
      <td style="padding: 0 0 18px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td valign="top" width="20" style="padding-top:4px;">
              <span style="display:inline-block;width:6px;height:6px;background:#075a01;border-radius:50%;"></span>
            </td>
            <td valign="top" style="padding-left:14px;">
              <p style="margin:0 0 3px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;color:#0a0a0a;">
                ${escapeHtml(title)}
              </p>
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;line-height:1.6;color:#777;">
                ${escapeHtml(desc)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function escapeHtml(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}