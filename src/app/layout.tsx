import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import type { CSSProperties } from "react";
import { CookieBanner } from "@/components/compliance/cookie-banner";
import { r2aTheme } from "@/config/r2a-theme";
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
  const themeStyle = {
    "--r2a-brand-primary": r2aTheme.brand.primary,
    "--r2a-brand-secondary": r2aTheme.brand.secondary,
    "--r2a-brand-accent": r2aTheme.brand.accent,
    "--r2a-surface-background": r2aTheme.surface.background,
    "--r2a-surface-muted": r2aTheme.surface.muted,
    "--r2a-surface-card": r2aTheme.surface.card,
    "--r2a-surface-border": r2aTheme.surface.border,
    "--r2a-text-primary": r2aTheme.text.primary,
    "--r2a-text-muted": r2aTheme.text.muted,
    "--r2a-text-inverse": r2aTheme.text.inverse,
    "--r2a-state-success": r2aTheme.state.success,
    "--r2a-state-warning": r2aTheme.state.warning,
    "--r2a-state-danger": r2aTheme.state.danger,
  } as CSSProperties;

  return (
    <html data-scroll-behavior="smooth" lang="it" style={themeStyle}>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
