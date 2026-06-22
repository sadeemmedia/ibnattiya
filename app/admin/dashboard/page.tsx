import { readFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

/* ===== بطاقة إحصائية ===== */
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className={`bg-[#1C1812] border rounded-xl p-6 flex items-center gap-5 ${color}`}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <p
          className="text-white/50 text-sm"
          style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
        >
          {label}
        </p>
        <p
          className="text-white text-3xl font-bold mt-1"
          style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ===== لوحة المعلومات الرئيسية ===== */
export default async function DashboardPage() {
  /* جلب الإحصائيات */
  let booksCount = 0;
  let poemsCount = 0;
  let galleryCount = 0;

  try {
    const books = JSON.parse(
      await readFile(join(process.cwd(), "data", "books.json"), "utf-8")
    );
    booksCount = books.length;
  } catch {}

  try {
    const poems = JSON.parse(
      await readFile(join(process.cwd(), "data", "poems.json"), "utf-8")
    );
    poemsCount = poems.length;
  } catch {}

  try {
    const gallery = JSON.parse(
      await readFile(join(process.cwd(), "data", "gallery.json"), "utf-8")
    );
    galleryCount = gallery.length;
  } catch {}

  let messagesCount = 0;
  let unreadCount = 0;
  let subscribersCount = 0;
  let reviewsCount = 0;

  try {
    const msgs = JSON.parse(
      await readFile(join(process.cwd(), "data", "messages.json"), "utf-8")
    ) as { read: boolean }[];
    messagesCount = msgs.length;
    unreadCount = msgs.filter((m) => !m.read).length;
  } catch {}

  try {
    const subs = JSON.parse(
      await readFile(join(process.cwd(), "data", "subscribers.json"), "utf-8")
    );
    subscribersCount = subs.length;
  } catch {}

  try {
    const revs = JSON.parse(
      await readFile(join(process.cwd(), "data", "reviews.json"), "utf-8")
    );
    reviewsCount = revs.length;
  } catch {}

  return (
    <div className="p-8">
      {/* رأس الصفحة */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
        >
          لوحة المعلومات
        </h1>
        <p
          className="text-white/40 text-sm mt-1"
          style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
        >
          نظرة عامة على محتوى الموقع
        </p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <StatCard icon="📚" label="المؤلفات" value={booksCount} color="border-[#C8A46B]/20" />
        <StatCard icon="🪶" label="القصائد" value={poemsCount} color="border-blue-500/20" />
        <StatCard icon="🖼️" label="المعرض" value={galleryCount} color="border-green-500/20" />
        <StatCard icon="💬" label="التعليقات" value={reviewsCount} color="border-purple-500/20" />
        <StatCard
          icon="✉️"
          label={unreadCount > 0 ? `رسائل (${unreadCount} جديد)` : "الرسائل"}
          value={messagesCount}
          color="border-orange-500/20"
        />
        <StatCard icon="📧" label="المشتركون" value={subscribersCount} color="border-teal-500/20" />
      </div>

      {/* روابط الإجراءات السريعة */}
      <div className="bg-[#1C1812] border border-white/8 rounded-xl p-6">
        <h2
          className="text-white font-bold mb-5 text-lg"
          style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
        >
          الإجراءات السريعة
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "إضافة مؤلف", href: "/admin/books", icon: "➕" },
            { label: "إضافة قصيدة", href: "/admin/poems", icon: "✍️" },
            { label: "رفع صورة", href: "/admin/gallery", icon: "📸" },
            { label: "التعليقات", href: "/admin/reviews", icon: "💬" },
            { label: "الرسائل", href: "/admin/messages", icon: "✉️" },
            { label: "المشتركون", href: "/admin/subscribers", icon: "📧" },
            { label: "تعديل الملف", href: "/admin/profile", icon: "✏️" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 bg-white/3 hover:bg-[#C8A46B]/10 border border-white/8 hover:border-[#C8A46B]/30 rounded-lg transition-all text-center group"
            >
              <span className="text-2xl">{action.icon}</span>
              <span
                className="text-white/60 group-hover:text-[#C8A46B] text-xs transition-colors"
                style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
              >
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
