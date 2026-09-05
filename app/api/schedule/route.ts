import { NextRequest, NextResponse } from "next/server";
import { getLessonSchedule, saveLessonSchedule } from "@/lib/cloud/supabaseRest";
import { deleteLessonEvent } from "@/lib/googleCalendar";
import { LessonSchedule } from "@/lib/types";
function authorized(req:NextRequest){const expected=process.env.NEXT_STUDENTS_ADMIN_TOKEN;return Boolean(expected&&req.cookies.get("next_students_admin")?.value===expected)}
export async function GET(req:NextRequest){if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});try{return NextResponse.json({schedule:await getLessonSchedule()})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}}
export async function PUT(req:NextRequest){if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});try{const {schedule}=await req.json() as {schedule:LessonSchedule};await saveLessonSchedule(schedule);return NextResponse.json({ok:true,schedule})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}}
export async function POST(req:NextRequest){
  if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});
  try{
    const body=await req.json();
    if(body.action!=="cancel_booking")return NextResponse.json({error:"unknown_action"},{status:400});
    const schedule=await getLessonSchedule();
    const booking=schedule.bookings.find(b=>b.id===String(body.bookingId));
    if(!booking||booking.status!=="booked")return NextResponse.json({error:"not_found"},{status:404});
    booking.status="cancelled";
    if(booking.googleEventId){try{await deleteLessonEvent(schedule,booking.googleEventId)}catch{}}
    schedule.activity.unshift({id:crypto.randomUUID(),type:"booking",studentId:booking.studentId,studentName:booking.studentName,title:`ביטלת שיעור של ${booking.studentName}`,detail:`${booking.date} · ${booking.startTime}`,createdAt:new Date().toISOString(),read:true,requiresAction:false,resolved:true,relatedId:booking.id});
    await saveLessonSchedule(schedule);
    return NextResponse.json({ok:true,schedule});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}
}
