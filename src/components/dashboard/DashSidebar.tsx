import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Heart, Settings, LogOut, Sparkles } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/weddings", label: "My Weddings", icon: Heart, exact: false },
  { to: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
];

export function DashSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden w-[220px] shrink-0 flex-col border-r border-border/60 bg-white/70 backdrop-blur md:flex">
      <Link to="/dashboard" className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-display text-lg font-bold">Hindu<span className="text-gradient">Invites</span></span>
      </Link>
      <nav className="mt-2 flex-1 space-y-1 px-3">
        {items.map((it) => {
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-gradient-primary text-white shadow-luxe" : "text-charcoal/70 hover:bg-muted"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <Link to="/auth/login" className="m-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal/70 hover:bg-destructive/10 hover:text-destructive">
        <LogOut className="h-4 w-4" />
        Logout
      </Link>
    </aside>
  );
}
