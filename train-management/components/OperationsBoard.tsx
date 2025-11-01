"use client";

import { useMemo, useState } from "react";
import { Train, TrainStatus } from "@/lib/data";
import { StatusBadge } from "./StatusBadge";
import { SectionCard } from "./SectionCard";

const filters: (TrainStatus | "All")[] = ["All", "On Time", "Delayed", "Boarding", "Cancelled"];

const statusActions: TrainStatus[] = ["On Time", "Delayed", "Boarding", "Cancelled"];

interface OperationsBoardProps {
  trains: Train[];
  onUpdateStatus: (id: string, status: TrainStatus) => void;
}

export function OperationsBoard({ trains, onUpdateStatus }: OperationsBoardProps) {
  const [selectedStatus, setSelectedStatus] = useState<(typeof filters)[number]>("All");
  const [search, setSearch] = useState("");

  const filteredTrains = useMemo(() => {
    return trains.filter((train) => {
      const matchesStatus = selectedStatus === "All" || train.status === selectedStatus;
      const matchesSearch = [train.name, train.code, train.origin, train.destination]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [trains, selectedStatus, search]);

  return (
    <SectionCard
      title="Live Operations"
      description="Monitor active trains, adjust dispatch status, and keep riders informed. Optimized for control room displays and on-call supervisors on mobile."
      action={
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by train, route, or station"
          className="w-full rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:w-64"
        />
      }
    >
      <div className="flex flex-wrap gap-2">
        {filters.map((status) => {
          const isSelected = selectedStatus === status;
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTrains.map((train) => {
          const occupancyPercent = Math.round((train.occupancy / train.capacity) * 100);
          const loadState =
            occupancyPercent >= 90 ? "bg-rose-500" : occupancyPercent >= 70 ? "bg-amber-500" : "bg-emerald-500";

          return (
            <div
              key={train.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{train.code}</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{train.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {train.origin} → {train.destination}
                  </p>
                </div>
                <StatusBadge label={train.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Departure</p>
                  <p className="text-slate-800 dark:text-slate-100">{train.departureTime}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Arrival</p>
                  <p className="text-slate-800 dark:text-slate-100">{train.arrivalTime}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Platform</p>
                  <p className="text-slate-800 dark:text-slate-100">{train.platform}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Track</p>
                  <p className="text-slate-800 dark:text-slate-100">{train.track}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Conductor</p>
                  <p className="text-slate-800 dark:text-slate-100">{train.conductor}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Engineer</p>
                  <p className="text-slate-800 dark:text-slate-100">{train.engineer}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-slate-600 dark:text-slate-400">Capacity usage</p>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{occupancyPercent}%</p>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${loadState}`} style={{ width: `${occupancyPercent}%` }} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {train.occupancy} of {train.capacity} seats occupied
                </p>
              </div>

              {train.notes ? (
                <p className="rounded-2xl bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">
                  {train.notes}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {statusActions.map((status) => (
                  <button
                    key={status}
                    onClick={() => onUpdateStatus(train.id, status)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      status === train.status
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Mark {status}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
