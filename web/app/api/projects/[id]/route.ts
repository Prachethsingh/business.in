import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth/dal";
import { updateProjectSchema } from "@/lib/validation";
import { writeAuditLog } from "@/lib/audit";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await db.project.findFirst({
    where: { id, ownerId: user.id },
    include: { simulations: { orderBy: { createdAt: "desc" } }, locations: true },
  });

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PATCH(req: Request, { params }: Params) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await db.project.findFirst({ where: { id, ownerId: user.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = updateProjectSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data." }, { status: 400 });

  const project = await db.project.update({ where: { id }, data: parsed.data });

  await writeAuditLog({
    actorUserId: user.id,
    action: "PROJECT_UPDATED",
    entityType: "Project",
    entityId: project.id,
    metadata: parsed.data,
  });

  return NextResponse.json({ project });
}

export async function DELETE(_req: Request, { params }: Params) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await db.project.findFirst({ where: { id, ownerId: user.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.project.delete({ where: { id } });
  await writeAuditLog({ actorUserId: user.id, action: "PROJECT_DELETED", entityType: "Project", entityId: id });

  return NextResponse.json({ ok: true });
}
