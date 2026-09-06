import { NextRequest, NextResponse } from "next/server";
import { getLessonSchedule, saveLessonSchedule, ScheduleConflictError } from "@/lib/cloud/supabaseRest";
import { deleteLessonEvent } from "@/lib/googleCalendar";
import { LessonSchedule } from "@/lib/types";
function authorized(req:NextRequest){const expected=process.env.NEXT_STUDENTS_ADMIN_TOKEN;return Boolean(expected&&req.cookies.get("next_students_admin")?.value===expected)}
export async function GET(req:NextRequest){if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});try{return NextResponse.json({schedule:await getLessonSchedule()})}catch(e){if(e instanceof ScheduleConflictError)return NextResponse.json({error:"schedule_changed"},{status:409});return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}}
export async function PUT(req:NextRequest){if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});try{const {schedule}=await req.json() as {schedule:LessonSchedule};await saveLessonSchedule(schedule);return NextResponse.json({ok:true,schedule})}catch(e){if(e instanceof ScheduleConflictError)return NextResponse.json({error:"schedule_changed"},{status:409});return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}}
export async function POST(req:NextRequest){
  if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});
  try{
    const body=await req.json();
    if(body.action!=="cancel_booking")return NextResponse.json({error:"unknown_action"},{status:400});
    const schedule=await getLessonSchedule();
    const booking=schedule.bookings.find(b=>b.id===String(body.bookingId));
    if(!booking||booking.status!=="booked")return NextResponse.json({error:"not_found"},{status:404});
    booking.status="cancelled";

    schedule.activity.unshift({id:crypto.randomUUID(),type:"booking",studentId:booking.studentId,studentName:booking.studentName,title:`ביטלת שיעור של ${booking.studentName}`,detail:`${booking.date} · ${booking.startTime}`,createdAt:new Date().toISOString(),read:true,requiresAction:false,resolved:true,relatedId:booking.id});
    await saveLessonSchedule(schedule);
      if(booking.googleEventId){try{await deleteLessonEvent(schedule,booking.googleEventId)}catch{}}
    return NextResponse.json({ok:true,schedule});
  }catch(e){if(e instanceof ScheduleConflictError)return NextResponse.json({error:"schedule_changed"},{status:409});return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}
}

// Update availability against the latest schedule so editing hours preserves bookings.
export async function PATCH(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { availability } = await req.json();
    const time = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!Array.isArray(availability) || availability.length !== 7 ||
      new Set(availability.map(day => day?.weekday)).size !== 7 ||
      availability.some(day => !day || !Number.isInteger(day.weekday) || day.weekday < 0 || day.weekday > 6 ||
        typeof day.enabled !== "boolean" || typeof day.start !== "string" || typeof day.end !== "string" ||
        !time.test(day.start) || !time.test(day.end) || (day.enabled && day.start >= day.end))) {
      return NextResponse.json({ error: "invalid_availability" }, { status: 400 });
    }
    const schedule = await getLessonSchedule();
    schedule.availability = availability.map(({ weekday, enabled, start, end }) => ({ weekday, enabled, start, end }));
    await saveLessonSchedule(schedule);
    return NextResponse.json({ ok: true, schedule });
  } catch (error) {
    if (error instanceof ScheduleConflictError) return NextResponse.json({ error: "schedule_changed" }, { status: 409 });
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }
}
