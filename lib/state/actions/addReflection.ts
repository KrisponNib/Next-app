import { NextState, Reflection, ReflectionType } from "@/lib/types";

export interface AddReflectionInput {
  type: ReflectionType;
  wentWell: string;
  improve: string;
}

export function addReflection(state: NextState, input: AddReflectionInput): NextState {
  const reflection: Reflection = {
    id: crypto.randomUUID(),
    type: input.type,
    wentWell: input.wentWell,
    improve: input.improve,
    date: new Date().toISOString(),
  };

  // בדיוק כמו במקור: אם יש "מה לשפר", זה נכנס אוטומטית כמשימה עתידית.
  const newTasks = input.improve
    ? [
        {
          id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
        title: `סיכמתי ${input.type}`,
        goal: "Learning",
        date: new Date().toISOString(),
      },
      ...state.wins,
    ],
  };
}
