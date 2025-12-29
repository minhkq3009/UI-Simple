import { User, CalendarPlus, Home as HomeIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            icon={<HomeIcon className="h-4 w-4" />}
            className="w-auto rounded-lg bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-500 hover:bg-sky-100"
          >
            Home
          </Button>
          <Button
            type="button"
            icon={<CalendarPlus className="h-4 w-4" />}
            className="w-auto bg-transparent px-0 py-0 text-sm font-medium text-gray-700 hover:text-sky-600 hover:bg-transparent"
          >
            Create Booking
          </Button>
        </div>

        <button className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-sky-600">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-50">
            <User className="h-4 w-4 text-gray-500" />
          </span>
          <span>dang.loc@jvb-corp.com</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
}


