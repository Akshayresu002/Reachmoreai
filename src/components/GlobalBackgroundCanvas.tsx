"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Point {
  x: number;
  y: number;
}

export default function GlobalBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 60 slow-drifting neural nodes
    const nodes: Node[] = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14, // Ultra slow elegant movement
        vy: (Math.random() - 0.5) * 0.14,
        radius: Math.random() * 1.5 + 0.8,
      });
    }

    // Dynamic light trails (Cubic Bezier control points)
    // We trace 3 large, smooth paths across the screen
    const getCubicBezierPoint = (
      t: number,
      p0: Point,
      p1: Point,
      p2: Point,
      p3: Point
    ): Point => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
      };
    };

    // Orbit configurations
    let time = 0;

    const draw = () => {
      time += 0.0008;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Volumetric Ambient Background Spotlights
      const purpleX = width * 0.35 + Math.sin(time * 1.8) * 120;
      const purpleY = height * 0.3 + Math.cos(time * 0.9) * 100;
      const blueX = width * 0.65 + Math.cos(time * 1.4) * 120;
      const blueY = height * 0.7 + Math.sin(time * 1.3) * 100;

      // Soft purple glow (top left area)
      const gradPurple = ctx.createRadialGradient(purpleX, purpleY, 0, purpleX, purpleY, 450);
      gradPurple.addColorStop(0, "rgba(139, 92, 246, 0.07)");
      gradPurple.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradPurple;
      ctx.fillRect(0, 0, width, height);

      // Soft blue glow (bottom right area)
      const gradBlue = ctx.createRadialGradient(blueX, blueY, 0, blueX, blueY, 450);
      gradBlue.addColorStop(0, "rgba(59, 130, 246, 0.06)");
      gradBlue.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradBlue;
      ctx.fillRect(0, 0, width, height);

      // 2. Proximity-based Neural Connections Grid (High Visibility)
      const connectionDist = 135;

      for (let i = 0; i < nodeCount; i++) {
        const nodeA = nodes[i];

        // Move nodes slowly
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce nodes off screen margins
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)"; // High visibility
        ctx.fill();

        // Connect nodes near each other
        for (let j = i + 1; j < nodeCount; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.16; // High visibility line alpha
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // 3. Cinematic Widescreen Bezier Data Pipes & Flows
      // Define 3 sweeping data pathways
      const paths = [
        // Top Left -> Bottom Right sweep
        {
          p0: { x: 0, y: height * 0.1 },
          p1: { x: width * 0.3, y: height * 0.4 },
          p2: { x: width * 0.7, y: height * 0.2 },
          p3: { x: width, y: height * 0.9 },
          color: "rgba(139, 92, 246, 0.08)",
          packetColor: "rgba(139, 92, 246, 0.8)",
          packetGlow: "rgba(139, 92, 246, 0.3)",
          speedMultiplier: 1.0,
        },
        // Bottom Left -> Top Right sweep
        {
          p0: { x: 0, y: height * 0.85 },
          p1: { x: width * 0.4, y: height * 0.3 },
          p2: { x: width * 0.6, y: height * 0.8 },
          p3: { x: width, y: height * 0.15 },
          color: "rgba(59, 130, 246, 0.08)",
          packetColor: "rgba(0, 245, 255, 0.8)",
          packetGlow: "rgba(0, 245, 255, 0.3)",
          speedMultiplier: 0.8,
        },
        // Wavy horizontal center sweep
        {
          p0: { x: 0, y: height * 0.5 },
          p1: { x: width * 0.25, y: height * 0.2 },
          p2: { x: width * 0.75, y: height * 0.8 },
          p3: { x: width, y: height * 0.45 },
          color: "rgba(255, 255, 255, 0.04)",
          packetColor: "rgba(255, 255, 255, 0.8)",
          packetGlow: "rgba(255, 255, 255, 0.3)",
          speedMultiplier: 1.2,
        },
      ];

      paths.forEach((path) => {
        // Draw faint static background curve line
        ctx.beginPath();
        ctx.moveTo(path.p0.x, path.p0.y);
        ctx.bezierCurveTo(path.p1.x, path.p1.y, path.p2.x, path.p2.y, path.p3.x, path.p3.y);
        ctx.strokeStyle = path.color;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Calculate and draw moving data packet along bezier curve
        // Progress cycles periodically using time and path speed multiplier
        const progress = (time * 120 * path.speedMultiplier) % 1.0;
        const packetPos = getCubicBezierPoint(progress, path.p0, path.p1, path.p2, path.p3);

        // Packet outer volumetric glow
        ctx.beginPath();
        ctx.arc(packetPos.x, packetPos.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = path.packetGlow;
        ctx.fill();

        // Packet core node
        ctx.beginPath();
        ctx.arc(packetPos.x, packetPos.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = path.packetColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
