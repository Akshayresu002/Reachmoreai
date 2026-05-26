import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CinematicPreloader from "@/components/CinematicPreloader";
import MouseGlowTracker from "@/components/MouseGlowTracker";
import GlobalBackgroundCanvas from "@/components/GlobalBackgroundCanvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReachMoreAI | AI Automation Agency",
  description: "ReachMoreAI helps businesses automate operations using AI workflows, AI chatbots, lead generation systems, and automation solutions.",
  keywords: [
    "ReachMoreAI",
    "AI Automation Agency",
    "AI Workflows",
    "Business Automation",
    "AI Chatbots",
    "Lead Generation Automation",
    "workflow automation agency",
    "AI customer support",
    "AI lead generation",
    "business process automation",
  ],
  authors: [{ name: "ReachMoreAI Engineering" }],
  openGraph: {
    title: "ReachMoreAI | AI Automation Agency",
    description: "ReachMoreAI helps businesses automate operations using AI workflows, AI chatbots, lead generation systems, and automation solutions.",
    type: "website",
    locale: "en_US",
    siteName: "ReachMoreAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachMoreAI | AI Automation Agency",
    description: "ReachMoreAI helps businesses automate operations using AI workflows, AI chatbots, lead generation systems, and automation solutions.",
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white relative">
        {/* Global Cinematic noise grain overlay */}
        <div className="noise-overlay" />

        {/* Global preloading portal */}
        <CinematicPreloader />

        {/* Cursor follow ambient volumetric glow orb */}
        <MouseGlowTracker />

        {/* Global atmospheric background canvas system */}
        <GlobalBackgroundCanvas />

        {children}
      </body>
    </html>
  );
}
