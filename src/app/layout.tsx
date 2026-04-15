import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { CookieBanner } from "@/components/compliance/cookie-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ready2Agent",
  description:
    "Ready2Agent is an AI-native plug-and-play Next.js and TypeScript framework focused on secure role pyramids and capability-driven permission governance.",
  applicationName: "Ready2Agent",
  icons: {
    icon: "/ready2agent-logo-nobg.png",
    shortcut: "/ready2agent-logo-nobg.png",
    apple: "/ready2agent-logo-nobg.png",
  },
};

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="it">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
