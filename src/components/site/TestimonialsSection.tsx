import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TestimonialCard, type Testimonial } from "./TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials: Testimonial[] = [
  { quote: "Every guest felt like they got a private invite from us. The personal greetings brought tears to so many eyes.", names: "Priya & Rahul", city: "Jaipur" },
  { quote: "We changed our muhurat twice — and not a single guest got confused. HinduInvites is pure magic.", names: "Aditi & Vikram", city: "Mumbai" },
  { quote: "The Wishing Wall became our favorite wedding memory. We still read it every anniversary.", names: "Sanya & Kartik", city: "Delhi" },
  { quote: "Our 600 guests RSVP'd in three days. Caterers, decor, transport — everything just clicked.", names: "Ishita & Arjun", city: "Bangalore" },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="testimonials" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Loved across India</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">From real <span className="text-gradient italic">couples</span></h2>
        </div>
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard t={testimonials[i]} />
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)} className="rounded-full glass p-2 hover:scale-110 transition">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-gradient-primary" : "w-2 bg-charcoal/20"}`} />
              ))}
            </div>
            <button onClick={() => setI((p) => (p + 1) % testimonials.length)} className="rounded-full glass p-2 hover:scale-110 transition">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
