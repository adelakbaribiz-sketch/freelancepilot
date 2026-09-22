import Link from "next/link";
import { Compass } from "lucide-react";

export function MarketingHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">FreelancePilot</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-ink-muted">
          <a href="#features" className="hover:text-ink">Features</a>
          <a href="#how-it-works" className="hover:text-ink">How it works</a>
          <a href="#status" className="hover:text-ink">Project status</a>
        </nav>
        <Link
          href="/login"
          className="flex h-9 items-center rounded-md bg-brand px-4 text-sm font-medium text-white hover:bg-brand-strong"
        >
          View demo
        </Link>
      </div>
    </header>
  );
}
