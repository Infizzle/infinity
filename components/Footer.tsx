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
            <a href="#" className="hover:text-text-body transition-colors" aria-label="LinkedIn">
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
