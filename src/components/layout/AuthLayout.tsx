import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f6fb] px-4">
      {children}
    </div>
  );
}


