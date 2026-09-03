import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { z } from "zod";

const roleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const { userId } = await params;

  try {
    const body = await req.json();
    const { role } = roleSchema.parse(body);

    const user = await db.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, role: true },
    });

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        action: `USER_ROLE_CHANGED_TO_${role}`,
        entityType: "User",
        entityId: userId,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }
}
