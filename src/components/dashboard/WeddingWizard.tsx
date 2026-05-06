import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Plus, Trash2, Calendar, MapPin } from "lucide-react";
import { useDashboard, EVENT_OPTIONS, THEMES, type Theme, type WeddingEvent } from "@/lib/dashboardData";

const STEPS = ["Couple", "Theme", "Events", "Preview"];

export function WeddingWizard() {
  const navigate = useNavigate();
  const { addWedding } = useDashboard();
  const [step, setStep] = useState(0);
  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState<Theme>("Royal");
  const [events, setEvents] = useState<WeddingEvent[]>([]);
  const [draft, setDraft] = useState<Omit<WeddingEvent, "id">>({ name: "Haldi", date: "", time: "", location: "" });

  const addEvent = () => {
    if (!draft.name || !draft.date) return;
    setEvents((p) => [...p, { ...draft, id: `e-${Date.now()}` }]);
    setDraft({ name: "Haldi", date: "", time: "", location: "" });
  };
  const removeEvent = (id: string) => setEvents((p) => p.filter((e) => e.id !== id));

  const canNext = [
    bride && groom && date && location,
    !!theme,
    events.length > 0,
    true,
  ][step];

  const publish = () => {
    const id = addWedding({ bride, groom, date, location, theme, events, guests: [], published: true });
    navigate({ to: "/dashboard/weddings/$id", params: { id } });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center gap-3">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${i <= step ? "bg-gradient-primary text-white" : "bg-muted text-muted-foreground"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`hidden text-sm font-medium md:block ${i === step ? "text-charcoal" : "text-muted-foreground"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-gradient-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm md:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold">Couple details</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us about the celebration.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Field label="Bride name" value={bride} onChange={setBride} placeholder="Bhumika" />
                  <Field label="Groom name" value={groom} onChange={setGroom} placeholder="Divik" />
                  <Field label="Wedding date" type="date" value={date} onChange={setDate} />
                  <Field label="Wedding location" value={location} onChange={setLocation} placeholder="Jaipur, Rajasthan" />
                </div>
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold">Choose a theme</h2>
                <p className="mt-1 text-sm text-muted-foreground">Set the mood with a curated palette.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {(Object.keys(THEMES) as Theme[]).map((t) => {
                    const meta = THEMES[t];
                    const active = theme === t;
                    return (
                      <button key={t} onClick={() => setTheme(t)} className={`rounded-2xl border p-5 text-left transition ${active ? "border-primary ring-2 ring-primary/30 shadow-luxe" : "border-border hover:border-primary/40"}`}>
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-xl font-semibold">{t}</h3>
                          {active && <Check className="h-5 w-5 text-primary" />}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{meta.tagline}</p>
                        <div className="mt-4 flex gap-2">
                          {meta.colors.map((c) => <div key={c} className="h-8 w-8 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />)}
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">Font: {meta.font}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-bold">Add events</h2>
                <p className="mt-1 text-sm text-muted-foreground">Haldi, Mehendi, Sangeet, Wedding, Reception — your call.</p>
                <div className="mt-6 grid gap-3 rounded-2xl bg-muted p-4 md:grid-cols-5">
                  <select value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="rounded-lg border border-border bg-white px-3 py-2 text-sm">
                    {EVENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} className="rounded-lg border border-border bg-white px-3 py-2 text-sm" />
                  <input type="time" value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} className="rounded-lg border border-border bg-white px-3 py-2 text-sm" />
                  <input placeholder="Location" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} className="rounded-lg border border-border bg-white px-3 py-2 text-sm md:col-span-1" />
                  <button onClick={addEvent} className="inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white">
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
                <div className="mt-5 space-y-2">
                  {events.length === 0 && <p className="rounded-lg bg-muted/50 p-6 text-center text-sm text-muted-foreground">No events yet. Add one above.</p>}
                  {events.map((e) => (
                    <div key={e.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-3 px-4">
                      <div>
                        <div className="font-semibold">{e.name}</div>
                        <div className="text-xs text-muted-foreground">{e.date} · {e.time} · {e.location}</div>
                      </div>
                      <button onClick={() => removeEvent(e.id)} className="rounded-lg p-2 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-bold">Preview & publish</h2>
                <p className="mt-1 text-sm text-muted-foreground">Looking lovely. Review before going live.</p>
                <div className="mt-6 overflow-hidden rounded-2xl shadow-luxe" style={{ background: `linear-gradient(135deg, ${THEMES[theme].colors[0]}, ${THEMES[theme].colors[1]})` }}>
                  <div className="px-8 py-12 text-center text-white">
                    <p className="font-accent text-xs uppercase tracking-[0.3em] opacity-80">You're invited to</p>
                    <h3 className="mt-3 font-display text-4xl italic md:text-5xl">{bride || "Bride"} <span className="opacity-70">weds</span> {groom || "Groom"}</h3>
                    <div className="mx-auto mt-4 h-px w-24 bg-white/40" />
                    <p className="mt-4 inline-flex items-center gap-1 font-accent text-sm"><Calendar className="h-3.5 w-3.5" /> {date}</p>
                    <p className="mt-1 inline-flex items-center gap-1 font-accent text-sm"><MapPin className="h-3.5 w-3.5" /> {location}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-muted p-4">
                    <p className="font-accent text-xs uppercase tracking-wider text-muted-foreground">Theme</p>
                    <p className="mt-1 font-semibold">{theme}</p>
                  </div>
                  <div className="rounded-xl bg-muted p-4">
                    <p className="font-accent text-xs uppercase tracking-wider text-muted-foreground">Events</p>
                    <p className="mt-1 font-semibold">{events.map((e) => e.name).join(" · ") || "None"}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
          {step > 0 ? (
            <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <Link to="/dashboard/weddings" className="inline-flex items-center gap-1 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">Cancel</Link>
          )}
          {step < STEPS.length - 1 ? (
            <button disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-luxe transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100">
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={publish} className="rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground shadow-luxe hover:scale-105 transition">
              Publish wedding
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="font-accent text-xs font-semibold uppercase tracking-wider text-charcoal/70">{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}
