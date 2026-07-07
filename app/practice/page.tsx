"use client";

import { useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Row } from "@/components/ui/Row";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useNextState } from "@/lib/state/useNextState";
import { generatePracticePlan } from "@/features/practice/generatePracticePlan";

const TIME_OPTIONS = [20, 45, 90, 120].map((minutes) => ({
  value: minutes,
  label: String(minutes),
}));

export default function PracticePage() {
  const { state, addWin } = useNextState();
  // 45 דקות הוא ערך הבחירה ההתחלתי, בדיוק כמו שהיה באב-טיפוס.
  const [minutes, setMinutes] = useState(45);

  const plan = generatePracticePlan(minutes, state.reflections);

  return (
    <section>
      <ScreenHeader
        eyebrow="Practice Generator"
        title="כמה זמן יש לך?"
        description="Next בונה אימון לפי זמן פנוי ולפי דברים שעלו ב-Reflections."
      />

      <Card>
        <SegmentedControl options={TIME_OPTIONS} value={minutes} onChange={setMinutes} />

        <div>
          {plan.map((item, i) => (
            <Row
              key={`${item.title}-${i}`}
              title={item.title}
              subtitle={`${item.minutes} דקות`}
              isFirst={i === 0}
            />
          ))}
        </div>

        <Button
          variant="primary"
          className="mt-4"
          onClick={() => addWin("סיימתי אימון", "Mastery")}
        >
          סיימתי אימון
        </Button>
      </Card>
    </section>
  );
}
