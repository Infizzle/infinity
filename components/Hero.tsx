"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const InfinityCanvas = dynamic(
  () => import("@/components/InfinityCanvas").then((mod) => ({ default: mod.InfinityCanvas })),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InfinityCanvas />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-heading leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Your manufacturing data is already telling you how to save millions.{" "}
          <span className="text-gradient-teal">We make it speak.</span>
        </motion.h1>

        <motion.p
          className="font-mono text-text-body text-base md:text-lg max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          We bridge the gap between raw operational data and autonomous, intelligent
          systems that reduce human effort and drive measurable results.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Button href="#process" variant="outline">
            See How It Works
          </Button>
          <Button href="#contact" variant="primary">
            Get a Free Efficiency Audit
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
