import { StatusBadge } from "./StatusBadge";
import { MOCK_BOOKINGS } from "@/mocks/bookings";

function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-16">
      <div className="text-center">
        <p className="text-base font-semibold text-gray-900">
          No bookings found
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Start by creating a new booking using the button above.
        </p>
      </div>
    </div>
  );
}

export function Table() {
  const bookings = MOCK_BOOKINGS; // replace with API data later

  if (bookings.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-md">
          <thead className="bg-[#0c6c96] text-white">
            <tr>
              <th className="w-10 border-b border-r border-[#0b5b7e] px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/60 text-sky-500 focus:ring-1 focus:ring-offset-0"
                />
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Status
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Passenger
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Date
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Time
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Pickup Time
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                From
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                To
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Lunch
              </th>
              <th className="border-b border-r border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Booking hotel
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-sky-50">
                <td className="border-t border-r border-gray-200 px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-1 focus:ring-offset-0"
                  />
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td className="w-[260px] border-t border-r border-gray-200 px-4 py-3 align-top text-sm text-gray-900 leading-snug whitespace-normal">
                  {b.passenger}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {b.date}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {b.time}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {b.pickupTime}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700">
                  {b.from}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700">
                  {b.to}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {b.lunch}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {b.bookingHotel}
                </td>
                <td className="border-t border-r border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  ...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-600">
        <p>Showing 1 to {bookings.length} of {bookings.length} entries</p>
        <div className="inline-flex items-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-500">
            1
          </button>
        </div>
      </div>
    </>
  );
}


