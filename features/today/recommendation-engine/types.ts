import { GoalId, NextState } from "@/lib/types";

// סוג ההמלצה מציין אם היא מגיעה ממשימה קיימת בפועל, או שהיא נוצרת מחדש
// בלי גוף נתונים משלה. "practice" ו-"reflection" לא בשימוש עדיין - הם כאן
// כהכנה לחוקים עתידיים (אירועים, תזכורות תלמידים, ניסויים וכו').
export type NextActionRecommendationType =
  | "task"
  | "practice"
  | "reflection"
  | "win"
  | "followup";

export interface NextActionRecommendation {
  id: string;
  type: NextActionRecommendationType;
  sourceId?: string;
  title: string;
  reason: string;
  goalId: GoalId;
}

// כל חוק הוא פונקציה טהורה: מקבל את כל המצב, ומחזיר המלצה או null אם
// החוק לא רלוונטי כרגע. המנוע רק מריץ אותם בסדר, בלי לדעת שום דבר על מה
// שבתוך כל חוק.
export type RecommendationRule = (
  state: NextState
) => NextActionRecommendation | null;
