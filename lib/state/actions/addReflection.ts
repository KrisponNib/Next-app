import { NextState, Reflection, ReflectionType } from "@/lib/types";
import { newId } from "@/lib/id";

export interface AddReflectionInput {
  type: ReflectionType;
  wentWell: string;
  improve: string;
}

export function addReflection(state: NextState, input: AddReflectionInput): NextState {
  const reflection: Reflection = {
    id: newId(),
    type: input.type,
    wentWell: input.wentWell,
    improve: input.improve,
    date: new Date().toISOString(),
  };

  // בדיוק כמו במקור: אם יש "מה לשפר", זה נכנס אוטומטית כמשימה עתידית.
  const newTasks = input.improve
    ? [
        {
          id: newId(),
          text: `להכניס לאימון: ${input.improve.slice(0, 42)}`,
          goal: "Mastery",
          done: false,
        },
        ...state.tasks,
      ]
    : state.tasks;

  return {
    ...state,
    reflections: [reflection, ...state.reflections],
    tasks: newTasks,
    wins: [
      {
        id: newId(),
        title: `סיכמתי ${input.type}`,
        goal: "Learning",
        date: new Date().toISOString(),
      },
      ...state.wins,
    ],
  };
}
