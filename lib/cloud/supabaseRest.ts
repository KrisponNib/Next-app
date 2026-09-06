import { LessonSchedule, Student } from "@/lib/types";

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

export const DEFAULT_LESSON_SCHEDULE: LessonSchedule = {
  lessonMinutes: 55,
  slotIntervalMinutes: 15,
  offersPerDay: 3,
  advanceDays: 14,
  availability: [
    { weekday: 0, enabled: true, start: "15:00", end: "18:00" },
    { weekday: 1, enabled: false, start: "09:00", end: "17:00" },
    { weekday: 2, enabled: true, start: "15:00", end: "18:00" },
    { weekday: 3, enabled: false, start: "09:00", end: "17:00" },
    { weekday: 4, enabled: true, start: "10:00", end: "15:00" },
    { weekday: 5, enabled: false, start: "09:00", end: "17:00" },
    { weekday: 6, enabled: false, start: "09:00", end: "17:00" },
  ],
  bookings: [], recurringLessons: [], requests: [], activity: [],
  googleCalendar: { calendarId: "primary", eventTitleTemplate: "שיעור תופים — {student}" },
  updatedAt: new Date(0).toISOString(),
};

export async function getLessonSchedule(): Promise<LessonSchedule> {
  const { url } = env();
  const res = await fetch(`${url}/rest/v1/lesson_schedule_v1?id=eq.main&select=data&limit=1`, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`Supabase schedule read failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  const data = rows[0]?.data || {};
  return {
    ...DEFAULT_LESSON_SCHEDULE,
    ...data,
    availability: data.availability || DEFAULT_LESSON_SCHEDULE.availability,
    bookings: data.bookings || [], recurringLessons: data.recurringLessons || [], requests: data.requests || [], activity: data.activity || [],
    googleCalendar: { ...DEFAULT_LESSON_SCHEDULE.googleCalendar, ...(data.googleCalendar || {}) },
  } as LessonSchedule;
}
export class ScheduleConflictError extends Error {
  constructor(){super("schedule_changed");}
}
export async function saveLessonSchedule(schedule: LessonSchedule): Promise<void> {
  const { url } = env();
  const updatedAt = new Date(Math.max(Date.now(), Date.parse(schedule.updatedAt) + 1)).toISOString();
  const payload = { id:"main", data:{...schedule,updatedAt}, updated_at:updatedAt };
  const initial = schedule.updatedAt === DEFAULT_LESSON_SCHEDULE.updatedAt;
  const query = initial ? "on_conflict=id" : `id=eq.main&data->>updatedAt=eq.${encodeURIComponent(schedule.updatedAt)}`;
  const res = await fetch(`${url}/rest/v1/lesson_schedule_v1?${query}`, {
    method: initial ? "POST" : "PATCH",
    headers: headers({Prefer: initial ? "resolution=ignore-duplicates,return=representation" : "return=representation"}),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Supabase schedule save failed: ${res.status} ${await res.text()}`);
  if (!(await res.json()).length) throw new ScheduleConflictError();
  schedule.updatedAt = updatedAt;
}

export interface GoogleCalendarCredentials { accessToken?:string; refreshToken?:string; expiresAt?:number; }
export async function getGoogleCalendarCredentials(): Promise<GoogleCalendarCredentials | null> {
  const { url } = env();
  const res = await fetch(`${url}/rest/v1/calendar_integration_v1?id=eq.google&select=data&limit=1`, { headers:headers(), cache:"no-store" });
  if (!res.ok) throw new Error(`Supabase calendar credentials read failed: ${res.status} ${await res.text()}`);
  const rows = await res.json(); return rows[0]?.data || null;
}
export async function saveGoogleCalendarCredentials(data:GoogleCalendarCredentials):Promise<void>{
  const {url}=env(); const payload={id:"google",data,updated_at:new Date().toISOString()};
  const res=await fetch(`${url}/rest/v1/calendar_integration_v1?on_conflict=id`,{method:"POST",headers:headers({Prefer:"resolution=merge-duplicates,return=minimal"}),body:JSON.stringify(payload)});
  if(!res.ok)throw new Error(`Supabase calendar credentials save failed: ${res.status} ${await res.text()}`);
}
