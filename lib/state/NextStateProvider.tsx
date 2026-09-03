"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  GoalId,
  IncomeEntry,
  NextState,
  Profile,
  ReflectionType,
  Student,
  StudentAssignmentStatus,
} from "@/lib/types";
import {
  createDefaultState,
  exportStateToFile,
  loadState,
  saveState,
} from "@/lib/state/storage";
import {
  addDailyAnswer as addDailyAnswerAction,
  addIncome as addIncomeAction,
  addReflection as addReflectionAction,
  addWin as addWinAction,
  importState as importStateAction,
  toggleTask as toggleTaskAction,
  updateProfile as updateProfileAction,
  type AddIncomeInput,
  type AddReflectionInput,
} from "@/lib/state/actions";


import {
  addStudent as addStudentAction,
  updateStudentDetails as updateStudentDetailsAction,
  closeStudentLesson as closeStudentLessonAction,
  setStudentAssignmentStatus as setStudentAssignmentStatusAction,
  addStudentReflection as addStudentReflectionAction,
  addStudentWin as addStudentWinAction,
} from "@/lib/state/actions/students";
// כל הפעולות כאן הן שיקוף ישיר של הפונקציות שהיו כתובות בתוך התג script
// באב-טיפוס (toggleTask, saveWin, saveReflection, addIncome, וכו').
// הלוגיקה בפועל של כל פעולה נמצאת ב-lib/state/actions - הרדיוסר כאן רק
// מנתב אליה, כדי שהקובץ הזה יישאר קריא גם כשיתווספו עוד פעולות בעתיד.

type Action =
  | { type: "TOGGLE_TASK"; id: string }
  | { type: "ADD_WIN"; title: string; goal: GoalId }
  | { type: "ADD_REFLECTION"; input: AddReflectionInput }
  | { type: "ADD_INCOME"; input: AddIncomeInput }
  | { type: "ADD_DAILY_ANSWER"; answer: string }
  | { type: "SET_PROFILE"; profile: Profile }
  | { type: "ADD_STUDENT"; input: Pick<Student, "name" | "path" | "currentGoal"> }
  | { type: "REPLACE_STUDENTS"; students: Student[] }
  | { type: "UPDATE_STUDENT_DETAILS"; studentId: string; patch: Partial<Pick<Student, "currentGoal" | "goalReason" | "path" | "primaryLearningSource" | "practiceProfile">> }
  | { type: "CLOSE_STUDENT_LESSON"; studentId: string; input: { workedOn: string; wentWell: string; mainFocus: string; assignments: { title: string; instructions?: string; resources?: { id: string; label?: string; url: string }[]; attachment?: { name: string; type: string; dataUrl: string } }[] } }
  | { type: "SET_STUDENT_ASSIGNMENT_STATUS"; studentId: string; assignmentId: string; status: StudentAssignmentStatus }
  | { type: "ADD_STUDENT_REFLECTION"; studentId: string; input: { status: "good" | "mixed" | "stuck"; worked: string; improveNext: string; evidenceUrl?: string } }
  | { type: "ADD_STUDENT_WIN"; studentId: string; input: { title: string; description?: string; before?: string; after?: string } }
  | { type: "IMPORT_STATE"; state: NextState };

function reducer(state: NextState, action: Action): NextState {
  switch (action.type) {
    case "TOGGLE_TASK":
      return toggleTaskAction(state, action.id);

    case "ADD_WIN":
      return addWinAction(state, action.title, action.goal);

    case "ADD_REFLECTION":
      return addReflectionAction(state, action.input);

    case "ADD_INCOME":
      return addIncomeAction(state, action.input);

    case "ADD_DAILY_ANSWER":
      return addDailyAnswerAction(state, action.answer);

    case "SET_PROFILE":
      return updateProfileAction(state, action.profile);

    case "ADD_STUDENT":
      return addStudentAction(state, action.input);

    case "REPLACE_STUDENTS":
      return { ...state, students: action.students };

    case "UPDATE_STUDENT_DETAILS":
      return updateStudentDetailsAction(state, action.studentId, action.patch);

    case "CLOSE_STUDENT_LESSON":
      return closeStudentLessonAction(state, action.studentId, action.input);

    case "SET_STUDENT_ASSIGNMENT_STATUS":
      return setStudentAssignmentStatusAction(state, action.studentId, action.assignmentId, action.status);

    case "ADD_STUDENT_REFLECTION":
      return addStudentReflectionAction(state, action.studentId, action.input);

    case "ADD_STUDENT_WIN":
      return addStudentWinAction(state, action.studentId, action.input);

    case "IMPORT_STATE":
      return importStateAction(action.state);

    default:
      return state;
  }
}

