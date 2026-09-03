import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { z } from "zod";

const decisionSchema = z.object({
  decision: z.enum(["APPROVE", "REJECT"]),
  note: z.string().optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const { orderId } = await params;

  try {
    const body = await req.json();
    const { decision, note } = decisionSchema.parse(body);

    const order = await db.paymentOrder.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) {
      return NextResponse.json({ error: "ORDER_NOT_FOUND" }, { status: 404 });
    }

    await db.$transaction(async (tx) => {
      await tx.paymentReview.create({
        data: {
          orderId: order.id,
          reviewerId: admin.id,
          decision: decision === "APPROVE" ? "APPROVE" : "REJECT",
          note: note ?? null,
        },
      });

      await tx.paymentOrder.update({
        where: { id: order.id },
        data: { status: decision === "APPROVE" ? "APPROVED" : "REJECTED" },
      });

      if (decision === "APPROVE") {
        await tx.entitlement.create({
          data: {
            userId: order.userId,
            planCode: "PRO",
            status: "ACTIVE",
          },
        });
      }

      await tx.auditLog.create({
        data: {
          actorUserId: admin.id,
          action: `PAYMENT_ORDER_${decision}D`,
          entityType: "PaymentOrder",
          entityId: order.id,
          metadata: { userId: order.userId, note },
        },
      });
    });

    return NextResponse.json({ success: true, message: `Order ${decision.toLowerCase()}d successfully.` });
  } catch {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }
}
