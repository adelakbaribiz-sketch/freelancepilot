"use client";

import { Target, Send, DollarSign, Timer } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { WeeklyTrendChart } from "@/components/charts/weekly-trend-chart";
import { PlatformBarChart } from "@/components/charts/platform-bar-chart";
import { analyticsWeekly, platformBreakdown } from "@/lib/data/user";
import { DemoBanner } from "@/components/layout/demo-banner";

export default function AnalyticsPage() {
  const loading = useSimulatedLoad(650);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-ink-muted mt-1">
          Performance across every connected platform, aggregated by your assistant.
        </p>
      </div>

      <DemoBanner>
        All figures below are simulated demo data illustrating the intended reporting
        surface — they are not derived from real marketplace activity.
      </DemoBanner>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Send} label="Proposals sent (8w)" value="52" trend="+18%" />
          <StatCard icon={Target} label="Overall win rate" value="27%" trend="+5pt" />
          <StatCard icon={DollarSign} label="Avg. bid amount" value="$1,860" />
          <StatCard icon={Timer} label="Avg. time to draft" value="2m 40s" />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <span className="font-medium">Proposals sent vs. won, by week</span>
          </CardHeader>
          <CardBody>
            {loading ? <Skeleton className="h-64" /> : <WeeklyTrendChart data={analyticsWeekly} />}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <span className="font-medium">Win rate by platform</span>
          </CardHeader>
          <CardBody>
            {loading ? <Skeleton className="h-64" /> : <PlatformBarChart data={platformBreakdown} />}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
