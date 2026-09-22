"use client";

import Link from "next/link";
import { Briefcase, Target, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { DemoBanner } from "@/components/layout/demo-banner";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { PlatformBadge, ProjectStatusBadge } from "@/components/ui/badge";
import { CardSkeletonList, Skeleton } from "@/components/ui/skeleton";
import { projects } from "@/lib/data/projects";
import { currentUser } from "@/lib/data/user";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

export default function DashboardPage() {
  const { t } = useLocale();
  const loading = useSimulatedLoad(700);

  const topMatches = [...projects].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-semibold">{t.dashboard.title}</h1>
        <p className="text-sm text-ink-muted mt-1">{t.dashboard.subtitle}</p>
      </div>

      <DemoBanner>
        This workspace runs entirely on simulated demo data — no marketplace accounts are
        connected and no proposals are actually sent. See the Settings page to review what&rsquo;s
        real vs. mocked.
      </DemoBanner>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Briefcase} label="Projects discovered (7d)" value="34" trend="+12%" />
          <StatCard icon={Target} label="Win rate" value="29%" trend="+3pt" />
          <StatCard icon={Clock} label="Avg. response time" value="18m" trend="-4m" />
          <StatCard icon={TrendingUp} label="Proposals in flight" value="6" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <span className="font-medium">Top matches for you</span>
            <Link href="/projects" className="text-sm text-brand hover:underline flex items-center gap-1">
              {t.common.viewAll}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            {loading ? (
              <div className="p-5">
                <CardSkeletonList count={4} />
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {topMatches.map((project) => (
                  <li key={project.id} className="px-5 py-4 hover:bg-surface-muted/60 transition-colors">
                    <Link href={`/projects/${project.id}`} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <p className="font-medium line-clamp-1 min-w-0">{project.title}</p>
                          <PlatformBadge platform={project.platform} />
                        </div>
                        <p className="text-sm text-ink-muted mt-1 line-clamp-1">
                          {project.descriptionEn}
                        </p>
                        <p className="text-xs text-ink-muted mt-1.5" suppressHydrationWarning>
                          {formatCurrency(project.budgetMin, project.currency)}–
                          {formatCurrency(project.budgetMax, project.currency)} ·{" "}
                          {formatRelativeTime(project.discoveredAt)}
                        </p>
                      </div>
                      <div className="text-right shrink-0 space-y-1.5">
                        <p className="text-sm font-semibold text-brand">{project.matchScore}% match</p>
                        <ProjectStatusBadge status={project.status} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <span className="font-medium">Connected platforms</span>
          </CardHeader>
          <CardBody className="space-y-3">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            ) : (
              <div className="space-y-2">
                {currentUser.connectedPlatforms.map((cp) => (
                  <div
                    key={cp.platform}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                  >
                    <span className="capitalize">{cp.platform}</span>
                    <span className={cp.connected ? "text-success text-xs" : "text-ink-muted text-xs"}>
                      {cp.connected ? "Connected" : "Not connected"}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Link
              href="/settings"
              className="mt-2 flex h-10 w-full items-center justify-center rounded-md border border-border text-sm font-medium hover:bg-surface-muted"
            >
              Manage connections
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
