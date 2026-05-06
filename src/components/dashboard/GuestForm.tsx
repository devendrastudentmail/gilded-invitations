import { useEffect, useState } from "react";
import { EVENT_OPTIONS, type EventName, type Guest, type RSVPStatus } from "@/lib/dashboardData";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  initial?: Guest | null;
  onClose: () => void;
  onSave: (g: Guest) => void;
}

export function GuestForm({ open, initial, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [familySize, setFamilySize] = useState(1);
  const [events, setEvents] = useState<EventName[]>(["Wedding"]);
  const [rsvp, setRsvp] = useState<RSVPStatus>("Pending");

  useEffect(() => {
    if (initial) {
      setName(initial.name); setEmail(initial.email); setPhone(initial.phone);
      setFamilySize(initial.familySize); setEvents(initial.events); setRsvp(initial.rsvp);
    } else {
      setName(""); setEmail(""); setPhone(""); setFamilySize(1); setEvents(["Wedding"]); setRsvp("Pending");
    }
  }, [initial, open]);

  if (!open) return null;

  const toggleEvent = (e: EventName) =>
    setEvents((p) => (p.includes(e) ? p.filter((x) => x !== e) : [...p, e]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-luxe">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold">{initial ? "Edit guest" : "Add guest"}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-5 space-y-3">
          <Input label="Name" value={name} onChange={setName} />
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input label="Phone" value={phone} onChange={setPhone} />
          <label className="block">
            <span className="font-accent text-xs font-semibold uppercase tracking-wider text-charcoal/70">Family size</span>
            <input type="number" min={1} value={familySize} onChange={(e) => setFamilySize(parseInt(e.target.value) || 1)} className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>
          <div>
            <span className="font-accent text-xs font-semibold uppercase tracking-wider text-charcoal/70">Events</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {EVENT_OPTIONS.map((e) => {
                const on = events.includes(e);
                return (
                  <button key={e} type="button" onClick={() => toggleEvent(e)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${on ? "bg-gradient-primary text-white" : "bg-muted text-charcoal hover:bg-muted/70"}`}>
                    {e}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="block">
            <span className="font-accent text-xs font-semibold uppercase tracking-wider text-charcoal/70">RSVP</span>
            <select value={rsvp} onChange={(e) => setRsvp(e.target.value as RSVPStatus)} className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm">
              <option>Pending</option><option>Attending</option><option>Declined</option>
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">Cancel</button>
          <button
            onClick={() => onSave({ id: initial?.id || `g-${Date.now()}`, name, email, phone, familySize, events, rsvp })}
            className="rounded-full bg-gradient-primary px-6 py-2 text-sm font-semibold text-white shadow-luxe hover:scale-105 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="font-accent text-xs font-semibold uppercase tracking-wider text-charcoal/70">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}
