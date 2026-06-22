import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const FILE = join(process.cwd(), "data", "subscribers.json");

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 });
    }

    let subscribers: unknown[] = [];
    try {
      subscribers = JSON.parse(await readFile(FILE, "utf-8"));
    } catch {}

    const emailStr = String(email).trim().toLowerCase();
    const exists = (subscribers as { email: string }[]).some(
      (s) => s.email === emailStr
    );
    if (exists) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const entry = {
      id: Date.now().toString(),
      email: emailStr,
      subscribedAt: new Date().toISOString(),
    };

    subscribers.unshift(entry);
    await writeFile(FILE, JSON.stringify(subscribers, null, 2), "utf-8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
