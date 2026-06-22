import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_PATH = join(process.cwd(), "data", "books.json");

/* ===== جلب جميع الكتب ===== */
export async function GET() {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return Response.json(JSON.parse(raw));
  } catch {
    return Response.json([]);
  }
}

/* ===== إضافة كتاب جديد ===== */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, type, image, description } = body;

  if (!title || !type) {
    return Response.json({ error: "العنوان والنوع مطلوبان" }, { status: 400 });
  }

  let books = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    books = JSON.parse(raw);
  } catch {}

  const newBook = {
    id: Date.now().toString(),
    title,
    type,
    image: image || "/placeholder.jpg",
    description: description || "",
  };

  books.push(newBook);
  await writeFile(DATA_PATH, JSON.stringify(books, null, 2), "utf-8");
  return Response.json(newBook, { status: 201 });
}

/* ===== تعديل كتاب ===== */
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, title, type, image, description } = body;

  if (!id) {
    return Response.json({ error: "معرّف الكتاب مطلوب" }, { status: 400 });
  }

  let books = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    books = JSON.parse(raw);
  } catch {}

  const index = books.findIndex((b: { id: string }) => b.id === id);
  if (index === -1) {
    return Response.json({ error: "الكتاب غير موجود" }, { status: 404 });
  }

  books[index] = { ...books[index], title, type, image, description };
  await writeFile(DATA_PATH, JSON.stringify(books, null, 2), "utf-8");
  return Response.json(books[index]);
}

/* ===== حذف كتاب ===== */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "معرّف الكتاب مطلوب" }, { status: 400 });
  }

  let books = [];
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    books = JSON.parse(raw);
  } catch {}

  const filtered = books.filter((b: { id: string }) => b.id !== id);
  await writeFile(DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return Response.json({ success: true });
}
