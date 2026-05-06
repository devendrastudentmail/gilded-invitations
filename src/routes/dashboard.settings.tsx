import { createFileRoute } from "@tanstack/react-router";
import { useDashboard } from "@/lib/dashboardData";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Settings() {
  const { user } = useDashboard();
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences.</p>
      <div className="mt-8 space-y-4 rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
        <Field label="Name" value={user.name} />
        <Field label="Email" value={user.email} />
        <Field label="Plan" value="Premium · ₹4,999" />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input defaultValue={value} className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}
