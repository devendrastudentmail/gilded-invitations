import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Plus, Search, Upload } from "lucide-react";
import { useDashboard, EVENT_OPTIONS, type EventName, type Guest } from "@/lib/dashboardData";
import { GuestTable } from "@/components/dashboard/GuestTable";
import { GuestForm } from "@/components/dashboard/GuestForm";
import { GuestUploader } from "@/components/dashboard/GuestUploader";

export const Route = createFileRoute("/dashboard/weddings/$id/guests")({
  component: GuestsPage,
});

function GuestsPage() {
  const { id } = Route.useParams();
  const { weddings, addGuests, upsertGuest, removeGuest } = useDashboard();
  const w = weddings.find((x) => x.id === id);
  if (!w) throw notFound();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<EventName | "All">("All");
  const [editing, setEditing] = useState<Guest | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const openAdd = () => { setEditing(null); setShowForm(true); };
  const openEdit = (g: Guest) => { setEditing(g); setShowForm(true); };

  return (
    <div className="mx-auto max-w-6xl">
      <Link to="/dashboard/weddings/$id" params={{ id }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to {w.bride} & {w.groom}
      </Link>
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Guest list</h1>
          <p className="mt-1 text-sm text-muted-foreground">{w.guests.length} guests · {w.guests.filter((g) => g.rsvp === "Attending").length} attending</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowUpload(true)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-muted">
            <Upload className="h-4 w-4" /> Upload CSV
          </button>
          <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-luxe hover:scale-105 transition">
            <Plus className="h-4 w-4" /> Add Guest
          </button>
        </div>
      </div>

      {showUpload && (
        <div className="mt-6">
          <GuestUploader
            onConfirm={(g) => { addGuests(id, g); setShowUpload(false); }}
            onCancel={() => setShowUpload(false)}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email…" className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as EventName | "All")} className="rounded-full border border-border bg-white px-4 py-2.5 text-sm">
          <option value="All">All events</option>
          {EVENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="mt-5">
        <GuestTable
          guests={w.guests}
          search={search}
          filterEvent={filter}
          onEdit={openEdit}
          onDelete={(gid) => removeGuest(id, gid)}
          onBulkAssign={(ids, ev) => {
            ids.forEach((gid) => {
              const g = w.guests.find((x) => x.id === gid);
              if (g && !g.events.includes(ev)) upsertGuest(id, { ...g, events: [...g.events, ev] });
            });
          }}
        />
      </div>

      <GuestForm
        open={showForm}
        initial={editing}
        onClose={() => setShowForm(false)}
        onSave={(g) => { upsertGuest(id, g); setShowForm(false); }}
      />
    </div>
  );
}
