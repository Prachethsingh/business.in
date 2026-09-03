import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { z } from "zod";

const proofSchema = z.object({
  utr: z.string().min(6).max(50),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { id: orderId } = await params;

  try {
    const body = await req.json();
    const { utr } = proofSchema.parse(body);

    const order = await db.paymentOrder.findUnique({
      where: { id: orderId },
    });

    if (!order || order.userId !== user.id) {
      return NextResponse.json({ error: "ORDER_NOT_FOUND" }, { status: 404 });
    }

    const proof = await db.paymentProof.create({
      data: {
        orderId: order.id,
        utr: utr.trim(),
      },
    });

    await db.paymentOrder.update({
      where: { id: order.id },
      data: { status: "SUBMITTED" },
    });

    await db.auditLog.create({
      data: {
        actorUserId: user.id,
        action: "PAYMENT_PROOF_SUBMITTED",
        entityType: "PaymentOrder",
        entityId: order.id,
        metadata: { utr: utr.trim() },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment proof submitted successfully. Account will be unlocked upon verification.",
      proof,
    });
  } catch {
    return NextResponse.json({ error: "INVALID_REQUEST_OR_DUPLICATE_UTR" }, { status: 400 });
  }
}
