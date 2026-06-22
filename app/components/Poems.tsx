import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";

interface Poem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

/* ===== صف قصيدة واحدة ===== */
function PoemRow({ poem }: { poem: Poem }) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 items-center py-5 px-4 sm:px-6 border-b border-white/8 hover:bg-white/3 transition-colors duration-200">

      {/* عنوان القصيدة */}
      <h3
        className="text-gold font-bold text-lg group-hover:text-gold-light transition-colors"
        style={{ fontFamily: "var(--font-cairo)" }}
      >
        {poem.title}
      </h3>

      {/* مقتطف من القصيدة */}
      <p
        className="text-white/55 text-sm leading-relaxed line-clamp-2"
        style={{ fontFamily: "var(--font-ibm)" }}
      >
        {poem.excerpt}
      </p>

      {/* زر القراءة — رابط حقيقي */}
      <Link
        href={`/poems/${poem.id}`}
        className="text-gold/70 hover:text-gold text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors group/btn"
        style={{ fontFamily: "var(--font-ibm)" }}
      >
        اقرأ القصيدة
        <span className="transition-transform group-hover/btn:-translate-x-1">›</span>
      </Link>
    </div>
  );
}

/* ===== قسم المختارات الشعرية ===== */
export default async function Poems() {
  let poems: Poem[] = [];
  try {
    const raw = await readFile(join(process.cwd(), "data", "poems.json"), "utf-8");
    poems = JSON.parse(raw);
  } catch {}

  return (
    <section id="poems" className="bg-[#1A1410] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== عنوان القسم ===== */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            مختارات شعرية
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <span className="text-gold text-sm">◈</span>
            <span className="block w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>

        {/* ===== جدول القصائد ===== */}
        <div className="border border-white/10 rounded overflow-hidden mb-10">
          {/* رأس الجدول */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 items-center py-3 px-4 sm:px-6 bg-white/5 border-b border-white/10">
            <span className="text-gold/60 text-xs tracking-widest font-medium" style={{ fontFamily: "var(--font-ibm)" }}>
              عنوان القصيدة
            </span>
            <span className="text-gold/60 text-xs tracking-widest font-medium hidden md:block" style={{ fontFamily: "var(--font-ibm)" }}>
              مقتطف
            </span>
            <span />
          </div>

          {/* صفوف القصائد */}
          {poems.map((poem) => (
            <PoemRow key={poem.id} poem={poem} />
          ))}
        </div>

        {/* ===== زر جميع القصائد — رابط حقيقي ===== */}
        <div className="text-center">
          <Link
            href="/poems"
            className="inline-block px-10 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            جميع القصائد
          </Link>
        </div>
      </div>
    </section>
  );
}
