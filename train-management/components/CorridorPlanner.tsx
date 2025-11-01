import { corridors } from "@/lib/data";
import { SectionCard } from "./SectionCard";

export function CorridorPlanner() {
  return (
    <SectionCard
      title="Corridor Planning"
      description="Plan corridor frequencies and service spans for upcoming timetables."
    >
      <div className="flex flex-col gap-3">
        {corridors.map((corridor) => (
          <article
            key={corridor.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-gradient-to-r from-white/80 to-slate-50/60 p-4 shadow-sm dark:border-slate-800/60 dark:from-slate-900/40 dark:to-slate-900/20"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{corridor.name}</h3>
                <p className="text-sm text-slate-500">Service hours {corridor.serviceHours}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-slate-500">Reliability</p>
                <p className={`text-xl font-semibold ${corridor.reliability >= 95 ? "text-emerald-600" : corridor.reliability >= 85 ? "text-amber-600" : "text-rose-600"}`}>
                  {corridor.reliability}%
                </p>
              </div>
            </div>
            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Peak:</span> {corridor.peakFrequency}
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Off-peak:</span> {corridor.offPeakFrequency}
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Target:</span> {corridor.reliability >= 95 ? "Excellent" : corridor.reliability >= 85 ? "Monitor" : "Needs action"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
