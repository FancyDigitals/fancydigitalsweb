// Base email template — sleek, minimal, premium
// All emails wrap their content in this layout

const SITE_URL = "https://fancydigitals.com.ng";
const LOGO_URL = `${SITE_URL}/logo.png`;

export function emailLayout({ preheader, content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Fancy Digitals</title>
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; background: #fafafa; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  a { color: #075a01; text-decoration: none; }
  @media only screen and (max-width: 600px) {
    .container { width: 100% !important; max-width: 100% !important; }
    .px { padding-left: 28px !important; padding-right: 28px !important; }
    .h1 { font-size: 30px !important; line-height: 1.15 !important; }
    .h2 { font-size: 22px !important; }
    .btn { width: 100% !important; box-sizing: border-box; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#fafafa;">

<!-- Preheader (invisible preview text) -->
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
  ${escapeHtml(preheader || "")}
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fafafa;">
  <tr>
    <td align="center" style="padding: 40px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);">

        <!-- Logo header -->
        <tr>
          <td align="center" class="px" style="padding: 40px 48px 0;">
            <img src="${LOGO_URL}" alt="Fancy Digitals" width="44" height="44" style="display:block;border-radius:10px;">
          </td>
        </tr>

        <!-- Content -->
        ${content}

        <!-- Footer -->
        <tr>
          <td class="px" style="padding: 40px 48px 36px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid #eeeeee;padding-top:32px;">
              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <a href="https://x.com/FancyDigitalsng" style="text-decoration:none;margin:0 8px;display:inline-block;">
                    <span style="display:inline-block;width:32px;height:32px;line-height:32px;border-radius:50%;background:#f4f4f4;color:#666;font-size:13px;font-weight:700;text-align:center;">X</span>
                  </a>
                  <a href="https://linkedin.com/company/135204010" style="text-decoration:none;margin:0 8px;display:inline-block;">
                    <span style="display:inline-block;width:32px;height:32px;line-height:32px;border-radius:50%;background:#f4f4f4;color:#666;font-size:11px;font-weight:700;text-align:center;">in</span>
                  </a>
                  <a href="https://wa.me/2349034360785" style="text-decoration:none;margin:0 8px;display:inline-block;">
                    <span style="display:inline-block;width:32px;height:32px;line-height:32px;border-radius:50%;background:#f4f4f4;color:#666;font-size:11px;font-weight:700;text-align:center;">WA</span>
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#999999;font-size:12px;line-height:1.6;">
                  <p style="margin:0 0 4px;font-weight:600;color:#666;">Fancy Digitals</p>
                  <p style="margin:0 0 12px;">Lagos, Nigeria · <a href="${SITE_URL}" style="color:#999;text-decoration:underline;">fancydigitals.com.ng</a></p>
                  <p style="margin:0;font-size:11px;color:#bbb;">
                    You're receiving this because of a change to your Fancy Digitals account.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}