import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth/dal";
import { createProjectSchema } from "@/lib/validation";
import { writeAuditLog } from "@/lib/audit";

export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await db.project.findMany({
    where: { ownerId: user.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { simulations: true } } },
  });

  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid project data." }, { status: 400 });
  }

  const project = await db.project.create({
    data: {
      ownerId: user.id,
      name: parsed.data.name,
      businessType: parsed.data.businessType,
      city: parsed.data.city,
    },
  });

  await writeAuditLog({
    actorUserId: user.id,
    action: "PROJECT_CREATED",
    entityType: "Project",
    entityId: project.id,
  });

  return NextResponse.json({ project }, { status: 201 });
}
