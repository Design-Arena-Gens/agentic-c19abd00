interface MetricCardProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "flat";
  change?: string;
  caption?: string;
}

const trendStyles = {
  up: "text-emerald-600",
  down: "text-rose-600",
  flat: "text-slate-500",
} as const;

const trendIcon = {
  up: "▲",
  down: "▼",
  flat: "■",
} as const;

export function MetricCard({ label, value, trend = "flat", change, caption }: MetricCardProps) {
  return (
    <article className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-3xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/50">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{value}</span>
        {change ? (
          <span className={"text-sm font-medium " + trendStyles[trend]}>
            {trendIcon[trend]} {change}
          </span>
        ) : null}
      </div>
      {caption ? <p className="text-xs text-slate-500 dark:text-slate-400">{caption}</p> : null}
    </article>
  );
}
