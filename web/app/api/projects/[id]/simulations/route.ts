import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth/dal";
import { createSimulationSchema } from "@/lib/validation";
import { runSimulation } from "@/lib/simulator/engine";
import { writeAuditLog } from "@/lib/audit";

const FREE_SCENARIO_CAP = 10;

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await db.project.findFirst({ where: { id, ownerId: user.id } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const simulations = await db.simulation.findMany({
    where: { projectId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ simulations });
}

export async function POST(req: Request, { params }: Params) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await db.project.findFirst({ where: { id, ownerId: user.id } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = createSimulationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid assumptions." }, { status: 400 });

  const isPro = await hasActiveProEntitlement(user.id);
  if (!isPro) {
    const count = await db.simulation.count({ where: { projectId: id } });
    if (count >= FREE_SCENARIO_CAP) {
      return NextResponse.json({ error: "PRO_REQUIRED" }, { status: 402 });
    }
  }

  const results = runSimulation(parsed.data.assumptions);

  const simulation = await db.simulation.create({
    data: {
      projectId: id,
      assumptions: parsed.data.assumptions,
      results: JSON.parse(JSON.stringify(results)),
      modelVersion: results.modelVersion,
    },
  });

  await db.location.create({
    data: {
      projectId: id,
      lat: parsed.data.assumptions.lat,
      lng: parsed.data.assumptions.lng,
      address: parsed.data.assumptions.address,
    },
  });

  await writeAuditLog({
    actorUserId: user.id,
    action: "SIMULATION_CREATED",
    entityType: "Simulation",
    entityId: simulation.id,
  });

  return NextResponse.json({ simulation }, { status: 201 });
}

async function hasActiveProEntitlement(userId: string): Promise<boolean> {
  const entitlement = await db.entitlement.findFirst({
    where: { userId, status: "ACTIVE", planCode: "PRO" },
  });
  return Boolean(entitlement);
}
