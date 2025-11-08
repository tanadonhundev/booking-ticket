import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const role = req.cookies.get("betterauth_role")?.value;

  if (isAdminPage && role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
