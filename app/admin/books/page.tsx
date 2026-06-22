"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  type: string;
  image: string;
  description: string;
}

/* ===== صفحة إدارة المؤلفات ===== */
export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const emptyForm: Omit<Book, "id"> = {
    title: "",
    type: "ديوان",
    image: "",
    description: "",
  };
  const [form, setForm] = useState(emptyForm);

  const fetchBooks = async () => {
    const res = await fetch("/api/admin/books");
    setBooks(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.path) setForm((f) => ({ ...f, image: data.path }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch("/api/admin/books", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editing.id }),
      });
    } else {
      await fetch("/api/admin/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setEditing(book);
    setForm({ title: book.title, type: book.type, image: book.image, description: book.description });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المؤلَّف؟")) return;
    await fetch(`/api/admin/books?id=${id}`, { method: "DELETE" });
    fetchBooks();
  };

  const inputCls = "w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 rounded focus:outline-none focus:border-[#C8A46B]/50 text-sm";

  return (
    <div className="p-8">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>
            إدارة المؤلفات
          </h1>
          <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>
            إضافة وتعديل وحذف الكتب والدواوين
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}
          className="px-5 py-2.5 bg-[#C8A46B] text-[#111111] font-bold rounded hover:bg-[#D4B483] transition-colors text-sm"
          style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
        >
          + إضافة مؤلَّف
        </button>
      </div>

      {/* نموذج الإضافة / التعديل */}
      {showForm && (
        <div className="bg-[#1C1812] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-white font-bold mb-5" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>
            {editing ? "تعديل المؤلَّف" : "إضافة مؤلَّف جديد"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>العنوان *</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="عنوان المؤلَّف" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>النوع *</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls} style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>
                  <option value="ديوان">ديوان</option>
                  <option value="كتاب">كتاب</option>
                  <option value="مجموعة شعرية">مجموعة شعرية</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>غلاف المؤلَّف</label>
              <div className="flex gap-3 items-start">
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={`${inputCls} flex-1`} placeholder="مسار الصورة أو رفع ملف" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="px-4 py-2.5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 rounded text-sm transition-colors whitespace-nowrap disabled:opacity-50" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>
                  {uploading ? "جارٍ الرفع..." : "رفع صورة"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
              </div>
              {form.image && (
                <div className="mt-2 relative w-20 h-28 rounded overflow-hidden border border-white/15">
                  <Image src={form.image} alt="معاينة" fill className="object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/50 text-xs mb-1.5" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>الوصف</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} resize-none`} placeholder="وصف مختصر للمؤلَّف" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }} />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-7 py-2.5 bg-[#C8A46B] text-[#111111] font-bold rounded hover:bg-[#D4B483] transition-colors text-sm" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>
                {editing ? "حفظ التعديلات" : "إضافة"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-2.5 border border-white/20 text-white/50 hover:text-white rounded text-sm transition-colors" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* قائمة المؤلفات */}
      {loading ? (
        <p className="text-white/40 text-center py-20" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>جارٍ التحميل...</p>
      ) : books.length === 0 ? (
        <p className="text-white/30 text-center py-20" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>لا توجد مؤلفات بعد</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book) => (
            <div key={book.id} className="bg-[#1C1812] border border-white/8 rounded-xl overflow-hidden hover:border-[#C8A46B]/20 transition-colors group">
              <div className="relative h-52 bg-black/30">
                {book.image ? (
                  <Image src={book.image} alt={book.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="flex items-center justify-center h-full text-white/20 text-4xl">📚</div>
                )}
                <div className="absolute top-2 right-2 bg-[#C8A46B]/20 text-[#C8A46B] text-xs px-2 py-1 rounded" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>{book.type}</div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold mb-1" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>{book.title}</h3>
                <p className="text-white/40 text-xs line-clamp-2 mb-4" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>{book.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(book)} className="flex-1 py-2 border border-[#C8A46B]/30 text-[#C8A46B]/80 hover:text-[#C8A46B] hover:border-[#C8A46B]/60 rounded text-xs transition-colors" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>تعديل</button>
                  <button onClick={() => handleDelete(book.id)} className="flex-1 py-2 border border-red-500/20 text-red-400/60 hover:text-red-400 hover:border-red-500/40 rounded text-xs transition-colors" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>حذف</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
