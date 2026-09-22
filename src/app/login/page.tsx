"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@freelancepilot.app");
  const [password, setPassword] = useState("demo-pass");

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-semibold">FreelancePilot</span>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h1 className="font-display text-xl font-semibold text-center">Sign in to the demo</h1>
          <p className="text-sm text-ink-muted text-center mt-1">
            No real authentication — any input signs you into the demo workspace.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="text-sm text-ink-muted">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-sm text-ink-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-brand"
              />
            </div>
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-brand text-sm font-medium text-white hover:bg-brand-strong"
            >
              Enter demo workspace
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-4 text-xs text-ink-muted text-center">
            Demo credentials are pre-filled — this form does not check them against anything.
          </p>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-ink-muted hover:text-ink">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
