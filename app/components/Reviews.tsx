"use client";

import { useState } from "react";

/* ===== بيانات الآراء الافتراضية ===== */
const defaultReviews = [
  {
    id: 1,
    text: "شاعر يكتب من القلب ويصل إلى القلب.. قصائده تحمل معاني عميقة وأسلوب رائق.",
    name: "محمد العتيبي",
    location: "الكويت - قطر",
    date: "2024/05/12",
    stars: 5,
  },
  {
    id: 2,
    text: "لغة شعرية أصيلة ومعاني عميقة من أجمل ما قرأت للشاعر خليفة بن عبدالعزيز العطية.",
    name: "فهد الكعبي",
    location: "الكويت",
    date: "2024/04/28",
    stars: 5,
  },
  {
    id: 3,
    text: "كل قصيدة له تحمل بصمة مختلفة وصوت خاص لا يشبه أحدًا.. شاعر متميز حقاً.",
    name: "سعيد المري",
    location: "الإمارات",
    date: "2024/04/15",
    stars: 5,
  },
];

/* ===== نجوم التقييم ===== */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-gold" : "text-white/20"}>
          ★
        </span>
      ))}
    </div>
  );
}

/* ===== بطاقة رأي واحد ===== */
function ReviewCard({
  review,
}: {
  review: (typeof defaultReviews)[0];
}) {
  return (
    <div className="bg-[#1C1812] border border-white/8 rounded-lg p-6 flex flex-col gap-4 hover:border-gold/30 transition-colors duration-300">
      <span className="text-gold text-5xl leading-none opacity-50 font-serif">"</span>
      <p
        className="text-white/75 text-sm leading-loose flex-1"
        style={{ fontFamily: "var(--font-ibm)" }}
      >
        {review.text}
      </p>
      <div className="border-t border-white/8 pt-4 flex items-center justify-between">
        <div>
          <p
            className="text-white font-semibold text-sm"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {review.name}
          </p>
          <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-ibm)" }}>
            {review.location}
          </p>
          <Stars count={review.stars} />
        </div>
        <p className="text-white/30 text-xs" style={{ fontFamily: "var(--font-ibm)" }}>
          {review.date}
        </p>
      </div>
    </div>
  );
}

/* ===== نموذج إضافة تعليق ===== */
function AddReviewForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", location: "", text: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <p className="text-gold text-xl mb-2" style={{ fontFamily: "var(--font-cairo)" }}>
          شكراً لك!
        </p>
        <p className="text-white/60 text-sm" style={{ fontFamily: "var(--font-ibm)" }}>
          تم إرسال تعليقك بنجاح
        </p>
        <button onClick={onClose} className="mt-4 text-gold/60 hover:text-gold text-sm underline">
          إغلاق
        </button>
      </div>
    );
  }

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
          className="px-7 py-2 bg-gold text-charcoal font-semibold text-sm hover:bg-gold-light transition-colors rounded"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          إرسال
        </button>
      </div>
    </form>
  );
}

/* ===== قسم آراء الزوار ===== */
export default function Reviews() {
  const [showForm, setShowForm] = useState(false);

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

        {/* ===== شبكة البطاقات ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {defaultReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* ===== نموذج التعليق / زر الإضافة ===== */}
        <div className="max-w-2xl mx-auto">
          {showForm ? (
            <div className="bg-[#1C1812] border border-white/8 rounded-lg p-6">
              <h3
                className="text-gold font-bold mb-5 text-lg"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                أضف تعليقك
              </h3>
              <AddReviewForm onClose={() => setShowForm(false)} />
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="px-10 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                أضف تعليقك
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
