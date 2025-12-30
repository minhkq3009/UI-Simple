export type BookingStatus =
  | "Completed"
  | "Pending"
  | "Canceled"
  | "InProgress"
  | "Rejected";

type StatusBadgeProps = {
  status: BookingStatus;
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Canceled: "bg-rose-100 text-rose-700 border-rose-200",
  InProgress: "bg-sky-100 text-sky-700 border-sky-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex min-w-[96px] items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}


