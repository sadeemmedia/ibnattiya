import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

/* ===== رفع الصور للخادم ===== */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
    }

    /* التحقق من نوع الملف */
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "نوع الملف غير مدعوم. الأنواع المدعومة: JPG, JPEG, PNG, WEBP" },
        { status: 400 }
      );
    }

    /* حجم الملف (5MB max) */
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: "حجم الملف يتجاوز 5 ميجابايت" }, { status: 400 });
    }

    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    const filePath = join(uploadsDir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    return Response.json({ path: `/uploads/${filename}`, success: true });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "حدث خطأ أثناء رفع الملف" }, { status: 500 });
  }
}
