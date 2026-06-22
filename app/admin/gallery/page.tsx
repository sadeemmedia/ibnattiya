"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  path: string;
  alt: string;
}

/* ===== صفحة إدارة معرض الصور ===== */
export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    const res = await fetch("/api/admin/gallery");
    setImages(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const uploadData = await uploadRes.json();

    if (uploadData.path) {
      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: uploadData.path, alt: altText || file.name }),
      });
      setAltText("");
      fetchImages();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    fetchImages();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>إدارة المعرض</h1>
        <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>رفع وحذف صور قسم «من الذاكرة»</p>
      </div>

      {/* قسم الرفع */}
      <div className="bg-[#1C1812] border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-white font-bold mb-4" style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}>رفع صورة جديدة</h2>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="وصف الصورة (اختياري)"
            className="flex-1 min-w-48 bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 rounded focus:outline-none focus:border-[#C8A46B]/50 text-sm"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="px-6 py-2.5 bg-[#C8A46B] text-[#111111] font-bold rounded hover:bg-[#D4B483] transition-colors text-sm disabled:opacity-60"
            style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
          >
            {uploading ? "جارٍ الرفع..." : "📸 رفع صورة"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
        </div>
        <p className="text-white/25 text-xs mt-3" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>
          الأنواع المدعومة: JPG, PNG, WEBP — الحد الأقصى للحجم: 5 ميجابايت
        </p>
      </div>

      {/* شبكة الصور */}
      {loading ? (
        <p className="text-white/40 text-center py-20" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>جارٍ التحميل...</p>
      ) : images.length === 0 ? (
        <p className="text-white/30 text-center py-20" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>لا توجد صور في المعرض</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-black/30 border border-white/8 group-hover:border-[#C8A46B]/30 transition-all">
                <Image src={img.path} alt={img.alt} fill className="object-cover" sizes="200px" />
                {/* طبقة الحذف */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/80 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded"
                    style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
                  >
                    حذف
                  </button>
                </div>
              </div>
              {img.alt && (
                <p className="text-white/35 text-xs mt-1.5 truncate text-center" style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}>
                  {img.alt}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
