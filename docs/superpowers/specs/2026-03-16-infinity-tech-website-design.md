# Infinity Tech Website — Design Spec

## Overview

Single-page scrollable marketing website for Infinity Tech (infinitytechllc.com), a technology consultancy serving manufacturing companies. The site is the primary lead-generation tool. It markets business outcomes — never references specific internal tools or platforms.

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS with custom theme via `tailwind.config.ts`
- Framer Motion for scroll-triggered animations, hover states, accordion, chatbot panel
- HTML5 Canvas for hero particle animation
- Deploy target: Vercel

## Design System

### Color Palette

- **Base:** Dark charcoal — `#0A0A0A` (primary background), `#111111` (card backgrounds), `#1A1A1A` (elevated surfaces)
- **Accent:** Electric teal — `#00D2BE` (primary accent), with supporting blues for gradients and hover states
- **Text:** `#F0F0F0` (headings), `#AAAAAA` (body), `#666666` (muted/labels)
- Defined as CSS custom properties via Tailwind for easy theme changes

### Typography

- **Display:** Outfit (400, 600, 800) — headlines, section titles, metric numbers
- **Body/Technical:** JetBrains Mono (400, 500) — body text, descriptions, labels, stat labels
- Loaded via `next/font/google` for performance

### Background Texture

Blueprint-style grid using pure CSS `repeating-linear-gradient` at ~3-5% opacity over the dark base. Subtle engineering-drawing feel throughout the page.

### Motion Language

- Scroll-triggered reveals via Framer Motion `whileInView` with staggered children
- Elements translate upward + fade in, 100-150ms stagger between siblings
- ~0.5s duration with ease-out
- Motion conveys precision — elements feel "assembled" or "calibrated" into position
- One signature animation moment: hero canvas animation

## Architecture

### Rendering Strategy

- Root layout and page are server components
- Hero canvas component is `"use client"`, dynamically imported via `next/dynamic` with SSR disabled
- All interactive components (FAQ accordion, ChatWidget, Contact form, Navbar scroll behavior) are client components
- Below-fold sections lazy-loaded via `IntersectionObserver`

### File Structure

```
/app
  layout.tsx          # Root layout: fonts, metadata, global styles
  page.tsx            # Main page composing all sections
  globals.css         # Tailwind base + CSS variables + blueprint grid
/components
  Navbar.tsx
  Hero.tsx            # Includes canvas animation
  Services.tsx
  Results.tsx
  About.tsx
  Process.tsx
  FAQ.tsx
  Contact.tsx
  ChatWidget.tsx
  Footer.tsx
  /ui
    Button.tsx
    AnimatedCounter.tsx
    SectionHeading.tsx
/lib
  constants.ts        # All placeholder data (services, metrics, FAQs, process steps)
/public
  /images             # Logo and static assets
```

### Data Management

All placeholder content (services, metrics, FAQs, process steps) lives in `lib/constants.ts`. Placeholder data is marked with `{/* TODO: Replace with real metrics */}` comments.

## Sections

### 1. Navbar (sticky)

- Starts transparent over the hero, transitions to solid `#0A0A0A` with `backdrop-filter: blur()` on scroll past ~50px
- Left: "INFINITY TECH" wordmark — Outfit 700
- Center/right: anchor links — Services | Results | Our Approach | Process | FAQ — smooth scroll with `scroll-margin-top` offset
- Far right: "Get a Free Efficiency Audit" CTA button, solid teal
- Mobile: hamburger menu, slide-in overlay panel with dimmed backdrop. Closes on close button, tap outside, or anchor link click.
- Active section highlighted via scroll spy using `IntersectionObserver`

### 2. Hero

- Full viewport height, dark base with blueprint grid
- **Canvas animation:** Streams of teal dots/particles flow from canvas edges, converging along curved paths to assemble into an infinity symbol (∞) at center. ~3-4 seconds to assemble, then holds with subtle pulse/glow. Canvas is absolute-positioned behind text content.
- Particle count reduces on mobile for performance. Canvas resizes responsively.
- Respects `prefers-reduced-motion`: if enabled, show the completed infinity symbol immediately (no particle animation). Static teal glow fallback.
- **Headline:** Outfit 800, large — "Your manufacturing data is already telling you how to save millions. We make it speak."
- **Subheadline:** JetBrains Mono, lighter weight, muted — positioning Infinity Tech as the bridge between operational data and autonomous intelligent systems
- **Primary CTA:** "See How It Works" — outlined/secondary style, smooth scrolls to Process section
- **Secondary CTA:** "Get a Free Efficiency Audit" — solid teal, scrolls to Contact section
- Subtle scroll-down chevron at bottom, gentle bobbing animation

### 3. Services — "What We Build For You"

- 4 service cards in 2x2 grid (desktop), single column (mobile)
- Each card: dark background (`#111`), teal border on hover, slight scale-up via Framer Motion
- Card content: Lucide icon (teal), title (Outfit 600), 2-3 sentence description (JetBrains Mono)
- **Services:**
  1. **Intelligent Data Systems** — Custom platforms that collect, organize, and surface operational data for real-time decisions
  2. **Autonomous Workflow Automation** — End-to-end process automation eliminating manual data entry, reporting bottlenecks, and repetitive tasks
  3. **AI-Powered Insights & Forecasting** — Systems that learn from production data to predict maintenance, optimize schedules, flag inefficiencies
  4. **Custom Digital Dashboards & Reporting** — Tailored interfaces giving each role exactly the data they need
