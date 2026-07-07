"use client";

import { useNextState } from "@/lib/state/useNextState";

export function TopTasksList() {
  const { state, toggleTask } = useNextState();

  return (
    <div>
      {state.tasks.map((task, i) => (
        <label
          key={task.id}
          className={`flex gap-3 items-start py-[13px] text-lg font-semibold ${
            i === 0 ? "" : "border-t border-line"
          }`}
        >
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
            className="w-[22px] h-[22px] mt-0.5 accent-text"
          />
          <span className={task.done ? "line-through text-muted" : ""}>
            {task.text}
            <div className="text-[15px] text-muted mt-[3px] font-normal">
              מקדם את {task.goal}
            </div>
          </span>
        </label>
      ))}
    </div>
  );
}
