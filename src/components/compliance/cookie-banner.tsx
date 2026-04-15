"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ready2agent-cookie-banner-dismissed";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    const timeoutId = window.setTimeout(() => {
      setVisible(dismissed !== "true");
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-[28px] border bg-white/95 p-5 shadow-2xl backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-[var(--color-foreground)]">
            Ready2Agent usa cookie tecnici e analytics essenziali
          </p>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
            Continuiamo a mostrarti il banner finche non confermi di aver letto privacy e
            cookie policy.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold text-[var(--color-primary-strong)]"
            href="/privacy"
          >
            Privacy
          </a>
          <button
            className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)]"
            onClick={dismiss}
            type="button"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
}
