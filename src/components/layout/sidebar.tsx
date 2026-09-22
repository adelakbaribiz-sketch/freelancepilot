"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  BarChart3,
  Bot,
  Settings,
  Compass,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-context";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, key: "dashboard" as const },
  { href: "/projects", icon: Briefcase, key: "projects" as const },
  { href: "/proposals", icon: FileText, key: "proposals" as const },
  { href: "/analytics", icon: BarChart3, key: "analytics" as const },
  { href: "/assistant", icon: Bot, key: "assistant" as const },
  { href: "/settings", icon: Settings, key: "settings" as const },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLocale();

  const content = (
    <>
      <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
          <Compass className="h-4 w-4" />
        </div>
        <span className="font-display text-lg font-semibold tracking-tight">FreelancePilot</span>
        {onClose ? (
          <button
            onClick={onClose}
            className="ml-auto rtl:ml-0 rtl:mr-auto flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ href, icon: Icon, key }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-soft text-brand-strong"
                  : "text-ink-muted hover:bg-surface-muted hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4" />
              {t.nav[key]}
            </Link>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-ink-muted leading-relaxed" suppressHydrationWarning>
          {t.topbar.demoBadge} — {new Date().getFullYear()}
        </p>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-surface">
        {content}
      </aside>

      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative z-10 flex w-64 flex-col bg-surface border-r border-border rtl:border-r-0 rtl:border-l">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
