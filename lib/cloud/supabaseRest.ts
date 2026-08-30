import { Student } from "@/lib/types";

function env() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  return { url: url.replace(/\/$/, ""), key };
}

function headers(extra?: Record<string, string>) {
  const { key } = env();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function getAllStudents(): Promise<Student[]> {
  const { url } = env();
  const res = await fetch(`${url}/rest/v1/students_v1?select=id,share_token,data,updated_at&order=updated_at.desc`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase students read failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  return rows.map((row: any) => ({ ...row.data, id: row.id, shareToken: row.share_token }));
}

export async function upsertStudents(students: Student[]): Promise<void> {
  const { url } = env();
  const payload = students.map((student) => ({
    id: student.id,
    share_token: student.shareToken || crypto.randomUUID(),
    data: { ...student, shareToken: undefined },
    updated_at: new Date().toISOString(),
  }));
  const res = await fetch(`${url}/rest/v1/students_v1?on_conflict=id`, {
    method: "POST",
    headers: headers({ Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Supabase students upsert failed: ${res.status} ${await res.text()}`);
}

export async function getStudentByToken(token: string): Promise<Student | null> {
  const { url } = env();
  const res = await fetch(`${url}/rest/v1/students_v1?share_token=eq.${encodeURIComponent(token)}&select=id,share_token,data&limit=1`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase student token read failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  const row = rows[0];
  return row ? ({ ...row.data, id: row.id, shareToken: row.share_token } as Student) : null;
}

export async function saveStudent(student: Student): Promise<void> {
  await upsertStudents([student]);
}
