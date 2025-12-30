import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { X, Copy, Pencil, Plus, Search } from "lucide-react";

export default function Bookings() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="px-6 py-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-900 text-2xl">Home</span>
          <span className="text-gray-400">-</span>
          <span className="text-2xl font-medium text-gray-700">Dashboard</span>
        </div>

        {/* Card: actions + filters + table */}
        <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
          {/* Block 1: New + action icons */}
          <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 text-xs text-gray-700">
            <Link href="/create-booking">
              <Button
                type="button"
                icon={<Plus className="h-4 w-4" />}
                className="w-auto rounded-sm bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                New
              </Button>
            </Link>

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

          {/* Block 2: filters */}
          <div className="border-b border-gray-200 px-4 py-5 text-xs text-gray-700">
            <div className="flex flex-col gap-6">
              {/* Row 1: Booking checkboxes + date range + total box checked */}
              <div className="flex flex-wrap items-center justify-between gap-3">
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

                <div className="text-sm font-bold text-gray-800">
                  Total box checked: 0
                </div>
              </div>

              {/* Row 3: Filter textfield + Show page size */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center">
                  <TextField
                    label="Filter:"
                    placeholder="Type to filter..."
                    icon={<Search className="h-4 w-4" />}
                    iconPosition="right"
                    variant="inline"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Show:</span>
                  <select className="h-8 rounded border border-gray-300 bg-white px-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400">
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: table */}
          <div className="">
            <Table />
          </div>
        </div>
      </main>
    </div>
  );
}


