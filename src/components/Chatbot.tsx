"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Calendar,
  PhoneCall,
  Info,
  DollarSign,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface AdminSettings {
  enabled: boolean;
  welcomeMessage: string;
  themeColor: string;
  faqs: FAQ[];
}

interface ChatMessage {
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  
  // Interactive lead capture states
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    company: "",
    requirement: ""
  });
  const [formError, setFormError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch settings and initialize session
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin?action=getSettings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error("Failed to load chatbot settings", err);
      }
    }

    loadSettings();

    // Setup or retrieve session ID
    let storedSessionId = localStorage.getItem("reachmore_chat_session_id");
    if (!storedSessionId) {
      storedSessionId = `session_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("reachmore_chat_session_id", storedSessionId);
    }
    setSessionId(storedSessionId);

    // Load messages from localStorage
    const savedMessages = localStorage.getItem(`reachmore_chat_history_${storedSessionId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // 2. Initialize default welcome message if chat history is empty
  useEffect(() => {
    if (settings && messages.length === 0) {
      const welcome: ChatMessage = {
        sender: "assistant",
        text: settings.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcome]);
      if (sessionId) {
        localStorage.setItem(`reachmore_chat_history_${sessionId}`, JSON.stringify([welcome]));
      }
    }
  }, [settings, messages.length, sessionId]);

  // 3. Auto-scroll on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, showLeadForm]);

  // If chatbot is disabled globally by the admin, do not render
  if (settings && !settings.enabled) {
    return null;
  }

  // 4. Send client message to the server-side API
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputVal("");
    setIsLoading(true);

    if (sessionId) {
      localStorage.setItem(`reachmore_chat_history_${sessionId}`, JSON.stringify(updatedMessages));
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          sessionId
        })
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          sender: "assistant",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const finalMessages = [...updatedMessages, assistantMsg];
        setMessages(finalMessages);
        localStorage.setItem(`reachmore_chat_history_${sessionId}`, JSON.stringify(finalMessages));

        // If backend parsed full lead, toggle form submitted visual checkmark
        if (data.leadCaptured) {
          setLeadFormSubmitted(true);
        }
      } else {
        throw new Error("Chat request failed");
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        sender: "assistant",
        text: "I would love to help you with that! 🚀 We are currently experiencing exceptionally high demand for our autonomous voice agent setups, which has temporarily congested my AI conversational node.\n\nTo ensure you get absolute priority, please click the **'Book Demo'** action button above to register your details and choose a slot directly on our Calendly. We'll have a custom system architecture blueprint prepared for your real estate business!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalMessages = [...updatedMessages, errorMsg];
      setMessages(finalMessages);
      localStorage.setItem(`reachmore_chat_history_${sessionId}`, JSON.stringify(finalMessages));
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Direct Manual Lead submission via Interactive Form
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!leadData.name || !leadData.phone || !leadData.company || !leadData.requirement) {
      setFormError("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin?action=createLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          sessionId
        })
      });

      if (res.ok) {
        setLeadFormSubmitted(true);
        // Construct pre-filled Calendly link with user details to enhance user experience
        const calendlyUrl = `https://calendly.com/abhinaychess/30min` +
          `?name=${encodeURIComponent(leadData.name)}` +
          `&phone=${encodeURIComponent(leadData.phone)}` +
          `&a1=${encodeURIComponent(leadData.phone)}` +
          `&a2=${encodeURIComponent(leadData.company)}` +
          `&a3=${encodeURIComponent(leadData.requirement)}`;
        
        // Redirect in the same tab seamlessly to completely avoid browser popup blockers
        window.location.href = calendlyUrl;
      } else {
        throw new Error("Lead submission failed");
      }
    } catch (err) {
      console.error(err);
      setFormError("Failed to save lead. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const handleClearHistory = () => {
    if (confirm("Reset current conversation?")) {
      localStorage.removeItem(`reachmore_chat_history_${sessionId}`);
      const welcome: ChatMessage = {
        sender: "assistant",
        text: settings?.welcomeMessage || "Hey 👋 I'm Reachmore AI Assistant. Let's schedule a demo caller setup for you!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcome]);
      setShowLeadForm(false);
      setLeadFormSubmitted(false);
      setLeadData({ name: "", phone: "", company: "", requirement: "" });
    }
  };

  // Pre-configured Action buttons
  const QUICK_ACTIONS = [
    { label: "Book Demo", icon: Calendar, action: () => setShowLeadForm(true) },
    { label: "See AI Caller Demo", icon: PhoneCall, text: "Can you explain how your sub-0.9s delay AI caller works and does site visit bookings?" },
    { label: "Talk to Team", icon: Info, action: () => setShowLeadForm(true) },
    { label: "Pricing", icon: DollarSign, text: "How much do your custom AI automation setups and callers cost?" },
  ];

  // Pre-configured dynamic Quick replies
  const SUGGESTED_REPLIES = [
    "Can it qualify leads?",
    "Can it speak Telugu?",
    "Can it speak Hindi?",
    "Does it work with Meta ads?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Expandable Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-[92vw] sm:w-[400px] h-[600px] rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(254,93,38,0.15)] flex flex-col overflow-hidden mb-4"
          >
            
            {/* Header Area */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-neutral-950 to-neutral-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FE5D26]/20 to-orange-400/10 border border-[#FE5D26]/30 flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-[#FE5D26]" />
                  {/* Blinking active indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                    Reachmore AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-[#FE5D26] animate-pulse" />
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-400">Agent Node Online</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearHistory}
                  title="Clear chat"
                  className="text-[10px] font-mono text-neutral-500 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/5 hover:border-white/10 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Conversation Window Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-black/30">
              
              {/* Dynamic message rendering */}
              {messages.map((msg, idx) => {
                const isAssistant = msg.sender === "assistant";
                const isSystem = msg.sender === "system";

                if (isSystem) {
                  return (
                    <div key={idx} className="flex flex-col items-center text-center my-4">
                      <div className="p-3.5 rounded-xl border border-[#FE5D26]/20 bg-[#FE5D26]/5 text-neutral-300 text-xs font-light max-w-[85%] leading-relaxed">
                        {msg.text}
                        <a
                          href="https://calendly.com/abhinaychess/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3.5 block w-full py-2 px-4 text-center rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition text-[11px]"
                        >
                          Book Architecture Demo on Calendly
                        </a>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className={`flex gap-3 max-w-[85%] ${isAssistant ? "" : "ml-auto flex-row-reverse"}`}
                  >
                    {/* User or Bot avatar bubble */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isAssistant 
                        ? "bg-neutral-950 border-white/5 text-neutral-400" 
                        : "bg-gradient-to-tr from-[#FE5D26] to-orange-500 border-none text-white"
                    }`}>
                      {isAssistant ? <Bot className="w-4 h-4 text-[#FE5D26]" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className="flex flex-col gap-1">
                      {/* Message Box */}
                      <div className={`rounded-2xl p-3 text-sm leading-relaxed ${
                        isAssistant 
                          ? "bg-white/5 border border-white/5 text-neutral-200 font-light" 
                          : "bg-white/10 border border-white/10 text-white font-normal"
                      }`}>
                        {/* Super clean text formatting support (Markdown highlights) */}
                        {msg.text.split("\n").map((para, pIdx) => (
                          <p key={pIdx} className={pIdx > 0 ? "mt-1.5" : ""}>
                            {para.split("**").map((chunk, cIdx) => 
                              cIdx % 2 === 1 ? <strong key={cIdx} className="font-semibold text-white">{chunk}</strong> : chunk
                            )}
                          </p>
                        ))}

                        {/* If it's the welcome message, show dynamic quick CTAs */}
                        {idx === 0 && (
                          <div className="mt-4 flex flex-col gap-2">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Suggested actions:</p>
                            <div className="flex flex-wrap gap-2">
                              {QUICK_ACTIONS.map((btn) => {
                                const BtnIcon = btn.icon;
                                return (
                                  <button
                                    key={btn.label}
                                    onClick={() => {
                                      if (btn.action) btn.action();
                                      else if (btn.text) handleSendMessage(btn.text);
                                    }}
                                    className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 hover:text-[#FE5D26] hover:border-[#FE5D26]/30 hover:bg-[#FE5D26]/5 transition cursor-pointer"
                                  >
                                    <BtnIcon className="w-3.5 h-3.5" />
                                    {btn.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Message Timestamp */}
                      <span className={`text-[9px] font-mono text-neutral-500 mt-1 ${isAssistant ? "" : "text-right"}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Dot indicator */}
              {isLoading && !showLeadForm && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-neutral-950 border-white/5 text-neutral-400">
                    <Bot className="w-4 h-4 text-[#FE5D26]" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#FE5D26] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#FE5D26] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#FE5D26] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sliding Premium Lead Form Overlay */}
            <AnimatePresence>
              {showLeadForm && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-x-0 bottom-0 top-[20%] z-20 border-t border-white/10 bg-black/95 backdrop-blur-2xl p-5 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#FE5D26]" />
                        Book AI Demo
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">Let's build a customized caller blueprint for your business</p>
                    </div>
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white bg-white/5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {!leadFormSubmitted ? (
                    <form onSubmit={handleLeadSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
                      <div className="space-y-3 pr-1">
                        <div>
                          <label className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Abhinay Resu"
                            value={leadData.name}
                            onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                            className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">Phone Number *</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +91 9876543210"
                              value={leadData.phone}
                              onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                              className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">Company *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Apex Brokerages"
                              value={leadData.company}
                              onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                              className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">AI Requirement *</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="e.g. AI voice agents to follow up with Meta leads and book site visits"
                            value={leadData.requirement}
                            onChange={(e) => setLeadData({ ...leadData, requirement: e.target.value })}
                            className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-3 py-2 text-xs text-white outline-none transition resize-none"
                          />
                        </div>

                        {formError && (
                          <p className="text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#FE5D26] to-orange-500 text-white font-semibold text-xs hover:opacity-95 transition shadow-[0_4px_15px_rgba(254,93,38,0.3)] hover:scale-[1.01]"
                      >
                        {isLoading ? "Synchronizing lead databases..." : "Request Technical Consultation 🚀"}
                      </button>
                    </form>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4"
                      >
                        <CheckCircle2 className="w-7 h-7" />
                      </motion.div>
                      <h5 className="text-sm font-semibold text-white mb-2">Lead Qualification Complete!</h5>
                      <p className="text-[11px] text-neutral-400 max-w-[240px] leading-relaxed mb-6">
                        Your requirement is securely locked! Let's pick a time on Calendly to finalize your system architecture:
                      </p>
                      
                      <a
                        href={`https://calendly.com/abhinaychess/30min?name=${encodeURIComponent(leadData.name)}&phone=${encodeURIComponent(leadData.phone)}&a1=${encodeURIComponent(leadData.phone)}&a2=${encodeURIComponent(leadData.company)}&a3=${encodeURIComponent(leadData.requirement)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setTimeout(() => {
                            setShowLeadForm(false);
                            // Insert helper success message
                            const successMsg: ChatMessage = {
                              sender: "assistant",
                              text: `Perfect! Thank you **${leadData.name}**! 🚀 I've passed your requirement (*${leadData.requirement}*) straight to our conversational engineering team and opened Calendly. We'll be in touch within 2 hours!`,
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            };
                            const finalMessages = [...messages, successMsg];
                            setMessages(finalMessages);
                            localStorage.setItem(`reachmore_chat_history_${sessionId}`, JSON.stringify(finalMessages));
                          }, 1200);
                        }}
                        className="flex items-center gap-2 justify-center py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-xs hover:opacity-95 transition shadow-[0_4px_15px_rgba(16,185,129,0.3)] w-full text-center"
                      >
                        <Calendar className="w-4 h-4" />
                        Book Consultation on Calendly
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick replies & Chat Input Tray */}
            <div className="p-4 border-t border-white/5 bg-neutral-950 flex flex-col gap-3">
              
              {/* Render dynamic suggested replies above input if not in form mode */}
              {!showLeadForm && messages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pr-1 pb-1 scrollbar-hide">
                  {SUGGESTED_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSendMessage(reply)}
                      className="shrink-0 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[11px] text-neutral-400 hover:text-white hover:border-[#FE5D26]/20 transition cursor-pointer"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input Field form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputVal);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  disabled={showLeadForm || isLoading}
                  placeholder={showLeadForm ? "Please complete form..." : "Ask Reachmore AI..."}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-neutral-900 border border-white/5 focus:border-[#FE5D26]/30 focus:ring-1 focus:ring-[#FE5D26]/30 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || showLeadForm || isLoading}
                  className="w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-[#FE5D26] to-orange-500 text-white flex items-center justify-center hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Pulsing Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FE5D26] to-orange-500 text-white shadow-[0_8px_30px_rgba(254,93,38,0.4)] flex items-center justify-center relative cursor-pointer outline-none border-none group"
      >
        <span className="absolute inset-0 rounded-full bg-[#FE5D26] opacity-35 blur-md scale-105 group-hover:scale-110 transition duration-300" />
        <span className="absolute -inset-1 rounded-full border border-[#FE5D26]/30 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: "3s" }} />
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageSquare className="w-6 h-6 relative z-10" />}
      </motion.button>

    </div>
  );
}