interface NextStateContextValue {
  state: NextState;
  toggleTask: (id: string) => void;
  addWin: (title: string, goal: GoalId) => void;
  addReflection: (input: { type: ReflectionType; wentWell: string; improve: string }) => void;
  addIncome: (input: { type: IncomeEntry["type"]; amount: number; label: string }) => void;
  addDailyAnswer: (answer: string) => void;
  setProfile: (profile: Profile) => void;
  addStudent: (input: Pick<Student, "name" | "path" | "currentGoal">) => void;
  replaceStudents: (students: Student[]) => void;
  updateStudentDetails: (studentId: string, patch: Partial<Pick<Student, "currentGoal" | "goalReason" | "path" | "primaryLearningSource" | "practiceProfile">>) => void;
  closeStudentLesson: (studentId: string, input: { workedOn: string; wentWell: string; mainFocus: string; assignments: { title: string; instructions?: string; resources?: { id: string; label?: string; url: string }[]; attachment?: { name: string; type: string; dataUrl: string } }[] }) => void;
  setStudentAssignmentStatus: (studentId: string, assignmentId: string, status: StudentAssignmentStatus) => void;
  addStudentReflection: (studentId: string, input: { status: "good" | "mixed" | "stuck"; worked: string; improveNext: string; evidenceUrl?: string }) => void;
  addStudentWin: (studentId: string, input: { title: string; description?: string; before?: string; after?: string }) => void;
  exportState: () => void;
  importState: (newState: NextState) => void;
}

export const NextStateContext = createContext<NextStateContextValue | null>(null);

export function NextStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createDefaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // בטעינה הראשונה בדפדפן, טוענים את מה שנשמר באחסון המקומי (אם קיים).
  useEffect(() => {
    dispatch({ type: "IMPORT_STATE", state: loadState() });
    setIsHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // כל שינוי במצב נשמר אוטומטית - שום קומפוננטת מסך לא כותבת לאחסון בעצמה.
  // חשוב: לא שומרים לפני שהטעינה מהאחסון המקומי השלימה בפועל, אחרת המצב
  // הריק הראשוני עלול להישמר ולמחוק מידע קיים לפני שהוא בכלל נטען.
  useEffect(() => {
    if (!isHydrated) return;
    saveState(state);
  }, [state, isHydrated]);

  const value = useMemo<NextStateContextValue>(
    () => ({
      state,
      toggleTask: (id) => dispatch({ type: "TOGGLE_TASK", id }),
      addWin: (title, goal) => dispatch({ type: "ADD_WIN", title, goal }),
      addReflection: (input) => dispatch({ type: "ADD_REFLECTION", input }),
      addIncome: (input) => dispatch({ type: "ADD_INCOME", input }),
      addDailyAnswer: (answer) => dispatch({ type: "ADD_DAILY_ANSWER", answer }),
      setProfile: (profile) => dispatch({ type: "SET_PROFILE", profile }),
      addStudent: (input) => dispatch({ type: "ADD_STUDENT", input }),
      replaceStudents: (students) => dispatch({ type: "REPLACE_STUDENTS", students }),
      updateStudentDetails: (studentId, patch) => dispatch({ type: "UPDATE_STUDENT_DETAILS", studentId, patch }),
      closeStudentLesson: (studentId, input) => dispatch({ type: "CLOSE_STUDENT_LESSON", studentId, input }),
      setStudentAssignmentStatus: (studentId, assignmentId, status) => dispatch({ type: "SET_STUDENT_ASSIGNMENT_STATUS", studentId, assignmentId, status }),
      addStudentReflection: (studentId, input) => dispatch({ type: "ADD_STUDENT_REFLECTION", studentId, input }),
      addStudentWin: (studentId, input) => dispatch({ type: "ADD_STUDENT_WIN", studentId, input }),
      exportState: () => exportStateToFile(state),
      importState: (newState) => dispatch({ type: "IMPORT_STATE", state: newState }),
    }),
    [state]
  );

  return (
    <NextStateContext.Provider value={value}>
      {children}
    </NextStateContext.Provider>
  );
}
