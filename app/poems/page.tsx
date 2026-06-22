import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Poem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

export default async function PoemsPage() {
  let poems: Poem[] = [];
  try {
    const raw = await readFile(join(process.cwd(), "data", "poems.json"), "utf-8");
    poems = JSON.parse(raw);
  } catch {}

  return (
    <div
      className="min-h-screen bg-[#111111]"
      style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
    >
      {/* ===== شريط علوي ===== */}
      <div className="border-b border-white/8 bg-[#0E0C09]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/#poems"
            className="text-white/40 hover:text-gold transition-colors text-sm flex items-center gap-1.5 w-fit"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            <span>›</span> العودة للموقع
          </Link>
        </div>
      </div>

      {/* ===== المحتوى ===== */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24">

        {/* العنوان */}
        <div className="text-center mb-14">
          <p
            className="text-gold/50 text-xs tracking-[0.25em] mb-4"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            خليفة بن عبدالعزيز العطية
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            جميع القصائد
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <span className="text-gold">◈</span>
            <span className="block w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>

        {/* قائمة القصائد */}
        {poems.length === 0 ? (
          <p className="text-center text-white/30 py-20">لا توجد قصائد بعد</p>
        ) : (
          <div className="space-y-4">
            {poems.map((poem, index) => (
              <Link
                key={poem.id}
                href={`/poems/${poem.id}`}
                className="group block border border-white/8 hover:border-gold/35 bg-[#161210] hover:bg-[#1C1812] transition-all duration-300 p-6 sm:p-8"
              >
                <div className="flex items-start gap-5">
                  {/* رقم القصيدة */}
                  <span
                    className="text-gold/25 text-2xl font-bold flex-shrink-0 group-hover:text-gold/50 transition-colors"
                    style={{ minWidth: "2rem" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* العنوان */}
                    <h2 className="text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3">
                      {poem.title}
                    </h2>

                    {/* المقتطف */}
                    <p
                      className="text-white/45 text-sm leading-relaxed line-clamp-2"
                      style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
                    >
                      {poem.excerpt}
                    </p>
                  </div>

                  {/* سهم الانتقال */}
                  <span className="text-gold/30 group-hover:text-gold transition-colors text-xl flex-shrink-0 mt-1 group-hover:-translate-x-1 transition-transform duration-200">
                    ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
