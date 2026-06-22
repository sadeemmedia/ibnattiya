import { readFile } from "fs/promises";
import { join } from "path";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Books from "./components/Books";
import Poems from "./components/Poems";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* تعطيل التخزين المؤقت لضمان قراءة البيانات المحدّثة دائماً */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  /* قراءة صور معرض الذاكرة */
  let galleryImages: { id: string; path: string; alt: string }[] = [];
  try {
    const raw = await readFile(
      join(process.cwd(), "data", "gallery.json"),
      "utf-8"
    );
    galleryImages = JSON.parse(raw);
  } catch {}

  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Books />
      <Poems />
      <Gallery images={galleryImages} />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
