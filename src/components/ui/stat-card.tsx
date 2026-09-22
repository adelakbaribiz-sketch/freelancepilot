import type { LucideIcon } from "lucide-react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendTone = "success",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendTone?: "success" | "danger";
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-muted">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-muted">
          <Icon className="h-4 w-4 text-ink-muted" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold">{value}</span>
        {trend ? (
          <span className={cn("text-xs font-medium", trendTone === "success" ? "text-success" : "text-danger")}>
            {trend}
          </span>
        ) : null}
      </div>
    </Card>
  );
}
