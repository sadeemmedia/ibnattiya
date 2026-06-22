import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const FILE = join(process.cwd(), "data", "messages.json");

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    let messages: unknown[] = [];
    try {
      messages = JSON.parse(await readFile(FILE, "utf-8"));
    } catch {}

    const entry = {
      id: Date.now().toString(),
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    messages.unshift(entry);
    await writeFile(FILE, JSON.stringify(messages, null, 2), "utf-8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
