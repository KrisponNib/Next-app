import { NextRequest, NextResponse } from "next/server";
import { getLessonSchedule,getStudentByToken,saveLessonSchedule,ScheduleConflictError } from "@/lib/cloud/supabaseRest";
import { addMinutes,bookingConflicts,canStudentModifyBooking,upcomingBookableDays } from "@/lib/scheduling";
import { createLessonEvent,deleteLessonEvent } from "@/lib/googleCalendar";
import { LessonBooking } from "@/lib/types";

function nextBooking(schedule:any,studentId:string){
  const now=new Date().toISOString().slice(0,10);
  return schedule.bookings.filter((b:any)=>b.studentId===studentId&&b.status==="booked"&&b.date>=now).sort((a:any,b:any)=>`${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))[0];
}

export async function GET(_req:NextRequest,{params}:{params:{token:string}}){
  try{
    const student=await getStudentByToken(params.token);if(!student)return NextResponse.json({error:"not_found"},{status:404});
    const schedule=await getLessonSchedule();
    const existing=nextBooking(schedule,student.id);
    return NextResponse.json({days:upcomingBookableDays(schedule),existing:existing?{...existing,canModify:canStudentModifyBooking(existing)}:null})
  }catch(e){if(e instanceof ScheduleConflictError)return NextResponse.json({error:"schedule_changed"},{status:409});return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}
}

export async function POST(req:NextRequest,{params}:{params:{token:string}}){
  try{
    const student=await getStudentByToken(params.token);if(!student)return NextResponse.json({error:"not_found"},{status:404});
    const body=await req.json();const schedule=await getLessonSchedule();schedule.activity ||= [];

    if(body.action==="request"){
      const message=String(body.message||"").trim();if(!message)return NextResponse.json({error:"missing_message"},{status:400});
      const id=crypto.randomUUID();schedule.requests.unshift({id,studentId:student.id,studentName:student.name,preferredDay:body.preferredDay?String(body.preferredDay):undefined,message,status:"pending",createdAt:new Date().toISOString()});
      schedule.activity.unshift({id:crypto.randomUUID(),type:"request",studentId:student.id,studentName:student.name,title:`${student.name} ביקש/ה שעה אחרת`,detail:message,createdAt:new Date().toISOString(),read:false,requiresAction:true,relatedId:id});
      await saveLessonSchedule(schedule);return NextResponse.json({ok:true,kind:"request"})
    }

    if(body.action==="cancel"||body.action==="reschedule"){
      const booking=nextBooking(schedule,student.id);
      if(!booking)return NextResponse.json({error:"no_booking"},{status:404});
      if(!canStudentModifyBooking(booking))return NextResponse.json({error:"too_late",message:"אפשר לבטל או להזיז שיעור רק עד 24 שעות לפניו."},{status:403});
      booking.status="cancelled";

      schedule.activity.unshift({id:crypto.randomUUID(),type:"booking",studentId:student.id,studentName:student.name,title:body.action==="reschedule"?`${student.name} הזיז/ה שיעור`:`${student.name} ביטל/ה שיעור`,detail:`${booking.date} · ${booking.startTime}`,createdAt:new Date().toISOString(),read:false,requiresAction:false,relatedId:booking.id});
      await saveLessonSchedule(schedule);
      if(booking.googleEventId){try{await deleteLessonEvent(schedule,booking.googleEventId)}catch{}}
      return NextResponse.json({ok:true,kind:body.action})
    }

    if(body.action==="book"){
      const date=String(body.date||""),startTime=String(body.startTime||"");
      const offered=upcomingBookableDays(schedule).find(d=>d.date===date)?.times||[];
      if(!offered.includes(startTime))return NextResponse.json({error:"slot_not_offered"},{status:409});
      if(bookingConflicts(schedule.bookings,date,startTime,schedule.lessonMinutes))return NextResponse.json({error:"slot_taken"},{status:409});
      const booking:LessonBooking={id:crypto.randomUUID(),studentId:student.id,studentName:student.name,date,startTime,endTime:addMinutes(startTime,schedule.lessonMinutes),status:"booked" as const,createdAt:new Date().toISOString(),googleSyncStatus:"not_connected" as const};
      try{booking.googleEventId=await createLessonEvent(schedule,booking);booking.googleSyncStatus="synced"}catch{booking.googleSyncStatus="failed"}
      schedule.bookings.push(booking);schedule.activity.unshift({id:crypto.randomUUID(),type:"booking",studentId:student.id,studentName:student.name,title:`${student.name} קבע/ה שיעור`,detail:`${date} · ${startTime}`,createdAt:new Date().toISOString(),read:false,requiresAction:false,relatedId:booking.id});
      try { await saveLessonSchedule(schedule); }
      catch(error) {
        if(booking.googleEventId){try{await deleteLessonEvent(schedule,booking.googleEventId)}catch{}}
        throw error;
      }
      return NextResponse.json({ok:true,kind:"booking"})
    }
    return NextResponse.json({error:"unknown_action"},{status:400})
  }catch(e){if(e instanceof ScheduleConflictError)return NextResponse.json({error:"schedule_changed"},{status:409});return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}
}
