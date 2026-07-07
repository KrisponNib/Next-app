import { Reflection } from "@/lib/types";
import { PRACTICE_TEMPLATES, PracticePlanItem } from "@/features/practice/templates/practiceTemplates";
import { chartsRuleApplies, chartsEmphasis } from "@/features/practice/rules/chartsRule";
import { fillsRuleApplies, fillsEmphasis } from "@/features/practice/rules/fillsRule";

export type { PracticePlanItem };

export function generatePracticePlan(
  minutes: number,
  reflections: Reflection[]
): PracticePlanItem[] {
  const base = PRACTICE_TEMPLATES[minutes] ?? PRACTICE_TEMPLATES[45];
  const plan = [...base];

  // סדר הבדיקות זהה למקור: פילים נבדק ראשון, צ'ארטים נבדק שני - ולכן
  // אם שניהם רלוונטיים, דגש הצ'ארטים מופיע ראשון בתוכנית הסופית.
  if (fillsRuleApplies(reflections)) {
    plan.unshift(fillsEmphasis);
  }
  if (chartsRuleApplies(reflections)) {
    plan.unshift(chartsEmphasis);
  }

  return plan;
}
