import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-5 py-3 md:px-7">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-white shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-xl font-bold text-charcoal">
            Hindu<span className="text-gradient">Invites</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/" className="text-sm font-medium text-charcoal/80 hover:text-primary">Home</Link>
          <a href="/#features" className="text-sm font-medium text-charcoal/80 hover:text-primary">Features</a>
          <Link to="/pricing" className="text-sm font-medium text-charcoal/80 hover:text-primary">Pricing</Link>
          <a href="/#testimonials" className="text-sm font-medium text-charcoal/80 hover:text-primary">Reviews</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-charcoal hover:text-primary md:inline-block">Login</Link>
          <Link to="/auth/signup" className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-luxe transition hover:scale-105">
            Get Started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
