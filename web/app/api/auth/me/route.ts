import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";

export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ user: null }, { status: 200 });
  return NextResponse.json({ user });
}
