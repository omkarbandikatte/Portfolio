"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Terminal } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm Omkar's AI assistant. Ask me anything about his skills, projects, experience, or education!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1, boxShadow: "0 0 24px rgba(34, 197, 94, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[90] flex h-[72px] w-[72px] items-center justify-center rounded-full border border-green-500/30 bg-[#0d1117] shadow-lg shadow-green-500/10 transition-all hover:border-green-500/50 hover:shadow-green-500/20"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6 text-green-400" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Full Body 3D Robot */}
              <div className="relative flex flex-col items-center" style={{ width: 36, height: 48 }}>
                {/* Antenna */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-1.5 w-0.5 bg-green-300" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_6px_rgba(74,222,128,0.9)]" />
                {/* Head */}
                <div className="relative h-5 w-7 rounded-md bg-gradient-to-b from-green-400 to-emerald-600 shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                  {/* Eyes */}
                  <div className="absolute top-1.5 left-1 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                  <div className="absolute top-1.5 right-1 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                  {/* Mouth */}
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-white/50" />
                </div>
                {/* Neck */}
                <div className="h-1 w-2 bg-gray-500" />
                {/* Body */}
                <div className="relative h-5 w-6 rounded-md bg-gradient-to-b from-emerald-500 to-green-700 shadow-[0_3px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)]">
                  {/* Chest light */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_4px_rgba(103,232,249,0.8)]" />
                  {/* Belt line */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-green-900/60" />
                </div>
                {/* Arms */}
                <div className="absolute top-[22px] -left-1 h-5 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-green-700 shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                <div className="absolute top-[22px] -right-1 h-5 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-green-700 shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                {/* Legs */}
                <div className="flex gap-1 mt-0.5">
                  <div className="h-4 w-2 rounded-b-md bg-gradient-to-b from-green-700 to-green-900 shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                  <div className="h-4 w-2 rounded-b-md bg-gradient-to-b from-green-700 to-green-900 shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[90] flex h-[480px] w-[360px] flex-col overflow-hidden rounded-lg border border-green-500/20 bg-[#0a0a0f]/95 shadow-2xl shadow-green-500/10 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-1 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-green-400" />
                <p className="text-[11px] font-mono text-gray-400">omkar-ai-assistant</p>
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <span className="mt-1 shrink-0 text-green-500 font-mono text-xs">{">"}</span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "border border-green-500/30 bg-green-500/10 text-green-300 rounded-br-sm"
                        : "border border-white/[0.06] bg-white/[0.03] text-gray-300 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <User className="mt-1 h-4 w-4 shrink-0 text-green-500/50" />
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-green-500 font-mono text-xs">{">"}</span>
                  <div className="rounded-lg rounded-bl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <span className="text-green-500/60 font-mono text-sm">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Omkar..."
                className="flex-1 bg-transparent text-sm font-mono text-white placeholder-gray-600 outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded border border-green-500/30 bg-green-500/10 p-2 text-green-400 transition-all hover:bg-green-500/20 hover:border-green-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
