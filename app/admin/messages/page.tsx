"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const F = "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)";
const FC = "var(--font-cairo, Cairo, sans-serif)";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    setMessages(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openMessage = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }
  };

  const deleteMessage = async (id: string) => {
    setDeleting(id);
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeleting(null);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="p-6 lg:p-8">
      {/* رأس الصفحة */}
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: FC }}>
            الرسائل
          </h1>
          <p className="text-white/40 text-sm mt-1" style={{ fontFamily: F }}>
            {messages.length} رسالة{unreadCount > 0 && ` — ${unreadCount} غير مقروءة`}
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
        <p className="text-white/30 text-center py-20" style={{ fontFamily: F }}>
          جارٍ التحميل...
        </p>
      ) : messages.length === 0 ? (
        <div className="text-center py-24 border border-white/8 rounded-xl bg-[#1C1812]">
          <p className="text-4xl mb-4">✉</p>
          <p className="text-white/30" style={{ fontFamily: F }}>لا توجد رسائل بعد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`border rounded-xl p-5 transition-all ${
                msg.read
                  ? "bg-[#161210] border-white/8"
                  : "bg-[#1C1812] border-[#C8A46B]/25"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* نقطة غير مقروء */}
                <div className="flex-shrink-0 mt-1.5">
                  {!msg.read ? (
                    <span className="block w-2 h-2 rounded-full bg-gold" />
                  ) : (
                    <span className="block w-2 h-2 rounded-full bg-white/10" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* معلومات المرسل */}
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="text-white font-semibold text-sm" style={{ fontFamily: FC }}>
                      {msg.name}
                    </span>
                    <span className="text-gold/60 text-xs" style={{ fontFamily: F }}>
                      {msg.email}
                    </span>
                    <span className="text-white/25 text-xs mr-auto" style={{ fontFamily: F }}>
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  {/* مقتطف الرسالة */}
                  <p
                    className="text-white/50 text-sm line-clamp-2 leading-relaxed"
                    style={{ fontFamily: F }}
                  >
                    {msg.message}
                  </p>

                  {/* أزرار الإجراءات */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => openMessage(msg)}
                      className="text-gold/70 hover:text-gold text-xs font-medium transition-colors"
                      style={{ fontFamily: F }}
                    >
                      المزيد ←
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      disabled={deleting === msg.id}
                      className="text-red-400/40 hover:text-red-400 text-xs transition-colors disabled:opacity-40"
                      style={{ fontFamily: F }}
                    >
                      {deleting === msg.id ? "جارٍ الحذف..." : "حذف"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== مودال تفاصيل الرسالة ===== */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="bg-[#1C1812] border border-[#C8A46B]/25 rounded-xl w-full max-w-lg p-8 relative">
            {/* زر الإغلاق */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 left-4 text-white/30 hover:text-white text-xl transition-colors"
              aria-label="إغلاق"
            >
              ×
            </button>

            {/* معلومات المرسل */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: FC }}>
                {selected.name}
              </h2>
              <a
                href={`mailto:${selected.email}`}
                className="text-gold/70 text-sm hover:text-gold transition-colors"
                style={{ fontFamily: F }}
              >
                {selected.email}
              </a>
              <p className="text-white/30 text-xs mt-1" style={{ fontFamily: F }}>
                {formatDate(selected.createdAt)}
              </p>
            </div>

            <div className="h-px bg-white/8 mb-6" />

            {/* نص الرسالة كاملاً */}
            <p
              className="text-white/75 text-sm leading-loose whitespace-pre-wrap"
              style={{ fontFamily: F }}
            >
              {selected.message}
            </p>

            <div className="h-px bg-white/8 mt-6 mb-5" />

            {/* أزرار */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => deleteMessage(selected.id)}
                disabled={deleting === selected.id}
                className="px-4 py-2 text-red-400/60 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 rounded-lg text-sm transition-all disabled:opacity-40"
                style={{ fontFamily: F }}
              >
                حذف
              </button>
              <a
                href={`mailto:${selected.email}`}
                className="px-4 py-2 bg-gold/90 hover:bg-gold text-[#111111] font-semibold rounded-lg text-sm transition-colors"
                style={{ fontFamily: FC }}
              >
                رد بالبريد
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
