"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useNextState } from "@/lib/state/useNextState";

export function GoalEditor() {
  const { state, setProfile } = useNextState();
  const [goal, setGoal] = useState(state.profile.identityGoal);

  function handleSave() {
    setProfile({ ...state.profile, identityGoal: goal });
  }

  return (
    <Card>
      <h2 className="text-[27px] mb-1 font-extrabold">המטרה שלי</h2>
      <p className="text-muted mb-3">
        Next משתמש במטרה הזאת כדי לקבל החלטות טובות יותר.
      </p>
      <Textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="min-h-[140px]"
      />
      <Button variant="ghost" onClick={handleSave} className="mt-2">
        שמור
      </Button>
    </Card>
  );
}
