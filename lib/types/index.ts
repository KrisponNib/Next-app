// כל הטיפוסים כאן משקפים אחד-לאחד את שדות ה-state שהיו ב-next-mvp-v2.html.
// לא נוסף כאן שום שדה שלא היה קיים באב-טיפוס.

// מזהה מטרה. כרגע זה עדיין רק מחרוזת חופשית - לא נבנתה ישות מטרה מלאה,
// וזה לא רשימה סגורה. זו הכנה לטיפוסים בלבד, לפני שיבנה ניהול מטרות מלא.
export type GoalId = string;

export interface Task {
  id: string;
  text: string;
  goal: GoalId;
  done: boolean;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
}

export interface Win {
  id: string;
  title: string;
  goal: GoalId;
  date: string; // ISO
}

export type ReflectionType =
  | "הופעה"
  | "חזרה"
  | "שיעור"
  | "אימון"
  | "סרטון"
  | "שיחה מקצועית";

export interface Reflection {
  id: string;
  type: ReflectionType;
  wentWell: string;
  improve: string;
  date: string; // ISO
}

export type IncomeType = "music" | "other";

export interface IncomeEntry {
  id: string;
  type: IncomeType;
  amount: number;
  label: string;
  date: string; // ISO
}

export interface DailyAnswer {
  id: string;
  answer: string;
  date: string; // ISO
}

export interface Profile {
  identityGoal: string;
  identityTraits: string[];
}

export interface NextState {
  goals: GoalId[];
  tasks: Task[];
  schedule: ScheduleEvent[];
  wins: Win[];
  reflections: Reflection[];
  income: IncomeEntry[];
  dailyAnswers: DailyAnswer[];
  profile: Profile;
}
