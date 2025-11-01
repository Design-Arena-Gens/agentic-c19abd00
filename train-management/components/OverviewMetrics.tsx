import { Train, MaintenanceTask } from "@/lib/data";
import { MetricCard } from "./MetricCard";

interface OverviewMetricsProps {
  trains: Train[];
  maintenanceTasks: MaintenanceTask[];
}

export function OverviewMetrics({ trains, maintenanceTasks }: OverviewMetricsProps) {
  const onTime = trains.filter((train) => train.status === "On Time").length;
  const delayed = trains.filter((train) => train.status === "Delayed").length;
  const boarding = trains.filter((train) => train.status === "Boarding").length;
  const cancelled = trains.filter((train) => train.status === "Cancelled").length;
  const totalCapacity = trains.reduce((acc, train) => acc + train.capacity, 0);
  const totalOccupancy = trains.reduce((acc, train) => acc + train.occupancy, 0);
  const networkLoad = totalCapacity ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;
  const activeMaintenance = maintenanceTasks.filter((task) => task.status !== "Completed").length;

  const onTimeRate = trains.length ? Math.round((onTime / trains.length) * 100) : 0;

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <MetricCard
        label="On-time departures"
        value={`${onTimeRate}%`}
        trend={delayed === 0 ? "up" : "down"}
        change={delayed === 0 ? "+0 delays" : `-${delayed} delays`}
        caption={`${onTime} of ${trains.length} departures rolling hour`}
      />
      <MetricCard
        label="Network load"
        value={`${networkLoad}%`}
        trend={networkLoad > 80 ? "down" : "up"}
        caption={`${totalOccupancy.toLocaleString()} riders on ${totalCapacity.toLocaleString()} seats`}
      />
      <MetricCard
        label="Boarding now"
        value={`${boarding}`}
        trend="flat"
        change={cancelled ? `${cancelled} cancelled` : undefined}
        caption="Trains with open doors"
      />
      <MetricCard
        label="Active maintenance"
        value={`${activeMaintenance}`}
        trend="flat"
        caption={`${maintenanceTasks.length} total tasks this week`}
      />
    </div>
  );
}
