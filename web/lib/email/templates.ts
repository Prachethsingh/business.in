/**
 * BUSINESS.IN — Unique High-Tech Dark Mode Email Templates
 * Tailored for high delivery rates, mobile responsiveness, and executive branding.
 */

interface EmailTemplateOptions {
  recipientName?: string | null;
  recipientEmail: string;
  actionUrl: string;
}

export function generateVerificationEmail({ recipientName, recipientEmail, actionUrl }: EmailTemplateOptions): string {
  const name = recipientName ? recipientName.trim() : recipientEmail.split("@")[0];
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activate Your BUSINESS.IN Intelligence Access</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; }
    td { padding: 0; }
    img { border: 0; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #0A0A0A; padding-bottom: 40px; }
    .main-card { background-color: #121212; margin: 0 auto; width: 100%; max-width: 580px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
    .btn-gradient { background: linear-gradient(135deg, #00FF85 0%, #1E90FF 100%); border-radius: 12px; color: #0A0A0A !important; font-weight: 800; font-size: 14px; text-decoration: none; padding: 14px 28px; display: inline-block; letter-spacing: 0.5px; box-shadow: 0 8px 24px rgba(0, 255, 133, 0.25); text-transform: uppercase; }
    @media screen and (max-width: 600px) {
      .main-card { border-radius: 0 !important; }
      .content-padding { padding: 24px 20px !important; }
    }
  </style>
</head>
<body style="background-color: #0A0A0A; margin: 0; padding: 0;">
  <center class="wrapper" style="padding: 30px 10px;">
    <table class="main-card" width="100%" cellpadding="0" cellspacing="0" style="background-color: #121212; max-width: 580px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden;">
      <!-- Header Glowing Bar -->
      <tr>
        <td height="4" style="background: linear-gradient(90deg, #00FF85 0%, #1E90FF 50%, #FFD700 100%);"></td>
      </tr>

      <!-- Brand Logo Header -->
      <tr>
        <td class="content-padding" style="padding: 36px 36px 20px 36px; text-align: center;">
          <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF; font-family: 'Space Grotesk', -apple-system, sans-serif;">
            BUSINESS<span style="color: #00FF85;">.IN</span>
          </div>
          <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #00FF85; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; font-weight: 700;">
            AI Business Location Intelligence · India
          </div>
        </td>
      </tr>

      <!-- Hero Message -->
      <tr>
        <td class="content-padding" style="padding: 10px 36px 20px 36px;">
          <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0 0 12px 0; line-height: 1.3;">
            Welcome, ${name}. Activate Your Feasibility Engine.
          </h1>
          <p style="color: #CBD5E1; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
            You are one step away from analyzing commercial high-streets, modeling 10,000-run Monte Carlo simulations, and de-risking your investment with institutional-grade decision support.
          </p>

          <!-- Security Badge -->
          <div style="background: rgba(0, 255, 133, 0.08); border: 1px solid rgba(0, 255, 133, 0.25); border-radius: 10px; padding: 12px 16px; margin-bottom: 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="24" style="vertical-align: middle; font-size: 16px;">🔐</td>
                <td style="color: #00FF85; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600; line-height: 1.4;">
                  Action Required: Verify account credentials for <strong>${recipientEmail}</strong>.
                </td>
              </tr>
            </table>
          </div>

          <!-- Primary Call to Action -->
          <div style="text-align: center; margin: 28px 0 32px 0;">
            <a href="${actionUrl}" class="btn-gradient" target="_blank" style="background: linear-gradient(135deg, #00FF85 0%, #1E90FF 100%); border-radius: 12px; color: #0A0A0A !important; font-weight: 800; font-size: 13px; text-decoration: none; padding: 14px 32px; display: inline-block; letter-spacing: 0.5px; text-transform: uppercase;">
              Verify Email & Unlock Dashboard →
            </a>
          </div>

          <p style="color: #94A3B8; font-size: 12px; line-height: 1.5; margin: 0 0 10px 0;">
            Button not clickable? Paste this URL directly into your browser:
          </p>
          <div style="background: #1A1A1A; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 10px 12px; font-family: monospace; font-size: 11px; color: #38BDF8; word-break: break-all; margin-bottom: 24px;">
            ${actionUrl}
          </div>

          <p style="color: #64748B; font-size: 11px; margin: 0;">
            ⏳ This cryptographic verification token expires in <strong>24 hours</strong>. If you did not create an account on BUSINESS.IN, you can safely disregard this notification.
          </p>
        </td>
      </tr>

      <!-- Value Props Feature Ribbon -->
      <tr>
        <td style="background-color: #171717; padding: 20px 36px; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="color: #FFFFFF; font-size: 11px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; font-weight: 700; padding-bottom: 8px;">
                Platform Capabilities Unlocked:
              </td>
            </tr>
            <tr>
              <td style="color: #94A3B8; font-size: 12px; line-height: 1.6;">
                • <strong>10,000-Iteration Monte Carlo Math</strong> (Worst, Expected, Best cases)<br>
                • <strong>Catchment Footfall & Competition Mapping</strong> for Koramangala, Indiranagar & beyond<br>
                • <strong>36-Month Predictive Cash Runway</strong> to avoid working capital exhaustion
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 24px 36px; text-align: center; color: #64748B; font-size: 11px; font-family: sans-serif; line-height: 1.5;">
          <p style="margin: 0 0 6px 0;">
            Sent by <strong>BUSINESS.IN Research & Systems</strong> · Hosted in India
          </p>
          <p style="margin: 0 0 6px 0;">
            Support: <a href="mailto:prachethsingh@gmail.com" style="color: #38BDF8; text-decoration: none;">prachethsingh@gmail.com</a> · Bengaluru, Karnataka
          </p>
          <p style="margin: 8px 0 0 0; color: #475569; font-size: 10px;">
            &copy; ${year} BUSINESS.IN SaaS Inc. All rights reserved. Compliant with India DPDP Act 2023.
          </p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
}

export function generatePasswordResetEmail({ recipientName, recipientEmail, actionUrl }: EmailTemplateOptions): string {
  const name = recipientName ? recipientName.trim() : recipientEmail.split("@")[0];
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your BUSINESS.IN Security Credentials</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; }
    td { padding: 0; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #0A0A0A; padding-bottom: 40px; }
    .main-card { background-color: #121212; margin: 0 auto; width: 100%; max-width: 580px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
    .btn-gradient { background: linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%); border-radius: 12px; color: #0A0A0A !important; font-weight: 800; font-size: 13px; text-decoration: none; padding: 14px 32px; display: inline-block; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 8px 24px rgba(255, 107, 107, 0.25); }
    @media screen and (max-width: 600px) {
      .main-card { border-radius: 0 !important; }
      .content-padding { padding: 24px 20px !important; }
    }
  </style>
</head>
<body style="background-color: #0A0A0A; margin: 0; padding: 0;">
  <center class="wrapper" style="padding: 30px 10px;">
    <table class="main-card" width="100%" cellpadding="0" cellspacing="0" style="background-color: #121212; max-width: 580px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden;">
      <!-- Header Rose Alert Bar -->
      <tr>
        <td height="4" style="background: linear-gradient(90deg, #FF6B6B 0%, #FFD700 50%, #1E90FF 100%);"></td>
      </tr>

      <!-- Brand Logo Header -->
      <tr>
        <td class="content-padding" style="padding: 36px 36px 20px 36px; text-align: center;">
          <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF; font-family: 'Space Grotesk', -apple-system, sans-serif;">
            BUSINESS<span style="color: #00FF85;">.IN</span>
          </div>
          <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #FF6B6B; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; font-weight: 700;">
            Security & Identity Safeguard
          </div>
        </td>
      </tr>

      <!-- Hero Message -->
      <tr>
        <td class="content-padding" style="padding: 10px 36px 20px 36px;">
          <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0 0 12px 0; line-height: 1.3;">
            Password Reset Request
          </h1>
          <p style="color: #CBD5E1; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
            Hello ${name}, a request was received to reset the authentication password for your account associated with <strong>${recipientEmail}</strong>.
          </p>

          <!-- Warning Notice -->
          <div style="background: rgba(255, 107, 107, 0.08); border: 1px solid rgba(255, 107, 107, 0.3); border-radius: 10px; padding: 12px 16px; margin-bottom: 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="24" style="vertical-align: middle; font-size: 16px;">⚠️</td>
                <td style="color: #FF8E8E; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600; line-height: 1.4;">
                  Time-Sensitive Token: Expires in <strong>60 minutes</strong>. All active sessions will be terminated upon reset.
                </td>
              </tr>
            </table>
          </div>

          <!-- Primary Call to Action -->
          <div style="text-align: center; margin: 28px 0 32px 0;">
            <a href="${actionUrl}" class="btn-gradient" target="_blank" style="background: linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%); border-radius: 12px; color: #0A0A0A !important; font-weight: 800; font-size: 13px; text-decoration: none; padding: 14px 32px; display: inline-block; letter-spacing: 0.5px; text-transform: uppercase;">
              Set New Secure Password →
            </a>
          </div>

          <p style="color: #94A3B8; font-size: 12px; line-height: 1.5; margin: 0 0 10px 0;">
            Alternative direct link:
          </p>
          <div style="background: #1A1A1A; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 10px 12px; font-family: monospace; font-size: 11px; color: #FFA07A; word-break: break-all; margin-bottom: 24px;">
            ${actionUrl}
          </div>

          <p style="color: #64748B; font-size: 11px; margin: 0; line-height: 1.5;">
            🛡️ If you did not request this password reset, please ignore this email. Your current password remains protected and no changes have been applied.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 24px 36px; text-align: center; color: #64748B; font-size: 11px; font-family: sans-serif; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.06);">
          <p style="margin: 0 0 6px 0;">
            BUSINESS.IN Security Desk · <a href="mailto:prachethsingh@gmail.com" style="color: #38BDF8; text-decoration: none;">prachethsingh@gmail.com</a>
          </p>
          <p style="margin: 8px 0 0 0; color: #475569; font-size: 10px;">
            &copy; ${year} BUSINESS.IN. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
}
