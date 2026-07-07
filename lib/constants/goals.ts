import { GoalId } from "@/lib/types";

// רשימת זרע (seed) בלבד - לא רשימה סגורה. ניתן להוסיף מטרות חדשות בהמשך
// (למשל דרך מסך הפרופיל בעתיד) בלי לשנות טיפוסים או קוד קיים.
export const DEFAULT_GOALS: GoalId[] = [
  "First Call",
  "Mastery",
  "Academy",
  "Income Freedom",
  "Product",
  "Life",
];
