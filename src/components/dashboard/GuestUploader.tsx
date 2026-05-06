import { useRef, useState } from "react";
import Papa from "papaparse";
import { Upload, FileText, X } from "lucide-react";
import { EVENT_OPTIONS, type EventName, type Guest, type RSVPStatus } from "@/lib/dashboardData";

interface Props {
  onConfirm: (guests: Guest[]) => void;
  onCancel: () => void;
}

export function GuestUploader({ onConfirm, onCancel }: Props) {
  const [rows, setRows] = useState<Guest[] | null>(null);
  const [filename, setFilename] = useState("");
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFilename(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const parsed: Guest[] = (res.data as Record<string, string>[]).map((r, i) => {
          const evs = (r.Events || "").split(/[,;|]/).map((s) => s.trim()).filter((e) => EVENT_OPTIONS.includes(e as EventName)) as EventName[];
          return {
            id: `csv-${Date.now()}-${i}`,
            name: r.Name || "Unnamed",
            email: r.Email || "",
            phone: r.Phone || "",
            familySize: parseInt(r["Family Size"] || r.FamilySize || "1", 10) || 1,
            events: evs.length ? evs : ["Wedding"],
            rsvp: "Pending" as RSVPStatus,
          };
        });
        setRows(parsed);
      },
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      {!rows ? (
        <>
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition ${drag ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-white">
              <Upload className="h-5 w-5" />
            </div>
            <p className="mt-4 font-semibold text-charcoal">Drag & drop your CSV here</p>
            <p className="mt-1 text-xs text-muted-foreground">or click to browse · Columns: Name, Email, Phone, Family Size, Events</p>
            <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={onCancel} className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{filename}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{rows.length} rows</span>
            </div>
            <button onClick={() => setRows(null)} className="rounded-lg p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-4 max-h-72 overflow-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  {["Name", "Email", "Family", "Events"].map((h) => <th key={h} className="px-3 py-2 text-left font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 50).map((r, i) => (
                  <tr key={r.id} className={i % 2 ? "bg-muted/30" : ""}>
                    <td className="px-3 py-2">{r.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{r.email}</td>
                    <td className="px-3 py-2">{r.familySize}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{r.events.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={onCancel} className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">Cancel</button>
            <button onClick={() => onConfirm(rows)} className="rounded-full bg-gradient-primary px-6 py-2 text-sm font-semibold text-white shadow-luxe hover:scale-105 transition">
              Import {rows.length} guests
            </button>
          </div>
        </>
      )}
    </div>
  );
}
