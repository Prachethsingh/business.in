import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({
        authenticated: false,
        isPro: false,
        entitlement: null,
        recentOrder: null,
      });
    }

    // Check active entitlement
    const entitlement = await db.entitlement.findFirst({
      where: {
        userId: user.id,
        planCode: "PRO",
        status: "ACTIVE",
      },
      orderBy: { grantedAt: "desc" },
    });

    // Check latest order
    const recentOrder = await db.paymentOrder.findFirst({
      where: { userId: user.id },
      include: { proof: true, review: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      isPro: !!entitlement,
      entitlement: entitlement ? {
        planCode: entitlement.planCode,
        status: entitlement.status,
        grantedAt: entitlement.grantedAt,
      } : null,
      recentOrder: recentOrder ? {
        id: recentOrder.id,
        amountPaise: recentOrder.amountPaise,
        status: recentOrder.status,
        createdAt: recentOrder.createdAt,
        utr: recentOrder.proof?.utr ?? null,
      } : null,
    });
  } catch (error) {
    console.error("[billing/status] error:", error);
    return NextResponse.json({
      authenticated: false,
      isPro: false,
      error: "INTERNAL_ERROR",
    }, { status: 500 });
  }
}
