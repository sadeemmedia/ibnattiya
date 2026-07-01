import { readFile } from "fs/promises";
import { join } from "path";
import Image from "next/image";

/* ===== روابط التنقل السريع ===== */
const quickLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "نبذة عن الشاعر", href: "#about" },
  { label: "مؤلفاتي", href: "#books" },
  { label: "المختارات الشعرية", href: "#poems" },
  { label: "من الذاكرة", href: "#gallery" },
  { label: "آراء الزوار", href: "#reviews" },
];

/* ===== الفوتر ===== */
export default async function Footer() {
  // قراءة البيانات (للتوافق مع الملف الشخصي)
  try {
    await readFile(join(process.cwd(), "data", "profile.json"), "utf-8");
  } catch {}

  return (
    <footer className="bg-[#0A0806] border-t border-white/8">
      {/* ===== الشعار وروابط التنقل ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">

          {/* شعار الفوتر */}
          <Image
            src="/uploads/binlogo.png"
            alt="شعار بن عطية"
            width={130}
            height={56}
            className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />

          {/* روابط سريعة */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/50 hover:text-gold transition-colors text-sm"
                style={{ fontFamily: "var(--font-ibm)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* الفاصل */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <span className="flex-1 h-px bg-white/10" />
            <span className="text-gold/40 text-sm">◈</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
        </div>
      </div>

      {/* ===== حقوق الملكية ===== */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-white/30 text-xs text-center"
            style={{ fontFamily: "var(--font-ibm)" }}
          >
            جميع الحقوق محفوظة © 2026 - خليفة بن عبدالعزيز العطية
          </p>
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "var(--font-ibm)" }}
          >
            تصميم وتطوير
          </p>
        </div>
      </div>
    </footer>
  );
}
