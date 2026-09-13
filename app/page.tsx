"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { LessonBooking, LessonSchedule, RecurringLesson, Student } from "@/lib/types";
import { HEBREW_DAYS } from "@/lib/scheduling";

type DashboardData = { students: Student[]; schedule: LessonSchedule };

function pad(n: number) { return String(n).padStart(2, "0"); }
function localDateKey(date = new Date()) { return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`; }
function displayDate(v: string) { const [y,m,d]=v.split("-"); return `${d}.${m}.${y}`; }
function daysSince(iso: string) { return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)); }
function nextRecurringDate(weekday: number) {
  const now = new Date();
  const delta = (weekday - now.getDay() + 7) % 7;
  const d = new Date(now); d.setDate(now.getDate() + delta);
  return localDateKey(d);
}

export default function DashboardPage() {
  const [data,setData]=useState<DashboardData|null>(null);
  const [error,setError]=useState("");
  const [futureOpen,setFutureOpen]=useState(false);
  const [recurringOpen,setRecurringOpen]=useState(false);

  useEffect(()=>{
    let cancelled=false;
    async function load(){
      try{
        const [studentsRes,scheduleRes]=await Promise.all([
          fetch("/api/students",{cache:"no-store"}),
          fetch("/api/schedule",{cache:"no-store"}),
        ]);
        if(studentsRes.status===401||scheduleRes.status===401){window.location.href="/students/login";return;}
        if(!studentsRes.ok||!scheduleRes.ok)throw new Error("לא הצלחתי לטעון את הדשבורד");
        const studentsJson=await studentsRes.json(); const scheduleJson=await scheduleRes.json();
        if(!cancelled)setData({students:studentsJson.students||[],schedule:scheduleJson.schedule});
      }catch(e){if(!cancelled)setError(e instanceof Error?e.message:"שגיאה בטעינה")}
    }
    load(); return()=>{cancelled=true};
  },[]);

  const computed=useMemo(()=>{
    if(!data)return null;
    const {students,schedule}=data;
    const today=localDateKey(); const weekday=new Date().getDay();
    const recurring=(schedule.recurringLessons||[]).filter(r=>r.active!==false);
    const todaysBookings=(schedule.bookings||[]).filter(b=>b.status==="booked"&&b.date===today);
    const todaysRecurring=recurring.filter(r=>r.weekday===weekday);
    const mergedToday=[
      ...todaysRecurring.map(r=>({id:`r-${r.id}`,studentId:r.studentId,studentName:r.studentName,startTime:r.startTime,endTime:r.endTime,kind:"קבוע"})),
      ...todaysBookings.filter(b=>!todaysRecurring.some(r=>(r.studentId&&r.studentId===b.studentId)&&r.startTime===b.startTime)).map(b=>({id:`b-${b.id}`,studentId:b.studentId,studentName:b.studentName,startTime:b.startTime,endTime:b.endTime,kind:"נקבע"})),
    ].sort((a,b)=>a.startTime.localeCompare(b.startTime));

    const futureOneOff=(schedule.bookings||[]).filter(b=>b.status==="booked"&&b.date>=today).map(b=>({id:`b-${b.id}`,studentId:b.studentId,studentName:b.studentName,date:b.date,startTime:b.startTime,endTime:b.endTime,kind:"חד־פעמי"}));
    const futureRecurring=recurring.map(r=>({id:`r-${r.id}`,studentId:r.studentId||"",studentName:r.studentName,date:nextRecurringDate(r.weekday),startTime:r.startTime,endTime:r.endTime,kind:"קבוע"}));
    const future=[...futureOneOff,...futureRecurring].sort((a,b)=>`${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)).slice(0,12);

    const questions=(schedule.activity||[]).filter(a=>a.type==="homework_question"&&a.requiresAction&&!a.resolved);
    const otherActions=(schedule.activity||[]).filter(a=>a.type!=="homework_question"&&a.requiresAction&&!a.resolved);
    const followups=students.flatMap(student=>{
      const open=student.assignments.filter(a=>a.status!=="done").sort((a,b)=>b.createdAt.localeCompare(a.createdAt))[0];
      if(!open)return [];
      const age=daysSince(open.createdAt); if(age<3)return [];
      const hasUpdate=(student.reflections||[]).some(r=>new Date(r.date).getTime()>new Date(open.createdAt).getTime());
      if(hasUpdate)return [];
      const explicit=future.find(x=>x.studentId===student.id);
      return [{student,assignment:open,age,next:explicit}];
    }).sort((a,b)=>b.age-a.age);
    return {today:mergedToday,future,recurring,questions,otherActions,followups};
  },[data]);

  if(error)return <section className="py-12"><Card><p className="font-bold">{error}</p></Card></section>;
  if(!data||!computed)return <p className="py-16 text-center text-muted">טוען את מה שחשוב עכשיו…</p>;

  async function markHandled(activityId:string){
    if(!data)return;
    const next={...data.schedule,activity:(data.schedule.activity||[]).map(a=>a.id===activityId?{...a,read:true,resolved:true}:a)};
    setData({...data,schedule:next});
    const r=await fetch("/api/schedule",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({schedule:next})});
    const fresh=r.ok?r:await fetch("/api/schedule",{cache:"no-store"});
    if(fresh.ok){const result=await fresh.json();setData(current=>current?{...current,schedule:result.schedule}:current)}
    if(!r.ok)alert("הלוח השתנה או שהשמירה נכשלה. נא לנסות שוב.");
  }

  const now=new Date(); const dateTitle=now.toLocaleDateString("he-IL",{weekday:"long",day:"numeric",month:"long"});
  const attentionCount=computed.questions.length+computed.otherActions.length+computed.followups.length;

  return <section className="pb-28">
    <div className="mb-6"><p className="text-sm font-bold text-muted">NEXT · {dateTitle}</p><h1 className="text-4xl font-extrabold mt-1">מה קורה היום?</h1><p className="text-muted mt-2">הלוז שלך ומה שבאמת צריך ממך תשומת לב.</p></div>

    <Card>
      <div className="flex items-end justify-between gap-3"><div><p className="text-xs text-muted font-bold">היום בלוז</p><h2 className="text-2xl font-extrabold mt-1">{computed.today.length ? `${computed.today.length} שיעורים` : "אין שיעורים היום"}</h2></div><Link href="/students/schedule" className="text-sm font-extrabold text-accent">ניהול לוז</Link></div>
      <div className="mt-4 space-y-2">{computed.today.map(item=><Link key={item.id} href={item.studentId?`/students/${item.studentId}`:"/students"} className="block bg-surface-soft rounded-button-sm p-4"><div className="flex items-center justify-between gap-3"><div><b className="text-lg">{item.studentName}</b><p className="text-sm text-muted mt-1">{item.kind}</p></div><span dir="ltr" className="font-extrabold text-lg">{item.startTime}–{item.endTime}</span></div></Link>)}{!computed.today.length&&<p className="text-muted">יום פתוח כרגע 👌</p>}</div>
    </Card>

    {attentionCount>0&&<Card><div className="flex items-center justify-between"><div><p className="text-xs text-[#6f1831] font-extrabold">דורש ממני טיפול</p><h2 className="text-2xl font-extrabold mt-1">{attentionCount} דברים</h2></div><span className="text-3xl">🔔</span></div>
      <div className="space-y-3 mt-4">
        {computed.questions.map(q=><div key={q.id} className="bg-[#f1dde2] rounded-button-sm p-4"><div className="flex justify-between gap-3"><Link href={q.studentId?`/students/${q.studentId}`:"/students/schedule"} className="flex-1"><b>💬 {q.studentName} שאל/ה על שיעורי הבית</b>{q.detail&&<p className="text-sm mt-1">{q.detail}</p>}</Link><button onClick={()=>markHandled(q.id)} className="bg-[#183f32] text-white rounded-full px-3 py-2 text-xs font-extrabold h-fit">טופל</button></div></div>)}
        {computed.otherActions.map(a=><div key={a.id} className="bg-[#f1dde2] rounded-button-sm p-4"><div className="flex justify-between gap-3"><Link href="/students/schedule" className="flex-1"><b>⚠️ {a.title}</b>{a.detail&&<p className="text-sm mt-1">{a.detail}</p>}</Link><button onClick={()=>markHandled(a.id)} className="bg-[#183f32] text-white rounded-full px-3 py-2 text-xs font-extrabold h-fit">טופל</button></div></div>)}
        {computed.followups.map(f=><Link key={f.student.id} href={`/students/${f.student.id}`} className="block bg-[#fff3d8] rounded-button-sm p-4"><b>↗ פולואפ עם {f.student.name}</b><p className="text-sm mt-1">עברו {f.age} ימים מאז “{f.assignment.title}” ועדיין אין עדכון.</p>{f.next&&<p className="text-xs font-bold mt-2">השיעור הבא: {displayDate(f.next.date)} · {f.next.startTime}</p>}</Link>)}
      </div>
    </Card>}

    <div className="grid sm:grid-cols-2 gap-3 mt-4">
      <button onClick={()=>setFutureOpen(v=>!v)} className="bg-text text-white rounded-card p-5 text-right shadow-card"><p className="text-xs text-white/60 font-bold">קדימה</p><p className="text-xl font-extrabold mt-1">שיעורים עתידיים</p><p className="text-sm text-white/70 mt-1">{computed.future.length} הקרובים</p></button>
      <button onClick={()=>setRecurringOpen(v=>!v)} className="bg-[#183f32] text-white rounded-card p-5 text-right shadow-card"><p className="text-xs text-white/60 font-bold">שבוע קבוע</p><p className="text-xl font-extrabold mt-1">שיעורים קבועים</p><p className="text-sm text-white/70 mt-1">{computed.recurring.length} תלמידים</p></button>
    </div>

    {futureOpen&&<Card><div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">השיעורים הבאים</h2><button onClick={()=>setFutureOpen(false)} className="text-sm font-bold text-muted">סגור</button></div><div className="space-y-2 mt-4">{computed.future.map(item=><div key={item.id} className="bg-surface-soft rounded-button-sm p-3 flex justify-between gap-3"><div><b>{item.studentName}</b><p className="text-xs text-muted mt-1">{item.kind}</p></div><div className="text-left"><b>{displayDate(item.date)}</b><p dir="ltr" className="text-sm text-muted">{item.startTime}–{item.endTime}</p></div></div>)}{!computed.future.length&&<p className="text-muted">אין שיעורים עתידיים.</p>}</div></Card>}

    {recurringOpen&&<Card><div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">שיעורים קבועים</h2><Link href="/students/schedule" className="text-sm font-extrabold text-accent">עריכה</Link></div><div className="space-y-2 mt-4">{computed.recurring.sort((a,b)=>a.weekday-b.weekday||a.startTime.localeCompare(b.startTime)).map(r=><div key={r.id} className="bg-surface-soft rounded-button-sm p-3 flex justify-between"><b>{r.studentName}</b><span className="text-sm font-bold">יום {HEBREW_DAYS[r.weekday]} · {r.startTime}</span></div>)}{!computed.recurring.length&&<p className="text-muted">עוד אין שיעורים קבועים.</p>}</div></Card>}

    {attentionCount===0&&<Card><p className="font-extrabold text-lg">הכול בשליטה 👌</p><p className="text-sm text-muted mt-1">אין כרגע שאלה פתוחה או תלמיד שמחכה לפולואפ.</p></Card>}
  </section>;
}
