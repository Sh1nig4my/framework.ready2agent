import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCurrentSessionActor } from "@/server/lib/auth/session";
import { fetchInternalApi } from "@/server/api/internal-rest-client";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const actor = await getCurrentSessionActor();

  if (!actor) {
    const bootstrapStatus = await fetchInternalApi<{ requiresSetup: boolean }>("/api/bootstrap/status");

    if (bootstrapStatus.requiresSetup) {
      redirect("/setup" as never);
    }

    redirect("/login");
  }

  return <DashboardShell actor={actor}>{children}</DashboardShell>;
}
