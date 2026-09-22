# Limitations & Honest Status

This is the single source of truth for what in FreelancePilot is real versus
simulated. If another document in this repository ever seems to imply more
than what's listed here, this file wins.

**Project stage: Demo / Prototype.** This is a frontend-complete product demo
built for a portfolio. It is not a running business, has no real users, no
real revenue, and has not been tested against real marketplace platforms.

## Status legend

- **REAL** — actually works as described, backed by real code/logic.
- **MOCKED** — the UI and interaction are real; the data behind it is fabricated demo data.
- **SIMULATED** — the behavior is faked with a timer, canned rule, or client-side-only effect standing in for a real system call.
- **PROPOSED** — designed and documented, not implemented.
- **NOT IMPLEMENTED** — out of scope for this demo entirely.

## Feature-by-feature

| Feature | Status | Detail |
|---|---|---|
| Frontend UI (all pages, navigation, responsive layout, dark mode, RTL) | **REAL** | Actual Next.js/React/Tailwind code, no shortcuts. |
| Project/proposal/user data | **MOCKED** | Fabricated sample records in `src/lib/data/*.ts`, clearly labeled in-file. |
| "Discovers projects across marketplaces" | **SIMULATED** | The projects list is static mock data rendered with a fake loading delay. No marketplace is contacted. |
| Persian translation toggle | **MOCKED** | Each mock project ships with a pre-written Persian translation string. There is no translation engine or API call. |
| "AI-drafted proposal" | **SIMULATED** | A template string is generated client-side from the project's own fields (title, skill, budget). No LLM is called. |
| AI Assistant chat | **SIMULATED** | Keyword pattern-matching against the mock dataset (`src/lib/assistant-responses.ts`). Not a language model. |
| "Approve & submit" proposal | **SIMULATED** | Updates local component state and shows a toast. No network request is made; nothing is sent anywhere. |
| Platform connect/disconnect (Settings) | **SIMULATED** | Toggles local state only. No OAuth, no real account linking. |
| Login | **SIMULATED** | Any input is accepted; there is no authentication, session, or user database. |
| Win rate / analytics charts | **MOCKED** | Fixed sample numbers, not computed from real activity. |
| Multi-tenant, RBAC, Kafka, Temporal, Keycloak, Kubernetes, etc. (from the original dossier) | **PROPOSED** | Documented in [ARCHITECTURE.md](ARCHITECTURE.md) as the target production design. None of it is built. |
| Payment / payout handling | **NOT IMPLEMENTED** | Explicitly out of scope — see [SECURITY.md](SECURITY.md) on why this is not something a demo should touch. |
| Marketplace ToS compliance / legal review | **NOT IMPLEMENTED** | Flagged as an open, unresolved risk — see [ARCHITECTURE.md](ARCHITECTURE.md#open-risks-carried-over-from-the-original-concept). |

## What this demo is useful for

- Demonstrating product thinking, IX/UX, and interaction design for a
  translation-first freelance tool.
- Demonstrating a defensible frontend architecture (typed data layer behind
  an interface a real API could later implement) — see
  [ARCHITECTURE.md](ARCHITECTURE.md).
- Demonstrating accessible, validated data visualization and a working
  bilingual (EN/FA) RTL-aware UI.

## What it is explicitly not

- Not a working SaaS product.
- Not connected to Upwork, Freelancer.com, Fiverr, or Toptal in any way.
- Not able to translate, draft, or send anything for a real user.
- Not audited for production security or compliance.
