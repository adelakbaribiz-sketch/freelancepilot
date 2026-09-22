import { Info } from "lucide-react";

export function DemoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-brand-soft bg-brand-soft px-3 py-2 text-xs text-brand-strong">
      <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
      <p>{children}</p>
    </div>
  );
}
