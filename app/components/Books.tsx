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

/* ===== بطاقة مؤلَّف — غلاف + اسم فقط ===== */
function BookCard({ book }: { book: Book }) {
  return (
    <div className="book-card group flex flex-col items-center">

      {/* غلاف الكتاب */}
      <div className="relative w-52 h-68 mb-5 overflow-hidden rounded border border-gold/30 gold-glow"
           style={{ height: "272px", width: "208px" }}>
        <div className="book-cover transition-transform duration-500 w-full h-full">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
            sizes="208px"
          />
        </div>
        {/* وهج الإطار الذهبي عند التمرير */}
        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/55
                        transition-all duration-500 rounded pointer-events-none" />
        {/* تدرج سفلي خفيف */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
      </div>

      {/* نوع المؤلَّف */}
      <p
        className="text-gold/60 text-xs tracking-widest mb-1"
        style={{ fontFamily: "var(--font-ibm)" }}
      >
        {book.type}
      </p>

      {/* عنوان المؤلَّف */}
      <h3
        className="text-white text-xl font-bold text-center"
        style={{ fontFamily: "var(--font-cairo)" }}
      >
        {book.title}
      </h3>

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

      {/* خلفية زخرفية ===== */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 70% 40%, rgba(200,164,107,0.6) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* عنوان القسم */}
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

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

      </div>
    </section>
  );
}
