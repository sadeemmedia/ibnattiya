"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

/* ===== روابط الشريط الجانبي ===== */
const sidebarLinks = [
  { label: "لوحة المعلومات", href: "/admin/dashboard", icon: "📊" },
  { label: "المؤلفات", href: "/admin/books", icon: "📚" },
  { label: "القصائد", href: "/admin/poems", icon: "🪶" },
  { label: "المعرض", href: "/admin/gallery", icon: "🖼️" },
  { label: "التعليقات", href: "/admin/reviews", icon: "💬" },
  { label: "الرسائل", href: "/admin/messages", icon: "✉️" },
  { label: "النشرة البريدية", href: "/admin/subscribers", icon: "📧" },
  { label: "الملف الشخصي", href: "/admin/profile", icon: "👤" },
];

function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0E0C09] border-l border-white/8 flex flex-col min-h-screen">
      {/* شعار اللوحة */}
      <div className="p-6 border-b border-white/8">
        <h1
          className="text-2xl font-bold text-[#C8A46B]"
          style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
        >
          بن عطية
        </h1>
        <p
          className="text-white/35 text-xs mt-1"
          style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
        >
          لوحة التحكم
        </p>
      </div>

      {/* روابط التنقل */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-[#C8A46B]/15 text-[#C8A46B] border border-[#C8A46B]/25"
                  : "text-white/55 hover:text-white hover:bg-white/5"
              }`}
              style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* روابط الأسفل */}
      <div className="p-3 border-t border-white/8 space-y-1">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/40 hover:text-white hover:bg-white/5 text-sm transition-all"
          style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
        >
          <span>🌐</span>
          <span>عرض الموقع</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-900/10 text-sm transition-all"
          style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
        >
          <span>🚪</span>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}

/* ===== تخطيط صفحات الإدارة ===== */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#111111]" dir="rtl">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
