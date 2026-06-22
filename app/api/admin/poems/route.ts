import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_PATH = join(process.cwd(), "data", "poems.json");

export async function GET() {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return Response.json(JSON.parse(raw));
  } catch {
    return Response.json([]);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, excerpt, content } = body;
  if (!title) return Response.json({ error: "العنوان مطلوب" }, { status: 400 });

  let poems = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    poems = JSON.parse(raw);
  } catch {}

  const newPoem = { id: Date.now().toString(), title, excerpt: excerpt || "", content: content || "" };
  poems.push(newPoem);
  await writeFile(DATA_PATH, JSON.stringify(poems, null, 2), "utf-8");
  return Response.json(newPoem, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, title, excerpt, content } = body;
  if (!id) return Response.json({ error: "المعرّف مطلوب" }, { status: 400 });

  let poems = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    poems = JSON.parse(raw);
  } catch {}

  const index = poems.findIndex((p: { id: string }) => p.id === id);
  if (index === -1) return Response.json({ error: "القصيدة غير موجودة" }, { status: 404 });

  poems[index] = { ...poems[index], title, excerpt, content };
  await writeFile(DATA_PATH, JSON.stringify(poems, null, 2), "utf-8");
  return Response.json(poems[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "المعرّف مطلوب" }, { status: 400 });

  let poems = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    poems = JSON.parse(raw);
  } catch {}

  const filtered = poems.filter((p: { id: string }) => p.id !== id);
  await writeFile(DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return Response.json({ success: true });
}
