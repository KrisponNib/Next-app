"use client";

interface Option {
  value: number;
  label: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: number;
  onChange: (value: number) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="grid grid-cols-4 gap-2 my-3.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`border-0 rounded-seg py-3.5 px-1.5 font-extrabold cursor-pointer ${
            option.value === value ? "bg-text text-white" : "bg-surface-soft text-text"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
