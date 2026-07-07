import { NextState } from "@/lib/types";
import { NextActionRecommendation } from "@/features/today/recommendation-engine/types";

export function unfinishedTaskRule(
  state: NextState
): NextActionRecommendation | null {
  const anyUnfinishedTask = state.tasks.find((t) => !t.done);
  if (!anyUnfinishedTask) return null;

  return {
    id: `rec-task-${anyUnfinishedTask.id}`,
    type: "task",
    sourceId: anyUnfinishedTask.id,
    title: anyUnfinishedTask.text,
    reason: "כי זה הדבר הבא ברשימה שמקדם אותך.",
    goalId: anyUnfinishedTask.goal,
  };
}
