import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { registerSchema } from "@/lib/validation";
import { rateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { writeAuditLog } from "@/lib/audit";
import { sendEmail } from "@/lib/email/mailer";
import { generateVerificationEmail } from "@/lib/email/templates";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const SALT_ROUNDS = 12;

const GENERIC_ERROR = { error: "Unable to complete registration. Please try again." };

export async function POST(req: Request) {
  const key = clientKeyFromRequest(req, "register");
  const limited = rateLimit(key, 5, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(GENERIC_ERROR, { status: 400 });
  }

  const { email, password, name } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await db.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    
    return NextResponse.json(GENERIC_ERROR, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: { email: normalizedEmail, passwordHash, name: name ?? null },
  });

  
  const token = randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(token, SALT_ROUNDS);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); 

  await db.passwordResetToken.create({
    data: {
      tokenHash,
      purpose: "EMAIL_VERIFICATION",
      expiresAt,
      userId: user.id,
    },
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: "Activate your BUSINESS.IN Account",
    html: generateVerificationEmail({
      recipientName: user.name,
      recipientEmail: user.email,
      actionUrl: verificationUrl,
    }),
  });

  await createSession(user.id, req.headers.get("user-agent") ?? undefined);
  await writeAuditLog({
    actorUserId: user.id,
    action: "USER_REGISTERED",
    entityType: "User",
    entityId: user.id,
  });

  return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role });
}