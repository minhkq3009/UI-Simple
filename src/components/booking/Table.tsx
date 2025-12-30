import { BookingToolbar } from "./BookingToolbar";
import { StatusBadge, BookingStatus } from "./StatusBadge";

type Booking = {
  id: number;
  passenger: string;
  date: string;
  time: string;
  pickupTime: string;
  from: string;
  to: string;
  lunch: string;
  bookingHotel: string;
  status: BookingStatus;
};

const mockBookings: Booking[] = [
  {
    id: 1,
    passenger:
      "Suzuma, Takayuki/THKVN(VN)/鈴間 貴幸(Technical Dept. General Manager)",
    date: "2025/07/12",
    time: "14:35",
    pickupTime: "14:35",
    from: "Minh Duc Hotel",
    to: "Nhà Văn Hóa Thôn Xuân Phú - Xã Hoằng Xuân",
    lunch: "No",
    bookingHotel: "No",
    status: "Completed",
  },
];

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
  const bookings = mockBookings; // replace with API data later

  if (bookings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <BookingToolbar />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#0c6c96] text-white">
            <tr>
              <th className="w-10 border-b border-[#0b5b7e] px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/60 text-sky-500 focus:ring-1 focus:ring-offset-0"
                />
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Status
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Passenger
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Date
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Time
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Pickup Time
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                From
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                To
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Lunch
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Booking hotel
              </th>
              <th className="border-b border-[#0b5b7e] px-4 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-sky-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-1 focus:ring-offset-0"
                  />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3 align-top text-xs text-gray-900">
                  {b.passenger}
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">{b.date}</td>
                <td className="px-4 py-3 text-xs text-gray-700">{b.time}</td>
                <td className="px-4 py-3 text-xs text-gray-700">
                  {b.pickupTime}
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">{b.from}</td>
                <td className="px-4 py-3 text-xs text-gray-700">{b.to}</td>
                <td className="px-4 py-3 text-xs text-gray-700">{b.lunch}</td>
                <td className="px-4 py-3 text-xs text-gray-700">
                  {b.bookingHotel}
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-600">
        <p>Showing 1 to {mockBookings.length} of {mockBookings.length} entries</p>
        <div className="inline-flex items-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-500">
            1
          </button>
        </div>
      </div>
    </div>
  );
}


