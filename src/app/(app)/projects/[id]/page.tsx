"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Languages, Sparkles, Send, ExternalLink } from "lucide-react";
import { getProjectById } from "@/lib/data/projects";
import { getProposalsForProject } from "@/lib/data/proposals";
import type { Project } from "@/lib/data/types";
import { PlatformBadge, ProjectStatusBadge, ProposalStatusBadge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast-context";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-context";

function buildAiDraft(project: Project): string {
  return `Hi — I read through the brief for "${project.title}" and I've worked on similar ${project.skills[0]} projects recently. I'd approach this by first confirming scope on the trickiest requirement, then delivering in small reviewable milestones. I can start within 2 days and am comfortable with the ${formatCurrency(
    project.budgetMin,
    project.currency,
  )}–${formatCurrency(project.budgetMax, project.currency)} range. Happy to share relevant past work.`;
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const project = getProjectById(params.id);

  if (!project) {
    return (
      <div className="max-w-3xl">
        <EmptyState
          title="Project not found"
          description="It may have been removed from the demo dataset."
          action={
            <Link href="/projects" className="text-sm text-brand hover:underline">
              Back to projects
            </Link>
          }
        />
      </div>
    );
  }

  // Keying on project.id remounts this subtree per project, so the proposal
  // draft/bid can be safely initialized once from lazy state, without an
  // effect that re-seeds state on every navigation.
  return <ProjectWorkspace key={project.id} project={project} />;
}

function ProjectWorkspace({ project }: { project: Project }) {
  const router = useRouter();
  const loading = useSimulatedLoad(500);
  const { t } = useLocale();
  const { showToast } = useToast();

  const [showTranslation, setShowTranslation] = useState(false);
  const [draft, setDraft] = useState(() => buildAiDraft(project));
  const [bid, setBid] = useState(() => Math.round((project.budgetMin + project.budgetMax) / 2));
  const [submitted, setSubmitted] = useState(false);

  const priorProposals = getProposalsForProject(project.id);

  return (
    <div className="max-w-5xl space-y-5">
      <button
        onClick={() => router.push("/projects")}
        className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </button>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-2xl font-semibold">{project.title}</h1>
            <PlatformBadge platform={project.platform} />
            <ProjectStatusBadge status={submitted ? "submitted" : project.status} />
          </div>
          <p className="text-sm text-ink-muted mt-1" suppressHydrationWarning>
            {formatCurrency(project.budgetMin, project.currency)}–
            {formatCurrency(project.budgetMax, project.currency)} · {project.clientCountry} ·
            client rating {project.clientRating} · discovered {formatRelativeTime(project.discoveredAt)}
          </p>
        </div>
        <a
          href={project.url}
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
          title="Demo link — does not open a real listing"
        >
          View on {project.platform}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <span className="font-medium">
              {showTranslation ? t.common.translated : t.common.original}
            </span>
            <button
              onClick={() => setShowTranslation((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
            >
              <Languages className="h-3.5 w-3.5" />
              {showTranslation ? t.common.showOriginal : t.common.showTranslation}
            </button>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p
                dir={showTranslation ? "rtl" : "ltr"}
                className={showTranslation ? "leading-loose text-right" : "leading-relaxed"}
                style={showTranslation ? { fontFamily: "var(--font-fa)" } : undefined}
              >
                {showTranslation ? project.descriptionFa : project.descriptionEn}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.skills.map((s) => (
                <span key={s} className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-ink-muted">
                  {s}
                </span>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand" />
            <span className="font-medium">AI-drafted proposal</span>
            <span className="text-xs text-ink-muted ml-auto">Simulated — not a live LLM call</span>
          </CardHeader>
          <CardBody className="space-y-3">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-9 w-32" />
              </div>
            ) : (
              <>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={7}
                  disabled={submitted}
                  className="w-full rounded-md border border-border bg-background p-3 text-sm leading-relaxed outline-none focus:border-brand disabled:opacity-60"
                />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-ink-muted">Bid amount</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-ink-muted">$</span>
                    <input
                      type="number"
                      value={bid}
                      disabled={submitted}
                      onChange={(e) => setBid(Number(e.target.value))}
                      className="h-9 w-28 rounded-md border border-border bg-background pl-6 pr-2 text-sm outline-none focus:border-brand disabled:opacity-60"
                    />
                  </div>
                </div>
                <Button
                  disabled={submitted}
                  onClick={() => {
                    setSubmitted(true);
                    showToast("Proposal submitted (simulated) — this demo does not contact any real marketplace.");
                  }}
                >
                  <Send className="h-3.5 w-3.5" />
                  {submitted ? t.common.submitted : t.common.approve}
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <span className="font-medium">Proposal history</span>
        </CardHeader>
        <CardBody className="p-0">
          {priorProposals.length === 0 ? (
            <div className="p-5">
              <EmptyState title="No proposals sent yet for this project" />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {priorProposals.map((p) => (
                <li key={p.id} className="px-5 py-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm line-clamp-2">{p.contentEn}</p>
                    <p className="text-xs text-ink-muted mt-1.5" suppressHydrationWarning>
                      Bid {formatCurrency(p.bidAmount, p.currency)} ·{" "}
                      {p.sentAt ? formatRelativeTime(p.sentAt) : "not sent"}
                    </p>
                  </div>
                  <ProposalStatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
