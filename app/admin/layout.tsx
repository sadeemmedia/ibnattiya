"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

/* ===== روابط الشريط الجانبي ===== */
const sidebarLinks = [
  { label: "لوحة المعلومات", href: "/admin/dashboard", icon: "📊" },
  { label: "المؤلفات",        href: "/admin/books",     icon: "📚" },
  { label: "القصائد",         href: "/admin/poems",     icon: "🪶" },
  { label: "المعرض",          href: "/admin/gallery",   icon: "🖼️" },
  { label: "التعليقات",       href: "/admin/reviews",   icon: "💬" },
  { label: "الرسائل",         href: "/admin/messages",  icon: "✉️" },
  { label: "النشرة البريدية", href: "/admin/subscribers", icon: "📧" },
  { label: "الملف الشخصي",   href: "/admin/profile",   icon: "👤" },
];

const F = "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)";
const FC = "var(--font-cairo, Cairo, sans-serif)";

/* ===== محتوى الشريط الجانبي ===== */
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router  = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col h-full">
      {/* شعار اللوحة */}
      <div className="p-6 border-b border-white/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#C8A46B]" style={{ fontFamily: FC }}>
            بن عطية
          </h1>
          <p className="text-white/35 text-xs mt-0.5" style={{ fontFamily: F }}>
            لوحة التحكم
          </p>
        </div>
        {/* زر الإغلاق — يظهر على الجوال فقط */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white text-2xl leading-none"
            aria-label="إغلاق"
          >
            ×
          </button>
        )}
      </div>

      {/* روابط التنقل */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-[#C8A46B]/15 text-[#C8A46B] border border-[#C8A46B]/25"
                  : "text-white/55 hover:text-white hover:bg-white/5"
              }`}
              style={{ fontFamily: F }}
            >
              <span className="text-base">{link.icon}</span>
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
          style={{ fontFamily: F }}
        >
          <span>🌐</span>
          <span>عرض الموقع</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-900/10 text-sm transition-all"
          style={{ fontFamily: F }}
        >
          <span>🚪</span>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}

/* ===== تخطيط صفحات الإدارة ===== */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#111111]" dir="rtl">

      {/* ══════════════════════════════════
          شريط علوي للجوال
          ══════════════════════════════════ */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#0E0C09] border-b border-white/8 flex items-center justify-between px-4 h-14">
        <h1 className="text-[#C8A46B] font-bold text-lg" style={{ fontFamily: FC }}>
          بن عطية
        </h1>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="فتح القائمة"
        >
          <span className="block w-5 h-0.5 bg-[#C8A46B]" />
          <span className="block w-5 h-0.5 bg-[#C8A46B]" />
          <span className="block w-5 h-0.5 bg-[#C8A46B]" />
        </button>
      </header>

      {/* ══════════════════════════════════
          درج الجوال (Drawer)
          ══════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setMobileOpen(false)}
        >
          {/* طبقة التعتيم */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* الدرج من اليمين (RTL) */}
          <aside
            className="relative mr-auto w-72 max-w-[85vw] bg-[#0E0C09] h-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* ══════════════════════════════════
          تخطيط الكمبيوتر
          ══════════════════════════════════ */}
      <div className="flex min-h-screen">
        {/* الشريط الجانبي — كمبيوتر فقط */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-[#0E0C09] border-l border-white/8 min-h-screen">
          <SidebarContent />
        </aside>

        {/* المحتوى الرئيسي */}
        <main className="flex-1 overflow-auto pt-14 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
