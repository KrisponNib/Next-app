import { Reflection } from "@/lib/types";
import { PracticePlanItem } from "@/features/practice/templates/practiceTemplates";

const FILLS_KEYWORDS = ["Fill", "פיל"];

export function fillsRuleApplies(reflections: Reflection[]): boolean {
  return reflections.some((r) => {
    const text = r.improve || "";
    return FILLS_KEYWORDS.some((keyword) => text.includes(keyword));
  });
}

export const fillsEmphasis: PracticePlanItem = {
  title: "דגש מתוך Reflections: Fills",
  minutes: 10,
};
