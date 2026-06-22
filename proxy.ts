import { NextRequest, NextResponse } from "next/server";

const SESSION_TOKEN =
  process.env.ADMIN_SESSION_TOKEN || "ibnattiya-admin-session-2026";

/* ===== حماية مسارات لوحة التحكم ===== */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* السماح بصفحة تسجيل الدخول وكل مسارات auth API */
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  /* التحقق من رمز الجلسة */
  const token = request.cookies.get("admin-token");
  if (!token || token.value !== SESSION_TOKEN) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
