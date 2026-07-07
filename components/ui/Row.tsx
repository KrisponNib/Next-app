import React from "react";

interface RowProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  isFirst?: boolean;
}

export function Row({ title, subtitle, right, isFirst = false }: RowProps) {
  return (
    <div
      className={`flex gap-3 items-center justify-between py-3.5 ${
        isFirst ? "" : "border-t border-line"
      }`}
    >
      <div className="min-w-0">
        <div className="text-lg font-bold leading-snug">{title}</div>
        {subtitle && <div className="text-[15px] text-muted mt-[3px] leading-snug">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}
