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
      "Most projects go from discovery to deployment in 8-16 weeks, depending on complexity. We start delivering value within the first sprint — you won't wait months to see results.",
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
      "Our clients typically see 3-10x return on investment within the first year. The biggest gains come from eliminating manual processes, reducing downtime, and surfacing insights that drive better decisions.",
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
