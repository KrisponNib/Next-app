"use client";

import { Row } from "@/components/ui/Row";
import { useNextState } from "@/lib/state/useNextState";

export function ScheduleList() {
  const { state } = useNextState();

  return (
    <div>
      {state.schedule.map((event, i) => (
        <Row key={event.id} title={event.time} subtitle={event.title} isFirst={i === 0} />
      ))}
    </div>
  );
}
