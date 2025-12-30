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
  Completed: "bg-emerald-700 text-white",
  Pending: "bg-amber-700 text-white",
  Canceled: "bg-rose-700 text-white",
  InProgress: "bg-sky-700 text-white",
  Rejected: "bg-red-700 text-white",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-gray-900 text-white border-gray-900";

  return (
    <span
      className={`inline-flex min-w-[96px] items-center justify-center rounded border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}


