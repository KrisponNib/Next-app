import { NextState, Student, StudentAssignmentStatus } from "@/lib/types";

function updateStudent(state: NextState, studentId: string, updater: (student: Student) => Student): NextState {
  return {
    ...state,
    students: state.students.map((student) =>
      student.id === studentId ? updater(student) : student
    ),
  };
}

export function addStudent(state: NextState, input: Pick<Student, "name" | "gender" | "path" | "currentGoal">): NextState {
  const student: Student = {
    id: crypto.randomUUID(),
    shareToken: crypto.randomUUID(),
    name: input.name,
    gender: input.gender,
    path: input.path,
    currentGoal: input.currentGoal,
    primaryLearningSource: "Omri / Drum Academy",
    practiceProfile: {},
    allowGeneratedPractice: false,
    assignments: [],
    reflections: [],
    wins: [],
    lessons: [],
    createdAt: new Date().toISOString(),
  };
  return { ...state, students: [student, ...state.students] };
}

export function updateStudentDetails(
  state: NextState,
  studentId: string,
  patch: Partial<Pick<Student, "name" | "gender" | "currentGoal" | "goalReason" | "path" | "primaryLearningSource" | "practiceProfile" | "allowGeneratedPractice">>
): NextState {
  return updateStudent(state, studentId, (student) => ({ ...student, ...patch }));
}

export function closeStudentLesson(
  state: NextState,
  studentId: string,
  input: { workedOn: string; wentWell: string; mainFocus: string; assignments: { title: string; instructions?: string; resources?: { id: string; label?: string; url: string }[]; attachment?: { name: string; type: string; dataUrl: string }; practiceMinutes?: number; startTempo?: number; currentTempo?: number }[] }
): NextState {
  return updateStudent(state, studentId, (student) => ({
    ...student,
    lessons: [
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        workedOn: input.workedOn,
        wentWell: input.wentWell,
        mainFocus: input.mainFocus,
      },
      ...student.lessons,
    ],
    assignments: [
      ...input.assignments.filter((a) => a.title.trim()).map((a) => ({
        id: crypto.randomUUID(),
        title: a.title.trim(),
        instructions: a.instructions?.trim() || undefined,
        resources: a.resources?.filter((r) => r.url.trim()),
        attachment: a.attachment,
        practiceMinutes: a.practiceMinutes,
        startTempo: a.startTempo,
        currentTempo: a.currentTempo ?? a.startTempo,
        status: "todo" as const,
        createdAt: new Date().toISOString(),
      })),
      ...student.assignments,
    ],
  }));
}


export function updateStudentAssignment(
  state: NextState,
  studentId: string,
  assignmentId: string,
  patch: Partial<Pick<Student["assignments"][number], "title" | "instructions" | "resources" | "attachment" | "practiceMinutes" | "startTempo" | "currentTempo" | "status">>
): NextState {
  return updateStudent(state, studentId, (student) => ({
    ...student,
    assignments: student.assignments.map((assignment) =>
      assignment.id === assignmentId ? { ...assignment, ...patch } : assignment
    ),
  }));
}

export function setStudentAssignmentStatus(
  state: NextState,
  studentId: string,
  assignmentId: string,
  status: StudentAssignmentStatus
): NextState {
  return updateStudent(state, studentId, (student) => ({
    ...student,
    assignments: student.assignments.map((assignment) =>
      assignment.id === assignmentId ? { ...assignment, status } : assignment
    ),
  }));
}

export function addStudentReflection(
  state: NextState,
  studentId: string,
  input: { status: "good" | "mixed" | "stuck"; worked: string; improveNext: string; evidenceUrl?: string }
): NextState {
  return updateStudent(state, studentId, (student) => ({
    ...student,
    reflections: [
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        ...input,
      },
      ...student.reflections,
    ],
  }));
}

export function addStudentWin(
  state: NextState,
  studentId: string,
  input: { title: string; description?: string; before?: string; after?: string }
): NextState {
  return updateStudent(state, studentId, (student) => ({
    ...student,
    wins: [
      { id: crypto.randomUUID(), date: new Date().toISOString(), ...input },
      ...student.wins,
    ],
  }));
}
