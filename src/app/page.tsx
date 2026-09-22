import Link from "next/link";
import {
  Camera,
  Languages,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

const features = [
  {
    icon: Briefcase,
    title: "Multi-platform discovery",
    body: "Monitors Upwork, Freelancer.com, Fiverr, and Toptal for projects that match your skills — ranked by fit, not just recency.",
  },
  {
    icon: Languages,
    title: "Real-time translation",
    body: "Every brief is available in your native language alongside the original, so language is never the reason you pass on a good project.",
  },
  {
    icon: Sparkles,
    title: "AI-drafted proposals",
    body: "Starts you with a tailored draft and a suggested bid, which you review and edit before anything goes out.",
  },
  {
    icon: BarChart3,
    title: "Win-rate analytics",
    body: "Tracks proposals sent, win rate, and response time by platform, so you can see what's actually working.",
  },
];

const steps = [
  {
    title: "Connect your platforms",
    body: "Link the marketplaces you already use. FreelancePilot watches them for new, relevant work.",
  },
  {
    title: "Review AI-ranked matches",
    body: "Each project arrives translated, summarized, and scored against your skills and rate expectations.",
  },
  {
    title: "Approve & send",
    body: "Edit the drafted proposal and bid, then send — you're always the one who approves before anything is submitted.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-strong">
              Portfolio project — demo / prototype stage
            </span>
            <h1 className="font-display mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Win international freelance work, in your own language.
            </h1>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed">
              FreelancePilot discovers relevant projects across marketplaces, translates them in
              real time, and drafts a native-quality proposal for you to review — built for
              freelancers whose first language isn&rsquo;t English.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/login"
                className="flex h-11 items-center gap-2 rounded-md bg-brand px-5 text-sm font-medium text-white hover:bg-brand-strong"
              >
                View the demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#status" className="text-sm text-ink-muted hover:text-ink underline underline-offset-2">
                What&rsquo;s real vs. simulated?
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="font-display text-2xl font-semibold">What it does</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 rounded-lg border border-border p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{f.title}</p>
                    <p className="text-sm text-ink-muted mt-1 leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-2xl font-semibold">How it works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-lg border border-border p-5">
                <span className="font-display text-3xl font-semibold text-brand-soft">
                  0{i + 1}
                </span>
                <p className="font-medium mt-2">{s.title}</p>
                <p className="text-sm text-ink-muted mt-1 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="status" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="flex items-start gap-4 rounded-lg border border-brand-soft bg-brand-soft p-6">
              <ShieldCheck className="h-6 w-6 text-brand-strong shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-brand-strong">Honest project status: Demo / Prototype</p>
                <p className="text-sm text-brand-strong/90 mt-2 leading-relaxed max-w-2xl">
                  This is a frontend-complete product demo built on simulated data — there is no
                  live backend, no real marketplace integration, and no real proposals are ever
                  sent. It exists to demonstrate product thinking, UX, and the intended
                  architecture for a real implementation. Full breakdown of what&rsquo;s real,
                  mocked, and proposed lives in{" "}
                  <code className="rounded bg-white/50 px-1">docs/LIMITATIONS.md</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 text-center">
          <Camera className="h-8 w-8 text-brand mx-auto" />
          <h2 className="font-display text-2xl font-semibold mt-4">See it in action</h2>
          <p className="text-ink-muted mt-2">Explore the dashboard with sample data — no signup required.</p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-brand px-5 text-sm font-medium text-white hover:bg-brand-strong"
          >
            View the demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
