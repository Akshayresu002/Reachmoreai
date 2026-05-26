import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation Blog & Resources | ReachMore AI",
  description: "Stay ahead with the latest strategies, guides, and engineering deep-dives on AI voice agents, custom chatbots, CRM automation, and workflow design from ReachMore AI.",
  keywords: ["AI automation blog", "ReachMore AI resources", "AI voice agents tutorials", "workflow integration guides", "CRM automation guides"],
  alternates: {
    canonical: "https://reachmoreai.online/blog",
  },
  openGraph: {
    title: "AI Automation Blog & Resources | ReachMore AI",
    description: "Stay ahead with the latest strategies, guides, and engineering deep-dives on AI voice agents, custom chatbots, CRM automation, and workflow design.",
    url: "https://reachmoreai.online/blog",
    siteName: "ReachMore AI",
  }
};

export default function BlogListing() {
  // Generate JSON-LD Blog Schema
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ReachMore AI Automation Blog",
    "description": "Guides and tutorials on AI voice callers, chatbots, CRM integrations, and operations automation.",
    "publisher": {
      "@type": "Organization",
      "name": "ReachMore AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reachmoreai.online/android-chrome-512x512.png"
      }
    },
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": new Date(post.date).toISOString().split('T')[0],
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "url": `https://reachmoreai.online/blog/${post.slug}`
    }))
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-white">
      <Navbar />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <main className="flex-grow pt-32 pb-20 relative overflow-hidden">
        {/* Volumetric spotlight backglows */}
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
              Engineering Hub & Insights
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mt-4 mb-6 leading-tight">
              ReachMore AI Blog
            </h1>
            <p className="text-neutral-400 font-light leading-relaxed text-sm sm:text-base">
              Deep-dives, blueprints, and strategies from the leading edge of **AI workflows**, **CRM automations**, and enterprise cognitive agents. Engineered to help your business scale efficiently.
            </p>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.slug}
                className="group relative rounded-2xl glass-card overflow-hidden p-8 flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 cursor-pointer border border-white/5 bg-white/[0.02]"
              >
                <div>
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-6">
                    <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-medium text-white mb-4 group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-sm font-light text-neutral-400 leading-relaxed mb-6">
                    {post.description}
                  </p>
                </div>

                {/* Author footer */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xs font-mono font-bold text-purple-300">
                      {post.author.avatar}
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-white">{post.author.name}</span>
                      <span className="block text-[10px] text-neutral-500">{post.author.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{post.date}</span>
                </div>

                {/* Accent glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-purple-500/30 transition-colors duration-500" />
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
