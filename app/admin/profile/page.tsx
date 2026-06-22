"use client";

import { useState, useEffect } from "react";

interface Profile {
  name: string;
  shortName: string;
  birthCity: string;
  birthYear: string;
  education: string;
  work: string;
  interests: string;
  bio: string;
  social: {
    instagram: string;
    twitter: string;
    snapchat: string;
    youtube: string;
  };
}

/* ===== صفحة تعديل الملف الشخصي ===== */
export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputCls = "w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 rounded focus:outline-none focus:border-[#C8A46B]/50 text-sm";

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-white/40" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>جارٍ التحميل...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>الملف الشخصي</h1>
        <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>تعديل بيانات الشاعر وروابط التواصل الاجتماعي</p>
      </div>

      {saved && (
        <div className="mb-5 py-3 px-4 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-sm">
          ✓ تم حفظ التغييرات بنجاح
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">

        {/* البيانات الأساسية */}
        <div className="bg-[#1C1812] border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-bold mb-5 pb-3 border-b border-white/8" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>البيانات الأساسية</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>الاسم الكامل</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>الاسم المختصر (الشعار)</label>
                <input type="text" value={profile.shortName} onChange={(e) => setProfile({ ...profile, shortName: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>مدينة الميلاد</label>
                <input type="text" value={profile.birthCity} onChange={(e) => setProfile({ ...profile, birthCity: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>سنة الميلاد</label>
                <input type="text" value={profile.birthYear} onChange={(e) => setProfile({ ...profile, birthYear: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
              </div>
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>المؤهل العلمي</label>
              <input type="text" value={profile.education} onChange={(e) => setProfile({ ...profile, education: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>العمل الحالي</label>
              <input type="text" value={profile.work} onChange={(e) => setProfile({ ...profile, work: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>الاهتمامات</label>
              <input type="text" value={profile.interests} onChange={(e) => setProfile({ ...profile, interests: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>السيرة الذاتية</label>
              <textarea rows={6} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className={`${inputCls} resize-none leading-loose`} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
            </div>
          </div>
        </div>

        {/* روابط التواصل */}
        <div className="bg-[#1C1812] border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-bold mb-5 pb-3 border-b border-white/8" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>روابط التواصل الاجتماعي</h2>
          <div className="space-y-4">
            {(["instagram", "twitter", "snapchat", "youtube"] as const).map((platform) => (
              <div key={platform}>
                <label className="block text-white/50 text-xs mb-1.5 capitalize" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>
                  {platform === "instagram" ? "إنستغرام" : platform === "twitter" ? "X (تويتر)" : platform === "snapchat" ? "سناب شات" : "يوتيوب"}
                </label>
                <input
                  type="url"
                  value={profile.social[platform]}
                  onChange={(e) => setProfile({ ...profile, social: { ...profile.social, [platform]: e.target.value } })}
                  className={inputCls}
                  placeholder={`https://...`}
                  dir="ltr"
                  style={{ fontFamily: "monospace" }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-[#C8A46B] text-[#111111] font-bold rounded hover:bg-[#D4B483] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
        >
          {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
        </button>
      </form>
    </div>
  );
}
