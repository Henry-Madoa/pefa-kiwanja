import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Not logged in → send to the login page, remembering where they were headed.
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in but without admin access → the admin portal is off-limits.
  // `adminAccess` is set at login for users holding any admin permission;
  // the legacy `role === "admin"` check keeps pre-RBAC sessions working.
  const t = token as { role?: string; adminAccess?: boolean };
  if (!t.adminAccess && t.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
