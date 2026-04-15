import type { PropsWithChildren } from "react";
import type { SessionActor } from "@/shared/users/types";
import { AppSidebar } from "@/components/navigation/app-sidebar";

export function DashboardShell({
  actor,
  children,
}: PropsWithChildren<{ actor: SessionActor }>) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <AppSidebar actor={actor} />
      <main className="min-w-0 flex-1 md:pl-[272px]">{children}</main>
    </div>
  );
}
