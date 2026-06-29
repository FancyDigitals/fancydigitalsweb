import { emailLayout } from "./base";

export function downgradeToFreeEmail({ name }) {
  const firstName = (name || "").split(" ")[0] || "there";

  const content = `
    <!-- Hero -->
    <tr>
      <td class="px" style="padding: 48px 48px 0;">
        <p style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">
          Plan Updated
        </p>
        <h1 class="h1" style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:34px;font-weight:800;line-height:1.15;letter-spacing:-0.02em;color:#0a0a0a;">
          Your plan has been reverted to Free.
        </h1>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;line-height:1.65;color:#525252;">
          Hi ${escapeHtml(firstName)} — just a quick note that your account is now on the Free plan. You still have access to every tool, just with daily limits.
        </p>
      </td>
    </tr>

    <!-- What stays -->
    <tr>
      <td class="px" style="padding: 40px 48px 0;">
        <p style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">
          What you still get
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${benefitRow("3 AI generations per day", "Resume Builder, Cover Letter — generous daily usage.")}
          ${benefitRow("2 landing page generations per day", "Plus full access to the AI Readiness Checker.")}
          ${benefitRow("All your saved projects", "Nothing was deleted. Everything you've built is safe.")}
        </table>
      </td>
    </tr>

    <!-- Soft CTA -->
    <tr>
      <td class="px" style="padding: 40px 48px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9f9f7;border-radius:14px;">
          <tr>
            <td style="padding: 28px;">
              <p style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;color:#0a0a0a;">
                Changed your mind?
              </p>
              <p style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;line-height:1.6;color:#666;">
                You can return to Pro anytime — your account, projects, and settings will all be exactly where you left them.
              </p>
              <a href="https://fancydigitals.com.ng/pricing" style="display:inline-block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;font-weight:700;color:#075a01;text-decoration:none;">
                See Pro plans →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Sign-off -->
    <tr>
      <td class="px" style="padding: 36px 48px 0;">
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;line-height:1.6;color:#525252;">
          Thanks for being here,<br>
          <strong style="color:#0a0a0a;">Bashir Ismail</strong><br>
          <span style="color:#999;font-size:13px;">Founder · Fancy Digitals</span>
        </p>
      </td>
    </tr>
  `;

  return {
    subject: "Your Fancy Digitals plan has been updated",
    html: emailLayout({
      preheader: "Your account is now on the Free plan. Everything you've built is still here.",
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
              <span style="display:inline-block;width:6px;height:6px;background:#999;border-radius:50%;"></span>
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