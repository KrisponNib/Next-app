import { IncomeEntry, NextState } from "@/lib/types";
import { newId } from "@/lib/id";

export interface AddIncomeInput {
  type: IncomeEntry["type"];
  amount: number;
  label: string;
}

export function addIncome(state: NextState, input: AddIncomeInput): NextState {
  return {
    ...state,
    income: [
      {
        id: newId(),
        type: input.type,
        amount: input.amount,
        label: input.label,
        date: new Date().toISOString(),
      },
      ...state.income,
    ],
  };
}
