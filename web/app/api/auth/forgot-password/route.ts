import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { writeAuditLog } from "@/lib/audit";
import { sendEmail } from "@/lib/email/mailer";
import { generatePasswordResetEmail } from "@/lib/email/templates";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const SALT_ROUNDS = 12;

export async function POST(req: Request) {
  const key = clientKeyFromRequest(req, "forgot-password");
  const limited = rateLimit(key, 5, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (user && user.status === "ACTIVE") {
      // Invalidate any existing unused reset tokens for this user
      await db.passwordResetToken.deleteMany({
        where: { userId: user.id, purpose: "PASSWORD_RESET" },
      });

      const rawToken = randomBytes(32).toString("hex");
      const tokenHash = await bcrypt.hash(rawToken, SALT_ROUNDS);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour validity

      await db.passwordResetToken.create({
        data: {
          tokenHash,
          purpose: "PASSWORD_RESET",
          expiresAt,
          userId: user.id,
        },
      });

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const resetUrl = `${appUrl}/reset-password?token=${rawToken}`;

      await sendEmail({
        to: user.email,
        subject: "Security Alert: Reset Your BUSINESS.IN Password",
        html: generatePasswordResetEmail({
          recipientName: user.name,
          recipientEmail: user.email,
          actionUrl: resetUrl,
        }),
      });

      await writeAuditLog({
        actorUserId: user.id,
        action: "PASSWORD_RESET_REQUESTED",
        entityType: "User",
        entityId: user.id,
      });
    }

    // Always return a non-revealing generic response
    return NextResponse.json({
      success: true,
      message: "If an account exists with that email address, a password reset link has been dispatched.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}