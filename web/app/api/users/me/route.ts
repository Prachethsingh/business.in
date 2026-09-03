import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
});

export async function GET() {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const profile = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      lastLoginAt: true,
      entitlements: {
        where: { status: "ACTIVE" },
        select: { planCode: true, grantedAt: true, expiresAt: true },
      },
    },
  });

  return NextResponse.json({ user: profile });
}

export async function PATCH(req: Request) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateProfileSchema.parse(body);

    const updated = await db.user.update({
      where: { id: user.id },
      data: {
        ...(data.name ? { name: data.name } : {}),
      },
      select: { id: true, email: true, name: true },
    });

    await db.auditLog.create({
      data: {
        actorUserId: user.id,
        action: "USER_PROFILE_UPDATED",
        entityType: "User",
        entityId: user.id,
        metadata: { updatedFields: Object.keys(data) },
      },
    });

    return NextResponse.json({ user: updated });
  } catch {
    return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 });
  }
}
