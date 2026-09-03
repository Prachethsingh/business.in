import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation";
import { rateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { writeAuditLog } from "@/lib/audit";

const GENERIC_ERROR = { error: "Invalid email or password." };

export async function POST(req: Request) {
  const key = clientKeyFromRequest(req, "login");
  const limited = rateLimit(key, 8, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(GENERIC_ERROR, { status: 400 });
  }

  const { email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const user = await db.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    return NextResponse.json(GENERIC_ERROR, { status: 401 });
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    return NextResponse.json(GENERIC_ERROR, { status: 401 });
  }

  if (user.status === "SUSPENDED") {
    
    return NextResponse.json(GENERIC_ERROR, { status: 401 });
  }

  
  
  
  
  

  await createSession(user.id, req.headers.get("user-agent") ?? undefined);
  await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await writeAuditLog({ actorUserId: user.id, action: "USER_LOGIN", entityType: "User", entityId: user.id });

  return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role, emailVerifiedAt: user.emailVerifiedAt });
}