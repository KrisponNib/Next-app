import { GoalId, NextState } from "@/lib/types";
import { NextActionRecommendation } from "@/features/today/recommendation-engine/types";

const FIRST_CALL_AND_CAREER_GOALS: GoalId[] = ["First Call", "Career"];

export function careerRule(state: NextState): NextActionRecommendation | null {
  const careerTask = state.tasks.find(
    (t) => !t.done && FIRST_CALL_AND_CAREER_GOALS.includes(t.goal)
  );
  if (!careerTask) return null;

  return {
    id: `rec-task-${careerTask.id}`,
    type: "task",
    sourceId: careerTask.id,
    title: careerTask.text,
    reason: `כי זה מקדם ישירות את ${careerTask.goal}.`,
    goalId: careerTask.goal,
  };
}
