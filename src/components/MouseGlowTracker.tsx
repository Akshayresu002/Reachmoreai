"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlowTracker() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft lag spring parameters for organic physical movement
  const springConfig = { damping: 45, stiffness: 220, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of orb size (150px) to center it under cursor
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.065)_0%,rgba(59,130,246,0.035)_45%,transparent_70%)] blur-[50px]"
      />
    </div>
  );
}
