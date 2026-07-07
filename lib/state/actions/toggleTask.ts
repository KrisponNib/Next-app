import { NextState } from "@/lib/types";

export function toggleTask(state: NextState, id: string): NextState {
  return {
    ...state,
    tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  };
}
