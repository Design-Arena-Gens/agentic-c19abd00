import { crew } from "@/lib/data";
import { SectionCard } from "./SectionCard";

export function CrewRoster() {
  return (
    <SectionCard
      title="Crew Availability"
      description="At-a-glance staffing view for dispatchers. Tap a crew member to see contact info on mobile."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {crew.map((member) => (
          <article
            key={member.id}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-4 transition hover:border-emerald-400 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  member.status === "On Duty"
                    ? "bg-emerald-100 text-emerald-700"
                    : member.status === "Standby"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {member.status}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {member.assignedTrain ? `Assigned to ${member.assignedTrain}` : "Not assigned"}
            </p>
            <a
              href={`mailto:${member.contact}`}
              className="text-sm font-medium text-emerald-600 underline-offset-2 hover:underline"
            >
              {member.contact}
            </a>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
