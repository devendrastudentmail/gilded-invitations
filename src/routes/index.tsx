import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroSection } from "@/components/site/HeroSection";
import { FeaturesSection } from "@/components/site/FeaturesSection";
import { MetricsSection } from "@/components/site/MetricsSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PricingSection } from "@/components/site/PricingSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HinduInvites — Cinematic Personalized Wedding Invitations" },
      { name: "description", content: "Create luxury, personalized digital wedding invitations in minutes. Unique links, live RSVP, wishing wall and stunning animations for every guest." },
      { property: "og:title", content: "HinduInvites — Cinematic Wedding Invitations" },
      { property: "og:description", content: "Personalized digital wedding invites with live RSVP, wishing wall and stunning animations." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MetricsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
