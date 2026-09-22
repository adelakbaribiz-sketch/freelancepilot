# Data Model

## Current (demo): TypeScript types, in-memory

The demo's entire "data layer" is `src/lib/data/types.ts` plus the mock
arrays in `projects.ts`, `proposals.ts`, and `user.ts`. These types are
written to map directly onto a real relational schema (below), so adopting
a real backend would not require reshaping any component.

```ts
type Platform = "upwork" | "freelancer" | "fiverr" | "toptal";
type ProjectStatus = "new" | "reviewing" | "draft_ready" | "submitted" | "won" | "lost";
type ProposalStatus = "draft" | "sent" | "won" | "lost";

interface Project {
  id: string; platform: Platform; title: string;
  descriptionEn: string; descriptionFa: string;
  budgetMin: number; budgetMax: number; currency: string;
  skills: string[]; clientCountry: string; clientRating: number;
  matchScore: number; discoveredAt: string; status: ProjectStatus; url: string;
}

interface Proposal {
  id: string; projectId: string;
  contentEn: string; contentFa: string;
  bidAmount: number; currency: string; status: ProposalStatus;
  createdAt: string; sentAt: string | null;
}

interface UserProfile {
  id: string; name: string; email: string; locale: "en" | "fa"; timezone: string;
  skills: Skill[]; connectedPlatforms: ConnectedPlatform[];
}
```

Full definitions: [`src/lib/data/types.ts`](../src/lib/data/types.ts).

## Proposed production schema (Postgres)

Adapted from the original dossier, trimmed to what an MVP needs (no
multi-tenant/RLS scaffolding until there's a second tenant to justify it):

```sql
create table users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  password_hash text not null,
  full_name     text not null,
  locale        text not null default 'en',
  timezone      text not null default 'UTC',
  created_at    timestamptz not null default now()
);

create table skills (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references users(id) on delete cascade,
  name         text not null,
  proficiency  smallint not null check (proficiency between 1 and 5)
);

create table connected_platforms (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references users(id) on delete cascade,
  platform     text not null check (platform in ('upwork','freelancer','fiverr','toptal')),
  connected    boolean not null default false,
  last_synced  timestamptz
);

create table projects (
  id             uuid primary key default gen_random_uuid(),
  platform       text not null,
  external_id    text,
  title          text not null,
  description_en text not null,
  description_fa text,
  budget_min     numeric,
  budget_max     numeric,
  currency       text not null default 'USD',
  skills         text[] not null default '{}',
  client_country text,
  client_rating  numeric,
  match_score    smallint,
  discovered_at  timestamptz not null default now(),
  status         text not null default 'new',
  url            text,
  unique (platform, external_id)
);

create table proposals (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects(id) on delete cascade,
  user_id      uuid not null references users(id) on delete cascade,
  content_en   text not null,
  content_fa   text,
  bid_amount   numeric not null,
  currency     text not null default 'USD',
  status       text not null default 'draft',
  created_at   timestamptz not null default now(),
  sent_at      timestamptz
);
```

### Not yet designed (flagged, not guessed)

Consistent with "don't fabricate what isn't there": the following tables
are needed for a real system but are **not** designed here because doing so
without real requirements would just be guessing — audit logs, notification
delivery records, translation-provider usage/cost tracking, and payment
records. Each should be designed against real requirements when that phase
actually starts (see [ROADMAP.md](ROADMAP.md)).
