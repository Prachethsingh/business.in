import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/dal";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const role = searchParams.get("role");

  const users = await db.user.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { email: { contains: search } },
                { name: { contains: search } },
              ],
            }
          : {},
        role ? { role: role as "USER" | "ADMIN" } : {},
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      lastLoginAt: true,
      _count: {
        select: { projects: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ users });
}
