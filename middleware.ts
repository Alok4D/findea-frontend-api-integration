import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("findea_token")?.value;
  const { pathname } = request.nextUrl;

  const authRoutes = ["/login", "/signup", "/lost-password"];
  const protectedRoutes = ["/account", "/cart"];

  const adminAuthRoutes = ["/admin-login"];
  const adminRoutes = ["/dashboard"];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminAuthRoute = adminAuthRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (token) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
    if (isAdminAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/lost-password",
    "/account",
    "/account/:path*",
    "/cart/:path*",
    "/admin-login",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
