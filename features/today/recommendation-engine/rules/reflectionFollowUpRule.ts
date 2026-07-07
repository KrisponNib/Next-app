import { NextState } from "@/lib/types";
import { NextActionRecommendation } from "@/features/today/recommendation-engine/types";

const FOLLOWUP_PREFIX = "להכניס לאימון:";

export function reflectionFollowUpRule(
  state: NextState
): NextActionRecommendation | null {
  const followUpTask = state.tasks.find(
    (t) => !t.done && t.text.startsWith(FOLLOWUP_PREFIX)
  );
  if (!followUpTask) return null;

  return {
    id: `rec-task-${followUpTask.id}`,
    type: "task",
    sourceId: followUpTask.id,
    title: followUpTask.text,
    reason: "כי זה עלה ברפלקציה האחרונה שלך, וזה הדבר הכי ישיר לשיפור.",
    goalId: followUpTask.goal,
  };
}
