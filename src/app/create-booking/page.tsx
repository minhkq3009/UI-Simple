import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { Select } from "@/components/ui/Select";
import {
  Home as HomeIcon,
  Download,
  Upload,
  Search,
  CalendarDays,
  Clock,
  MapPin,
  User,
  Pencil,
  Trash2,
} from "lucide-react";

export default function CreateBookingPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Link
            href="/bookings"
            className="inline-flex h-8 w-8 items-center justify-center rounded bg-sky-500 text-white hover:bg-sky-600"
          >
            <HomeIcon className="h-4 w-4" />
          </Link>
          <span className="text-lg font-semibold text-gray-900">
            Create booking
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            icon={<Download className="h-4 w-4" />}
            variant="outline"
            className="w-auto px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Download
          </Button>
          <Button
            type="button"
            icon={<Upload className="h-4 w-4" />}
            className="w-auto rounded bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600"
          >
            Upload
          </Button>
        </div>
      </div>

      {/* Card: form + map */}
      <div className="mb-6 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
        <div className="px-6 pt-5 pb-3">
          <div className="mb-6 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex h-full flex-col justify-between space-y-4">
              <TextField
                label="Passenger"
                placeholder="Search Passenger"
                icon={<Search className="h-4 w-4" />}
              />
              <TextField
                label="Guest"
                placeholder="Guest name"
                icon={<Search className="h-4 w-4" />}
              />
            </div>

            <div className="flex h-full flex-col justify-between space-y-4">
              <TextField
                label={
                  <>
                    Departure date
                    <span className="ml-0.5 text-red-500">*</span>
                  </>
                }
                placeholder="Pick a date"
                icon={<CalendarDays className="h-4 w-4" />}
              />
              <TextField
                label={
                  <>
                    Departure time
                    <span className="ml-0.5 text-red-500">*</span>
                  </>
                }
                placeholder="Pick a time"
                icon={<Clock className="h-4 w-4" />}
              />
            </div>

            <div className="flex h-full flex-col">
              <TextField
                label={
                  <>
                    From
                    <span className="ml-0.5 text-red-500">*</span>
                  </>
                }
                placeholder="Select starting point"
                icon={<MapPin className="h-4 w-4" />}
              />
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  className="inline-flex h-7 w-7 items-center justify-center rounded bg-sky-500 text-white hover:bg-sky-600"
                >
                  ⇅
                </button>
              </div>
              <TextField
                label={
                  <>
                    To
                    <span className="ml-0.5 text-red-500">*</span>
                  </>
                }
                placeholder="Select destination"
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>

            <div className="flex h-full flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Note</label>
              <textarea
                className="flex-1 min-h-[80px] w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f6fff]/20"
                placeholder="Type note here..."
              />
            </div>
          </div>

          {/* Row: list + map */}
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="flex flex-col space-y-3 lg:col-span-2 lg:max-w-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <TextField
                      label="List of Passenger"
                      placeholder="Matsuki, Yosuke/TORAY(JP)/松木 洋介"
                      icon={<User className="h-4 w-4" />}
                      rightAdornment={
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-600"
                        >
                          <span className="text-xl leading-none">×</span>
                        </button>
                      }
                    />
                  </div>

                  <label className="inline-flex items-center gap-2 text-xs text-gray-700 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-1 focus:ring-offset-0"
                      defaultChecked
                    />
                    <span>New location</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-1 flex items-center">
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded bg-red-500 text-white hover:bg-red-600"
                >
                  🗑
                </button>
              </div>
            </div>

            <div className="flex h-[400px] flex-col overflow-hidden rounded lg:col-span-1">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.006297427572!2d105.8143235758129!3d21.033784487773065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab6d8a4d9f49%3A0x8b6b5480bec21951!2sVincom%20Center%20Metropolis!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="h-full w-full border-0"
                loading="lazy"
              />
              <div className="flex justify-center gap-4 border-t border-gray-200 bg-white py-3">
                <Button
                  type="button"
                  className="rounded-full bg-emerald-600 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                  Select as starting point (From)
                </Button>
                <Button
                  type="button"
                  className="rounded-full bg-emerald-600 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                  Select as destination (To)
                </Button>
              </div>
            </div>
            <div className="hidden lg:block" />
          </div>

          {/* Add to list button dưới khối form + map */}
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              className="rounded bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
            >
              Add to list
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom table preview */}
      <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left text-xs text-gray-600">
                <th className="border-b border-r border-gray-200 px-3 py-2 w-12">
                  No
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2">
                  Passenger
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2 whitespace-nowrap">
                  Date
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2 whitespace-nowrap">
                  Time
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2">
                  From
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2">
                  To
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2">
                  Note
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2 whitespace-nowrap">
                  Lunch
                </th>
                <th className="border-b border-r border-gray-200 px-3 py-2 whitespace-nowrap">
                  Booking hotel
                </th>
                <th className="border-b border-gray-200 px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs text-gray-800">
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  1
                </td>
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  Matsuki, Yosuke/TORAY(JP)/松木 洋介 - null
                </td>
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  2025/10/01
                </td>
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  15:26
                </td>
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  Cổng viên Thống Nhất, Đường Lê Duẩn, Lê Đại Hành, Đống Đa, Hà
                  Nội, Việt Nam - Hà Nội
                </td>
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  Vincom Center Metropolis, Phố Liễu Giai, Ngọc Khánh, Ba Đình,
                  Hà Nội, Việt Nam - Hà Nội
                </td>
                <td className="border-t border-r border-gray-200 px-3 py-2" />
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  <div className="max-w-[140px]">
                    <TextField
                      variant="inline"
                      label={<span className="sr-only">Lunch</span>}
                      defaultValue="no need"
                      inputClassName="text-xs"
                    />
                  </div>
                </td>
                <td className="border-t border-r border-gray-200 px-3 py-2">
                  <div className="max-w-[140px]">
                    <Select
                      defaultValue="no_need"
                      options={[
                        { value: "no_need", label: "No need" },
                        { value: "need", label: "Need" },
                      ]}
                    />
                  </div>
                </td>
                <td className="border-t border-gray-200 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-sky-600 hover:text-sky-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit button dưới bảng, ra hẳn ngoài card */}
      <div className="mt-4 flex justify-center">
        <Button
          type="button"
          className="rounded bg-sky-500 px-6 py-2 text-sm font-medium text-white hover:bg-sky-600"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}


