"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NodeLabelConfig {
  name: string;
  sub: string;
  status: string;
  color: string;
  pos: THREE.Vector3;
}

export default function Hero3DVisual() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current || !containerRef.current) return;

    const currentMount = mountRef.current;
    const currentContainer = containerRef.current;
    let width = currentContainer.clientWidth || window.innerWidth;
    let height = currentContainer.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Perspective Camera configured for immersive depth
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Main system rotation group
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Technical grid floor
    const gridBottom = new THREE.GridHelper(16, 24, 0x8b5cf6, 0x1f2937);
    gridBottom.position.y = -3.0;
    if (Array.isArray(gridBottom.material)) {
      gridBottom.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.04;
      });
    } else {
      gridBottom.material.transparent = true;
      gridBottom.material.opacity = 0.04;
    }
    systemGroup.add(gridBottom);

    // Node configuration with exact coordinates representing the business workflow layout
    const nodesConfig: NodeLabelConfig[] = [
      {
        name: "INCOMING LEADS",
        sub: "Lead Ingestion Node",
        status: "SCANNING",
        color: "#10b981", // Green
        pos: new THREE.Vector3(-3.5, 1.3, -0.6),
      },
      {
        name: "INTELLIGENT ROUTER",
        sub: "Decision Engine Core",
        status: "ORCHESTRATING",
        color: "#f59e0b", // Yellow/Orange
        pos: new THREE.Vector3(1.3, 1.5, -1.2),
      },
      {
        name: "AI VOICE AGENTS",
        sub: "Conversational Core",
        status: "OUTBOUND DISPATCH",
        color: "#8b5cf6", // Purple
        pos: new THREE.Vector3(-1.1, 2.0, -1.0),
      },
      {
        name: "ENTERPRISE CRM",
        sub: "Data Lake Mainframe",
        status: "SYNCHRONIZED",
        color: "#06b6d4", // Cyan
        pos: new THREE.Vector3(-2.8, -1.5, 0.4),
      },
      {
        name: "APPOINTMENT BOOKER",
        sub: "Calendar Node",
        status: "STANDBY",
        color: "#ec4899", // Pink
        pos: new THREE.Vector3(0.0, -2.1, 0.0),
      },
      {
        name: "METRICS DASHBOARD",
        sub: "System Throughput",
        status: "DIAGNOSTICS OK",
        color: "#ffffff", // White
        pos: new THREE.Vector3(2.8, -1.3, 0.5),
      },
    ];

    // Build the Bespoke Geometries for each Node to represent actual AI hardware elements
    const nodeMeshes: THREE.Group[] = [];

    // 1. INCOMING LEADS: Stacked concentric glowing discs
    const leadsGroup = new THREE.Group();
    leadsGroup.position.copy(nodesConfig[0].pos);
    for (let i = 0; i < 3; i++) {
      const discGeo = new THREE.CylinderGeometry(0.24 - i * 0.04, 0.24 - i * 0.04, 0.03, 16);
      const discMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.6,
        roughness: 0.2,
        metalness: 0.9,
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.position.y = i * 0.08 - 0.08;
      leadsGroup.add(disc);
    }
    systemGroup.add(leadsGroup);
    nodeMeshes.push(leadsGroup);

    // 2. INTELLIGENT ROUTER: Dual counter-rotating wireframe hexagons
    const routerGroup = new THREE.Group();
    routerGroup.position.copy(nodesConfig[1].pos);
    const outerGeo = new THREE.IcosahedronGeometry(0.22, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerHex = new THREE.Mesh(outerGeo, outerMat);
    routerGroup.add(outerHex);

    const innerGeo = new THREE.IcosahedronGeometry(0.11, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const innerHex = new THREE.Mesh(innerGeo, innerMat);
    routerGroup.add(innerHex);
    systemGroup.add(routerGroup);
    nodeMeshes.push(routerGroup);

    // 3. AI VOICE AGENTS: Floating metallic sphere with orbital voice rings
    const voiceGroup = new THREE.Group();
    voiceGroup.position.copy(nodesConfig[2].pos);
    const coreSphereGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const coreSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    voiceGroup.add(coreSphere);

    // Dynamic vertical rings
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(0.22, 0.24, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = i * Math.PI / 3;
      ring.rotation.y = i * Math.PI / 6;
      ringGroup.add(ring);
    }
    voiceGroup.add(ringGroup);
    systemGroup.add(voiceGroup);
    nodeMeshes.push(voiceGroup);

    // 4. ENTERPRISE CRM: Segmented cylinder stacked mainframe database
    const crmGroup = new THREE.Group();
    crmGroup.position.copy(nodesConfig[3].pos);
    for (let i = 0; i < 3; i++) {
      const crmGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.08, 16);
      const crmMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75,
      });
      const slice = new THREE.Mesh(crmGeo, crmMat);
      slice.position.y = i * 0.12 - 0.12;
      crmGroup.add(slice);
    }
    systemGroup.add(crmGroup);
    nodeMeshes.push(crmGroup);

    // 5. APPOINTMENT BOOKER: Holographic horizontal grid platform
    const bookerGroup = new THREE.Group();
    bookerGroup.position.copy(nodesConfig[4].pos);
    const platformGeo = new THREE.BoxGeometry(0.5, 0.04, 0.35);
    const platformMat = new THREE.MeshPhysicalMaterial({
      color: 0xec4899,
      transmission: 0.9,
      thickness: 0.5,
      roughness: 0.15,
      transparent: true,
      opacity: 0.7,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    bookerGroup.add(platform);

    const platformOutlineGeo = new THREE.EdgesGeometry(platformGeo);
    const platformOutline = new THREE.LineSegments(
      platformOutlineGeo,
      new THREE.LineBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.5 })
    );
    bookerGroup.add(platformOutline);
    systemGroup.add(bookerGroup);
    nodeMeshes.push(bookerGroup);

    // 6. METRICS DASHBOARD: 3D bar chart pillars
    const metricsGroup = new THREE.Group();
    metricsGroup.position.copy(nodesConfig[5].pos);
    const bars: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const barGeo = new THREE.BoxGeometry(0.08, 0.3, 0.08);
      const barMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.7,
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.x = i * 0.12 - 0.12;
      bar.position.y = -0.15; // Set origin to bottom for scaling height
      metricsGroup.add(bar);
      bars.push(bar);
    }
    systemGroup.add(metricsGroup);
    nodeMeshes.push(metricsGroup);

    // Define 6 dedicated, semantic workflow pipelines mapping active business logic
    const pathways = [
      // 1. Leads -> Router (Green Lead Signals)
      new THREE.CatmullRomCurve3([
        nodesConfig[0].pos,
        new THREE.Vector3(-1.0, 1.2, -0.9),
        nodesConfig[1].pos,
      ]),
      // 2. Router -> Voice Agents (Violet Activation signals)
      new THREE.CatmullRomCurve3([
        nodesConfig[1].pos,
        new THREE.Vector3(0.0, 1.8, -1.1),
        nodesConfig[2].pos,
      ]),
      // 3. Voice Agents -> CRM (Cyan Syncing data packets)
      new THREE.CatmullRomCurve3([
        nodesConfig[2].pos,
        new THREE.Vector3(-2.0, 0.2, -0.2),
        nodesConfig[3].pos,
      ]),
      // 4. Voice Agents -> Calendar (Pink Appointment bookings)
      new THREE.CatmullRomCurve3([
        nodesConfig[2].pos,
        new THREE.Vector3(-0.6, 0.0, -0.3),
        nodesConfig[4].pos,
      ]),
      // 5. Calendar -> CRM Mainframe (Secure DB sync)
      new THREE.CatmullRomCurve3([
        nodesConfig[4].pos,
        new THREE.Vector3(-1.5, -1.8, 0.2),
        nodesConfig[3].pos,
      ]),
      // 6. Router -> Metrics Dashboard (Throughput metrics)
      new THREE.CatmullRomCurve3([
        nodesConfig[1].pos,
        new THREE.Vector3(2.0, 0.1, -0.3),
        nodesConfig[5].pos,
      ]),
    ];

    const pipelineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.04,
    });

    pathways.forEach((path) => {
      const pts = path.getPoints(60);
      const pathGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const pathLine = new THREE.Line(pathGeo, pipelineMaterial);
      systemGroup.add(pathLine);
    });

    // 45 Dedicated flow packets (themed packet nodes)
    const packetCount = 42;
    const packetsData: {
      mesh: THREE.Mesh;
      light: THREE.PointLight;
      pathIndex: number;
      speed: number;
      progress: number;
    }[] = [];

    const packetColors = [
      0x10b981, // Leads: Green
      0x8b5cf6, // Voice: Violet
      0x06b6d4, // CRM: Cyan
      0xec4899, // Calendar: Pink
      0x06b6d4, // Calendar->CRM: Cyan
      0xffffff, // Metrics: White
    ];

    const packetGeometry = new THREE.SphereGeometry(0.015, 8, 8);

    for (let i = 0; i < packetCount; i++) {
      const pathIndex = i % pathways.length;
      const color = packetColors[pathIndex];

      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const packet = new THREE.Mesh(packetGeometry, packetMat);
      systemGroup.add(packet);

      // Dedicated point light
      const light = new THREE.PointLight(color, 2.8, 1.2);
      systemGroup.add(light);

      packetsData.push({
        mesh: packet,
        light,
        pathIndex,
        speed: 0.05 + Math.random() * 0.05,
        progress: Math.random(),
      });
    }

    // 150 Drifting background atmospheric particles
    const bgParticleCount = 150;
    const bgParticleGeo = new THREE.BufferGeometry();
    const bgPositions = new Float32Array(bgParticleCount * 3);

    for (let i = 0; i < bgParticleCount; i++) {
      bgPositions[i * 3] = (Math.random() - 0.5) * 12;
      bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    bgParticleGeo.setAttribute("position", new THREE.BufferAttribute(bgPositions, 3));
    const bgParticleMat = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xffffff,
      transparent: true,
      opacity: 0.16,
    });
    const bgParticles = new THREE.Points(bgParticleGeo, bgParticleMat);
    systemGroup.add(bgParticles);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 1.5);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    // Mouse Damping spring coordinates
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = ((event.clientX / window.innerWidth) - 0.5) * 0.3;
      targetY = -((event.clientY / window.innerHeight) - 0.5) * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Projection calculation parameters
    const tempV = new THREE.Vector3();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = 0.016; // Stable fallback
      const elapsedTime = performance.now() * 0.001;

      // Parallax Damping
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Slow, expensive majestic system rotation
      systemGroup.rotation.y = elapsedTime * 0.02 + currentX;
      systemGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.02 - currentY;

      // Animated mechanical movement of the semantic nodes
      // 1. Leads Group - subtle drift
      leadsGroup.rotation.y = elapsedTime * 0.2;

      // 2. Router Group - counter rotations
      outerHex.rotation.y = elapsedTime * 0.5;
      outerHex.rotation.x = elapsedTime * 0.25;
      innerHex.rotation.y = -elapsedTime * 0.8;

      // 3. Voice Group - orbit vertical rings
      ringGroup.rotation.y = elapsedTime * 0.4;
      ringGroup.rotation.x = elapsedTime * 0.2;

      // 4. CRM database slices - micro-wobble
      crmGroup.children.forEach((slice, idx) => {
        slice.rotation.y = elapsedTime * 0.3 * (idx % 2 === 0 ? 1 : -1);
      });

      // 5. CalendarPlatform - pulse platform glow outline
      platformOutline.material.opacity = 0.3 + Math.sin(elapsedTime * 4) * 0.25;

      // 6. Metrics Charts - scale height of bars dynamically
      bars.forEach((bar, idx) => {
        const hOffset = idx * 2.0;
        const scaleVal = 1.0 + Math.sin(elapsedTime * 3 + hOffset) * 0.6;
        bar.scale.set(1, scaleVal, 1);
      });

      // Animated Packet Flows
      packetsData.forEach((packet) => {
        packet.progress += packet.speed * delta;
        if (packet.progress >= 1.0) {
          packet.progress = 0.0;
        }

        const path = pathways[packet.pathIndex];
        const pos = path.getPointAt(packet.progress);

        packet.mesh.position.copy(pos);
        packet.light.position.copy(pos);

        // Sinusoidal light pulse
        packet.light.intensity = 1.8 + Math.sin(elapsedTime * 12 + packet.progress) * 0.8;
      });

      // Slowly rotate technical backplanes
      gridBottom.rotation.z = elapsedTime * 0.008;

      // Coordinate Projection Loop for absolute cockpit tags
      nodesConfig.forEach((node, idx) => {
        tempV.copy(node.pos);
        tempV.applyMatrix4(systemGroup.matrixWorld);
        tempV.project(camera);

        // Map to actual pixel coordinates on screen wrapper
        const x = (tempV.x * 0.5 + 0.5) * width;
        const y = (tempV.y * -0.5 + 0.5) * height;

        const labelDiv = document.getElementById(`hero-label-${idx}`);
        if (labelDiv) {
          // If behind the camera (depth value z > 1) hide it
          if (tempV.z > 1) {
            labelDiv.style.opacity = "0";
            labelDiv.style.transform = "translate(-50%, -50%) scale(0.8)";
          } else {
            labelDiv.style.opacity = "1";
            labelDiv.style.left = `${x}px`;
            labelDiv.style.top = `${y}px`;
            labelDiv.style.transform = "translate(-50%, -50%) scale(1)";
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!currentContainer) return;
      width = currentContainer.clientWidth || window.innerWidth;
      height = currentContainer.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose memory resources
      platformGeo.dispose();
      platformMat.dispose();
      platformOutlineGeo.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreSphereGeo.dispose();
      coreSphereMat.dispose();
      packetGeometry.dispose();
      bgParticleGeo.dispose();
      bgParticleMat.dispose();
      gridBottom.dispose();

      renderer.dispose();
    };
  }, [isClient]);

  if (!isClient) return null;

  // Render 6 elegant absolute positioned HTML cockpit glass tags directly projected over 3D coordinates
  const labelConfigs = [
    { name: "INCOMING LEADS", sub: "Lead Ingestion Node", status: "SCANNING", color: "bg-emerald-500 text-emerald-400 border-emerald-500/20" },
    { name: "INTELLIGENT ROUTER", sub: "Decision Engine Core", status: "ORCHESTRATING", color: "bg-amber-500 text-amber-400 border-amber-500/20" },
    { name: "AI VOICE AGENTS", sub: "Conversational Core", status: "ACTIVE DIALER", color: "bg-purple-500 text-purple-400 border-purple-500/20" },
    { name: "ENTERPRISE CRM", sub: "Data Lake Mainframe", status: "SYNCHRONIZED", color: "bg-cyan-500 text-cyan-400 border-cyan-500/20" },
    { name: "APPOINTMENT BOOKER", sub: "Calendar Node", status: "STANDBY", color: "bg-pink-500 text-pink-400 border-pink-500/20" },
    { name: "METRICS DASHBOARD", sub: "System Throughput", status: "DIAGNOSTICS OK", color: "bg-white text-neutral-300 border-white/20" },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
    >
      <div
        ref={mountRef}
        className="w-full h-full absolute inset-0 z-0 pointer-events-none"
      />

      {/* Zero-overhead cockpit HTML label projections */}
      <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden">
        {labelConfigs.map((cfg, idx) => (
          <div
            key={cfg.name}
            id={`hero-label-${idx}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col pointer-events-none select-none transition-all duration-300 ease-out opacity-0"
            style={{
              transitionProperty: "opacity, transform",
            }}
          >
            {/* Holographic tag card */}
            <div className="rounded-lg border border-white/10 bg-neutral-950/70 backdrop-blur-md px-3 py-2 flex flex-col min-w-[150px] shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {/* Top status indicator */}
              <div className="flex items-center justify-between mb-1 gap-4">
                <span className="text-[9px] font-black tracking-widest text-white/90 font-mono">
                  {cfg.name}
                </span>
                <span className={`flex items-center gap-1 text-[7px] font-bold font-mono px-1.5 py-0.5 rounded-full bg-white/5 border ${cfg.color}`}>
                  <span className="w-1 h-1 rounded-full bg-current animate-pulse"></span>
                  {cfg.status}
                </span>
              </div>
              {/* Node description */}
              <span className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                {cfg.sub}
              </span>
            </div>
            {/* Connector line pointer element */}
            <div className="w-[1px] h-4 bg-gradient-to-b from-white/20 to-transparent self-center"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
