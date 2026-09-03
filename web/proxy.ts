import { NextResponse, type NextRequest } from "next/server";

const STRICT_PROTECTED_PREFIXES: string[] = ["/projects/new"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isStrictProtected = STRICT_PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isStrictProtected) return NextResponse.next();

  const hasSession =
    req.cookies.has("better-auth.session_token") ||
    req.cookies.has("__Secure-better-auth.session_token") ||
    req.cookies.has("biz_session");

  if (!hasSession) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export function proxy(req: NextRequest) {
  return middleware(req);
}

export const config = {
  matcher: ["/projects/new/:path*"],
};
