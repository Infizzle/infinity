"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/constants";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>How We Work</SectionHeading>
        <p className="font-mono text-text-muted mb-16 max-w-2xl">
          A proven process refined across dozens of manufacturing engagements.
        </p>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5">
            <motion.div
              className="w-full bg-accent origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {processSteps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.title}
                className={`relative flex items-start gap-6 mb-16 last:mb-0 pl-14 md:pl-0 ${
                  isLeft
                    ? "md:flex-row"
                    : "md:flex-row-reverse md:text-right"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {/* Step number circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 w-12 h-12 rounded-full border-2 border-accent bg-dark flex items-center justify-center">
                  <span className="font-display font-extrabold text-accent text-sm">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pl-2 md:pl-0 ${
                    isLeft ? "md:pr-20 md:mr-auto md:w-1/2" : "md:pl-20 md:ml-auto md:w-1/2"
                  }`}
                >
                  <div className={`flex items-center gap-3 mb-2 ${!isLeft ? "md:justify-end" : ""}`}>
                    <step.icon className="w-5 h-5 text-accent" />
                    <h3 className="font-display font-semibold text-lg text-text-heading">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-text-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
