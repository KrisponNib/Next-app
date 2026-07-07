"use client";

import React from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

// שלושת הסוגים כאן הם תרגום ישיר של .primary / .secondary / .ghost מהאב-טיפוס.
// לא נוסף כאן סוג רביעי, וגם לא צבע חדש.
const variantClasses: Record<Variant, string> = {
  primary:
    "w-full border-0 bg-text text-white rounded-button py-4 px-[18px] font-extrabold text-lg",
  secondary:
    "border-0 bg-surface-soft text-text rounded-button-sm py-[13px] px-4 font-bold",
  ghost: "border-0 bg-transparent text-accent font-extrabold py-2 px-[2px]",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
