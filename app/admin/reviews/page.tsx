"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  text: string;
  name: string;
  location: string;
  stars: number;
  createdAt: string;
  approved: boolean;
}

const F = "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)";
const FC = "var(--font-cairo, Cairo, sans-serif)";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ar-SA", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch { return iso; }
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-gold text-xs">{"★".repeat(count)}{"☆".repeat(5 - count)}</span>
  );
}

/* ===== نموذج التعديل ===== */
function EditModal({
  review,
  onSave,
  onClose,
}: {
  review: Review;
  onSave: (r: Review) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...review });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onSave(form);
    setSaving(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#1C1812] border border-[#C8A46B]/25 rounded-xl w-full max-w-lg p-7 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-white/30 hover:text-white text-xl"
        >×</button>

        <h2 className="text-lg font-bold text-white mb-5" style={{ fontFamily: FC }}>
          تعديل التعليق
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/40 text-xs mb-1 block" style={{ fontFamily: F }}>الاسم</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/15 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/50 rounded"
                style={{ fontFamily: F }}
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1 block" style={{ fontFamily: F }}>الموقع</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-white/5 border border-white/15 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/50 rounded"
                style={{ fontFamily: F }}
              />
            </div>
          </div>

          <div>
            <label className="text-white/40 text-xs mb-1 block" style={{ fontFamily: F }}>نص التعليق</label>
            <textarea
              rows={4}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="w-full bg-white/5 border border-white/15 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/50 rounded resize-none"
              style={{ fontFamily: F }}
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <label className="text-white/40 text-xs mb-1 block" style={{ fontFamily: F }}>التقييم</label>
              <select
                value={form.stars}
                onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })}
                className="bg-white/5 border border-white/15 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/50 rounded"
                style={{ fontFamily: F }}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} نجوم</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-white/40 text-xs" style={{ fontFamily: F }}>ظاهر</label>
              <button
                type="button"
                onClick={() => setForm({ ...form, approved: !form.approved })}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  form.approved ? "bg-gold" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    form.approved ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white/50 border border-white/10 rounded-lg text-sm hover:text-white transition-colors"
            style={{ fontFamily: F }}
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-gold text-[#111111] font-semibold rounded-lg text-sm hover:bg-gold-light transition-colors disabled:opacity-60"
            style={{ fontFamily: FC }}
          >
            {saving ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== صفحة إدارة التعليقات ===== */
export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Review | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/reviews");
    setReviews(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
  };

  const toggleApproved = async (review: Review) => {
    const updated = { ...review, approved: !review.approved };
    await fetch("/api/admin/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setReviews((prev) => prev.map((r) => (r.id === review.id ? updated : r)));
  };

  const handleSaved = (updated: Review) => {
    setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const total = reviews.length;
  const approved = reviews.filter((r) => r.approved).length;

  return (
    <div className="p-6 lg:p-8">
      {/* رأس الصفحة */}
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: FC }}>
            التعليقات
          </h1>
          <p className="text-white/40 text-sm mt-1" style={{ fontFamily: F }}>
            {total} تعليق — {approved} ظاهر
          </p>
        </div>
        <button
          onClick={load}
          className="text-white/40 hover:text-gold text-sm transition-colors"
          style={{ fontFamily: F }}
        >
          تحديث ↺
        </button>
      </div>

      {loading ? (
        <p className="text-white/30 text-center py-20" style={{ fontFamily: F }}>جارٍ التحميل...</p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-24 border border-white/8 rounded-xl bg-[#1C1812]">
          <p className="text-4xl mb-4">💬</p>
          <p className="text-white/30" style={{ fontFamily: F }}>لا توجد تعليقات بعد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`border rounded-xl p-5 transition-all ${
                review.approved
                  ? "bg-[#161210] border-white/8"
                  : "bg-[#1C1812] border-white/5 opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* معلومات الكاتب */}
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="text-white font-semibold text-sm" style={{ fontFamily: FC }}>
                      {review.name}
                    </span>
                    {review.location && (
                      <span className="text-white/40 text-xs" style={{ fontFamily: F }}>
                        {review.location}
                      </span>
                    )}
                    <Stars count={review.stars} />
                    <span className="text-white/25 text-xs mr-auto" style={{ fontFamily: F }}>
                      {formatDate(review.createdAt)}
                    </span>
                    {!review.approved && (
                      <span className="text-xs px-2 py-0.5 bg-white/8 text-white/40 rounded-full" style={{ fontFamily: F }}>
                        مخفي
                      </span>
                    )}
                  </div>

                  {/* نص التعليق */}
                  <p className="text-white/55 text-sm leading-relaxed line-clamp-2" style={{ fontFamily: F }}>
                    {review.text}
                  </p>

                  {/* أزرار */}
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <button
                      onClick={() => setEditing(review)}
                      className="text-gold/60 hover:text-gold text-xs transition-colors"
                      style={{ fontFamily: F }}
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => toggleApproved(review)}
                      className={`text-xs transition-colors ${
                        review.approved
                          ? "text-white/40 hover:text-orange-400"
                          : "text-green-400/60 hover:text-green-400"
                      }`}
                      style={{ fontFamily: F }}
                    >
                      {review.approved ? "إخفاء" : "إظهار"}
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={deleting === review.id}
                      className="text-red-400/40 hover:text-red-400 text-xs transition-colors disabled:opacity-40"
                      style={{ fontFamily: F }}
                    >
                      {deleting === review.id ? "جارٍ الحذف..." : "حذف"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* مودال التعديل */}
      {editing && (
        <EditModal
          review={editing}
          onSave={handleSaved}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
