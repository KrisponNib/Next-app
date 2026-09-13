import { NextState } from "@/lib/types";
import { newId } from "@/lib/id";

export function addDailyAnswer(state: NextState, answer: string): NextState {
  return {
    ...state,
    dailyAnswers: [
      { id: newId(), answer, date: new Date().toISOString() },
      ...state.dailyAnswers,
    ],
  };
}
