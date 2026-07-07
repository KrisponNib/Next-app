import React from "react";

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-soft py-[7px] px-[11px] text-muted text-sm font-bold">
      {children}
    </span>
  );
}
