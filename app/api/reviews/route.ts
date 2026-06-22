import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const FILE = join(process.cwd(), "data", "reviews.json");

export async function GET() {
  try {
    const raw = await readFile(FILE, "utf-8");
    const reviews = JSON.parse(raw) as { approved: boolean }[];
    return NextResponse.json(reviews.filter((r) => r.approved));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, location, text, stars } = await request.json();
    if (!name || !text) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    let reviews: unknown[] = [];
    try {
      reviews = JSON.parse(await readFile(FILE, "utf-8"));
    } catch {}

    const entry = {
      id: Date.now().toString(),
      name: String(name).trim(),
      location: String(location || "").trim(),
      text: String(text).trim(),
      stars: Math.min(5, Math.max(1, Number(stars) || 5)),
      createdAt: new Date().toISOString(),
      approved: true,
    };

    reviews.unshift(entry);
    await writeFile(FILE, JSON.stringify(reviews, null, 2), "utf-8");

    return NextResponse.json({ ok: true, review: entry });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
