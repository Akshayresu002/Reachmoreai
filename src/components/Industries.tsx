"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  BadgeCent,
  Stethoscope,
  HeartPulse,
  Home,
  Wrench,
  Layers,
  Sparkles,
} from "lucide-react";

const industries = [
  {
    name: "Real Estate",
    code: "IND-01",
    useCase: "AI Voice Callers qualify inbound leads, schedule home walkthroughs, and handle outbound cold calling on autopilot.",
    icon: Building2,
    glow: "rgba(139, 92, 246, 0.08)",
  },
  {
    name: "Mortgage",
    code: "IND-02",
    useCase: "Automated document gathering, loan officer appointment booking, and instant pre-qualification chatbots.",
    icon: BadgeCent,
    glow: "rgba(59, 130, 246, 0.08)",
  },
  {
    name: "Clinics",
    code: "IND-03",
    useCase: "HIPAA-compliant voice answering systems to handle appointment booking, emergency triage, and prescription follow-ups.",
    icon: Stethoscope,
    glow: "rgba(139, 92, 246, 0.08)",
  },
  {
    name: "Healthcare",
    code: "IND-04",
    useCase: "Intelligent scheduling systems that scale clinical communication channels, automate patient check-ins and discharge notifications.",
    icon: HeartPulse,
    glow: "rgba(59, 130, 246, 0.08)",
  },
  {
    name: "Home Services",
    code: "IND-05",
    useCase: "24/7 call dispatching AI voice agents that coordinate bookings, instantly quote emergency repairs, and follow up on quotes.",
    icon: Home,
    glow: "rgba(139, 92, 246, 0.08)",
  },
  {
    name: "Car Detailing",
    code: "IND-06",
    useCase: "AI phone answering agents that capture missed calls, send customized scheduling links, and upsell premium packages.",
    icon: Wrench,
    glow: "rgba(59, 130, 246, 0.08)",
  },
  {
    name: "SaaS",
    code: "IND-07",
    useCase: "Autonomous product onboarding chat sequences, automated CRM lead routing, and outbound email set-ups.",
    icon: Layers,
    glow: "rgba(139, 92, 246, 0.08)",
  },
  {
    name: "Coaches",
    code: "IND-08",
    useCase: "Interactive high-converting VSL qualification flows, instant booking integrations, and email nurturing sequences.",
    icon: Sparkles,
    glow: "rgba(59, 130, 246, 0.08)",
  },
];

export default function Industries() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.setProperty("--x", `${e.clientX - box.left}px`);
    card.style.setProperty("--y", `${e.clientY - box.top}px`);
    
    // Smooth tilt calculations (max 2 degrees for elegant support)
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
      id="industries"
      className="relative py-28 bg-transparent overflow-hidden border-t border-neutral-900"
    >
      {/* Background line graphics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.0015)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono tracking-widest text-purple-400 uppercase"
            >
              Enterprise Deployment
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4 leading-tight"
            >
              Engineered for Vertical Dominance
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-neutral-400 font-light text-sm md:text-base leading-relaxed md:text-right"
          >
            We deploy specialized conversational scripts and workflows designed for the unique operational constraints and terminology of leading verticals.
          </motion.div>
        </div>

        {/* Technical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, index) => {
            const Icon = ind.icon;

            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1] as any,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative rounded-xl border border-white/5 bg-neutral-950/60 p-6 flex flex-col justify-between min-h-[220px] cursor-pointer"
                style={{
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, background-color 0.4s",
                }}
              >
                {/* Visual coordinate-tracked glow backlights */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 150px at var(--x, 0px) var(--y, 0px), ${ind.glow}, transparent 80%)`,
                  }}
                />

                {/* Visual scanning line effect */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center pointer-events-none" />

                <div>
                  {/* Top line with tech indexing */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
                      {ind.code}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-purple-400 group-hover:scale-105 transition-all duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {ind.name}
                  </h3>

                  {/* Specific Use Case text */}
                  <p className="text-xs font-light text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                    {ind.useCase}
                  </p>
                </div>

                {/* Subtle bottom decorative element */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="h-[2px] w-8 bg-neutral-800 group-hover:bg-purple-500/50 transition-colors duration-500" />
                  <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    SYSTEM READY
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
