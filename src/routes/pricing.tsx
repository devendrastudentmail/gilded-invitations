import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PricingSection, tiers } from "@/components/site/PricingSection";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — HinduInvites" },
      { name: "description", content: "Simple, transparent pricing for cinematic wedding invitations. Free, Premium ₹4,999, Luxury ₹14,999." },
      { property: "og:title", content: "HinduInvites Pricing" },
      { property: "og:description", content: "Choose Free, Premium or Luxury plans for your wedding invitations." },
    ],
  }),
  component: PricingPage,
});

const compareRows = [
  { label: "Events", values: ["1", "Unlimited", "Unlimited"] },
  { label: "Guests", values: ["25", "500", "Unlimited"] },
  { label: "Personalized greetings", values: [false, true, true] },
  { label: "Wishing Wall", values: [false, true, true] },
  { label: "Custom theme", values: [false, false, true] },
  { label: "Dedicated planner", values: [false, false, true] },
  { label: "Remove branding", values: [false, true, true] },
];

function PricingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-6">
        <PricingSection />
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl font-bold">Compare <span className="text-gradient italic">plans</span></h2>
            <div className="mt-10 overflow-hidden rounded-3xl glass">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-white/40">
                    <th className="px-6 py-4 text-left font-accent text-xs uppercase tracking-wider text-muted-foreground">Feature</th>
                    {tiers.map((t) => <th key={t.name} className="px-6 py-4 text-center font-accent text-xs uppercase tracking-wider text-charcoal">{t.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label} className="border-b border-border/40 last:border-0">
                      <td className="px-6 py-4 text-charcoal/80">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-6 py-4 text-center">
                          {typeof v === "boolean"
                            ? v ? <Check className="mx-auto h-4 w-4 text-accent" /> : <X className="mx-auto h-4 w-4 text-charcoal/30" />
                            : <span className="font-semibold">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
