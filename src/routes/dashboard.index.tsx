import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Users, Calendar, ClipboardCheck, Plus, ArrowRight } from "lucide-react";
import { useDashboard } from "@/lib/dashboardData";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { weddings, user } = useDashboard();
  const totalGuests = weddings.reduce((s, w) => s + w.guests.length, 0);
  const totalRsvp = weddings.reduce((s, w) => s + w.guests.filter((g) => g.rsvp === "Attending").length, 0);
  const upcoming = weddings.filter((w) => new Date(w.date) > new Date()).length;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Welcome back, <span className="text-gradient">{user.name.split(" ")[0]}</span>!</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what's happening with your celebrations.</p>
        </div>
        <Link to="/dashboard/weddings/new" className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-luxe hover:scale-105 transition">
          <Plus className="h-4 w-4" /> Create New Wedding
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Heart} label="Total Weddings" value={weddings.length} index={0} />
        <StatCard icon={Users} label="Total Guests" value={totalGuests} index={1} />
        <StatCard icon={ClipboardCheck} label="Total RSVPs" value={totalRsvp} hint="Attending" index={2} />
        <StatCard icon={Calendar} label="Upcoming Events" value={upcoming} index={3} />
      </div>

      <div className="mt-10 rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent weddings</h2>
          <Link to="/dashboard/weddings" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="mt-4 divide-y divide-border/60">
          {weddings.slice(0, 5).map((w) => (
            <Link key={w.id} to="/dashboard/weddings/$id" params={{ id: w.id }} className="flex items-center justify-between py-3 transition hover:bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-white">
                  {w.bride[0]}{w.groom[0]}
                </div>
                <div>
                  <div className="font-semibold">{w.bride} & {w.groom}</div>
                  <div className="text-xs text-muted-foreground">{w.date} · {w.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-muted-foreground md:block">{w.guests.length} guests</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${w.published ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"}`}>{w.published ? "Live" : "Draft"}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
