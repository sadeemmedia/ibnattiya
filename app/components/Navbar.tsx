"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ===== روابط التنقل الرئيسية ===== */
const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "نبذة عن الشاعر", href: "#about" },
  { label: "مؤلفاتي", href: "#books" },
  { label: "المختارات الشعرية", href: "#poems" },
  { label: "آراء الزوار", href: "#reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* تغيير خلفية الشريط عند التمرير */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#111111]/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ===== شعار الموقع — مخفي على الجوال لأنه يظهر داخل Hero ===== */}
          <Link
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="hidden md:flex items-center hover:opacity-85 transition-opacity"
            aria-label="بن عطية - الصفحة الرئيسية"
          >
            <Image
              src="/uploads/binlogo.png"
              alt="شعار بن عطية"
              width={110}
              height={48}
              className="h-10 lg:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* ===== قائمة التنقل للشاشات الكبيرة ===== */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-white/85 hover:text-gold transition-colors duration-200 text-sm font-medium tracking-wide relative group cursor-pointer"
                style={{ fontFamily: "var(--font-ibm)" }}
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* ===== زر القائمة للجوال ===== */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="فتح القائمة"
          >
            <span
              className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ===== قائمة الجوال المنسدلة ===== */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#111111]/98 backdrop-blur-md border-t border-gold/20">
          <nav className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-white/85 hover:text-gold transition-colors py-3 text-right text-sm border-b border-white/5 last:border-0 cursor-pointer"
                style={{ fontFamily: "var(--font-ibm)" }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
