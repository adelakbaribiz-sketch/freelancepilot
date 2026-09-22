"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/data/user";
import { useLocale } from "@/lib/i18n/locale-context";
import { useToast } from "@/components/ui/toast-context";
import { DemoBanner } from "@/components/layout/demo-banner";
import type { ConnectedPlatform } from "@/lib/data/types";

const platformLabels: Record<string, string> = {
  upwork: "Upwork",
  freelancer: "Freelancer.com",
  fiverr: "Fiverr",
  toptal: "Toptal",
};

export default function SettingsPage() {
  const { locale, setLocale } = useLocale();
  const { showToast } = useToast();
  const [platforms, setPlatforms] = useState<ConnectedPlatform[]>(currentUser.connectedPlatforms);
  const [aiMode, setAiMode] = useState<"local" | "cloud">("local");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-ink-muted mt-1">Profile, connections, and assistant preferences.</p>
      </div>

      <DemoBanner>
        This is a single-user demo profile. Toggling connections or preferences below only
        updates local component state — no accounts are actually linked or unlinked.
      </DemoBanner>

      <Card>
        <CardHeader>
          <span className="font-medium">Profile</span>
        </CardHeader>
        <CardBody className="space-y-3">
          <Field label="Name" value={currentUser.name} />
          <Field label="Email" value={currentUser.email} />
          <Field label="Timezone" value={currentUser.timezone} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-medium">Skills</span>
        </CardHeader>
        <CardBody className="space-y-2">
          {currentUser.skills.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between text-sm">
              <span>{skill.name}</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-5 rounded-full ${
                      i < skill.proficiency ? "bg-brand" : "bg-surface-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-medium">Connected platforms</span>
        </CardHeader>
        <CardBody className="space-y-2">
          {platforms.map((cp) => (
            <div key={cp.platform} className="flex items-center justify-between rounded-md border border-border px-3 py-2.5 text-sm">
              <div>
                <p className="font-medium">{platformLabels[cp.platform]}</p>
                <p className="text-xs text-ink-muted">
                  {cp.connected ? `Last synced ${new Date(cp.lastSynced!).toLocaleString()}` : "Not connected"}
                </p>
              </div>
              <Button
                variant={cp.connected ? "secondary" : "primary"}
                size="sm"
                onClick={() => {
                  setPlatforms((prev) =>
                    prev.map((p) =>
                      p.platform === cp.platform
                        ? { ...p, connected: !p.connected, lastSynced: !p.connected ? new Date().toISOString() : p.lastSynced }
                        : p,
                    ),
                  );
                  showToast(
                    cp.connected
                      ? `Disconnected ${platformLabels[cp.platform]} (simulated)`
                      : `Connected ${platformLabels[cp.platform]} (simulated)`,
                  );
                }}
              >
                {cp.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-medium">Language & region</span>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2">
            <Button variant={locale === "en" ? "primary" : "secondary"} size="sm" onClick={() => setLocale("en")}>
              English
            </Button>
            <Button variant={locale === "fa" ? "primary" : "secondary"} size="sm" onClick={() => setLocale("fa")}>
              فارسی
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-medium">AI preferences</span>
        </CardHeader>
        <CardBody className="space-y-3">
          <p className="text-sm text-ink-muted">
            Choose whether proposal drafting runs on a locally-hosted model (private, no data
            leaves your machine) or a cloud model (higher quality, sends project text to a
            third-party API). This demo does not call either — both options only affect this
            toggle&rsquo;s stored value.
          </p>
          <div className="flex gap-2">
            <Button variant={aiMode === "local" ? "primary" : "secondary"} size="sm" onClick={() => setAiMode("local")}>
              Local model
            </Button>
            <Button variant={aiMode === "cloud" ? "primary" : "secondary"} size="sm" onClick={() => setAiMode("cloud")}>
              Cloud model
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
