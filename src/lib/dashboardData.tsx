import { createContext, useContext, useState, type ReactNode } from "react";

export type EventName = "Haldi" | "Mehendi" | "Sangeet" | "Wedding" | "Reception";
export const EVENT_OPTIONS: EventName[] = ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"];
export type Theme = "Royal" | "Modern" | "Minimalist" | "Bohemian";
export type RSVPStatus = "Attending" | "Declined" | "Pending";

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  familySize: number;
  events: EventName[];
  rsvp: RSVPStatus;
}

export interface Wedding {
  id: string;
  bride: string;
  groom: string;
  date: string;
  location: string;
  theme: Theme;
  events: WeddingEvent[];
  guests: Guest[];
  published: boolean;
}

const FIRST = ["Aarav", "Vivaan", "Aditya", "Reyansh", "Krishna", "Ishaan", "Aryan", "Kabir", "Dhruv", "Rohan", "Anaya", "Diya", "Saanvi", "Aadhya", "Myra", "Ira", "Kiara", "Riya", "Zara", "Pari", "Aanya", "Vihaan", "Arjun", "Karthik", "Neha"];
const LAST = ["Sharma", "Verma", "Gupta", "Patel", "Iyer", "Kapoor", "Mehta", "Rao", "Nair", "Singh", "Chopra", "Reddy", "Bhatia", "Joshi", "Malhotra"];

function randomGuests(seed: number, n: number): Guest[] {
  const guests: Guest[] = [];
  const statuses: RSVPStatus[] = ["Attending", "Declined", "Pending"];
  for (let i = 0; i < n; i++) {
    const f = FIRST[(seed + i * 3) % FIRST.length];
    const l = LAST[(seed + i * 7) % LAST.length];
    const events: EventName[] = EVENT_OPTIONS.filter((_, k) => (i + k + seed) % 3 !== 0);
    guests.push({
      id: `g-${seed}-${i}`,
      name: `${f} ${l}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@example.com`,
      phone: `+91 9${(800000000 + (seed * 137 + i * 91) % 99999999).toString().slice(0, 9)}`,
      familySize: ((i + seed) % 5) + 1,
      events,
      rsvp: statuses[(i + seed) % 3],
    });
  }
  return guests;
}

const baseEvents = (date: string): WeddingEvent[] => [
  { id: "e1", name: "Haldi", date, time: "10:00", location: "Garden Lawn" },
  { id: "e2", name: "Mehendi", date, time: "16:00", location: "Banquet Hall" },
  { id: "e3", name: "Sangeet", date, time: "19:30", location: "Royal Ballroom" },
  { id: "e4", name: "Wedding", date, time: "20:00", location: "Main Mandap" },
  { id: "e5", name: "Reception", date, time: "21:00", location: "Grand Pavilion" },
];

const initialWeddings: Wedding[] = [
  { id: "w1", bride: "Bhumika", groom: "Divik", date: "2026-12-12", location: "Jaipur, Rajasthan", theme: "Royal", events: baseEvents("2026-12-12"), guests: randomGuests(1, 22), published: true },
  { id: "w2", bride: "Priya", groom: "Rahul", date: "2027-02-08", location: "Udaipur, Rajasthan", theme: "Modern", events: baseEvents("2027-02-08"), guests: randomGuests(2, 18), published: true },
  { id: "w3", bride: "Meera", groom: "Arjun", date: "2027-04-22", location: "Goa", theme: "Bohemian", events: baseEvents("2027-04-22"), guests: randomGuests(3, 14), published: false },
];

interface Ctx {
  weddings: Wedding[];
  addWedding: (w: Omit<Wedding, "id">) => string;
  updateWedding: (id: string, patch: Partial<Wedding>) => void;
  addGuests: (weddingId: string, guests: Guest[]) => void;
  upsertGuest: (weddingId: string, guest: Guest) => void;
  removeGuest: (weddingId: string, guestId: string) => void;
  user: { name: string; email: string };
}

const DashboardContext = createContext<Ctx | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [weddings, setWeddings] = useState<Wedding[]>(initialWeddings);

  const addWedding: Ctx["addWedding"] = (w) => {
    const id = `w-${Date.now()}`;
    setWeddings((prev) => [...prev, { ...w, id }]);
    return id;
  };
  const updateWedding: Ctx["updateWedding"] = (id, patch) =>
    setWeddings((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  const addGuests: Ctx["addGuests"] = (weddingId, guests) =>
    setWeddings((prev) => prev.map((w) => (w.id === weddingId ? { ...w, guests: [...w.guests, ...guests] } : w)));
  const upsertGuest: Ctx["upsertGuest"] = (weddingId, guest) =>
    setWeddings((prev) =>
      prev.map((w) => {
        if (w.id !== weddingId) return w;
        const exists = w.guests.find((g) => g.id === guest.id);
        return { ...w, guests: exists ? w.guests.map((g) => (g.id === guest.id ? guest : g)) : [...w.guests, guest] };
      }),
    );
  const removeGuest: Ctx["removeGuest"] = (weddingId, guestId) =>
    setWeddings((prev) => prev.map((w) => (w.id === weddingId ? { ...w, guests: w.guests.filter((g) => g.id !== guestId) } : w)));

  return (
    <DashboardContext.Provider
      value={{
        weddings,
        addWedding,
        updateWedding,
        addGuests,
        upsertGuest,
        removeGuest,
        user: { name: "Aanya Kapoor", email: "aanya@example.com" },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}

export const THEMES: Record<Theme, { colors: string[]; font: string; tagline: string }> = {
  Royal: { colors: ["#7C2D5C", "#D4AF37", "#1E1B4B"], font: "Playfair Display", tagline: "Regal maroon & gold" },
  Modern: { colors: ["#8B5CF6", "#EC4899", "#1F2937"], font: "Inter", tagline: "Bold contemporary" },
  Minimalist: { colors: ["#1F2937", "#F4F4F5", "#A1A1AA"], font: "Inter", tagline: "Clean & quiet" },
  Bohemian: { colors: ["#C2410C", "#65A30D", "#FCD34D"], font: "Playfair Display", tagline: "Earthy & free" },
};
