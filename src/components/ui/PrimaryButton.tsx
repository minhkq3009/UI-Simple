import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className="inline-flex w-full items-center justify-center rounded-lg bg-[#0f6fff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0052cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6fff] focus-visible:ring-offset-2"
      {...props}
    >
      {children}
    </button>
  );
}


