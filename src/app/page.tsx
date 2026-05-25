import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import CaseStudies from "@/components/CaseStudies";
import Blog from "@/components/Blog";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-white">
      {/* Floating Pill Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Cinematic WebGL Hero Section */}
        <Hero />

        {/* Asymmetrical Glass Services Grid */}
        <Services />

        {/* Tech Badge Grid for Verticals */}
        <Industries />

        {/* High-Impact Performance Metrics */}
        <CaseStudies />

        {/* SEO Category & Article Blog Grid */}
        <Blog />

        {/* Structured Mission Pillars Section */}
        <About />

        {/* Glass Booking contact & Scheduler Widget */}
        <Contact />
      </main>

      {/* Premium Monochrome Footer */}
      <Footer />
    </div>
  );
}
