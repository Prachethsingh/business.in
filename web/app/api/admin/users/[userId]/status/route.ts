import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED"]),
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
    const { status } = statusSchema.parse(body);

    const user = await db.user.update({
      where: { id: userId },
      data: { status },
      select: { id: true, email: true, status: true },
    });

    // If suspended, invalidate user's active sessions immediately
    if (status === "SUSPENDED") {
      await db.session.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }

    await db.auditLog.create({
      data: {
        actorUserId: admin.id,
        action: `USER_STATUS_${status}`,
        entityType: "User",
        entityId: userId,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }
}
