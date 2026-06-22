import { readFile } from "fs/promises";
import { join } from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Poem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let poems: Poem[] = [];
  try {
    const raw = await readFile(join(process.cwd(), "data", "poems.json"), "utf-8");
    poems = JSON.parse(raw);
  } catch {}

  const poem = poems.find((p) => p.id === id);
  if (!poem) notFound();

  /* أبيات القصيدة — كل سطر فارغ يصبح فاصلاً بين المقاطع */
  const stanzas = poem.content
    .split(/\n\n+/)
    .map((stanza) => stanza.split("\n").filter(Boolean));

  return (
    <div
      className="min-h-screen bg-[#111111]"
      style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
    >
      {/* ===== شريط علوي ===== */}
      <div className="border-b border-white/8 bg-[#0E0C09]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-white/40 hover:text-gold transition-colors text-sm flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            <span>›</span> الموقع الرئيسي
          </Link>
          <Link
            href="/poems"
            className="text-white/40 hover:text-gold transition-colors text-sm"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            جميع القصائد
          </Link>
        </div>
      </div>

      {/* ===== محتوى القصيدة ===== */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">

        {/* العنوان */}
        <div className="text-center mb-12">
          <p
            className="text-gold/50 text-xs tracking-[0.25em] mb-4"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            خليفة بن عبدالعزيز العطية
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {poem.title}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <span className="text-gold">◈</span>
            <span className="block w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>

        {/* نص القصيدة */}
        <div className="space-y-8 text-center">
          {stanzas.map((stanza, si) => (
            <div key={si} className="space-y-2">
              {stanza.map((line, li) => (
                <p
                  key={li}
                  className={`text-lg sm:text-xl leading-relaxed ${
                    li % 2 === 0 ? "text-white/90" : "text-white/60"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* فاصل سفلي */}
        <div className="flex items-center justify-center gap-3 mt-16 mb-12">
          <span className="block w-20 h-px bg-gradient-to-l from-gold/40 to-transparent" />
          <span className="text-gold/30">◈</span>
          <span className="block w-20 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        </div>

        {/* أزرار التنقل */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#poems"
            className="px-8 py-3 border border-white/20 text-white/60 hover:border-gold/50 hover:text-gold transition-all duration-300 text-sm font-medium"
          >
            ← عودة
          </Link>
          <Link
            href="/poems"
            className="px-8 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-[#111111] transition-all duration-300 text-sm font-semibold"
          >
            مزيد من القصائد
          </Link>
        </div>
      </main>
    </div>
  );
}
