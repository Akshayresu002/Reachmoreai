import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MouseGlowTracker from "@/components/MouseGlowTracker";
import GlobalBackgroundCanvas from "@/components/GlobalBackgroundCanvas";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReachMore AI | Premium AI Automation Agency",
  description: "ReachMore AI helps businesses automate sales, CRM workflows, AI voice calls, chatbots, and customer engagement using advanced AI automation systems.",
  keywords: [
    "ReachMore AI",
    "ReachMoreAI",
    "AI automation agency",
    "AI automation services",
    "AI voice agents",
    "workflow automation",
    "CRM automation",
    "AI chatbot agency",
    "AI customer support",
    "AI lead generation",
    "business process automation",
  ],
  authors: [{ name: "ReachMore AI Engineering" }],
  metadataBase: new URL("https://reachmoreai.online"),
  openGraph: {
    title: "ReachMore AI | Premium AI Automation Agency",
    description: "ReachMore AI helps businesses automate sales, CRM workflows, AI voice calls, chatbots, and customer engagement using advanced AI automation systems.",
    type: "website",
    locale: "en_US",
    siteName: "ReachMore AI",
    url: "https://reachmoreai.online",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "ReachMore AI | Premium AI Automation Agency Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachMore AI | Premium AI Automation Agency",
    description: "ReachMore AI helps businesses automate sales, CRM workflows, AI voice calls, chatbots, and customer engagement using advanced AI automation systems.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
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
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "ReachMore AI",
              "alternateName": ["ReachMoreAI", "ReachMore AI Automation Agency"],
              "url": "https://reachmoreai.online",
              "logo": "https://reachmoreai.online/android-chrome-512x512.png",
              "image": "https://reachmoreai.online/android-chrome-512x512.png",
              "description": "ReachMore AI helps businesses automate sales, CRM workflows, AI voice calls, chatbots, and customer engagement using advanced AI automation systems.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://github.com/Akshayresu002/Reachmoreai"
              ],
              "priceRange": "$$",
              "knowsAbout": [
                "AI Automation Agency",
                "AI Workflows",
                "Business Automation",
                "AI Chatbots",
                "Lead Generation Automation",
                "AI Voice Agents",
                "CRM Automation"
              ]
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white relative">
        {/* Global Cinematic noise grain overlay */}
        <div className="noise-overlay" />

        {/* Cursor follow ambient volumetric glow orb */}
        <MouseGlowTracker />

        {/* Global atmospheric background canvas system */}
        <GlobalBackgroundCanvas />

        {children}

        {/* Premium AI Live Chatbot Widget */}
        <Chatbot />
      </body>
    </html>
  );
}
