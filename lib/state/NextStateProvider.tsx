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
