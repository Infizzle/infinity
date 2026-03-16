"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/constants";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>What We Build For You</SectionHeading>
        <p className="font-mono text-text-muted mb-16 max-w-2xl">
          End-to-end systems designed around your operation — not off-the-shelf
          software that forces you to change how you work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(0, 210, 190, 0.5)" }}
              className="bg-dark-card border border-white/5 rounded-xl p-8 transition-colors"
            >
              <service.icon className="w-10 h-10 text-accent mb-4" />
              <h3 className="font-display font-semibold text-xl text-text-heading mb-3">
                {service.title}
              </h3>
              <p className="font-mono text-sm text-text-body leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
