import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { id: simulationId } = await params;

  const simulation = await db.simulation.findUnique({
    where: { id: simulationId },
    include: { project: true },
  });

  if (!simulation || simulation.project.ownerId !== user.id) {
    return NextResponse.json({ error: "SIMULATION_NOT_FOUND" }, { status: 404 });
  }

  const token = randomBytes(16).toString("hex");

  const report = await db.report.upsert({
    where: { simulationId: simulation.id },
    create: {
      simulationId: simulation.id,
      token,
      snapshot: {
        projectName: simulation.project.name,
        businessType: simulation.project.businessType,
        city: simulation.project.city,
        assumptions: simulation.assumptions,
        results: simulation.results,
        modelVersion: simulation.modelVersion,
        generatedAt: new Date().toISOString(),
      },
    },
    update: {
      snapshot: {
        projectName: simulation.project.name,
        businessType: simulation.project.businessType,
        city: simulation.project.city,
        assumptions: simulation.assumptions,
        results: simulation.results,
        modelVersion: simulation.modelVersion,
        generatedAt: new Date().toISOString(),
      },
    },
  });

  return NextResponse.json({
    report: {
      id: report.id,
      token: report.token,
      shareUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://business.in"}/r/${report.token}`,
      status: report.status,
    },
  });
}
