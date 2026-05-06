import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useDashboard, THEMES } from "@/lib/dashboardData";
import { Calendar, MapPin, Users, ArrowRight, Edit3 } from "lucide-react";

export const Route = createFileRoute("/dashboard/weddings/$id/")({
  component: WeddingDetail,
});

function WeddingDetail() {
  const { id } = Route.useParams();
  const { weddings } = useDashboard();
  const w = weddings.find((x) => x.id === id);
  if (!w) throw notFound();
  const theme = THEMES[w.theme];
  const attending = w.guests.filter((g) => g.rsvp === "Attending").length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-3xl shadow-luxe" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
        <div className="px-8 py-14 text-center text-white">
          <p className="font-accent text-xs uppercase tracking-[0.3em] opacity-80">You're invited to</p>
          <h1 className="mt-3 font-display text-4xl italic md:text-6xl">{w.bride} <span className="opacity-70">weds</span> {w.groom}</h1>
          <div className="mx-auto mt-4 h-px w-24 bg-white/40" />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{w.date}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{w.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat label="Theme" value={w.theme} />
        <Stat label="Guests" value={w.guests.length.toString()} />
        <Stat label="Attending" value={attending.toString()} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold">Events</h2>
          <div className="mt-4 space-y-2">
            {w.events.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
                <div>
                  <div className="font-semibold">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.date} · {e.time}</div>
                </div>
                <span className="text-xs text-muted-foreground">{e.location}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold">Manage</h2>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/dashboard/weddings/$id/guests" params={{ id: w.id }} className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 hover:border-primary">
              <span className="inline-flex items-center gap-2 font-semibold"><Users className="h-4 w-4" /> Guest list</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <button className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 hover:border-primary">
              <span className="inline-flex items-center gap-2 font-semibold"><Edit3 className="h-4 w-4" /> Edit invitation</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm">
      <div className="font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}
