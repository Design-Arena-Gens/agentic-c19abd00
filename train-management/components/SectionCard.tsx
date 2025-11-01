import { ReactNode } from "react";
import clsx from "clsx";

interface SectionCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={clsx(
        "flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/50",
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
          ) : null}
        </div>
        {action ? <div className="w-full max-w-fit sm:w-auto">{action}</div> : null}
      </header>
      {children}
    </section>
  );
}
