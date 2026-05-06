import { useMemo, useState } from "react";
import { ArrowUpDown, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Guest, EventName } from "@/lib/dashboardData";
import { EVENT_OPTIONS } from "@/lib/dashboardData";

interface Props {
  guests: Guest[];
  search: string;
  filterEvent: EventName | "All";
  onEdit: (g: Guest) => void;
  onDelete: (id: string) => void;
  onBulkAssign: (ids: string[], event: EventName) => void;
}

type SortKey = "name" | "email" | "familySize" | "rsvp";

export function GuestTable({ guests, search, filterEvent, onEdit, onDelete, onBulkAssign }: Props) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const pageSize = 8;

  const filtered = useMemo(() => {
    return guests
      .filter((g) => (filterEvent === "All" ? true : g.events.includes(filterEvent)))
      .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const av = a[sort.key], bv = b[sort.key];
        const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
        return sort.dir === "asc" ? cmp : -cmp;
      });
  }, [guests, search, filterEvent, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleAll = () => {
    const all = new Set(selected);
    if (pageRows.every((r) => all.has(r.id))) pageRows.forEach((r) => all.delete(r.id));
    else pageRows.forEach((r) => all.add(r.id));
    setSelected(all);
  };
  const toggle = (id: string) => {
    const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s);
  };
  const setSortKey = (key: SortKey) =>
    setSort((p) => ({ key, dir: p.key === key && p.dir === "asc" ? "desc" : "asc" }));

  const rsvpBadge = (s: Guest["rsvp"]) => {
    const styles = { Attending: "bg-accent/15 text-accent", Declined: "bg-destructive/15 text-destructive", Pending: "bg-muted text-muted-foreground" };
    return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[s]}`}>{s}</span>;
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-white shadow-sm">
      {selected.size > 0 && (
        <div className="flex items-center justify-between border-b border-border/60 bg-primary/5 px-4 py-2.5 text-sm">
          <span>{selected.size} selected</span>
          <div className="flex items-center gap-2">
            <select onChange={(e) => { onBulkAssign([...selected], e.target.value as EventName); setSelected(new Set()); e.currentTarget.value = ""; }} className="rounded-lg border border-border bg-white px-2 py-1 text-xs" defaultValue="">
              <option value="" disabled>Assign event…</option>
              {EVENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <button onClick={() => setSelected(new Set())} className="text-xs text-muted-foreground hover:text-charcoal">Clear</button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/50">
              <th className="w-10 px-4 py-3"><input type="checkbox" checked={pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))} onChange={toggleAll} /></th>
              {([
                ["name", "Name"], ["email", "Email"], ["familySize", "Family"],
              ] as [SortKey, string][]).map(([k, l]) => (
                <th key={k} className="px-4 py-3 text-left font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button onClick={() => setSortKey(k)} className="inline-flex items-center gap-1 hover:text-charcoal">
                    {l} <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-left font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">Events</th>
              <th className="px-4 py-3 text-left font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <button onClick={() => setSortKey("rsvp")} className="inline-flex items-center gap-1 hover:text-charcoal">RSVP <ArrowUpDown className="h-3 w-3" /></button>
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {pageRows.map((g, i) => (
              <tr key={g.id} className={`border-b border-border/40 ${i % 2 ? "bg-muted/20" : ""}`}>
                <td className="px-4 py-3"><input type="checkbox" checked={selected.has(g.id)} onChange={() => toggle(g.id)} /></td>
                <td className="px-4 py-3 font-medium text-charcoal">{g.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{g.email}</td>
                <td className="px-4 py-3">{g.familySize}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{g.events.join(", ")}</td>
                <td className="px-4 py-3">{rsvpBadge(g.rsvp)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onEdit(g)} className="rounded-lg p-1.5 hover:bg-muted"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => onDelete(g.id)} className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">No guests yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 text-xs">
        <span className="text-muted-foreground">Showing {pageRows.length} of {filtered.length}</span>
        <div className="flex items-center gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-border p-1.5 disabled:opacity-30"><ChevronLeft className="h-3.5 w-3.5" /></button>
          <span>Page {page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-border p-1.5 disabled:opacity-30"><ChevronRight className="h-3.5 w-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
