import { NextState } from "@/lib/types";
import { NextActionRecommendation, RecommendationRule } from "@/features/today/recommendation-engine/types";
import { reflectionFollowUpRule } from "@/features/today/recommendation-engine/rules/reflectionFollowUpRule";
import { masteryRule } from "@/features/today/recommendation-engine/rules/masteryRule";
import { careerRule } from "@/features/today/recommendation-engine/rules/careerRule";
import { unfinishedTaskRule } from "@/features/today/recommendation-engine/rules/unfinishedTaskRule";
import { eveningReviewRule } from "@/features/today/recommendation-engine/rules/eveningReviewRule";

// סדר החוקים כאן הוא סדר העדיפות היחיד שקיים במערכת. שינוי עדיפות נעשה
// כאן, במקום אחד - לא בתוך אף חוק בנפרד, ולא במסך שמשתמש במנוע.
const DEFAULT_RULES: RecommendationRule[] = [
  reflectionFollowUpRule,
  masteryRule,
  careerRule,
  unfinishedTaskRule,
  eveningReviewRule,
];

// מריץ את החוקים אחד אחרי השני, לפי הסדר, ומחזיר את ההמלצה הראשונה
// שאינה null. אפשר להזין רשימת חוקים חלופית (לבדיקות, למשל) - כברירת
// מחדל רץ סדר העדיפות האמיתי של המוצר.
export function runRecommendationEngine(
  state: NextState,
  rules: RecommendationRule[] = DEFAULT_RULES
): NextActionRecommendation {
  for (const rule of rules) {
    const recommendation = rule(state);
    if (recommendation) {
      return recommendation;
    }
  }

  // לא אמור לקרות בפועל - eveningReviewRule היא רשת הביטחון שמחזירה תמיד
  // ערך. אם יתווספו חוקים בעתיד והרשת הזו תוסר בטעות, עדיף שגיאה מפורשת
  // מאשר החזרת ערך לא מוגדר בשקט.
  throw new Error("RecommendationEngine: no rule produced a recommendation.");
}
