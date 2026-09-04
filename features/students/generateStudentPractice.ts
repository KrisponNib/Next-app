import { Student } from "@/lib/types";

export interface StudentPracticeItem {
  title: string;
  minutes: number;
}

export type StudentPracticeDecision =
  | { type: "question"; question: string; field: "duration" }
  | { type: "plan"; title: string; reason: string; items: StudentPracticeItem[] };

export function generateStudentPractice(student: Student, availableMinutes?: number): StudentPracticeDecision {
  const profile = student.practiceProfile;
  if (!availableMinutes && !profile.defaultDurationMinutes) {
    return { type: "question", question: "כמה זמן יש לך לאימון עכשיו?", field: "duration" };
  }
  const minutes = availableMinutes ?? profile.defaultDurationMinutes ?? 30;
  const openAssignment = student.assignments.find((a) => a.status !== "done");
  const latestReflection = student.reflections[0];
  const items: StudentPracticeItem[] = [];
  const warmup = minutes >= 30 ? 5 : 3;
  items.push({ title: "חימום קצר", minutes: warmup });

  if (openAssignment) {
    items.push({ title: openAssignment.title, minutes: Math.max(7, Math.round(minutes * 0.5)) });
  } else {
    items.push({ title: `עבודה על המטרה: ${student.currentGoal}`, minutes: Math.max(7, Math.round(minutes * 0.55)) });
  }

  if (latestReflection?.status === "stuck" && latestReflection.improveNext && minutes >= 25) {
    items.push({ title: `לפתור את מה שנתקע: ${latestReflection.improveNext}`, minutes: 7 });
  }

  const used = items.reduce((sum, item) => sum + item.minutes, 0);
  items.push({ title: "ניסיון מלא + הקלטה / Reflection", minutes: Math.max(3, minutes - used) });

  const reasonParts = [`המטרה כרגע היא “${student.currentGoal}”.`];
  if (openAssignment) reasonParts.push("יש משימה פתוחה מהשיעור ולכן היא מקבלת עדיפות.");
  else reasonParts.push(`${student.primaryLearningSource} הוא מקור הלמידה הראשי.`);
  if (latestReflection?.status === "stuck") reasonParts.push("האימון האחרון סימן קושי שעדיין צריך לפתור.");

  return { type: "plan", title: `אימון ${minutes} דקות`, reason: reasonParts.join(" "), items };
}
