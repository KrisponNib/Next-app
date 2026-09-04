"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNextState } from "@/lib/state/useNextState";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StudentGender } from "@/lib/types";

export default function StudentPage({ params }: { params: { id: string } }) {
  const { state, updateStudentDetails, closeStudentLesson, addStudentWin, updateStudentAssignment } = useNextState();
  const student = state.students.find((item) => item.id === params.id);
  const [studentName, setStudentName] = useState("");
  const [gender, setGender] = useState<StudentGender | "">("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [workedOn, setWorkedOn] = useState("");
  const [wentWell, setWentWell] = useState("");
  const [mainFocus, setMainFocus] = useState("");
  const [assignment, setAssignment] = useState("");
  const [instructions, setInstructions] = useState("");
  const [links, setLinks] = useState<{ id: string; label: string; url: string }[]>([]);
  const [attachment, setAttachment] = useState<{ name: string; type: string; dataUrl: string } | undefined>();
  const [practiceMinutes, setPracticeMinutes] = useState("");
  const [startTempo, setStartTempo] = useState("");
  const [winTitle, setWinTitle] = useState("");
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editInstructions, setEditInstructions] = useState("");
  const [editLinks, setEditLinks] = useState<{ id: string; label: string; url: string }[]>([]);
  const [editAttachment, setEditAttachment] = useState<{ name: string; type: string; dataUrl: string } | undefined>();
  const [editPracticeMinutes, setEditPracticeMinutes] = useState("");
  const [editStartTempo, setEditStartTempo] = useState("");
  const [lessonSaveMessage, setLessonSaveMessage] = useState("");

  useEffect(() => {
    if (!student) return;
    setStudentName(student.name);
    setGender(student.gender || "");
    setGoal(student.currentGoal);
    setDuration(student.practiceProfile.defaultDurationMinutes?.toString() || "");
  }, [student?.id]);

  if (!student) return <section><ScreenHeader eyebrow="תלמידים" title="תלמיד לא נמצא" description="לא מצאתי תלמיד עם המזהה הזה." /><Link href="/students" className="font-bold text-accent">חזרה לתלמידים</Link></section>;

  function saveProfile() {
    updateStudentDetails(student!.id, {
      name: studentName.trim() || student!.name,
      gender: gender || student!.gender,
      currentGoal: goal.trim() || student!.currentGoal,
      practiceProfile: {
        ...student!.practiceProfile,
        defaultDurationMinutes: Number(duration) || undefined,
      },
    });
  }

  function startEditAssignment(assignmentId: string) {
    const item = student!.assignments.find((a) => a.id === assignmentId);
    if (!item) return;
    setEditingAssignmentId(item.id);
    setEditTitle(item.title);
    setEditInstructions(item.instructions || "");
    setEditLinks((item.resources || []).map((r) => ({ id: r.id, label: r.label || "", url: r.url })));
    setEditAttachment(item.attachment);
    setEditPracticeMinutes(item.practiceMinutes?.toString() || "");
    setEditStartTempo(item.startTempo?.toString() || "");
  }

  function saveEditedAssignment() {
    if (!editingAssignmentId || !editTitle.trim()) return;
    updateStudentAssignment(student!.id, editingAssignmentId, {
      title: editTitle.trim(),
      instructions: editInstructions.trim() || undefined,
      resources: editLinks.filter((l) => l.url.trim()).map((l) => ({ ...l, url: l.url.trim(), label: l.label.trim() || undefined })),
      attachment: editAttachment,
      practiceMinutes: Number(editPracticeMinutes) || undefined,
      startTempo: Number(editStartTempo) || undefined,
      currentTempo: Number(editStartTempo) || undefined,
    });
    setEditingAssignmentId(null);
  }

  function readEditAttachment(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2_500_000) { alert("הקובץ גדול מדי. כרגע אפשר לצרף קובץ עד 2.5MB."); e.target.value = ""; return; }
    const reader = new FileReader();
    reader.onload = () => setEditAttachment({ name: file.name, type: file.type || "application/octet-stream", dataUrl: String(reader.result) });
    reader.readAsDataURL(file);
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
    setLessonSaveMessage("");
    const hasLessonContent = Boolean(workedOn.trim() || wentWell.trim() || mainFocus.trim());
    const hasHomework = Boolean(assignment.trim());
    if (!hasLessonContent && !hasHomework) {
      setLessonSaveMessage("צריך למלא לפחות פרט אחד מהשיעור או להוסיף משימת בית.");
      return;
    }
    closeStudentLesson(student!.id, {
      workedOn: workedOn.trim(),
      wentWell: wentWell.trim(),
      mainFocus: mainFocus.trim(),
      assignments: hasHomework ? [{ title: assignment.trim(), instructions: instructions.trim(), resources: links.filter((l) => l.url.trim()), attachment, practiceMinutes: Number(practiceMinutes) || undefined, startTempo: Number(startTempo) || undefined, currentTempo: Number(startTempo) || undefined }] : [],
    });
    setWorkedOn(""); setWentWell(""); setMainFocus(""); setAssignment(""); setInstructions(""); setLinks([]); setAttachment(undefined); setPracticeMinutes(""); setStartTempo("");
    setLessonSaveMessage("השיעור ושיעורי הבית נשמרו ✓");
  }

  return <section>
    <ScreenHeader eyebrow="ניהול תלמיד" title={student.name} description="כל מה שצריך כדי להחליט מה הצעד הבא של התלמיד." />

    <Card>
      <h2 className="font-extrabold text-lg">מטרה ואופן התרגול</h2>
      <p className="text-sm text-muted mt-1">אפשר לחזור לכאן ולערוך את הפרטים בכל שלב. הנתונים האלה משפיעים ישירות על האימון ש־NEXT בונה.</p>
      <label className="block mt-4 text-sm font-bold">שם התלמיד/ה</label>
      <input className="w-full mt-2 bg-surface-soft rounded-button-sm px-3 py-3 font-bold" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="שם" />
      <div className="mt-4">
        <label className="text-sm font-bold">איך לפנות לתלמיד/ה?</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button type="button" onClick={() => setGender("male")} className={`rounded-button-sm py-3 font-bold ${gender === "male" ? "bg-text text-white" : "bg-surface-soft"}`}>זכר</button>
          <button type="button" onClick={() => setGender("female")} className={`rounded-button-sm py-3 font-bold ${gender === "female" ? "bg-text text-white" : "bg-surface-soft"}`}>נקבה</button>
        </div>
      </div>
      <label className="block mt-4 text-sm font-bold">המטרה הנוכחית</label>
      <input className="w-full mt-2 bg-surface-soft rounded-button-sm px-3 py-3 font-bold" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="למשל: לנגן את השיר מהתחלה עד הסוף בקצב המקורי" />
      <div className="mt-4">
        <label className="text-sm font-bold">כמה דקות {gender === "female" ? "היא" : gender === "male" ? "הוא" : "התלמיד/ה"} בדרך כלל מתרגל{gender === "female" ? "ת" : ""}?</label>
        <p className="text-xs text-muted mt-1 mb-2">משמש את NEXT רק אם בחרת לאפשר בניית אימון אוטומטי.</p>
        <input type="number" min="5" className="w-full bg-surface-soft rounded-button-sm px-3 py-3" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="למשל 30" />
      </div>
      <div className="mt-4 bg-surface-soft rounded-button-sm p-3 flex items-start gap-3">
        <input id="allow-auto-practice" type="checkbox" className="mt-1" checked={Boolean(student.allowGeneratedPractice)} onChange={(e) => updateStudentDetails(student.id, { allowGeneratedPractice: e.target.checked })} />
        <label htmlFor="allow-auto-practice" className="cursor-pointer">
          <span className="font-bold block">אפשר לתלמיד לבנות אימון אוטומטי</span>
          <span className="text-xs text-muted">כבוי כברירת מחדל. הדלק רק לתלמיד מתקדם שאתה רוצה לתת לו יותר עצמאות.</span>
        </label>
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
        <div className="grid grid-cols-2 gap-3"><div><label className="text-sm font-bold">כמה זמן לתרגל?</label><div className="flex items-center gap-2 mt-1"><input type="number" min="1" className="w-full bg-surface-soft rounded-button-sm px-3 py-3" placeholder="10" value={practiceMinutes} onChange={(e) => setPracticeMinutes(e.target.value)} /><span className="text-sm font-bold">דק׳</span></div></div><div><label className="text-sm font-bold">טמפו התחלתי</label><div className="flex items-center gap-2 mt-1"><input type="number" min="1" className="w-full bg-surface-soft rounded-button-sm px-3 py-3" placeholder="80" value={startTempo} onChange={(e) => setStartTempo(e.target.value)} /><span className="text-sm font-bold">BPM</span></div></div></div>
        <div className="bg-surface-soft rounded-button-sm p-3"><div className="flex justify-between items-center"><div><p className="font-bold">קישורים לשירים / סרטונים</p><p className="text-xs text-muted">אפשר להוסיף כמה קישורים שצריך.</p></div><button type="button" onClick={addLink} className="font-bold text-accent">+ הוסף קישור</button></div>{links.map((link) => <div key={link.id} className="grid grid-cols-[1fr_2fr_auto] gap-2 mt-2"><input className="bg-surface rounded-button-sm px-3 py-2" placeholder="שם, למשל: השיר" value={link.label} onChange={(e) => updateLink(link.id,"label",e.target.value)} /><input className="bg-surface rounded-button-sm px-3 py-2" placeholder="https://..." value={link.url} onChange={(e) => updateLink(link.id,"url",e.target.value)} /><button type="button" onClick={() => removeLink(link.id)} className="px-2">✕</button></div>)}</div>
        <div className="bg-surface-soft rounded-button-sm p-3"><p className="font-bold">תווים / דף תרגיל</p><p className="text-xs text-muted mt-1">צרף PDF או תמונה שכתבת לתלמיד. כרגע עד 2.5MB.</p><input type="file" accept="image/*,.pdf,application/pdf" onChange={readAttachment} className="mt-3 text-sm" />{attachment && <div className="mt-2 flex justify-between"><span className="text-sm font-bold">📎 {attachment.name}</span><button type="button" onClick={() => setAttachment(undefined)} className="text-sm text-accent">הסר</button></div>}</div>
        <Button type="submit">סגור שיעור ושמור שיעורי בית</Button>
        {lessonSaveMessage && <p className="text-sm font-bold mt-2">{lessonSaveMessage}</p>}
      </form>
    </Card>

    <Card>
      <h2 className="font-extrabold text-lg">משימות פתוחות</h2>
      <p className="text-sm text-muted mt-1">אפשר לערוך משימה גם אחרי שהשיעור כבר נסגר.</p>
      <div className="mt-3 space-y-3">
        {student.assignments.filter((a) => a.status !== "done").slice(0,5).map((a) => editingAssignmentId === a.id ? (
          <div key={a.id} className="bg-surface-soft rounded-button-sm p-3 space-y-3">
            <input className="w-full bg-surface rounded-button-sm px-3 py-2 font-bold" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="שם המשימה" />
            <textarea className="w-full bg-surface rounded-button-sm p-3" value={editInstructions} onChange={(e) => setEditInstructions(e.target.value)} placeholder="הוראות לתרגול" />
            <div className="grid grid-cols-2 gap-2"><div><label className="text-xs font-bold">זמן תרגול (דקות)</label><input type="number" min="1" className="w-full bg-surface rounded-button-sm px-3 py-2 mt-1" value={editPracticeMinutes} onChange={(e) => setEditPracticeMinutes(e.target.value)} /></div><div><label className="text-xs font-bold">טמפו התחלתי (BPM)</label><input type="number" min="1" className="w-full bg-surface rounded-button-sm px-3 py-2 mt-1" value={editStartTempo} onChange={(e) => setEditStartTempo(e.target.value)} /></div></div>
            <div>
              <div className="flex items-center justify-between"><p className="text-sm font-bold">קישורים</p><button type="button" className="text-sm font-bold text-accent" onClick={() => setEditLinks((x) => [...x, { id: crypto.randomUUID(), label: "", url: "" }])}>+ הוסף קישור</button></div>
              {editLinks.map((link) => <div key={link.id} className="grid grid-cols-[1fr_2fr_auto] gap-2 mt-2"><input className="bg-surface rounded-button-sm px-2 py-2" placeholder="שם" value={link.label} onChange={(e) => setEditLinks((xs) => xs.map((x) => x.id === link.id ? { ...x, label: e.target.value } : x))} /><input className="bg-surface rounded-button-sm px-2 py-2" placeholder="https://..." value={link.url} onChange={(e) => setEditLinks((xs) => xs.map((x) => x.id === link.id ? { ...x, url: e.target.value } : x))} /><button type="button" onClick={() => setEditLinks((xs) => xs.filter((x) => x.id !== link.id))}>✕</button></div>)}
            </div>
            <div>
              <p className="text-sm font-bold">תווים / קובץ</p>
              {editAttachment && <div className="flex justify-between mt-1"><span className="text-sm">📎 {editAttachment.name}</span><button type="button" className="text-sm text-accent" onClick={() => setEditAttachment(undefined)}>הסר</button></div>}
              <input type="file" accept="image/*,.pdf,application/pdf" onChange={readEditAttachment} className="mt-2 text-sm" />
            </div>
            <div className="flex gap-2"><Button type="button" onClick={saveEditedAssignment}>שמור משימה</Button><button type="button" className="font-bold px-3" onClick={() => setEditingAssignmentId(null)}>ביטול</button></div>
          </div>
        ) : (
          <div key={a.id} className="bg-surface-soft rounded-button-sm p-3">
            <div className="flex justify-between gap-3"><b>{a.title}</b><button type="button" onClick={() => startEditAssignment(a.id)} className="text-sm font-bold text-accent">ערוך</button></div>
            {a.instructions && <p className="text-sm text-muted mt-1">{a.instructions}</p>}
            {(a.practiceMinutes || a.startTempo) && <p className="text-sm font-bold mt-2">{a.practiceMinutes ? `⏱ ${a.practiceMinutes} דק׳` : ""}{a.practiceMinutes && a.startTempo ? " · " : ""}{a.startTempo ? `🎯 התחלה: ${a.startTempo} BPM` : ""}{a.currentTempo ? ` · עכשיו: ${a.currentTempo} BPM` : ""}</p>}
            {a.resources?.map((r) => <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="block text-sm text-accent mt-2">🔗 {r.label || r.url}</a>)}
            {a.attachment && <a href={a.attachment.dataUrl} download={a.attachment.name} className="block text-sm text-accent mt-2">📎 {a.attachment.name}</a>}
            <p className="text-xs mt-2">{a.status === "stuck" ? "נתקע" : "עוד לא הושלם"}</p>
          </div>
        ))}
        {!student.assignments.some((a) => a.status !== "done") && <p className="text-muted">אין משימה פתוחה.</p>}
      </div>
    </Card>

    <Card><h2 className="font-extrabold text-lg">הישג אמיתי</h2><div className="flex gap-2 mt-3"><input className="flex-1 bg-surface-soft rounded-button-sm px-3 py-3" placeholder="למשל: ניגן שיר ראשון מהתחלה עד הסוף" value={winTitle} onChange={(e) => setWinTitle(e.target.value)} /><Button variant="secondary" onClick={() => { if (winTitle.trim()) { addStudentWin(student.id, { title: winTitle.trim() }); setWinTitle(""); } }}>שמור</Button></div><div className="mt-3 space-y-2">{student.wins.slice(0,4).map((win) => <div key={win.id} className="font-bold">🏆 {win.title}</div>)}</div></Card>
  </section>;
}
