"use client";

import { cn } from "@/components/ui/cn";

export function ToggleSwitch({
  checked,
  onChange,
  className,
  disabled = false,
}: {
  checked: boolean;
  onChange: (nextValue: boolean) => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full border transition",
        checked ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--color-border)] bg-[var(--color-primary-soft)]",
        disabled && "cursor-not-allowed opacity-55",
        className,
      )}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white shadow transition",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}