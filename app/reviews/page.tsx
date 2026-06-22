import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Review {
  id: string;
  text: string;
  name: string;
  location: string;
  stars: number;
  createdAt: string;
  approved: boolean;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-gold" : "text-white/20"}>★</span>
      ))}
    </div>
  );
}

function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function ReviewsPage() {
  let reviews: Review[] = [];
  try {
    const raw = await readFile(join(process.cwd(), "data", "reviews.json"), "utf-8");
    reviews = (JSON.parse(raw) as Review[]).filter((r) => r.approved);
  } catch {}

  return (
    <div
      className="min-h-screen bg-[#111111]"
      style={{ fontFamily: "var(--font-cairo, Cairo, sans-serif)" }}
    >
      {/* شريط علوي */}
      <div className="border-b border-white/8 bg-[#0E0C09]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/#reviews"
            className="text-white/40 hover:text-gold transition-colors text-sm flex items-center gap-1.5 w-fit"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            <span>›</span> العودة للموقع
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-24">

        {/* العنوان */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            آراء الزوار
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <span className="text-gold">◈</span>
            <span className="block w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
          <p
            className="text-white/40 text-sm mt-5"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            {reviews.length} تعليق
          </p>
        </div>

        {reviews.length === 0 ? (
          <p
            className="text-center text-white/30 py-20"
            style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
          >
            لا توجد تعليقات بعد
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => {
              const age = daysSince(review.createdAt);
              const opacity = age <= 7 ? 1 : age <= 30 ? 0.85 : age <= 60 ? 0.65 : 0.45;
              return (
                <div
                  key={review.id}
                  className="bg-[#1C1812] border border-white/8 rounded-lg p-6 hover:border-gold/25 transition-colors"
                  style={{ opacity }}
                >
                  <span className="text-gold text-4xl leading-none opacity-50 font-serif block mb-3">"</span>
                  <p
                    className="text-white/75 text-sm leading-loose mb-5"
                    style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
                  >
                    {review.text}
                  </p>
                  <div className="border-t border-white/8 pt-4 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-white font-semibold text-sm">{review.name}</p>
                      {review.location && (
                        <p
                          className="text-white/40 text-xs mt-0.5"
                          style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
                        >
                          {review.location}
                        </p>
                      )}
                      <Stars count={review.stars} />
                    </div>
                    <p
                      className="text-white/30 text-xs"
                      style={{ fontFamily: "var(--font-ibm, IBM Plex Sans Arabic, sans-serif)" }}
                    >
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-14">
          <Link
            href="/#reviews"
            className="inline-block px-8 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-[#111111] transition-all duration-300 text-sm font-semibold"
          >
            العودة وإضافة تعليق
          </Link>
        </div>
      </main>
    </div>
  );
}
