import type { PropsWithChildren } from "react";
import { cn } from "@/components/ui/cn";

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("surface-card", className)}>{children}</div>;
}

export function CardHeader({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex flex-col gap-1 p-6 pb-0", className)}>{children}</div>;
}

export function CardContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h3 className={cn("text-xl font-bold text-[var(--color-foreground)]", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <p className={cn("text-sm text-[var(--color-foreground-muted)]", className)}>{children}</p>;
}
