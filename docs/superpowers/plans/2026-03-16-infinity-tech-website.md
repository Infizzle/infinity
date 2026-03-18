# Infinity Tech Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scrollable marketing website for Infinity Tech — a premium industrial-tech consultancy site targeting manufacturing companies.

**Architecture:** Next.js 14 App Router with server components for layout/page and client components for interactive sections. Canvas-based hero animation loaded dynamically. All section data centralized in `lib/constants.ts`. Tailwind CSS with custom theme, Framer Motion for scroll animations.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide React, HTML5 Canvas

**Spec:** `docs/superpowers/specs/2026-03-16-infinity-tech-website-design.md`

---

## Chunk 1: Project Scaffolding & Design System

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `.gitignore`

- [ ] **Step 1: Scaffold Next.js 14 project**

Run from `/home/aaron/projects/infinity`. First create a temp directory, scaffold there, then move files back (because `create-next-app` may refuse a non-empty directory due to existing `docs/`):

```bash
cd /home/aaron/projects && npx create-next-app@14 infinity-tmp --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm && cp -r infinity-tmp/. infinity/ && rm -rf infinity-tmp && cd infinity
```

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:3000 with default Next.js page.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 project with dependencies"
```

---

### Task 2: Configure Design System (Tailwind + Fonts + Globals)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Configure Tailwind theme**

Update `tailwind.config.ts` with the custom color palette, font families, and any extended spacing/animation values:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0A0A0A",
          card: "#111111",
          elevated: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#00D2BE",
          hover: "#00B8A6",
          glow: "rgba(0, 210, 190, 0.15)",
        },
        text: {
          heading: "#F0F0F0",
          body: "#AAAAAA",
          muted: "#666666",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Configure fonts and root layout**

Update `app/layout.tsx` with Outfit + JetBrains Mono via `next/font/google`, metadata for SEO, and font CSS variables on the `<html>` element:

```tsx
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Infinity Tech — Intelligent Systems for Modern Manufacturing",
  description:
    "We help manufacturing companies improve efficiency, reduce costs, and leverage automation and AI to achieve their business goals.",
  openGraph: {
    title: "Infinity Tech — Intelligent Systems for Modern Manufacturing",
    description:
      "We help manufacturing companies improve efficiency, reduce costs, and leverage automation and AI to achieve their business goals.",
    type: "website",
    url: "https://infinitytechllc.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-dark text-text-body font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Set up globals.css with blueprint grid and base styles**

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #0a0a0a;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 39px,
        rgba(0, 210, 190, 0.035) 39px,
        rgba(0, 210, 190, 0.035) 40px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 39px,
        rgba(0, 210, 190, 0.035) 39px,
        rgba(0, 210, 190, 0.035) 40px
      );
  }

  /* Offset for sticky navbar on anchor scroll */
  section {
    scroll-margin-top: 5rem;
  }
}

@layer utilities {
  .text-gradient-teal {
    @apply bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent;
  }
}
```

- [ ] **Step 4: Verify — dev server shows dark page with blueprint grid**

```bash
npm run dev
```

Open browser. Expected: dark background with subtle teal grid lines visible.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/globals.css
git commit -m "feat: configure design system — colors, fonts, blueprint grid"
```

---

### Task 3: Create Shared UI Components

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Create: `components/ui/AnimatedCounter.tsx`

- [ ] **Step 1: Create Button component**

