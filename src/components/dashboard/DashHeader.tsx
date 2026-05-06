import { Bell, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "@/lib/dashboardData";
import { Link } from "@tanstack/react-router";

export function DashHeader() {
  const { user } = useDashboard();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-border/60 bg-white/70 px-4 backdrop-blur md:px-8">
      <div className="md:hidden">
        <Link to="/dashboard" className="font-display font-bold">Hindu<span className="text-gradient">Invites</span></Link>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary" />
        </button>
        <div className="relative">
          <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 rounded-full bg-muted px-2 py-1.5 pr-3 hover:bg-muted/70">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="hidden text-sm font-medium md:block">{user.name}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-white p-1 shadow-luxe">
              <div className="px-3 py-2 text-xs text-muted-foreground">{user.email}</div>
              <Link to="/dashboard/settings" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted">Settings</Link>
              <Link to="/auth/login" className="block rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
