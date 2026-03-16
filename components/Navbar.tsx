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
              className={`text-sm font-mono transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 rounded ${
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
