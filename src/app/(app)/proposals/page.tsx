"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { proposals } from "@/lib/data/proposals";
import { getProjectById } from "@/lib/data/projects";
import type { ProposalStatus } from "@/lib/data/types";
import { Card } from "@/components/ui/card";
import { ProposalStatusBadge, PlatformBadge } from "@/components/ui/badge";
import { CardSkeletonList } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { DemoBanner } from "@/components/layout/demo-banner";

const statuses: ProposalStatus[] = ["draft", "sent", "won", "lost"];

export default function ProposalsPage() {
  const [status, setStatus] = useState<ProposalStatus | "all">("all");
  const loading = useSimulatedLoad(550);

  const rows = useMemo(() => {
    return proposals
      .map((p) => ({ proposal: p, project: getProjectById(p.projectId) }))
      .filter((r) => r.project && (status === "all" || r.proposal.status === status));
  }, [status]);

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl font-semibold">Proposals</h1>
        <p className="text-sm text-ink-muted mt-1">
          Every proposal your assistant has drafted or sent, across all connected platforms.
        </p>
      </div>

      <DemoBanner>
        These proposals were never actually sent to a marketplace — this list is simulated
        history for demonstration.
      </DemoBanner>

      <div className="flex gap-2">
        <FilterPill label="All" active={status === "all"} onClick={() => setStatus("all")} />
        {statuses.map((s) => (
          <FilterPill key={s} label={s} active={status === s} onClick={() => setStatus(s)} />
        ))}
      </div>

      {loading ? (
        <CardSkeletonList count={4} />
      ) : rows.length === 0 ? (
        <EmptyState title="No proposals in this category yet" />
      ) : (
        <ul className="space-y-3">
          {rows.map(({ proposal, project }) => (
            <li key={proposal.id}>
              <Link href={`/projects/${project!.id}`}>
                <Card className="p-5 hover:border-brand/40 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium">{project!.title}</p>
                        <PlatformBadge platform={project!.platform} />
                      </div>
                      <p className="text-sm text-ink-muted mt-1.5 line-clamp-2">{proposal.contentEn}</p>
                      <p className="text-xs text-ink-muted mt-2" suppressHydrationWarning>
                        Bid {formatCurrency(proposal.bidAmount, proposal.currency)} ·{" "}
                        {proposal.sentAt ? formatRelativeTime(proposal.sentAt) : "not sent"}
                      </p>
                    </div>
                    <ProposalStatusBadge status={proposal.status} />
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`h-8 rounded-full px-3 text-xs font-medium capitalize transition-colors ${
        active ? "bg-brand text-white" : "bg-surface-muted text-ink-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
