"use client";

import Link from "next/link";
import { WeeklyAvailabilityEditor } from "@/features/students/WeeklyAvailabilityEditor";
import { useEffect,useMemo,useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { LessonSchedule,Student } from "@/lib/types";
import { HEBREW_DAYS,addMinutes } from "@/lib/scheduling";

type CalendarInfo={connected:boolean;calendars:{id:string;name:string;primary:boolean}[];colors:{id:string;background:string;foreground:string}[];settings?:LessonSchedule["googleCalendar"]};
function displayDate(v:string){const[y,m,d]=v.split("-");return `${d}.${m}.${y}`}

export default function SchedulePage(){
  const[schedule,setSchedule]=useState<LessonSchedule|null>(null);
  const[students,setStudents]=useState<Student[]>([]);
  const[saving,setSaving]=useState(false);
  const[google,setGoogle]=useState<CalendarInfo|null>(null);
  const[settingsOpen,setSettingsOpen]=useState(false);
  const[recurringOpen,setRecurringOpen]=useState(false);
  const[upcomingOpen,setUpcomingOpen]=useState(false);
  const[newStudentId,setNewStudentId]=useState("");
  const[newWeekday,setNewWeekday]=useState(0);
  const[newTime,setNewTime]=useState("15:00");

  async function load(){const r=await fetch("/api/schedule",{cache:"no-store"});if(r.ok)setSchedule((await r.json()).schedule)}
  async function loadStudents(){const r=await fetch("/api/students",{cache:"no-store"});if(r.ok)setStudents((await r.json()).students||[])}
  async function loadGoogle(){const r=await fetch("/api/google-calendar/settings",{cache:"no-store"});if(r.ok)setGoogle(await r.json())}
  useEffect(()=>{load();loadStudents();loadGoogle()},[]);
  async function save(next:LessonSchedule){setSchedule(next);setSaving(true);try{const r=await fetch("/api/schedule",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({schedule:next})});if(r.ok)setSchedule((await r.json()).schedule);else{await load();alert("הלוח השתנה או שהשמירה נכשלה. נא לנסות שוב.")}}finally{setSaving(false)}}
  async function saveGoogle(patch:Partial<LessonSchedule["googleCalendar"]>){if(!schedule)return;const next={...schedule,googleCalendar:{...schedule.googleCalendar,...patch}};setSchedule(next);await fetch("/api/google-calendar/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(patch)});await loadGoogle()}
  async function markActivity(id:string,resolved=false){if(!schedule)return;const activity=schedule.activity.map(a=>a.id===id?{...a,read:true,resolved:resolved||a.resolved}:a);const next={...schedule,activity};if(resolved){const item=activity.find(a=>a.id===id);if(item?.relatedId)next.requests=next.requests.map(r=>r.id===item.relatedId?{...r,status:"approved" as const}:r)}await save(next)}
  async function cancelBooking(id:string){if(!confirm("לבטל את השיעור? האירוע יימחק גם מ-Google Calendar."))return;const r=await fetch("/api/schedule",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"cancel_booking",bookingId:id})});if(r.ok)setSchedule((await r.json()).schedule)}
  async function addRecurring(){if(!schedule||!newStudentId)return;const student=students.find(s=>s.id===newStudentId);if(!student)return;const item={id:crypto.randomUUID(),studentId:student.id,studentName:student.name,weekday:newWeekday as 0|1|2|3|4|5|6,startTime:newTime,endTime:addMinutes(newTime,schedule.lessonMinutes),active:true,createdAt:new Date().toISOString()};await save({...schedule,recurringLessons:[...(schedule.recurringLessons||[]),item]});setNewStudentId("")}
  async function removeRecurring(id:string){if(!schedule)return;await save({...schedule,recurringLessons:(schedule.recurringLessons||[]).filter(r=>r.id!==id)})}

  const pending=schedule?.activity?.filter(a=>a.requiresAction&&!a.resolved)||[];
  const unread=schedule?.activity?.filter(a=>!a.read).length||0;
  const upcoming=useMemo(()=>{const now=new Date().toISOString().slice(0,10);return(schedule?.bookings||[]).filter(b=>b.status==="booked"&&b.date>=now).sort((a,b)=>`${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))},[schedule]);
  if(!schedule)return <p className="py-16 text-center text-muted">טוען לוז…</p>;

  return <section>
    <Link href="/students" className="text-sm font-bold text-muted">→ חזרה לתלמידים</Link>
    <ScreenHeader eyebrow="לוז" title="ניהול שיעורים" description="NEXT מטפל בקביעות; היומן עצמו נשאר ב-Google Calendar."/>

    <WeeklyAvailabilityEditor schedule={schedule} onSaved={setSchedule}/>

    <Card><div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-extrabold">🔔 דורש ממני טיפול {pending.length?`(${pending.length})`:""}</h2><p className="text-sm text-muted mt-1">{unread} פעילויות חדשות בסך הכול</p></div></div><div className="space-y-3 mt-4">{pending.map(a=><div key={a.id} className="bg-[#f1dde2] rounded-button-sm p-4"><div className="flex justify-between gap-3"><div><b>{a.title}</b>{a.detail&&<p className="text-sm mt-1">{a.detail}</p>}</div><button onClick={()=>markActivity(a.id,true)} className="bg-[#183f32] text-white rounded-full px-3 py-2 text-xs font-extrabold h-fit">טופל</button></div></div>)}{!pending.length&&<p className="text-muted">אין משהו שמחכה לטיפול שלך 👌</p>}</div></Card>

    <Card><h2 className="text-xl font-extrabold">פעילות אחרונה</h2><div className="mt-4 space-y-2">{(schedule.activity||[]).slice(0,8).map(a=><button key={a.id} onClick={()=>markActivity(a.id)} className={`w-full text-right rounded-button-sm p-3 ${a.read?"bg-surface-soft":"bg-[#dfece5]"}`}><div className="flex justify-between gap-3"><div><b>{a.title}</b>{a.detail&&<p className="text-sm text-muted mt-1">{a.detail}</p>}</div>{!a.read&&<span className="w-2.5 h-2.5 rounded-full bg-[#6f1831] mt-1"/>}</div></button>)}{!schedule.activity?.length&&<p className="text-muted">עוד אין פעילות חדשה.</p>}</div></Card>

    <button onClick={()=>setRecurringOpen(v=>!v)} className="w-full bg-[#183f32] text-white rounded-button-sm py-4 font-extrabold mt-5">{recurringOpen?"סגור שיעורים קבועים":"🥁 שיעורים קבועים"}</button>
    {recurringOpen&&<Card><h2 className="text-xl font-extrabold">השיעורים הקבועים שלי</h2><p className="text-sm text-muted mt-1">שיעורים שחוזרים כל שבוע. הזמנים האלה גם נחסמים אוטומטית מהאפשרויות שתלמידים אחרים מקבלים.</p><div className="space-y-2 mt-4">{(schedule.recurringLessons||[]).sort((a,b)=>a.weekday-b.weekday||a.startTime.localeCompare(b.startTime)).map(r=><div key={r.id} className="bg-surface-soft rounded-button-sm p-4 flex items-center justify-between gap-3"><div><b>{r.studentName}</b><p className="text-sm text-muted">יום {HEBREW_DAYS[r.weekday]} · {r.startTime}–{r.endTime}</p></div><button onClick={()=>removeRecurring(r.id)} className="text-[#6f1831] text-sm font-extrabold">הסר</button></div>)}{!schedule.recurringLessons?.length&&<p className="text-muted">עוד אין שיעורים קבועים.</p>}</div><div className="grid sm:grid-cols-[1.5fr_1fr_1fr_auto] gap-2 mt-5"><select value={newStudentId} onChange={e=>setNewStudentId(e.target.value)} className="bg-surface-soft rounded-button-sm p-3"><option value="">בחר תלמיד</option>{students.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select><select value={newWeekday} onChange={e=>setNewWeekday(Number(e.target.value))} className="bg-surface-soft rounded-button-sm p-3">{[0,1,2,3,4,5,6].map(d=><option key={d} value={d}>יום {HEBREW_DAYS[d]}</option>)}</select><input type="time" value={newTime} onChange={e=>setNewTime(e.target.value)} className="bg-surface-soft rounded-button-sm p-3"/><button disabled={!newStudentId} onClick={addRecurring} className="bg-text text-white rounded-button-sm px-5 py-3 font-extrabold disabled:opacity-40">הוסף</button></div>{saving&&<p className="text-xs text-muted mt-3">שומר…</p>}</Card>}

    <button onClick={()=>setUpcomingOpen(v=>!v)} className="w-full bg-surface-soft rounded-button-sm py-4 font-extrabold mt-3">{upcomingOpen?"סגור שיעורים קרובים":`שיעורים שנקבעו (${upcoming.length})`}</button>
    {upcomingOpen&&<Card><div className="space-y-2">{upcoming.map(b=><div key={b.id} className="bg-surface-soft rounded-button-sm p-4 flex justify-between gap-3"><div><b>{b.studentName}</b><p className="text-sm text-muted">{displayDate(b.date)} · {b.startTime}–{b.endTime}</p></div><button onClick={()=>cancelBooking(b.id)} className="text-[#6f1831] font-extrabold text-sm">ביטול שיעור</button></div>)}{!upcoming.length&&<p className="text-muted">אין שיעורים עתידיים שנקבעו דרך NEXT.</p>}</div></Card>}

    <button onClick={()=>setSettingsOpen(v=>!v)} className="w-full bg-text text-white rounded-button-sm py-4 font-extrabold mt-5">{settingsOpen?"סגור הגדרות":"⚙️ הגדרות קביעת שיעור"}</button>
    {settingsOpen&&<div className="space-y-4 mt-4"><Card><h2 className="text-xl font-extrabold">ברירת מחדל לקביעת שיעור</h2><div className="grid sm:grid-cols-4 gap-3 mt-4"><label className="text-sm font-bold">אורך שיעור<input type="number" min="15" max="180" value={schedule.lessonMinutes} onChange={e=>setSchedule({...schedule,lessonMinutes:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label><label className="text-sm font-bold">קפיצות בדקות<input type="number" min="5" max="60" step="5" value={schedule.slotIntervalMinutes} onChange={e=>setSchedule({...schedule,slotIntervalMinutes:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label><label className="text-sm font-bold">אפשרויות לתלמיד<input type="number" min="1" max="6" value={schedule.offersPerDay} onChange={e=>setSchedule({...schedule,offersPerDay:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label><label className="text-sm font-bold">כמה ימים קדימה<input type="number" min="7" max="60" value={schedule.advanceDays} onChange={e=>setSchedule({...schedule,advanceDays:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label></div></Card><Card><h2 className="text-xl font-extrabold">Google Calendar</h2>{google?.connected?<><p className="text-sm text-[#183f32] font-bold mt-2">✓ מחובר</p><div className="grid sm:grid-cols-2 gap-3 mt-4"><label className="text-sm font-bold">לאיזה לוח שנה<select value={schedule.googleCalendar.calendarId} onChange={e=>saveGoogle({calendarId:e.target.value,calendarName:google.calendars.find(c=>c.id===e.target.value)?.name})} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1">{google.calendars.map(c=><option key={c.id} value={c.id}>{c.name}{c.primary?" (ראשי)":""}</option>)}</select></label><label className="text-sm font-bold">שם האירוע<input value={schedule.googleCalendar.eventTitleTemplate} onChange={e=>setSchedule({...schedule,googleCalendar:{...schedule.googleCalendar,eventTitleTemplate:e.target.value}})} onBlur={()=>saveGoogle({eventTitleTemplate:schedule.googleCalendar.eventTitleTemplate})} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/><span className="text-xs text-muted">השתמש ב־{"{student}"} לשם התלמיד</span></label></div><div className="mt-4"><p className="text-sm font-bold mb-2">צבע השיעורים בגוגל</p><div className="flex flex-wrap gap-2">{google.colors.map(c=><button key={c.id} aria-label={`צבע ${c.id}`} onClick={()=>saveGoogle({eventColorId:c.id})} className={`w-9 h-9 rounded-full border-4 ${schedule.googleCalendar.eventColorId===c.id?"border-text":"border-transparent"}`} style={{background:c.background}}/>)}</div></div></>:<><p className="text-sm text-muted mt-2">חבר את חשבון Google שלך כדי ששיעורים חדשים ייכנסו אוטומטית ליומן.</p><a href="/api/google-calendar/connect" className="inline-block bg-[#183f32] text-white rounded-button-sm px-5 py-3 font-extrabold mt-4">חבר Google Calendar</a></>}</Card></div>}
  </section>
}
