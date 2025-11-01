import clsx from "clsx";

const severityStyles: Record<string, string> = {
  "On Time": "bg-emerald-100 text-emerald-700 border-emerald-200",
  Delayed: "bg-amber-100 text-amber-700 border-amber-200",
  Boarding: "bg-sky-100 text-sky-700 border-sky-200",
  Cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  Info: "bg-sky-100 text-sky-700 border-sky-200",
  Warning: "bg-amber-100 text-amber-700 border-amber-200",
  Critical: "bg-rose-100 text-rose-700 border-rose-200",
  "High priority": "bg-rose-100 text-rose-700 border-rose-200",
  "Medium priority": "bg-amber-100 text-amber-700 border-amber-200",
  "Low priority": "bg-emerald-100 text-emerald-700 border-emerald-200",
  default: "bg-slate-100 text-slate-700 border-slate-200",
};

export type StatusBadgeProps = {
  label: string;
  size?: "sm" | "md";
};

export function StatusBadge({ label, size = "md" }: StatusBadgeProps) {
  const style = severityStyles[label] ?? severityStyles.default;
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        style,
      )}
    >
      {label}
    </span>
  );
}
