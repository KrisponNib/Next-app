"use client";

import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { useNextState } from "@/lib/state/useNextState";
import { getNextAction } from "@/features/today/getNextAction";

export function NextActionCard() {
  const { state, addWin, toggleTask } = useNextState();
  const recommendation = getNextAction(state);

  function handleComplete() {
    // אם ההמלצה מגיעה ממשימה קיימת - מסמנים אותה כבוצעה, לא רק יוצרים Win.
    // אחרת ההמלצה תופיע שוב בפעם הבאה גם אחרי שסימנת "סיימתי".
    if (recommendation.type === "task" && recommendation.sourceId) {
      toggleTask(recommendation.sourceId);
    }
    addWin(recommendation.title, recommendation.goalId);
  }

  return (
    <div className="bg-text text-white rounded-hero p-7 shadow-hero my-5">
      <p className="text-white/70">הפעולה הבאה</p>
      <h2 className="text-white mb-1 text-[27px] font-extrabold leading-tight">
        {recommendation.title}
      </h2>
      <p className="text-white/70 mb-3">{recommendation.reason}</p>
      <Pill>{recommendation.goalId}</Pill>
      <Button
        variant="primary"
        className="!bg-white !text-text mt-[18px]"
        onClick={handleComplete}
      >
        סיימתי
      </Button>
    </div>
  );
}
