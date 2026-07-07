import { NextState } from "@/lib/types";

export function addDailyAnswer(state: NextState, answer: string): NextState {
  return {
    ...state,
    dailyAnswers: [
      { id: crypto.randomUUID(), answer, date: new Date().toISOString() },
      ...state.dailyAnswers,
    ],
  };
}
