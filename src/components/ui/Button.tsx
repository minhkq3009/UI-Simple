import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: "solid" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  icon,
  iconPosition = "left",
  variant = "solid",
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6fff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-700"
      : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className ?? ""}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="inline-flex h-4 w-4 items-center justify-center">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="inline-flex h-4 w-4 items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
}


