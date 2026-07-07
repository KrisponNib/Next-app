import React from "react";

interface ScreenHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function ScreenHeader({ eyebrow, title, description }: ScreenHeaderProps) {
  return (
    <div className="py-3.5 px-0.5 pb-5">
      <div className="text-muted text-base font-semibold mb-1">{eyebrow}</div>
      <h1 className="text-[42px] leading-[1.02] mb-2.5 font-extrabold tracking-tight">
        {title}
      </h1>
      <p className="text-[17px] leading-[1.55] text-muted">{description}</p>
    </div>
  );
}
