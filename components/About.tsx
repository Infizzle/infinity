"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

function NetworkGraphic() {
  const nodes = [
    { cx: 60, cy: 40 }, { cx: 140, cy: 30 }, { cx: 200, cy: 80 },
    { cx: 100, cy: 100 }, { cx: 160, cy: 140 }, { cx: 50, cy: 150 },
    { cx: 220, cy: 160 },
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [3, 5], [4, 6], [2, 6]];

  return (
    <svg viewBox="0 0 280 200" className="w-full max-w-sm mx-auto" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <motion.path
          key={i}
          d={`M ${nodes[a].cx} ${nodes[a].cy} L ${nodes[b].cx} ${nodes[b].cy}`}
          stroke="#00D2BE" strokeWidth={1} strokeOpacity={0.3} fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx} cy={node.cy} r={5}
          fill="#0A0A0A" stroke="#00D2BE" strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
        />
      ))}
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>Our Approach</SectionHeading>
            <div className="space-y-6 font-mono text-sm text-text-body leading-relaxed">
              <p>
                We don&apos;t sell software — we{" "}
                <span className="text-accent">embed with your team</span> to
                understand your actual workflows, your real bottlenecks, and the
                decisions your people make every day. That&apos;s where the value is.
              </p>
              <p>
                We build systems that{" "}
                <span className="text-accent">own themselves</span> — designed to
                run autonomously with minimal ongoing intervention. No vendor
                lock-in, no dependency on us to keep the lights on.
              </p>
              <p>
                We measure success by the{" "}
                <span className="text-accent">hours we give back</span> to your
                people and the dollars we return to your bottom line. If it
                doesn&apos;t move those numbers, we don&apos;t build it.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NetworkGraphic />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
