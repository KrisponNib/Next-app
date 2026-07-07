import { GoalId, NextState } from "@/lib/types";
import { NextActionRecommendation } from "@/features/today/recommendation-engine/types";
import { isToday } from "@/features/today/recommendation-engine/isToday";

const MASTERY_GOAL: GoalId = "Mastery";
const PRACTICE_WIN_TITLE = "סיימתי אימון";

export function masteryRule(state: NextState): NextActionRecommendation | null {
  const practiceDoneToday = state.wins.some(
    (w) => w.title === PRACTICE_WIN_TITLE && isToday(w.date)
  );
  if (practiceDoneToday) return null;

  const masteryTask = state.tasks.find(
    (t) => !t.done && t.goal === MASTERY_GOAL
  );
  if (!masteryTask) return null;

  return {
    id: `rec-task-${masteryTask.id}`,
    type: "task",
    sourceId: masteryTask.id,
    title: masteryTask.text,
    reason: "כי עוד לא התאמנת היום, וזה מקדם את Mastery.",
    goalId: masteryTask.goal,
  };
}
