import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { rateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { writeAuditLog } from "@/lib/audit";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const key = clientKeyFromRequest(req, "reset-password");
  const limited = rateLimit(key, 5, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  try {
    const { token, password } = await req.json().catch(() => ({}));

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "A valid reset token is required." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // Find active, unexpired, unused reset tokens
    const candidateTokens = await db.passwordResetToken.findMany({
      where: {
        purpose: "PASSWORD_RESET",
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    let matchedTokenRecord = null;
    for (const record of candidateTokens) {
      const isMatch = await bcrypt.compare(token, record.tokenHash);
      if (isMatch) {
        matchedTokenRecord = record;
        break;
      }
    }

    if (!matchedTokenRecord || !matchedTokenRecord.user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token. Please request a new one." },
        { status: 400 }
      );
    }

    const newPasswordHash = await hashPassword(password);

    // Atomically update password, mark token as used, and invalidate existing sessions
    await db.$transaction([
      db.user.update({
        where: { id: matchedTokenRecord.userId },
        data: { passwordHash: newPasswordHash },
      }),
      db.passwordResetToken.update({
        where: { id: matchedTokenRecord.id },
        data: { usedAt: new Date() },
      }),
      db.session.deleteMany({
        where: { userId: matchedTokenRecord.userId },
      }),
    ]);

    await writeAuditLog({
      actorUserId: matchedTokenRecord.userId,
      action: "PASSWORD_RESET_COMPLETED",
      entityType: "User",
      entityId: matchedTokenRecord.userId,
    });

    return NextResponse.json({
      success: true,
      message: "Password has been successfully reset. Please sign in with your new credentials.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
  }
}