import { Quote } from "lucide-react";

export interface Testimonial {
  quote: string;
  names: string;
  city: string;
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="glass mx-auto max-w-2xl rounded-3xl p-10 text-center shadow-luxe">
      <Quote className="mx-auto h-8 w-8 text-secondary/70" />
      <p className="mt-5 font-display text-xl italic leading-relaxed text-charcoal md:text-2xl">
        "{t.quote}"
      </p>
      <div className="mt-6">
        <p className="font-accent font-semibold text-charcoal">{t.names}</p>
        <p className="text-sm text-muted-foreground">{t.city}</p>
      </div>
    </div>
  );
}
