import "server-only";
import { verifySession, type SessionUser } from "@/lib/auth/session";

export async function requireUser(): Promise<SessionUser | null> {
  return verifySession();
}

export async function requireAdmin(): Promise<SessionUser | null> {
  const user = await verifySession();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}
