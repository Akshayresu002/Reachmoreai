"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "SYS.INITIALIZE()",
  "NEURAL_GRID_CONNECTING...",
  "VERIFYING_DATABASE_INTEGRITY...",
  "CRM_SCHEMA_SYNCHRONIZED",
  "COGNITIVE_CORES_READY",
  "DEPLOYING_COHERENT_NODES",
  "ESTABLISHING_SECURE_TUNNEL",
  "LEVERAGE_OPTIMIZED_100%",
];

export default function CinematicPreloader() {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable body scrolling while loading
    document.body.style.overflow = "hidden";

    // Progress tick
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "unset";
          }, 600);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 180);

    // Message rotation
    const messageTimer = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 300);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
        >
          {/* Futuristic ambient backing lights */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[70px] pointer-events-none" />

          {/* Micro Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />

          <div className="relative flex flex-col items-center max-w-sm px-6 w-full text-center">
            {/* Elegant Tech Logo Loader */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-16 h-16 mb-10 flex items-center justify-center"
            >
              {/* Outer spinning ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-t-purple-500 border-r-transparent border-b-white/10 border-l-transparent"
              />
              {/* Middle spinning ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-t-white/10 border-r-transparent border-b-blue-500 border-l-transparent"
              />
              {/* Inner Core node */}
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            </motion.div>

            {/* Title Badge */}
            <div className="flex items-center gap-1 font-semibold tracking-wider text-base mb-6 text-white">
              ReachMore AI
              <span className="text-purple-500 font-bold">.</span>
            </div>

            {/* Diagnostic Message */}
            <div className="h-6 mb-3 overflow-hidden">
              <motion.div
                key={msgIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-semibold"
              >
                {messages[msgIndex]}
              </motion.div>
            </div>

            {/* Glowing spring progress bar container */}
            <div className="w-full h-[1.5px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-white shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              />
            </div>

            {/* Numerical Progress */}
            <span className="text-[10px] font-mono text-neutral-500 mt-2">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
