"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Hero3DVisual from "./Hero3DVisual";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-16 overflow-hidden bg-transparent"
    >
      {/* Structural backgrounds */}
      <div className="glow-bg" />
      <div className="tech-grid" />

      {/* Massive Full-Width Widescreen 3D Backdrop (Curves, Nodes, and flow Packets) */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-85 pointer-events-none">
        <Hero3DVisual />
      </div>

      {/* Intelligently placed vertical vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black pointer-events-none z-0" />

      {/* Central high-contrast radial legibility mask to isolate and protect typography */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.2)_60%,transparent_100%)] pointer-events-none z-0" />

      {/* Subtle volumetric spotlight glow directly behind the central text block */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] bg-blue-500/10 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Central High-Contrast Typography Layer with soft backdrop-blur separation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 w-full mt-4 backdrop-blur-[1px]"
      >
        {/* Sleek Tech Tag */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-xs tracking-widest text-neutral-400 uppercase font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          Next-Gen AI Systems
        </motion.div>

        {/* Massive Majestic Typography Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 select-none"
        >
          Autonomous Systems For
          <br />
          <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent">
            Modern Businesses
          </span>
        </motion.h1>

        {/* Cinematic, readable Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-neutral-300/90 max-w-2xl leading-relaxed mb-10 font-light"
        >
          We engineer enterprise-grade AI voice callers, automated CRM integrations, and intelligent workflow architectures to secure absolute operational leverage.
        </motion.p>

        {/* Premium CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <motion.button
            onClick={(e: any) => handleScrollTo(e, "services")}
            whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="group relative flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[13px] font-semibold text-black transition-all duration-300 btn-shine-container cursor-pointer"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.button>

          <motion.a
            href="https://calendly.com/abhinaychess/30min"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2, borderColor: "rgba(255, 255, 255, 0.35)", boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-7 py-3 text-[13px] font-semibold text-white transition-all duration-300 btn-shine-container"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Book a Consultation</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Futuristic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-none z-10"
      >
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-purple-500 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
