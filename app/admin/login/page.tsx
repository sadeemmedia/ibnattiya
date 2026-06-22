"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ===== صفحة تسجيل دخول المسؤول ===== */
export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "بيانات الدخول غير صحيحة");
      }
    } catch {
      setError("حدث خطأ في الاتصال. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0E0C09] flex items-center justify-center px-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* الشعار */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-bold text-[#C8A46B] mb-2"
            style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
          >
            بن عطية
          </h1>
          <p
            className="text-white/40 text-sm"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            لوحة التحكم الإدارية
          </p>
        </div>

        {/* بطاقة الدخول */}
        <div className="bg-[#1C1812] border border-white/10 rounded-xl p-8">
          <h2
            className="text-white font-bold text-xl mb-6 text-center"
            style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
          >
            تسجيل الدخول
          </h2>

          {error && (
            <div className="mb-5 py-3 px-4 bg-red-900/30 border border-red-500/30 rounded text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-white/60 text-sm mb-2"
                style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
              >
                اسم المستخدم
              </label>
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 rounded focus:outline-none focus:border-[#C8A46B]/50 transition-colors"
                placeholder="أدخل اسم المستخدم"
                style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
              />
            </div>

            <div>
              <label
                className="block text-white/60 text-sm mb-2"
                style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
              >
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 rounded focus:outline-none focus:border-[#C8A46B]/50 transition-colors"
                placeholder="أدخل كلمة المرور"
                style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#C8A46B] text-[#111111] font-bold rounded hover:bg-[#D4B483] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
            >
              {loading ? "جارٍ التحقق..." : "دخول"}
            </button>
          </form>
        </div>

        <p
          className="text-center text-white/20 text-xs mt-6"
          style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
        >
          للوصول للموقع الرئيسي{" "}
          <a href="/" className="text-[#C8A46B]/50 hover:text-[#C8A46B] underline">
            اضغط هنا
          </a>
        </p>
      </div>
    </div>
  );
}
