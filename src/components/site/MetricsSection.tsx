import { motion } from "framer-motion";

const metrics = [
  { value: "600+", label: "Happy Couples" },
  { value: "1K+", label: "Events Hosted" },
  { value: "98%", label: "Guest Response" },
  { value: "4.9", label: "Avg. Rating" },
];

export function MetricsSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 rounded-3xl glass p-8 md:grid-cols-4 md:p-10">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <div className="font-display text-4xl font-bold text-gradient md:text-5xl">{m.value}</div>
            <div className="mt-1 font-accent text-xs uppercase tracking-wider text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
