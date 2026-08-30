import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") || "");
  const expected = process.env.NEXT_STUDENTS_ADMIN_PASSWORD;
  const token = process.env.NEXT_STUDENTS_ADMIN_TOKEN;
  if (!expected || !token || password !== expected) redirect("/students/login?error=1");
  cookies().set("next_students_admin", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
  redirect("/students");
}

export default function StudentsLogin({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <section className="max-w-md mx-auto pt-16">
      <h1 className="text-3xl font-extrabold">כניסה לאזור התלמידים</h1>
      <p className="text-muted mt-2">הסיסמה הזו מגנה על המידע של התלמידים שלך.</p>
      <form action={login} className="mt-6 space-y-3">
        <input name="password" type="password" required className="w-full bg-surface-soft rounded-button-sm px-4 py-3" placeholder="סיסמה" />
        {searchParams.error && <p className="text-sm">הסיסמה לא נכונה.</p>}
        <button className="w-full bg-text text-white rounded-button-sm py-3 font-extrabold">כניסה</button>
      </form>
    </section>
  );
}
