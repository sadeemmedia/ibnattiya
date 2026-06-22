import { redirect } from "next/navigation";

/* إعادة توجيه / admin إلى لوحة المعلومات */
export default function AdminIndex() {
  redirect("/admin/dashboard");
}
