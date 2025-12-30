import { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = {
  label: ReactNode;
  type?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  rightAdornment?: ReactNode;
  variant?: "stacked" | "inline";
  inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({
  label,
  type = "text",
  icon,
  iconPosition = "left",
  rightAdornment,
  variant = "stacked",
  inputClassName,
  ...props
}: TextFieldProps) {
  const isInline = variant === "inline";

  return (
    <div
      className={
        isInline ? "flex items-center gap-2" : "flex flex-col gap-1"
      }
    >
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-1.5 focus-within:border-[#0f6fff] focus-within:ring-2 focus-within:ring-[#0f6fff]/20">
        {icon && iconPosition === "left" && (
          <span className="text-gray-400">{icon}</span>
        )}
        <input
          type={type}
          className={`w-full border-none text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 ${
            inputClassName ?? ""
          }`}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <span className="text-gray-400">{icon}</span>
        )}
        {rightAdornment && <span>{rightAdornment}</span>}
      </div>
    </div>
  );
}


