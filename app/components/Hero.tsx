import Image from "next/image";

/* ===== قسم الهيرو الرئيسي ===== */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#111111]"
    >
      {/* ===== خلفية القسم العلوي الكاملة (top.png) ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/uploads/top.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* تدرج سفلي لإخفاء حافة الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/15 to-transparent" />
        {/* تدرج يساري لإبراز النصوص */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#111111]/55" />
      </div>

      {/* ===== المحتوى النصي — مُحوَّل للجهة اليسرى ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/*
          في RTL: justify-end يضع المحتوى على الجانب الأيسر (النهاية البصرية)
          max-w-lg يضمن عمود نصي مريح لا يزاحم وجه الشاعر
        */}
        <div className="flex justify-end">
          <div className="max-w-sm sm:max-w-md lg:max-w-lg text-right">

            {/* خط + تسمية "الشاعر القطري" */}
            <div
              className="flex items-center justify-end gap-3 mb-5"
              style={{ animation: "fadeInUp 0.55s ease 0.15s both" }}
            >
              <span
                className="block w-12 h-px bg-gold origin-right"
                style={{ animation: "lineExpand 0.7s ease 0.35s both" }}
              />
              <span
                className="text-gold text-xs tracking-[0.2em] font-medium uppercase"
                style={{ fontFamily: "var(--font-ibm)" }}
              >
                الشاعر القطري
              </span>
            </div>

            {/* اسم الشاعر — سطر واحد مع توهج ذهبي نابض */}
            <h1
              className="font-bold text-gold leading-tight mb-5 lg:whitespace-nowrap
                         text-[1.65rem] sm:text-3xl lg:text-[2.2rem] xl:text-[2.6rem]"
              style={{
                fontFamily: "var(--font-cairo)",
                animation:
                  "fadeInUp 0.65s ease 0.35s both, goldGlow 3.5s ease-in-out 1.4s infinite",
              }}
            >
              خليفة بن عبدالعزيز العطية
            </h1>

            {/* الفاصل الزخرفي — الخطان يمتدان من الوسط */}
            <div
              className="flex items-center justify-end gap-2 mb-6"
              style={{ animation: "fadeInUp 0.55s ease 0.55s both" }}
            >
              <span
                className="block h-px bg-gradient-to-l from-gold to-transparent origin-right"
                style={{
                  width: "70px",
                  animation: "lineExpand 0.9s ease 0.65s both",
                }}
              />
              {/* ماسة تدور ببطء */}
              <span
                className="text-gold text-sm inline-block"
                style={{ animation: "spinSlow 8s linear infinite" }}
              >
                ◈
              </span>
              <span
                className="block h-px bg-gradient-to-r from-gold to-transparent origin-left"
                style={{
                  width: "70px",
                  animation: "lineExpand 0.9s ease 0.65s both",
                }}
              />
            </div>

            {/* الأبيات الشعرية — تظهر بالتتابع */}
            <div
              className="text-base sm:text-lg leading-loose space-y-2 mb-8 border-r-2 border-gold/35 pr-4"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {[
                { text: "أنا ولد عودٍ على الدين مبداه", dim: false, delay: "0.7s"  },
                { text: "ماني ولد منهو علومه ردية",      dim: true,  delay: "0.85s" },
                { text: "وأسمٍ جعلت الناس لا شك تدراه", dim: false, delay: "1.0s"  },
                { text: "خليفة بن عبدالعزيز العطية",    dim: true,  delay: "1.15s" },
              ].map((line, i) => (
                <p
                  key={i}
                  className={line.dim ? "text-white/55" : "text-white/85"}
                  style={{ animation: `fadeInUp 0.5s ease ${line.delay} both` }}
                >
                  {line.text}
                </p>
              ))}
            </div>

            {/* زر الدعوة — مع لمعة متحركة */}
            <div style={{ animation: "fadeInUp 0.5s ease 1.3s both" }}>
              <a
                href="#about"
                className="btn-shimmer relative inline-flex items-center gap-3 px-7 py-3.5 overflow-hidden
                           border border-gold text-gold font-semibold tracking-wide text-sm
                           hover:bg-gold hover:text-charcoal transition-all duration-300 group"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                تعرف على الشاعر
                <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ===== سهم التمرير للأسفل ===== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-9 border border-gold/40 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-2.5 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
