import "server-only";
import { verifySession, type SessionUser } from "@/lib/auth/session";

export async function requireUser(): Promise<SessionUser | null> {
  try {
    return await verifySession();
  } catch (err) {
    console.warn("[dal] requireUser session check failed:", err);
    return null;
  }
}

export async function requireAdmin(): Promise<SessionUser | null> {
  try {
    const user = await verifySession();
    if (!user || user.role !== "ADMIN") return null;
    return user;
  } catch (err) {
    console.warn("[dal] requireAdmin session check failed:", err);
    return null;
  }
}

