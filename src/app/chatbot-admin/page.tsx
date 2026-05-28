"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Lock,
  Settings,
  Users,
  HelpCircle,
  Download,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Database,
  X
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface AdminSettings {
  enabled: boolean;
  welcomeMessage: string;
  aiInstructions: string;
  themeColor: string;
  faqs: FAQ[];
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  company: string;
  requirement: string;
  timestamp: string;
  sessionId: string;
}

interface ChatSession {
  id: string;
  messages: { sender: string; text: string; timestamp: string }[];
  timestamp: string;
  leadCaptured: boolean;
}

export default function ChatbotAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState<"leads" | "settings" | "faqs" | "logs">("leads");
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");

  // FAQ Modal states
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  // Conversation Viewer states
  const [viewingSession, setViewingSession] = useState<ChatSession | null>(null);

  // 1. Authenticate with sessionStorage persistence
  useEffect(() => {
    const verified = sessionStorage.getItem("reachmore_admin_auth");
    if (verified === "true") {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  // Silent background polling every 10 seconds for real-time lead updates
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      const quietFetch = async () => {
        try {
          const [resSettings, resLeads, resSessions] = await Promise.all([
            fetch("/api/admin?action=getSettings"),
            fetch("/api/admin?action=getLeads"),
            fetch("/api/admin?action=getSessions")
          ]);
          if (resSettings.ok && resLeads.ok && resSessions.ok) {
            setSettings(await resSettings.json());
            setLeads(await resLeads.json());
            setSessions(await resSessions.json());
          }
        } catch (err) {
          console.error("Quiet background polling failed:", err);
        }
      };
      quietFetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "admin" && password === "Admin9059") {
      setIsAuthenticated(true);
      sessionStorage.setItem("reachmore_admin_auth", "true");
      fetchDashboardData();
    } else {
      setAuthError("Invalid username or password. Please verify credentials.");
    }
  };

  // 2. Fetch leads, sessions, and settings from APIs
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [resSettings, resLeads, resSessions] = await Promise.all([
        fetch("/api/admin?action=getSettings"),
        fetch("/api/admin?action=getLeads"),
        fetch("/api/admin?action=getSessions")
      ]);

      if (resSettings.ok && resLeads.ok && resSessions.ok) {
        setSettings(await resSettings.json());
        setLeads(await resLeads.json());
        setSessions(await resSessions.json());
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Save modified configurations
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin?action=updateSettings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus(""), 2500);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
    }
  };

  // 4. CRUD operations for Dynamic FAQs
  const handleAddOrEditFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    let updatedFaqs = [...settings.faqs];

    if (editingFaq) {
      // Edit mode
      updatedFaqs = updatedFaqs.map(f => f.id === editingFaq.id ? { ...f, question: newFaq.question, answer: newFaq.answer } : f);
    } else {
      // Add mode
      const createdFaq: FAQ = {
        id: `faq_${Math.random().toString(36).substring(2, 9)}`,
        question: newFaq.question,
        answer: newFaq.answer
      };
      updatedFaqs.push(createdFaq);
    }

    const updatedSettings = { ...settings, faqs: updatedFaqs };
    setSettings(updatedSettings);

    // Save directly to backend
    try {
      await fetch("/api/admin?action=updateSettings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings)
      });
      setShowFaqModal(false);
      setEditingFaq(null);
      setNewFaq({ question: "", answer: "" });
    } catch (err) {
      console.error("Failed to save FAQ", err);
    }
  };

  const handleDeleteFaq = async (faqId: string) => {
    if (!settings || !confirm("Delete this FAQ?")) return;

    const filtered = settings.faqs.filter(f => f.id !== faqId);
    const updatedSettings = { ...settings, faqs: filtered };
    setSettings(updatedSettings);

    try {
      await fetch("/api/admin?action=updateSettings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings)
      });
    } catch (err) {
      console.error("Failed to delete FAQ", err);
    }
  };

  // 5. Data export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    // Header
    let csvContent = "data:text/csv;charset=utf-8,ID,Name,Phone,Company,Requirement,Timestamp,SessionID\n";
    
    // Rows
    leads.forEach(l => {
      const row = [
        l.id,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.phone}"`,
        `"${l.company.replace(/"/g, '""')}"`,
        `"${l.requirement.replace(/"/g, '""')}"`,
        l.timestamp,
        l.sessionId
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reachmore_leads_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Lock Shield if passcode is not verified
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#FE5D26]/20">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative overflow-hidden">
          {/* Neon backlighting */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[450px] h-[350px] bg-[#FE5D26]/5 rounded-full blur-[110px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[90vw] sm:w-[450px] rounded-2xl border border-white/5 bg-neutral-950/60 backdrop-blur-xl p-8 shadow-2xl relative z-10 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FE5D26]/10 border border-[#FE5D26]/20 flex items-center justify-center text-[#FE5D26] mx-auto mb-6">
              <Lock className="w-5 h-5" />
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Reachmore AI Control Center</h1>
             <p className="text-xs font-light text-neutral-400 mb-8">Access is restricted to authorized operations engineers. Enter credentials to authorize node.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-4 py-3 text-xs text-white outline-none transition"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-4 py-3 text-xs text-white outline-none transition"
              />
              {authError && <p className="text-xs text-red-400 mt-2 font-mono">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FE5D26] to-orange-500 text-white font-semibold text-xs hover:opacity-95 transition tracking-wider shadow-[0_4px_15px_rgba(254,93,38,0.2)] mt-2 cursor-pointer"
              >
                AUTHORIZE NODE
              </button>
            </form>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#FE5D26]/20">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-[#FE5D26]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/5 mb-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#FE5D26] uppercase">Reachmore Operations Mainframe</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">AI Chatbot Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchDashboardData}
                className="flex items-center gap-1 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white rounded-full px-3 py-1.5 text-[11px] font-mono transition cursor-pointer"
              >
                <span>REFRESH</span>
                <Sparkles className="w-3 h-3 text-[#FE5D26] animate-pulse" />
              </button>
              <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full px-3 py-1.5 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM RUNNING
              </span>
              <button
                onClick={() => {
                  sessionStorage.removeItem("reachmore_admin_auth");
                  setIsAuthenticated(false);
                }}
                className="text-[10px] font-mono text-neutral-400 hover:text-white px-3 py-1.5 rounded bg-white/5 border border-white/5 hover:border-white/10 transition cursor-pointer"
              >
                LOGOUT
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-2 border-white/10 border-t-[#FE5D26] rounded-full animate-spin" />
              <p className="text-xs font-mono text-neutral-500">Querying local databases...</p>
            </div>
          ) : (
            <>
              {/* Metric Analytics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                
                <div className="rounded-xl border border-white/5 bg-neutral-950/40 p-5">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#FE5D26]" />
                    Total Leads
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-white">{leads.length}</h3>
                  <p className="text-[9px] font-mono text-neutral-500 mt-1">Saved to chat-db.json</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-neutral-950/40 p-5">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                    Conversations
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-white">{sessions.length}</h3>
                  <p className="text-[9px] font-mono text-neutral-500 mt-1">Total visitor sessions</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-neutral-950/40 p-5">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                    Dynamic FAQs
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-white">{(settings?.faqs || []).length}</h3>
                  <p className="text-[9px] font-mono text-neutral-500 mt-1">Feeding RAG context</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-neutral-950/40 p-5">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    Chatbot Status
                  </div>
                  <h3 className={`text-sm font-bold mt-4 font-mono flex items-center gap-1.5 ${settings?.enabled ? "text-emerald-400" : "text-amber-400"}`}>
                    <span className={`w-2 h-2 rounded-full ${settings?.enabled ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {settings?.enabled ? "ONLINE & ACTIVE" : "DEACTIVATED"}
                  </h3>
                </div>

              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/5 gap-6 mb-8 text-sm">
                <button
                  onClick={() => setActiveTab("leads")}
                  className={`pb-4 font-semibold tracking-wide border-b-2 transition cursor-pointer flex items-center gap-2 ${
                    activeTab === "leads" ? "text-white border-[#FE5D26]" : "text-neutral-500 border-transparent hover:text-neutral-300"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Captured Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`pb-4 font-semibold tracking-wide border-b-2 transition cursor-pointer flex items-center gap-2 ${
                    activeTab === "settings" ? "text-white border-[#FE5D26]" : "text-neutral-500 border-transparent hover:text-neutral-300"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Chatbot Settings
                </button>
                <button
                  onClick={() => setActiveTab("faqs")}
                  className={`pb-4 font-semibold tracking-wide border-b-2 transition cursor-pointer flex items-center gap-2 ${
                    activeTab === "faqs" ? "text-white border-[#FE5D26]" : "text-neutral-500 border-transparent hover:text-neutral-300"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  Dynamic FAQs ({(settings?.faqs || []).length})
                </button>
                <button
                  onClick={() => setActiveTab("logs")}
                  className={`pb-4 font-semibold tracking-wide border-b-2 transition cursor-pointer flex items-center gap-2 ${
                    activeTab === "logs" ? "text-white border-[#FE5D26]" : "text-neutral-500 border-transparent hover:text-neutral-300"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat logs
                </button>
              </div>

              {/* Tab 1: Leads Panel */}
              {activeTab === "leads" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">Leads Database</h4>
                      <p className="text-xs text-neutral-400">Captured naturally via chat logic or inline forms.</p>
                    </div>
                    {leads.length > 0 && (
                      <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        Export leads (CSV)
                      </button>
                    )}
                  </div>

                  {leads.length === 0 ? (
                    <div className="rounded-2xl border border-white/5 bg-neutral-950/20 p-12 text-center">
                      <Users className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
                      <p className="text-sm font-medium text-white mb-1">No Leads Captured Yet</p>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">Once visitors interact with the floating chatbot or complete the consultation booking form, their profiles will list here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-white/5 bg-neutral-950/20">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-950/50">
                            <th className="p-4">Lead Name</th>
                            <th className="p-4">Contact Phone</th>
                            <th className="p-4">Company Name</th>
                            <th className="p-4">Requirement Summary</th>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
                          {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-semibold text-white">{lead.name}</td>
                              <td className="p-4 font-mono">{lead.phone}</td>
                              <td className="p-4">{lead.company}</td>
                              <td className="p-4 max-w-[250px] truncate" title={lead.requirement}>
                                {lead.requirement}
                              </td>
                              <td className="p-4 font-mono text-[10px] text-neutral-500">
                                {new Date(lead.timestamp).toLocaleString()}
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => {
                                    const sess = sessions.find(s => s.id === lead.sessionId);
                                    if (sess) setViewingSession(sess);
                                    else alert("Conversation history log was cleaned or is missing.");
                                  }}
                                  className="inline-flex items-center gap-1 text-[#FE5D26] hover:text-orange-400 font-semibold cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  Inspect Session
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Settings Panel */}
              {activeTab === "settings" && settings && (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Global Chatbot Settings</h4>
                    <p className="text-xs text-neutral-400">Control active state, instructions, welcome copy, and styles.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column Forms */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      <div className="rounded-xl border border-white/5 bg-neutral-950/30 p-6 space-y-4">
                        {/* Toggle enabled */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <div>
                            <label className="text-sm font-semibold text-white block">Active Status</label>
                            <span className="text-xs text-neutral-400">Enable or disable the floating chatbot across the Reachmore AI website instantly.</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSettings({ ...settings, enabled: !settings.enabled })}
                            className="text-neutral-400 hover:text-white cursor-pointer"
                          >
                            {settings.enabled ? (
                              <ToggleRight className="w-10 h-10 text-[#FE5D26]" />
                            ) : (
                              <ToggleLeft className="w-10 h-10 text-neutral-600" />
                            )}
                          </button>
                        </div>

                        {/* Welcome Message Input */}
                        <div className="pt-2">
                          <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-2">Welcome Message Copy</label>
                          <textarea
                            rows={3}
                            value={settings.welcomeMessage}
                            onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                            className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-4 py-3 text-xs text-white outline-none transition"
                          />
                        </div>
                      </div>

                      {/* AI instructions block */}
                      <div className="rounded-xl border border-white/5 bg-neutral-950/30 p-6">
                        <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#FE5D26] animate-pulse" />
                          AI System Instructions & Persona
                        </label>
                        <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed">Customize the persona, system parameters, context weights, and qualification questions. Feed new behavior constraints below.</p>
                        <textarea
                          rows={12}
                          value={settings.aiInstructions}
                          onChange={(e) => setSettings({ ...settings, aiInstructions: e.target.value })}
                          className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-4 py-3 text-xs font-mono text-neutral-300 leading-relaxed outline-none transition"
                        />
                      </div>

                    </div>

                    {/* Right Style / Details Column */}
                    <div className="space-y-6">
                      
                      <div className="rounded-xl border border-white/5 bg-neutral-950/30 p-6 space-y-4">
                        <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block">Interface Accent Color</label>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: "Reachmore Orange", color: "#FE5D26" },
                            { name: "Nebula Purple", color: "#8B5CF6" },
                            { name: "Cosmic Blue", color: "#3B82F6" }
                          ].map((t) => (
                            <button
                              key={t.color}
                              type="button"
                              onClick={() => setSettings({ ...settings, themeColor: t.color })}
                              className={`rounded-lg border p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition ${
                                settings.themeColor === t.color 
                                  ? "border-[#FE5D26] bg-[#FE5D26]/5 text-white" 
                                  : "border-white/5 bg-neutral-900 text-neutral-400 hover:border-white/10"
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full" style={{ backgroundColor: t.color }} />
                              <span className="text-[10px] text-center tracking-wide">{t.name.split(" ")[1]}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-neutral-950/30 p-6 text-xs space-y-4">
                        <h5 className="font-semibold text-white">Mainframe Settings Control</h5>
                        <p className="text-neutral-400 leading-relaxed">Updating settings will automatically rewrite server caches. Ensure instruction structures include lead-capture tags for correct parsing.</p>
                        
                        {saveStatus === "saving" && (
                          <p className="text-blue-400 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                            Overwriting local databases...
                          </p>
                        )}
                        {saveStatus === "success" && (
                          <p className="text-emerald-400 font-mono flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" />
                            Configurations deployed!
                          </p>
                        )}
                        {saveStatus === "error" && (
                          <p className="text-red-400 font-mono flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" />
                            Failed to save settings.
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={saveStatus === "saving"}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FE5D26] to-orange-500 text-white font-semibold text-xs hover:opacity-95 transition tracking-wider shadow-[0_4px_15px_rgba(254,93,38,0.2)] cursor-pointer"
                        >
                          DEPLOY CONFIGURATIONS
                        </button>
                      </div>

                    </div>

                  </div>
                </form>
              )}

              {/* Tab 3: Dynamic FAQs Panel */}
              {activeTab === "faqs" && settings && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">Dynamic FAQ Manager</h4>
                      <p className="text-xs text-neutral-400">Add or edit key responses that feed directly into the AI assistant's context database.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingFaq(null);
                        setNewFaq({ question: "", answer: "" });
                        setShowFaqModal(true);
                      }}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FE5D26] to-orange-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-95 transition cursor-pointer shadow-[0_4px_15px_rgba(254,93,38,0.1)]"
                    >
                      <Plus className="w-4 h-4" />
                      Add FAQ Response
                    </button>
                  </div>

                  {settings.faqs.length === 0 ? (
                    <div className="rounded-2xl border border-white/5 bg-neutral-950/20 p-12 text-center">
                      <HelpCircle className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
                      <p className="text-sm font-medium text-white mb-1">No Dynamic FAQs Added</p>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">The chatbot uses its website context. Add specific FAQs here to inject custom override responses.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {settings.faqs.map((faq) => (
                        <div key={faq.id} className="rounded-xl border border-white/5 bg-neutral-950/40 p-5 flex flex-col justify-between hover:border-white/10 transition">
                          <div>
                            <h5 className="text-sm font-semibold text-white mb-2 flex items-start gap-2">
                              <span className="text-[#FE5D26] font-mono shrink-0">Q:</span>
                              {faq.question}
                            </h5>
                            <p className="text-xs text-neutral-400 leading-relaxed pl-5 font-light">
                              {faq.answer}
                            </p>
                          </div>
                          
                          <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-white/5">
                            <button
                              onClick={() => {
                                setEditingFaq(faq);
                                setNewFaq({ question: faq.question, answer: faq.answer });
                                setShowFaqModal(true);
                              }}
                              className="text-neutral-500 hover:text-white p-1 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="text-neutral-500 hover:text-red-400 p-1 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Logs panel */}
              {activeTab === "logs" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white">Raw Conversation Logs</h4>
                    <p className="text-xs text-neutral-400">Inspect full message histories of all visitor threads for diagnostic debugging.</p>
                  </div>

                  {sessions.length === 0 ? (
                    <div className="rounded-2xl border border-white/5 bg-neutral-950/20 p-12 text-center">
                      <MessageSquare className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
                      <p className="text-sm font-medium text-white mb-1">No Chat Sessions Logged</p>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">Conversations will populate here once visitors initiate conversations with the floating widget.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sessions.map((sess) => (
                        <div key={sess.id} className="rounded-xl border border-white/5 bg-neutral-950/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono font-semibold text-white">{sess.id}</span>
                              {sess.leadCaptured && (
                                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5 text-[9px] font-mono">
                                  LEAD CAPTURED
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-neutral-500 font-mono mt-1">
                              Last Message: {new Date(sess.timestamp).toLocaleString()} ({sess.messages.length} messages)
                            </p>
                          </div>
                          
                          <button
                            onClick={() => setViewingSession(sess)}
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition cursor-pointer shrink-0"
                          >
                            <Eye className="w-4 h-4" />
                            Inspect Chat Thread
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* 1. Modal: FAQ Editor Form */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[90vw] sm:w-[500px] rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h4 className="text-sm font-bold text-white">{editingFaq ? "Modify Dynamic FAQ" : "Register Dynamic FAQ"}</h4>
              <button
                onClick={() => {
                  setShowFaqModal(false);
                  setEditingFaq(null);
                }}
                className="text-neutral-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddOrEditFaq} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Question / User Query *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Do you integrate with Salesforce?"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Answer / Chatbot Response *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="e.g. Yes, Reachmore AI builds seamless bi-directional Salesforce connectors..."
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/10 focus:border-[#FE5D26]/40 focus:ring-1 focus:ring-[#FE5D26]/40 rounded-xl px-3 py-2 text-xs text-white outline-none transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFaqModal(false);
                    setEditingFaq(null);
                  }}
                  className="rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs text-neutral-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-[#FE5D26] to-orange-500 text-white font-semibold text-xs px-5 py-2.5 hover:opacity-95 transition cursor-pointer"
                >
                  {editingFaq ? "Save Override" : "Register Override"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Modal: Conversation Logs Viewer */}
      {viewingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[92vw] sm:w-[500px] h-[550px] rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center pb-4 border-b border-white/5 shrink-0">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#FE5D26]" />
                  Chat Inspector
                </h4>
                <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Session: {viewingSession.id}</p>
              </div>
              <button
                onClick={() => setViewingSession(null)}
                className="text-neutral-500 hover:text-white bg-white/5 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-4 space-y-4 my-2 pr-1">
              {viewingSession.messages.map((msg, i) => {
                const isAssistant = msg.sender === "assistant";
                return (
                  <div key={i} className={`flex gap-3 max-w-[85%] ${isAssistant ? "" : "ml-auto flex-row-reverse"}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-[10px] ${
                      isAssistant ? "bg-neutral-950 border-white/5 text-[#FE5D26]" : "bg-neutral-900 border-white/10 text-white"
                    }`}>
                      {isAssistant ? "AI" : "User"}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className={`rounded-xl p-3 text-xs leading-relaxed ${
                        isAssistant ? "bg-white/5 text-neutral-300 font-light" : "bg-[#FE5D26]/10 border border-[#FE5D26]/10 text-white"
                      }`}>
                        {msg.text.split("\n").map((para, pIdx) => (
                          <p key={pIdx} className={pIdx > 0 ? "mt-1.5" : ""}>
                            {para.split("**").map((chunk, cIdx) => 
                              cIdx % 2 === 1 ? <strong key={cIdx} className="font-semibold text-white">{chunk}</strong> : chunk
                            )}
                          </p>
                        ))}
                      </div>
                      <span className="text-[8px] font-mono text-neutral-600 mt-1">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/5 shrink-0 flex justify-end">
              <button
                onClick={() => setViewingSession(null)}
                className="rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
