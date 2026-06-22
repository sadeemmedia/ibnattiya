"use client";

import { useState, useEffect } from "react";

interface Poem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

/* ===== صفحة إدارة القصائد ===== */
export default function AdminPoemsPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Poem | null>(null);

  const emptyForm = { title: "", excerpt: "", content: "" };
  const [form, setForm] = useState(emptyForm);

  const fetch_ = async () => {
    const res = await fetch("/api/admin/poems");
    setPoems(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetch_(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch("/api/admin/poems", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editing.id }),
      });
    } else {
      await fetch("/api/admin/poems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetch_();
  };

  const handleEdit = (poem: Poem) => {
    setEditing(poem);
    setForm({ title: poem.title, excerpt: poem.excerpt, content: poem.content });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه القصيدة؟")) return;
    await fetch(`/api/admin/poems?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  const inputCls = "w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 rounded focus:outline-none focus:border-[#C8A46B]/50 text-sm";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>إدارة القصائد</h1>
          <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>إضافة وتعديل وحذف القصائد والمختارات الشعرية</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}
          className="px-5 py-2.5 bg-[#C8A46B] text-[#111111] font-bold rounded hover:bg-[#D4B483] transition-colors text-sm"
          style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
        >
          + إضافة قصيدة
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1C1812] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-white font-bold mb-5" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>
            {editing ? "تعديل القصيدة" : "إضافة قصيدة جديدة"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>عنوان القصيدة *</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="اسم القصيدة" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>المقتطف (يظهر في قائمة المختارات)</label>
              <input type="text" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={inputCls} placeholder="بيت أو شطر مميز من القصيدة" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>نص القصيدة كاملاً</label>
              <textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={`${inputCls} resize-none leading-loose`} placeholder="أدخل أبيات القصيدة كاملة..." style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-7 py-2.5 bg-[#C8A46B] text-[#111111] font-bold rounded hover:bg-[#D4B483] transition-colors text-sm" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>
                {editing ? "حفظ التعديلات" : "إضافة"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-2.5 border border-white/20 text-white/50 hover:text-white rounded text-sm transition-colors" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-white/40 text-center py-20" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>جارٍ التحميل...</p>
      ) : (
        <div className="space-y-3">
          {poems.map((poem) => (
            <div key={poem.id} className="bg-[#1C1812] border border-white/8 rounded-xl p-5 hover:border-[#C8A46B]/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-[#C8A46B] font-bold text-lg mb-1" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>{poem.title}</h3>
                  {poem.excerpt && <p className="text-white/45 text-sm line-clamp-2" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>{poem.excerpt}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(poem)} className="px-4 py-1.5 border border-[#C8A46B]/30 text-[#C8A46B]/80 hover:border-[#C8A46B]/60 hover:text-[#C8A46B] rounded text-xs transition-colors" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>تعديل</button>
                  <button onClick={() => handleDelete(poem.id)} className="px-4 py-1.5 border border-red-500/20 text-red-400/60 hover:border-red-500/40 hover:text-red-400 rounded text-xs transition-colors" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>حذف</button>
                </div>
              </div>
            </div>
          ))}
          {poems.length === 0 && (
            <p className="text-white/30 text-center py-20" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>لا توجد قصائد بعد</p>
          )}
        </div>
      )}
    </div>
  );
}
