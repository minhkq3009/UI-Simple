import { SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none rounded border border-gray-300 bg-white px-3 py-1.5 pr-7 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f6fff]/20 ${className ?? ""}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] text-gray-400">
        ▼
      </span>
    </div>
  );
}