- Staggered scroll-triggered entrance

### 4. Results — "Measurable Impact"

- 6 metric cards in 3x2 grid (desktop), 2x3 (tablet), single column (mobile)
- Each card: large animated counter (Outfit 800, teal), metric label, one-sentence context, industry badge pill
- **AnimatedCounter component** (`/components/ui/AnimatedCounter.tsx`): counts from 0 on viewport entry via `whileInView`, ~1.5s duration with easing. Handles percentages, dollar amounts, multipliers.
- Industry badges: small pill with teal outline
- Placeholder data in `lib/constants.ts` with TODO comments
- Staggered scroll-triggered entrance

### 5. About — "Our Approach"

- Split layout: text 60% left, animated graphic 40% right
- Three paragraphs covering:
  - Embedding with client teams to understand actual workflows
  - Building self-running systems designed for minimal ongoing intervention
  - Measuring success by hours given back and dollars returned
- Key phrases highlighted in teal
- Right side: minimal SVG graphic suggesting interconnected systems — nodes connecting, lines drawing via gentle Framer Motion animations
- Mobile: stacks vertically, text first
- Scroll-triggered fade-in from respective sides

### 6. Process — "How We Work"

- Scroll target for hero "See How It Works" CTA (`id="process"`)
- Vertical timeline: 4 steps connected by teal line
- Connecting line draws downward as section scrolls into view using `useScroll` + `useTransform`
- Each step: numbered teal circle, title (Outfit 600), description (JetBrains Mono), Lucide icon
- **Steps:**
  1. **Discovery & Audit** — Map current workflows, data sources, bottlenecks. Free initial assessment.
  2. **System Design** — Architect tailored solution around specific operational reality.
  3. **Build & Integrate** — Build, test, deploy with minimal disruption.
  4. **Optimize & Scale** — System learns and improves. Monitor, refine, expand.
- Desktop: steps alternate left/right of timeline. Mobile: all left-aligned, timeline on left edge
- Each step staggers in as the line reaches it

### 7. FAQ — "Common Questions"

- Accordion: 7 questions, only one open at a time
- Chevron rotates on toggle, content height animates via `AnimatePresence` + `motion.div`
- Active item title gets teal accent
- **Questions:**
  1. How long does a typical implementation take?
  2. Do we need to replace our existing systems?
  3. What industries do you work with?
  4. How do you handle data security?
  5. What does the free efficiency audit include?
  6. What kind of ROI can we expect?
  7. Do you offer ongoing support?
- FAQ data in `lib/constants.ts`

### 8. Contact — "Let's Talk About Your Operation"

- Scroll target for audit CTAs (`id="contact"`)
- Centered form, max-width ~600px
- **Fields:** Name (required), Company (required), Email (required, validated format), Phone (optional), Message textarea (required, "Tell us about your biggest operational challenge")
- **Submit:** "Request Your Free Audit" — solid teal, full width
- Form submission: `console.log` with `// TODO: Connect to backend (Supabase + n8n)` comment
- Below form: "We'll respond within one business day." in muted text
- Blueprint grid subtly intensifies in this section's background

### 9. ChatWidget (floating)

- Floating teal circle button, bottom-right corner, persistent
- "Virtual Consultant" tooltip on hover
- Click opens panel (slides up from bottom-right) via Framer Motion
- Panel contains: header ("Virtual Consultant"), welcome message ("Hi — I'm Infinity Tech's virtual consultant. Tell me about your manufacturing operation and I'll show you where automation can help."), text input, send button
- On send: placeholder response ("Thanks for your message! A team member will follow up shortly. In the meantime, explore our case studies above.")
- `// TODO: Integrate Vercel AI SDK + Anthropic API for live consultation`
- Close button, smooth open/close animation, doesn't block page scroll

### 10. Footer

- Minimal dark footer
- Infinity Tech wordmark, copyright 2026
- Links: Privacy Policy | Terms of Service (placeholder `#` hrefs)
- LinkedIn icon (placeholder href)
- JetBrains Mono, small, muted

## Responsive Strategy

- Mobile-first Tailwind breakpoints
- Key adaptations:
  - Navbar → hamburger menu on mobile
  - Service cards: 2x2 → 1 column
  - Result cards: 3x2 → 2x3 → 1 column
  - About split layout → vertical stack
  - Process timeline → left-aligned single column
  - Hero canvas reduces particle count on mobile
- All sections use percentage/rem-based spacing

## SEO & Accessibility

- Root layout metadata: title, description, Open Graph (title, description, type, url)
- Semantic HTML: `<nav>`, `<section>`, `<article>`, `<footer>`
- Placeholder `alt` text on all visual elements
- Focus-visible styles on interactive elements
- Smooth scroll via CSS `scroll-behavior: smooth`

## TODO Placeholders (for future integration)

- Contact form → Supabase + n8n backend
- ChatWidget → Vercel AI SDK + Anthropic API
- Metric data → real client results
- Privacy Policy / Terms of Service → actual pages
- LinkedIn → real profile URL
- Logo → final brand asset

## What NOT To Do

- No stock photography
- No references to internal tools (n8n, Supabase, etc.) in user-facing copy
- No Inter, Roboto, or Arial
- No purple gradients or generic SaaS blue
- No Tailwind UI template aesthetics
- No additional pages or routing
- No actual backend integrations (TODO comments only)
