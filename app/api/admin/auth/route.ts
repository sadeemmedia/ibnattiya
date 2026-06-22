import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "khalifa2026";
const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || "ibnattiya-admin-session-2026";

/* ===== تسجيل الدخول ===== */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return Response.json(
      { success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("admin-token", SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // أسبوع
    path: "/",
  });

  return Response.json({ success: true });
}

/* ===== تسجيل الخروج ===== */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  return Response.json({ success: true });
}

/* ===== التحقق من الجلسة ===== */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token");
  const isAuthenticated = token?.value === SESSION_TOKEN;
  return Response.json({ authenticated: isAuthenticated });
}
