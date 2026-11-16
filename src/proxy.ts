import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  // logged-in users shouldn't see login/signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // logged-out users can't see protected pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};