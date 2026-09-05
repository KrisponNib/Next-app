import { NextRequest, NextResponse } from "next/server";
import { calendarConnectionInfo } from "@/lib/googleCalendar";
import { getLessonSchedule, saveLessonSchedule } from "@/lib/cloud/supabaseRest";
import { LessonSchedule } from "@/lib/types";

function authorized(req: NextRequest) {
  const expected = process.env.NEXT_STUDENTS_ADMIN_TOKEN;
  return Boolean(expected && req.cookies.get("next_students_admin")?.value === expected);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const schedule = await getLessonSchedule();
    const info = await calendarConnectionInfo();

    return NextResponse.json({
      ...info,
      settings: schedule.googleCalendar,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const patch = (await req.json()) as Partial<LessonSchedule["googleCalendar"]>;
    const schedule = await getLessonSchedule();

    schedule.googleCalendar = {
      ...schedule.googleCalendar,
      ...patch,
    };

    await saveLessonSchedule(schedule);

    return NextResponse.json({
      ok: true,
      settings: schedule.googleCalendar,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 }
    );
  }
}
