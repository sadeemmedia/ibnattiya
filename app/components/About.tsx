import { readFile } from "fs/promises";
import { join } from "path";

/* ===== أيقونات المعلومات ===== */
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-200/50 last:border-0">
      <div className="w-10 h-10 rounded-md border border-gray-300/50 flex items-center justify-center text-gray-500 flex-shrink-0 text-lg bg-white">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-xs mb-0.5" style={{ fontFamily: "var(--font-ibm)" }}>{label}</p>
        <p className="text-[#2E2218] font-semibold text-sm leading-relaxed" style={{ fontFamily: "var(--font-ibm)" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* ===== قسم نبذة عن الشاعر ===== */
export default async function About() {
  /* قراءة بيانات الملف الشخصي */
  let profile: {
    name: string;
    birthCity: string;
    birthYear: string;
    education: string;
    work: string;
    interests: string;
    bio: string;
  } = {
    name: "خليفة بن عبدالعزيز العطية",
    birthCity: "الدوحة - قطر",
    birthYear: "1983",
    education: "بكالوريوس إدارة أعمال - جامعة غرينتش لندن",
    work: "القوات المسلحة القطرية",
    interests: "الشعر – القراءة – الثقافة",
    bio: "خليفة بن عبدالعزيز العطية، من مواليد الدوحة عاصمة قطر 1983. تلقى تعليمه الابتدائي والإعدادي والثانوي في قطر، ثم أكمل تعليمه العالي في بريطانيا حيث تخرج من جامعة غرينتش العريقة في لندن في مجال إدارة الأعمال. ويعمل في القوات المسلحة القطرية. يعرف عنه الثقافة والإثارة على الأدب، وبعد من شعراء قطر المعروفين، له حضور أدبي مميز وقصائد متنوعة تعكس المشاعر والوجدان والقيم الوطنية والإنسانية.",
  };

  try {
    const raw = await readFile(join(process.cwd(), "data", "profile.json"), "utf-8");
    profile = JSON.parse(raw);
  } catch {}

  const infoItems = [
    { icon: "📅", label: "الميلاد", value: `${profile.birthCity}\n${profile.birthYear}` },
    { icon: "🎓", label: "المؤهل العلمي", value: profile.education },
    { icon: "💼", label: "العمل", value: profile.work },
    { icon: "📖", label: "الاهتمامات", value: profile.interests },
  ];

  return (
    <section id="about" className="bg-beige py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== عنوان القسم ===== */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-gold-dark text-2xl">🪶</span>
          <h2
            className="text-3xl lg:text-4xl font-bold text-dark-brown"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            نبذة عن الشاعر
          </h2>
        </div>

        <div className="max-w-3xl">

          {/* ===== النص التعريفي ===== */}
          <div>
            <div
              className="text-[#3D2E1E] text-base lg:text-lg leading-[2] space-y-5"
              style={{ fontFamily: "var(--font-ibm)" }}
            >
              {profile.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