Create `components/ui/Button.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-display font-semibold text-sm tracking-wide transition-colors duration-200";
  const variants = {
    primary: "bg-accent text-dark hover:bg-accent-hover",
    outline:
      "border border-accent text-accent hover:bg-accent/10",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: Create SectionHeading component**

Create `components/ui/SectionHeading.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <motion.h2
      className={`font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-heading mb-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
}
```

- [ ] **Step 3: Create AnimatedCounter component**

Create `components/ui/AnimatedCounter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.5,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      const current = start + (end - start) * eased;

      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, decimals, duration]);

  return (
    <span ref={ref} className="font-display font-extrabold text-4xl md:text-5xl text-accent">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 4: Verify components compile**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add shared UI components — Button, SectionHeading, AnimatedCounter"
```

---

### Task 4: Create Constants Data File

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create constants with all placeholder data**

Create `lib/constants.ts` with typed data for services, metrics, FAQs, and process steps:

```ts
import {
  Database,
  Workflow,
  BrainCircuit,
  LayoutDashboard,
  Search,
  PenTool,
  Hammer,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: Database,
    title: "Intelligent Data Systems",
    description:
      "Custom-built platforms that automatically collect, organize, and surface your operational data so decisions happen in real-time, not after the fact.",
  },
  {
    icon: Workflow,
    title: "Autonomous Workflow Automation",
    description:
      "End-to-end process automation that eliminates manual data entry, reporting bottlenecks, and repetitive tasks across your operation.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Insights & Forecasting",
    description:
      "Systems that learn from your production and business data to predict maintenance needs, optimize schedules, and flag inefficiencies before they cost you.",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Digital Dashboards & Reporting",
    description:
      "Tailored interfaces that give leadership, floor managers, and operators exactly the data they need — no more, no less.",
  },
];

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  context: string;
  industry: string;
}

/* TODO: Replace with real metrics */
export const metrics: Metric[] = [
  {
    value: 73,
    suffix: "%",
    label: "Reduction in Manual Data Entry",
    context: "Mid-size parts manufacturer, 200+ employees",
    industry: "Precision Machining",
  },
  {
    value: 2.1,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    label: "Annual Cost Savings",
    context: "Regional food processing plant",
    industry: "Food & Bev",
  },
  {
    value: 4,
    suffix: "x",
    label: "Faster Report Generation",
    context: "Automotive supplier, 3 production lines",
    industry: "Automotive",
  },
  {
    value: 91,
    suffix: "%",
    label: "Uptime After Predictive Maintenance",
    context: "Heavy equipment manufacturer",
    industry: "Industrial Equipment",
  },
  {
    value: 340,
    label: "Hours Saved Per Month",
    context: "Plastics extrusion facility, 150 employees",
    industry: "Plastics",
  },
  {
    value: 58,
    suffix: "%",
    label: "Reduction in Unplanned Downtime",
    context: "Multi-site metals fabrication company",
    industry: "Metals & Fabrication",
  },
];

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    icon: Search,
    title: "Discovery & Audit",
    description:
      "We map your current workflows, data sources, and bottlenecks. Free initial assessment.",
  },
  {
    icon: PenTool,
    title: "System Design",
    description:
      "We architect a tailored solution around your specific operational reality.",
  },
  {
    icon: Hammer,
    title: "Build & Integrate",
    description:
      "We build, test, and deploy your system with minimal disruption to your operations.",
  },
  {
    icon: TrendingUp,
    title: "Optimize & Scale",
    description:
      "Your system learns and improves over time. We monitor, refine, and expand as you grow.",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "How long does a typical implementation take?",
    answer:
      "Most projects go from discovery to deployment in 8–16 weeks, depending on complexity. We start delivering value within the first sprint — you won't wait months to see results.",
  },
  {
    question: "Do we need to replace our existing systems?",
    answer:
      "No. We build around what you already have. Our systems integrate with your existing tools, databases, and workflows — we enhance them, not replace them.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We specialize in manufacturing across sectors: automotive, food & beverage, precision machining, plastics, metals fabrication, and industrial equipment. If you make things, we can help.",
  },
  {
    question: "How do you handle data security?",
    answer:
      "Your data stays yours. We implement role-based access controls, encryption at rest and in transit, and follow industry best practices for manufacturing data security.",
  },
  {
    question: "What does the free efficiency audit include?",
    answer:
      "A 2-hour deep dive into your current workflows, data sources, and pain points. We deliver a written report identifying your top 3 automation opportunities with estimated ROI.",
  },
  {
    question: "What kind of ROI can we expect?",
    answer:
      "Our clients typically see 3–10x return on investment within the first year. The biggest gains come from eliminating manual processes, reducing downtime, and surfacing insights that drive better decisions.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Every system we build includes monitoring and optimization. We proactively identify improvements and scale your systems as your operation grows.",
  },
];

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Our Approach", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add placeholder data constants for all sections"
```

---

## Chunk 2: Navbar & Hero

### Task 5: Build Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create Navbar with scroll behavior, mobile menu, and scroll spy**

Create `components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href) as HTMLElement | null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <a href="#" className="font-display font-bold text-xl text-text-heading tracking-tight">
          INFINITY <span className="text-accent">TECH</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-mono transition-colors duration-200 ${
                activeSection === link.href
                  ? "text-accent"
                  : "text-text-muted hover:text-text-heading"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="primary" className="text-xs px-4 py-2">
            Get a Free Efficiency Audit
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-heading p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-dark-elevated z-50 md:hidden flex flex-col p-8 pt-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <button
                className="absolute top-6 right-6 text-text-heading"
                onClick={closeMobile}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`text-lg font-mono py-3 border-b border-white/5 transition-colors ${
                    activeSection === link.href
                      ? "text-accent"
                      : "text-text-body hover:text-text-heading"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-8">
                <Button href="#contact" variant="primary" onClick={closeMobile} className="w-full text-sm">
                  Get a Free Efficiency Audit
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navbar to page.tsx**

Update `app/page.tsx` to import and render the Navbar:

```tsx
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* Sections will be added in subsequent tasks */}
    </main>
  );
}
```

- [ ] **Step 3: Verify — navbar renders, transparent on top, solid on scroll**

```bash
npm run dev
```

Open browser. Expected: transparent navbar at top with "INFINITY TECH" wordmark, links, and CTA. Scrolling turns it solid. Mobile hamburger appears on small screens.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/page.tsx
git commit -m "feat: add sticky Navbar with scroll spy, mobile menu"
```

---

### Task 6: Build Hero Component with Canvas Animation

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/InfinityCanvas.tsx`

The canvas animation is split into its own file to keep Hero focused on layout/content and InfinityCanvas focused on the particle animation logic.

- [ ] **Step 1: Create the InfinityCanvas component**

Create `components/InfinityCanvas.tsx` — a `"use client"` component that renders the data-stream-to-infinity-symbol animation on an HTML5 Canvas:

```tsx
"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  targetX: number;
  targetY: number;
  delay: number;
  size: number;
  opacity: number;
  trail: { x: number; y: number }[];
}

function getInfinityPoint(t: number, scale: number, cx: number, cy: number) {
  // Parametric infinity/lemniscate curve
  const sin = Math.sin(t);
  const cos = Math.cos(t);
  const denom = 1 + sin * sin;
  return {
    x: cx + (scale * cos) / denom,
    y: cy + (scale * sin * cos) / denom,
  };
}

export function InfinityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const count = isMobile ? 80 : 200;
    const scale = Math.min(width * 0.25, 200);
    const cx = width / 2;
    const cy = height / 2;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const target = getInfinityPoint(t, scale, cx, cy);

      // Start from random edge positions
      const edge = Math.random() * 4;
      let startX: number, startY: number;
      if (edge < 1) {
        startX = Math.random() * width;
        startY = -20;
      } else if (edge < 2) {
        startX = width + 20;
        startY = Math.random() * height;
      } else if (edge < 3) {
        startX = Math.random() * width;
        startY = height + 20;
      } else {
        startX = -20;
        startY = Math.random() * height;
      }

      // Bezier control point offset for curved paths
      const midX = (startX + target.x) / 2;
      const midY = (startY + target.y) / 2;
      const offsetX = (Math.random() - 0.5) * width * 0.4;
      const offsetY = (Math.random() - 0.5) * height * 0.4;

      particles.push({
        startX,
        startY,
        controlX: midX + offsetX,
        controlY: midY + offsetY,
        targetX: target.x,
        targetY: target.y,
        delay: Math.random() * 0.3,
        size: 1.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        trail: [],
      });
    }

    particlesRef.current = particles;
  }, []);

  const drawStaticSymbol = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const scale = Math.min(width * 0.25, 200);
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2;
      const p = getInfinityPoint(t, scale, cx, cy);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "#00D2BE";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00D2BE";
    ctx.shadowBlur = 20;
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (reducedMotion.current) {
        drawStaticSymbol(ctx, rect.width, rect.height);
      } else {
        initParticles(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion.current) {
      return () => window.removeEventListener("resize", resize);
    }

    startTimeRef.current = performance.now();
    const assemblyDuration = 3500; // ms
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;

    function animate() {
      if (!ctx || !canvas) return;

      const elapsed = performance.now() - startTimeRef.current;
      const globalProgress = Math.min(elapsed / assemblyDuration, 1);
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      // Subtle pulse after full assembly
      if (globalProgress >= 1) {
        const pulse = Math.sin(performance.now() * 0.002) * 0.15 + 0.85;
        ctx.globalAlpha = pulse;
      }

      particlesRef.current.forEach((p) => {
        // Time-based progress with staggered start per particle
        const adjustedProgress = Math.max(0, (globalProgress - p.delay) / (1 - p.delay));
        const t = 1 - Math.pow(1 - Math.min(adjustedProgress, 1), 3); // easeOutCubic

        // Quadratic bezier interpolation for curved paths
        const invT = 1 - t;
        const x = invT * invT * p.startX + 2 * invT * t * p.controlX + t * t * p.targetX;
        const y = invT * invT * p.startY + 2 * invT * t * p.controlY + t * t * p.targetY;

        // Trail
        p.trail.push({ x, y });
        if (p.trail.length > 8) p.trail.shift();

        // Draw trail
        p.trail.forEach((tp, i) => {
          const trailOpacity = (i / p.trail.length) * p.opacity * 0.3;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 190, ${trailOpacity})`;
          ctx.fill();
        });

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 190, ${p.opacity})`;
        ctx.fill();

        // Glow when nearing target
        if (globalProgress > 0.8) {
          const glowIntensity = (globalProgress - 0.8) / 0.2;
          ctx.shadowColor = "#00D2BE";
          ctx.shadowBlur = 10 * glowIntensity;
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 190, ${p.opacity * glowIntensity * 0.5})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Reset globalAlpha after drawing
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, drawStaticSymbol]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Create the Hero component**

Create `components/Hero.tsx`:

```tsx
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

      {/* Scroll indicator */}
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
```

- [ ] **Step 3: Add Hero to page.tsx**

Update `app/page.tsx`:

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify hero renders — canvas animation plays, text appears, CTAs visible**

```bash
npm run dev
```

Expected: Full-height hero with particle streams assembling into infinity symbol behind text. Headline, subheadline, two CTA buttons, and bobbing scroll indicator all visible.

- [ ] **Step 5: Commit**

```bash
git add components/InfinityCanvas.tsx components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with canvas infinity symbol animation"
```

---

## Chunk 3: Content Sections — Services, Results, About

### Task 7: Build Services Section

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Create Services component**

Create `components/Services.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/constants";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
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
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
    </main>
  );
}
```

- [ ] **Step 3: Verify — 4 cards render in grid, hover states work, scroll animation triggers**

- [ ] **Step 4: Commit**

```bash
git add components/Services.tsx app/page.tsx
git commit -m "feat: add Services section with animated cards"
```

---

### Task 8: Build Results Section

**Files:**
- Create: `components/Results.tsx`

- [ ] **Step 1: Create Results component**

Create `components/Results.tsx`:

```tsx
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
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
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
```

- [ ] **Step 2: Add to page.tsx** (after Services)

Add the import `import { Results } from "@/components/Results";` and place `<Results />` after `<Services />` in the JSX.

- [ ] **Step 3: Verify — 6 metric cards, counters animate on scroll, industry badges display**

- [ ] **Step 4: Commit**

```bash
git add components/Results.tsx app/page.tsx
git commit -m "feat: add Results section with animated metric counters"
```

---

### Task 9: Build About Section

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create About component with split layout and animated SVG**

Create `components/About.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

