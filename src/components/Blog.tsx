"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowUpRight } from "lucide-react";

interface Article {
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  slug: string;
  keywords: string[];
  glow: string;
}

const articles: Article[] = [
  {
    title: "The Ultimate Guide to AI Voice Agents for Small Businesses",
    category: "Guides",
    readTime: "6 min read",
    snippet: "Discover how human-like artificial intelligence callers answer inbound phone lines, resolve customer problems, and generate recurring meetings automatically.",
    slug: "guide-to-ai-voice-agents",
    keywords: ["AI voice callers", "AI phone answering", "AI lead generation"],
    glow: "rgba(139, 92, 246, 0.1)",
  },
  {
    title: "How Real Estate Agents Use AI to Book More Appointments",
    category: "Case Studies",
    readTime: "5 min read",
    snippet: "Learn the exact conversational framework top realtors use to capture cold inquiries and instantly secure scheduled calendar bookings without lifting a finger.",
    slug: "real-estate-ai-appointments",
    keywords: ["AI appointment setters", "AI lead response", "real estate AI"],
    glow: "rgba(59, 130, 246, 0.1)",
  },
  {
    title: "Why Car Detailing Businesses Need AI Phone Answering",
    category: "Insights",
    readTime: "4 min read",
    snippet: "Stop letting missed phone calls go to local competitors. Here is how automated answering systems ensure every inquiry gets priced, booked, and closed.",
    slug: "car-detailing-ai-answering",
    keywords: ["AI phone answering", "lead response", "workflow automation agency"],
    glow: "rgba(16, 185, 129, 0.08)",
  },
  {
    title: "Agentic AI vs Traditional Chatbots",
    category: "Tech",
    readTime: "7 min read",
    snippet: "An in-depth analysis of simple if-then decision trees vs autonomous, context-aware AI agents designed to handle fluid customer service dialogues.",
    slug: "agentic-ai-vs-traditional-chatbots",
    keywords: ["AI chatbots for business", "workflow automation agency", "AI customer support"],
    glow: "rgba(236, 72, 153, 0.08)",
  },
  {
    title: "AI CRM Automation for SaaS Companies",
    category: "Operations",
    readTime: "5 min read",
    snippet: "Optimize your product pipeline by integrating outbound call records, customer sentiment scores, and trigger logic directly into Salesforce and HubSpot.",
    slug: "ai-crm-automation-saas",
    keywords: ["CRM automation services", "workflow automation", "AI lead generation"],
    glow: "rgba(167, 139, 250, 0.1)",
  },
  {
    title: "The Future of AI Sales Systems",
    category: "Deep Dives",
    readTime: "8 min read",
    snippet: "How highly personalized predictive outreach, multi-channel automated messaging, and hyper-targeted lead lists are changing sales pipelines.",
    slug: "future-of-ai-sales-systems",
    keywords: ["AI sales systems", "CRM automation services", "AI lead generation"],
    glow: "rgba(6, 182, 212, 0.08)",
  },
];

const categories = ["All", "Guides", "Case Studies", "Insights", "Tech", "Operations", "Deep Dives"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.setProperty("--x", `${e.clientX - box.left}px`);
    card.style.setProperty("--y", `${e.clientY - box.top}px`);
    
    // Smooth rotate (max 2 degrees for refined elegant support)
    const rotateX = -(y / box.height) * 2;
    const rotateY = (x / box.width) * 2;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <section
      id="blogs"
      className="relative py-28 bg-transparent overflow-hidden border-t border-neutral-900"
    >
      {/* Visual background lights */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest text-purple-400 uppercase"
          >
            Insights & Guides
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-6 leading-tight"
          >
            SEO Knowledge Center
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-400 font-light leading-relaxed"
          >
            Expert analysis on AI voice callers, operational integrations, workflow architectures, and CRM automation designed to scale contemporary business systems.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 border-b border-white/5 pb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap focus:outline-none cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-white text-black font-semibold"
                    : "bg-white/5 text-neutral-400 border border-white/5 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search articles & keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950/60 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/10 transition-all"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art) => (
              <motion.article
                layout
                key={art.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex flex-col justify-between rounded-2xl glass-card overflow-hidden p-6 min-h-[440px] cursor-pointer"
                style={{
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s",
                }}
              >
                {/* Volumetric spotlights */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 200px at var(--x, 0px) var(--y, 0px), ${art.glow}, transparent 80%)`,
                  }}
                />

                {/* Sweeping reading progress line gauge on hover */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none" />

                <div>
                  {/* Visual Tech Thumbnail Gradient Box */}
                  <div className="w-full aspect-[2/1] rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-white/5 relative group-hover:border-purple-500/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Decorative orbital wireframes inside the thumbnail */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-dashed border-white/5 group-hover:border-purple-500/10 group-hover:rotate-[20deg] transition-all duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/5 group-hover:border-blue-500/15 group-hover:rotate-[-20deg] transition-all duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-purple-500/40 shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-all duration-500" />
                  </div>

                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-semibold">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-white mb-3 leading-snug group-hover:text-purple-300 transition-colors duration-300">
                    {art.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-xs font-light text-neutral-400 leading-relaxed mb-6">
                    {art.snippet}
                  </p>
                </div>

                {/* Bottom Keyword Tags & Link */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {art.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[9px] font-mono bg-white/5 border border-white/5 text-neutral-400 py-0.5 px-2 rounded-full"
                      >
                        #{kw.replace(/\s+/g, "").toLowerCase()}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white transition-colors duration-300 font-medium">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Result */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-neutral-500 font-mono text-sm"
          >
            No articles found matching &quot;{searchQuery}&quot;
          </motion.div>
        )}
      </div>
    </section>
  );
}
