import { PricingCard, type Tier } from "./PricingCard";

export const tiers: Tier[] = [
  {
    name: "Free",
    price: "₹0",
    tagline: "Try the magic, on us.",
    features: ["1 event", "Up to 25 guests", "3 starter themes", "Basic RSVP", "HinduInvites branding"],
    cta: "Start Free",
  },
  {
    name: "Premium",
    price: "₹4,999",
    tagline: "Everything for the perfect wedding.",
    features: ["Unlimited events", "Up to 500 guests", "All premium themes", "Personalized greetings", "Wishing Wall", "Live RSVP analytics", "Remove branding"],
    cta: "Choose Premium",
    highlight: true,
  },
  {
    name: "Luxury",
    price: "₹14,999",
    tagline: "White-glove cinematic experience.",
    features: ["Unlimited everything", "Custom theme design", "Dedicated planner", "Priority support 24×7", "Multi-language invites", "Bespoke animations", "Concierge guest support"],
    cta: "Go Luxury",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Beautifully <span className="text-gradient italic">simple</span>
          </h2>
          <p className="mt-4 text-muted-foreground">One-time pricing. No hidden costs. Forever access.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => <PricingCard key={t.name} tier={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}
