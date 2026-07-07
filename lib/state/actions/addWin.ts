import { GoalId, NextState } from "@/lib/types";

export function addWin(state: NextState, title: string, goal: GoalId): NextState {
  return {
    ...state,
    wins: [
      { id: crypto.randomUUID(), title, goal, date: new Date().toISOString() },
      ...state.wins,
    ],
  };
}
