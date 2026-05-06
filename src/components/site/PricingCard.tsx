import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface Tier {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export function PricingCard({ tier, index }: { tier: Tier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-3xl p-8 ${
        tier.highlight
          ? "bg-gradient-primary text-white shadow-luxe scale-[1.02]"
          : "glass text-charcoal"
      }`}
    >
      {tier.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 font-accent text-xs font-semibold uppercase tracking-wider text-white shadow-glow">
          Most Loved
        </div>
      )}
      <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
      <p className={`mt-1 text-sm ${tier.highlight ? "text-white/80" : "text-muted-foreground"}`}>{tier.tagline}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-5xl font-bold">{tier.price}</span>
      </div>
      <ul className="mt-7 space-y-3 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tier.highlight ? "text-mint" : "text-accent"}`} />
            <span className={tier.highlight ? "text-white/90" : "text-charcoal/80"}>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/auth/signup"
        className={`mt-8 inline-flex justify-center rounded-full px-6 py-3 font-accent text-sm font-semibold transition hover:scale-105 ${
          tier.highlight
            ? "bg-white text-primary"
            : "bg-charcoal text-white"
        }`}
      >
        {tier.cta}
      </Link>
    </motion.div>
  );
}
