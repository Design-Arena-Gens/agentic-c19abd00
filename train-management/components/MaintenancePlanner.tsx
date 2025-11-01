"use client";

import { useMemo, useState } from "react";
import { MaintenanceTask, trains } from "@/lib/data";
import { SectionCard } from "./SectionCard";
import { StatusBadge } from "./StatusBadge";

const statusOrder: MaintenanceTask["status"][] = ["Scheduled", "In Progress", "Completed"];

interface MaintenancePlannerProps {
  tasks: MaintenanceTask[];
  onStatusChange: (id: string, status: MaintenanceTask["status"]) => void;
}

export function MaintenancePlanner({ tasks, onStatusChange }: MaintenancePlannerProps) {
  const [filter, setFilter] = useState<MaintenanceTask["status"] | "All">("All");

  const grouped = useMemo(() => {
    return statusOrder.reduce((acc, status) => {
      const items = tasks.filter((task) => (filter === "All" ? true : task.status === filter) && task.status === status);
      acc[status] = items;
      return acc;
    }, {} as Record<MaintenanceTask["status"], MaintenanceTask[]>);
  }, [tasks, filter]);

  return (
    <SectionCard
      title="Maintenance Planner"
      description="Coordinate rolling stock upkeep, inspections, and refits. Drag-friendly grid adapts beautifully on tablets."
      action={
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as MaintenanceTask["status"] | "All")}
          className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <option value="All">All statuses</option>
          {statusOrder.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {statusOrder.map((status) => (
          <div
            key={status}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800/60 dark:bg-slate-900/30"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{status}</h3>
              <span className="text-xs text-slate-500">{grouped[status]?.length ?? 0} tasks</span>
            </div>
            {(grouped[status] ?? []).map((task) => {
              const train = trains.find((item) => item.id === task.trainId);
              return (
                <div
                  key={task.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-800/60 dark:bg-slate-950/50"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{task.title}</p>
                      <p className="text-xs text-slate-500">
                        {train?.code ?? task.trainId} • Supervisor {task.supervisor}
                      </p>
                    </div>
                    <StatusBadge label={task.priority + " priority"} size="sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <p>Type: {task.type}</p>
                    <p>Due {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {statusOrder.map((value) => (
                      <button
                        key={value}
                        onClick={() => onStatusChange(task.id, value)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          value === task.status
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Mark {value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
