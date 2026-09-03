import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth/dal";
import { writeAuditLog } from "@/lib/audit";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const simulation = await db.simulation.findFirst({
    where: { id, project: { ownerId: user.id } },
    include: { project: true },
  });

  if (!simulation) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ simulation });
}

export async function DELETE(_req: Request, { params }: Params) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const simulation = await db.simulation.findFirst({ where: { id, project: { ownerId: user.id } } });
  if (!simulation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.simulation.delete({ where: { id } });
  await writeAuditLog({ actorUserId: user.id, action: "SIMULATION_DELETED", entityType: "Simulation", entityId: id });

  return NextResponse.json({ ok: true });
}
