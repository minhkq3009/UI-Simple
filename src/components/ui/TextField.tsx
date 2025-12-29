import { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = {
  label: string;
  type?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, type = "text", icon, ...props }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 focus-within:border-[#0f6fff] focus-within:ring-2 focus-within:ring-[#0f6fff]/20">
        {icon && <span className="text-gray-400">{icon}</span>}
        <input
          type={type}
          className="w-full border-none text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          {...props}
        />
      </div>
    </div>
  );
}


