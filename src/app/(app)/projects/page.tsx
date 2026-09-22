"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, SlidersHorizontal } from "lucide-react";
import { projects } from "@/lib/data/projects";
import type { Platform, ProjectStatus } from "@/lib/data/types";
import { PlatformBadge, ProjectStatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CardSkeletonList } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { DemoBanner } from "@/components/layout/demo-banner";

const platforms: Platform[] = ["upwork", "freelancer", "fiverr", "toptal"];
const statuses: ProjectStatus[] = ["new", "reviewing", "draft_ready", "submitted", "won", "lost"];

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [simulateError, setSimulateError] = useState(false);
  const [loadKey, setLoadKey] = useState(0);
  const loading = useSimulatedLoad(600, [loadKey]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (platform !== "all" && p.platform !== platform) return false;
      if (status !== "all" && p.status !== status) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, platform, status]);

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-ink-muted mt-1">
            Discovered across your connected platforms, ranked by skill match.
          </p>
        </div>
        <button
          onClick={() => setSimulateError((v) => !v)}
          className="text-xs text-ink-muted hover:text-ink underline underline-offset-2"
        >
          {simulateError ? "Stop error demo" : "Simulate load error"}
        </button>
      </div>

      <DemoBanner>
        Project listings, budgets, and match scores below are simulated demo data, not live
        marketplace results.
      </DemoBanner>

      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title…"
          className="h-9 w-56 rounded-md border border-border bg-surface px-3 text-sm outline-none focus:border-brand"
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform | "all")}
          className="h-9 rounded-md border border-border bg-surface px-2 text-sm outline-none focus:border-brand"
        >
          <option value="all">All platforms</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus | "all")}
          className="h-9 rounded-md border border-border bg-surface px-2 text-sm outline-none focus:border-brand"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
        <span className="flex items-center gap-1 text-xs text-ink-muted ml-auto">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {filtered.length} of {projects.length} projects
        </span>
      </div>

      {simulateError ? (
        <Card className="p-10 flex flex-col items-center gap-3 text-center border-danger/40">
          <AlertTriangle className="h-6 w-6 text-danger" />
          <div>
            <p className="font-medium">Couldn&rsquo;t refresh project feed</p>
            <p className="text-sm text-ink-muted mt-1">
              This is a simulated failure to demonstrate the app&rsquo;s error state — your
              connected platforms did not actually disconnect.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSimulateError(false);
              setLoadKey((k) => k + 1);
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </Button>
        </Card>
      ) : loading ? (
        <CardSkeletonList count={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No projects match your filters"
          description="Try clearing a filter or broadening your search."
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setQuery("");
                setPlatform("all");
                setStatus("all");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((project) => (
            <li key={project.id}>
              <Link href={`/projects/${project.id}`}>
                <Card className="p-5 hover:border-brand/40 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium">{project.title}</p>
                        <PlatformBadge platform={project.platform} />
                      </div>
                      <p className="text-sm text-ink-muted mt-1.5 line-clamp-2">
                        {project.descriptionEn}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {project.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-ink-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-ink-muted mt-2.5" suppressHydrationWarning>
                        {formatCurrency(project.budgetMin, project.currency)}–
                        {formatCurrency(project.budgetMax, project.currency)} ·{" "}
                        {project.clientCountry} · {formatRelativeTime(project.discoveredAt)}
                      </p>
                    </div>
                    <div className="text-right shrink-0 space-y-1.5">
                      <p className="text-sm font-semibold text-brand">{project.matchScore}% match</p>
                      <ProjectStatusBadge status={project.status} />
                    </div>
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
