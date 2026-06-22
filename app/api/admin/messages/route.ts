import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const FILE = join(process.cwd(), "data", "messages.json");

export async function GET() {
  try {
    const raw = await readFile(FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const messages = JSON.parse(await readFile(FILE, "utf-8")) as { id: string }[];
    const updated = messages.filter((m) => m.id !== id);
    await writeFile(FILE, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id } = await request.json();
    const messages = JSON.parse(await readFile(FILE, "utf-8")) as { id: string; read: boolean }[];
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    await writeFile(FILE, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
