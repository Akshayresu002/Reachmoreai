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
  title: "ReachMore AI | Premium AI Automation Agency & Autonomous Caller Systems",
  description: "We engineer enterprise-grade AI voice callers, automated CRM integrations, workflow automation, and intelligent chatbots to accelerate sales pipeline velocity and scale operations.",
  keywords: [
    "AI automation agency",
    "AI voice callers",
    "AI appointment setters",
    "AI chatbots for business",
    "CRM automation services",
    "workflow automation agency",
    "AI customer support",
    "AI lead generation",
    "AI phone answering",
  ],
  authors: [{ name: "ReachMore AI Engineering" }],
  openGraph: {
    title: "ReachMore AI | Premium AI Automation Agency",
    description: "Enterprise-grade AI voice callers, CRM automation services, and workflow automation systems built for hyper-growth.",
    type: "website",
    locale: "en_US",
    siteName: "ReachMore AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachMore AI | Premium AI Automation Agency",
    description: "Enterprise-grade AI voice callers, CRM automation services, and workflow automation systems built for hyper-growth.",
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
