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
  { label: "تواصل معي", href: "#contact" },
];

/* ===== أيقونات التواصل الاجتماعي ===== */
const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  snapchat: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.317 4.814-.031.582-.056 1.29.026 1.304.839-.143 1.756-.624 2.437-1.087.93.21 1.17 1.01.957 1.604-.17.47-.693.865-1.449 1.225-.264.127-.632.265-.956.399.093.182.116.452.106.697-.09 2.28-2.13 4.854-5.064 5.784.054.124.091.249.091.384 0 .528-.394 1.118-1.093 1.425-.674.295-1.422.427-1.991.518-.63.1-1.069.207-1.288.452-.125.141-.242.325-.375.515-.262.377-.597.858-1.13.858-.513 0-.81-.45-1.113-.858-.133-.19-.249-.374-.374-.514-.22-.247-.66-.354-1.29-.454-.568-.09-1.316-.222-1.99-.517-.7-.307-1.095-.897-1.095-1.426 0-.134.037-.26.09-.384C2.128 17.837.09 15.263 0 12.983c-.011-.245.013-.515.106-.697-.324-.134-.692-.272-.956-.399-.756-.36-1.279-.755-1.449-1.225-.212-.595.028-1.394.957-1.604.68.463 1.597.944 2.437 1.087.082-.014.057-.722.026-1.304-.086-1.595-.212-3.621.317-4.814C2.86 1.069 6.216.793 7.206.793c.394 0 .766.056 1.155.185 1.13.384 1.85 1.124 2.517 1.795L11.42 3.3c.397.397.888.658 1.38.658.11 0 .218-.009.327-.026.02-.003.041-.007.062-.012z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

/* ===== الفوتر ===== */
export default async function Footer() {
  let social = {
    instagram: "#",
    twitter: "#",
    snapchat: "#",
    youtube: "#",
  };
  try {
    const raw = await readFile(join(process.cwd(), "data", "profile.json"), "utf-8");
    const profile = JSON.parse(raw);
    if (profile.social) social = profile.social;
  } catch {}

  return (
    <footer className="bg-[#0A0806] border-t border-white/8">
      {/* ===== الشعار وروابط التنقل ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">

          {/* شعار الفوتر (صورة) */}
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

          {/* أيقونات التواصل */}
          <div className="flex items-center gap-5">
            {(Object.entries(social) as [keyof typeof socialIcons, string][]).map(
              ([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target={url !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-gold transition-colors duration-200"
                  aria-label={platform}
                >
                  {socialIcons[platform]}
                </a>
              )
            )}
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
