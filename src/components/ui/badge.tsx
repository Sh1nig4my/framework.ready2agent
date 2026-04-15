import type { PropsWithChildren } from "react";
import { cn } from "@/components/ui/cn";

type BadgeTone = "violet" | "green" | "pink" | "neutral" | "gold" | "blue" | "azure";

export function Badge({
  children,
  className,
  tone = "violet",
}: PropsWithChildren<{ className?: string; tone?: BadgeTone }>) {
  const toneClass = {
    violet: "border-[rgba(123,97,255,0.22)] bg-[var(--color-violet-soft)] text-[var(--color-violet-strong)]",
    green: "border-[rgba(51,162,106,0.24)] bg-[var(--color-success-soft)] text-[var(--color-success-strong)]",
    pink: "border-[rgba(203,90,143,0.22)] bg-[var(--color-pink-soft)] text-[var(--color-pink)]",
    gold: "border-[rgba(214,160,58,0.24)] bg-[var(--color-warning-soft)] text-[var(--color-warning-strong)]",
    blue: "border-[rgba(76,110,245,0.22)] bg-[var(--color-blue-soft)] text-[var(--color-blue-strong)]",
    azure: "border-[rgba(53,164,255,0.22)] bg-[var(--color-azure-soft)] text-[var(--color-azure-strong)]",
    neutral: "border-[var(--color-border)] bg-white text-[var(--color-foreground-muted)]",
  }[tone];

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", toneClass, className)}>
      {children}
    </span>
  );
}
