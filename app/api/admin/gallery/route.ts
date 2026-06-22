import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_PATH = join(process.cwd(), "data", "gallery.json");

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
  const { path, alt } = body;
  if (!path) return Response.json({ error: "مسار الصورة مطلوب" }, { status: 400 });

  let images = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    images = JSON.parse(raw);
  } catch {}

  const newImage = { id: Date.now().toString(), path, alt: alt || "" };
  images.push(newImage);
  await writeFile(DATA_PATH, JSON.stringify(images, null, 2), "utf-8");
  return Response.json(newImage, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "المعرّف مطلوب" }, { status: 400 });

  let images = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    images = JSON.parse(raw);
  } catch {}

  const filtered = images.filter((img: { id: string }) => img.id !== id);
  await writeFile(DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return Response.json({ success: true });
}
