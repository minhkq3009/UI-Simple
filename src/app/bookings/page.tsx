import { Header } from "@/components/layout/Header";
import { BookingTable } from "@/components/booking/BookingTable";

export default function Bookings() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="px-6 py-6">
        <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-2xl">Home</span>
            <span className="text-gray-400">-</span>
            <span className="text-2xl font-medium text-gray-700">Dashboard</span>
          </div>
          <div className="text-xs text-gray-500">Total box checked: 0</div>
        </div>

        <BookingTable />
      </main>
    </div>
  );
}


