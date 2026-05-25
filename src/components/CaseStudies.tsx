"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const metrics = [
  {
    value: "+312%",
    label: "Lead Response Rate",
    description: "Autonomous phone callers answer customer forms in under 2 seconds, completely eliminating standard lead drop-off.",
    context: "Based on 40,000+ inbound call experiments",
    glow: "rgba(139, 92, 246, 0.15)",
    textGradient: "from-white via-neutral-200 to-purple-400",
  },
  {
    value: "-70%",
    label: "Manual Administration",
    description: "End-to-end automations capture calls, book calendar links, update CRMs, and dispatch intake documents automatically.",
    context: "Reclaiming an average of 24 hours per staff weekly",
    glow: "rgba(59, 130, 246, 0.12)",
    textGradient: "from-white via-neutral-200 to-blue-400",
  },
  {
    value: "24/7",
    label: "AI Phone Coverage",
    description: "Instant voice answering operational during nights, weekends, and holidays so you never drop a high-value customer inquiry.",
    context: "Eliminating missed call revenue loss entirely",
    glow: "rgba(16, 185, 129, 0.12)",
    textGradient: "from-white via-neutral-200 to-emerald-400",
  },
  {
    value: "+4X",
    label: "Faster Customer Follow-Ups",
    description: "Intelligent appointment booking systems follow up via voice and SMS in multi-wave patterns until conversion happens.",
    context: "Boosting booking completion rate by over 60%",
    glow: "rgba(236, 72, 153, 0.12)",
    textGradient: "from-white via-neutral-200 to-pink-400",
  },
];

export default function CaseStudies() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.setProperty("--x", `${e.clientX - box.left}px`);
    card.style.setProperty("--y", `${e.clientY - box.top}px`);
    
    // Rotation calculations (max 2 degrees for elegant support)
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
      id="case-studies"
      className="relative py-28 bg-transparent overflow-hidden border-t border-neutral-900"
    >
      {/* Decorative radial glows */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest text-purple-400 uppercase"
          >
            Proven Outcomes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-6 leading-tight"
          >
            Measurable Operational Velocity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-400 font-light leading-relaxed"
          >
            We don&apos;t just build chatbot mockups. We deploy fully-integrated operational engines that drive measurable bottom-line leverage and accelerate response speeds.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] as any,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative rounded-2xl glass-card border border-white/5 bg-neutral-950/40 p-8 flex flex-col justify-between overflow-hidden min-h-[300px] cursor-pointer"
              style={{
                transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s",
              }}
            >
              {/* Volumetric cursor spotlights */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle 280px at var(--x, 0px) var(--y, 0px), ${metric.glow}, transparent 80%)`,
                }}
              />

              {/* Upper Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-neutral-500 font-semibold tracking-wider">
                    [ METRIC-0{index + 1} ]
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-[10px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3 h-3 animate-pulse" />
                    <span>Verified Result</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  {/* Majestic Glowing Metallic Number */}
                  <h3 className={`text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-r ${metric.textGradient} bg-clip-text text-transparent group-hover:scale-[1.01] transition-transform duration-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.06)]`}>
                    {metric.value}
                  </h3>
                </div>

                <h4 className="text-lg font-medium text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {metric.label}
                </h4>

                <p className="text-sm font-light text-neutral-400 leading-relaxed max-w-md">
                  {metric.description}
                </p>
              </div>

              {/* Footer Section */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
                  {metric.context}
                </span>
                <span className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
