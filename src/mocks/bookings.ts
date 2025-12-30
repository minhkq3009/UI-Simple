import { BookingStatus } from "@/components/ui/StatusBadge";

export type Booking = {
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

// Mock data tạm thời, sau này thay bằng dữ liệu lấy từ API/DB
export const MOCK_BOOKINGS: Booking[] = [
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
  {
    id: 2,
    passenger: "Sample Passenger A",
    date: "2025/07/12",
    time: "16:23",
    pickupTime: "16:00",
    from: "Minh Duc Hotel",
    to: "49/01/100 Yên Trường, Quảng Thắng",
    lunch: "No",
    bookingHotel: "No",
    status: "InProgress",
  },
  {
    id: 3,
    passenger: "Sample Passenger B",
    date: "2025/07/12",
    time: "16:25",
    pickupTime: "16:10",
    from: "TSN AP T3 (Domestic)",
    to: "Hoang Long Motel",
    lunch: "No",
    bookingHotel: "No",
    status: "Pending",
  },
];


