import Image from "next/image";
import { readFile } from "fs/promises";
import { join } from "path";

interface Book {
  id: string;
  title: string;
  type: string;
  image: string;
  description: string;
}

/* ===== بطاقة مؤلَّف واحد ===== */
function BookCard({ book }: { book: Book }) {
  return (
    <div className="book-card group flex flex-col items-center">
      {/* غلاف الكتاب */}
      <div className="relative w-56 h-72 mb-6 overflow-hidden rounded border border-gold/30 gold-glow">
        <div className="book-cover transition-transform duration-500 w-full h-full">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
            sizes="224px"
          />
        </div>
        {/* وهج الإطار الذهبي عند التمرير */}
        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 rounded pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* معلومات الكتاب */}
      <p
        className="text-gold/70 text-xs tracking-widest mb-1"
        style={{ fontFamily: "var(--font-ibm)" }}
      >
        {book.type}
      </p>
      <h3
        className="text-white text-xl font-bold mb-5 text-center"
        style={{ fontFamily: "var(--font-cairo)" }}
      >
        {book.title}
      </h3>

      {/* زر التفاصيل */}
      <button
        className="px-6 py-2 border border-gold/60 text-gold text-sm hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium"
        style={{ fontFamily: "var(--font-ibm)" }}
      >
        عرض التفاصيل
      </button>
    </div>
  );
}

/* ===== قسم مؤلفاتي ===== */
export default async function Books() {
  let books: Book[] = [];
  try {
    const raw = await readFile(join(process.cwd(), "data", "books.json"), "utf-8");
    books = JSON.parse(raw);
  } catch {}

  return (
    <section id="books" className="bg-[#111111] py-20 lg:py-28 relative">
      {/* خلفية الزخرفة */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 70% 40%, rgba(200,164,107,0.6) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ===== عنوان القسم ===== */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            مؤلفاتي
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <span className="text-gold text-sm">◈</span>
            <span className="block w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>

        {/* ===== شبكة البطاقات ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mb-12">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* ===== زر جميع المؤلفات ===== */}
        <div className="text-center">
          <button
            className="px-10 py-3 bg-dark-brown text-gold border border-gold/40 hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            جميع المؤلفات
          </button>
        </div>
      </div>
    </section>
  );
}
