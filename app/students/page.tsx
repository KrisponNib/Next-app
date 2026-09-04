"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useNextState } from "@/lib/state/useNextState";
import { StudentGender, StudentPath } from "@/lib/types";

const PATHS: { value: StudentPath; label: string }[] = [
  { value: "fun", label: "בשביל הכיף" },
  { value: "serious", label: "חובב רציני" },
  { value: "band", label: "להקה" },
  { value: "professional", label: "מקצועי" },
  { value: "young", label: "תלמיד צעיר" },
];

export default function StudentsPage() {
  const { state, addStudent } = useNextState();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [path, setPath] = useState<StudentPath>("serious");
  const [gender, setGender] = useState<StudentGender | "">("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !goal.trim() || !gender) return;
    addStudent({ name: name.trim(), gender, currentGoal: goal.trim(), path });
    setName(""); setGoal(""); setGender("");
  }

  return (
    <section>
      <ScreenHeader eyebrow="תלמידים" title="התלמידים שלי" description="המסך הזה קיים כדי לדעת מה צריך לקרות עם כל תלמיד עכשיו." />

      <Card>
        <h2 className="text-lg font-extrabold mb-3">תלמיד חדש</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full bg-surface-soft rounded-button-sm px-4 py-3 outline-none" placeholder="שם" value={name} onChange={(e) => setName(e.target.value)} />
          <div>
            <p className="text-sm font-bold mb-2">איך לפנות לתלמיד/ה?</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setGender("male")} className={`rounded-button-sm py-3 font-bold ${gender === "male" ? "bg-text text-white" : "bg-surface-soft"}`}>זכר</button>
              <button type="button" onClick={() => setGender("female")} className={`rounded-button-sm py-3 font-bold ${gender === "female" ? "bg-text text-white" : "bg-surface-soft"}`}>נקבה</button>
            </div>
          </div>
          <input className="w-full bg-surface-soft rounded-button-sm px-4 py-3 outline-none" placeholder={gender === "female" ? "מה היא רוצה להשיג עכשיו?" : gender === "male" ? "מה הוא רוצה להשיג עכשיו?" : "מה המטרה הנוכחית?"} value={goal} onChange={(e) => setGoal(e.target.value)} />
          <select className="w-full bg-surface-soft rounded-button-sm px-4 py-3" value={path} onChange={(e) => setPath(e.target.value as StudentPath)}>
            {PATHS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <Button type="submit">הוסף תלמיד</Button>
        </form>
      </Card>

      <div className="space-y-3 mt-5">
        {state.students.map((student) => {
          const open = student.assignments.filter((a) => a.status !== "done").length;
          return (
            <Link key={student.id} href={`/students/${student.id}`} className="block">
              <Card className="my-0">
                <div className="flex items-start justify-between gap-4">
                  <div><h3 className="font-extrabold text-lg">{student.name}</h3><p className="text-muted mt-1">{student.currentGoal}</p></div>
                  <span className="text-xs font-bold bg-surface-soft rounded-full px-3 py-1">{open} פתוחות</span>
                </div>
              </Card>
            </Link>
          );
        })}
        {state.students.length === 0 && <Card><p className="text-muted">תוסיף תלמיד אמיתי אחד. זה כל מה שצריך כדי להתחיל לבדוק את המערכת.</p></Card>}
      </div>
    </section>
  );
}
