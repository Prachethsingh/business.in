import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { z } from "zod";
import bcrypt from "bcryptjs";

const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

const GENERIC_ERROR = { error: "Invalid or expired token." };

export async function POST(req: Request) {
  const key = clientKeyFromRequest(req, "verify-email");
  const limited = rateLimit(key, 5, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = verifyEmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(GENERIC_ERROR, { status: 400 });
  }

  const { token } = parsed.data;

  
  const tokenRecord = await db.passwordResetToken.findFirst({
    where: {
      purpose: "EMAIL_VERIFICATION",
      expiresAt: { gt: new Date() },
    },
  });

  if (!tokenRecord) {
    return NextResponse.json(GENERIC_ERROR, { status: 400 });
  }

  const validToken = await bcrypt.compare(token, tokenRecord.tokenHash);
  if (!validToken) {
    return NextResponse.json(GENERIC_ERROR, { status: 400 });
  }

  
  await db.user.update({
    where: { id: tokenRecord.userId },
    data: { emailVerifiedAt: new Date() },
  });

  await db.passwordResetToken.update({
    where: { id: tokenRecord.id },
    data: { usedAt: new Date() },
  });

  
  
  

  return NextResponse.json({ message: "Email verified successfully." });
}