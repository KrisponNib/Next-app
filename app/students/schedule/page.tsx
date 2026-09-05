"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { LessonBooking, LessonSchedule } from "@/lib/types";
import { startOfWeek } from "@/lib/scheduling";

const DAY_NAMES:Record<number,string>={0:"ראשון",1:"שני",2:"שלישי",3:"רביעי",4:"חמישי"};
const pad=(n:number)=>String(n).padStart(2,"0");
const dateKey=(d:Date)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const min=(t:string)=>{const[h,m]=t.split(":").map(Number);return h*60+m};
function displayDate(v:string){const[y,m,d]=v.split("-");return `${d}.${m}.${y}`}

type CalendarInfo={connected:boolean;calendars:{id:string;name:string;primary:boolean}[];colors:{id:string;background:string;foreground:string}[];settings?:LessonSchedule["googleCalendar"]};

export default function SchedulePage(){
  const[schedule,setSchedule]=useState<LessonSchedule|null>(null);
  const[saving,setSaving]=useState(false);
  const[weekOffset,setWeekOffset]=useState(0);
  const[google,setGoogle]=useState<CalendarInfo|null>(null);
  const[settingsOpen,setSettingsOpen]=useState(false);

  async function load(){const r=await fetch("/api/schedule",{cache:"no-store"});if(r.ok)setSchedule((await r.json()).schedule)}
  async function loadGoogle(){const r=await fetch("/api/google-calendar/settings",{cache:"no-store"});if(r.ok)setGoogle(await r.json())}
  useEffect(()=>{load();loadGoogle()},[]);
  async function save(next:LessonSchedule){setSchedule(next);setSaving(true);await fetch("/api/schedule",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({schedule:next})});setSaving(false)}
  async function saveGoogle(patch:Partial<LessonSchedule["googleCalendar"]>){if(!schedule)return;const next={...schedule,googleCalendar:{...schedule.googleCalendar,...patch}};setSchedule(next);await fetch("/api/google-calendar/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(patch)});await loadGoogle()}

  const week=useMemo(()=>{const start=startOfWeek(new Date());start.setDate(start.getDate()+weekOffset*7);return Array.from({length:5},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return d})},[weekOffset]);
  const pending=schedule?.activity?.filter(a=>a.requiresAction&&!a.resolved) || [];
  const unread=schedule?.activity?.filter(a=>!a.read).length || 0;

  if(!schedule)return <p className="py-16 text-center text-muted">טוען לוז…</p>;

  async function markActivity(id:string,resolved=false){
    if(!schedule)return;
    const activity=schedule.activity.map(a=>a.id===id?{...a,read:true,resolved:resolved||a.resolved}:a);
    const next={...schedule,activity};
    if(resolved){
      const item=activity.find(a=>a.id===id);
      if(item?.relatedId){
        next.requests=next.requests.map(r=>r.id===item.relatedId?{...r,status:"approved" as const}:r)
      }
    }
    await save(next)
  }

  const calendarStart=9*60, calendarEnd=20*60, total=calendarEnd-calendarStart;
  const hours=Array.from({length:12},(_,i)=>9+i);

  return <section>
    <Link href="/students" className="text-sm font-bold text-muted">→ חזרה לתלמידים</Link>
    <ScreenHeader eyebrow="לוז" title="השבוע שלי" description="שיעורים, בקשות והגדרות הקביעה במקום אחד."/>

    <Card>
      <div className="flex items-center justify-between gap-3">
        <div><h2 className="text-xl font-extrabold">🔔 דורש ממני טיפול {pending.length?`(${pending.length})`:""}</h2><p className="text-sm text-muted mt-1">{unread} פעילויות חדשות בסך הכול</p></div>
      </div>
      <div className="space-y-3 mt-4">{pending.map(a=><div key={a.id} className="bg-[#f1dde2] rounded-button-sm p-4"><div className="flex justify-between gap-3"><div><b>{a.title}</b>{a.detail&&<p className="text-sm mt-1">{a.detail}</p>}</div><button onClick={()=>markActivity(a.id,true)} className="bg-[#183f32] text-white rounded-full px-3 py-2 text-xs font-extrabold h-fit">טופל</button></div></div>)}{!pending.length&&<p className="text-muted">אין משהו שמחכה לטיפול שלך 👌</p>}</div>
    </Card>

    <Card>
      <h2 className="text-xl font-extrabold">פעילות אחרונה</h2>
      <div className="mt-4 space-y-2">{(schedule.activity||[]).slice(0,8).map(a=><button key={a.id} onClick={()=>markActivity(a.id)} className={`w-full text-right rounded-button-sm p-3 ${a.read?"bg-surface-soft":"bg-[#dfece5]"}`}><div className="flex justify-between gap-3"><div><b>{a.title}</b>{a.detail&&<p className="text-sm text-muted mt-1">{a.detail}</p>}</div>{!a.read&&<span className="w-2.5 h-2.5 rounded-full bg-[#6f1831] mt-1"/>}</div></button>)}{!schedule.activity?.length&&<p className="text-muted">עוד אין פעילות חדשה.</p>}</div>
    </Card>

    <Card>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4"><div><h2 className="text-xl font-extrabold">לוח שנה שבועי</h2><p className="text-sm text-muted">שיעורים שנקבעו דרך NEXT</p></div><div className="flex gap-2"><button onClick={()=>setWeekOffset(v=>v-1)} className="bg-surface-soft rounded-full px-3 py-2 font-bold">→</button><button onClick={()=>setWeekOffset(0)} className="bg-surface-soft rounded-full px-3 py-2 font-bold">השבוע</button><button onClick={()=>setWeekOffset(v=>v+1)} className="bg-surface-soft rounded-full px-3 py-2 font-bold">←</button></div></div>
      <div className="overflow-x-auto pb-2"><div className="min-w-[850px] grid grid-cols-[64px_repeat(5,1fr)] border border-line rounded-card overflow-hidden">
        <div className="bg-surface-soft border-l border-line"/>{week.map((d,i)=><div key={i} className="bg-surface-soft p-3 border-l border-line text-center"><b>יום {DAY_NAMES[i]}</b><p className="text-xs text-muted">{d.getDate()}.{d.getMonth()+1}</p></div>)}
        <div className="relative" style={{height:660}}>{hours.map((h,i)=><div key={h} className="absolute w-full text-xs text-muted text-center" style={{top:i*60-7}}>{pad(h)}:00</div>)}</div>
        {week.map((d,i)=><div key={i} className="relative border-r border-line" style={{height:660,backgroundImage:"linear-gradient(to bottom, rgba(0,0,0,.07) 1px, transparent 1px)",backgroundSize:"100% 60px"}}>{schedule.bookings.filter(b=>b.status==="booked"&&b.date===dateKey(d)).map((b:LessonBooking)=>{const top=(min(b.startTime)-calendarStart)/total*660;const height=Math.max(32,(min(b.endTime)-min(b.startTime))/total*660);return <Link href={`/students/${b.studentId}`} key={b.id} className="absolute left-2 right-2 bg-[#183f32] text-white rounded-lg px-2 py-2 shadow-card overflow-hidden" style={{top,height}}><p className="font-extrabold text-sm">{b.studentName}</p><p className="text-xs text-white/70">{b.startTime}–{b.endTime}</p>{b.googleSyncStatus==="synced"&&<span className="text-[10px]">Google ✓</span>}</Link>})}</div>)}
      </div></div>
    </Card>

    <button onClick={()=>setSettingsOpen(v=>!v)} className="w-full bg-text text-white rounded-button-sm py-4 font-extrabold mt-5">{settingsOpen?"סגור הגדרות":"⚙️ הגדרות קביעת שיעור"}</button>
    {settingsOpen&&<div className="space-y-4 mt-4">
      <Card><h2 className="text-xl font-extrabold">ברירת מחדל לקביעת שיעור</h2><div className="grid sm:grid-cols-4 gap-3 mt-4"><label className="text-sm font-bold">אורך שיעור<input type="number" min="15" max="180" value={schedule.lessonMinutes} onChange={e=>setSchedule({...schedule,lessonMinutes:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label><label className="text-sm font-bold">קפיצות בדקות<input type="number" min="5" max="60" step="5" value={schedule.slotIntervalMinutes} onChange={e=>setSchedule({...schedule,slotIntervalMinutes:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label><label className="text-sm font-bold">אפשרויות לתלמיד<input type="number" min="1" max="6" value={schedule.offersPerDay} onChange={e=>setSchedule({...schedule,offersPerDay:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label><label className="text-sm font-bold">כמה ימים קדימה<input type="number" min="7" max="60" value={schedule.advanceDays} onChange={e=>setSchedule({...schedule,advanceDays:Number(e.target.value)})} onBlur={()=>save(schedule)} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/></label></div>
      <div className="grid sm:grid-cols-3 gap-3 mt-4">{schedule.availability.map((w,i)=><div key={w.weekday} className="bg-surface-soft rounded-button-sm p-3"><div className="flex justify-between"><b>יום {DAY_NAMES[w.weekday]||w.weekday}</b><button onClick={()=>{const a=[...schedule.availability];a[i]={...w,enabled:!w.enabled};save({...schedule,availability:a})}} className="text-xs font-extrabold">{w.enabled?"פתוח":"סגור"}</button></div><div className="grid grid-cols-2 gap-2 mt-3"><input type="time" value={w.start} onChange={e=>{const a=[...schedule.availability];a[i]={...w,start:e.target.value};setSchedule({...schedule,availability:a})}} onBlur={()=>save(schedule)} className="bg-white rounded-button-sm p-2"/><input type="time" value={w.end} onChange={e=>{const a=[...schedule.availability];a[i]={...w,end:e.target.value};setSchedule({...schedule,availability:a})}} onBlur={()=>save(schedule)} className="bg-white rounded-button-sm p-2"/></div></div>)}</div>{saving&&<p className="text-xs text-muted mt-3">שומר…</p>}</Card>

      <Card><h2 className="text-xl font-extrabold">Google Calendar</h2>{google?.connected?<><p className="text-sm text-[#183f32] font-bold mt-2">✓ מחובר</p><div className="grid sm:grid-cols-2 gap-3 mt-4"><label className="text-sm font-bold">לאיזה לוח שנה<select value={schedule.googleCalendar.calendarId} onChange={e=>saveGoogle({calendarId:e.target.value,calendarName:google.calendars.find(c=>c.id===e.target.value)?.name})} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1">{google.calendars.map(c=><option key={c.id} value={c.id}>{c.name}{c.primary?" (ראשי)":""}</option>)}</select></label><label className="text-sm font-bold">שם האירוע<input value={schedule.googleCalendar.eventTitleTemplate} onChange={e=>setSchedule({...schedule,googleCalendar:{...schedule.googleCalendar,eventTitleTemplate:e.target.value}})} onBlur={()=>saveGoogle({eventTitleTemplate:schedule.googleCalendar.eventTitleTemplate})} className="block w-full bg-surface-soft rounded-button-sm p-3 mt-1"/><span className="text-xs text-muted">השתמש ב־{"{student}"} לשם התלמיד</span></label></div><div className="mt-4"><p className="text-sm font-bold mb-2">צבע השיעורים בגוגל</p><div className="flex flex-wrap gap-2">{google.colors.map(c=><button key={c.id} aria-label={`צבע ${c.id}`} onClick={()=>saveGoogle({eventColorId:c.id})} className={`w-9 h-9 rounded-full border-4 ${schedule.googleCalendar.eventColorId===c.id?"border-text":"border-transparent"}`} style={{background:c.background}}/>)}</div></div></>:<><p className="text-sm text-muted mt-2">חבר את חשבון Google שלך כדי ששיעורים חדשים ייכנסו אוטומטית ליומן.</p><a href="/api/google-calendar/connect" className="inline-block bg-[#183f32] text-white rounded-button-sm px-5 py-3 font-extrabold mt-4">חבר Google Calendar</a></>}</Card>
    </div>}
  </section>
}
