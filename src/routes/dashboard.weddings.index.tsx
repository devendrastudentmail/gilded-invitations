import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Users, Calendar, MapPin } from "lucide-react";
import { useDashboard } from "@/lib/dashboardData";

export const Route = createFileRoute("/dashboard/weddings/")({
  component: WeddingsList,
});

function WeddingsList() {
  const { weddings } = useDashboard();
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">My Weddings</h1>
          <p className="mt-1 text-sm text-muted-foreground">{weddings.length} celebrations and counting.</p>
        </div>
        <Link to="/dashboard/weddings/new" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-luxe hover:scale-105 transition">
          <Plus className="h-4 w-4" /> New Wedding
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {weddings.map((w) => (
          <Link key={w.id} to="/dashboard/weddings/$id" params={{ id: w.id }} className="group overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition hover:shadow-luxe">
            <div className="flex aspect-[16/9] items-center justify-center bg-gradient-primary text-white">
              <div className="text-center">
                <p className="font-accent text-[10px] uppercase tracking-[0.3em] opacity-80">{w.theme}</p>
                <p className="mt-1 font-display text-2xl italic">{w.bride} & {w.groom}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${w.published ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"}`}>{w.published ? "Live" : "Draft"}</span>
                <span className="font-accent text-xs uppercase tracking-wider text-muted-foreground">{w.theme}</span>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {w.date}</div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {w.location}</div>
                <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> {w.guests.length} guests</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
