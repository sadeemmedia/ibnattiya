import Image from "next/image";

/* ===== قسم الهيرو — متجاوب بين الجوال والكمبيوتر ===== */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#111111]"
    >

      {/* ══════════════════════════════════════════
          خلفية الكمبيوتر والتابلت (md وما فوق)
          ══════════════════════════════════════════ */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="/uploads/top.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* تعتيم سفلي تدريجي */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/15 to-transparent" />
        {/* تعتيم جانبي لإبراز النصوص عن اليسار */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#111111]/50" />
      </div>

      {/* ══════════════════════════════════════════
          خلفية الجوال (أصغر من md)
          ══════════════════════════════════════════ */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/uploads/top-mobile.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        {/* تعتيم علوي خلف الشعار */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#111111]/85 via-[#111111]/25 to-transparent" />
        {/* تعتيم سفلي خلف النصوص */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#111111] via-[#111111]/75 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════
          محتوى الجوال — تخطيط عمودي
          ══════════════════════════════════════════ */}
      <div className="md:hidden relative z-10 flex flex-col min-h-screen">

        {/* الشعار في القمة */}
        <div
          className="flex justify-center pt-8 px-6 flex-shrink-0"
          style={{ animation: "fadeInUp 0.5s ease 0.1s both" }}
        >
          <Image
            src="/uploads/binlogo.png"
            alt="شعار بن عطية"
            width={130}
            height={56}
            className="h-13 w-auto object-contain"
            priority
          />
        </div>

        {/* مساحة وسطى — تُظهر صورة الشاعر بدون تداخل نصي */}
        <div className="flex-1 min-h-[38vh]" />

        {/* النصوص في الأسفل */}
        <div className="flex-shrink-0 px-5 pb-12 text-center">

          {/* اسم الشاعر */}
          <h1
            className="text-[1.45rem] font-bold text-gold leading-snug mb-4"
            style={{
              fontFamily: "var(--font-cairo)",
              animation:
                "fadeInUp 0.6s ease 0.25s both, goldGlow 3.5s ease-in-out 1.2s infinite",
            }}
          >
            خليفة بن عبدالعزيز العطية
          </h1>

          {/* الفاصل الزخرفي */}
          <div
            className="flex items-center justify-center gap-2 mb-4"
            style={{ animation: "fadeInUp 0.5s ease 0.45s both" }}
          >
            <span className="block w-12 h-px bg-gradient-to-l from-gold to-transparent" />
            <span
              className="text-gold text-sm inline-block"
              style={{ animation: "spinSlow 8s linear infinite" }}
            >
              ◈
            </span>
            <span className="block w-12 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>

          {/* الأبيات الشعرية */}
          <div
            className="text-[0.82rem] leading-[1.9] space-y-1"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {[
              { text: "أنا ولد عودٍ على الدين مبداه", dim: false, delay: "0.6s"  },
              { text: "ماني ولد منهو علومه ردية",      dim: true,  delay: "0.75s" },
              { text: "وأسمٍ جعلت الناس لا شك تدراه", dim: false, delay: "0.9s"  },
              { text: "خليفة بن عبدالعزيز العطية",    dim: true,  delay: "1.05s" },
            ].map((line, i) => (
              <p
                key={i}
                className={line.dim ? "text-white/50" : "text-white/80"}
                style={{ animation: `fadeInUp 0.5s ease ${line.delay} both` }}
              >
                {line.text}
              </p>
            ))}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          محتوى الكمبيوتر والتابلت — تخطيط أفقي
          ══════════════════════════════════════════ */}
      <div className="hidden md:flex items-center relative z-10 min-h-screen w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

          {/* النصوص على الجانب الأيسر (justify-end في RTL = يسار بصري) */}
          <div className="flex justify-end">
            <div className="max-w-md lg:max-w-lg text-right">

              {/* تسمية الشاعر القطري */}
              <div
                className="flex items-center justify-end gap-3 mb-5"
                style={{ animation: "fadeInUp 0.55s ease 0.15s both" }}
              >
                <span
                  className="block w-12 h-px bg-gold origin-right"
                  style={{ animation: "lineExpand 0.7s ease 0.35s both" }}
                />
                <span
                  className="text-gold text-xs tracking-[0.2em] font-medium"
                  style={{ fontFamily: "var(--font-ibm)" }}
                >
                  الشاعر القطري
                </span>
              </div>

              {/* اسم الشاعر */}
              <h1
                className="font-bold text-gold leading-tight mb-5 whitespace-nowrap
                           text-[1.75rem] lg:text-[2.2rem] xl:text-[2.55rem]"
                style={{
                  fontFamily: "var(--font-cairo)",
                  animation:
                    "fadeInUp 0.65s ease 0.35s both, goldGlow 3.5s ease-in-out 1.4s infinite",
                }}
              >
                خليفة بن عبدالعزيز العطية
              </h1>

              {/* الفاصل الزخرفي */}
              <div
                className="flex items-center justify-end gap-2 mb-6"
                style={{ animation: "fadeInUp 0.55s ease 0.55s both" }}
              >
                <span
                  className="block h-px bg-gradient-to-l from-gold to-transparent origin-right"
                  style={{ width: "70px", animation: "lineExpand 0.9s ease 0.65s both" }}
                />
                <span
                  className="text-gold text-sm inline-block"
                  style={{ animation: "spinSlow 8s linear infinite" }}
                >
                  ◈
                </span>
                <span
                  className="block h-px bg-gradient-to-r from-gold to-transparent origin-left"
                  style={{ width: "70px", animation: "lineExpand 0.9s ease 0.65s both" }}
                />
              </div>

              {/* الأبيات الشعرية */}
              <div
                className="text-base lg:text-lg leading-loose space-y-2 mb-8 border-r-2 border-gold/35 pr-4"
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

              {/* زر الدعوة */}
              <div style={{ animation: "fadeInUp 0.5s ease 1.3s both" }}>
                <a
                  href="#about"
                  className="btn-shimmer relative inline-flex items-center gap-3 px-7 py-3.5
                             overflow-hidden border border-gold text-gold font-semibold
                             tracking-wide text-sm hover:bg-gold hover:text-charcoal
                             transition-all duration-300 group"
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
      </div>

      {/* ===== سهم التمرير (كمبيوتر فقط) ===== */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-9 border border-gold/40 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-2.5 bg-gold rounded-full animate-pulse" />
        </div>
      </div>

    </section>
  );
}
