import React from "react";

export function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full bg-surface border border-line rounded-button p-[15px] text-text outline-none text-[17px] text-right resize-y min-h-[96px] ${className}`}
      {...props}
    />
  );
}
