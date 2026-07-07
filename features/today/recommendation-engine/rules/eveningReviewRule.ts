import { NextState } from "@/lib/types";
import { NextActionRecommendation } from "@/features/today/recommendation-engine/types";

// חוק זה הוא רשת הביטחון של המנוע - הוא היחיד שמחזיר תמיד המלצה ולא null,
// כדי שהמנוע יבטיח שיש תמיד מה להציע, גם כשכל שאר החוקים לא רלוונטיים.
export function eveningReviewRule(
  _state: NextState
): NextActionRecommendation | null {
  return {
    id: "rec-evening-review",
    type: "win",
    title: "הוסף Win או עשה סיכום ערב",
    reason: "סימנת את כל המשימות של היום - זה הזמן לתעד מה באמת התקדם.",
    goalId: "Progress",
  };
}
