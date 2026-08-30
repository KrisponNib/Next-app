import { NextRequest, NextResponse } from "next/server";
import { getAllStudents, upsertStudents } from "@/lib/cloud/supabaseRest";
import { Student } from "@/lib/types";

function authorized(req: NextRequest) {
  const expected = process.env.NEXT_STUDENTS_ADMIN_TOKEN;
  return Boolean(expected && req.cookies.get("next_students_admin")?.value === expected);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ students: await getAllStudents() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "unknown error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const students = Array.isArray(body.students) ? (body.students as Student[]) : [];
    const normalized = students.map((student) => ({ ...student, shareToken: student.shareToken || crypto.randomUUID() }));
    await upsertStudents(normalized);
    return NextResponse.json({ ok: true, students: normalized });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "unknown error" }, { status: 500 });
  }
}
