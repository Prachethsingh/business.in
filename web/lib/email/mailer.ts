import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER || 'prachethsingh@gmail.com';
const pass = process.env.SMTP_PASS || '';

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

if (process.env.NODE_ENV === 'development' && pass) {
  transporter.verify((error) => {
    if (error) {
      console.warn('Gmail SMTP verification warning:', error.message);
    } else {
      console.log('Gmail SMTP server is connected and ready to send emails.');
    }
  });
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  const from = process.env.EMAIL_FROM ?? `"BUSINESS.IN" <${user}>`;

  if (!pass) {
    console.log(`\n📧 [DEV MODE - SIMULATED EMAIL SENT]`);
    console.log(`To: ${options.to}`);
    console.log(`From: ${from}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Content:\n${options.html}\n`);
    return;
  }

  await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}