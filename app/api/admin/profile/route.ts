import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_PATH = join(process.cwd(), "data", "profile.json");

export async function GET() {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return Response.json(JSON.parse(raw));
  } catch {
    return Response.json({});
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  let existing = {};
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    existing = JSON.parse(raw);
  } catch {}

  const updated = { ...existing, ...body };
  await writeFile(DATA_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return Response.json(updated);
}
