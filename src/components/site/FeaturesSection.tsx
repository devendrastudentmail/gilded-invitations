import { Heart, Edit3, MessageCircle, ClipboardCheck, MapPin, Sparkles } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  { icon: Heart, title: "Personalized Invitations", description: "Unique guest links with personal greetings that make every invitee feel like the VIP." },
  { icon: Edit3, title: "Real-Time Editing", description: "Update venue, time, or details instantly — no resending, no confusion." },
  { icon: MessageCircle, title: "The Wishing Wall", description: "Collect heartfelt wishes, photos, and memories from your guests in one beautiful space." },
  { icon: ClipboardCheck, title: "Zero-Stress RSVP", description: "Live tracking with accurate counts for every event so caterers always get it right." },
  { icon: MapPin, title: "Interactive Maps", description: "Embedded Google Maps with directions for multiple venues across all functions." },
  { icon: Sparkles, title: "Stunning Animations", description: "Premium themes with cinematic motion crafted by India's finest designers." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Features</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal md:text-5xl">
            Every detail, <span className="text-gradient italic">handcrafted</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Built for the most important day of your life.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
