"use client";

import { useMemo, useState } from "react";
import { Student } from "@/lib/types";
import { generateStudentPractice } from "@/features/students/generateStudentPractice";
import { quoteForToday } from "@/lib/studentQuotes";

const TIMES = [15, 30, 45, 60];

export function StudentPortal({ initialStudent }: { initialStudent: Student }) {
  const [student, setStudent] = useState(initialStudent);
  const [minutes, setMinutes] = useState<number | undefined>();
  const [complete, setComplete] = useState(false);
  const [status, setStatus] = useState<"good" | "mixed" | "stuck">("mixed");
  const [worked, setWorked] = useState("");
  const [improve, setImprove] = useState("");
  const [evidence, setEvidence] = useState("");
  const [saving, setSaving] = useState(false);
  const [tempoSavingId, setTempoSavingId] = useState<string | null>(null);
  const dailyQuote = useMemo(() => quoteForToday(), []);

  const decision = useMemo(() => generateStudentPractice(student, minutes), [student, minutes]);
  const isFemale = student.gender === "female";

  async function updateTempo(assignmentId: string, currentTempo: number) {
    setTempoSavingId(assignmentId);
    const res = await fetch(`/api/student/${student.shareToken}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "updateTempo", assignmentId, currentTempo }),
    });
    setTempoSavingId(null);
    if (!res.ok) return;
    const json = await res.json();
    setStudent(json.student);
  }

  async function saveReflection() {
    setSaving(true);
    const res = await fetch(`/api/student/${student.shareToken}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "completePractice", status, worked, improveNext: improve, evidenceUrl: evidence || undefined }),
    });
    setSaving(false);
    if (!res.ok) return;
    const json = await res.json();
    setStudent(json.student);
    setComplete(false);
    setMinutes(undefined);
    setWorked(""); setImprove(""); setEvidence("");
  }

  if (complete) {
    return <section>
      <p className="text-sm text-muted">סיכום אימון</p>
      <h1 className="text-3xl font-extrabold mt-1">איך היה?</h1>
      <p className="text-muted mt-2">שתי תשובות קצרות כדי שהאימון הבא יהיה טוב יותר.</p>
      <div className="bg-surface rounded-card p-5 shadow-card mt-5">
        <div className="grid grid-cols-3 gap-2 mb-4">{([ ["good","הלך טוב"], ["mixed","בערך"], ["stuck","נתקעתי"] ] as const).map(([v,l]) => <button key={v} onClick={()=>setStatus(v)} className={`rounded-seg py-3 font-bold ${status===v?"bg-text text-white":"bg-surface-soft"}`}>{l}</button>)}</div>
        <textarea className="w-full bg-surface-soft rounded-button-sm p-3 mb-3" placeholder="מה עבד?" value={worked} onChange={e=>setWorked(e.target.value)} />
        <textarea className="w-full bg-surface-soft rounded-button-sm p-3 mb-3" placeholder="מה צריך להשתפר בפעם הבאה?" value={improve} onChange={e=>setImprove(e.target.value)} />
        <input className="w-full bg-surface-soft rounded-button-sm px-3 py-3 mb-4" placeholder="קישור להקלטה (אופציונלי)" value={evidence} onChange={e=>setEvidence(e.target.value)} />
        <button disabled={saving} onClick={saveReflection} className="w-full bg-text text-white rounded-button-sm py-3 font-extrabold disabled:opacity-50">{saving ? "שומר…" : "שמור וסיים"}</button>
      </div>
    </section>;
  }

  if (!minutes) {
    return <section>
      <p className="text-sm text-muted">NEXT / תופים</p>
      <h1 className="text-3xl font-extrabold mt-1">היי {student.name} 👋</h1>
      <div className="bg-text text-white rounded-hero p-6 mt-5">
        <p className="text-white/60 text-xs font-bold">הציטוט של היום</p>
        <p dir="ltr" className="text-2xl md:text-3xl font-extrabold mt-3 leading-relaxed text-left">“{dailyQuote.quote}”</p>
        <p dir="rtl" className="text-sm md:text-base text-white/70 mt-3 leading-relaxed">{dailyQuote.translation}</p>
        <a href={dailyQuote.wikipedia} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm font-bold text-white/70 hover:text-white underline underline-offset-4">{dailyQuote.musician} · ויקיפדיה ↗</a>
      </div>
      {student.allowGeneratedPractice && <>
        <h2 className="text-2xl font-extrabold mt-7">רוצה לבנות אימון עכשיו?</h2>
        <p className="text-sm text-muted mt-1">המורה שלך הפעיל עבורך בניית אימון אוטומטית.</p>
        <div className="grid grid-cols-4 gap-2 mt-3">{TIMES.map(m => <button key={m} onClick={()=>setMinutes(m)} className="bg-surface rounded-seg py-4 font-extrabold shadow-card">{m} דק׳</button>)}</div>
      </>}
      <div className="mt-8">
        <h2 className="text-xl font-extrabold">שיעורי הבית שלי</h2>
        <div className="mt-3 space-y-3">
          {student.assignments.filter(a => a.status !== "done").map(a => <div key={a.id} className="bg-surface rounded-button-sm p-4 shadow-card">
            <p className="font-extrabold">{a.title}</p>
            {a.instructions && <p className="text-sm text-muted mt-1">{a.instructions}</p>}
            {a.practiceMinutes && <p className="text-sm font-bold mt-3">⏱ לתרגל {a.practiceMinutes} דקות</p>}
            {a.startTempo && <div className="mt-3 bg-surface-soft rounded-button-sm p-3">
              <p className="text-xs text-muted font-bold">טמפו</p>
              <div className="flex items-center justify-between gap-3 mt-1"><span className="font-bold">התחלה: {a.startTempo} BPM</span><span className="text-muted">→</span><label className="flex items-center gap-2"><span className="text-sm font-bold">אני עכשיו</span><input type="number" min="1" max="400" defaultValue={a.currentTempo || a.startTempo} onBlur={(e)=>{const value=Number(e.target.value); if(value && value !== (a.currentTempo || a.startTempo)) updateTempo(a.id,value);}} className="w-20 bg-surface rounded-button-sm px-2 py-2 font-extrabold text-center" /><span className="text-sm font-bold">BPM</span></label></div>
              {tempoSavingId===a.id && <p className="text-xs text-muted mt-2">שומר טמפו…</p>}
            </div>}
            {a.resources?.map(r => <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="block text-accent font-bold mt-3">🔗 {r.label || "פתח קישור"}</a>)}
            {a.attachment && <a href={`/api/student/${student.shareToken}/attachment/${a.id}`} target="_blank" rel="noopener noreferrer" className="block text-accent font-bold mt-3">📎 צפה בתווים</a>}
          </div>)}
          {!student.assignments.some(a => a.status !== "done") && <p className="text-muted">אין כרגע שיעורי בית פתוחים.</p>}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-extrabold">הישגים</h2>
        <div className="mt-3 space-y-2">{student.wins.slice(0,4).map(w => <div key={w.id} className="bg-surface rounded-button-sm p-3 shadow-card">🏆 <b>{w.title}</b></div>)}{student.wins.length===0 && <p className="text-muted">כאן יופיעו הוכחות אמיתיות להתקדמות.</p>}</div>
      </div>
    </section>;
  }

  if (decision.type === "question") {
    return <section><p className="text-sm text-muted">חסר משהו אחד</p><h1 className="text-3xl font-extrabold mt-1">{decision.question}</h1><p className="text-muted mt-3">{isFemale ? "בקשי" : "בקש"} מהמורה להשלים את הפרט הזה לפני האימון הבא.</p><button onClick={()=>setMinutes(undefined)} className="mt-5 font-bold text-accent">חזרה</button></section>;
  }

  return <section>
    <p className="text-sm text-muted">האימון שלי</p>
    <h1 className="text-3xl font-extrabold mt-1">{decision.title}</h1>
    <div className="bg-text text-white rounded-hero p-6 mt-5"><p className="text-xs font-bold opacity-60">למה זה האימון</p><p className="mt-2 font-semibold leading-relaxed">{decision.reason}</p></div>
    <div className="bg-surface rounded-card p-5 shadow-card mt-5">{decision.items.map((item,i)=><div key={`${item.title}-${i}`} className={`py-4 flex justify-between gap-3 ${i?"border-t border-line":""}`}><div><span className="text-xs text-muted">שלב {i+1}</span><p className="font-extrabold mt-1">{item.title}</p></div><span className="bg-surface-soft rounded-full px-3 py-1 h-fit text-sm font-bold">{item.minutes} דק׳</span></div>)}</div>
    <button onClick={()=>setComplete(true)} className="w-full bg-text text-white rounded-button-sm py-4 font-extrabold mt-5">סיימתי להתאמן</button>
  </section>;
}
