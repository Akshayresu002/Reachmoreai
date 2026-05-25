"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Calendar,
  MessageSquare,
  Database,
  TrendingUp,
  Cpu,
  Headphones,
} from "lucide-react";

const services = [
  {
    title: "AI Voice Callers",
    description:
      "Ultra-realistic, low-latency voice agents that answer inbound queries, handle outbound cold calls, and speak exactly like a human agent.",
    icon: PhoneCall,
    color: "from-purple-500/20 to-indigo-500/5",
    border: "group-hover:border-purple-500/30",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  {
    title: "AI Appointment Setters",
    description:
      "Intelligent scheduling systems that converse with prospects, answer calendar constraints, and book qualified meetings on autopilot.",
    icon: Calendar,
    color: "from-blue-500/20 to-cyan-500/5",
    border: "group-hover:border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    title: "AI Chatbots",
    description:
      "Enterprise-grade contextual chat assistants that understand product specifications, answer complex questions, and capture high-intent leads.",
    icon: MessageSquare,
    color: "from-emerald-500/20 to-teal-500/5",
    border: "group-hover:border-emerald-500/30",
    glow: "rgba(16, 185, 129, 0.12)",
  },
  {
    title: "CRM Automation",
    description:
      "Seamless integrations that sync phone logs, chat transcriptions, sentiment analysis, and lead scoring directly into your Salesforce or Hubspot CRM.",
    icon: Database,
    color: "from-orange-500/20 to-amber-500/5",
    border: "group-hover:border-orange-500/30",
    glow: "rgba(249, 115, 22, 0.12)",
  },
  {
    title: "AI Sales Systems",
    description:
      "Advanced predictive outbound messaging, hyper-personalized email sequencing, and intelligent prospect research tools to accelerate pipeline velocity.",
    icon: TrendingUp,
    color: "from-pink-500/20 to-rose-500/5",
    border: "group-hover:border-pink-500/30",
    glow: "rgba(236, 72, 153, 0.12)",
  },
  {
    title: "Workflow Automation",
    description:
      "Custom triggers, webhooks, and automated data pipelines that eliminate repetitive manual back-office tasks and human operational errors.",
    icon: Cpu,
    color: "from-violet-500/20 to-fuchsia-500/5",
    border: "group-hover:border-violet-500/30",
    glow: "rgba(167, 139, 250, 0.15)",
  },
  {
    title: "AI Customer Support",
    description:
      "24/7 instant omnichannel resolving agents capable of addressing customer tickets, dispatching helpful resources, and escalating edge cases.",
    icon: Headphones,
    color: "from-cyan-500/20 to-teal-500/5",
    border: "group-hover:border-cyan-500/30",
    glow: "rgba(6, 182, 212, 0.12)",
  },
];

export default function Services() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.setProperty("--x", `${e.clientX - box.left}px`);
    card.style.setProperty("--y", `${e.clientY - box.top}px`);
    
    // Rotate coordinates (max 2 degrees for refined elegant support)
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
      id="services"
      className="relative py-28 bg-transparent overflow-hidden border-t border-neutral-900"
    >
      {/* Visual glowing points */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest text-purple-400 uppercase"
          >
            Core Infrastructure
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-6 leading-tight"
          >
            Autonomous AI Systems Built to Scale Operations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-400 font-light leading-relaxed"
          >
            We design, train, and orchestrate custom AI agents and workflow automations to capture missing revenue, speed up client response cycles, and automate manual overhead.
          </motion.p>
        </div>

        {/* Services Grid (Premium Asymmetric Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFeatured = index === 6;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: Math.min(index * 0.1, 0.4),
                  ease: [0.16, 1, 0.3, 1] as any,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-2xl glass-card overflow-hidden p-8 flex flex-col justify-between cursor-pointer ${
                  isFeatured ? "md:col-span-2 lg:col-span-3 flex-row md:items-center gap-6" : ""
                }`}
                style={{
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s",
                }}
              >
                {/* Visual Glassmorphism gradient backlights tracking mouse coordinates */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 220px at var(--x, 0px) var(--y, 0px), ${service.glow}, transparent 80%)`,
                  }}
                />

                <div className={`${isFeatured ? "flex-1" : ""}`}>
                  {/* Icon with spin/scale on hover */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 mb-6 group-hover:scale-105 group-hover:rotate-[3deg] group-hover:border-purple-500/30 transition-all duration-300">
                    <Icon className="w-5 h-5 text-white group-hover:text-purple-400 transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-light text-neutral-400 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>

                {/* Additional premium accent lines/nodes for the featured card */}
                {isFeatured && (
                  <div className="hidden lg:flex items-center gap-8 pl-12 border-l border-white/5">
                    <div className="flex flex-col gap-1.5 text-right font-mono">
                      <span className="text-[10px] text-neutral-500 tracking-wider">RESPONSE VELOCITY</span>
                      <span className="text-lg text-emerald-400 font-bold">&lt; 0.9s Latency</span>
                    </div>
                    <div className="flex flex-col gap-1.5 text-right font-mono">
                      <span className="text-[10px] text-neutral-500 tracking-wider">UPTIME RATING</span>
                      <span className="text-lg text-purple-400 font-bold">99.99% Guaranteed</span>
                    </div>
                  </div>
                )}

                {/* Bottom line glow decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-purple-500/40 transition-colors duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
