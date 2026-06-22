import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const FILE = join(process.cwd(), "data", "reviews.json");

export async function GET() {
  try {
    const raw = await readFile(FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updated = await request.json();
    const reviews = JSON.parse(await readFile(FILE, "utf-8")) as { id: string }[];
    const next = reviews.map((r) => (r.id === updated.id ? { ...r, ...updated } : r));
    await writeFile(FILE, JSON.stringify(next, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const reviews = JSON.parse(await readFile(FILE, "utf-8")) as { id: string }[];
    const next = reviews.filter((r) => r.id !== id);
    await writeFile(FILE, JSON.stringify(next, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
