import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const SESSION_COOKIE = "biz_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; 

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string, deviceMeta?: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.session.create({
    data: { userId, tokenHash, deviceMeta: deviceMeta ?? null, expiresAt },
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroyCurrentSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    await db.session.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
  store.delete(SESSION_COOKIE);
}

export async function destroyUserSessions(userId: string): Promise<void> {
  await db.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
};

export async function verifySession(): Promise<SessionUser | null> {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name ?? null,
        role: "USER",
        status: "ACTIVE",
      };
    }
  } catch (err) {
    void err;
  }

  try {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const tokenHash = hashToken(token);
    const session = await db.session.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!session || session.revokedAt || session.expiresAt < new Date()) return null;
    if (session.user.status === "SUSPENDED") return null;

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      status: session.user.status,
    };
  } catch (err) {
    console.error("[verifySession] error:", err);
    return null;
  }
}
