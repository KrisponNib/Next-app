"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useNextState } from "@/lib/state/useNextState";

export function DailyQuestion() {
  const { addDailyAnswer } = useNextState();
  const [answer, setAnswer] = useState("");

  function handleSave() {
    const trimmed = answer.trim();
    if (!trimmed) return;
    addDailyAnswer(trimmed);
    setAnswer("");
  }

  return (
    <div className="border-t border-line py-[22px] px-0.5">
      <h2 className="text-[27px] mb-3.5 font-extrabold">שאלה קצרה</h2>
      <p className="text-muted mb-3">מה הדבר שהכי מעכב אותך השבוע?</p>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="תשובה קצרה..."
        className="w-full bg-surface border border-line rounded-button p-[15px] text-text outline-none text-[17px] text-right resize-y min-h-[96px]"
      />
      <Button variant="ghost" onClick={handleSave} className="mt-2">
        שמור תשובה
      </Button>
    </div>
  );
}
