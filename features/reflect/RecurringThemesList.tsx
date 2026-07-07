"use client";

import { NoteBox } from "@/components/ui/NoteBox";
import { useNextState } from "@/lib/state/useNextState";

export function RecurringThemesList() {
  const { state } = useNextState();
  const recent = state.reflections.slice(0, 4);

  if (recent.length === 0) {
    return (
      <p className="text-muted">
        עדיין אין תובנות. אחרי הופעה, חזרה או שיעור — רשום Reflection קצר.
      </p>
    );
  }

  return (
    <div className="grid gap-2.5">
      {recent.map((r) => (
        <NoteBox key={r.id}>
          {r.type}: {r.improve || r.wentWell}
        </NoteBox>
      ))}
    </div>
  );
}
