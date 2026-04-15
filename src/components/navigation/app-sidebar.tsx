"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  canAccessProfileMenu,
  getVisibleNavigation,
  profileMenuItem,
  type NavigationAccent,
  type NavigationIconKey,
  type NavigationItem,
} from "@/shared/navigation/config";
import { cn } from "@/components/ui/cn";
import type { SessionActor } from "@/shared/users/types";
import {
  AdministratorsIcon,
  DashboardIcon,
  LogoutIcon,
  OperatorsIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/ui/icons";

function NavIcon({ icon, className }: { icon: NavigationIconKey; className?: string }) {
  const icons = {
    dashboard: DashboardIcon,
    administrators: AdministratorsIcon,
    operators: OperatorsIcon,
    users: UsersIcon,
    settings: SettingsIcon,
  } as const;

  const Icon = icons[icon];
  return <Icon className={className} size={18} />;
}

function getAccentClasses(accent: NavigationAccent) {
  return {
    blue: {
      icon: "text-[var(--color-blue)]",
      activeIcon: "text-[var(--color-blue-strong)]",
      activeLink: "bg-[var(--color-blue-soft)] text-[var(--color-blue-strong)] shadow-[inset_0_0_0_1px_rgba(47,76,201,0.08)]",
      chevron: "text-[var(--color-blue-strong)]",
    },
    azure: {
      icon: "text-[var(--color-azure)]",
      activeIcon: "text-[var(--color-azure-strong)]",
      activeLink: "bg-[var(--color-azure-soft)] text-[var(--color-azure-strong)] shadow-[inset_0_0_0_1px_rgba(22,125,214,0.08)]",
      chevron: "text-[var(--color-azure-strong)]",
    },
    green: {
      icon: "text-[var(--color-success)]",
      activeIcon: "text-[var(--color-success-strong)]",
      activeLink: "bg-[var(--color-success-soft)] text-[var(--color-success-strong)] shadow-[inset_0_0_0_1px_rgba(31,122,75,0.08)]",
      chevron: "text-[var(--color-success-strong)]",
    },
    gold: {
      icon: "text-[var(--color-warning)]",
      activeIcon: "text-[var(--color-warning-strong)]",
      activeLink: "bg-[var(--color-warning-soft)] text-[var(--color-warning-strong)] shadow-[inset_0_0_0_1px_rgba(159,109,23,0.08)]",
      chevron: "text-[var(--color-warning-strong)]",
    },
    violet: {
      icon: "text-[var(--color-violet)]",
      activeIcon: "text-[var(--color-violet-strong)]",
      activeLink: "bg-[var(--color-violet-soft)] text-[var(--color-violet-strong)] shadow-[inset_0_0_0_1px_rgba(90,66,216,0.08)]",
      chevron: "text-[var(--color-violet-strong)]",
    },
  }[accent];
}

export function AppSidebar({ actor }: { actor: SessionActor }) {
  const pathname = usePathname();
  const items = getVisibleNavigation(actor);
  const mainItems = items.filter((item) => item.placement === "main");
  const secondaryItems = items.filter((item) => item.placement === "secondary");
  const initial = actor.name.charAt(0).toUpperCase();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const profileCardActive = pathname === "/dashboard" || pathname === profileMenuItem.href;
  const profileMenuVisible = canAccessProfileMenu(actor);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  const renderNavigationGroup = (groupItems: NavigationItem[]) =>
    groupItems.map((item) => {
      const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
      const accent = getAccentClasses(item.accent);

      return (
        <Link
          className={cn(
            "sidebar-link text-[var(--color-foreground)]",
            !active && "hover:bg-[rgba(76,110,245,0.06)]",
            active && accent.activeLink,
          )}
          href={item.href}
          key={item.href}
        >
          <NavIcon className={active ? accent.activeIcon : accent.icon} icon={item.icon} />
          <span>{item.label}</span>
          {active ? <span className={cn("ml-auto text-xs", accent.chevron)}>{">"}</span> : null}
        </Link>
      );
    });

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[272px] border-r border-[var(--color-border)] bg-[var(--color-sidebar)] shadow-sm backdrop-blur md:flex md:flex-col">
      <div className="border-b border-[var(--color-border)] px-5 py-6">
        <Link className="flex items-center gap-3" href="/dashboard">
          <Image
            alt="Ready2Agent Logo"
            className="h-10 w-10"
            height={40}
            src="/ready2agent-logo-nobg.png"
            width={40}
          />
          <div>
            <p className="font-bold text-[var(--color-blue-strong)]">Ready2Agent</p>
            <p className="text-xs text-[var(--color-foreground-muted)]">AI-native role-aware framework</p>
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-4 py-5">
        <nav className="space-y-1">{renderNavigationGroup(mainItems)}</nav>
        {secondaryItems.length ? (
          <nav className="mt-auto space-y-1 border-t border-[var(--color-border)] pt-4">
            {renderNavigationGroup(secondaryItems)}
          </nav>
        ) : null}
      </div>

      <div className="border-t border-[var(--color-border)] px-4 py-4">
        <div className="relative" ref={menuRef}>
          {menuOpen ? (
            <div className="absolute bottom-[calc(100%+0.75rem)] right-0 z-20 w-[220px] rounded-[26px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.96)] p-2 shadow-[0_22px_54px_rgba(34,61,125,0.18)] backdrop-blur">
              {profileMenuVisible ? (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:bg-[var(--color-blue-soft)]",
                    pathname === profileMenuItem.href && "bg-[var(--color-blue-soft)] text-[var(--color-blue-strong)]",
                  )}
                  href={profileMenuItem.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <SettingsIcon className="text-[var(--color-violet-strong)]" size={16} />
                  <span>{profileMenuItem.label}</span>
                </Link>
              ) : null}
              <button
                className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-[var(--color-foreground)] transition hover:bg-[var(--color-blue-soft)]"
                onClick={() => signOut({ callbackUrl: "/login" })}
                type="button"
              >
                <LogoutIcon className="text-[var(--color-violet-strong)]" size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : null}

          <Link
            className={cn(
              "flex items-center gap-3 rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.82)] px-4 py-3 pr-14 shadow-[0_14px_34px_rgba(34,61,125,0.07)] transition hover:bg-[var(--color-blue-soft)]",
              profileCardActive && "bg-[var(--color-blue-soft)]",
            )}
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-violet)] text-sm font-bold text-white shadow-[0_10px_24px_rgba(123,97,255,0.22)]">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">{actor.name}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-foreground-muted)]">{actor.role}</p>
            </div>
          </Link>

          <button
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className={cn(
              "absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-violet-strong)] transition hover:bg-[var(--color-violet-soft)]",
              menuOpen && "bg-[var(--color-violet-soft)]",
            )}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setMenuOpen((current) => !current);
            }}
            type="button"
          >
            <SettingsIcon size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
