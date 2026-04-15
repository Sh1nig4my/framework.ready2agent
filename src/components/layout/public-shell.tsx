import type { PropsWithChildren } from "react";

export function PublicShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 md:px-8 lg:px-10">
        {children}
      </div>
    </div>
  );
}
