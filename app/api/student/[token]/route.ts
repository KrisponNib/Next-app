import { NextResponse } from "next/server";
import { getLessonSchedule, getStudentByToken, saveLessonSchedule, saveStudent } from "@/lib/cloud/supabaseRest";

export async function GET(_: Request, { params }: { params: { token: string } }) {
  const student = await getStudentByToken(params.token);
  if (!student) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ student });
}

export async function PATCH(req: Request, { params }: { params: { token: string } }) {
  const student = await getStudentByToken(params.token);
  if (!student) return NextResponse.json({ error: "not found" }, { status: 404 });

  const body = await req.json();
  if (body.action === "completePractice") {
    const status = ["good", "mixed", "stuck"].includes(body.status) ? body.status : "mixed";
    student.reflections = [
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        status,
        worked: String(body.worked || ""),
        improveNext: String(body.improveNext || ""),
        evidenceUrl: body.evidenceUrl ? String(body.evidenceUrl) : undefined,
      },
      ...(student.reflections || []),
    ];
    const open = student.assignments?.find((a) => a.status !== "done");
    if (open) open.status = status === "stuck" ? "stuck" : "done";
    await saveStudent(student);

    if (status === "stuck") {
      const schedule = await getLessonSchedule();
      schedule.activity = [
        {
          id: crypto.randomUUID(),
          type: "practice",
          studentId: student.id,
          studentName: student.name,
          title: `${student.name} סימן/ה שנתקע/ה בתרגול`,
          detail: String(body.improveNext || body.worked || "כדאי לבדוק מה חסר לפני השיעור הבא."),
          createdAt: new Date().toISOString(),
          read: false,
          requiresAction: true,
          resolved: false,
        },
        ...(schedule.activity || []),
      ];
      await saveLessonSchedule(schedule);
    }
    return NextResponse.json({ ok: true, student });
  }

  if (body.action === "updateTempo") {
    const assignment = student.assignments?.find((a) => a.id === String(body.assignmentId || ""));
    const tempo = Number(body.currentTempo);
    if (!assignment || !Number.isFinite(tempo) || tempo < 1 || tempo > 400) {
      return NextResponse.json({ error: "invalid tempo" }, { status: 400 });
    }
    assignment.currentTempo = Math.round(tempo);
    await saveStudent(student);
    return NextResponse.json({ ok: true, student });
  }

  if (body.action === "askHomeworkQuestion") {
    const assignmentId = String(body.assignmentId || "");
    const question = String(body.question || "").trim();
    const assignment = student.assignments?.find((a) => a.id === assignmentId);
    if (!assignment || !question) return NextResponse.json({ error: "missing question" }, { status: 400 });

    const schedule = await getLessonSchedule();
    schedule.activity = [
      {
        id: crypto.randomUUID(),
        type: "homework_question",
        studentId: student.id,
        studentName: student.name,
        title: `${student.name} שאל/ה שאלה על שיעורי הבית`,
        detail: `“${assignment.title}” — ${question}`,
        createdAt: new Date().toISOString(),
        read: false,
        requiresAction: true,
        resolved: false,
        relatedId: assignment.id,
      },
      ...(schedule.activity || []),
    ];
    await saveLessonSchedule(schedule);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unsupported action" }, { status: 400 });
}
