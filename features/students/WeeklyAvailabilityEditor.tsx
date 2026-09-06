"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { HEBREW_DAYS } from "@/lib/scheduling";
import { LessonAvailabilityWindow, LessonSchedule } from "@/lib/types";

function fullWeek(availability: LessonAvailabilityWindow[]): LessonAvailabilityWindow[] {
  return ([0, 1, 2, 3, 4, 5, 6] as const).map(weekday => ({
    weekday, enabled: false, start: "09:00", end: "17:00",
    ...availability.find(day => day.weekday === weekday),
  }));
}

export function WeeklyAvailabilityEditor({ schedule, onSaved }: {
  schedule: LessonSchedule;
  onSaved: (schedule: LessonSchedule) => void;
}) {
  const [draft, setDraft] = useState<LessonAvailabilityWindow[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const days = draft ?? fullWeek(schedule.availability);
  const invalid = days.find(day => day.enabled && (!day.start || !day.end || day.start >= day.end));
  const tooShort = days.find(day => {
    const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
    return day.enabled && minutes(day.end) - minutes(day.start) < schedule.lessonMinutes;
  });
  function update(weekday: number, patch: Partial<LessonAvailabilityWindow>) {
    setDraft(days.map(day => day.weekday === weekday ? { ...day, ...patch } : day));
    setMessage(""); setError("");
  }
  async function save() {
    if (invalid || saving) return;
    setSaving(true); setMessage(""); setError("");
    try {
      const response = await fetch("/api/schedule", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability: days }),
      });
      if (!response.ok) {
        setError(response.status === 409
          ? "הלוח עודכן בזמן השמירה. השינויים שלך נשמרו כאן; אפשר לנסות לשמור שוב."
          : "לא הצלחנו לשמור את הזמינות. אפשר לנסות שוב.");
        return;
      }
      const result = await response.json();
      onSaved(result.schedule); setDraft(null); setMessage("הזמינות השבועית נשמרה.");
    } catch {
      setError("לא הצלחנו להתחבר. השינויים שלך נשמרו כאן; אפשר לנסות שוב.");
    } finally { setSaving(false); }
  }
  return <Card>
    <h2 className="text-xl font-extrabold">הזמינות השבועית שלי</h2>
    <p className="text-sm text-muted mt-2">בחר באילו ימים ובאילו שעות תלמידים יוכלו לקבוע שיעורים. הזמינות חוזרת בכל שבוע, לפי שעון ישראל.</p>
    <fieldset disabled={saving} className="mt-4 space-y-3">
      <legend className="sr-only">ימי ושעות הזמינות</legend>
      {days.map(day => <div key={day.weekday} className="bg-surface-soft rounded-button-sm p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <label className="flex items-center gap-3 font-bold">
          <input type="checkbox" checked={day.enabled} onChange={event => update(day.weekday, { enabled: event.target.checked })} className="h-5 w-5 accent-[#183f32]" />
          יום {HEBREW_DAYS[day.weekday]}
          <span className="text-sm text-muted font-normal">{day.enabled ? "פתוח" : "סגור"}</span>
        </label>
        <div className="grid grid-cols-2 gap-3 mt-3 sm:mt-0">
          <label className="text-sm font-bold">משעה
            <input aria-label={`שעת התחלה ביום ${HEBREW_DAYS[day.weekday]}`} type="time" disabled={!day.enabled} value={day.start} onChange={event => update(day.weekday, { start: event.target.value })} className="block w-full bg-white rounded-button-sm p-3 mt-1 disabled:opacity-40" />
          </label>
          <label className="text-sm font-bold">עד שעה
            <input aria-label={`שעת סיום ביום ${HEBREW_DAYS[day.weekday]}`} type="time" disabled={!day.enabled} value={day.end} onChange={event => update(day.weekday, { end: event.target.value })} className="block w-full bg-white rounded-button-sm p-3 mt-1 disabled:opacity-40" />
          </label>
        </div>
      </div>)}
    </fieldset>
    <p className="text-sm text-muted mt-4">שיעורים שכבר נקבעו נשארים במקומם. לתלמידים מוצגות רק שעות פנויות, לפחות 24 שעות מראש.</p>
    {!days.some(day => day.enabled) && <p className="text-sm mt-3">כל הימים סגורים — לאחר השמירה לא יוצעו שעות חדשות לקביעת שיעור.</p>}
    {invalid && <p role="alert" className="text-sm text-[#6f1831] mt-3">ביום {HEBREW_DAYS[invalid.weekday]} יש לבחור שעת סיום מאוחרת משעת ההתחלה.</p>}
    {!invalid && tooShort && <p className="text-sm mt-3">הזמינות ביום {HEBREW_DAYS[tooShort.weekday]} קצרה משיעור של {schedule.lessonMinutes} דקות, ולכן לא יוצעו בו שעות.</p>}
    <div className="flex gap-3 mt-4">
      <button disabled={!draft || saving || !!invalid} onClick={save} className="bg-[#183f32] text-white rounded-button-sm px-5 py-3 font-extrabold disabled:opacity-40">{saving ? "שומר…" : "שמירת זמינות"}</button>
      {draft && <button disabled={saving} onClick={() => { setDraft(null); setError(""); setMessage(""); }} className="rounded-button-sm px-4 py-3 font-bold">ביטול שינויים</button>}
    </div>
    {message && <p role="status" className="text-sm text-[#183f32] mt-3">{message}</p>}
    {error && <p role="alert" className="text-sm text-[#6f1831] mt-3">{error}</p>}
  </Card>;
}
