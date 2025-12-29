import { X, Copy, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BookingToolbar() {
  return (
    <div className="flex flex-col gap-3 text-xs text-gray-700">
      {/* Row 1: New + action icons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          icon={<Plus className="h-4 w-4" />}
          className="w-auto rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          New
        </Button>

        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded bg-red-500 text-white hover:bg-red-600">
            <X className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded bg-teal-500 text-white hover:bg-teal-600">
            <Copy className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded bg-sky-500 text-white hover:bg-sky-600">
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Row 2: Booking filters (checkboxes + date range) */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-1">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-1 focus:ring-offset-0"
            defaultChecked
          />
          <span>My booking</span>
        </label>
        <label className="inline-flex items-center gap-1">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-1 focus:ring-offset-0"
            defaultChecked
          />
          <span>Related booking</span>
        </label>
        <div className="inline-flex h-8 items-center overflow-hidden rounded border border-gray-300 bg-white text-xs text-gray-700">
          <input
            className="h-full w-64 border-none px-3 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            placeholder="YYYY/MM/DD - YYYY/MM/DD"
          />
          <button
            type="button"
            className="flex h-full w-8 items-center justify-center border-l border-gray-300 text-gray-400 hover:bg-gray-50"
          >
            ×
          </button>
        </div>
      </div>

      {/* Row 3: Text filter */}
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Filter:</span>
        <div className="relative">
          <input
            className="h-8 w-56 rounded border border-gray-300 pl-8 pr-2 text-xs text-gray-700 placeholder:text-gray-400"
            placeholder="Type to filter..."
          />
          <span className="pointer-events-none absolute left-2 top-1.5 text-gray-400">
            🔍
          </span>
        </div>
      </div>
    </div>
  );
}


