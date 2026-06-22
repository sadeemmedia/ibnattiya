"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  id: string;
  path: string;
  alt: string;
}

/* ===== مكوّن الـ Lightbox ===== */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* زر الإغلاق */}
      <button
        className="absolute top-4 left-4 text-white/70 hover:text-white text-4xl z-10 leading-none"
        onClick={onClose}
        aria-label="إغلاق"
      >
        ×
      </button>

      {/* زر السابق */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold text-5xl z-10 leading-none"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="السابق"
      >
        ‹
      </button>

      {/* الصورة المكبّرة */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].path}
          alt={images[currentIndex].alt}
          width={1200}
          height={800}
          className="object-contain max-h-[85vh] w-full rounded"
        />
        <p
          className="text-center text-gold/70 text-sm mt-3"
          style={{ fontFamily: "var(--font-ibm)" }}
        >
          {images[currentIndex].alt}
        </p>
        <p className="text-center text-white/30 text-xs mt-1">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {/* زر التالي */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold text-5xl z-10 leading-none"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="التالي"
      >
        ›
      </button>
    </div>
  );
}

/* ===== قسم معرض الذاكرة ===== */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) => (i! > 0 ? i! - 1 : images.length - 1));
  const goNext = () =>
    setLightboxIndex((i) => (i! < images.length - 1 ? i! + 1 : 0));

  return (
    <section id="gallery" className="bg-[#111111] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== عنوان القسم ===== */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            من الذاكرة
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <span className="text-gold text-sm">◈</span>
            <span className="block w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>

        {/* ===== شبكة الصور ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {images.map((img, index) => (
            <button
              key={img.id}
              className="relative aspect-square overflow-hidden group cursor-pointer rounded"
              onClick={() => openLightbox(index)}
              aria-label={`عرض صورة: ${img.alt}`}
            >
              <Image
                src={img.path}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              {/* طبقة التغطية عند التمرير */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  🔍
                </span>
              </div>
              {/* حد ذهبي */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-300 rounded pointer-events-none" />
            </button>
          ))}
        </div>

        {/* ===== زر عرض المزيد ===== */}
        <div className="text-center">
          <button
            className="px-10 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            عرض المزيد من الصور
          </button>
        </div>
      </div>

      {/* ===== Lightbox ===== */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}
