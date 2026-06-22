import type { Metadata } from "next";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

/* ===== تحميل خط Cairo للعناوين ===== */
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

/* ===== تحميل خط IBM Plex Sans Arabic للنصوص ===== */
const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "خليفة بن عبدالعزيز العطية - الموقع الرسمي",
  description:
    "الموقع الرسمي للشاعر القطري خليفة بن عبدالعزيز العطية - مؤلفاته، قصائده، ومسيرته الأدبية",
  keywords: "خليفة العطية، شاعر قطري، شعر، ديوان، بن عطية",
  openGraph: {
    title: "خليفة بن عبدالعزيز العطية",
    description: "الموقع الرسمي للشاعر القطري خليفة بن عبدالعزيز العطية",
    locale: "ar_QA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${ibmPlex.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
