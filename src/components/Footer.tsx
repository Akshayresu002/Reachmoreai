"use client";

import React from "react";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-transparent text-neutral-400 border-t border-neutral-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand Col */}
          <div className="col-span-2">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="flex items-center gap-1 text-white font-semibold tracking-wider text-base mb-4 cursor-pointer"
              aria-label="ReachMoreAI Home"
            >
              ReachMoreAI
              <span className="text-purple-500 font-bold">.</span>
            </a>
            <p className="text-xs font-light text-neutral-500 max-w-[240px] leading-relaxed mb-6">
              ReachMoreAI is a premier AI Automation Agency engineering advanced AI Workflows, custom AI Chatbots, and automated Lead Generation Systems to accelerate scaling for modern businesses.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="p-1.5 rounded-full border border-white/5 bg-white/5 text-neutral-500 hover:text-white hover:border-white/10 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-1.5 rounded-full border border-white/5 bg-white/5 text-neutral-500 hover:text-white hover:border-white/10 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="p-1.5 rounded-full border border-white/5 bg-white/5 text-neutral-500 hover:text-white hover:border-white/10 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-semibold">
              Solutions
            </span>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              AI Voice Callers
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              Appointment Setters
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              Omnichannel Chatbots
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              CRM Automations
            </a>
          </div>

          {/* Industries Column */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-semibold">
              Industries
            </span>
            <a
              href="#industries"
              onClick={(e) => handleScrollTo(e, "#industries")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              Real Estate
            </a>
            <a
              href="#industries"
              onClick={(e) => handleScrollTo(e, "#industries")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              SaaS & Tech
            </a>
            <a
              href="#industries"
              onClick={(e) => handleScrollTo(e, "#industries")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              Clinics & Medical
            </a>
            <a
              href="#industries"
              onClick={(e) => handleScrollTo(e, "#industries")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              Home Services
            </a>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-semibold">
              Company
            </span>
            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, "#about")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              About Platform
            </a>
            <a
              href="#blogs"
              onClick={(e) => handleScrollTo(e, "#blogs")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              Technical Blog
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="text-xs hover:text-white transition-colors py-0.5"
            >
              Book a Demo
            </a>
            <a href="#" className="text-xs hover:text-white transition-colors py-0.5">
              Partnerships
            </a>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-semibold">
              Legal
            </span>
            <a href="#" className="text-xs hover:text-white transition-colors py-0.5">
              Privacy Shield
            </a>
            <a href="#" className="text-xs hover:text-white transition-colors py-0.5">
              Terms of Node
            </a>
            <a href="#" className="text-xs hover:text-white transition-colors py-0.5">
              Security Protocol
            </a>
            <a href="#" className="text-xs hover:text-white transition-colors py-0.5">
              GDPR / DPA
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-500">
          <div className="flex items-center gap-1">
            <span>© 2026 ReachMoreAI. Engineering precision.</span>
          </div>

          {/* Operational Status (Linear/Vercel Style) */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM STATUS: FULLY OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
