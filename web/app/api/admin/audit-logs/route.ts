import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/dal";
import { db } from "@/lib/db";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const logs = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      actor: {
        select: { id: true, email: true, name: true },
      },
    },
  });

  return NextResponse.json({ logs });
}
