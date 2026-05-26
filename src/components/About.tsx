"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Brain, Cpu } from "lucide-react";

const pillars = [
  {
    title: "Cognitive Architecture",
    description: "Deeply trained conversational nodes capable of understanding nuanced industry constraints, fluid turn-taking, and sentiment tracking.",
    icon: Brain,
  },
  {
    title: "Integration Integrity",
    description: "Flawless technical connections that hook voice pipelines directly into CRM database schemas, calendars, and backend triggers.",
    icon: Cpu,
  },
  {
    title: "Security Infrastructure",
    description: "Strict enterprise data isolation, HIPAA-compliant encryption standards, and isolated transactional records to protect customer files.",
    icon: ShieldCheck,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-transparent overflow-hidden border-t border-neutral-900"
    >
      {/* Decorative radial glows */}
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono tracking-widest text-purple-400 uppercase"
            >
              System Identity
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4 leading-tight"
            >
              The ReachMoreAI Protocol
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 text-neutral-400 font-light text-sm sm:text-base leading-relaxed"
          >
            We are an elite squad of system engineers and conversational designers. At ReachMoreAI, we believe AI chatbots, workflows, and process automation pipelines should be indistinguishable from a hyper-trained, elite operations workforce.
          </motion.div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-xl border border-white/5 bg-neutral-950/40 p-8 hover:bg-neutral-900/20 hover:border-white/10 transition-all duration-300"
              >
                {/* Visual scan bar */}
                <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                {/* Vector Icon */}
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 mb-6 group-hover:scale-105 group-hover:border-purple-500/30 group-hover:text-purple-400 transition-all duration-300 text-neutral-400">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs font-light text-neutral-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Horizontal Technical Rule Divider */}
        <div className="mt-20 h-[0.5px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
