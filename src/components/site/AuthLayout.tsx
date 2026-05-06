import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md rounded-3xl p-8 shadow-luxe md:p-10"
      >
        <Link to="/" className="flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-xl font-bold">Hindu<span className="text-gradient">Invites</span></span>
        </Link>
        <h1 className="mt-6 text-center font-display text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  );
}

export function GoogleButton({ label }: { label: string }) {
  return (
    <button type="button" className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-white px-4 py-3 text-sm font-semibold text-charcoal transition hover:bg-muted">
      <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11v3.2h5.2c-.2 1.4-1.7 4.1-5.2 4.1-3.1 0-5.7-2.6-5.7-5.8s2.6-5.8 5.7-5.8c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.5 4.2 14.5 3.3 12 3.3 7 3.3 3 7.3 3 12.3s4 9 9 9c5.2 0 8.6-3.6 8.6-8.8 0-.6-.1-1.1-.2-1.5H12z"/></svg>
      {label}
    </button>
  );
}

export function Field({ label, type = "text", placeholder, register }: { label: string; type?: string; placeholder?: string; register: any }) {
  return (
    <label className="block">
      <span className="font-accent text-xs font-semibold uppercase tracking-wider text-charcoal/70">{label}</span>
      <input type={type} placeholder={placeholder} {...register} className="mt-1.5 w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}