function NetworkGraphic() {
  const nodes = [
    { cx: 60, cy: 40 },
    { cx: 140, cy: 30 },
    { cx: 200, cy: 80 },
    { cx: 100, cy: 100 },
    { cx: 160, cy: 140 },
    { cx: 50, cy: 150 },
    { cx: 220, cy: 160 },
  ];

  const edges = [
    [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [3, 5], [4, 6], [2, 6],
  ];

  return (
    <svg viewBox="0 0 280 200" className="w-full max-w-sm mx-auto" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#00D2BE"
          strokeWidth={1}
          strokeOpacity={0.3}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={5}
          fill="#0A0A0A"
          stroke="#00D2BE"
          strokeWidth={1.5}
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
          {/* Text — 60% */}
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

          {/* Graphic — 40% */}
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
```

- [ ] **Step 2: Add to page.tsx** (after Results)

Add the import `import { About } from "@/components/About";` and place `<About />` after `<Results />` in the JSX.

- [ ] **Step 3: Verify — split layout renders, SVG nodes/edges animate on scroll, responsive stacking**

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: add About section with animated network graphic"
```

---

## Chunk 4: Interactive Sections — Process, FAQ, Contact

### Task 10: Build Process Section

**Files:**
- Create: `components/Process.tsx`

- [ ] **Step 1: Create Process component with animated timeline**

Create `components/Process.tsx`:

```tsx
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
```

- [ ] **Step 2: Add to page.tsx** (after About)

Add the import `import { Process } from "@/components/Process";` and place `<Process />` after `<About />` in the JSX.

- [ ] **Step 3: Verify — timeline draws on scroll, steps alternate, mobile stacks left**

- [ ] **Step 4: Commit**

```bash
git add components/Process.tsx app/page.tsx
git commit -m "feat: add Process section with scroll-animated timeline"
```

---

### Task 11: Build FAQ Section

**Files:**
- Create: `components/FAQ.tsx`

- [ ] **Step 1: Create FAQ accordion component**

Create `components/FAQ.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/lib/constants";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Common Questions</SectionHeading>
        <p className="font-mono text-text-muted mb-12">
          Everything you need to know before getting started.
        </p>

        <div className="space-y-2">
          {faqItems.map((item, i) => (
            <div key={i} className="border-b border-white/5">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={openIndex === i}
              >
                <span
                  className={`font-mono text-sm transition-colors ${
                    openIndex === i ? "text-accent" : "text-text-heading group-hover:text-text-heading"
                  }`}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown size={18} className="text-text-muted" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-mono text-sm text-text-body pb-5 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page.tsx** (after Process)

Add the import `import { FAQ } from "@/components/FAQ";` and place `<FAQ />` after `<Process />` in the JSX.

- [ ] **Step 3: Verify — accordion toggles, only one open at a time, smooth animation**

- [ ] **Step 4: Commit**

```bash
git add components/FAQ.tsx app/page.tsx
git commit -m "feat: add FAQ section with animated accordion"
```

---

### Task 12: Build Contact Section

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create Contact form component**

Create `components/Contact.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend (Supabase + n8n)
    console.log("Form submission:", form);
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-text-heading placeholder:text-text-muted focus-visible:outline-none focus-visible:border-accent/50 focus-visible:ring-1 focus-visible:ring-accent/30 transition-colors";

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Intensified blueprint grid for this section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0, 210, 190, 0.06) 39px, rgba(0, 210, 190, 0.06) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0, 210, 190, 0.06) 39px, rgba(0, 210, 190, 0.06) 40px)
          `,
        }}
      />

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">
          Let&apos;s Talk About Your Operation
        </SectionHeading>
        <p className="font-mono text-text-muted mb-12 text-center">
          Tell us about your biggest challenge. We&apos;ll show you what&apos;s possible.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <p className="font-display font-semibold text-xl text-accent mb-2">
              Thank you!
            </p>
            <p className="font-mono text-sm text-text-body">
              We&apos;ll respond within one business day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                required
                value={form.name}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Company *"
                required
                value={form.company}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tell us about your biggest operational challenge *"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Request Your Free Audit
            </Button>
            <p className="font-mono text-xs text-text-muted text-center">
              We&apos;ll respond within one business day.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page.tsx** (after FAQ)

Add the import `import { Contact } from "@/components/Contact";` and place `<Contact />` after `<FAQ />` in the JSX.

- [ ] **Step 3: Verify — form renders, validation works (required fields, email format), submission logs to console and shows thank-you state**

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx app/page.tsx
git commit -m "feat: add Contact section with form and validation"
```

