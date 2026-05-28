"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const contactLinks = [
    {
      name: "YouTube Channel",
      value: "@Abhinayresu45",
      href: "https://www.youtube.com/@Abhinayresu45",
      icon: (props: any) => (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: "hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5",
    },
    {
      name: "Instagram",
      value: "@reachmoreai_",
      href: "https://www.instagram.com/reachmoreai_/",
      icon: (props: any) => (
        <svg className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      color: "hover:text-pink-500 hover:border-pink-500/20 hover:bg-pink-500/5",
    },
    {
      name: "Direct Email",
      value: "reachmoreaiagency@gmail.com",
      href: "mailto:reachmoreaiagency@gmail.com",
      icon: Mail,
      color: "hover:text-purple-400 hover:border-purple-400/20 hover:bg-purple-400/5",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-28 bg-transparent overflow-hidden border-t border-neutral-900"
    >
      {/* Background radial neon glows */}
      <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest text-purple-400 uppercase"
          >
            Initiate Deployment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-6 leading-tight"
          >
            Ready to Build Your AI Systems?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-400 font-light max-w-xl mx-auto leading-relaxed text-sm sm:text-base"
          >
            Select a convenient slot on our Calendly for a live demonstration or contact our engineering nodes directly through our official social portals.
          </motion.p>
        </div>

        {/* Primary Calendly CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
          className="rounded-2xl glass border border-purple-500/20 p-8 sm:p-12 mb-10 shadow-[0_0_50px_rgba(139,92,246,0.05)] max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 animate-pulse">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Schedule a Technical Call</h3>
            <p className="text-xs font-light text-neutral-400 mb-8 max-w-sm">
              Book a live 30-minute system architecture demo to discuss custom caller nodes and automated CRM triggers.
            </p>
            <a
              href="https://calendly.com/abhinaychess/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-[1.02]"
            >
              <span>Book a Call on Calendly</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Social / Email Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {contactLinks.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
                className={`group flex items-center gap-4 rounded-xl border border-white/5 bg-neutral-950/40 p-4 transition-all duration-300 ${item.color}`}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/5 bg-white/5 group-hover:scale-105 transition-all duration-300 text-neutral-400 group-hover:text-inherit">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    {item.name}
                  </p>
                  <p className="text-xs font-semibold text-white mt-0.5 group-hover:text-inherit transition-colors">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
