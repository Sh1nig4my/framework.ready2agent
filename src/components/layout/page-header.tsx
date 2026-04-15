import type { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", className)}>
      <div>
        <h1 className="page-heading">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
