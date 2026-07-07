import React from "react";

export function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent-soft text-note rounded-button p-4 text-base leading-snug font-semibold">
      {children}
    </div>
  );
}
