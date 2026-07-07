import { NextState } from "@/lib/types";
import { DEFAULT_GOALS } from "@/lib/constants/goals";

// מפתח האחסון המקומי. אם בעתיד יוחלף באחסון סופאבייס - זה הקובץ היחיד
// שדורש שינוי. שום קומפוננטה במסכים לא נוגעת ב-localStorage בעצמה.
const STORAGE_KEY = "next-app-state";

export function createDefaultState(): NextState {
  return {
    goals: DEFAULT_GOALS,
    tasks: [
      { id: crypto.randomUUID(), text: "לבחור שני שירי Portfolio", goal: "First Call", done: false },
      { id: crypto.randomUUID(), text: "20 דקות קריאת תווים", goal: "Mastery", done: false },
      { id: crypto.randomUUID(), text: "לשלוח הודעה לאיש קשר מקצועי אחד", goal: "Career", done: false },
    ],
    schedule: [
      { id: crypto.randomUUID(), time: "17:00", title: "שיעור תופים" },
      { id: crypto.randomUUID(), time: "20:00", title: "חלון עבודה על Next" },
    ],
    wins: [],
    reflections: [],
    income: [],
    dailyAnswers: [],
    profile: {
      identityGoal:
        "להיות מוזיקאי מקצועי שמתפרנס 100% ממוזיקה, עובד עם אנשים טובים, מלמד ברמה גבוהה ומשאיר מקום לחיים עצמם.",
      identityTraits: [
        "מתופף",
        "מורה",
        "יזם",
        "אוהב לבשל",
        "צמחוני",
        "רוצה להתפרנס ממוזיקה",
        "רוצה פחות רעש ויותר בהירות",
      ],
    },
  };
}

// טוענת את המצב מהאחסון המקומי. אם אין מצב שמור, או שהוא חלקי/פגום,
// חוזרים למצב ברירת המחדל בלי לקרוס - בדיוק כמו ההתנהגות של ||= באב-טיפוס.
export function loadState(): NextState {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createDefaultState();
  }

  try {
    const parsed = JSON.parse(raw);
    return mergeWithDefaults(parsed);
  } catch {
    return createDefaultState();
  }
}

export function saveState(state: NextState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ממזג מצב שנטען (מהאחסון, או מקובץ ייבוא) עם ברירות המחדל,
// כך ששדה חסר לא יגרום לקריסה של המסכים.
function mergeWithDefaults(partial: Partial<NextState>): NextState {
  const defaults = createDefaultState();
  return {
    goals: partial.goals?.length ? partial.goals : defaults.goals,
    tasks: partial.tasks ?? defaults.tasks,
    schedule: partial.schedule ?? defaults.schedule,
    wins: partial.wins ?? defaults.wins,
    reflections: partial.reflections ?? defaults.reflections,
    income: partial.income ?? defaults.income,
    dailyAnswers: partial.dailyAnswers ?? defaults.dailyAnswers,
    profile: partial.profile ?? defaults.profile,
  };
}

// ייצוא המצב הנוכחי כקובץ JSON להורדה - רשת ביטחון פשוטה כל עוד
// המידע חי רק באחסון המקומי של הדפדפן.
export function exportStateToFile(state: NextState): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `next-backup-${dateStamp}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ייבוא מצב מקובץ JSON שנבחר על ידי המשתמש. מחזירה את המצב הממוזג,
// ולא כותבת ישירות לאחסון - הכתיבה קורית דרך provider כמו כל שינוי אחר.
export function importStateFromFile(file: File): Promise<NextState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        resolve(mergeWithDefaults(parsed));
      } catch (error) {
        reject(new Error("קובץ לא תקין - לא ניתן לקרוא ממנו נתונים."));
      }
    };
    reader.onerror = () => reject(new Error("קריאת הקובץ נכשלה."));
    reader.readAsText(file);
  });
}
