import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const FILE = join(process.cwd(), "data", "subscribers.json");

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
    const subscribers = JSON.parse(await readFile(FILE, "utf-8")) as { id: string }[];
    const updated = subscribers.filter((s) => s.id !== id);
    await writeFile(FILE, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
