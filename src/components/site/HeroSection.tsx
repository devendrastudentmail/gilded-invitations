import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 md:pt-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-charcoal/80"
        >
          <Sparkles className="h-3.5 w-3.5 text-secondary" />
          Personalized for every guest · Made in India
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-bold leading-[1.05] text-charcoal md:text-7xl"
        >
          Create Beautiful Wedding<br />
          Invitations in <span className="text-gradient italic">minutes</span>...
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Cinematic digital invitations with a unique link, personal greeting, and live RSVP for every single guest. The luxury wedding stationer — reimagined.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/auth/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 font-accent text-sm font-semibold text-secondary-foreground shadow-luxe transition hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-white/60 px-7 py-3.5 font-accent text-sm font-semibold text-charcoal backdrop-blur transition hover:bg-white"
          >
            View Templates
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="glass rounded-3xl p-3 shadow-luxe">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-primary">
              <div className="flex h-full flex-col items-center justify-center text-white">
                <p className="font-display text-3xl italic md:text-5xl">Priya weds Rahul</p>
                <p className="mt-3 font-accent text-xs uppercase tracking-[0.3em]">12 · 12 · 2026 · Jaipur</p>
                <div className="mt-6 h-px w-32 bg-white/40" />
                <p className="mt-4 max-w-md px-6 text-center text-sm text-white/80">
                  Dearest Aanya, your presence will make our celebrations complete...
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
