import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { z } from "zod";

function validateUPIUTR(utr: string): { valid: boolean; reason?: string } {
  const clean = utr.trim();
  if (!/^\d{12}$/.test(clean)) {
    return { valid: false, reason: "UPI UTR / Reference ID must be exactly 12 numeric digits." };
  }
  if (/^(.)\1{11}$/.test(clean)) {
    return { valid: false, reason: "Invalid UTR: repetitive dummy numbers (e.g. 000000000000) are not allowed." };
  }
  const dummyPatterns = [
    "123456789012",
    "012345678901",
    "987654321098",
    "123456781234",
    "000123456789",
    "112233445566",
    "121212121212",
    "001122334455",
  ];
  if (dummyPatterns.includes(clean)) {
    return { valid: false, reason: "Invalid UTR: test or sequential dummy reference numbers are rejected." };
  }
  return { valid: true };
}

const proofSchema = z.object({
  utr: z.string().trim(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED", message: "Please sign in to submit payment proof." }, { status: 401 });
  }

  const { id: orderId } = await params;

  try {
    const body = await req.json();
    const { utr } = proofSchema.parse(body);

    // Validate 12-digit UPI format and non-dummy constraints
    const validation = validateUPIUTR(utr);
    if (!validation.valid) {
      return NextResponse.json({ error: "INVALID_UTR_FORMAT", message: validation.reason }, { status: 400 });
    }

    const order = await db.paymentOrder.findUnique({
      where: { id: orderId },
      include: { proof: true },
    });

    if (!order || order.userId !== user.id) {
      return NextResponse.json({ error: "ORDER_NOT_FOUND", message: "Payment order not found." }, { status: 404 });
    }

    if (order.status === "APPROVED") {
      return NextResponse.json({ error: "ALREADY_APPROVED", message: "This order has already been verified and approved." }, { status: 400 });
    }

    if (order.proof) {
      return NextResponse.json({
        error: "ALREADY_SUBMITTED",
        message: `Proof already submitted with UTR: ${order.proof.utr}. Verification is currently pending.`,
      }, { status: 400 });
    }

    // Check if UTR is already in use by any other order
    const existingProof = await db.paymentProof.findUnique({
      where: { utr },
    });

    if (existingProof) {
      return NextResponse.json({
        error: "DUPLICATE_UTR",
        message: "This UTR number has already been registered. Each UPI payment receipt can only be used once.",
      }, { status: 400 });
    }

    const proof = await db.paymentProof.create({
      data: {
        orderId: order.id,
        utr,
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
        metadata: { utr },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment proof submitted successfully. Pro lifetime access will be activated upon admin reconciliation.",
      proof: {
        id: proof.id,
        orderId: proof.orderId,
        utr: proof.utr,
        submittedAt: proof.submittedAt,
      },
    });
  } catch (err) {
    console.error("[billing/proof] error:", err);
    return NextResponse.json({ error: "SUBMISSION_FAILED", message: "Unable to process UTR proof. Please check inputs and try again." }, { status: 400 });
  }
}
