import { cn } from "@/lib/utils";
import type { Platform, ProjectStatus, ProposalStatus } from "@/lib/data/types";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "brand" | "success" | "warning" | "danger";
}) {
  const toneClasses: Record<string, string> = {
    neutral: "bg-surface-muted text-ink-muted",
    brand: "bg-brand-soft text-brand-strong",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const platformLabels: Record<Platform, string> = {
  upwork: "Upwork",
  freelancer: "Freelancer.com",
  fiverr: "Fiverr",
  toptal: "Toptal",
};

export function PlatformBadge({ platform }: { platform: Platform }) {
  return <Badge tone="neutral">{platformLabels[platform]}</Badge>;
}

const statusTone: Record<ProjectStatus, "neutral" | "brand" | "success" | "warning" | "danger"> = {
  new: "brand",
  reviewing: "warning",
  draft_ready: "warning",
  submitted: "neutral",
  won: "success",
  lost: "danger",
};

const statusLabel: Record<ProjectStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  draft_ready: "Draft ready",
  submitted: "Submitted",
  won: "Won",
  lost: "Lost",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge>;
}

const proposalStatusTone: Record<ProposalStatus, "neutral" | "brand" | "success" | "warning" | "danger"> = {
  draft: "warning",
  sent: "brand",
  won: "success",
  lost: "danger",
};

const proposalStatusLabel: Record<ProposalStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  won: "Won",
  lost: "Lost",
};

export function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  return <Badge tone={proposalStatusTone[status]}>{proposalStatusLabel[status]}</Badge>;
}
