"use client";

import { signIn } from "next-auth/react";
import type { FC } from "react";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  /** Cho phép ẩn nút đóng khi muốn bắt buộc người dùng đăng nhập */
  showCloseButton?: boolean;
};

export const LoginModal: FC<LoginModalProps> = ({
  open,
  onClose,
  showCloseButton = true,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        {showCloseButton && (
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        )}

        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Log in or sign up
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          You&apos;ll get smarter responses and can upload files, images, and
          more.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/chat" })}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="h-4 w-4"
              />
            </span>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-400"
          >
            <span></span>
            <span>Continue with Apple (coming soon)</span>
          </button>

          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-400"
          >
            <span className="text-base">◇</span>
            <span>Continue with Microsoft (coming soon)</span>
          </button>

          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-400"
          >
            <span className="text-base">☎</span>
            <span>Continue with phone (coming soon)</span>
          </button>
        </div>

        <div className="my-4 flex items-center gap-2 text-xs text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          <span>OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="space-y-3">
          <input
            type="email"
            disabled
            placeholder="Email address"
            className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
          <button
            type="button"
            disabled
            className="w-full rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white opacity-60"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};