---

## Chunk 5: ChatWidget, Footer, Final Assembly

### Task 13: Build ChatWidget

**Files:**
- Create: `components/ChatWidget.tsx`

- [ ] **Step 1: Create ChatWidget component**

Create `components/ChatWidget.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const WELCOME_MESSAGE =
  "Hi — I'm Infinity Tech's virtual consultant. Tell me about your manufacturing operation and I'll show you where automation can help.";

const PLACEHOLDER_RESPONSE =
  "Thanks for your message! A team member will follow up shortly. In the meantime, explore our case studies above.";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    // TODO: Integrate Vercel AI SDK + Anthropic API for live consultation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: PLACEHOLDER_RESPONSE },
      ]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-dark-elevated border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "28rem" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-dark-card">
              <span className="font-display font-semibold text-sm text-text-heading">
                Virtual Consultant
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-text-heading transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 font-mono text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-dark"
                        : "bg-dark-card text-text-body border border-white/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-dark-card border border-white/10 rounded-lg px-3 py-2 font-mono text-xs text-text-heading placeholder:text-text-muted focus-visible:outline-none focus-visible:border-accent/50"
              />
              <button
                onClick={handleSend}
                className="text-accent hover:text-accent-hover transition-colors p-2"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-accent text-dark flex items-center justify-center shadow-lg shadow-accent/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Virtual Consultant"
        aria-label="Open virtual consultant"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
```

