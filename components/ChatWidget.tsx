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
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // TODO: Integrate Vercel AI SDK + Anthropic API for live consultation
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: PLACEHOLDER_RESPONSE }]);
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
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-dark-card">
              <span className="font-display font-semibold text-sm text-text-heading">
                Virtual Consultant
              </span>
              <button onClick={() => setOpen(false)} className="text-text-muted hover:text-text-heading transition-colors" aria-label="Close chat">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-3 py-2 font-mono text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-dark"
                      : "bg-dark-card text-text-body border border-white/5"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-dark-card border border-white/10 rounded-lg px-3 py-2 font-mono text-xs text-text-heading placeholder:text-text-muted focus-visible:outline-none focus-visible:border-accent/50"
              />
              <button onClick={handleSend} className="text-accent hover:text-accent-hover transition-colors p-2" aria-label="Send message">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
