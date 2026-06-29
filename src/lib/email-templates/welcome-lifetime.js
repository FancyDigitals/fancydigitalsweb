import { emailLayout } from "./base";

export function welcomeLifetimeEmail({ name }) {
  const firstName = (name || "").split(" ")[0] || "there";

  const content = `
    <!-- Hero -->
    <tr>
      <td class="px" style="padding: 48px 48px 0;">
        <p style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ff914d;">
          Lifetime · Activated
        </p>
        <h1 class="h1" style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:38px;font-weight:800;line-height:1.1;letter-spacing:-0.02em;color:#0a0a0a;">
          ${escapeHtml(firstName)}, this is forever.
        </h1>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;line-height:1.65;color:#525252;">
          You now have Lifetime access to Fancy Digitals. No renewals. No subscriptions. No expiry dates. Just every tool we build — yours, for as long as Fancy Digitals exists.
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

    <!-- Lifetime perks -->
    <tr>
      <td class="px" style="padding: 48px 48px 0;">
        <p style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">
          What you own now
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${benefitRow("Every tool, forever", "AI Resume Builder, Cover Letter, Landing Page Generator, AI Readiness — all unlimited, all yours.")}
          ${benefitRow("Every future tool", "Every new tool we ship — automatically included. No upgrade prompts. No upsells.")}
          ${benefitRow("Publish unlimited sites", "Ship landing pages on subdomains or your own custom domains. No caps.")}
          ${benefitRow("Client portals", "Invite up to 3 clients per published page. Built for agency work.")}
          ${benefitRow("Priority access", "Founder-level support. Your replies come directly to me.")}
        </table>
      </td>
    </tr>

    <!-- Founder note -->
    <tr>
      <td class="px" style="padding: 40px 48px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;border-radius:14px;">
          <tr>
            <td style="padding: 28px;">
              <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ff914d;">
                A note from the founder
              </p>
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;line-height:1.7;color:#e5e5e5;">
                Lifetime users are why Fancy Digitals exists. You bet on this product early — and I don't forget that. If you ever need anything, hit reply. It comes to my inbox.
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
          Welcome to the family,<br>
          <strong style="color:#0a0a0a;">Bashir Ismail</strong><br>
          <span style="color:#999;font-size:13px;">Founder · Fancy Digitals</span>
        </p>
      </td>
    </tr>
  `;

  return {
    subject: "You're in. Lifetime access activated.",
    html: emailLayout({
      preheader: "Every tool, every feature, forever.",
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
              <span style="display:inline-block;width:6px;height:6px;background:#ff914d;border-radius:50%;"></span>
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