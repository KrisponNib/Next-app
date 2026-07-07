import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-surface border border-black/[.035] rounded-card shadow-card p-[22px] my-3.5 ${className}`}
    >
      {children}
    </div>
  );
}
