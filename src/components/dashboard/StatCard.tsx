import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export function StatCard({ icon: Icon, label, value, hint, index = 0 }: { icon: LucideIcon; label: string; value: string | number; hint?: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-white">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold text-charcoal">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </motion.div>
  );
}
