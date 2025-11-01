import { serviceAlerts } from "@/lib/data";
import { SectionCard } from "./SectionCard";
import { StatusBadge } from "./StatusBadge";

export function ServiceAlerts() {
  return (
    <SectionCard
      title="Service Alerts"
      description="Mobile-optimized incident feed keeps customer care aligned with operations."
    >
      <div className="flex flex-col gap-3">
        {serviceAlerts.map((alert) => (
          <article
            key={alert.id}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200/60 bg-white/70 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{alert.title}</h3>
              <StatusBadge label={alert.severity} size="sm" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{alert.description}</p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <span>
                From {new Date(alert.effectiveFrom).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </span>
              {alert.effectiveTo ? (
                <span>
                  To {new Date(alert.effectiveTo).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
