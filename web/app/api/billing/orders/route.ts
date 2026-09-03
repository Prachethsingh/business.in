import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";

export async function POST() {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  // Create a 48-hour pending payment order for Pro plan
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const order = await db.paymentOrder.create({
    data: {
      userId: user.id,
      planCode: "PRO",
      amountPaise: 9900,
      status: "PENDING",
      expiresAt,
    },
  });

  return NextResponse.json({
    order: {
      id: order.id,
      amountPaise: order.amountPaise,
      currency: "INR",
      upiVpa: process.env.UPI_VPA ?? "prachethsingh@okaxis",
      status: order.status,
      expiresAt: order.expiresAt,
    },
  });
}
