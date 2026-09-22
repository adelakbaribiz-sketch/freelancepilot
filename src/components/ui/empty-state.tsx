import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-surface px-6 py-14 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted">
        <Icon className="h-5 w-5 text-ink-muted" />
      </div>
      <div className="space-y-1">
        <p className="font-medium text-ink">{title}</p>
        {description ? <p className="text-sm text-ink-muted max-w-sm">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
