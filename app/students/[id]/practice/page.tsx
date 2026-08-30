"use client";

import Link from "next/link";
import { useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useNextState } from "@/lib/state/useNextState";
import { generateStudentPractice } from "@/features/students/generateStudentPractice";

const TIMES = [15, 30, 45, 60];

export default function StudentPracticePage({ params }: { params: { id: string } }) {
  const { state, updateStudentDetails, addStudentReflection, setStudentAssignmentStatus } = useNextState();
  const student = state.students.find((item) => item.id === params.id);
  const [minutes, setMinutes] = useState<number | undefined>();
  const [complete, setComplete] = useState(false);
  const [status, setStatus] = useState<"good" | "mixed" | "stuck">("mixed");
  const [worked, setWorked] = useState("");
  const [improve, setImprove] = useState("");
  const [evidence, setEvidence] = useState("");

  if (!student) return null;
  const decision = generateStudentPractice(student, minutes);

  if (decision.type === "question" && decision.field === "duration") {
    return <section><ScreenHeader eyebrow="NEXT Practice" title="כמה זמן יש לך עכשיו?" description={`המטרה: ${student.currentGoal}`} /><Card><div className="grid grid-cols-4 gap-2">{TIMES.map((m) => <button key={m} onClick={() => setMinutes(m)} className="bg-surface-soft rounded-seg py-4 font-extrabold">{m}</button>)}</div></Card></section>;
  }

  if (decision.type === "question" && decision.field === "successDefinition") {
    return <section><ScreenHeader eyebrow="חסר לי דבר אחד" title={decision.question} description="NEXT שואלת במקום לנחש." /><Card><input className="w-full bg-surface-soft rounded-button-sm px-4 py-3" placeholder="למשל: לנגן את השיר בלי לעצור" onBlur={(e) => { if (e.target.value.trim()) updateStudentDetails(student.id, { practiceProfile: { ...student.practiceProfile, successDefinition: e.target.value.trim() } }); }} /><p className="text-sm text-muted mt-3">כתוב תשובה ואז חזור למסך הזה.</p></Card></section>;
  }

  if (decision.type !== "plan") return null;

  if (complete) {
    return <section><ScreenHeader eyebrow="Reflect" title="איך היה?" description="לא יומן. שתי תשובות שמשפרות את האימון הבא." /><Card><div className="grid grid-cols-3 gap-2 mb-4">{([["good","הלך טוב"],["mixed","בערך"],["stuck","נתקעתי"]] as const).map(([value,label]) => <button key={value} onClick={() => setStatus(value)} className={`rounded-seg py-3 font-bold ${status===value?"bg-text text-white":"bg-surface-soft"}`}>{label}</button>)}</div><textarea className="w-full bg-surface-soft rounded-button-sm p-3 mb-3" placeholder="מה עבד?" value={worked} onChange={(e)=>setWorked(e.target.value)} /><textarea className="w-full bg-surface-soft rounded-button-sm p-3 mb-3" placeholder="מה צריך להשתפר בפעם הבאה?" value={improve} onChange={(e)=>setImprove(e.target.value)} /><input className="w-full bg-surface-soft rounded-button-sm px-3 py-3 mb-4" placeholder="קישור להקלטה / Before-After (אופציונלי)" value={evidence} onChange={(e)=>setEvidence(e.target.value)} /><Button onClick={() => { addStudentReflection(student.id,{status,worked,improveNext:improve,evidenceUrl:evidence||undefined}); const open=student.assignments.find((a)=>a.status!=="done"); if(open) setStudentAssignmentStatus(student.id,open.id,status==="stuck"?"stuck":"done"); setComplete(false); }}>שמור Reflection</Button><Link href={`/students/${student.id}`} className="block text-center mt-4 font-bold text-accent">חזרה לתלמיד</Link></Card></section>;
  }

  return <section><ScreenHeader eyebrow="NEXT Practice" title={decision.title} description={`מטרה: ${student.currentGoal}`} /><Card className="bg-text text-white"><p className="text-xs font-extrabold opacity-60">למה זה האימון</p><p className="mt-2 leading-relaxed font-semibold">{decision.reason}</p></Card><Card><div>{decision.items.map((item,i)=><div key={`${item.title}-${i}`} className={`py-4 flex items-start justify-between gap-3 ${i?"border-t border-line":""}`}><div><span className="text-xs text-muted">שלב {i+1}</span><p className="font-extrabold mt-1">{item.title}</p></div><span className="bg-surface-soft rounded-full px-3 py-1 text-sm font-bold">{item.minutes} דק׳</span></div>)}</div><Button className="mt-4" onClick={()=>setComplete(true)}>סיימתי להתאמן</Button></Card></section>;
}
