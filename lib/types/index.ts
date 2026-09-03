// מזהה מטרה. כרגע זה עדיין רק מחרוזת חופשית.
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
  date: string;
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
  date: string;
}

export type IncomeType = "music" | "other";

export interface IncomeEntry {
  id: string;
  type: IncomeType;
  amount: number;
  label: string;
  date: string;
}

export interface DailyAnswer {
  id: string;
  answer: string;
  date: string;
}

export interface Profile {
  identityGoal: string;
  identityTraits: string[];
}

// --- Students V1 ---
// V1 נשאר קטן בכוונה: שומרים רק מידע שמשנה את ההחלטה מה לעשות עכשיו.
export type StudentPath = "fun" | "serious" | "band" | "professional" | "young";
export type StudentAssignmentStatus = "todo" | "done" | "stuck";

export interface StudentAssignmentResource {
  id: string;
  label?: string;
  url: string;
}

export interface StudentAssignmentAttachment {
  name: string;
  type: string;
  dataUrl: string;
}

export interface StudentAssignment {
  id: string;
  title: string;
  instructions?: string;
  resources?: StudentAssignmentResource[];
  attachment?: StudentAssignmentAttachment;
  status: StudentAssignmentStatus;
  createdAt: string;
}

export interface StudentPracticeReflection {
  id: string;
  status: "good" | "mixed" | "stuck";
  worked: string;
  improveNext: string;
  evidenceUrl?: string;
  date: string;
}

export interface StudentWin {
  id: string;
  title: string;
  description?: string;
  before?: string;
  after?: string;
  date: string;
}

export interface StudentLesson {
  id: string;
  date: string;
  workedOn: string;
  wentWell: string;
  mainFocus: string;
}

export interface StudentPracticeProfile {
  defaultDurationMinutes?: number;
  weeklyTargetSessions?: number;
  preferredPracticeStyle?: "structured" | "free" | "mixed";
  mainObstacle?: string;
  successDefinition?: string;
}

export interface Student {
  id: string;
  shareToken?: string;
  name: string;
  path: StudentPath;
  currentGoal: string;
  goalReason?: string;
  primaryLearningSource: string;
  practiceProfile: StudentPracticeProfile;
  allowGeneratedPractice?: boolean;
  assignments: StudentAssignment[];
  reflections: StudentPracticeReflection[];
  wins: StudentWin[];
  lessons: StudentLesson[];
  createdAt: string;
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
  students: Student[];
}
