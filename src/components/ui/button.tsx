import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/components/ui/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)]",
  secondary: "border border-[var(--color-border)] bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-primary-soft)]",
  ghost: "bg-transparent text-[var(--color-primary-strong)] hover:bg-[var(--color-primary-soft)]",
  success: "bg-[var(--color-success)] text-white hover:brightness-95",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
