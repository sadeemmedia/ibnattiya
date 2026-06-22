"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

const F = "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)";
const FC = "var(--font-cairo, Cairo, sans-serif)";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/subscribers");
    setSubscribers(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteSubscriber = async (id: string) => {
    setDeleting(id);
    await fetch("/api/admin/subscribers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    setDeleting(null);
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* رأس الصفحة */}
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: FC }}>
            النشرة البريدية
          </h1>
          <p className="text-white/40 text-sm mt-1" style={{ fontFamily: F }}>
            {subscribers.length} مشترك
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

      {/* حقل البحث */}
      {subscribers.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="ابحث بالبريد الإلكتروني..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold/40 rounded-lg"
            style={{ fontFamily: F }}
          />
        </div>
      )}

      {loading ? (
        <p className="text-white/30 text-center py-20" style={{ fontFamily: F }}>
          جارٍ التحميل...
        </p>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-24 border border-white/8 rounded-xl bg-[#1C1812]">
          <p className="text-4xl mb-4">📧</p>
          <p className="text-white/30" style={{ fontFamily: F }}>لا يوجد مشتركون بعد</p>
        </div>
      ) : (
        <div className="bg-[#161210] border border-white/8 rounded-xl overflow-hidden">
          {/* رأس الجدول */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 bg-white/5 border-b border-white/8">
            <span className="text-gold/50 text-xs tracking-widest" style={{ fontFamily: F }}>
              البريد الإلكتروني
            </span>
            <span className="text-gold/50 text-xs tracking-widest" style={{ fontFamily: F }}>
              تاريخ الاشتراك
            </span>
            <span />
          </div>

          {/* الصفوف */}
          {filtered.length === 0 ? (
            <p className="text-white/30 text-center py-10 text-sm" style={{ fontFamily: F }}>
              لا نتائج
            </p>
          ) : (
            filtered.map((sub) => (
              <div
                key={sub.id}
                className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
              >
                <span className="text-white/75 text-sm" style={{ fontFamily: F }}>
                  {sub.email}
                </span>
                <span className="text-white/35 text-xs" style={{ fontFamily: F }}>
                  {formatDate(sub.subscribedAt)}
                </span>
                <button
                  onClick={() => deleteSubscriber(sub.id)}
                  disabled={deleting === sub.id}
                  className="text-red-400/40 hover:text-red-400 text-xs transition-colors disabled:opacity-40"
                  style={{ fontFamily: F }}
                >
                  {deleting === sub.id ? "..." : "حذف"}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
