"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useNextState } from "@/lib/state/useNextState";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function StudentPage({ params }: { params: { id: string } }) {
  const { state, updateStudentDetails, closeStudentLesson, addStudentWin } = useNextState();
  const student = state.students.find((item) => item.id === params.id);
  const [workedOn, setWorkedOn] = useState("");
  const [wentWell, setWentWell] = useState("");
  const [mainFocus, setMainFocus] = useState("");
  const [assignment, setAssignment] = useState("");
  const [instructions, setInstructions] = useState("");
  const [winTitle, setWinTitle] = useState("");

  if (!student) return <section><ScreenHeader eyebrow="Students" title="תלמיד לא נמצא" description="" /><Link href="/students" className="font-bold text-accent">חזרה לתלמידים</Link></section>;

  function closeLesson(event: FormEvent) {
    event.preventDefault();
    if (!workedOn.trim()) return;
    closeStudentLesson(student!.id, {
      workedOn, wentWell, mainFocus,
      assignments: assignment.trim() ? [{ title: assignment, instructions }] : [],
    });
    setWorkedOn(""); setWentWell(""); setMainFocus(""); setAssignment(""); setInstructions("");
  }

  return (
    <section>
      <ScreenHeader eyebrow="Student Engine" title={student.name} description="השאלה: מה צריך לקרות עכשיו כדי לקדם אותו?" />

      <Card>
        <p className="text-xs font-extrabold text-muted uppercase">המטרה הנוכחית</p>
        <input className="w-full mt-2 text-xl font-extrabold bg-transparent outline-none" value={student.currentGoal} onChange={(e) => updateStudentDetails(student.id, { currentGoal: e.target.value })} />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={`/students/${student.id}/practice`} className="bg-text text-white rounded-button-sm py-3 px-4 text-center font-extrabold">מה לתרגל עכשיו?</Link>
          {student.shareToken ? (
            <Link href={`/student/${student.shareToken}`} target="_blank" className="bg-surface-soft rounded-button-sm py-3 px-4 text-center font-bold">פתח לינק תלמיד ↗</Link>
          ) : (
            <span className="bg-surface-soft rounded-button-sm py-3 px-4 text-center font-bold text-muted">מסנכרן לינק…</span>
          )}
        </div>
        {student.shareToken && <p className="text-xs text-muted mt-3">זה הלינק הפרטי שהתלמיד יכול לפתוח מהטלפון. אל תפרסם אותו בפומבי.</p>}
      </Card>

      <Card>
        <h2 className="font-extrabold text-lg">Practice Profile מינימלי</h2>
        <p className="text-sm text-muted mt-1">רק שני דברים שצריך כדי שהמנוע לא ינחש.</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <input type="number" min="5" className="bg-surface-soft rounded-button-sm px-3 py-3" placeholder="דקות רגילות" value={student.practiceProfile.defaultDurationMinutes ?? ""} onChange={(e) => updateStudentDetails(student.id, { practiceProfile: { ...student.practiceProfile, defaultDurationMinutes: Number(e.target.value) || undefined } })} />
          <input className="bg-surface-soft rounded-button-sm px-3 py-3" placeholder="איך נראית הצלחה?" value={student.practiceProfile.successDefinition ?? ""} onChange={(e) => updateStudentDetails(student.id, { practiceProfile: { ...student.practiceProfile, successDefinition: e.target.value } })} />
        </div>
      </Card>

      <Card>
        <h2 className="font-extrabold text-lg">סגירת שיעור</h2>
        <form onSubmit={closeLesson} className="space-y-3 mt-3">
          <textarea className="w-full bg-surface-soft rounded-button-sm p-3" placeholder="על מה עבדנו?" value={workedOn} onChange={(e) => setWorkedOn(e.target.value)} />
          <textarea className="w-full bg-surface-soft rounded-button-sm p-3" placeholder="מה הלך טוב?" value={wentWell} onChange={(e) => setWentWell(e.target.value)} />
          <textarea className="w-full bg-surface-soft rounded-button-sm p-3" placeholder="מה הדבר הכי חשוב לשפר?" value={mainFocus} onChange={(e) => setMainFocus(e.target.value)} />
          <input className="w-full bg-surface-soft rounded-button-sm px-3 py-3" placeholder="משימה לשבוע" value={assignment} onChange={(e) => setAssignment(e.target.value)} />
          <input className="w-full bg-surface-soft rounded-button-sm px-3 py-3" placeholder="איך לעבוד עליה?" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          <Button type="submit">סגור שיעור + שמור משימה</Button>
        </form>
      </Card>

      <Card>
        <h2 className="font-extrabold text-lg">מה פתוח עכשיו</h2>
        <div className="mt-3 space-y-2">
          {student.assignments.filter((a) => a.status !== "done").slice(0,5).map((a) => <div key={a.id} className="bg-surface-soft rounded-button-sm p-3"><b>{a.title}</b>{a.instructions && <p className="text-sm text-muted mt-1">{a.instructions}</p>}<p className="text-xs mt-2">{a.status === "stuck" ? "נתקע" : "עוד לא הושלם"}</p></div>)}
          {!student.assignments.some((a) => a.status !== "done") && <p className="text-muted">אין משימה פתוחה.</p>}
        </div>
      </Card>

      <Card>
        <h2 className="font-extrabold text-lg">Win אמיתי</h2>
        <div className="flex gap-2 mt-3">
          <input className="flex-1 bg-surface-soft rounded-button-sm px-3 py-3" placeholder="למשל: שיר ראשון מהתחלה עד הסוף" value={winTitle} onChange={(e) => setWinTitle(e.target.value)} />
          <Button variant="secondary" onClick={() => { if (winTitle.trim()) { addStudentWin(student.id, { title: winTitle.trim() }); setWinTitle(""); } }}>שמור</Button>
        </div>
        <div className="mt-3 space-y-2">{student.wins.slice(0,4).map((win) => <div key={win.id} className="font-bold">🏆 {win.title}</div>)}</div>
      </Card>
    </section>
  );
}
