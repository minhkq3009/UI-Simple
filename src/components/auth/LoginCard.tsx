"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { Mail, Lock } from "lucide-react";
import { FormEvent } from "react";

export function LoginCard() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/bookings");
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white px-10 py-10 shadow-lg shadow-black/5">
      <div className="mb-8 flex flex-col items-center gap-1 text-center">
        <Logo />
        <div className="mt-8 space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">
            Login to your account
          </h1>
          <p className="text-md text-gray-500">
            Enter your credentials below
          </p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          placeholder="Enter your email"
          icon={<Mail className="h-4 w-4" />}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Lock className="h-4 w-4" />}
        />

        <Button
          type="submit"
          className="w-full bg-[#0f6fff] text-white hover:bg-[#0052cc]"
        >
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm font-medium text-[#0f6fff] hover:underline"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}


