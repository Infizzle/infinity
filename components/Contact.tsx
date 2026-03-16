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
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" type="text" name="name" placeholder="Name *" required
                value={form.name} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="company" className="sr-only">Company</label>
              <input id="company" type="text" name="company" placeholder="Company *" required
                value={form.company} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" type="email" name="email" placeholder="Email *" required
                value={form.email} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone</label>
              <input id="phone" type="tel" name="phone" placeholder="Phone (optional)"
                value={form.phone} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" name="message" placeholder="Tell us about your biggest operational challenge *"
                required rows={4} value={form.message} onChange={handleChange}
                className={`${inputClasses} resize-none`} />
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
