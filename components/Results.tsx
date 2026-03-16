"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { metrics } from "@/lib/constants";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function Results() {
  return (
    <section id="results" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Measurable Impact</SectionHeading>
        <p className="font-mono text-text-muted mb-16 max-w-2xl">
          Real results from real manufacturers. Every number represents hours
          reclaimed, dollars saved, and operations transformed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <motion.article
              key={metric.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-dark-card border border-white/5 rounded-xl p-8"
            >
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                decimals={metric.decimals}
              />
              <p className="font-mono text-sm text-text-heading mt-3 mb-2">
                {metric.label}
              </p>
              <p className="font-mono text-xs text-text-muted mb-4">
                {metric.context}
              </p>
              <span className="inline-block font-mono text-xs text-accent border border-accent/30 rounded-full px-3 py-1">
                {metric.industry}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
