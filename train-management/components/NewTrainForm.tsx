"use client";

import { FormEvent, useState } from "react";
import { Train, TrainStatus } from "@/lib/data";
import { SectionCard } from "./SectionCard";

interface NewTrainFormProps {
  onCreate: (train: Train) => void;
}

const defaultForm = {
  name: "",
  code: "",
  origin: "",
  destination: "",
  departureTime: "",
  arrivalTime: "",
  status: "On Time" as TrainStatus,
  occupancy: 0,
  capacity: 320,
  platform: 1,
  track: "A1",
  conductor: "",
  engineer: "",
  notes: "",
};

let counter = 600;

export function NewTrainForm({ onCreate }: NewTrainFormProps) {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = field === "capacity" || field === "occupancy" || field === "platform" ? Number(event.target.value) : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.code || !form.origin || !form.destination) return;

    const id = `t-${counter++}`;
    onCreate({
      id,
      ...form,
    });
    setForm({ ...defaultForm });
  };

  return (
    <SectionCard
      title="Plan Special Service"
      description="Slot charter, event, or weather-response services directly into the active board."
    >
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Train name</label>
          <input
            required
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Sunrise Shuttle"
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Code</label>
          <input
            required
            value={form.code}
            onChange={handleChange("code")}
            placeholder="SUN-512"
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Origin</label>
          <input
            required
            value={form.origin}
            onChange={handleChange("origin")}
            placeholder="Union Station"
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Destination</label>
          <input
            required
            value={form.destination}
            onChange={handleChange("destination")}
            placeholder="Harborfront"
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Departure</label>
          <input
            required
            type="time"
            value={form.departureTime}
            onChange={handleChange("departureTime")}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Arrival</label>
          <input
            required
            type="time"
            value={form.arrivalTime}
            onChange={handleChange("arrivalTime")}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label>
          <select
            value={form.status}
            onChange={handleChange("status")}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Boarding">Boarding</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Capacity</label>
          <input
            type="number"
            min={100}
            max={1200}
            value={form.capacity}
            onChange={handleChange("capacity")}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Initial Occupancy</label>
          <input
            type="number"
            min={0}
            max={form.capacity}
            value={form.occupancy}
            onChange={handleChange("occupancy")}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Platform</label>
          <input
            type="number"
            min={1}
            max={20}
            value={form.platform}
            onChange={handleChange("platform")}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Track</label>
          <input
            value={form.track}
            onChange={handleChange("track")}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conductor</label>
          <input
            value={form.conductor}
            onChange={handleChange("conductor")}
            placeholder="A. Patel"
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Engineer</label>
          <input
            value={form.engineer}
            onChange={handleChange("engineer")}
            placeholder="L. Edwards"
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</label>
          <input
            value={form.notes}
            onChange={handleChange("notes")}
            placeholder="Add rider messaging or crew reminders"
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
          >
            Publish to live board
          </button>
        </div>
      </form>
    </SectionCard>
  );
}