- [ ] **Step 2: Add to page.tsx** (after Contact)

Add the import `import { ChatWidget } from "@/components/ChatWidget";` and place `<ChatWidget />` after `<Contact />` in the JSX.

- [ ] **Step 3: Verify — floating button visible, panel opens/closes, can send messages, receives placeholder response**

- [ ] **Step 4: Commit**

```bash
git add components/ChatWidget.tsx app/page.tsx
git commit -m "feat: add ChatWidget with placeholder responses"
```

---

### Task 14: Build Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

Create `components/Footer.tsx`:

```tsx
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-bold text-lg text-text-heading tracking-tight">
            INFINITY <span className="text-accent">TECH</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-text-muted">
            <a href="#" className="hover:text-text-body transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-text-body transition-colors">
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-text-body transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>

          <p className="font-mono text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Infinity Tech LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add to page.tsx** (after ChatWidget)

Add the import `import { Footer } from "@/components/Footer";` and place `<Footer />` after `<ChatWidget />` in the JSX.

- [ ] **Step 3: Verify — footer renders at bottom with links and copyright**

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer component"
```

---

### Task 15: Final Page Assembly & Verification

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Ensure page.tsx imports and renders all sections in correct order**

Final `app/page.tsx` should be:

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Results />
      <About />
      <Process />
      <FAQ />
      <Contact />
      <ChatWidget />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Add .gitignore entry for .superpowers**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 3: Run build to check for errors**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript or compilation errors.

- [ ] **Step 4: Full visual verification**

```bash
npm run dev
```

Verify all of the following:
- Navbar: transparent → solid on scroll, scroll spy highlights active section, mobile menu works
- Hero: canvas animation plays, text appears with staggered entrance, CTAs scroll to correct sections
- Services: 4 cards in grid, hover states, scroll-triggered entrance
- Results: 6 metric cards, counters animate on scroll, industry badges
- About: split layout, text with teal highlights, SVG animation
- Process: timeline draws on scroll, steps alternate left/right on desktop
- FAQ: accordion toggles, one at a time, smooth animation
- Contact: form validation, console.log on submit, thank-you state
- ChatWidget: floating button, panel opens/closes, placeholder response
- Footer: wordmark, links, copyright
- Responsive: all sections adapt properly on mobile viewport

- [ ] **Step 5: Commit final assembly**

```bash
git add app/page.tsx .gitignore
git commit -m "feat: complete Infinity Tech website — all sections assembled"
```
