import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

// Next.js App Router dynamic pre-rendering
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO Metadata Generator (React 19 / Next.js 15+ compatible)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Article Not Found | ReachMore AI",
    };
  }

  return {
    title: `${post.title} | ReachMore AI`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://reachmoreai.online/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | ReachMore AI`,
      description: post.description,
      url: `https://reachmoreai.online/blog/${slug}`,
      siteName: "ReachMore AI",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: "/android-chrome-512x512.png",
          width: 512,
          height: 512,
          alt: post.title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ReachMore AI`,
      description: post.description,
      images: ["/android-chrome-512x512.png"],
    }
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related articles (filtering current post)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  // Article structural schema (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": "https://reachmoreai.online/android-chrome-512x512.png",
    "datePublished": new Date(post.date).toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReachMore AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reachmoreai.online/android-chrome-512x512.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://reachmoreai.online/blog/${post.slug}`
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://reachmoreai.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://reachmoreai.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://reachmoreai.online/blog/${post.slug}`
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-white">
      <Navbar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        {/* Volumetric background lights */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[250px] bg-blue-500/5 rounded-full blur-[90px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Breadcrumb Navigation & Back Link */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 mb-8 border-b border-white/5 pb-4">
            <Link href="/" className="hover:text-purple-400 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-purple-400 transition-colors">BLOG</Link>
            <span>/</span>
            <span className="text-neutral-300 truncate max-w-xs">{post.category.toUpperCase()}</span>
          </div>

          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-purple-400 mb-12 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>BACK TO HUB</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            {/* Category tag */}
            <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono px-2.5 py-0.5 rounded-full mb-6">
              {post.category}
            </span>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-8">
              {post.title}
            </h1>

            {/* Author details card */}
            <div className="flex items-center justify-between border-t border-b border-white/5 py-4 font-mono text-[11px] text-neutral-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300">
                  {post.author.avatar}
                </div>
                <div>
                  <span className="block text-xs font-medium text-white">{post.author.name}</span>
                  <span className="block text-[10px] text-neutral-500">{post.author.role}</span>
                </div>
              </div>
              <div className="text-right flex flex-col gap-1">
                <span>{post.date}</span>
                <span className="text-neutral-500 flex items-center justify-end gap-1">
                  <BookOpen className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Main Article Content */}
          <article 
            className="prose prose-invert max-w-none text-neutral-300 font-light leading-relaxed mb-16 border-b border-white/5 pb-16
              prose-h2:text-2xl prose-h2:font-medium prose-h2:text-white prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-medium prose-h3:text-white prose-h3:mt-8 prose-h3:mb-3
              prose-p:mb-6 prose-p:text-sm prose-p:sm:text-base
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-sm prose-ul:sm:text-base prose-ul:space-y-2
              prose-blockquote:border-l-2 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8 prose-blockquote:text-neutral-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Articles Segment */}
          <section className="pt-8">
            <h3 className="text-lg font-mono font-medium text-white mb-8 tracking-wider uppercase">
              Related Blueprints
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <div 
                  key={related.slug}
                  className="group relative rounded-xl border border-white/5 bg-white/[0.01] p-6 hover:border-purple-500/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full mb-4 inline-block">
                      {related.category}
                    </span>
                    <h4 className="text-base font-medium text-white leading-tight mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      <Link href={`/blog/${related.slug}`}>
                        {related.title}
                      </Link>
                    </h4>
                  </div>
                  <Link 
                    href={`/blog/${related.slug}`}
                    className="text-[10px] font-mono text-neutral-400 group-hover:text-purple-400 mt-6 inline-flex items-center gap-1 transition-colors"
                  >
                    READ ARTICLE →
                  </Link>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
