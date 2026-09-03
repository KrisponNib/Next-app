"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNextState } from "@/lib/state/useNextState";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function StudentPage({ params }: { params: { id: string } }) {
  const { state, updateStudentDetails, closeStudentLesson, addStudentWin } = useNextState();
  const student = state.students.find((item) => item.id === params.id);
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [success, setSuccess] = useState("");
  const [workedOn, setWorkedOn] = useState("");
  const [wentWell, setWentWell] = useState("");
  const [mainFocus, setMainFocus] = useState("");
  const [assignment, setAssignment] = useState("");
  const [instructions, setInstructions] = useState("");
  const [links, setLinks] = useState<{ id: string; label: string; url: string }[]>([]);
  const [attachment, setAttachment] = useState<{ name: string; type: string; dataUrl: string } | undefined>();
  const [winTitle, setWinTitle] = useState("");

  useEffect(() => {
    if (!student) return;
    setGoal(student.currentGoal);
    setDuration(student.practiceProfile.defaultDurationMinutes?.toString() || "");
    setSuccess(student.practiceProfile.successDefinition || "");
  }, [student?.id]);

  if (!student) return <section><ScreenHeader eyebrow="תלמידים" title="תלמיד לא נמצא" /><Link href="/students" className="font-bold text-accent">חזרה לתלמידים</Link></section>;

  function saveProfile() {
    updateStudentDetails(student!.id, {
      currentGoal: goal.trim() || student!.currentGoal,
      practiceProfile: {
        ...student!.practiceProfile,
        defaultDurationMinutes: Number(duration) || undefined,
        successDefinition: success.trim() || undefined,
      },
    });
  }

  function addLink() { setLinks((x) => [...x, { id: crypto.randomUUID(), label: "", url: "" }]); }
  function updateLink(id: string, field: "label" | "url", value: string) { setLinks((x) => x.map((l) => l.id === id ? { ...l, [field]: value } : l)); }
  function removeLink(id: string) { setLinks((x) => x.filter((l) => l.id !== id)); }

  function readAttachment(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2_500_000) { alert("הקובץ גדול מדי. כרגע אפשר לצרף קובץ עד 2.5MB."); e.target.value = ""; return; }
    const reader = new FileReader();
    reader.onload = () => setAttachment({ name: file.name, type: file.type || "application/octet-stream", dataUrl: String(reader.result) });
    reader.readAsDataURL(file);
  }

  function closeLesson(event: FormEvent) {
    event.preventDefault();
    if (!workedOn.trim()) return;
    closeStudentLesson(student!.id, {
      workedOn, wentWell, mainFocus,
      assignments: assignment.trim() ? [{ title: assignment, instructions, resources: links.filter((l) => l.url.trim()), attachment }] : [],
    });
    setWorkedOn(""); setWentWell(""); setMainFocus(""); setAssignment(""); setInstructions(""); setLinks([]); setAttachment(undefined);
  }

  return <section>
    <ScreenHeader eyebrow="ניהול תלמיד" title={student.name} description="כל מה שצריך כדי להחליט מה הצעד הבא של התלמיד." />

    <Card>
      <h2 className="font-extrabold text-lg">מטרה ואופן התרגול</h2>
      <p className="text-sm text-muted mt-1">אפשר לחזור לכאן ולערוך את הפרטים בכל שלב. הנתונים האלה משפיעים ישירות על האימון ש־NEXT בונה.</p>
      <label className="block mt-4 text-sm font-bold">המטרה הנוכחית</label>
      <input className="w-full mt-2 bg-surface-soft rounded-button-sm px-3 py-3 font-bold" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="למשל: לנגן את השיר מהתחלה עד הסוף בקצב המקורי" />
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <div><label className="text-sm font-bold">כמה דקות הוא בדרך כלל מתרגל?</label><p className="text-xs text-muted mt-1 mb-2">עוזר ל־NEXT לבנות אימון באורך מציאותי גם בלי לשאול בכל פעם.</p><input type="number" min="5" className="w-full bg-surface-soft rounded-button-sm px-3 py-3" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="למשל 30" /></div>
        <div><label className="text-sm font-bold">איך נדע שהמטרה הושגה?</label><p className="text-xs text-muted mt-1 mb-2">הגדרה ברורה של הצלחה מונעת אימונים כלליים מדי.</p><input className="w-full bg-surface-soft rounded-button-sm px-3 py-3" value={success} onChange={(e) => setSuccess(e.target.value)} placeholder="למשל: לנגן פעמיים ברצף בלי לעצור" /></div>
      </div>
      <Button className="mt-4" onClick={saveProfile}>שמור שינויים</Button>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/students/${student.id}/practice`} className="bg-text text-white rounded-button-sm py-3 px-4 text-center font-extrabold">בנה אימון עכשיו</Link>
        {student.shareToken ? <Link href={`/student/${student.shareToken}`} target="_blank" className="bg-surface-soft rounded-button-sm py-3 px-4 text-center font-bold">פתח את מסך התלמיד ↗</Link> : <span className="bg-surface-soft rounded-button-sm py-3 px-4 text-center font-bold text-muted">מסנכרן לינק…</span>}
      </div>
    </Card>

    <Card>
      <h2 className="font-extrabold text-lg">סגירת שיעור ושיעורי בית</h2>
      <form onSubmit={closeLesson} className="space-y-3 mt-3">
        <textarea className="w-full bg-surface-soft rounded-button-sm p-3" placeholder="על מה עבדנו בשיעור?" value={workedOn} onChange={(e) => setWorkedOn(e.target.value)} />
        <textarea className="w-full bg-surface-soft rounded-button-sm p-3" placeholder="מה הלך טוב?" value={wentWell} onChange={(e) => setWentWell(e.target.value)} />
        <textarea className="w-full bg-surface-soft rounded-button-sm p-3" placeholder="מה הדבר הכי חשוב לשפר עד השיעור הבא?" value={mainFocus} onChange={(e) => setMainFocus(e.target.value)} />
        <div className="border-t border-line pt-4"><p className="font-extrabold">משימה לתרגול בבית</p></div>
        <input className="w-full bg-surface-soft rounded-button-sm px-3 py-3" placeholder="שם המשימה" value={assignment} onChange={(e) => setAssignment(e.target.value)} />
        <textarea className="w-full bg-surface-soft rounded-button-sm p-3" placeholder="הוראות: איך בדיוק לתרגל אותה?" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <div className="bg-surface-soft rounded-button-sm p-3"><div className="flex justify-between items-center"><div><p className="font-bold">קישורים לשירים / סרטונים</p><p className="text-xs text-muted">אפשר להוסיף כמה קישורים שצריך.</p></div><button type="button" onClick={addLink} className="font-bold text-accent">+ הוסף קישור</button></div>{links.map((link) => <div key={link.id} className="grid grid-cols-[1fr_2fr_auto] gap-2 mt-2"><input className="bg-surface rounded-button-sm px-3 py-2" placeholder="שם, למשל: השיר" value={link.label} onChange={(e) => updateLink(link.id,"label",e.target.value)} /><input className="bg-surface rounded-button-sm px-3 py-2" placeholder="https://..." value={link.url} onChange={(e) => updateLink(link.id,"url",e.target.value)} /><button type="button" onClick={() => removeLink(link.id)} className="px-2">✕</button></div>)}</div>
        <div className="bg-surface-soft rounded-button-sm p-3"><p className="font-bold">תווים / דף תרגיל</p><p className="text-xs text-muted mt-1">צרף PDF או תמונה שכתבת לתלמיד. כרגע עד 2.5MB.</p><input type="file" accept="image/*,.pdf,application/pdf" onChange={readAttachment} className="mt-3 text-sm" />{attachment && <div className="mt-2 flex justify-between"><span className="text-sm font-bold">📎 {attachment.name}</span><button type="button" onClick={() => setAttachment(undefined)} className="text-sm text-accent">הסר</button></div>}</div>
        <Button type="submit">סגור שיעור ושמור שיעורי בית</Button>
      </form>
    </Card>

    <Card><h2 className="font-extrabold text-lg">משימות פתוחות</h2><div className="mt-3 space-y-2">{student.assignments.filter((a) => a.status !== "done").slice(0,5).map((a) => <div key={a.id} className="bg-surface-soft rounded-button-sm p-3"><b>{a.title}</b>{a.instructions && <p className="text-sm text-muted mt-1">{a.instructions}</p>}{a.resources?.map((r) => <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="block text-sm text-accent mt-2">🔗 {r.label || r.url}</a>)}{a.attachment && <a href={a.attachment.dataUrl} download={a.attachment.name} className="block text-sm text-accent mt-2">📎 {a.attachment.name}</a>}<p className="text-xs mt-2">{a.status === "stuck" ? "נתקע" : "עוד לא הושלם"}</p></div>)}{!student.assignments.some((a) => a.status !== "done") && <p className="text-muted">אין משימה פתוחה.</p>}</div></Card>

    <Card><h2 className="font-extrabold text-lg">הישג אמיתי</h2><div className="flex gap-2 mt-3"><input className="flex-1 bg-surface-soft rounded-button-sm px-3 py-3" placeholder="למשל: ניגן שיר ראשון מהתחלה עד הסוף" value={winTitle} onChange={(e) => setWinTitle(e.target.value)} /><Button variant="secondary" onClick={() => { if (winTitle.trim()) { addStudentWin(student.id, { title: winTitle.trim() }); setWinTitle(""); } }}>שמור</Button></div><div className="mt-3 space-y-2">{student.wins.slice(0,4).map((win) => <div key={win.id} className="font-bold">🏆 {win.title}</div>)}</div></Card>
  </section>;
}
