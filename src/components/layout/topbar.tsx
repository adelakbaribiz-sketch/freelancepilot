"use client";

import { Search, Bell, Moon, Sun, Languages, Menu } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { useTheme } from "@/lib/theme-context";
import { notifications } from "@/lib/data/user";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { t, locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex h-16 items-center gap-3 border-b border-border bg-surface px-4 md:px-5">
      <button
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
        <input
          type="text"
          placeholder={t.topbar.search}
          className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 rtl:pl-3 rtl:pr-9 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <button
          onClick={() => setLocale(locale === "en" ? "fa" : "en")}
          className="flex items-center gap-1.5 rounded-md px-2.5 h-9 text-sm text-ink-muted hover:bg-surface-muted hover:text-ink"
          title="Switch language / تغییر زبان"
        >
          <Languages className="h-4 w-4" />
          {locale === "en" ? "FA" : "EN"}
        </button>

        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink"
          title="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 ? (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
            ) : null}
          </button>
          {notifOpen ? (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-80 rounded-lg border border-border bg-surface shadow-lg z-20">
              <div className="px-4 py-3 border-b border-border text-sm font-medium">Notifications</div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 border-b border-border last:border-0">
                    <p className={cn("text-sm", !n.read && "font-medium")}>{n.title}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand-strong ml-1">
          SA
        </div>
      </div>
    </header>
  );
}
