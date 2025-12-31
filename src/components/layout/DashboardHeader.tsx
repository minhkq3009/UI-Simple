"use client";

import {
  Menu,
  Search,
  Moon,
  Bell,
  MessageCircle,
  Maximize2,
  SlidersHorizontal,
} from "lucide-react";
import { TextField } from "@/components/ui/TextField";

type DashboardHeaderProps = {
  onToggleSidebar?: () => void;
};

export function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left: menu + search */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-slate-100"
          aria-label="Toggle menu"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5 text-slate-600" />
        </button>

        <div className="hidden md:block">
          <div className="min-w-[260px]">
            <TextField
              label={<span className="sr-only">Search</span>}
              placeholder="Search"
              icon={<Search className="h-4 w-4" />}
              iconPosition="right"
              variant="inline"
              inputClassName="text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-4 text-slate-500">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-slate-100"
          aria-label="Toggle dark mode"
        >
          <Moon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-slate-100"
          aria-label="Messages"
        >
          <MessageCircle className="h-5 w-5" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600">
          🇺🇸
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-slate-100"
          aria-label="Fullscreen"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded bg-[#0f6fff] text-white hover:bg-[#0055ff]"
          aria-label="Filters"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          <span className="text-xs font-semibold text-slate-700">EV</span>
        </div>
      </div>
    </header>
  );
}

