# Architecture

## Part 1 — What's actually running (demo)

```
Browser
  └─ Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS v4)
       ├─ src/app/(app)/…        authenticated-shell pages (dashboard, projects, …)
       ├─ src/app/page.tsx        public marketing landing page
       ├─ src/app/login/         demo "login" (accepts anything, no auth)
       ├─ src/components/         UI primitives, layout, charts
       └─ src/lib/data/*.ts       ← the entire "backend": typed mock data + accessor functions
```

There is no server, no database, no API route, and no network call to
anything outside the browser. Every "AI" and "platform" interaction is
either static mock data or a client-side `setTimeout`-based simulation. See
[LIMITATIONS.md](LIMITATIONS.md) for the exact list.

### The one architectural decision that matters here

All data access goes through plain functions in `src/lib/data/` (e.g.
`getProjectById`, `getProposalsForProject`) returning typed objects defined
in `src/lib/data/types.ts`. Pages never reach into the mock arrays directly
in a way that couldn't be swapped for a fetch call. This means: **replacing
`src/lib/data/*.ts` with real API calls (e.g. React Query hooks hitting a
real backend) is the only change a real implementation would need at the
frontend boundary** — no page or component would need to change shape,
only where its data comes from.

## Part 2 — Target production architecture (proposed, not built)

This is a deliberately **trimmed-down** version of the original dossier's
microservices design — see [DECISIONS.md](DECISIONS.md) for what was cut
and why. It's sized for an actual MVP, not a hypothetical scale-out.

```
                         ┌─────────────────────┐
                         │   Next.js frontend    │  (this repo, pointed at a real API)
                         └──────────┬───────────┘
                                    │ REST (see API_SPEC.md)
                         ┌──────────▼───────────┐
                         │   API server (Node)    │  auth, projects, proposals, users
                         │   NestJS or similar     │
                         └──────────┬───────────┘
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
        ┌────────▼───────┐ ┌────────▼────────┐ ┌───────▼────────┐
        │ Platform        │ │ AI service       │ │ Postgres        │
        │ connector        │ │ (translation +   │ │ (projects,      │
        │ (Playwright,     │ │ proposal draft,  │ │ proposals,      │
        │ API-first where  │ │ single LLM       │ │ users, skills)  │
        │ available)       │ │ provider)        │ │                 │
        └─────────────────┘ └─────────────────┘ └─────────────────┘
```

Deliberately **not** included versus the original dossier, for an MVP:
Kafka, Temporal, Keycloak, Istio, Kubernetes, ClickHouse, ELK/Tempo/Jaeger,
multi-tenancy, a plugin marketplace. These are real, reasonable ideas for a
platform with paying customers and multiple engineers — not for an MVP with
zero users. They're listed as later phases in [ROADMAP.md](ROADMAP.md).

### Component responsibilities (proposed)

| Component | Responsibility | Notes |
|---|---|---|
| API server | Auth, CRUD for projects/proposals/users, orchestrates the two services below | A single deployable service is enough until there's a real reason to split it |
| Platform connector | Talks to marketplaces. API-first; browser automation (Playwright) only where no API exists, and only within each platform's Terms of Service | See [Open risks](#open-risks-carried-over-from-the-original-concept) — this is not solved, only scoped |
| AI service | One translation call + one proposal-drafting call, behind a queue so a single slow provider call can't block the request thread | Starts with a single LLM provider (e.g. one cloud API), not a multi-model router — that's premature until there's usage data to justify it |
| Postgres | System of record | The data model in [DATA_MODEL.md](DATA_MODEL.md) maps directly onto the current TypeScript types, so the frontend needs no reshaping to consume it |

## Open risks carried over from the original concept

These were flagged in the original dossier and remain unresolved — they are
product/legal decisions, not engineering ones, and building more code does
not solve them:

1. **Marketplace Terms of Service.** Upwork, Freelancer.com, Fiverr, and
   Toptal each have their own automation/scraping restrictions. Any real
   platform connector needs a legal review per platform before writing
   automation against it, not after.
2. **Authentication on target platforms.** The user's original pain point
   (struggling to pass marketplace auth) is not something this product can
   solve by proxying login — that likely violates the same ToS. A real
   design would need to scope this down to "notify + open the platform in
   the user's own browser session" rather than automate login.
3. **Cross-border payouts.** Out of scope for this product entirely — this
   is a payments/compliance problem (see [SECURITY.md](SECURITY.md)), not
   something a freelance-assistant app should be handling directly.
