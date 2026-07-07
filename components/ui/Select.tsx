import React from "react";

export function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full bg-surface border border-line rounded-button p-[15px] text-text outline-none text-[17px] text-right ${className}`}
      {...props}
    />
  );
}
