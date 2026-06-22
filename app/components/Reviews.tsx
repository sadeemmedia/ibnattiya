"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Review {
  id: string;
  text: string;
  name: string;
  location: string;
  stars: number;
  createdAt: string;
  approved: boolean;
}

/* كم يوماً مضى منذ التاريخ */
function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

/* تاريخ مختصر */
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

/* ===== نجوم التقييم ===== */
function Stars({ count, interactive = false, onChange }: {
  count: number;
  interactive?: boolean;
  onChange?: (n: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-base transition-colors ${
            i < (interactive ? (hovered || count) : count)
              ? "text-gold"
              : "text-white/20"
          } ${interactive ? "cursor-pointer" : ""}`}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onChange?.(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ===== بطاقة رأي ===== */
function ReviewCard({ review }: { review: Review }) {
  const age = daysSince(review.createdAt);
  /* تدرج الخفوت: 0-7 أيام كامل، 8-30 خفيف، 31-60 متوسط، أكثر من 60 خافت */
  const opacity =
    age <= 7 ? 1 :
    age <= 30 ? 0.85 :
    age <= 60 ? 0.65 : 0.45;

  return (
    <div
      className="bg-[#1C1812] border border-white/8 rounded-lg p-6 flex flex-col gap-4 hover:border-gold/30 transition-all duration-300"
      style={{ opacity }}
    >
      <span className="text-gold text-5xl leading-none opacity-50 font-serif">"</span>
      <p
        className="text-white/75 text-sm leading-loose flex-1"
        style={{ fontFamily: "var(--font-ibm)" }}
      >
        {review.text}
      </p>
      <div className="border-t border-white/8 pt-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-cairo)" }}>
            {review.name}
          </p>
          {review.location && (
            <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-ibm)" }}>
              {review.location}
            </p>
          )}
          <Stars count={review.stars} />
        </div>
        <p className="text-white/30 text-xs" style={{ fontFamily: "var(--font-ibm)" }}>
          {formatDate(review.createdAt)}
        </p>
      </div>
    </div>
  );
}

/* ===== نموذج إضافة تعليق ===== */
function AddReviewForm({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (review: Review) => void;
}) {
  const [form, setForm] = useState({ name: "", location: "", text: "", stars: 5 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.review) {
        onAdded(data.review);
        onClose();
      } else {
        setError("حدث خطأ، يرجى المحاولة");
      }
    } catch {
      setError("تعذّر الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="الاسم"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 rounded"
          style={{ fontFamily: "var(--font-ibm)" }}
        />
        <input
          type="text"
          placeholder="المدينة / الدولة"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 rounded"
          style={{ fontFamily: "var(--font-ibm)" }}
        />
      </div>
      <textarea
        placeholder="شاركنا رأيك..."
        required
        rows={3}
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
        className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 rounded resize-none"
        style={{ fontFamily: "var(--font-ibm)" }}
      />
      {/* التقييم */}
      <div className="flex items-center gap-3">
        <span className="text-white/50 text-xs" style={{ fontFamily: "var(--font-ibm)" }}>
          تقييمك:
        </span>
        <Stars count={form.stars} interactive onChange={(n) => setForm({ ...form, stars: n })} />
      </div>
      {error && <p className="text-red-400/80 text-xs" style={{ fontFamily: "var(--font-ibm)" }}>{error}</p>}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 text-white/50 hover:text-white text-sm transition-colors"
          style={{ fontFamily: "var(--font-ibm)" }}
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-7 py-2 bg-gold text-charcoal font-semibold text-sm hover:bg-gold-light transition-colors rounded disabled:opacity-60"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {loading ? "جارٍ الإرسال..." : "إرسال"}
        </button>
      </div>
    </form>
  );
}

/* ===== قسم آراء الزوار ===== */
const PREVIEW_COUNT = 3;

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAdded = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  const preview = reviews.slice(0, PREVIEW_COUNT);

  return (
    <section id="reviews" className="bg-[#0E0C09] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== عنوان القسم ===== */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            آراء الزوار
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <span className="text-gold text-sm">◈</span>
            <span className="block w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>

        {/* ===== البطاقات ===== */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1C1812] border border-white/8 rounded-lg p-6 h-48 animate-pulse" />
            ))}
          </div>
        ) : preview.length === 0 ? (
          <p className="text-center text-white/30 py-10" style={{ fontFamily: "var(--font-ibm)" }}>
            لا توجد آراء بعد — كن أول من يشارك رأيه
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {preview.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* ===== أزرار ===== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {reviews.length > PREVIEW_COUNT && (
            <Link
              href="/reviews"
              className="px-10 py-3 border border-white/20 text-white/60 hover:border-gold/50 hover:text-gold transition-all duration-300 font-semibold text-sm"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              جميع التعليقات ({reviews.length})
            </Link>
          )}

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-10 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold text-sm"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              أضف تعليقك
            </button>
          ) : null}
        </div>

        {/* ===== نموذج الإضافة ===== */}
        {showForm && (
          <div className="max-w-2xl mx-auto mt-8 bg-[#1C1812] border border-white/8 rounded-lg p-6">
            <h3
              className="text-gold font-bold mb-5 text-lg"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              أضف تعليقك
            </h3>
            <AddReviewForm onClose={() => setShowForm(false)} onAdded={handleAdded} />
          </div>
        )}
      </div>
    </section>
  );
}
