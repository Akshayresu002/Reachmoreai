import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Cpu, MessageSquare, Layers, PhoneCall, Database, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "ReachMore AI | Brand Directory & AI Automation Authority",
  description: "ReachMore AI (also known as ReachMoreAI or reachmore ai) is a premium AI Automation Agency built to consolidate and scale modern enterprise workflows, voice callers, and CRM synchronizations.",
  keywords: ["ReachMore AI", "ReachMoreAI", "reachmore ai", "AI automation agency", "AI automation company", "AI voice agents", "business process automation"],
  alternates: {
    canonical: "https://reachmoreai.online/reachmoreai",
  },
  openGraph: {
    title: "ReachMore AI | Brand Directory & AI Automation Authority",
    description: "Discover how ReachMore AI (ReachMoreAI) designs, builds, and orchestrates bespoke cognitive automation models, voice calls, and CRM integrations for scaling companies.",
    url: "https://reachmoreai.online/reachmoreai",
    siteName: "ReachMore AI",
  }
};

export default function ReachMoreBrandPage() {
  // Brand Consolidation JSON-LD Schema
  const brandPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ReachMore AI Brand Directory",
    "description": "Information regarding the ReachMore AI brand, services, and corporate operations.",
    "url": "https://reachmoreai.online/reachmoreai",
    "publisher": {
      "@type": "ProfessionalService",
      "name": "ReachMore AI",
      "alternateName": ["ReachMoreAI", "reachmore ai", "ReachMore AI Automation Agency"],
      "url": "https://reachmoreai.online",
      "logo": "https://reachmoreai.online/android-chrome-512x512.png",
      "sameAs": [
        "https://github.com/Akshayresu002/Reachmoreai"
      ]
    }
  };

  // FAQ Page Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between ReachMore AI, ReachMoreAI, and reachmore ai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is no difference. ReachMore AI, ReachMoreAI, and reachmore ai all refer to our unified, premium AI Automation Agency dedicated to engineering high-performance automated workflows, AI chatbots, and voice agents."
        }
      },
      {
        "@type": "Question",
        "name": "What services does ReachMore AI offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ReachMore AI offers a complete suite of business automation services including custom AI voice agents, cognitive AI chatbots, CRM integrations, workflow automation, and comprehensive business process re-engineering."
        }
      },
      {
        "@type": "Question",
        "name": "How does workflow automation improve business efficiency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Workflow automation removes manual friction and data transfer lag by implementing automated triggers between databases, webhooks, and APIs. This ensures 24/7/365 operations with zero human errors."
        }
      }
    ]
  };

  const services = [
    {
      title: "AI Voice Agents",
      desc: "Deploy conversational vocal models speaking with complete human likeness and sub-second latencies.",
      icon: PhoneCall
    },
    {
      title: "AI Chatbots",
      desc: "Implement semantic, context-aware chatbot systems that capture leads and integrate with messaging channels.",
      icon: MessageSquare
    },
    {
      title: "CRM Automation",
      desc: "Synchronize logs, client records, and automated lead scoring directly in HubSpot or Salesforce.",
      icon: Database
    },
    {
      title: "Workflow Automation",
      desc: "Engineer resilient trigger-based data pipelines connecting all your business software layers.",
      icon: Layers
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-white">
      <Navbar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        {/* Volumetric Glowing Nodes */}
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 border-b border-white/5 pb-12">
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
              Brand Directory & Authority
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mt-4 mb-6 leading-tight">
              ReachMore AI (ReachMoreAI)
            </h1>
            <p className="text-neutral-400 font-light leading-relaxed text-sm sm:text-base mb-6">
              Welcome to the official brand landing page. Whether you write it as **ReachMore AI**, **ReachMoreAI**, or **reachmore ai**, our mission remains identical: engineering elite **AI Workflows**, **AI Voice Agents**, and **CRM Automations** to remove manual bottlenecks and drive business growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors">
                <span>VISIT MAIN PLATFORM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
                <span>READ OUR BLOGS</span>
              </Link>
            </div>
          </div>

          {/* Section 1: The Core Entity */}
          <section className="mb-20">
            <h2 className="text-xl font-mono tracking-wider text-purple-400 uppercase mb-8 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              1. What is ReachMore AI?
            </h2>
            <div className="prose prose-invert max-w-none text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
              <p>
                <strong>ReachMore AI</strong> is a premium, enterprise-grade <strong>AI automation agency</strong> that specializes in re-engineering manual processes. We consult, develop, and deploy cohesive automated systems that handle repetitive operations, customer qualification, inbound booking pipelines, and predictive outbound campaigns on autopilot.
              </p>
              <p>
                Our core systems rely on cutting-edge natural language processing, semantic semantic memories (RAG), and resilient software APIs to guarantee high-performance operational metrics with zero downtime or administrative latency.
              </p>
            </div>
          </section>

          {/* Section 2: Services Grid */}
          <section className="mb-20">
            <h2 className="text-xl font-mono tracking-wider text-purple-400 uppercase mb-8 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              2. Core Automation Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((serv) => {
                const Icon = serv.icon;
                return (
                  <div key={serv.title} className="rounded-xl border border-white/5 bg-white/[0.01] p-6 hover:border-purple-500/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{serv.title}</h3>
                    <p className="text-xs font-light text-neutral-400 leading-relaxed">{serv.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: FAQ Block */}
          <section className="mb-16">
            <h2 className="text-xl font-mono tracking-wider text-purple-400 uppercase mb-8 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              3. Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-white/5 bg-white/[0.01] rounded-xl p-6">
                <h3 className="text-sm font-mono font-medium text-purple-300 mb-2">
                  Q: What is the difference between ReachMore AI, ReachMoreAI, and reachmore ai?
                </h3>
                <p className="text-xs font-light text-neutral-400 leading-relaxed">
                  There is no difference. These refer to our unified organization, **ReachMore AI**. We have consolidated all branding variations to ensure consistent indexation across search engines.
                </p>
              </div>
              <div className="border border-white/5 bg-white/[0.01] rounded-xl p-6">
                <h3 className="text-sm font-mono font-medium text-purple-300 mb-2">
                  Q: What services does ReachMore AI offer?
                </h3>
                <p className="text-xs font-light text-neutral-400 leading-relaxed">
                  We deploy automated conversational models, CRM integrations, data sync pipelines, voice call centers, and customer support chatbot agents tailored for scaling modern enterprises.
                </p>
              </div>
              <div className="border border-white/5 bg-white/[0.01] rounded-xl p-6">
                <h3 className="text-sm font-mono font-medium text-purple-300 mb-2">
                  Q: How do we get started with ReachMore AI?
                </h3>
                <p className="text-xs font-light text-neutral-400 leading-relaxed">
                  You can click "Visit Main Platform" to view our core page and book an engineering consultation directly via our scheduler, or read through our blog resource hub for detailed blueprints.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
