import { Reflection } from "@/lib/types";
import { PracticePlanItem } from "@/features/practice/templates/practiceTemplates";

const CHARTS_KEYWORDS = ["צ׳ארט", "Charts", "קריאה"];

export function chartsRuleApplies(reflections: Reflection[]): boolean {
  return reflections.some((r) => {
    const text = r.improve || "";
    return CHARTS_KEYWORDS.some((keyword) => text.includes(keyword));
  });
}

export const chartsEmphasis: PracticePlanItem = {
  title: "דגש מתוך Reflections: צ׳ארטים",
  minutes: 10,
};
