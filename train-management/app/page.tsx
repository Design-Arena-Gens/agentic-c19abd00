"use client";

import { useMemo, useState } from "react";
import {
  Train,
  TrainStatus,
  trains as initialTrains,
  maintenanceTasks as initialMaintenanceTasks,
  MaintenanceTask,
} from "@/lib/data";
import { OverviewMetrics } from "@/components/OverviewMetrics";
import { OperationsBoard } from "@/components/OperationsBoard";
import { MaintenancePlanner } from "@/components/MaintenancePlanner";
import { CrewRoster } from "@/components/CrewRoster";
import { ServiceAlerts } from "@/components/ServiceAlerts";
import { CorridorPlanner } from "@/components/CorridorPlanner";
import { NewTrainForm } from "@/components/NewTrainForm";

const views = [
  { key: "operations", label: "Operations" },
  { key: "maintenance", label: "Maintenance" },
  { key: "planning", label: "Planning" },
] as const;

type ViewKey = (typeof views)[number]["key"];

export default function Home() {
  const [activeView, setActiveView] = useState<ViewKey>("operations");
  const [trains, setTrains] = useState(initialTrains);
  const [tasks, setTasks] = useState(initialMaintenanceTasks);

  const statusSummary = useMemo(() => {
    const summary: Record<TrainStatus, number> = {
      "On Time": 0,
      Delayed: 0,
      Boarding: 0,
      Cancelled: 0,
    };
    trains.forEach((train) => {
      summary[train.status] += 1;
    });
    return summary;
  }, [trains]);

  const handleStatusChange = (id: string, status: TrainStatus) => {
    setTrains((prev) => prev.map((train) => (train.id === id ? { ...train, status } : train)));
  };

  const handleCreateTrain = (train: Train) => {
    setTrains((prev) => [{ ...train }, ...prev]);
  };

  const handleMaintenanceChange = (id: string, status: MaintenanceTask["status"]) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  return (
    <div className="flex flex-col gap-8 pb-8">
      <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-white to-white p-6 shadow-lg shadow-emerald-500/10 dark:border-emerald-500/20 dark:from-emerald-500/15 dark:via-slate-950 dark:to-slate-950">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              TransitCore Command Deck
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Manage trains, crews, and corridors from a single responsive workspace
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Built for dispatch centers and field supervisors alike. Quickly triage incidents, coordinate maintenance,
              and slot pop-up services while keeping riders informed in real time.
            </p>
          </div>
          <div className="grid w-full max-w-xs gap-2 rounded-3xl border border-white/60 bg-white/70 p-4 text-sm shadow-lg backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-200">
            <div className="flex items-center justify-between">
              <span>On time</span>
              <span className="font-semibold text-emerald-600">{statusSummary["On Time"]}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delayed</span>
              <span className="font-semibold text-amber-600">{statusSummary.Delayed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Boarding</span>
              <span className="font-semibold text-sky-600">{statusSummary.Boarding}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cancelled</span>
              <span className="font-semibold text-rose-600">{statusSummary.Cancelled}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-2 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60 lg:hidden">
        {views.map((view) => {
          const active = activeView === view.key;
          return (
            <button
              key={view.key}
              onClick={() => setActiveView(view.key)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {view.label}
            </button>
          );
        })}
      </div>

      <OverviewMetrics trains={trains} maintenanceTasks={tasks} />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className={`flex flex-col gap-6 lg:col-span-8 ${activeView === "operations" ? "" : "hidden lg:flex"}`}>
          <OperationsBoard trains={trains} onUpdateStatus={handleStatusChange} />
          <ServiceAlerts />
        </div>

        <div className={`flex flex-col gap-6 lg:col-span-4 ${activeView === "maintenance" ? "" : "hidden lg:flex"}`}>
          <MaintenancePlanner tasks={tasks} onStatusChange={handleMaintenanceChange} />
          <CrewRoster />
        </div>

        <div className={`flex flex-col gap-6 lg:col-span-12 ${activeView === "planning" ? "" : "hidden lg:flex"}`}>
          <NewTrainForm onCreate={handleCreateTrain} />
          <CorridorPlanner />
        </div>
      </div>
    </div>
  );
}
